"use strict";
/*
    Some functional devs
    Try to never use classes
    Too intense for me
*/
var _Base_truePrivate;
class Greeter {
    //This Greeted constructor also expects its message: string parameter to be provided:
    constructor(message) {
        this.destination = message;
        console.log(`As I always say: ${message}!`);
    }
    greet(name) {
        console.log(`${name}, do your stuff!`);
    }
}
//=================== Function Properties ===================
class WithMethod {
    myMethod() { }
}
new WithMethod().myMethod === new WithMethod().myMethod; // true
class WithProperty {
}
//new WithMethod().myProperty === new WithMethod().myProperty; // false
class WithPropertyParameters {
    constructor() {
        this.takesParameters = (input) => (input ? "Yes" : "No");
    }
}
const instance = new WithPropertyParameters();
instance.takesParameters(true); // Ok
// ==================== Initialization Checking ==============
class WithValue {
    // unused: number; // Get Error
    // Error: Property 'unused' has no initializer
    // and is not definitely assigned in the constructor.
    constructor() {
        this.immediate = 0; // Ok
        this.later = 1;
    }
}
class MissingInitializer {
}
//  new MissingInitializer().property.length;
// TypeError: Cannot read property 'length' of undefined
// The billion-dollar mistake strikes again!
/*
    This ActivitiesQueue class is meant to be re-initialized any number of times separately from its constructor, so its pending property must be asserted with a !:
*/
class ActivitiesQueue {
    initialize(pending) {
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
}
// new MissingInitializers().property?.length; // Ok
// new MissingInitializers().property.length;
// Error: Object is possibly 'undefined'.
// ========================= Read-Only Properties =========================
class Quote {
    constructor(text) {
        this.text = "hello";
    }
    emphasize() {
        // this.text += "!";
        // Error: Cannot assign to 'text' because it is a read-only property.
    }
}
const quote = new Quote("There is a brilliant child locked inside every student.");
// Quote.text = "Ha!";
// Error: Cannot assign to 'text' because it is a read-only property.
class RandomQuote {
    constructor() {
        this.explicit = "Home is the nicest word there is.";
        this.implicit = "Home is the nicest word there is.";
        if (Math.random() > 0.5) {
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
let teacher;
teacher = new Teacher(); // Ok
//  teacher = "Wahoo!"; // get Error
// Error: Type 'string' is not assignable to type 'Teacher'.
class SchoolBus {
    getAbilities() {
        return ["magic", "shapeshifting"];
    }
}
function withSchoolBus(bus) {
    console.log(bus.getAbilities());
}
withSchoolBus(new SchoolBus()); // Ok
// Ok
withSchoolBus({
    getAbilities: () => ["transmogrification"],
});
withSchoolBus({
    // getAbilities: () => 123, // Get error
    getAbilities: () => ["123"],
    // Error: Type 'number' is not assignable to type 'string[]'.
});
class Student {
    constructor(name) {
        this.name = name;
    }
    study(hours) {
        for (let i = 0; i < hours; i += 1) {
            console.log("...studying...");
        }
    }
}
class Slackers {
    constructor() {
        // Error: Class 'Slacker' incorrectly implements interface 'Learner'.
        // Property 'study' is missing in type 'Slacker'
        // but required in type 'Learner'.
        this.name = "Rocky";
    }
}
/*
        ===================== NOTE ===================
Interfaces meant to be implemented by classes are a typical reason to use the method syntax for declaring an interface member as a function—as used by the Learner interface.
    */
class Students {
    // Error: Member 'name' implicitly has an 'any' type.
    study(hours) {
        // Error: Parameter 'hours' implicitly has an 'any' type.
    }
}
class ReportCard {
    constructor(grades) {
        this.grades = grades;
    }
    report() {
        return this.grades.join(", ");
    }
}
class AsNumber {
    constructor() {
        this.age = 0;
        // ~~~
        // Error: Property 'age' in type 'AsNumber' is not assignable
        // to the same property in base type 'AgeIsNotANumber'.
        // Type 'number' is not assignable to type '() => string'.
    }
}
class NotAsNumber {
    age() {
        return "";
    }
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
    constructor(subject) {
        this.subject = subject;
    }
}
class OnlineLesson extends Lesson {
    constructor(subject, url) {
        super(subject);
        this.url = url;
    }
}
let lesson;
lesson = new Lesson("coding"); // Ok
lesson = new OnlineLesson("coding", "oreilly.com"); // Ok
let online;
online = new OnlineLesson("coding", "oreilly.com"); // Ok
//============================= Overridden Constructors ===================
class GradeAnnouncer {
    constructor(grade) {
        this.message = grade >= 65 ? "Maybe next time..." : "You pass!";
    }
}
class PassingAnnouncer extends GradeAnnouncer {
    constructor() {
        super(100);
    }
}
class FailingAnnouncer extends GradeAnnouncer {
}
class GradesTally {
    constructor() {
        this.grades = [];
    }
    addGrades(...grades) {
        this.grades.push(...grades);
        return this.grades.length;
    }
}
class ContinuedGradesTally extends GradesTally {
    constructor(previousGrades) {
        // this.grades = [...previousGrades];
        // Error: 'super' must be called before accessing
        // 'this' in the constructor of a subclass.
        super();
        console.log("Starting with length", this.grades.length); // Ok
    }
}
//========================== Overridden Methods =======================
class GradeCounter {
    countGrades(grades, letter) {
        return grades.filter((grade) => grade === letter).length;
    }
}
class FailureCounter extends GradeCounter {
    countGrades(grades) {
        return super.countGrades(grades, "F");
    }
}
class AnyFailureChecker extends GradeCounter {
}
const counter = new AnyFailureChecker();
// Expected type: number
// Actual type: boolean
//const count = counter.countGrades(["A", "C", "F"]);
//============================ Overridden Properties ====================
class Assignment {
}
class GradedAssignment extends Assignment {
    constructor(grade) {
        super();
        this.grade = grade;
    }
}
class NumericGrade {
    constructor() {
        this.value = 0;
    }
}
class VagueGrade extends NumericGrade {
}
// const instancess: NumericGrade = new VagueGrade();
// Expected type: number
// Actual type: number | string
//instancess.value;
//====================== Abstract Classes =================
class School {
    constructor(name) {
        this.name = name;
    }
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
    constructor() {
        this.isPublicImplicit = 0;
        this.isPublicExplicit = 1;
        this.isProtected = 2;
        this.isPrivate = 3;
        _Base_truePrivate.set(this, 4);
    }
}
_Base_truePrivate = new WeakMap();
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
    guess(getAnswer) {
        const answer = getAnswer(Question.prompt);
        // Ok
        if (answer === Question.answer) {
            console.log("You got it!");
        }
        else {
            console.log("Try again...");
        }
    }
}
Question.prompt = "What's an ogre's favorite programming language?";
