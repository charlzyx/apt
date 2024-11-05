import {
  ModuleKind,
  SourceFile,
  Symbol,
  Project,
  PropertySignature,
  ScriptTarget,
  TypeNode,
  Node,
  Signature,
  Type,
  printNode,
} from "ts-morph";
import * as ts from "typescript";

const project = new Project({});
project.addSourceFilesAtPaths("./src/*.d.ts");
project.addSourceFilesAtPaths("./src/Pet/createPet.ts");

const isNode = (typeNode: any): typeNode is Node =>
  typeof typeNode?.getType === "function";
const getTypeOfNodeOrType = (typeNode: Node | Type): Type | undefined => {
  if (isNode(typeNode)) {
    // const dt = typeNode.getSymbol()?.getValueDeclaration();
    // return Node.isTypeReference(typeNode)
    //   ? typeNode.getSymbol()?.getTypeAtLocation(typeNode)
    //   : dt?.getType();
    return typeNode.getType();
  } else {
    return typeNode;
  }
};

const parserTypeNode = (typeNode: Node | Type): any => {
  const type = getTypeOfNodeOrType(typeNode);

  if (!type) return "typenotfound";

  if (type.isString()) return "string";
  if (type.isBoolean()) return "boolean";
  if (type.isNumber()) return "number";
  if (type.isLiteral()) return type.getLiteralValue();

  if (type.isArray()) {
    const item = type.getArrayElementTypeOrThrow();
    return parserTypeNode(item);
  }

  if (type.isUnion()) {
    return type.getUnionTypes().map(parserTypeNode);
  }

  if (type.isIntersection()) {
    return type.getIntersectionTypes().map(parserTypeNode);
  }

  if (type.isObject()) {
    let properties = type.getApparentProperties();

    console.log("🚀 ~ parserTypeNode ~ properties:", properties);
    // const members = type.getSymbol()?.getMembers();
    // console.log("🚀 ~ parserTypeNode ~ members:", members);
    const props = properties.map((symbol) => {
      const name = symbol.getName();
      const type = symbol.getTypeAtLocation(symbol.getValueDeclaration()!);
      const maybe = parserTypeNode(type);
      if (maybe !== "unparsed") {
        return maybe;
      } else {
        const dts = symbol.getDeclarations();
        return { [name]: dts.map(parserTypeNode) };
      }
    });

    return props;
  }
  return "unparsed";
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
    console.log("🚀 ~ method ~ name:", kindName, name);
    return (
      "TypeAliasDeclaration" === kindName &&
      /get|post|put|del|option|trace/i.test(name!)
    );
  });
  console.log("🚀 ~ methodStatement ~ methodStatement:", methodStatement);
  if (!methodStatement) return;
  const methodType = methodStatement.getSymbol()?.getDeclaredType();
  if (!methodType) return;
  const api = parserMethodTypeAliasDeclaration(methodType);

  console.log(api);
});
