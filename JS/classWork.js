// ECMA: European Computer Manufacturers association
caniuse.com
Transpile
interpreter
Two environment: Node / browser
console.log("hi from js")

// ---------- Primitive data types
string, boolean, number, null, undefined, symbol, bigInt(2^53 - 1)
null VS undefined
console.log(typeof "")
console.log(typeof null)
console.log(typeof undefined);

// ---------- Reference data types / Object
// Stack: static / primitive --->
// Heap: objects / functions
let arr = new Array();
console.log(typeof arr);

// ---------- Pass by value
let a = 8;
let b = a;
b = 10;
console.log(a);

// ---------- Pass by reference
let a = {name: 'Tom'};
let b = a;
b.name = 'Jerry';
console.log(a);

// ---------- Mutable VS Immutable
let a = 16;
a = 12;
console(a)

// ---------- Coercion
Explicit (Type casting) VS Implicit ==, +
// ---- to string
let res = 1 + "1";
// ---- to boolean
let res = Boolean(null);
//  ||, &&, !
// ---- to number
let res = Number("123");
let res = Number("number");  NaN
let b = "123";
let a = +b;
let res = a+b;
res = a+ +b;

let res = null + "5";
let res = null + 5;
let res = 12 / "2";
let res = + "123";
let res = true + false;
let res = + "abc";
console.log(typeof res, res);

// ---------- == VS ===
console.log('1' === 1);
console.log(undefined === null);
const a = {
    content: {
        age: 17
    }
}
const b = {
    content: a.content
}
console.log(a.content == b.content)
console.log(a == b)

// ---------- Truthy vs Falsy
Falsy: null, undefined, 0, NaN, ""
console.log(Boolean([]))
console.log(Boolean({}))

const arr =[1, 2, 3, 4];
if (arr.length){
    // do sth here
}

Object
let obj = {
    age: 16,
    name: "Tom"
}
console.log(obj);
let obj1 = Object.create({age: 16})
let obj2 = new Object({})
Access properties
console.log(obj.age)
console.log(obj["age"])
let str = "name";
console.log(obj[str])
console.log(obj.str)
Staic methods
const obj = {
    name: "Tom", age: 16, gender: "male"
}
console.log(Object.keys(obj))
console.log(Object.values(obj))
console.log(Object.entries(obj))

Class
class Person {
    constructor(){
        this.name = "Tom";
        this.age = 16;
    }
    getAge(){
        return this.age;
    }
}

const student = new Person()
console.log(student.getAge());

Function
function createPerson(){
    const obj = {};
    obj.name = "Tom";
    obj.age = 16;

    return obj;
}
console.log(createPerson());
arrow function: (inputs) => { function body }
const myFunc = (name, age) => {
    console.log("name is " + name);
    console.log("age is " + age);
}
myFunc("Tom", 16);

Ways to declare variables
let, const, var
var: redeclared & reassigned, global / functional scope, hoisted
let: reassigned, block scope
const: block scope

function foo(){
    // console.log("before", a);
    if (true){
        let a = 5;
        console.log(a)
    }
    // console.log("after", a);
}
foo();

const obj = {name: "Tom"}
obj.name = "Jerry";
obj = {};
console.log(obj)

null, undefined, is not defined (reference error)
var name = "Tom";
var age = 16;
const obj ={
    name: 'Tom', age: 16
}

Function hoisting
foo();
function foo() {
    console.log("foo");
}
foo();

myFunc();
const myFunc = () =>{
    console.log("Arrow function")
}

null == undefined => true
console.log(NaN == NaN)
let quantity = NaN;
console.log(isNaN(quantity))
console.log(Object.is(quantity, NaN))

Object Oriented Programming in JS
Classes and instances
class Person{
    constructor(name){
        this.name = name;
    }
}
let person1 = new Person("Bob");
console.log(person1.name)

Abstraction
class Person{
    constructor(name){
        this.name = name;
    }
    // abstract method
    info(){
        throw error("This method is not implemented!");
    }
}
class Student extends Person{
    info(){
        // super.info();
        console.log("My name is " + this.name);
    }
}
const Tom = new Student("Tom");
Tom.info();

