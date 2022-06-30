"use strict";
/*
    Nothing is constant
    Values may change over time
    (well, except constants)
*/
/*

    Unions
Expanding a value’s allowed type to be two or more possible types

    Narrowing
Reducing a value’s allowed type to not be one or more possible types

Put together, unions and narrowing are powerful concepts that allow
TypeScript to make informed inferences on your code many other
mainstream languages cannot.

*/
// UNION Types
let mathematician = Math.random() > 0.5 ? undefined : "string ";
/*

    It’s neither only undefined nor only string, even though those are both
potential types. mathematician can be either undefined or string.

This
kind of “either or” type is called a union. Union types are a wonderful
concept that let us handle code cases where we don’t know exactly which
type a value is, but do know it’s one of two or more options.

TypeScript represents union types using the | (pipe) operator between the
possible values, or constituents.

The previous mathematician type is
thought of as string | undefined. Hovering over the mathematician
variable would show its type as string | undefined
*/
// Declaring Union Types
let thinker;
if (Math.random() > 0.5) {
    thinker = "thi is mostofa kamal";
}
// Union type declarations can be placed anywhere you might declare a type with a type annotation.
/*
        The order of a union type declaration does not matter. You can write boolean | number or number | boolean and TypeScript will treat both the exact same.
    */
// Union Properties
let physicist = Math.random() > 0.5 ? "Marie Curie" : 84;
let toStringMethod = physicist.toString(); // ok
// let toUppercaseMthod = physicist.toUppercase(); // get Error
// let toFixedMethod = physicist.toFixed(); // get error
/*         When a value is known to be a union type, TypeScript will only allow you
to access member properties that exist on all possible types in the union. It
will give you a type-checking error if you try to access a type that doesn’t
exist on all possible types.

In the following snippet, physicist is of type number | string. While
.toString() exists in both types and is allowed to be used,

.toUpperCase() and .toFixed() are not because .toUpperCase() is
missing on the number type and .toFixed() is missing on the string type: */
// Narrowing
/* Narrowing is when TypeScript infers from your code that a value is of a
more specific type than what it was defined, declared, or previously inferred
as.
Once TypeScript knows that a value’s type is more narrow than
previously known, it will allow you to treat the value like that more specific
type.
 A logical check that can be used to narrow types is called a type
guard.
Let’s cover two of the common type guards TypeScript can use to deduce
type narrowing from your code. */
// Assignment Narrowing
/* If you directly assign a value to a variable, TypeScript will narrow the
variable’s type to that value’s type.
Here, the admiral variable is declared initially as a number | string, but
after being assigned the value "Grace Hopper", TypeScript knows it must
be a string: */
let admiral;
admiral = "jamal Hopper";
admiral.toUpperCase(); // Ok: string
// admiral.toFixed(); // error
// Error: Property 'toFixed' does not exist on type 'string'.
/* Assignment narrowing comes into play when a variable is given an explicit
union type annotation and an initial value too. TypeScript will understand
that while the variable may later receive a value of any of the union typed
values, it starts off as only the type of its initial value. */
let inventor = "tomal hyder";
inventor.toUpperCase(); // Ok: string
// inventor.toFixed();
// Error: Property 'toFixed' does not exist on type 'string'.
// Conditional Checks
// Type of scientist: number | string
let scientist = Math.random() > 0.5
    ? "Rosalind Franklin"
    : 51;
if (scientist === "Rosalind Franklin") {
    // Type of scientist: string
    scientist.toUpperCase(); // Ok
}
// Type of scientist: number | string
// scientist.toUpperCase();
// Error: Property 'toUpperCase' does not exist on type 'string | number'.
// Property 'toUpperCase' does not exist on type 'number'.
