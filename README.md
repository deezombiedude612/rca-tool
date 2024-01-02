# Root Cause Analysis Chatbot Tool

_In partial fulfilment of the requirements for SE6005 Capstone Project, a core subject under Master of Science in Cyber Security (MSCS) in Nanyang Technological University (NTU), Singapore._

This is a CLI Root Cause Analysis chatbot tool written using TypeScript in a Node.js environment.

## Pre-requisites

### Node.js

You will require **Node.js** to run the chatbot.
This chatbot was developed using Node v20.10.0 running on macOS Sonoma 14.1.2.

Check your version of Node.js with the following Terminal command (it should display the version number if installed correctly):

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

## Setup

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

4. Run the bot using the following shell command in the project folder.

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

   Alternatively, if you choose to run the chatbot without recompiling, just run Step 2.

   ```shell
   node dist/index.js
   ```

## Usage

1. Type in your query after ">".
   At present moment, only single-line queries are allowed.

2. To quit the chatbot, enter `exit` or `quit`.

3. Enter `rca` to commence entering the stack trace information for ChatGPT to analyze.
   You will be required to enter the _error description_ first (e.g., heap overflow), followed by the information included in line #0.
   You will be asked to confirm before ChatGPT provides its response.

**NOTES:**

1. Prematurely ending the session with `CTRL`+`c` is not expected to corrupt any related files, but is strongly discouraged nonetheless.
2. Currently the RCA tool has 2 caveats to be fixed (as of Jan 2, 2024):
   - it exits if you choose to not accept the information that has been entered
   - you will need to enter `rca` each time you wish to utilize this interface to enter stack trace information

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

### chat-history.json

The chatbot utilizes a JSON file containing historical records of previously entered queries and responses, except directives like `exit` or `quit`.
Should this file (i.e., `chat-history.json`) not exist, a new one will be created with all entered queries and their respective responses.

**NOTE:** This file will be remade if it is found to be corrupted or unreadable.

`chat-history.json` will contain an array of objects containing 2 attributes: `role` and `content`.
Here, both `role` and `content` attributes take on string values;
however, `role` only has 3 valid values:

1. "user": indicates that the object contains a user query, always preceeds a chatbot response object
2. "assistant": indicates that the object contains a chatbot response, always follows a user query object
3. "system": a directive added during the chatbot's use, removed before backing up to `chat-history.json`

Every 2 objects beginning from the first one make a related pair - a query object (where `role` equals "user") is followed by a response object by the chatbot (where `role` equals "assistant").

```json
[
	{ "role": "user", "content": "Hi there!" },
	{ "role": "assistant", "content": "Hello! How can I assist you today?" }
]
```
