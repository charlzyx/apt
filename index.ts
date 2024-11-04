import {
  ModuleKind,
  SourceFile,
  Project,
  ScriptTarget,
  TypeNode,
  printNode,
  EmitHint,
} from "ts-morph";
import * as ts from "typescript";


const project = new Project({});
project.addSourceFilesAtPaths("./example.ts");
const program = project.getProgram();

const typeChecker = program.getTypeChecker();

const visit = (sourceFile: SourceFile) => {
  const node = sourceFile.getStatements()[3];
  const symbol = node.getSymbol();
  const dt = symbol?.getDeclaredType();
  const query = dt?.getSymbol()?.getMember('query')
  const queryD = query?.getDeclarations()[0]
  const app = queryD?.getType().getApparentType()
  const appps = queryD?.getType().getApparentProperties()
  
  console.log(query, queryD, app, appps)
  // const prop = respType?.getDeclarations()[0]
  // const tt = prop?.getType();
  // const app =  tt?.getApparentType();
  // const uni = app?.getUnionTypes();
  // uni?.forEach(ss => {
  //   const mm = ss.getApparentType()
  // console.log('props', mm)

  // })
  // console.log('props', typeChecker.getTypeText(app!))

};

const sourceFiles = project.getSourceFiles()
sourceFiles.forEach(visit);
