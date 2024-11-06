import {
  SymbolFlags,
  Node,
  Project,
  Symbol,
  Type,
  PropertySignature,
} from "ts-morph";

const project = new Project({});
project.addSourceFilesAtPaths("./src/*.d.ts");
project.addSourceFilesAtPaths("./src/Pet/createPet.ts");

const isNode = (typeNode: any): typeNode is Node =>
  typeof typeNode?.getType === "function";
const getTypeOfNodeOrType = (typeNode: Node | Type): Type | undefined => {
  if (isNode(typeNode)) {
    return typeNode.getType();
  } else {
    return typeNode;
  }
};

const arrayToMap = (maybe) => {
  if (Array.isArray(maybe)) {
    return maybe.reduce((map, item) => {
      map = { ...map, ...item };
      return map;
    }, {});
  }
  return maybe;
};

const mergeProps = (
  props: Array<{ type: string } | { type: string; [x: string]: any }[]>,
  isOptional: boolean,
  jsDoc: Record<string, string>
) => {
  console.log("🚀 ~ mergeProps ~ props:", props);
  // length > 1 means union
  const only = props.length === 1;
  const one = props[0];
  const isTypeAliasUnionEnum =
    Array.isArray(one) && one.every((x) => x.type === "literal");
  if (isTypeAliasUnionEnum) {
    return {
      type: "string",
      enums: one.map((item) => item.value!),
      jsDoc,
    };
  } else if (only) {
    return {
      ...one,
      isOptional,
      jsDoc,
    };
  }
  // todo
  return props;
};

const parserTypeNode = (typeNode: Node | Type): any => {
  const type = getTypeOfNodeOrType(typeNode);

  if (!type) return "notype";

  const base = {
    _fullName: type.getSymbol()?.getFullyQualifiedName(),
  };

  if (type.isString()) return { type: "string", ...base };
  if (type.isBoolean()) return { type: "boolean", ...base };
  if (type.isNumber()) return { type: "number", ...base };
  if (type.isLiteral())
    return { type: "literal", value: type.getLiteralValue(), ...base };

  if (type.isArray()) {
    const item = type.getArrayElementTypeOrThrow();
    return { type: "array", items: parserTypeNode(item), ...base };
  }

  if (type.isUnion()) {
    // Array means union
    return type.getUnionTypes().map(parserTypeNode);
  }

  if (type.isObject() || type.isClassOrInterface() || type.isIntersection()) {
    const props = type.getProperties().map((propSymbol) => {
      const name = propSymbol.getName();

      const node = propSymbol.getValueDeclaration();
      const isOptional = propSymbol.hasFlags(SymbolFlags.Optional);
      const jsDoc = propSymbol.getJsDocTags().reduce((map, tag) => {
        map[tag.getName()] = tag.getText();
        return map;
      });

      if (node) {
        const stype = propSymbol.getTypeAtLocation(node);
        const init = (node as PropertySignature).getInitializer()?.getText();
        const ret = parserTypeNode(stype);
        return {
          [name]: {
            ...ret,
            init,
            jsDoc,
            isOptional,
          },
        };
      } else {
        const dts = propSymbol.getDeclarations();
        const subProps = dts.map(parserTypeNode);
        return {
          [name]: mergeProps(subProps, isOptional, jsDoc),
        };
      }
    });

    return {
      type: "object",
      properties: arrayToMap(props),
      ...base,
    };
  }
};
const parserMethodTypeAliasDeclaration = (signature: Type) => {
  const props = [
    "url",
    "headers",
    "cookies",
    "path",
    "query",
    "body",
    "resp",
  ].reduce((map, key) => {
    const symbol = signature.getSymbol()?.getMember?.(key);
    const typeNode = symbol?.getValueDeclaration();
    if (typeNode) {
      map[key] = parserTypeNode(typeNode);
    }

    return map;
  }, {} as Record<string, Symbol | undefined>);
  return props;
};

project.getSourceFiles().forEach((sourceFile) => {
  if (sourceFile.isDeclarationFile()) return;

  // get method type declaration
  const methodStatement = sourceFile.getStatements().find((statement) => {
    const kindName = statement.getKindName();
    const name = statement.getSymbol()?.getName();
    return (
      "TypeAliasDeclaration" === kindName &&
      /get|post|put|del|option|trace/i.test(name!)
    );
  });
  if (!methodStatement) return;
  const methodType = methodStatement.getSymbol()?.getDeclaredType();
  if (!methodType) return;
  const api = parserMethodTypeAliasDeclaration(methodType);

  console.log(api);
});
