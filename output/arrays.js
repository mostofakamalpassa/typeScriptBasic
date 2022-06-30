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
        [22, 444, 55, 66, 77, 3],
        [22, 444, 55, 66, 77, 3],
        [22, 444, 55, 66, 77, 3],
    ],
];
// =============== Array Members =================
const defenders = ["Clarenza", "Dina"];
// Type: string
const defender = defenders[0];
const soldiersOrDates = ["Deborah Sampson", new Date(1782, 6, 3)];
// Type: Date | string
const soldierOrDate = soldiersOrDates[0];
function withElements(elements) {
    console.log(elements[9001].length); // No type error
}
withElements(["It's", "over"]);
// ====================== Spreads and Rests ==================
/*
    Remember ... rest parameters for functions Rest parameters and array spreading, both with the ... operator, are key
ways to interact with arrays in JavaScript
*/
/*
   ====================== Spreads ==================
Arrays can be joined together using the ... spread operator. TypeScript
understands the result array will contain values that can be from either of
the input arrays.
*/
// Type: string[]
const soldiers = ["Harriet Tubman", "Joan of Arc", "Khutulun"];
// Type: number[]
const soldierAges = [90, 19, 45];
// Type: (string | number)[]
const conjoined = [...soldiers, ...soldierAges];
// ========================== Spreading Rest Parameters ==================
function logWarriors(greeting, ...names) {
    for (const name of names) {
        console.log(`${greeting}, ${name}!`);
    }
}
const warriorsS = ["Cathay Williams", "Lozen", "Nzinga"];
logWarriors("Hello", ...warriorsS);
const birthYears = [1844, 1840, 1583];
//======================== Tuples ===============================
/*
        Although JavaScript arrays may be any size in theory, it is sometimes useful
to use an array of a fixed size—also known as a tuple. Tuple arrays have a specific known type at each index that may be more specific than a union
type of all possible members of the array. The syntax to declare a tuple type looks like an array literal, but with types in place of element values.
    */
let yearAndWarrior;
yearAndWarrior = [530, "Tomyris"]; // Ok
// yearAndWarrior = [530]; // get Errors
// Error: Type '[number]' is not assignable to type '[number, string]'.
// Source has 1 element(s) but target requires 2.
// year type: number
// warrior type: string
let [year, warrior] = Math.random() > 0.5 ? [340, "Archidamia"] : [1828, "Rani of Jhansi"];
// ============================= Tuple Assignability ===================
/*
    Tuple types are treated by TypeScript as more specific than variable length array types. That means variable length array types aren’t assignable to tuple types.
*/
// Type: (boolean | number)[]
const pairLoose = [false, 123];
const tupleThree = [false, 1583, "Nzinga"];
const tupleTwoExact = [tupleThree[0], tupleThree[1]];
// ============================== Tuples as rest parameters ====================
function logPair(name, value) {
    console.log(`${name} has ${value}`);
}
const pairArray = ["Amage", 1];
// logPair(...pairArray); // get error
// Error: A spread argument must either have a
// tuple type or be passed to a rest parameter
const pairTupleCorrect = ["Amage", 1];
logPair(...pairTupleCorrect); // Ok
function logTrio(name, value) {
    console.log(`${name} has ${value[0]} (${value[1]}`);
}
const trios = [
    ["Amanitore", [1, true]],
    ["Æthelflæd", [2, false]],
    ["Ann E. Dunwoody", [3, false]],
];
trios.forEach((trio) => logTrio(...trio)); // Ok
// ====================== Tuple Inferences ===============
// Return type: (string | number)[]
function firstCharAndSize(input) {
    return [input[0], input.length];
}
// firstChar type: string | number
// size type: string | number
const [firstChar, size] = firstCharAndSize("Gudit");
