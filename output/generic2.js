"use strict";
//======================= Generic Type Aliases ===================
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Type: (input: string) => number
let creator;
creator = (text) => text.length;
function handleResult(result) {
    if (result.succeeded) {
        // Type of result: SuccessfulResult<string>
        console.log(`We did it! ${result.data}`);
    }
    else {
        // Type of result: FailureResult
        console.error(`Awww... ${result.error}`);
    }
}
// Type: KeyValuePair<string, string>
let allExplicit = {
    key: "rating",
    value: 10,
};
// Type: KeyValuePair<string>
let oneDefaulting = {
    key: "rating",
    value: "ten",
};
function inTheEnd() { } // Ok
function logWithLength(input) {
    console.log(`Length: ${input.length}`);
    return input;
}
logWithLength("No one can figure out your worth but you."); // Type: string
logWithLength([false, true]); // Type: boolean[]
logWithLength({ length: 123 }); // Type: { length: number }
//====================== keyof and Constrained Type Parameters ====================
function get(container, key) {
    return container[key];
}
const roles = {
    favorite: "Fargo",
    others: ["Almost Famous", "Burn After Reading", "Nomadland"],
};
const favorite = get(roles, "favorite"); // Type: string
const others = get(roles, "others"); // Type: string[]
function gets(container, key) {
    return container[key];
}
const roless = {
    favorite: "Fargo",
    others: ["Almost Famous", "Burn After Reading", "Nomadland"],
};
const found = gets(roles, "favorite"); // Type: string | string[]
// =================== promise ===============
class promiseLike {
    constructor(executor, reject) { }
}
// Type: Promise<unknown>
const resolvesUnknown = new Promise((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
});
// Type: Promise<string>
const resolvesString = new Promise((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
});
// Type: (text: string) => Promise<number>
function lengthAfterSecond(text) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => setTimeout(resolve, 1000));
        return text.length;
    });
}
// Type: (text: string) => Promise<number>
function lengthImmediately(text) {
    return __awaiter(this, void 0, void 0, function* () {
        return text.length;
    });
}
