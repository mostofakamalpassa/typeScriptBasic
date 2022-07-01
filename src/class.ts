/* 
    Some functional devs
    Try to never use classes
    Too intense for me
*/

class Greeter {
  // class properties
  destination: string;
  //This Greeted constructor also expects its message: string parameter to be provided:
  constructor(message: string) {
    this.destination = message;
    console.log(`As I always say: ${message}!`);
  }
  greet(name: string) {
    console.log(`${name}, do your stuff!`);
  }
}

//=================== Function Properties ===================

class WithMethod {
  myMethod() {}
}
new WithMethod().myMethod === new WithMethod().myMethod; // true

class WithProperty {
  // myProperty: () => {};
}
//new WithMethod().myProperty === new WithMethod().myProperty; // false

class WithPropertyParameters {
  takesParameters = (input: boolean) => (input ? "Yes" : "No");
}
const instance = new WithPropertyParameters();
instance.takesParameters(true); // Ok

// ==================== Initialization Checking ==============

class WithValue {
  immediate = 0; // Ok
  later: number; // Ok (set in the constructor)
  mayBeUndefined: number | undefined; // Ok (allowed to be undefined)
  // unused: number; // Get Error
  // Error: Property 'unused' has no initializer
  // and is not definitely assigned in the constructor.
  constructor() {
    this.later = 1;
  }
}

class MissingInitializer {
  // property: string; // GET Errors
}
//  new MissingInitializer().property.length;
// TypeError: Cannot read property 'length' of undefined
// The billion-dollar mistake strikes again!

/* 
    This ActivitiesQueue class is meant to be re-initialized any number of times separately from its constructor, so its pending property must be asserted with a !:
*/
class ActivitiesQueue {
  pending!: string[]; // Ok
  initialize(pending: string[]) {
    this.pending = pending;
  }
  next() {
    return this.pending.pop();
  }
}
const activities = new ActivitiesQueue();
activities.initialize(["eat", "sleep", "learn"]);
activities.next();

//================= Optional Properties ==================

class MissingInitializers {
  property?: string;
}
// new MissingInitializers().property?.length; // Ok
// new MissingInitializers().property.length;
// Error: Object is possibly 'undefined'.

// ========================= Read-Only Properties =========================

class Quote {
    readonly text: string;
    constructor(text: string) {
    this.text = ;
    }
    emphasize() {
   // this.text += "!";
    ~~~~
    // Error: Cannot assign to 'text' because it is a read-only property.
    }
    }
    const quote = new Quote(
    "There is a brilliant child locked inside every student."
    );
   // Quote.text = "Ha!";
    // Error: Cannot assign to 'text' because it is a read-only property.

    class RandomQuote {
        readonly explicit: string = "Home is the nicest word there is.";
        readonly implicit = "Home is the nicest word there is.";
        constructor() {
        if (Math.random () > 0.5) {
      //  this.explicit = "We start learning the minute we're born." // Ok;
      //  this.implicit = "We start learning the minute we're born.";
        // Error: Type '"We start learning the minute we're born."' is
        // not assignable to type '"Home is the nicest word there is."'.
        }
        }
        }
      //  const quote = new RandomQuote();
      //  quote.explicit; // Type: string
      //  quote.implicit; // Type: "Home is the nicest word there is."
    
    // ====================== Classes as Types ===================

    /* 
        Classes are relatively unique in the type system in that a class declaration creates both a runtime value—the class itself—as well as a type that can be used in type annotations.
    */

        class Teacher {
            sayHello() {
            console.log("Take chances, make mistakes, get messy!");
            }
            }
            let teacher: Teacher;
            teacher = new Teacher(); // Ok
          //  teacher = "Wahoo!"; // get Error
            // Error: Type 'string' is not assignable to type 'Teacher'.

            class SchoolBus {
                getAbilities() {
                return ["magic", "shapeshifting"];
                }
                }
                function withSchoolBus(bus: SchoolBus) {
                console.log(bus.getAbilities());
                }
                withSchoolBus(new SchoolBus()); // Ok
                // Ok
                withSchoolBus({
                getAbilities: () => ["transmogrification"],
                });
                withSchoolBus({
                // getAbilities: () => 123, // Get error
                getAbilities: () => ['123'],
               
                // Error: Type 'number' is not assignable to type 'string[]'.
                });

