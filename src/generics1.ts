/* 
    In TypeScript, constructs such as functions may declare any number of generic type parameters: types that are determined for each usage of the generic construct. These type parameters are used as types in the construct
to represent some type that can be different in each instance of the construct. Type parameters may be provided with different types, referred to
as type arguments, for each instance of the construct but will remain consistent within that instance.

Type parameters typically have single-letter names like T and U or PascalCase names like Key and Value. In all of the constructs covered in this chapter, generics may be declared using < and > brackets, like someFunction<T> or SomeInterface<T>.
*/

function identity(input:any) {
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
    // callback(input);
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
  value: Value;
}

function getLast<Value>(node: LinkedNode<Value>): Value {
  return node.next ? getLast(node.next) : node.value;
}

// Inferred Value type argument: Date

let lastDate = getLast({
  value: new Date("2022-06-02"),
});

// Inferred Value type argument: string

let lastFruit = getLast({
  next: { value: "applie" },
  value: "orranges",
});

// Inferred Value type argument: number
/* 
let lastNumber = getLast({
  next:{value:1234},
  value:false
  // // Error: type 'boolean' is not assignable to type 'number'.
}) */

interface CrateLike<T> {
  contest: T;
}

let missingGeneric: CrateLike<string> = {
  contest: "hello kamal passa",
};

// ========================================= Generic Classes =====================================

class Secret<Key, Value> {
  key: Key;
  value: Value;

  constructor(key: Key, value: Value) {
    this.key = key;
    this.value = value;
  }

  getValue(key: Key): Value | undefined {
    return this.key === key ? this.value : undefined;
  }
}

const storage = new Secret(1234, "product abc0"); // Type: Secret<number, string>

storage.getValue(1234); // Type: string | undefined

//==================================== Explicit Generic Class Types ===============================

class CurriedCallback<Input> {
  #callback: (input: Input) => void;
  constructor(callback: (input: Input) => void) {
    this.#callback = (input: Input) => {
      console.log(input);
      callback(input);
    };
  }

  call(input: Input) {
    return this.#callback(input);
  }
}

// Type: CurriedCallback<string>

const call = new CurriedCallback((input: string) => {
  console.log("hello  callback letter " + input);
});

call.call("we love this callback letters ");

// ======================== Extending Generic Classes =====================

class Quotes<T> {
  lines: T;
  constructor(lines: T) {
    this.lines = lines;
  }
}

class SpokenQuote extends Quotes<string[]> {
  speak() {
    console.log(this.lines.join("\n"));
  }
}

new Quotes("The only real failure is the failure to try.").lines; // Type:string

new Quotes([4, 8, 15, 16, 23, 42]).lines; // Type: number[]

new SpokenQuote(["Greed is so destructive.", "It destroys everything"]).lines; // Type: string[]

// new SpokenQuote([4, 8, 15, 16, 23, 42]);

// Error: Argument of type 'number' is not
// assignable to parameter of type 'string'.

class AttributedQuote<Value> extends Quotes<Value> {
  speaker: string;

  constructor(value: Value, speaker: string) {
    super(value);
    this.speaker = speaker;
  }
}

// Type: AttributedQuote<string>
// (extending Quote<string>)

new AttributedQuote(
  "The road to success is always under construction.",
  "Lily Tomlin"
);

//============================ Implementing Generic Interfaces ===================================

interface ActingCredit<Role> {
  role: Role;
}

class MoviePart implements ActingCredit<string> {
  role: string;
  seaking: boolean;

  constructor(role: string, seaking: boolean) {
    this.role = role;
    this.seaking = seaking;
  }
}

const part = new MoviePart("Admin", true);

part.role; // type string

//============================== Method Generics ==========================

class CreatePairFactory<Key> {
  key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  createPair<Value>(value: Value) {
    return { key: this.key, value: value };
  }
}

// Type: CreatePairFactory<string>
const factory = new CreatePairFactory("role");
factory.createPair(1010);
// Type: { key: string, value: number }
const numberPair = factory.createPair(10);
// Type: { key: string, value: string }
const stringPair = factory.createPair("Sophie");

//=================================== Static Class Generics ===================================

class BothLogger<OnInstance> {
  instanceLog(value: OnInstance) {
    return value;
  }

  static staticLog<OnStatic>(value: OnStatic) {
    // let formOnInstance = BothLogger<OnInstance> // get error
    // Error: Static members cannot reference class type arguments.
    console.log(value);
    return value;
  }
}

const logger = new BothLogger<number[]>();

logger.instanceLog([3, 4, 5, 6, 7, 8, 9, 10]);
// inferred OnStatic type argument:  string[]
BothLogger.staticLog<string[]>([
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
]);

// Inferred OnStatic type argument: boolean[]
BothLogger.staticLog([false, true]);
// Explicit OnStatic type argument: string
BothLogger.staticLog<string>("You can't change the music of your soul.");

interface FailureResult {
  error: Error;
  succeeded: false;
}

interface SuccessfulResult<Data> {
  data: Data;
  succeeded: true;
}

type Results<Data> = FailureResult | SuccessfulResult<Data>;

function handleResult(result: Results<string>) {
  if (result.succeeded) {
    // Type of result: SuccessfulResult<string>
    console.log(`We did it! ${result.data}`);
  } else {
    // Type of result: FailureResult
    console.error(`Awww... ${result.error}`);
  }

  // result.data ;

  // Error: Property 'data' does not exist on type 'Result<string>'.
// Property 'data' does not exist on type 'FailureResult'.
}
