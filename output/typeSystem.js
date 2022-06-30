"use strict";
// 
// Object
// functions
// arrays
// symbol
// null
// undefined
// boolean // true or false
// string // "", "Hi!", "abc123", …
// number // 0, 2.1, -4, …
//bigint // 0n, 2n, -4n, …
//symbol // Symbol(), Symbol("hi"), …
// For each of these values, TypeScript understands the type of the value to be
// one of the seven basic primitives:
// null; // null
// undefined; // undefined
// true; // boolean
// "Louise"; // string
// 1337; // number
// 1337n; // bigint
// Symbol("Franklin"); // symbol
let signer = "abc ";
let bestSong = Math.random() > .5 ? "Chain of foll" : 'Respect';
/*

    Type Systems
A type system is the set of rules for how a programming language
understands what types the constructs in a program may have.

At its core, TypeScript’s type system works by:
Reading in your code and understanding all the types and values in
existence

For each value, seeing what type its initial declaration indicates it may
contain

For each value, seeing all the ways it’s used later on in code
Complaining to the user if a value’s usage doesn’t match with its type

*/
/*
    Kinds of Errors
While writing TypeScript, the two kinds of “errors” you’ll come across
most frequently are:

Syntax
Blocking TypeScript from being converted to JavaScript

Type
Something mismatched has been detected by the type checker
The differences between the two are important


*/
/*


Type Annotations
Sometimes a variable doesn’t have an initial value for TypeScript to read.
TypeScript won’t attempt to figure out the initial type of the variable from
later uses. It’ll consider the variable by default to be implicitly the any type:
indicating that it could be anything in the world.

Variables that can’t have their initial type inferred go through what’s called
an evolving any: rather than enforce any particular type, TypeScript will

*/
let rocker; // Type: any
rocker = "kamal passa"; // Type: string
rocker.toUpperCase(); // Ok
rocker = 19.58; // Type: number
rocker.toPrecision(1); // Ok
//rocker.toUpperCase();
let rocker1 = 'kamal passa';
rocker1.toUpperCase();
// rocker1 = 20
let rocker2;
rocker2 = "kamal passa";
let rapper = "this is a queen Wrpper";
// rapper = 55;
// rapper.push('aa');
let char = {
    firstName: 'kamal',
    lastName: 'jamal'
};
// What a “type” is and the primitive types recognized by TypeScript
// What a “type system” is and how TypeScript’s type system
// understands code
// How type errors compare to syntax errors
// Inferred variable types and variable assignability
// Type annotations to explicitly declare variable types and avoid
// evolving any types
// Object member checking on type shapes
// ECMAScript module files’ declaration scoping compared to script
// files