//======================= Classes and Interfaces ========================

interface Learner {
    name: string;
    study(hours: number): void;
    }
    class Student implements Learner {
    name: string;
    constructor(name: string) {
    this.name = name;
    }
    study(hours: number) {
    for (let i = 0; i < hours; i+= 1) {
    console.log("...studying...");
    }
    }
    }

    class Slackers implements Learner {
        // Error: Class 'Slacker' incorrectly implements interface 'Learner'.
        // Property 'study' is missing in type 'Slacker'
        // but required in type 'Learner'.
        name = "Rocky";
     }

    /* 
        ===================== NOTE ===================
Interfaces meant to be implemented by classes are a typical reason to use the method syntax for declaring an interface member as a function—as used by the Learner interface.
    */

class Students implements Learner {
    name;
    // Error: Member 'name' implicitly has an 'any' type.
    study(hours) {
    // Error: Parameter 'hours' implicitly has an 'any' type.
    }
}

//============================= Implementing Multiple Interfaces ================

interface Graded {
    grades: number[];
    }
    interface Reporter {
    report: () => string;
    }
    class ReportCard implements Graded, Reporter {
    grades: number[];
    constructor(grades: number[]) {
    this.grades = grades;
    }
    report() {
    return this.grades.join(", ");
    }
    }
    interface AgeIsANumber {
        age: number;
        }
        interface AgeIsNotANumber {
        age: () => string;
        }

        class AsNumber implements AgeIsANumber, AgeIsNotANumber {
            age = 0;
            // ~~~
            // Error: Property 'age' in type 'AsNumber' is not assignable
            // to the same property in base type 'AgeIsNotANumber'.
            // Type 'number' is not assignable to type '() => string'.
            }
            class NotAsNumber implements AgeIsANumber, AgeIsNotANumber {
            age() { return ""; }
            // ~~~
            // Error: Property 'age' in type 'NotAsNumber' is not assignable
            // to the same property in base type 'AgeIsANumber'.
            // Type '() => string' is not assignable to type 'number'.
            }

//=========================== Extending a Class ==============================

class Teachers {
    teach() {
    console.log("The surest test of discipline is its absence.");
    }
    }
    class StudentTeacher extends Teachers {
    learn() {
    console.log("I cannot afford the luxury of a closed mind.");
    }
    }
    const teachers = new StudentTeacher();
    teachers.teach(); // Ok (defined on base)
    teachers.learn(); // Ok (defined on subclass)
  //  teachers.other(); // Error
   
    // Error: Property 'other' does not exist on type 'StudentTeacher'.

    class Lesson {
        subject: string;
        constructor(subject: string) {
        this.subject = subject;
        }
    }

    class OnlineLesson extends Lesson {
        url: string;
        constructor(subject: string, url: string) {
        super(subject);
        this.url = url;
        }
        }

        let lesson: Lesson;
lesson = new Lesson("coding"); // Ok
lesson = new OnlineLesson("coding", "oreilly.com"); // Ok
let online: OnlineLesson;
online = new OnlineLesson("coding", "oreilly.com"); // Ok

//============================= Overridden Constructors ===================

class GradeAnnouncer {
    message: string;
    constructor(grade: number) {
    this.message = grade >= 65 ? "Maybe next time..." : "You pass!";
    }
    }
    class PassingAnnouncer extends GradeAnnouncer {
            constructor() {
            super(100);
            }
    }

    class FailingAnnouncer extends GradeAnnouncer {
        //constructor() { }
        // Error: Constructors for subclasses must contain a 'super' call.
    }

    class GradesTally {
        grades: number[] = [];
        addGrades(...grades: number[]) {
            this.grades.push(...grades);
            return this.grades.length;
        }
    }

    class ContinuedGradesTally extends GradesTally {
        constructor(previousGrades: number[]) {
       // this.grades = [...previousGrades];
        // Error: 'super' must be called before accessing
        // 'this' in the constructor of a subclass.
        super();
        console.log("Starting with length", this.grades.length); // Ok
        }
    }
