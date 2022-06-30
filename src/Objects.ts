/* 
    Object literals
A set of keys and values
Each with their own type

*/

/* 
    -----------------------------------Object Types ------------------------------------
When you create an object literal with {...} syntax, TypeScript will
consider it to be a new object type, or type shape, based on its properties.
That object type will have the same property names and primitive types as
the object’s values. Accessing properties of the value can be done with
either value.member or the equivalent value['member'] syntax.
TypeScript understands that the following poet variable’s type is that of an
object with two properties: born, of type number, and name, of type
string. Accessing those members would be allowed, but attempting to
access any other member name would cause a type error for that name not
existing:
*/

const poet = {
  born: 1935,
  name: "Mary Oliver",
};

poet["born"]; // Type: number
poet.name; // Type: string
// poet.end; //  get Error

// Error: Property 'end' does not exist on
// type '{ name: string; start: number; }'.

// ---------------------  Declaring Object Types --------------------

let poetLater: {
  born: number;
  name: string;
};
// Ok
poetLater = {
  born: 1935,
  name: "Mary Oliver",
};
// poetLater = "Sappho"; // get error
// Error: Type 'string' is not assignable to
// type '{ born: number; name: string; }'

//------------------------- Aliased Object Types -------------------

type Poet = {
  born: number;
  name: string;
};
let poetLaters: Poet;
// Ok
poetLaters = {
  born: 1935,
  name: "Sara Teasdale",
};
// poetLater = "Emily Dickinson"; // get error
// Error: Type 'string' is not assignable to 'Poet'.

// --------------------------- notes ---------------------
// Most TypeScript projects prefer using the interface keyword to describe object types, which is a feature
// Aliased object types and interfaces are almost identical

//------------------------------- Structural Typing --------------------------

/* 
    TypeScript’s type system is structurally typed: meaning any value that
happens to satisfy a type is allowed to be used as a value of that type.
 In other words, when you declare that a parameter or variable is of a particular
object type, you’re telling TypeScript that whatever object(s) you use, they
need to have those properties.

*/

type WithFirstName = {
  firstName: string;
};
type WithLastName = {
  lastName: string;
};
const hasBoth = {
  firstName: "Lucille",
  lastName: "Clifton",
};
// Ok: `hasBoth` contains a `firstName` property of type `string`
let withFirstName: WithFirstName = hasBoth;
// Ok: `hasBoth` contains a `lastName` property of type `string`
let withLastName: WithLastName = hasBoth;

/* 
    Structural typing is when there is a static system checking the type—in TypeScript’s case, the type checker.

    Duck typing is when nothing checks object types until they’re used at runtime
    In summary: JavaScript is duck typed whereas TypeScript is structurally typed.
*/

type FirstAndLastNames = {
  first: string;
  last: string;
};
// Ok
const hasBoths: FirstAndLastNames = {
  first: "Sarojini",
  last: "Naidu",
};

/*     const hasOnlyOnes: FirstAndLastNames = {
    first: "Sappho"
    }; */

// Property 'last' is missing in type '{ first: string; }'
// but required in type 'FirstAndLastNames'.

type TimeRange = {
  start: Date;
};
const hasStartString: TimeRange = {
    start: new Date("2022-06-30")
  //start: "2022-06-30",
  // Error: Type 'string' is not assignable to type 'Date'.
};
