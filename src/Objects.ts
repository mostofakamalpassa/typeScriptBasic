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
  start: new Date("2022-06-30"),
  //start: "2022-06-30",
  // Error: Type 'string' is not assignable to type 'Date'.
};

// ----------------  Excess Property Checking -----------------

type Poets = {
  born: number;
  name: string;
};
// Ok: all fields match what's expected in Poet
const poetMatch: Poets = {
  born: 1928,
  name: "Maya Angelou",
};
const extraProperty: Poets = {
  // activity: "walking", // get error
  born: 1935,
  name: "Mary Oliver",
};
// Error: Type '{ activity: string; born: number; name: string; }'

const existingObject = {
  activity: "walking",
  born: 1935,
  name: "Mary Oliver",
};
const extraPropertyButOk: Poets = existingObject; // Ok
// is not assignable to type 'Poet'.
// Object literal may only specify known properties,
// and 'activity' does not exist in type 'Poet'.

// -------------------------------------- Nested Object Types -------------------------

type Poemss = {
  author: {
    firstName: string;
    lastName: string;
  };
  name: string;
};
// Ok

const poemMatch: Poemss = {
  author: {
    firstName: "Sylvia",
    lastName: "Plath",
  },
  name: "Lady Lazarus",
};

const poemMismatch: Poemss = {
  author: {
    firstName: "a",
    lastName: "b",
    // name: "Sylvia Plath",
  },
  // Error: Type '{ name: string; }' is not assignable
  // to type '{ firstName: string; lastName: string; }'.
  // Object literal may only specify known properties, and 'name'
  // does not exist in type '{ firstName: string; lastName: string; }'.
  name: "Tulips",
};

type Author = {
  firstName: string;
  lastName: string;
};
type Poem = {
  author: Author;
  name: string;
};

// const poemMismatch: Poem = {
//     author: {
//     name: "Sylvia Plath",
//     },
//     // Error: Type '{ name: string; }' is not assignable to type 'Author'.
//     // Object literal may only specify known properties,
//     // and 'name' does not exist in type 'Author'.
//     name: "Tulips",
//     };

// -------------------------------   Optional Properties ----------------------

/* 
    Object type properties don’t all have to be required in the object. You can
include a ? before the : in a type property’s type annotation to indicate that
it’s an optional property.
This Book type requires only a pages property and optionally allows an
author. Objects adhering to it may provide author or leave it out as long
as they provide pages:
*/

type Book = {
  author?: string;
  pages: number;
};
// Ok
const ok: Book = {
  author: "Rita Dove",
  pages: 80,
};

const missing: Book = {
  pages: 200, // prevent for error  this property is required
  // author: "Rita Dove",
};
// Error: Property 'pages' is missing in type
// '{ author: string; }' but required in type 'Book'.

type Writers = {
  author: string | undefined;
  editor?: string;
};
// Ok: author is provided as undefined
const hasRequired: Writers = {
  author: undefined,
};

// const missingRequired: Writers = {};

// Error: Property 'author' is missing in type
// '{}' but required in type 'Writers'.

// -----------------------------  Unions of Object Types ------------------

// Inferred Object-Type Unions

const poem =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhymes: true };
// Type:
// {
// name: string;
// pages: number;
// rhymes?: undefined;
// }

// |  UNION

// {
// name: string;
// pages?: undefined;
// rhymes: boolean;
// }
poem.name; // string
poem.pages; // number | undefined
poem.rhymes; // booleans | undefined

// -------------  Explicit Object-Type Unions ------------------

type PoemWithPages = {
  name: string;
  pages: number;
};
type PoemWithRhymes = {
  name: string;
  rhymes: boolean;
};
type Poems = PoemWithPages | PoemWithRhymes;
const poems: Poems =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhymes: true };
poems.name; // Ok
// poems.pages; // get errors

// Property 'pages' does not exist on type 'Poems'.
// Property 'pages' does not exist on type 'PoemWithRhymes'.
// poems.rhymes; // get Errors

// Property 'rhymes' does not exist on type 'Poems'.
// Property 'rhymes' does not exist on type 'PoemWithPages'.

// ------------------------ Narrowing Object Types ------------------

if ("pages" in poems) {
  poem.pages; // Ok: poem is narrowed to PoemWithPages
} else {
  poem.rhymes; // Ok: poem is narrowed to PoemWithRhymes
}

// ------------------------------------------- Discriminated Unions --------------------------

/* 
    Another popular form of union typed objects in JavaScript and TypeScript
is to have a property on the object indicate what shape the object is. This
kind of type shape is called a discriminated union, and the property whose
value indicates the object’s type is a discriminant.

TypeScript is able to
perform type narrowing for code that type guards on discriminant
properties.

For example, this Poem type describes an object that can be either a new PoemWithPages type or a new PoemWithRhymes type, and the type
property indicates which one. If poem.type is "pages", then TypeScript is able to infer that the type of poem must be PoemWithPages.

*/

type PoemWithPagess = {
  name: string;
  pages: number;
  type: "pages";
};
type PoemWithRhymess = {
  name: string;
  rhymes: boolean;
  type: "rhymes";
};
type Poemsss = PoemWithPagess | PoemWithRhymess;
const poemsss: Poemsss =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 7, type: "pages" }
    : { name: "Her Kind", rhymes: true, type: "rhymes" };

if (poemsss.type === "pages") {
  console.log(`It's got pages: ${poemsss.pages}`); // Ok
} else {
  console.log(`It rhymes: ${poemsss.rhymes}`);
}

//poemsss.type; // Type: 'pages' | 'rhymes'


//---------------------------------- Intersection Types ----------------------------

/* 
    TypeScript’s | union types represent the type of a value that could be one of
two or more different types. Just as JavaScript’s runtime | operator acts as a
counterpart to its & operator, TypeScript allows representing a type that is
multiple types at the same time: an & intersection type. Intersection types
are typically used with aliased object types to create a new type that
combines multiple existing object types.
The following Artwork and Writing types are used to form a combined
WrittenArt type that has the properties genre, name, and pages:
*/