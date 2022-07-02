"use strict";
/*
    In TypeScript, constructs such as functions may declare any number of generic type parameters: types that are determined for each usage of the generic construct. These type parameters are used as types in the construct
to represent some type that can be different in each instance of the construct. Type parameters may be provided with different types, referred to
as type arguments, for each instance of the construct but will remain consistent within that instance.

Type parameters typically have single-letter names like T and U or PascalCase names like Key and Value. In all of the constructs covered in this chapter, generics may be declared using < and > brackets, like someFunction<T> or SomeInterface<T>.
*/
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CurriedCallback_callback;
function identity(input) {
    return input;
}
identity("abc");
identity(123);
identity({ quote: "I think your self emerges more clearly over time." });
// We could declare input as any, but then the return type of the function would also be any:
function identitys(input) {
    return input;
}
let value = identity(42); // Type of value: any
//================== Generic Functions ========================
/*
    A function may be made generic by placing an alias for a type parameter, wrapped in angle brackets, immediately before the parameters parentheses.
That type parameter will then be available for usage in parameter type annotations, return type annotations, and type annotations inside the function’s body.
*/
function identity1(input) {
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
const identity2 = (input) => input;
identity2(123); // Type: 123
function logWrapper(callback) {
    return (input) => {
        console.log("Input: ", input);
        callback(input);
    };
}
// Type: (input: string) => void
logWrapper((input) => {
    console.log(input.length);
});
//=============================== Explicit Generic Call Types ============================================
function logWrappers(callback) {
    return (input) => {
        console.log(input);
        callback(input);
    };
}
logWrappers((input) => {
    console.log("Hello kamal passa ");
});
logWrappers((input) => {
    console.log("login this strings ");
});
//========================= Multiple Function Type Parameters ======================
function makeTuple(first, second) {
    return [first, second];
}
let tupples = makeTuple("kamal", true);
// Type of value: readonly [string, boolean]
function makePair(key, value) {
    return { key, value };
}
// // Ok: neither type argument provided
makePair("name", "kamal passa");
// Ok: both type arguments provided
makePair("book", 200);
// user define type provides
makePair("abc", 22);
let stringBox = {
    inside: "Hello Bangladesh",
};
let numberBox = {
    inside: 444,
};
function getLast(node) {
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
let missingGeneric = {
    contest: "hello kamal passa",
};
// ========================================= Generic Classes =====================================
class Secret {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    getValue(key) {
        return this.key === key ? this.value : undefined;
    }
}
const storage = new Secret(1234, "product abc0"); // Type: Secret<number, string>
storage.getValue(1234); // Type: string | undefined
//==================================== Explicit Generic Class Types ===============================
class CurriedCallback {
    constructor(callback) {
        _CurriedCallback_callback.set(this, void 0);
        __classPrivateFieldSet(this, _CurriedCallback_callback, (input) => {
            console.log(input);
            callback(input);
        }, "f");
    }
    call(input) {
        return __classPrivateFieldGet(this, _CurriedCallback_callback, "f").call(this, input);
    }
}
_CurriedCallback_callback = new WeakMap();
// Type: CurriedCallback<string>
const call = new CurriedCallback((input) => {
    console.log("hello  callback letter " + input);
});
call.call("we love this callback letters ");
// ======================== Extending Generic Classes =====================
class Quotes {
    constructor(lines) {
        this.lines = lines;
    }
}
class SpokenQuote extends Quotes {
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
class AttributedQuote extends Quotes {
    constructor(value, speaker) {
        super(value);
        this.speaker = speaker;
    }
}
// Type: AttributedQuote<string>
// (extending Quote<string>)
new AttributedQuote("The road to success is always under construction.", "Lily Tomlin");
class MoviePart {
    constructor(role, seaking) {
        this.role = role;
        this.seaking = seaking;
    }
}
const part = new MoviePart("Admin", true);
part.role; // type string
//============================== Method Generics ==========================
class CreatePairFactory {
    constructor(key) {
        this.key = key;
    }
    createPair(value) {
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
class BothLogger {
    instanceLog(value) {
        return value;
    }
    static staticLog(value) {
        // let formOnInstance = BothLogger<OnInstance> // get error
        // Error: Static members cannot reference class type arguments.
        console.log(value);
        return value;
    }
}
const logger = new BothLogger();
logger.instanceLog([3, 4, 5, 6, 7, 8, 9, 10]);
// inferred OnStatic type argument:  string[]
BothLogger.staticLog([
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
BothLogger.staticLog("You can't change the music of your soul.");
function handleResult(result) {
    if (result.succeeded) {
        // Type of result: SuccessfulResult<string>
        console.log(`We did it! ${result.data}`);
    }
    else {
        // Type of result: FailureResult
        console.error(`Awww... ${result.error}`);
    }
    // result.data ;
    // Error: Property 'data' does not exist on type 'Result<string>'.
    // Property 'data' does not exist on type 'FailureResult'.
}
