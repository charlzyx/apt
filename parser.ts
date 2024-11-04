import {
  ModuleKind,
  SourceFile,
  Project,
  ScriptTarget,
  TypeNode,
} from "ts-morph";
import * as ts from "typescript";

const fileNames = [
  "/Users/chao/Lab/api-typewriter/src/builtins.d.ts",
  "/Users/chao/Lab/api-typewriter/src/defs.d.ts",
  "/Users/chao/Lab/api-typewriter/src/meta.d.ts",
  "/Users/chao/Lab/api-typewriter/src/Pet/createPet.ts",
  "/Users/chao/Lab/api-typewriter/src/Pet/deletePet.ts",
  "/Users/chao/Lab/api-typewriter/src/Pet/findPetById.ts",
  "/Users/chao/Lab/api-typewriter/src/Pet/findPetByStatus.ts",
  "/Users/chao/Lab/api-typewriter/src/Pet/findPetByTags.ts",
  "/Users/chao/Lab/api-typewriter/src/Pet/updatePet.ts",
  "/Users/chao/Lab/api-typewriter/src/Pet/updatePetWithForm.ts",
  "/Users/chao/Lab/api-typewriter/src/Pet/uploadPetImage.ts",
  "/Users/chao/Lab/api-typewriter/src/Store/deleteOrder.ts",
  "/Users/chao/Lab/api-typewriter/src/Store/getInventory.ts",
  "/Users/chao/Lab/api-typewriter/src/Store/getOrderById.ts",
  "/Users/chao/Lab/api-typewriter/src/Store/placeOrder.ts",
  "/Users/chao/Lab/api-typewriter/src/User/createUser.ts",
  "/Users/chao/Lab/api-typewriter/src/User/createUserWithList.ts",
  "/Users/chao/Lab/api-typewriter/src/User/deleteUser.ts",
  "/Users/chao/Lab/api-typewriter/src/User/getUserByName.ts",
  "/Users/chao/Lab/api-typewriter/src/User/login.ts",
  "/Users/chao/Lab/api-typewriter/src/User/logout.ts",
  "/Users/chao/Lab/api-typewriter/src/User/updateUser.ts",
];

const project = new Project({});
project.addSourceFilesAtPaths("./src/*.d.ts");
project.addSourceFilesAtPaths("./src/**/*.ts");
const program = project.getProgram();
//  ts.createProgram(fileNames, {
//   target: ScriptTarget.ES2016,
//   module: ModuleKind.CommonJS,
//   noEmit: true,
//   isolatedModules: true,
//   skipLibCheck: true,
//   esModuleInterop: false,
// });
// console.log(sourceFiles.map((s) => s.compilerNode.path));
const typeChecker = program.getTypeChecker();

const visit = (sourceFile: SourceFile) => {
  const node = sourceFile.getStatements()[0];
  const symbol = node.getSymbol();
  const dt = symbol?.getDeclaredType();
  console.log("🚀 ~ visit ~ dt:", dt, symbol);
};

const walker = (
  sourceFiles: readonly ts.SourceFile[],
  visitor: typeof visit
) => {
  for (const sourceFile of sourceFiles) {
    ts.forEachChild(sourceFile, visitor);
  }
};

project.getSourceFiles().forEach(visit);
