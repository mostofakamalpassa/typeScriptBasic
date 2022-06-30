"use strict";
/*
    Function arguments
In one end, out the other
As a return type
*/
//===================== Function Parameters ==================
function sing(song) {
    console.log(`Singing: ${song}!`);
}
//======================= Required Parameters=======================
function singTwo(first, second) {
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
function announceSong(song, singer) {
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
function announceSongBy(song, singer) {
    /* ... */
}
// announceSongBy("Greensleeves");
// Error: Expected 2 arguments, but got 1.
announceSongBy("Greensleeves", undefined); // Ok
announceSongBy("Chandelier", "Sia"); // Ok
// ======================= Default Parameters ===================
function rateSong(song, rating = 0) {
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
function singAllTheSongs(singer, ...songs) {
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
function singSongs(songs) {
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
function getSongAt(songs, index) {
    return index < songs.length ? songs[index] : undefined;
}
//============================== Explicit Return Types =========================
/* You might want to enforce functions with many possible returned values always return the same type of value.
TypeScript will refuse to try to reason through return types of recursive function.
It can speed up TypeScript type checking in very large projects—i.e.,
those with hundreds of TypeScript files or more. */
function singSongsRecursive(songs, count = 0) {
    return songs.length ? singSongsRecursive(songs.slice(1), count) : count;
}
const singSongsRecursives = (songs, count = 0) => {
    return songs.length ? singSongsRecursives(songs.slice(1), count) : count;
};
function getSongRecordingDate(song) {
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
let nothingInGivesString;
/*
    This inputAndOutput variable’s type describes a function with a string[]
    parameter, an optional count parameter, and a returned number value:
*/
let inputAndOutput;
/* Function types are frequently used to describe callback parameters
(parameters meant to be called as functions). */
const songs = ["Juice", "Shake It Off", "What's Up"];
function runOnSongs(getSongAt) {
    for (let i = 0; i < songs.length; i += 1) {
        console.log(getSongAt(i));
    }
}
function getSongAtss(index) {
    return `${songs[index]}`;
}
runOnSongs(getSongAtss); // Ok
function logSong(song) {
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
let returnsStringOrUndefined;
// Type is either undefined or a function that returns a string
let maybeReturnsString;
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
let singer;
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
let stringToNumber;
stringToNumber = (input) => input.length; // Ok
function usesNumberToString(numberToString) {
    console.log(`The string is: ${numberToString(1234)}`);
}
usesNumberToString((input) => `${input}! Hooray!`); // Ok
// usesNumberToString((input) => input * 2); // get Error
// Error: Type 'number' is not assignable to type 'string'.
//=========================== Void Returns ====================
function logSongs(song) {
    if (!song) {
        return; // Ok
    }
    console.log(`${song}`);
    // return true; // Get Error
    // Error: Type 'boolean' is not assignable to type 'void'.
}
let songLogger;
songLogger = (song) => {
    console.log(`${songs}`);
};
songLogger("Heart of Glass"); // Ok
function returnsVoid() {
    return undefined;
    //   return // get Error
}
let lazyValue;
lazyValue = returnsVoid();
// Error: Type 'void' is not assignable to type 'string | undefined'.
const records = [];
function saveRecords(newRecords) {
    newRecords.forEach((record) => records.push(record));
}
saveRecords(["21", "Come On Over", "The Bodyguard"]);
// ============================== Never Returns ====================
