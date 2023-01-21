
(() => {
    // document.addEventListener('DOMContentLoaded', function(){

    // })    
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const userName = document.querySelector('#userName').value;
        const userPassword = document.querySelector('#password').value;
        insertSpinner();
        getdata({ userName, password: userPassword }).then((res) => {
            document.querySelector('.loader').remove();
            if(res.message)
            {
                return showAlert(res.message);
            }
            // codigo ->
            console.log(res)
            const mainContainer = document.createElement('div');
            document.querySelector('form').remove();
            document.querySelector('main').appendChild(mainContainer);
            mainContainer.classList.add('main-container');
        })
    })
})()


function insertSpinner() {
    const loader = document.createElement('div');
    const loadercontainer = document.createElement('div');
    loadercontainer.appendChild(loader);
    loadercontainer.classList.add('loaderContainer');
    loader.classList.add('loader');
    document.querySelector('form').appendChild(loadercontainer);
}

function showAlert(message) {
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.innerHTML = message;
    document.querySelector('form').appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

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