
(() => {
    // document.addEventListener('DOMContentLoaded', function(){

    // })    
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const userName = document.querySelector('#userName').value;
        const userPassword = document.querySelector('#password').value;
        getdata({ userName, password: userPassword }).then(console.log)
    })
})()


// -> promise
async function getdata({ userName, password }) {
    return new Promise((resolve, reject) => {
        window.fetch('https://azure-function-test1.azurewebsites.net/api/get-all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                password
            })
        })
        .then((res)=> res.json())
        .then(resolve)
        .catch(reject)
    })
}