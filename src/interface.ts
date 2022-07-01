/* 
    Why only use the
Boring built-in type shapes when
We can make our own!
*/

// ========== Type Aliases Versus Interfaces ==========

type PoetType = {
  born: number;
  name: string;
};

interface PoetInterface {
  born: number;
  name: string;
}
// The two syntaxes are almost identical

let valueLater: PoetType;
// Ok
valueLater = {
  born: 1935,
  name: "Sara Teasdale",
};
// valueLater = "Emily Dickinson"; // get Error
// Error: Type 'string' is not assignable to 'Poet'.
valueLater = {
  //   born: true,// get Error
  born: 1444,
  // Error: Type 'boolean' is not assignable to type 'number'.
  name: "Sappho",
};

// ========================== Types of Properties ====================

interface Books {
  author?: string;
  pages: number;
}
// Ok
const okk: Books = {
  author: "Rita Dove",
  pages: 80,
};

//========================= Read-Only Properties ===================

interface Page {
  readonly text: string;
}
function read(page: Page) {
  // Ok: reading the text property doesn't attempt to modify it
  console.log(page.text);
  // page.text += "!"; // get error
}

//======================= Functions and Methods ==================

/* 
  TypeScript provides two ways of declaring interface members as functions:

Method syntax: declaring that a member of the interface is a function intended to be called as a member of the object, like member(): void

Property syntax: declaring that a member of the interface is equal to a standalone function, like member: () => void
*/

interface HasBothFunctionTypes {
  property: () => void;
  method(): string;
}

const hasBothInterface: HasBothFunctionTypes = {
  property: () => "Hello",
  method() {
    return "string ";
  },
};

hasBothInterface.property(); // Ok
hasBothInterface.method(); // Ok

/* 
  Both forms can receive the ? optional modifier to indicate they don’t need to be provided:
*/
interface OptionalReadonlyFunctions {
  optionalProperty?: () => string;
  optionalMethod?(): string;
}

//========================== Call Signatures =================
/* 
  Interfaces and object types can declare call signatures, which is a type system description of how a value may be called like a function. 
  Only values that may be called in the way the call signature declares will be assignable to the interface.
  A function with assignable parameters and return type. A call signature looks similar to a function type, but with a : colon instead of an => arrow.
*/
type FunctionAliases = (input: string) => number;

// Type: (input: string) => number
const typedFunctionAlias: FunctionAliases = (input) => input.length; // Ok
interface CallSignature {
  (input: string): number;
}
// Type: (input: string) => number
const typedCallSignature: CallSignature = (input) => input.length; // Ok

/* 
  Call signatures can be used to describe functions that additionally have some user-defined property on them. TypeScript will recognize a property added to a function declaration as adding to that function declaration’s type.
*/

interface FunctionWithCount {
  count: number;
  (): void;
}

let hasCallCount: FunctionWithCount;
function keepsTrackOfCalls() {
  keepsTrackOfCalls.count += 1;
  console.log(`I've been called ${keepsTrackOfCalls.count} times!`);
}
keepsTrackOfCalls.count = 0;
hasCallCount = keepsTrackOfCalls; // Ok

//================= Index Signatures =============

/* 
  An index signature looks like a regular property definition but with a type after
the key, and array brackets surrounding them, like { [i: string]: ... }.
*/
interface WordCounts {
  [i: string]: number;
}
const counts: WordCounts = {};
counts.apple = 0; // Ok
counts.banana = 1; // Ok
// counts.cherry = false; // get Error
// Error: Type 'boolean' is not assignable to type 'number'.

/* 
  Index signatures are convenient for assigning values to an object but aren’t completely type safe. They indicate that an object should give back a value no matter what property is being accessed.
*/
interface DatesByName {
  [i: string]: Date;
}
const publishDates: DatesByName = {
  Frankenstein: new Date("1 January 1818"),
};
publishDates.Frankenstein; // Type: Date
console.log(publishDates.Frankenstein.toString()); // Ok
publishDates.Beloved; // Type: Date, but runtime value of undefined!
console.log(publishDates.Beloved.toString()); // Ok in the type system, but...
// Runtime error: Cannot read property 'toString'
// of undefined (reading publishDates.Beloved)

interface HistoricalNovels {
  Oroonoko: number;
  [i: string]: number;
}

const novels: HistoricalNovels = {
  Outlander: 1991,
  Oroonoko: 1688,
};
const missingOroonoko: HistoricalNovels = {
  Outlander: 1991,
  Oroonoko: 444,
};

interface ChapterStarts {
  preface: 0;
  [i: string]: number;
}
const correctPreface: ChapterStarts = {
  preface: 0,
  night: 1,
  shopping: 5,
};
const wrongPreface: ChapterStarts = {
  preface: 0,
  night: 1,
  shopping: 5,
};

//=============== Numeric index signatures ===============
/* 
  Although JavaScript implicitly converts object property lookup keys to strings, it is sometimes desirable to only allow numbers as keys for an object. 
TypeScript index signatures can use a number type instead of
string but with the same catch as named properties that their types must be assignable to the catchall string index signature’
*/

interface MoreNarrowNumbers {
  [i: number]: string;
  [i: string]: string | undefined;
}
// Ok
const mixesNumbersAndStrings: MoreNarrowNumbers = {
  0: "",
  key1: "",
  key2: undefined,
};
/* interface MoreNarrowStrings {
  [i: number]: string | undefined;
  // Error: 'number' index type 'string | undefined'
  // is not assignable to 'string' index type 'string'.
  [i: string]: string;
} */

//======================= Nested Interfaces ========================

/* 
  Just like object types can be nested as properties of other object types, interface types can also have properties that are themselves interface types (or object types).
*/

interface Novel {
  author: {
    name: string;
  };
  settings: Setting;
}

interface Setting {
  place: string;
  year: number;
}

let myNovel: Novel;
myNovel = {
  author: {
    name: "mostofa kamal",
  },
  settings: {
    place: "Gazipur",
    year: 1990,
  },
};