Encapsulation
class Person{
    constructor(name, age){
        this._name = name;
        this._age = age;
    }
    get getName(){
        console.log("In the getter method, ")
        return this._name;
    }
    set name(newName){
        console.log("In the setter method");
        this._name = newName;
    }
    get getAge(){
        return this._age;
    }
    set setAge(newAge){
        this._age = newAge;
    }
    setName(newName){
        this._name = newName;
    }
}
let p1 = new Person("Tom", 24);
console.log(p1.getName);
p1.setName("Bob");
console.log(p1.getName);

p1.setAge = 26;
console.log(p1.getAge);

Inheritance extends
class Person{
    constructor(name, age){
        this._name = name;
        this._age = age;
    }
    intro(){
        console.log("This is in the Person class")
    }
}
class Student extends Person{
    constructor(name, age, year){
        super(name, age);
        this.year = year;
    }
    intro(){
        console.log("My name is "+ this._name + ". I am " + this.year);
    }
    register(courseName){
        console.log(courseName + " is registered.");
    }
}
const Tom = new Student("Tom", 18, "senior");
Tom.intro();
Tom.register("Physics");

const Bob = new Person("Bob", 24);
Bob.intro();

Polymorphism
class Professor extends Person {
    intro(){
        console.log("I am Professor "+this._name);
    }
}
const Bob = new Professor("Bob", 40);
Bob.intro();

Object prototype
object constructor function
function Person(){
    this.name = "John",
    this.age = 23,

    this.greet = function() {
        console.log("Greetings!");
    }
}
Person.prototype.gender = "Male";
const person1 = new Person();
const person2 = new Person();
person1.greet();
console.log(person1.name);
console.log(person2.name);

person1.gender = "male";


prototype
console.log(person1);
console.log(person1.gender);
console.log(person2.gender);

console.log(person1.__proto__);
console.log(Object.getPrototypeOf(person1))

prototype chain
console.log(person1.toString());

array 
const arr = [1, 2, 3];
console.log(arr);
own map function
Array.prototype.myMap = function(callbackFn) {
    const result = [];
    for(let i = 0; i < this.length; i++){
        let newVal = callbackFn(this[i], i, this);
        result.push(newVal);
    }
    return result;
}
const output = arr.myMap(function(curr, index, array){
    console.log('current item: ', curr, 'index: ', index);
    return 2*curr;
})
console.log(output);
for(let i = 0; i < arr.length; i++/ i--)
for of similiar forEach
const arr = [1, 2, 3, 4]
const newArr = []
for (let item of arr){
    console.log(item);
    newArr(2*item);
}
for in
const obj1 = {name: "Tom"};
for (let key in obj1){
    console.log(obj1[key]);
}
for (let i in arr){
    console.log(i);
}

Arguments
function foo(name, age, gender){
    for(let i = 0; i < arguments.length; i++){
        console.log(arguments[i]);
    }
}
foo(1, 2, 3, 4, 5)

Rest parameter VS spread operator
...
 rest parameter
foo(1,2,3,4,5,6);
function foo(a, b, c, ...arr){
    console.log(arr)
}
spread operator
const student = {
    name: "Tom", age: 16, gender: "male"
}
const newStudent = { ...student, name:"Jerry"}
console.log("Original ",student)
console.log("New ", newStudent)
const arr1 =[1, 2, 3, 4];
const arr2 = [...arr1];
console.log(arr1 == arr2);

Shallow copy VS Deep copy
const a  = {
    name: "Tom",
    content: {
        age: 20
    }
    age: 20
}
const b = {...a}
const c ={...a, age: 30}
console.log(c)
b.name = a.name;
b.content = a.content;
console.log(a === b);
console.log(b.content === a.content);
b.content.age = 40;
console.log(a.content)
b.age = 40;
console.log(a.age);

Deep copy
JSON.stringify / JSON.parse
const a = {
    name: "Tom", 
    content: {
        age: 30
    }
}
let b = JSON.stringify(a);
// console.log(b);
let c = JSON.parse(b);
c.content.age = 40;
console.log(c)
console.log(a.content)

Destructure 
 array
