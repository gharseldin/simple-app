
const ENDPOINT = 'http://localhost:3000/'

export function getProfiles(){
    return fetch('http://localhost:3000/')
        .then(res => {
            console.log(`This is the result response: `+ res)
            return res.json()
        })
        .catch(err => {
            console.log("an error happened with error message: " + err)
        })
}