//========================== Overridden Methods =======================

class GradeCounter {
    countGrades(grades: string[], letter: string) {
    return grades.filter(grade => grade === letter).length;
    }
    }
    class FailureCounter extends GradeCounter {
    countGrades(grades: string[]) {
    return super.countGrades(grades, "F");
    }
    }
    class AnyFailureChecker extends GradeCounter {
   // countGrades(grades: string[]) {
    // Property 'countGrades' in type 'AnyFailureChecker' is not
    // assignable to the same property in base type 'GradeCounter'.
    // Type '(grades: string[]) => boolean' is not assignable
    // to type '(grades: string[], letter: string) => number'.
    // Type 'boolean' is not assignable to type 'number'.
   // return super.countGrades(grades, "F") !== 0;
    //}
    }

    const counter: GradeCounter = new AnyFailureChecker();
// Expected type: number
// Actual type: boolean
//const count = counter.countGrades(["A", "C", "F"]);

//============================ Overridden Properties ====================

class Assignment {
    grade?: number;
}
class GradedAssignment extends Assignment {
    grade: number;
    constructor(grade: number) {
    super();
    this.grade = grade;
    }
}

class NumericGrade {
    value = 0;
    }
    class VagueGrade extends NumericGrade {
    //value = Math.random() > 0.5 ? 1 : "...";
    // Error: Property 'value' in type 'NumberOrString' is not
    // assignable to the same property in base type 'JustNumber'.
    // Type 'string | number' is not assignable to type 'number'.
    // Type 'string' is not assignable to type 'number'.
    }
   // const instancess: NumericGrade = new VagueGrade();
    // Expected type: number
    // Actual type: number | string
   //instancess.value;

   //====================== Abstract Classes =================
abstract class School {
    readonly name: string;
    constructor(name: string) {
    this.name = name;
    }

abstract getStudentTypes(): string[];
    }
class Preschool extends School {
    getStudentTypes() {
     return ["preschooler"];
    }
}

//====================== Member Visibility =======================

/* 
    JavaScript includes the ability to start the name of a class member with # to mark it as a “private” class member. Private class members may only be accessed by instances of that class.
    JavaScript runtimes enforce that privacy by throwing an error if an area of code outside the class tries to access the private method or property.
*/

/* 
    public (default)
        Allowed to be accessed by anybody, anywhere
    protected
        Allowed to be accessed only by the class itself and its subclasses
    private
        Allowed to be accessed only by the class itself
*/

class Base {
    isPublicImplicit = 0;
    public isPublicExplicit = 1;
    protected isProtected = 2;
    private isPrivate = 3;
    #truePrivate = 4;
}

class Subclass extends Base {
    examples() {
    this.isPublicImplicit; // Ok
    this.isPublicExplicit; // Ok
    this.isProtected; // Ok
    //this.isPrivate;
    // Error: Property 'isPrivate' is private
    // and only accessible within class 'Base'.
    //this.#truePrivate;
    // Property '#truePrivate' is not accessible outside
    // class 'Base' because it has a private identifier.
    }
}
new Subclass().isPublicImplicit; // Ok
new Subclass().isPublicExplicit; // Ok

class TwoKeywords {
    private readonly name: string;
    constructor() {
    this.name = "Anne Sullivan"; // Ok
    }
    log() {
    console.log(this.name); // Ok
    }
}
    const two = new TwoKeywords();


//====================== Static Field Modifiers =================

class Question {
    protected static readonly answer: "bash";
    protected static readonly prompt =
    "What's an ogre's favorite programming language?";
    guess(getAnswer: (prompt: string) => string) {
    const answer = getAnswer(Question.prompt);
    // Ok
    if (answer === Question.answer) {
    console.log("You got it!");
    } else {
    console.log("Try again...")
    }
    }
}

