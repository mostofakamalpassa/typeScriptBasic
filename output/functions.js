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
// ~~~~~
// Error: Argument of type '"100"' is not assignable
// to parameter of type 'number | undefined'.
