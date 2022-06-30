/* 
    Function arguments
In one end, out the other
As a return type
*/

//===================== Function Parameters ==================

function sing(song: string) {
  console.log(`Singing: ${song}!`);
}

//======================= Required Parameters=======================

function singTwo(first: string, second: string) {
  console.log(`${first} / ${second}`);
}
// Logs: "Ball and Chain / undefined"
// singTwo("Ball and Chain");

// Error: Expected 2 arguments, but got 1.
// Logs: "I Will Survive / Higher Love"
singTwo("I Will Survive", "Higher Love"); // Ok
// Logs: "Go Your Own Way / The Chain"
// singTwo("Go Your Own Way", "The Chain", "Dreams");

// Error: Expected 2 arguments, but got 3.

/* 
    ===================== Notes ===================
    Parameter refers to a function’s declaration of what it expects to receive as an argument.
Argument refers to a value provided to a parameter in a function call. 
In the previous example,
first and second are parameters, while strings such as "Dreams" are arguments.
*/

// ===================== Optional Parameters ====================

function announceSong(song: string, singer?: string) {
  console.log(`Song: ${song}`);
  if (singer) {
    console.log(`Singer: ${singer}`);
  }
}
announceSong("Greensleeves"); // Ok
announceSong("Greensleeves", undefined); // Ok
announceSong("Chandelier", "Sia"); // Ok
// These optional parameters are always implicitly able

/* 
        These optional parameters are always implicitly able to be undefined. In
the previous code, singer starts off as being of type string | undefined,
then is narrowed to just string by the if statement.
Optional parameters are not the same as parameters with union types that
happen to include | undefined.
 Parameters that aren’t marked as optional
with a ? must always be provided, even if the value is explicitly undefined.
The singer parameter in this announceSongBy function must be provided
explicitly. It may be a string value or undefined:
    */

function announceSongBy(song: string, singer: string | undefined) {
  /* ... */
}
// announceSongBy("Greensleeves");
// Error: Expected 2 arguments, but got 1.
announceSongBy("Greensleeves", undefined); // Ok
announceSongBy("Chandelier", "Sia"); // Ok

// ======================= Default Parameters ===================

function rateSong(song: string, rating = 0) {
  console.log(`${song} gets ${rating}/5 stars!`);
}
rateSong("Photograph"); // Ok
rateSong("Set Fire to the Rain", 5); // Ok
rateSong("Set Fire to the Rain", undefined); // Ok
// rateSong("At Last!", "100"); // get Error
// Error: Argument of type '"100"' is not assignable
// to parameter of type 'number | undefined'.

// ======================= Rest Parameters ====================

/* 
    Some functions in JavaScript are made to be called with any number of arguments.
 The ... spread operator may be placed on the last parameter in
a function declaration to indicate any “rest” arguments passed to the
function starting at that parameter should all be stored in a single array.

TypeScript allows declaring the types of these rest parameters similarly to
regular parameters, except with a [] syntax added at the end to indicate it’s
an array of arguments.
Here, singAllTheSongs is allowed to take zero or more arguments of type
string for its songs rest parameter:
    
    */

function singAllTheSongs(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log(`${song}, by ${singer}`);
  }
}
singAllTheSongs("Alicia Keys"); // Ok
singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face"); // Ok
// singAllTheSongs("Ella Fitzgerald", 2000);

// Error: Argument of type 'number' is not
// assignable to parameter of type 'string'.

//================== Return Types =================

// Type: (songs: string[]) => number
function singSongs(songs: string[]) {
  for (const song of songs) {
    console.log(`${song}`);
  }
  return songs.length;
}

/* 
    If a function contains multiple return statements with different values,
TypeScript will infer the return type to be a union of all the possible
returned types.
This getSongAt function would be inferred to return string | undefined
because its two possible returned values are typed string and undefined,
respectively
*/
// Type: (songs: string[], index: number) => string | undefined
function getSongAt(songs: string[], index: number) {
  return index < songs.length ? songs[index] : undefined;
}

//============================== Explicit Return Types =========================

/* You might want to enforce functions with many possible returned values always return the same type of value.
TypeScript will refuse to try to reason through return types of recursive function.
It can speed up TypeScript type checking in very large projects—i.e.,
those with hundreds of TypeScript files or more. */

function singSongsRecursive(songs: string[], count = 0): number {
  return songs.length ? singSongsRecursive(songs.slice(1), count) : count;
}

const singSongsRecursives = (songs: string[], count = 0): number => {
  return songs.length ? singSongsRecursives(songs.slice(1), count) : count;
};

function getSongRecordingDate(song: string): null | Date {
  switch (song) {
    case "Strange Fruit":
      return new Date("2022-06-3000");
      break;
    case "Greensleeves":
      // return 'unkwon'; // get error
      return new Date("2022-04-03");
      break;
    default:
      return null;

      break;
  }
}

//============================ Function Types =========================

/* 
    JavaScript allows us to pass functions around as values. That means we
need a way to declare the type of a parameter or variable meant to hold a function.
Function type syntax looks similar to an arrow function, but with a type instead of the body.
This nothingInGivesString variable’s type describes a function with no parameters and a returned string value:
*/

let nothingInGivesString: () => string;
/* 
    This inputAndOutput variable’s type describes a function with a string[]
    parameter, an optional count parameter, and a returned number value:
*/
let inputAndOutput: (songs: string[], count?: number) => number;
/* Function types are frequently used to describe callback parameters
(parameters meant to be called as functions). */

