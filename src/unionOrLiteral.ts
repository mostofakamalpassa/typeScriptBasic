/* 
    Nothing is constant
    Values may change over time
    (well, except constants)
*/

/* 
   -----------------------------  Unions --------------------------------

Expanding a value’s allowed type to be two or more possible types

    Narrowing
Reducing a value’s allowed type to not be one or more possible types

Put together, unions and narrowing are powerful concepts that allow
TypeScript to make informed inferences on your code many other
mainstream languages cannot.

*/

// -------------------------- UNION Types --------------------------------

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

let thinker: string | null;

if (Math.random() > 0.5) {
  thinker = "thi is mostofa kamal";
}

// Union type declarations can be placed anywhere you might declare a type with a type annotation.

/* 
        The order of a union type declaration does not matter. You can write boolean | number or number | boolean and TypeScript will treat both the exact same.
    */

// ------------------------------ Union Properties ----------------------------------

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

// -------------------------- Narrowing-----------------------------------

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

// ------------------------Assignment Narrowing ---------------------------

/* If you directly assign a value to a variable, TypeScript will narrow the
variable’s type to that value’s type.
Here, the admiral variable is declared initially as a number | string, but
after being assigned the value "Grace Hopper", TypeScript knows it must
be a string: */

let admiral: number | string;
admiral = "jamal Hopper";
admiral.toUpperCase(); // Ok: string
// admiral.toFixed(); // error

// Error: Property 'toFixed' does not exist on type 'string'.
/* Assignment narrowing comes into play when a variable is given an explicit
union type annotation and an initial value too. TypeScript will understand
that while the variable may later receive a value of any of the union typed
values, it starts off as only the type of its initial value. */

let inventor: number | string = "tomal hyder";
inventor.toUpperCase(); // Ok: string
// inventor.toFixed();

// Error: Property 'toFixed' does not exist on type 'string'.

// -----------------------Conditional Checks -------------------------------

// Type of scientist: number | string
let scientist = Math.random() > 0.5 ? "Rosalind Franklin" : 51;
if (scientist === "Rosalind Franklin") {
  // Type of scientist: string
  scientist.toUpperCase(); // Ok
}
// Type of scientist: number | string
// scientist.toUpperCase();

// Error: Property 'toUpperCase' does not exist on type 'string | number'.
// Property 'toUpperCase' does not exist on type 'number'.

// --------------------- Typeof Checks ---------------------

/* In addition to direct value checking, TypeScript also recognizes the typeof
operator in narrowing down variable types.
Similar to the scientist example, checking if typeof researcher is
"string" indicates to TypeScript that the type of researcher must be
string: */

let researcher = Math.random() > 0.5 ? "Rosalind Franklin" : 51;

if (typeof researcher === "string") {
  researcher.toUpperCase(); // Ok: string
}

// Logical negations from ! and else statements work as well:

if (!(typeof researcher === "string")) {
  researcher.toFixed(); // Ok: number
} else {
  researcher.toUpperCase(); // Ok: string
}

// Those code snippets can be rewritten with a ternary statement, which is also supported for type narrowing:
typeof researcher === "string"
  ? researcher.toUpperCase() // Ok: string
  : researcher.toFixed(); // Ok: number

// Whichever way you write them, typeof checks are a practical and often used way to narrow types.
// TypeScript’s type checker recognizes several more forms of narrowing that

// ---------------------------------------------- Literal Types ----------------------------------------

/* 
        literal type: the type of a value that is known to be
a specific value of a primitive, rather than any of those primitive’s values at
all. The primitive type string represents the set of all possible strings that

could ever exist; the literal type "we love abc" represents just that one string.
If you declare a variable as const and directly give it a literal value,
TypeScript will infer the variable to be that literal value as a type.

This is
why, when you hover a mouse over a const variable with an initial literal
value in an IDE

    */

const philosopher = "we love abc ";

///      TypeScript reporting a const variable as being specifically its literal type
let philosopher1 = "we love abc ";
// TypeScript reporting a let variable as being generally its primitive type

