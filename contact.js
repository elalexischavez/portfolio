
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
const loadInfo = async ({fields}) => {
    let values = []
    fields.forEach((field) => values = [...values, field.value]);
    const document = {
        name: values[0],
        email: values[1],
        message: values[2]
    }
    const response = await window.fetch('https://azure-function-test1.azurewebsites.net/api/azure-function', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(document)
    });
    const { message } = await response.json();
    return message;
}

// -> main function
(()=>{
    document.querySelector('.form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const alert = document.querySelector('.alert');
        const formValues = getFormValues();
        if( validateFields(formValues) ) {
            const message = await loadInfo(formValues);
            alert.style.display = 'flex';
            alert.classList.add("alert-success")
            alert.innerHTML = message;
        }else {
            alert.innerHTML = 'Please fill all fields';
            alert.style.display = 'flex';
            alert.classList.add("alert-failed")
        }
    })
})();



