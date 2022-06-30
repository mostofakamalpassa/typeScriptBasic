"use strict";
/*
    Arrays and tuples
    One flexible and one fixed
    Choose your adventure
    JavaScript arrays are wildly flexible and can hold any mixture of values inside:
*/
const elements = [true, null, undefined, 42];
// elements.push("even", ["more"]);
// Value of elements: [true, null, undefined, 42, "even", ["more"]]
/*
    In most cases, though, individual JavaScript arrays are intended to hold
only one specific type of value. Adding values of a different type may be
confusing to readers, or worse, the result of an error that could cause
problems in the program.

*/
const warriors = ["Artemisia", "Boudica"];
// Ok: "Zenobia" is a string
warriors.push("Zenobia");
// ============================ Array Types ============================
let arrayOfNumbers;
arrayOfNumbers = [4, 8, 15, 16, 23, 42];
/*
   ======================== NOTE =====================================
Array types can also be written in a syntax like Array<number> called class generics. Most developers prefer the simpler number[].
*/
//============================ Array and Function Types ============================
/*
    Array types are an example of a syntax container where function types may
need parentheses to distinguish what’s in the function type or not.
Parentheses may be used to indicate which part of an annotation is the
function return or the surrounding array type.
*/
// Type is a function that returns an array of strings
let createStrings;
// Type is an array of functions that each return a string
let stringCreators;
// ======================== Union-Type Arrays ====================
// Type is either a number or an array of strings
let stringOrArrayOfNumbers;
// Type is an array of elements that are each either a number or a string
let arrayOfStringOrNumbers;
// Type is (string | undefined)[]
const namesMaybe = ["Aqualtune", "Blenda", undefined];
// ================== Evolving Any Arrays ================
// Type: any[]
let values = [];
// Type: string[]
values.push("");
// Type: (number | string)[]
values[0] = 0;
//======================== Multidimensional Arrays ===================
let arrayOfArraysOfNumbers;
arrayOfArraysOfNumbers = [
    [1, 2, 3],
    [2, 4, 6],
    [3, 6, 9],
];
let arrayOfThreeDymentional;
arrayOfThreeDymentional = [
    [
        [
            22, 444, 55, 66, 77, 3
        ],
        [
            22, 444, 55, 66, 77, 3
        ],
        [
            22, 444, 55, 66, 77, 3
        ],
    ]
];
