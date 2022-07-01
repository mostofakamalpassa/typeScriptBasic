"use strict";
/*
    Why only use the
Boring built-in type shapes when
We can make our own!
*/
// The two syntaxes are almost identical
let valueLater;
// Ok
valueLater = {
    born: 1935,
    name: "Sara Teasdale",
};
// valueLater = "Emily Dickinson"; // get Error
// Error: Type 'string' is not assignable to 'Poet'.
valueLater = {
    //   born: true,// get Error
    born: 1444,
    // Error: Type 'boolean' is not assignable to type 'number'.
    name: "Sappho",
};
// Ok
const okk = {
    author: "Rita Dove",
    pages: 80,
};
function read(page) {
    // Ok: reading the text property doesn't attempt to modify it
    console.log(page.text);
    // page.text += "!"; // get error
}
const hasBothInterface = {
    property: () => "Hello",
    method() {
        return "string ";
    },
};
hasBothInterface.property(); // Ok
hasBothInterface.method(); // Ok
// Type: (input: string) => number
const typedFunctionAlias = (input) => input.length; // Ok
// Type: (input: string) => number
const typedCallSignature = (input) => input.length; // Ok
let hasCallCount;
function keepsTrackOfCalls() {
    keepsTrackOfCalls.count += 1;
    console.log(`I've been called ${keepsTrackOfCalls.count} times!`);
}
keepsTrackOfCalls.count = 0;
hasCallCount = keepsTrackOfCalls; // Ok
const counts = {};
counts.apple = 0; // Ok
counts.banana = 1; // Ok
const publishDates = {
    Frankenstein: new Date("1 January 1818"),
};
publishDates.Frankenstein; // Type: Date
console.log(publishDates.Frankenstein.toString()); // Ok
publishDates.Beloved; // Type: Date, but runtime value of undefined!
console.log(publishDates.Beloved.toString()); // Ok in the type system, but...
// Runtime error: Cannot read property 'toString'
// of undefined (reading publishDates.Beloved)