/* 
    You can think of each primitive type as a union of every possible matching
literal value. In other words, a primitive type is the set of all possible literal
values of that type.
Other than the boolean, null, and undefined types, all other primitives
such as number and string have a infinite number of literal types. The
common types you’ll find in typical TypeScript code are just those:
*/

/* 
  boolean: just true | false
null and undefined: both just have one literal value, themselves
number: 0 | 1 | 2 | ... | 0.1 | 0.2 | ...
string: "" | "a" | "b" | "c" | ... | "aa" | "ab" | "ac" |
*/

let lifespan: number | "ongoing" | "uncertain";
lifespan = 89; // Ok
lifespan = "ongoing"; // Ok
// lifespan = true; // get error
// Error: Type 'true' is not assignable to
// type 'number | "ongoing" | "uncertain"

//----------------------------------- Literal Assignability -----------------------

let specificallyAda: "Ada";
specificallyAda = "Ada"; // Ok
// specificallyAda = "Byron";
// Error: Type '"Byron"' is not assignable to type '"Ada"'.
let someString = ""; // Type: string
// specificallyAda = someString;
// Error: Type 'string' is not assignable to type '"Ada"'.

//----------------------------------------------- Strict Null Checking ----------------------------

/* 
The power of narrowed unions with literals is particularly visible when
working with potentially undefined values, an area of type systems
TypeScript refers to as strict null checking. TypeScript is part of a surge of
modern programming languages that utilize strict null checking to fix the
dreaded “billion-dollar mistake.” */


// const firstName2: string = null;


let geneticist = Math.random() > 0.5
? "Barbara McClintock"
: undefined;
if (geneticist) {
geneticist.toUpperCase(); // Ok: string
}
// geneticist.toUpperCase();
// Error: Object is possibly 'undefined'.

// Logical operators that perform truthiness checking work as well, namely && and ?.:
geneticist && geneticist.toUpperCase(); // Ok: string | undefined
geneticist?.toUpperCase(); // Ok: string | undefined

// Unfortunately, truthiness checking doesn’t go the other way. If all we know
// about a string | undefined value is that it’s falsy, that doesn’t tell us
// whether it’s an empty string or undefined.
// Here, biologist is of type false | string, and while it can be narrowed
// down to just string in the if statement body, the else statement body
// knows it can still be a string if it’s "":


let biologist = Math.random() > 0.5 && "Rachel Carson";
if (biologist) {
biologist; // Type: string
} else {
biologist; // Type: false | string
}


//---------------------------------------------- Variables Without Initial Values ---------------------------------

let mathematicians: string;
// mathematicians?.length;
mathematician = "Mark Goldberg";
mathematician.length; // Ok

// Error: Variable 'mathematician' is used before being assigned.

let mathematicianss: string | undefined;
mathematicianss?.length; // Ok
mathematicianss = "Mark Goldberg";
mathematicianss.length; // Ok


// ---------------------------------------- Type Aliases-------------------------

/* Most union types you’ll see in code will generally only have two or three
constituents. However, you may sometimes find a use for longer union
types that are inconvenient to type out repeatedly.
Each of these variables can be one of four possible types: */


let rawDataFirst: boolean | number | string | null | undefined;
let rawDataSecond: boolean | number | string | null | undefined;
let rawDataThird: boolean | number | string | null | undefined;

/* TypeScript includes type aliases for assigning easier names to reused types.
A type alias starts with the type keyword, a new name, =, and then any
type. By convention, type aliases are given names in PascalCase: */


type MyName = "my type defined";
/* Type aliases act as a copy-and-paste in the type system. When TypeScript
sees a type alias, it acts as if you’d typed out the actual type the alias was
referring to.

The previous variables’ type annotations could be rewritten to
use a type alias for the long union type: */


type RawData = boolean | number | string | null | undefined;
let rawDataFirsts: RawData;
let rawDataSeconds: RawData;
let rawDataThirds: RawData;

// -------------------------------------- Combining Type Aliases ---------------------

type Id = number | string;
// Equivalent to: number | string | undefined | null
type IdMaybe = Id | undefined | null;

