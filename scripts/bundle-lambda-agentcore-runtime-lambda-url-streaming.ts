import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

const lambdaDir = path.join(__dirname, '../lambda/agentcore-runtime-lambda-url-streaming');
const outDir = path.join(__dirname, '../build/lambda-agentcore-runtime-lambda-url-streaming');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

esbuild.build({
  entryPoints: [path.join(lambdaDir, 'index.ts')],
  bundle: true,
  platform: 'node',
  target: 'node22',
  outfile: path.join(outDir, 'index.js'),
  minify: true,
  sourcemap: true,
  external: ['@aws-sdk/*', '@smithy/*'],
}).catch(() => process.exit(1));
