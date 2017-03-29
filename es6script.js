var name = 'tim'

// template strings will require the use of a back tick `
console.log(`Hello my name is ${name}`)
console.log(`2 + 2 = ${2 + 2}`)

function getName() {
    return 'sue'
}

console.log(`Hello my name is ${getName()}`)

// Accessing arguments and changing them into an array the old way
function oldAdd(){
    //this will return an array of arguments
    var args = Array.prototype.slice.call(arguments, 2 /* starting from index 2 */)
}

// default arguments for functions
function add(x, y=5, z=10){
    return x + y + z
}

// rest
function betterAdd(...values){
    console.log(values) //returns an array of arguments
    var result = values.reduce(function(memo, value){
        return memo+value
    }, 0)
    return result
}

// we can also use the rest operater after a few  arguments
function prepOrder (meal1, meal2, ...guests){
    //implementation
}

// so what spread basically does is that it takes a comma separated
// set of variables and creates an array within the funciton for Accessing

// Spread does the complete opposite of that
var  numbers = [1, 2]
function spreadOperation (number1, number2, operation){
    //implementation
}
var result = spreadOperation (...numbers, "addition")

// Arrow funcitons
var numbers = [1, 2, 3, 4, 5]
var numbers2 = numbers.map((number) => {
    return number * 2
})

// for single argument arrow functions
// but for zero arguments you have to use paranthesis
var numbers3 = numbers.map(number => {
    return number * 3
})

// can also be used in normal assignment context and not just annonymously
var myFunction = number => {
    console.log(number)
}
myFunction(123)

// In one liner function you can ommit the "return word and braces
var numbers4 = numbers.map(number => number * 4)

// Arrow functions can fix the issue of this

function Person(name){
    this.name = name
}

Person.prototype.sayNameTimed = function(){
    setTimeout(function(){
        console.log(`My name is ${this.name}`)
    }, 1000)
}

var p1 = new Person("Al")
// This will not work because "this is undefined in this case"
p1.sayNameTimed()

//so we either bind 
Person.prototype.sayNameTimed = function(){
    setTimeout(function(){
        console.log(`My name is ${this.name}`)
    }.bind(this), 1000)
}

//or we capture this and use it in lexical scope
Person.prototype.sayNameTimed = function(){
    self = this
    setTimeout(function(){
        console.log(`My name is ${self.name}`)
    }, 1000)
}

//Or better than all that use an arrow function and it will work
//you can look at arrow functions as if they are implicitly calling
// .bind(this) in the background
Person.prototype.sayNameTimed = function(){
    setTimeout(() => {
        console.log(`My name is ${this.name}`)
    }, 1000)
}

// Destructuring array items into separate variables
var numbers = [10, 20 , 30]
var [no1, no2, no3] = numbers

//could also come in very handy for swaping
[no1, no2] = [no2, no1]

//could also be used with objects
var dog = {
    name: 'shorty',
    age: 4
}
//The name and age will be copied to the variable dogName
var {name: dogName, age: dogAge} = dog 

//we can also create same variable names as those in the objects
//In this case we ommit the translation
var {name, age} = dog 

// Class Syntex for es6
class Person{
    constructor (name){
        this.name = name
    }

    //no need to write functions on prototypes anymore
    //no need to to use the function keyword either
    sayName(){
        console.log(`Hello ${this.name}`)
    }
}