const firstName = "kamal passa";
// const firstNameLength = firstName.length()
const firstNameLength = firstName.length;

/*
The code is written in normal JavaScript syntax—I haven’t introduced
TypeScript-specific syntax yet.
*/

function sayMyName(fullName: string) {
  console.log(`Hello Your full name is : ${fullName}`);
}

sayMyName("mostofa kamal passa");

//  below code show error
// sayMyName(555)

// Precise Documentation

interface Painter {
  finish(): boolean;
  ownMaterials: string[];
  paint(painting: string, materials: string[]): boolean;
}


function paintPainting(printer: Painter, printing: string) : boolean{

    
    return true;
}



// Compiling Syntax

const artist = "Augusta Savage";
console.log({ artist });


