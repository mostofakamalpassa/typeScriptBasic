/* 
    Why only use the
Boring built-in type shapes when
We can make our own!
*/

// ========== Type Aliases Versus Interfaces ==========

type PoetType = {
  born: number;
  name: string;
};

interface PoetInterface {
  born: number;
  name: string;
}
// The two syntaxes are almost identical

let valueLater: PoetType;
// Ok
valueLater = {
  born: 1935,
  name: "Sara Teasdale",
};
// valueLater = "Emily Dickinson"; // get Error
// Error: Type 'string' is not assignable to 'Poet'.
valueLater = {
//   born: true,// get Error
    born:1444,
  // Error: Type 'boolean' is not assignable to type 'number'.
  name: "Sappho",
};

// ========================== Types of Properties ====================

interface Book {
    author?: string;
    pages: number;
    };
    // Ok
    const okk: Book = {
    author: "Rita Dove",
    pages: 80,
    };

    //========================= Read-Only Properties ===================

    interface Page {
        readonly text: string;
        }
        function read(page: Page) {
            // Ok: reading the text property doesn't attempt to modify it
            console.log(page.text);
            // page.text += "!"; // get error
        }