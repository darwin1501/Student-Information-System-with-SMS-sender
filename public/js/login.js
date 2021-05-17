const email = document.getElementById('email');
const password = document.getElementById('password');

const removeError = () => {
    const target = event.target || event.srcElement;
    target.classList.remove('border-red-500');
};

// event listeners for inputs
email.addEventListener('input', removeError);
password.addEventListener('input', removeError);


// authentication
const login = (()=>{
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    // Make a get request
        // axios.get('/login')
        // .then(function (response) {
        // // handle success
        // console.log(response);
        // })
        // .catch(function (error) {
        // // handle error
        // console.log(error);
        // })
        // .then(function () {
        // // always executed
        // });

        // Make a post request ,
        //define the data on post
        axios.post('/login', {email: email.value, password: password.value})
        .then(function (response) {
        // handle success request
            if(response.data === 'admin'){
                window.location = "/users";
            }else if(response.data === 'user'){
                window.location = "/students";
            }else{
                // login failed
                email.classList.add('border-red-500');
                password.classList.add('border-red-500');
                // border-gray-400
                // console.log(response.data);
                alert('login failed');
            }
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .then(function () {
        // always executed
        });

    // prevents reload
    return false;
})