//======================= Generic Type Aliases ===================

type Nullish<T> = T | null | undefined;
/* 
    Generic type aliases are commonly used with functions to describe the type of a generic function:
*/
type CreatesValue<Input, Output> = (input: Input) => Output;

// Type: (input: string) => number

let creator: CreatesValue<string, number>;
creator = text => text.length;