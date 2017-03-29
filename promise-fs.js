var fs = require('fs')

//Traditionally this is how asynchronous activity would be handled
function promiseReadFile(file){
    fs.readFile(file, function(err, data){
        // This callback function will wait in queue 
        // until the rest of normal execuation context is finished
        if(err){
            console.log(3)
            //handle error
            console.log(`An error happened! ${err} `)
            return
        }
        console.log(3)
        console.log(data.toString())
        // nesting more asynchronous functions here would make code 
        // more and more hard to follow in terms of precedence and code 
        // would be hard to read or adjust ... Pyramid of doom
    })
}
console.log(1);
promiseReadFile('./promise-fs.js')
// We are sure that the code will execute the next statement
// before going back to the callback on the event loop
console.log(2)

/*****************************************************************/

// Now exploring the way we can do this with promises
console.log(1)
function anotherPromiseReadFile(file){
    console.log(3)
    return new Promise((resolve, reject) => {
        console.log(4)
        fs.readFile(file, (err, data) => {
            console.log(6)
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

console.log(2)
anotherPromiseReadFile('./script.js')
    .then(data => { 
        console.log(7)
        console.log(data.toString())
        return anotherPromiseReadFile('package.json')
    })
    //This is invoked on the second promise on the package.json file
    .then(data => {
        console.log(data.toString())
    })
    //We will only need one catch method for all promises chained.
    //any error will propagate to the last catch function
    .catch(err => {
        console.log(err)
    })
console.log(5)

// We can even be more consice with one liner functions and just use
// one liner arrow funcitons as below. Instead of package.json in the 
// following example you would ideally want to use data from The first
// promise invocation returned in the data for this pattern to make sense
/*
var p = anotherPromiseReadFile('./script.js')
    .then(data => anotherPromiseReadFile('./package.json))
    .then(data => console.log(data.toString()))
    .catch( e => console.log(e))
*/


/*****************************************************************/

// Ajax Requests in ES6 using Fetch 
// advantages include a smaller dependency since it does not include 
// a DOM manipulation library like JQuery since we don't need it with React

fetch('http://rest-of-the-url-here')
    .then( r => r.json())           //r is a response object
    .then( d => console.log(d))     //d is the data

    // we use the second then because the first one is workin on a 
    // stream we are waiting to finish so we can use the data

    //also check isomorphic-fetch