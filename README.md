# Root Cause Analysis Chatbot Tool

_In partial fulfilment of the requirements for SE6005 Capstone Project, a core subject under Master of Science in Cyber Security (MSCS) in Nanyang Technological University (NTU), Singapore._

This is a CLI chatbot written using TypeScript in a Node.js environment.

## Pre-requisites

### Node.js

You will require **Node.js** to run the chatbot.
This chatbot was developed using Node v20.10.0 running on macOS Sonoma 14.1.2.

Check your version of Node.js with the following Terminal command:

```shell
node -v
```

### TypeScript

For best experience, you will require **TypeScript**.
`package.json` indicates TypeScript as a project dependency; you should be able to install it alongside any other required dependencies using `npm i`.

This project was developed with TypeScript 1.6.
Check your TypeScript version using the following Terminal command:

```shell
tsc -v
```

## Usage

1. Obtain an OpenAI API secret key from `https://platform.openai.com/account/api-keys`.
2. Create a file named `.env` and add the following:

   ```
   API_KEY=<YOUR_API_KEY_HERE>
   ```

   Follow the syntax as given. Replace `<YOUR_API_KEY_HERE>` with your OpenAI API secret key.

3. Install dependencies.

   ```shell
   npm i
   ```

4. Run the bot.
   This involves a 2-step process: first, the TypeScript code from `src/` is compiled into JavaScript code, which will be stored as JavaScript files in `dist/`.
   Then, those JavaScript files are run under the Node.js environment.

   ```shell
   npm run ce
   ```

   You may also choose to compile and run them in the 2-step process as shown:

   ```shell
   tsc # step 1
   node dist/index.js # step 2
   ```

### tsconfig.json

A `tsconfig.json` file is included as a configuration file used during compilation of the TypeScript source code.
Should `tsconfig.json` not be made readily available for you, run `tsc --init` in the Terminal and ensure the following configuration options are set:

```json
{
	"compilerOptions": {
		/* Visit https://aka.ms/tsconfig to read more about this file */

		/* ... */

		/* Language and Environment */
		"target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
		/* ... */

		/* Modules */
		"module": "commonjs" /* Specify what module code is generated. */,
		"rootDir": "./src" /* Specify the root folder within your source files. */,
		"moduleResolution": "node10" /* Specify how TypeScript looks up a file from a given module specifier. */,
		/* ... */

		/* Emit */
		/* ... */
		"sourceMap": true /* Create source map files for emitted JavaScript files. */,
		"outDir": "./dist" /* Specify an output folder for all emitted files. */,
		"removeComments": true /* Disable emitting comments. */,
		/* ... */
		"noEmitOnError": true /* Disable emitting files if any type checking errors are reported. */,
		/* ... */

		/* Interop Constraints */
		/* ... */
		"esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
		/* ... */
		"forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

		/* Type Checking */
		"strict": true /* Enable all strict type-checking options. */,
		/* ... */
		"noImplicitReturns": true /* Enable error reporting for codepaths that do not explicitly return in a function. */,
		/* ... */
		"noImplicitOverride": true /* Ensure overriding members in derived classes are marked with an override modifier. */,
		/* ... */
		"allowUnreachableCode": true /* Disable error reporting for unreachable code. */,

		/* Completeness */
		/* ... */
		"skipLibCheck": true /* Skip type checking all .d.ts files. */
	}
}
```
