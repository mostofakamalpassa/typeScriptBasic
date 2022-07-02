/* 
    In TypeScript, constructs such as functions may declare any number of generic type parameters: types that are determined for each usage of the generic construct. These type parameters are used as types in the construct
to represent some type that can be different in each instance of the construct. Type parameters may be provided with different types, referred to
as type arguments, for each instance of the construct but will remain consistent within that instance.

Type parameters typically have single-letter names like T and U or PascalCase names like Key and Value. In all of the constructs covered in this chapter, generics may be declared using < and > brackets, like someFunction<T> or SomeInterface<T>.
*/

function identity(input) {
  return input;
}
identity("abc");
identity(123);
identity({ quote: "I think your self emerges more clearly over time." });

// We could declare input as any, but then the return type of the function would also be any:
function identitys(input: any) {
  return input;
}
let value = identity(42); // Type of value: any

//================== Generic Functions ========================

/* 
    A function may be made generic by placing an alias for a type parameter, wrapped in angle brackets, immediately before the parameters parentheses.
That type parameter will then be available for usage in parameter type annotations, return type annotations, and type annotations inside the function’s body.
*/

function identity1<T>(input: T) {
  return input;
}
const numeric = identity1("me"); // Type: "me"
const stringy = identity1(123); // Type: 123

/* 
        Arrow functions can be generic too. Their generic declarations are also
placed immediately before the ( before their list of parameters.
The following arrow function is functionally the same as the previous
declaration:
    */
const identity2 = <T>(input: T) => input;
identity2(123); // Type: 123

function logWrapper<Input>(callback: (input: Input) => void) {
  return (input: Input) => {
    console.log("Input: ", input);
    callback(input);
  };
}

// Type: (input: string) => void
logWrapper((input: string) => {
  console.log(input.length);
});

//=============================== Explicit Generic Call Types ============================================

function logWrappers<Inputs>(callback: (input: Inputs) => void) {
  return (input: string) => {
    console.log(input);
    callback(input);
  };
}

logWrappers((input: string) => {
  console.log("Hello kamal passa ");
});

logWrappers<string>((input) => {
  console.log("login this strings ");
});

//========================= Multiple Function Type Parameters ======================

function makeTuple<First, Second>(first: First, second: Second) {
  return [first, second] as const;
}

let tupples = makeTuple("kamal", true);
// Type of value: readonly [string, boolean]

function makePair<Key, Value>(key: Key, value: Value) {
  return { key, value };
}

// // Ok: neither type argument provided
makePair("name", "kamal passa");
// Ok: both type arguments provided
makePair<string, number>("book", 200);

// user define type provides
makePair<"abc", 22>("abc", 22);

//============================== Generic Interfaces ====================================

interface Box<T> {
  inside: T;
}

let stringBox: Box<string> = {
  inside: "Hello Bangladesh",
};

let numberBox: Box<number> = {
  inside: 444,
};

/* let incorrectBox: Box<number> = {
  inside: false,
  // Error: Type 'boolean' is not assignable to type 'number'.
}; */

/* 
  Fun fact: the built-in Array methods are defined in TypeScript as a generic
interface! Array uses a type parameter T to represent the type of data stored
within an array. Its pop and push methods look roughly like so
*/

interface Array<T> {
  // ...
  /**
  * Removes the last element from an array and returns it.
  * If the array is empty, undefined is returned and the array is not
  modified.
  */
  pop(): T | undefined;
  /**
   * Appends new elements to the end of an array,
   * and returns the new length of the array.
   * @param items new elements to add to the array.
   */
  push(...items: T[]): number;
  // ...
}


interface LinkedNode<Value> {
  next?: LinkedNode<Value>;
  value: Value

}

function getLast<Value>(node: LinkedNode<Value>) : Value{
  return node.next ? getLast(node.next): node.value;
}

// Inferred Value type argument: Date

let lastDate = getLast({
  value: new Date("2022-06-02")
});

