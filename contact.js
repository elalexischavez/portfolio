
// -> get form values
const getFormValues = () => ({
    fields: document.querySelectorAll('.form-input'),
})


// -> resive array
const validateFields = ({fields = []}) => {
    let isAllowed = true;
    fields.forEach((field) =>  field.value.trim().length === 0? isAllowed = false : isAllowed);
    return isAllowed;
}

//-> post information to server
const loadInfo = async (data) => {
    console.log(data)
    const response = await fetch('https://azure-function-test1.azurewebsites.net/api/azure-function', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const {message} = await response.json();
    return message;
}

// -> main function
(()=>{
    document.querySelector('.form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const alert = document.querySelector('.alert');
        const formValues = getFormValues();
        if( validateFields(formValues) ) {
            alert.style.display = 'flex';
            alert.classList.add("alert-success")
            const message = await loadInfo(formValues);
            alert.innerHTML = message;
        }else {
            alert.innerHTML = 'Please fill all fields';
            alert.style.display = 'flex';
            alert.classList.add("alert-failed")
        }
    })
})();



