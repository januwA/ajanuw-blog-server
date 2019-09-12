const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

console.log('tsconfig paths bootstrap start...');

tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.outDir,
  paths: tsConfig.compilerOptions.paths,
});