let [a,b,c] = [1, 2, 3];
let [a, b] = [1, 2, 3];
let [a, , b] = [1, 2, 3];
let [a, b, c, d] = [1, 2, 3];
let [a, b, c = 4, d = 44] = [1, 2, 3];
let [ , a, b] = [1, 2, 3];
let [a, ...b] = [1, 2, 3, 4];
let [...b, ,a] = [1, 2, 3, 4]; => error

console.log("a = ", a);
console.log("b = ", b);
console.log("c = ", c);
console.log("d = ", d);

let a = 6, b= 3;
// let c = a; 
// a = b;
// b = c;
[a, b] = [b, a]
console.log(a, b);

Object destructuring
let obj = {x: 1, y: 2};
let {a, b} = obj; => undefined
let {x, y} = obj;
console.log("x =", x);
console.log("y =", y)

let {a: x, b: y} = {a: 2, b: 3};
let {a, ...x} = {a: 2, b: 3};
console.log( x);
console.log("y =", y)

const obj1 = {name:"Tom", age:10}
let obj2 = {...obj1};
// obj1.name = "Jerry";
// console.log(obj2.name);

const {age} = obj1;
console.log(age);
obj2 = {name: "Jerry", age: age}
console.log(obj2)

"this"


Global context
console.log(this);

Function context
1. normally
"use strict";
function show(){
    // "use strict";
    console.log(this === window)
    function inner(){
        console.log(this === window);
    }
    inner();
}
show()
2. Method invokation
let counter = {
    count: 0,
    add: function(){
        return ++this.count;
    }
}
console.log(counter.add());
3. arrow function
let getThis = () => {
    return this;
}
console.log(getThis() === window)
4. constructor 
function Person(){
    this.name = "John",
    this.age = 23,

    this.greet = function() {
        console.log("Greetings!");
    }
}
const person1 = new Person();
5. call() / apply()
function getBrand(){
    console.log("it is a " + this.brand)
}
let honda = {brand: "honda"}
let toyota = {brand: "toyota"}
getBrand.call(honda)
getBrand.call(toyota)
6. bind()
4 > 5 = 6 > 2 > 1 
3

IIFE - Immediately Invoked Function Expression
(function() {
    console.log("Hello");
})();
(() => {
    console.log("Hello arrow")
})();
(function(x, y){
    console.log(x+y);
})(10, 20);
window.functionName
(function(){
    const a =10;
    const b = 20;

    function add(x, y){
        return x+y;
    }

    console.log(add(a, b));
})();
const counter = (function(){
    let count = 0;
    function increment(){
        count++;
    }
    function getCount(){
        return count;
    }

    return {
        increment: increment,
        getCount: getCount
    }
})();
counter.increment();
console.log(counter.getCount());
counter.increment();
console.log(counter.getCount());

Callback function
function greet(name, cbFn) {
    console.log("Hi "+ name);
    cbFn();
}
function callMe(){
    console.log("I am a callback function")
}
greet("Tom", callMe)
Array.map
const number = [1, 2, 3, 4];
const double = number.map(function(num){
    return num*2;
})
const double2 = number.map((num) => num*2);
console.log(double)
console.log(double2)
Array.filter
const even = number.filter(function(num){
    return num % 2 === 0;
})
console.log(even)
Array.reduce
const sum = number.reduce(function(acc, num){
    console.log("Accumulator ", acc)
    console.log("Current item ", num)
    return acc+num;
}, 0);
console.log(sum);

Higher order function
Ex. reduce, filter, map, forEach...

Closure
function createCounter(){
    let count = 0;

    function increment(){
        count++;
        console.log(count);
    }

    return increment;
}
const counter = createCounter();
counter();
counter();
counter();
counter();
counter();

Curring
function multiply(a, b, c){
    return a*b*c;
}
console.log(multiply(1,2,3));
function multiply(a){
    return function(b){
        return function(c){
            return a*b*c;
        }
    }
}
let res = multiply(1)(2)(3);
console.log(res);

Global execution context: 
Creation phase
1. global object
2. this -> global object
3. setup the heap
 4. save the function declarations in heap  &
variable (undefined)
Execution phase: make function call && inital variables
Function execution context
Call stack

 Synchronous VS Asynchornous
