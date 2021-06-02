
//modals
const profile = document.getElementById('profile');
const profileOnEdit = document.getElementById('edit-profile');
const passwordOnChange = document.getElementById('change-password');

const showProfile = (()=>{
    // user id
    const userId = document.getElementById('user-id').value;
    const username = document.getElementById('username-profile');
    const email = document.getElementById('email-profile');
    const accountType = document.getElementById('account-type-profile');
    // make request
    axios.get(`/profile/${userId}`)
    .then((response)=>{
        const user = response.data;
        // load data on profile modal
        accountType.innerHTML = `Account Type: ${user.user_type}`;
        username.innerHTML = `Username: ${user.username}`;
        email.innerHTML = `Email: ${user.email}`;
        // show profile modal
        profile.classList.remove('hidden');
        profile.classList.add('bg-gray-500', 'bg-opacity-70');
    })
    .catch((error)=>{
        console.log(error)
    })
})

const closeProfile = (()=>{
    profile.classList.add('hidden');
    profile.classList.remove('bg-gray-500', 'bg-opacity-70');
})

const editProfile = (()=>{
    // user id
    const userId = document.getElementById('user-id').value;
    const username = document.getElementById('username-edit-profile');
    const email = document.getElementById('email-edit-profile');

    // make request
    axios.get(`/profile/${userId}`)
    .then((response)=>{
        const user = response.data;
        // load data on profile modal
        username.value = user.username;
        email.value = user.email;
        // show profile modal
        profileOnEdit.classList.remove('hidden');
        profileOnEdit.classList.add('bg-gray-500', 'bg-opacity-70');
        // store on local storage
        saveOldProfile(user.username, user.email);
    })
    .catch((error)=>{
        console.log(error)
    })
})

const closeEditProfile = (()=>{
    profileOnEdit.classList.add('hidden');
    profileOnEdit.classList.remove('bg-gray-500', 'bg-opacity-70');
})

const saveOldProfile = ((username, email)=>{
    // these local storage will use
    // to compare the old and new data in profile
    // to make a decission to make request if there's any.
    localStorage.setItem(`username`, `${username}`);
    localStorage.setItem(`email`, `${email}`);
})

const updateProfile = (()=>{
    // user id
    const userId = document.getElementById('user-id').value
    const username = document.getElementById('username-edit-profile').value;
    const email = document.getElementById('email-edit-profile').value;
    const usernameOnHeader = document.getElementById('username-on-header');

    const ToBeUpdated = {};

    //if username has changed add it to request
    if(localStorage.getItem('username') !== username){
        // add it to request to be updated
        ToBeUpdated['username'] = username;
    }
    //if email has changed add it to request
    if(localStorage.getItem('email') !== email){
        // add it to request to be updated
        ToBeUpdated['email'] = email;
    }
    // count the lenght of an object
    // Object.keys(ToBeUpdated).length

    // if there's a request then make request
    if(Object.keys(ToBeUpdated).length > 0){
        axios.post(`/updateprofile/${userId}`, ToBeUpdated)
        .then((response)=>{
            alert('successfully updated');
            // update the changes of profile
            showProfile();
            // update the username on header
            usernameOnHeader.innerHTML = username;
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    return false;
})

const changePassword = (()=>{
    passwordOnChange.classList.remove('hidden');
    passwordOnChange.classList.add('bg-gray-500', 'bg-opacity-70');
})

const closeChangePassword = (()=>{
    passwordOnChange.classList.add('hidden');
    passwordOnChange.classList.remove('bg-gray-500', 'bg-opacity-70');
})

const updatePassword = (()=>{
    const userId = document.getElementById('user-id').value
    const oldPassword = document.getElementById('oldpassword-profile');
    const newPassword = document.getElementById('newpassword-profile');
    const confirmNewPassword = document.getElementById('confirm-newpassword-profile');

    if(newPassword.value !== confirmNewPassword.value){
        confirmNewPassword.setCustomValidity("Password Don't Match");
    }else{
        // send request
        axios.post(`/updatepassword/${userId}`, {password:newPassword.value, oldpassword:oldPassword.value})
        .then((response)=>{
            // if(response.data === 'incorrectPassword'){
            //     alert('Your Old Password Was Incorrect');
            // }else if(response.data === 'passwordMatched'){
            //     // axios.get('/logout');
            //     alert('password matched');
            // }
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return false;
});

