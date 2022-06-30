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
let arrayOfNumbers: number[];
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
let createStrings: () => string[];

// Type is an array of functions that each return a string
let stringCreators: (() => string)[];

// ======================== Union-Type Arrays ====================
// Type is either a number or an array of strings
let stringOrArrayOfNumbers: string | number[];
// Type is an array of elements that are each either a number or a string
let arrayOfStringOrNumbers: (string | number)[];

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
let arrayOfArraysOfNumbers: number[][];
arrayOfArraysOfNumbers = [
  [1, 2, 3],
  [2, 4, 6],
  [3, 6, 9],
];

let arrayOfThreeDymentional: number[][][];

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

function withElements(elements: string[]) {
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
function logWarriors(greeting: string, ...names: string[]) {
    for (const name of names) {
    console.log(`${greeting}, ${name}!`);
    }
    }
    const warriorsS = ["Cathay Williams", "Lozen", "Nzinga"];
    logWarriors("Hello", ...warriorsS);
    const birthYears = [1844, 1840, 1583];