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
    start: new Date("2022-06-30")
    //start: "2022-06-30",
    // Error: Type 'string' is not assignable to type 'Date'.
};
