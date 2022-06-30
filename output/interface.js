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
;
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
