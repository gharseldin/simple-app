var numbers = [1, 2, 3, 4, 5]

// forEach to iterate over the items of an array
numbers.forEach(function (number, i){
    console.log("number:" + number + " at index:" + i)
})

/* results
number:1 at index:0
number:2 at index:1
number:3 at index:2
number:4 at index:3
number:5 at index:4
*/

// map function to iterate over the items of an array and
// map each item to another item in a newly returned array
var doubleNumbers = numbers.map(function(number){
    return number * 2
})

doubleNumbers.forEach(function (number, i){
    console.log("number:" + number + " at index:" + i)
})
/* results
number:2 at index:0
number:4 at index:1
number:6 at index:2
number:8 at index:3
number:10 at index:4
*/

// filter function to iterate over each item and decide
// whether to include it in the newly returned funciton 
var newNumbers = numbers.filter(function(number){
    return number !== 5
})

newNumbers.forEach(function (number, i){
    console.log("number:" + number + " at index:" + i)
})
/* results
number:1 at index:0
number:2 at index:1
number:3 at index:2
number:4 at index:3
*/

// reduce function will reduce the whole array to a single value
var sum = numbers.reduce(function(memo, number){
    return memo + number   
},0/* initial value */)

console.log(sum)
/* results
15
*/