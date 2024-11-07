import {
  SymbolFlags,
  Node,
  Project,
  Symbol,
  Type,
  PropertySignature,
  TypeAliasDeclaration,
  SourceFile,
  SyntaxKind,
  CommentStatement,
} from "ts-morph";
import fs from "fs";

const project = new Project({});
project.addSourceFilesAtPaths("./example/meta.d.ts");

project.getSourceFiles().forEach((sourceFile) => {
  if (!sourceFile.isDeclarationFile()) return;

  const statements = sourceFile.getStatementsWithComments();
  console.log("🚀 ~ project.getSourceFiles ~ statements:", statements);
  statements.forEach((statement) => {
    if (CommentStatement.isCommentNode(statement)) {
      const text = statement.getText();
      console.log("🚀 ~ statements.forEach ~ text:", text);
    }
  });
});
