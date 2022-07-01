/* 
    Types of types from types.
    “It’s turtles all the way down,”
    Anders likes to say.
*/

// ==================== any, Again ===================
/* 
    location of type any. any is generally used when a location is allowed to accept data of any type, such as the parameters to console.log:
*/

let anyValue: any;
anyValue = "Lucille Ball"; // Ok
anyValue = 123; // Ok
console.log(anyValue); // Ok

function greetComedian(name: any) {
  // No type error...
  console.log(`Announcing ${name.toUpperCase()}!`);
}
greetComedian({ name: "Bea Arthur" });
// Runtime error: name.toUpperCase is not a function

function greetComedianSafety(name: unknown) {
  if (typeof name === "string") {
    console.log(`Announcing ${name.toUpperCase()}!`); // Ok
  } else {
    console.log("Well, I'm off.");
  }
}
greetComedianSafety("Betty White"); // Logs: 4
greetComedianSafety({}); // Does not log

// =============================== Type Predicates ============================

function isNumberOrString(value: unknown) {
  return ["number", "string"].includes(typeof value);
}

function logValueIfExists(values: number | string | null | undefined) {
  if (isNumberOrString(values)) {
    // Type of value: number | string | null | undefined
    values?.toString();
    // Error: Object is possibly undefined.
  } else {
    console.log("Value does not exist:", values);
  }
}

// function typePredicate(input: WideType): input is NarrowType;

function isNumberOrStrings(value: unknown): value is number | string {
  return ["number", "string"].includes(typeof value);
}

function logValueIfExistses(value: number | string | null | undefined) {
  if (isNumberOrString(value)) {
    // Type of value: number | string
    value?.toString(); // Ok
  } else {
    // Type of value: null | undefined
    console.log("value does not exist:", value);
  }
}

interface Comedian {
  funny: boolean;
}
interface StandupComedian extends Comedian {
  routine: string;
}
function isStandupComedian(value: Comedian): value is StandupComedian {
  return "routine" in value;
}
function workWithComedian(value: Comedian) {
  if (isStandupComedian(value)) {
    // Type of value: StandupComedian
    console.log(value.routine); // Ok
  }
  // Type of value: Comedian
  // console.log(value.routine);

  // Error: Property 'routine' does not exist on type 'Comedian'.
}

function isLongString(input: string | undefined): input is string {
  return !!(input && input.length >= 7);
}
function workWithText(text: string | undefined) {
  if (isLongString(text)) {
    // Type of text: string
    console.log("Long text:", text.length);
  } else {
    // Type of text: undefined
    // console.log("Short text:", text?.length);
    // ~~~~~~
    // Error: Property 'length' does not exist on type 'never'.
  }
}


function getRating(ratings: Ratings, key: string): number {
    return ratings[key];
    // ~~~~~~~~~~~
    // Error: Element implicitly has an 'any' type because expression
    // of type 'string' can't be used to index type 'Ratings'.
    // No index signature with a parameter of
    // type 'string' was found on type 'Ratings'.
    }
   

interface Ratings {
  audience: number;
  critics: number;
}
const ratings: Ratings = { audience: 66, critics: 84 };
getRating(ratings, "audience"); // Ok
getRating(ratings, "not valid"); // Ok, but shouldn't be
