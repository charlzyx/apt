import {
  SourceFile,
  SyntaxKind,
  TypeParameterDeclaration,
  Symbol,
  TypeAliasDeclaration,
} from "ts-morph";

/**
 * 解析通用的泛型定义
 * @example
    type Auth = {};
    type PageQuery<T> = T & {
      pageNo: number;
      pageSize: number;
    };

    type PageResp<T> = {
      records: T[];
      total: number;
      pageNo?: number;
      pageSize?: number;
    };

    type Resp<
      T,
      ContentType extends BuiltInContentType = "application/json",
      HTTPStateCode = 200,
      Headers extends Partial<Record<BuiltInHttpHeaders, string>> = {}
    > = {
      code: int32;
      data: T;
      message: string;
    };

    type Reason<
      T,
      HTTPStateCode = 400,
      Headers extends Partial<Record<BuiltInHttpHeaders, string>> = {}
    > = {
      code: int32;
      reason: string;
    };
 */
export const parserGenericDefinition = (sourceFiles: SourceFile[]) => {
  const map = sourceFiles.reduce(
    (map, sourceFile) => {
      if (!sourceFile.isDeclarationFile()) {
        return map;
      }
      // type alias node list
      const typeAliasDeclarations = sourceFile
        .getStatements()
        .filter((statement) => {
          return SyntaxKind.TypeAliasDeclaration === statement.getKind();
        }) as TypeAliasDeclaration[];

      typeAliasDeclarations.forEach((node) => {
        const name = node.getName();
        const symbol = node.getSymbol();
        const typeParameters = node.getTypeParameters();
        if (name && symbol && typeParameters) {
          map[name] = {
            node,
            symbol,
            typeParameters,
          };
        }
      });
      return map;
    },
    {} as Record<
      string,
      {
        node: TypeAliasDeclaration;
        symbol: Symbol;
        typeParameters: TypeParameterDeclaration[];
      }
    >
  );
  return map;
};
