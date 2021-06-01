

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
    })
    .catch((error)=>{
        console.log(error)
    })
})

const closeEditProfile = (()=>{
    profileOnEdit.classList.add('hidden');
    profileOnEdit.classList.remove('bg-gray-500', 'bg-opacity-70');
})

const updateProfile = (()=>{
    // user id
    const userId = document.getElementById('user-id').value
    const username = document.getElementById('username-edit-profile').value;
    const email = document.getElementById('email-edit-profile').value;
    const usernameOnHeader = document.getElementById('username-on-header');

    axios.post(`/updateprofile/${userId}`, {username: username, email: email})
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

