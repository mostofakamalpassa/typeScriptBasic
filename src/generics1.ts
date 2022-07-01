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


function logWrapper<Input>(callback:(input:Input)=> void){

    return(input: Input)=>{
        console.log("Input: ", input);
        callback(input);
    }
}

// Type: (input: string) => void
logWrapper((input: string) => {
    console.log(input.length);
    });