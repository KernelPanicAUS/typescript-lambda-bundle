# typescript-lambda-bundle ![](https://github.com/KernelPanicAUS/typescript-lambda-bundle/workflows/Node%20CI/badge.svg)

This example illustrates how a typescript lambda would be transpiled and bundled with its dependencies into a single javascript file, making deployment to aws lambda much easier and faster.

### TypeScript

TypeScript is a dependency of this project as the lambda handler itself is written in Typescript.

The `tsconfig.json` file contains the compiler configuration that is required for the transpilation process.

### Webpack

Webpack is used traditionally in front-end applications to organise JavaScript, HTML , CSS as well as vendored dependencies into javascript bundles, which are compact enough, so that the browser can unpack them and parse them in an efficient way.

We are leveraging the `ts-loader` loader for webpack to compile our TypeScript and spit out a single javascript bundle that contains our transpiled code as well as any external dependencies that our lambda uses, which simplifies the deployment process significantly.

Packaging our lambda along with its dependencies the traditional way would result in a giant zip file

```bash
$ zip -r lambda.zip src node_modules
...
$ ls -lah lambda.zip
-rw-r--r-- 1 thomas.khalil 29M Jan  6 14:15 lambda.zip
```

Alternatively, triggering the webpack build results in a much smaller deployable, in this case, a 98.4% reduction in size.

```bash
$ yarn build
yarn run v1.19.0
  rimraf dist
  NODE_ENV=production webpack
Hash: 23e3e82877c8dc59e612
Version: webpack 4.41.5
Time: 9805ms
Built at: 01/06/2020 2:33:25 PM
     Asset      Size  Chunks                    Chunk Names
lambda.zip   460 KiB          [emitted]  [big]
   main.js  1.68 MiB       0  [emitted]  [big]  main
Entrypoint main [big] = main.js
 [6] (webpack)/buildin/global.js 472 bytes {0} [built]
[15] fs (ignored) 15 bytes {0} [built]
[32] ./src/index.ts 3.66 KiB {0} [built]
[80] (webpack)/buildin/module.js 497 bytes {0} [built]
    + 107 hidden modules
✨  Done in 11.37s.

$ ls -lah dist/
total 2.2M
drwxr-xr-x  4 thomas.khalil  128 Jan  6 14:33 .
drwxr-xr-x 20 thomas.khalil  640 Jan  6 14:33 ..
-rw-r--r--  1 thomas.khalil 460K Jan  6 14:33 lambda.zip
-rw-r--r--  1 thomas.khalil 1.7M Jan  6 14:33 main.js
```

## Try it out locally

All you need to run this example locally is to have [NodeJs](https://nodejs.org/dist/v12.14.0/node-v12.14.0.pkg) installed (LTS version is 12.14.0 as of this writing) and [yarn](https://yarnpkg.com/en/docs/install#mac-stable) for package management.

```bash
yarn install # Installs project dependencies
yarn build   # wrapper for the webpack build command
```
