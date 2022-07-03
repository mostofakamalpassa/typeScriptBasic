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
    // return ratings[key];
    return 0;
    // ~~~~~~~~~~~
    // Error: Element implicitly has an 'any' type because expression
    // of type 'string' can't be used to index type 'Ratings'.
    // No index signature with a parameter of
    // type 'string' was found on type 'Ratings'.
}
const ratings = { audience: 66, critics: 84 };
getRating(ratings, "audience"); // Ok
getRating(ratings, "not valid"); // Ok, but shouldn't be
// ====================== keyof ======================
function getRatingd(ratings, key) {
    return ratings[key]; // Ok
}
const ratingsd = { audience: 66, critics: 84 };
// getCountLiteral(ratingsd, 'audience'); // Ok
function getCountKeyof(ratings, key) {
    return ratings[key]; // Ok
}
const ratingsss = { audience: 66, critics: 84 };
getCountKeyof(ratingsss, 'audience'); // Ok
// ==================== typeof ====================
const original = {
    medium: "movie",
    title: "Mean Girls",
};
let adaptation;
if (Math.random() > 0.5) {
    adaptation = Object.assign(Object.assign({}, original), { medium: "play" }); // Ok
}
else {
    //adaptation = { ...original, medium: 2 };
    // Error: Type 'number' is not assignable to type 'string'.
}
// ============================ Type Assertions =========================
const rawData = `["grace", "frankie"]`;
// Type: any
JSON.parse(rawData);
// Type: string[]
JSON.parse(rawData);
// Type: [string, string]
JSON.parse(rawData);
// Type: ["grace", "frankie"]
JSON.parse(rawData);
const rawDatas = `["grace", "frankie"]`;
// Type: any
JSON.parse(rawDatas);
// Type: string[]
JSON.parse(rawData);
// Type: [string, string]
JSON.parse(rawDatas);
// Type: ["grace", "frankie"]
JSON.parse(rawDatas);
// const declared: Entertainer = {
// name: "Moms Mabley",
// };
// Error: Property 'acts' is missing in type
// '{ one: number; }' but required in type 'Entertainer'.
const asserted = {
    name: "Moms Mabley",
}; // Ok, but...
// Both of these statements would fail at runtime with:
// Runtime TypeError: Cannot read properties of undefined (reading
//'toPrecision')
// console.log(declared.acts.join(", "));
console.log(asserted.acts.join(", "));
let myValueDouble = "1337"; // Ok, but... eww.