synchronous code:
console.log("----Sync----")
console.log("1")
console.log("2")
console.log("3")
Asynchronous code:
console.log("----Async----")
console.log("1")
setTimeout(()=>console.log("asynchronously"),0)
console.log("2")
console.log("3")

function sync(ms){
    let start = Date.now();
    let now = start;
    while (now - start < ms){
        now = Date.now();
    }
    console.log("Sync: main stack finishes in " + ms/1000 + " sec")
}
sync(2000)
sync(3000)
sync(1000)

function async(ms){
    setTimeout(()=>{
        console.log("Async: finishes in " + ms/1000 + " sec");
    }, ms)
}
async(3000)
async(0)
async(1000)
async(500)
async(7000)
     Callback function

Event loop 

const A = () => {
    setTimeout(()=>{
        console.log("A")
    }, 1000)
}
const B = () => {
    setTimeout(()=>{
        console.log("B")
    }, 500)
}
const C = () => {
    setTimeout(()=>{
        console.log("C")
    }, 300)
}
A();
B();
C();

Callback hell
callback() =>{
    callback2()=>{
        callback3()=>{
            ...
        }
    }
}
let resA = '';
let resB = '';
const D = () => {
    setTimeout(()=>{
        resA = 'A';
        console.log("In the first layer ", resA);
        setTimeout((res)=>{
            resB = res + ' B';
            console.log("In the secode layer ", resB)
            setTimeout();
        }, 500, resA);

    }, 1000)
}
D();

Promise -- object
Three states: pending, fulfilled, rejected
promise constructor
const promise = new Promise((resolve, reject) => {
    let indicator = true;
    if (indicator){
        let data = "success";
        resolve(data)
    }
    else {
        let error = "failed";
        reject(error)
    }
})
function getUser(userID){
    return new Promise((resolve, reject)=>{
        setTimeout((id) => {
            if (id){
                resolve({id: id, name: "Tom"})
            } else {
                reject("Invalid user ID")
            }
        }, 1000, userID);
    })
}
// .then() .catch() .finally()
getUser(1).then((user) => {
    console.log("User: ", user);
}).catch((err) => {
    console.log("Error: ", err)
}).finally(() => {
    console.log("Operation completed")
})
const newPromise = Promise.resolve("correct message");
newPromise.then((res) => {
    console.log(res)
}).catch((err)=>{
    console.log(err);
})

Fetch() returns a promise
fetch(url).then((data)=>{..}).catch((err)=>{...})
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) =>{
        if (!res.ok){
            throw new Error("Request failed!")
        }
        return res.json();
    }).then((data) => {
        console.log("Fetched data: ", data);
    }).catch((err)=>{
        console.log("Error: ", err);
    })

Promise Chaining
const promise2 = new Promise((resolve, reject) => {
    console.log("Begin");
    let indicator = false;
    if (indicator){
        resolve("original data")
    }
    else {
        reject("error at step 1")
    }
})

promise2.then((res) => {
    console.log("Input at step 2 ", res);
    return "Data at step 2";
}, (err)=>{
    console.log("Error at step 2: ", err);
    // return "Error handeled at step 2";
    throw new Error(err);
}).then((res) => {
    console.log("Input at step 3 ", res);
    return "Data at step 3";
}).catch((err)=> {
    console.log("Error recieved ", err);
    return "Error handeled at step 3"
})
.then((res)=> {
    console.log("Final data: ", res)
})

Promise.all()

Micro task queue VS callback queue
console.log("No.1: Sync");
setTimeout(()=>{
    console.log("No.2: setTimeout");
}, 0)

const promise1 = new Promise((resolve, reject)=>{
    resolve();
})
promise1.then((res)=>{
    console.log("No.3: 1st promise")
}).then((res)=>{
    console.log("No.4: 2nd promise")
})

console.log("No.5: Sync")

Async / Await
async function fetchData(){
    try{
        console.log("This is ran synchronously");
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1',{
            method: 'POST'
        });
        console.log('Status: ', response.status);
        const data = await response.json();
        console.log("Fetched data: ", data);
    } catch (err){
        console.log("Error when fetching data, ", err);
    }
    
}
fetchData();