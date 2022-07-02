"use strict";
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
let poetLater;
// Ok
poetLater = {
    born: 1935,
    name: "Mary Oliver",
};
let poetLaters;
// Ok
poetLaters = {
    born: 1935,
    name: "Sara Teasdale",
};
const hasBoth = {
    firstName: "Lucille",
    lastName: "Clifton",
};
// Ok: `hasBoth` contains a `firstName` property of type `string`
let withFirstName = hasBoth;
// Ok: `hasBoth` contains a `lastName` property of type `string`
let withLastName = hasBoth;
// Ok
const hasBoths = {
    first: "Sarojini",
    last: "Naidu",
};
const hasStartString = {
    start: new Date("2022-06-30"),
    //start: "2022-06-30",
    // Error: Type 'string' is not assignable to type 'Date'.
};
// Ok: all fields match what's expected in Poet
const poetMatch = {
    born: 1928,
    name: "Maya Angelou",
};
const extraProperty = {
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
const extraPropertyButOk = existingObject; // Ok
// Ok
const poemMatch = {
    author: {
        firstName: "Sylvia",
        lastName: "Plath",
    },
    name: "Lady Lazarus",
};
const poemMismatch = {
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
// Ok
const ok = {
    author: "Rita Dove",
    pages: 80,
};
const missing = {
    pages: 200, // prevent for error  this property is required
    // author: "Rita Dove",
};
// Ok: author is provided as undefined
const hasRequired = {
    author: undefined,
};
// const missingRequired: Writers = {};
// Error: Property 'author' is missing in type
// '{}' but required in type 'Writers'.
// -----------------------------  Unions of Object Types ------------------
// Inferred Object-Type Unions
const poem = Math.random() > 0.5
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
const poems = Math.random() > 0.5
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
}
else {
    poem.rhymes; // Ok: poem is narrowed to PoemWithRhymes
}
const poemsss = Math.random() > 0.5
    ? { name: "The Double Image", pages: 7, type: "pages" }
    : { name: "Her Kind", rhymes: true, type: "rhymes" };
if (poemsss.type === "pages") {
    console.log(`It's got pages: ${poemsss.pages}`); // Ok
}
else {
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
/*
  

*/ 
