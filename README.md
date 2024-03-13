# Root Cause Analysis Chatbot Tool

_In partial fulfilment of the requirements for SE6005 Capstone Project, a core subject under Master of Science in Cyber Security (MSCS) in Nanyang Technological University (NTU), Singapore._

This is a CLI Root Cause Analysis chatbot tool written using TypeScript in a Node.js environment.
The tool utilizes OpenAI's API to analyze a set of files containing stack traces belonging to a software crash, and determining the root cause of what caused the crash.

## Pre-requisites

### Node.js

You will require **Node.js** to run the chatbot.
This chatbot was developed using Node v20.10.0 running on macOS Sonoma 14.3.1.

Check your version of Node.js with the following Terminal command (it should display the version number if installed correctly):

```shell
node -v
```

### TypeScript

For best experience, you will require **TypeScript**.
`package.json` indicates TypeScript as a project dependency; you should be able to install it alongside any other required dependencies using `npm i`.

This project was developed with TypeScript 5.3.3.
Check your TypeScript version using the following Terminal command:

```shell
tsc -v
```

## Setup

1. Obtain an OpenAI API secret key from [`https://platform.openai.com/account/api-keys`](https://platform.openai.com/account/api-keys).
2. Create a file named `.env` and add the following:

   ```
   API_KEY=<YOUR_API_KEY_HERE>
   ```

   Follow the syntax as given. Replace `<YOUR_API_KEY_HERE>` with your OpenAI API secret key.

   The project folder structure should be as follows:

   ```
   rca-tool/
   |- crashes         (contains stack trace files to analyze)
   |- dist/           (JavaScript code, appears after compiling the TypeScript source code)
   |- node_modules/   (appears after finishing Step 3)
   |- samples/        (contains full stack trace outputs from fuzzing software crashes of varying CVEs)
   |- src/            (contains TypeScript source code)
      |- components/
         |- functions.ts      (to contain executable functions based on user prompts)
         |- index.ts
         |- lib/
            |- getNewUserPrompt.ts
            |- getReadLimit.ts
            |- index.ts
            |- saveSession.ts
      |- config/
         |- index.ts
         |- open-ai.ts
      |- index.ts
   |- sessions/      (contains JSON logs of prompts and responses involved in previous sessions)
   |- tests/         (unit test files, to populate as number of functions involved increases)
      |- functions.test.ts
      |- getReadLimit.test.ts
   |- .env           (to prepare on your own)
   |- .gitignore
   |- .prettierrc.json
   |- chat-history.json
   |- package.json
   |- README.md
   |- tsconfig.json
   |- vitest.config.json
   ```

3. Install dependencies.

   ```shell
   npm i
   ```

4. Run the chatbot using the following shell command in the project folder.

   ```shell
   npm run ce
   ```

   This involves a 2-step process: first, the TypeScript code from `src/` is compiled into JavaScript code, which will be stored as JavaScript files in `dist/`.
   Then, those JavaScript files are run under the Node.js environment.

   You may also choose to compile and run them in the 2-step process as shown:

   ```shell
   tsc # step 1
   node dist/index.js # step 2
   ```

   Alternatively, if you choose to run the chatbot without recompiling, just run Step 2.
   You will need to ensure that there exists a set of compiled JS files first, though.

   ```shell
   node dist/index.js
   ```

## Usage

1. Ensure that the crashes folder contains text files with the necessary stack trace information in them first before executing the application.
   One example of the stack trace contents may be like as follows:

```
==11852==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000003033 at pc 0x556321736838 bp 0x7ffe4d212270 sp 0x7ffe4d212260
WRITE of size 1 at 0x602000003033 thread T0
    #0 0x556321736837 in quote_for_pmake asm/nasm.c:856
    #1 0x556321736837 in quote_for_pmake asm/nasm.c:784
    #2 0x556321732055 in emit_dependencies asm/nasm.c:397
    #3 0x556321732055 in main asm/nasm.c:738
    #4 0x7f1d84829d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #5 0x7f1d84829e3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #6 0x556321734c6d in _start (/home/deezombiedude/rca/13_nasm_2022-44370/nasm_fuzz+0x11bc6d)
```

2. You will be asked how many stack trace files are to be analyzed (due to how token limits are implemented in GPT).
   The number of stack traces analyzed will be limited by either the entered number or the number of provided stack traces, whichever is smaller.

   - Since a token limit exists (currently at `10,000`), there is no hard limit on the maximum number of stack trace files that can be analyzed in one go.
     This number is dependent on how many tokens each of the stack trace file's contents will use up.
     To gauge how many tokens your stack trace file's contents will take up, refer to [OpenAI's tokenizer](https://platform.openai.com/tokenizer).
   - Also, the order of which stack trace files are read first is determined solely by their names in alphabetical order.

3. Upon receiving this response, you may pursue one of several course of actions:
   - **A follow-up prompt (to clarify received response from earlier, etc.):**
     Just type out your follow-up prompt in free response mode as you would on any chatbot.
   - **Reanalyze stack trace files:**
     Enter `readCrashes` without any extra preceeding or trailing words.
   - **Quit:**
     Enter `quit` or `exit` without any extra preceeding or trailing words.

**NOTES:**

1. Prematurely ending the session with `CTRL`+`c` is not expected to corrupt any related files, but is strongly discouraged nonetheless.
2. Currently the RCA chatbot tool has the following caveat(s) (as of Feb 21, 2024):
   - the number of stack trace file inputs are dependent on content of those files and the allowed token limit

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
  },
  "exclude": [
    "tests/**/*",
    "**/*.test.ts"
  ] /* Ignores test files during TypeScript compilation. */
}
```

### Stack Trace Output Sample Pool

Stack traces from the following CVEs were used in testing this tool; the command used to generate each one in the sample pool of stack traces are included.

Here, status refers to one of 2 values: **Control** (equal stack trace outputs) and **Variable** (varying stack trace outputs).

<!--
** Control Pool **
CVE-2020-7060:  11_php_2020-7060
CVE-2023-31722: 12_nasm_2023-31722

** Test Pool **
CVE-2021-20284: 20_nm-new_2021-20284
CVE-2022-44370: 13_nasm_2022-44370
-->

| CVE Enumeration | Command                                                |  Status  | # Stack Traces |
| --------------- | ------------------------------------------------------ | :------: | :------------: |
| CVE-2020-7060   | `./php_fuzz inputs/crashes/id%3A000000`                | Control  |       51       |
| CVE-2023-31722  | `./nasm_fuzz -f elf64 inputs/crashes/id%3A000000`      | Control  |       69       |
| CVE-2021-20284  | `./nm-new_fuzz --synthetic inputs/crashes/id%3A000000` | Variable |      109       |
| CVE-2022-44370  | `./nasm_fuzz -M inputs/crashes/id%3A000000`            | Variable |      210       |

Each stack trace output was saved into a .txt file.
For example,

```zsh
./php_fuzz inputs/frashes/id%3A000050 > 50.txt
```

### Disclaimer

As OpenAI states in the typical ChatGPT interface, it's only right that we put this here too.

> "ChatGPT can make mistakes. Consider checking important information."

Feel free to regenerate your analysis results by entering `readCrashes` when the chatbot asks for another response!
This tool was created with learning and education in mind, so do not hesitate to consult second opinions from here or through another source.

Remember, large language models (LLMs) like ChatGPT are not perfect, but helping them be as perfect can be is where all of you can come in.
In time, hopefully, these efforts can help garner more productive tools or greater capabilities to existing ones like this one here!
