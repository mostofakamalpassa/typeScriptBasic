"use strict";
//======================= Generic Type Aliases ===================
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