const songs = ["Juice", "Shake It Off", "What's Up"];
function runOnSongs(getSongAt: (index: number) => string) {
  for (let i = 0; i < songs.length; i += 1) {
    console.log(getSongAt(i));
  }
}

function getSongAtss(index: number) {
  return `${songs[index]}`;
}
runOnSongs(getSongAtss); // Ok
function logSong(song: string) {
  return `${song}`;
}
// runOnSongs(logSong); // get Error

// Error: Argument of type '(song: string) => string' is not
// assignable to parameter of type '(index: number) => string'.
// Types of parameters 'song' and 'index' are incompatible.
// Type 'number' is not assignable to type 'string'.

/*     logSongs: (strong: string) => string is the provided type being assigned to the getSongAt: (index: number) => string recipient */

/* 
    2. The song parameter of logSong being assigned to the index parameter of getSongAt
    3. song’s number type is not assignable to index’s string type
*/

/* 
   ============================ TIP =========================
TypeScript’s multiline errors can seem daunting at first. Reading through them line-by-line and
understanding what each part is conveying goes a long way to comprehending the error.
*/

//========================= Function Type Parentheses =================

// Type is a function that returns a union: string | undefined
let returnsStringOrUndefined: () => string | undefined;
// Type is either undefined or a function that returns a string
let maybeReturnsString: (() => string) | undefined;

// =========================== Parameter Type Inferences =============
/* 
    It would be cumbersome if we had to declare parameter types for every
function we write, including inline functions used as parameters.
Fortunately, TypeScript can infer the types of parameters in a function
provided to a location with a declared type.
This singer variable is known to be a function that takes in a parameter of
type string, so the song parameter in the function later assigned to singer
is known to be a string:
*/

let singer: (song: string) => string;
singer = function (song) {
  // Type of song: string
  return `Singing: ${song.toUpperCase()}!`; // Ok
};

const songsS = ["Call Me", "Jolene", "The Chain"];
// song: string
// index: number
songsS.forEach((song, index) => {
  console.log(`${song} is at index ${index}`);
});

//=========================== Function Type Aliases =======================
/* 
    They can be used for function types as well.
This StringToNumber type aliases a function that takes in a string and
returns a number, which means it can be used later to describe the types of variables:
*/

type StringToNumber = (input: string) => number;
let stringToNumber: StringToNumber;
stringToNumber = (input) => input.length; // Ok
// stringToNumber = (input) => input.toUpperCase(); // GET ERROR

// Error: Type 'string' is not assignable to type 'number'. Similarly,

type NumberToString = (input: number) => string;
function usesNumberToString(numberToString: NumberToString) {
  console.log(`The string is: ${numberToString(1234)}`);
}
usesNumberToString((input) => `${input}! Hooray!`); // Ok
// usesNumberToString((input) => input * 2); // get Error

// Error: Type 'number' is not assignable to type 'string'.

//=========================== Void Returns ====================
function logSongs(song: string | undefined): void {
  if (!song) {
    return; // Ok
  }
  console.log(`${song}`);
  // return true; // Get Error
  // Error: Type 'boolean' is not assignable to type 'void'.
}

let songLogger: (song: string) => void;
songLogger = (song) => {
  console.log(`${songs}`);
};
songLogger("Heart of Glass"); // Ok

function returnsVoid() {
  return undefined;
  //   return // get Error
}
let lazyValue: string | undefined;
lazyValue = returnsVoid();
// Error: Type 'void' is not assignable to type 'string | undefined'.

const records: string[] = [];
function saveRecords(newRecords: string[]) {
  newRecords.forEach((record) => records.push(record));
}
saveRecords(["21", "Come On Over", "The Bodyguard"]);

// ============================== Never Returns ====================
function fail(message: string): never {
  throw new Error(`Invariant failure: ${message}.`);
}
function workWithUnsafeParam(param: unknown) {
  if (typeof param !== "string") {
    fail(`param should be a string, not ${typeof param}`);
  }
  // Here, param is known to be type string
  param.toUpperCase(); // Ok
}

/* 
    never is not the same as void. void is for a function that returns nothing. never is for a function that never returns.
*/

//============================= Function Overloads ==================================

/* 
    Some JavaScript functions are able to be called with drastically different sets of parameters that can’t be represented just by optional and/or rest
parameters. These functions can be described with a TypeScript syntax called overload signatures: declaring different versions of the function’s
name, parameters, and return types multiple times before one final implementation signature and the body of the function.
*/

function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
function createDate(monthOrTimestamp: number, day?: number, year?: number) {
  return day === undefined || year === undefined
    ? new Date(monthOrTimestamp)
    : new Date(year, monthOrTimestamp, day);
}
createDate(554356800); // Ok
createDate(7, 27, 1987); // Ok
// createDate(4, 1); // get Error
// Error: No overload expects 2 arguments, but overloads
// do exist that expect either 1 or 3 arguments.

// function formats(data: string): string; // Ok
// function formats(data: string, needle: string, haystack: string): string; // Ok
// function formats(getData: () => string): string; // getError
// function formats(data: string, needle?: string, haystack?: string) {
//   return needle && haystack ? data.replace(needle, haystack) : data;
// }
// This overload signature is not compatible with its implementation
