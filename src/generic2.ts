//======================= Generic Type Aliases ===================

type Nullish<T> = T | null | undefined;
/* 
    Generic type aliases are commonly used with functions to describe the type of a generic function:
*/
type CreatesValue<Input, Output> = (input: Input) => Output;

// Type: (input: string) => number

let creator: CreatesValue<string, number>;
creator = (text) => text.length;

//creator = text => text.toUpperCase();
// Error: Type 'string' is not assignable to type 'number'.

interface FailureResult {
  error: Error;
  succeeded: false;
}
interface SuccessfulResult<Data> {
  data: Data;
  succeeded: true;
}

type Result<Data> = FailureResult | SuccessfulResult<Data>;

function handleResult(result: Result<string>) {
  if (result.succeeded) {
    // Type of result: SuccessfulResult<string>
    console.log(`We did it! ${result.data}`);
  } else {
    // Type of result: FailureResult
    console.error(`Awww... ${result.error}`);
  }
}

//===================== Generic Modifiers ==================

interface Quote<T = string> {
  value: T;
}

/* let explicit:Quote<number> = {
    value: 55
} */
/* 
    Type '{ value: number; }' is missing the following properties from type 'Quote<number>'
*/

// let implicits: Quote = { value: "Be yourself. The world worships the original."};

interface KeyValuePair<Key, Value = Key> {
  key: Key;
  value: Value;
}
// Type: KeyValuePair<string, string>
let allExplicit: KeyValuePair<string, number> = {
  key: "rating",
  value: 10,
};
// Type: KeyValuePair<string>
let oneDefaulting: KeyValuePair<string> = {
  key: "rating",
  value: "ten",
};
function inTheEnd<First, Second, Third = number, Fourth = string>() {} // Ok
// function inTheMiddle<First, Second = boolean, Third = number, Fourth>() {} // get error
// Error: Required type parameters may not follow optional type parameters.

// ================= Constrained Generic Types =================
interface WithLength {
  length: number;
}

function logWithLength<T extends WithLength>(input: T) {
  console.log(`Length: ${input.length}`);
  return input;
}
logWithLength("No one can figure out your worth but you."); // Type: string
logWithLength([false, true]); // Type: boolean[]
logWithLength({ length: 123 }); // Type: { length: number }

//====================== keyof and Constrained Type Parameters ====================

function get<T, Key extends keyof T>(container: T, key: Key) {
  return container[key];
}

const roles = {
  favorite: "Fargo",
  others: ["Almost Famous", "Burn After Reading", "Nomadland"],
};
const favorite = get(roles, "favorite"); // Type: string
const others = get(roles, "others"); // Type: string[]


function gets<T>(container: T, key: keyof T) {
    return container[key];
    }
    const roless = {
    favorite: "Fargo",
    others: ["Almost Famous", "Burn After Reading", "Nomadland"],
    };
    const found = gets(roles, "favorite"); // Type: string | string[]