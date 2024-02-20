import readlineSync from "readline-sync";

// ask for number of crash files to analyze
export function getReadLimit(readCountLimit = 0) {
  // let readCountLimit: number = 0;
  while (readCountLimit < 1) {
    try {
      readCountLimit = parseInt(
        readlineSync.question("Enter number of crash files to analyze >> "),
      );

      if (readCountLimit < 1) console.log("Invalid read limit, try again.");
    } catch (err) {
      console.log("Invalid read limit, try again.");
    }
  }

  return parseInt(readCountLimit.toString()); // always ensure integer values are produced
}
