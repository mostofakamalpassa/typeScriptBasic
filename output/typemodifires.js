"use strict";
/*
    Types of types from types.
    “It’s turtles all the way down,”
    Anders likes to say.
*/
// ==================== any, Again ===================
/*
    location of type any. any is generally used when a location is allowed to accept data of any type, such as the parameters to console.log:
*/
let anyValue;
anyValue = "Lucille Ball"; // Ok
anyValue = 123; // Ok
console.log(anyValue); // Ok
function greetComedian(name) {
    // No type error...
    console.log(`Announcing ${name.toUpperCase()}!`);
}
greetComedian({ name: "Bea Arthur" });
// Runtime error: name.toUpperCase is not a function
function greetComedianSafety(name) {
    if (typeof name === "string") {
        console.log(`Announcing ${name.toUpperCase()}!`); // Ok
    }
    else {
        console.log("Well, I'm off.");
    }
}
greetComedianSafety("Betty White"); // Logs: 4
greetComedianSafety({}); // Does not log
// =============================== Type Predicates ============================
function isNumberOrString(value) {
    return ["number", "string"].includes(typeof value);
}
function logValueIfExists(values) {
    if (isNumberOrString(values)) {
        // Type of value: number | string | null | undefined
        values === null || values === void 0 ? void 0 : values.toString();
        // Error: Object is possibly undefined.
    }
    else {
        console.log("Value does not exist:", values);
    }
}
// function typePredicate(input: WideType): input is NarrowType;
function isNumberOrStrings(value) {
    return ["number", "string"].includes(typeof value);
}
function logValueIfExistses(value) {
    if (isNumberOrString(value)) {
        // Type of value: number | string
        value === null || value === void 0 ? void 0 : value.toString(); // Ok
    }
    else {
        // Type of value: null | undefined
        console.log("value does not exist:", value);
    }
}
function isStandupComedian(value) {
    return "routine" in value;
}
function workWithComedian(value) {
    if (isStandupComedian(value)) {
        // Type of value: StandupComedian
        console.log(value.routine); // Ok
    }
    // Type of value: Comedian
    // console.log(value.routine);
    // Error: Property 'routine' does not exist on type 'Comedian'.
}
function isLongString(input) {
    return !!(input && input.length >= 7);
}
function workWithText(text) {
    if (isLongString(text)) {
        // Type of text: string
        console.log("Long text:", text.length);
    }
    else {
        // Type of text: undefined
        // console.log("Short text:", text?.length);
        // ~~~~~~
        // Error: Property 'length' does not exist on type 'never'.
    }
}
function getRating(ratings, key) {
    return ratings[key];
    // ~~~~~~~~~~~
    // Error: Element implicitly has an 'any' type because expression
    // of type 'string' can't be used to index type 'Ratings'.
    // No index signature with a parameter of
    // type 'string' was found on type 'Ratings'.
}
const ratings = { audience: 66, critics: 84 };
getRating(ratings, "audience"); // Ok
getRating(ratings, "not valid"); // Ok, but shouldn't be
