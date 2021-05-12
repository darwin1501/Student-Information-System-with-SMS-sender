
// authentication
const login = (()=>{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
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
        axios.post('/login', {email: email, password: password})
        .then(function (response) {
        // handle success
        console.log(response);
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
