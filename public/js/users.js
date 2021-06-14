

// reset current page link on reload
document.getElementById('currentPageLink').value = '';

const removeError =(()=>{
    const target = event.target || event.srcElement;

    document.getElementById(`${target.id}ErrMsg`).innerHTML = "";
});
// remove error message on add user students
// when the user starts on typing
document.getElementById('username').addEventListener('input', removeError);
document.getElementById('email').addEventListener('input', removeError);

// generate pagination buttons
const paginationButtons = ((pagination)=>{
    const paginationLinks = document.getElementById('paginationLinks');
    // remove old pagination links
    paginationLinks.innerHTML = "";
   for (const link of pagination.links) {
       let buttonTemplate;

       if(link.active === true){

         buttonTemplate = `<button class='p-2 text-xs border-2 border-gray-300 active' onclick='navigatePagination("${link.url}")'>
                                ${link.label}
                            </button>
                            `;
       }else{
        buttonTemplate = `<button class='p-2 text-xs border-2 border-gray-300' onclick='navigatePagination("${link.url}")'>
                                ${link.label}
                          </button>
                          `;
       }
         paginationLinks.insertAdjacentHTML('beforeend', buttonTemplate);
    }
});

const generateTable = ((users)=>{
    const usersTable = document.getElementById('usersTable');
    // remove old data on tables
    usersTable.innerHTML = "";
        for (const user of users) {
            let accountStatus;
            let blockControlBtn;

            //check status value
            // and load component according to status
            if(user.status === 1){
                accountStatus = `<td class="text-white"><p class="bg-green-500 p-1 rounded-lg text-xs">active</p></td>`;
                blockControlBtn = `
                        <button class="hover:bg-gray-300 w-full p2 btn-edit" onclick="blockUser()" value=${user.id}>
                            Block
                         </button>`
            }else if(user.status === 0){
                accountStatus = `<td class="text-white"><p class="bg-red-500 p-1 rounded-lg text-xs">blocked</p></td>`;
                blockControlBtn = `
                        <button class="hover:bg-gray-300 w-full p2 btn-edit" onclick="unblockUser()" value=${user.id}>
                            Unblock
                         </button>`
            }

            // format date
            const dateString = user.created_at;
            // new date format
            const D = new Date(dateString);
            const tableRow = `
                <tr class="table-content" id=${user.id}>
                    <td class="p-2"><button class="link" onclick="profileModal()" value=${user.id}>${user.username}</button></td>
                    <td class="p-2">${user.email}</td>
                    <td class="p-2">${("0"+D.getDate()).slice(-2)}/${("0"+(D.getMonth()+1)).slice(-2)}/${D.getFullYear()}</td>
                    ${accountStatus}
                    <td class=" p-2">
                        <div class="option-dropdown">
                        <div class="option-btn" style="background-image: url('/svg/setting.svg')"></div>
                        <div class="option-dropdown-content">
                            ${blockControlBtn}
                            <form onsubmit="return deleteUser(${user.id})">
                                <button class="hover:bg-gray-300 w-full p2 btn-delete">
                                    Delete
                                </button>
                            </form>
                        </div>
                        </div>
                    </td>
                </tr>`;
            //loop and insert html element on table body
            usersTable.insertAdjacentHTML('beforeend', tableRow);
        }
});

const navigatePagination = ((url)=>{
    const currentPageLink = document.getElementById('currentPageLink');
    const paginationLinks = document.getElementById('paginationLinks');

    // check if url on button was not empty
    //then load thte url
    if(!((url === 'null') || (url === ''))){
        // not empty
         // set new current page link
         currentPageLink.value = url; 
        //  pass url
        getUsers(url);
    }else{
        // if empty
        getUsers();
    }
})
// set default parameters on getUsers
const getUsers = async (url = '/userlist')=>{
    
    // hide empty message when this function load
    document.getElementById('empty-users').classList.add('hidden');
    // Make a get request
    await axios.get(url)
        .then(function (response) {
        // show empty message when no contributors added yet
        if(response.data.data.length === 0){
            document.getElementById('empty-users').classList.remove('hidden');
        }
        // remove the no result message on searching
        document.getElementById('no-result').classList.add('hidden');
        // load the result on table
        generateTable(response.data.data);
        // create pagination
        paginationButtons(response.data);
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .then(function () {
        // always executed
        });
}
getUsers();

// modals
const addUserModal = document.getElementById('addUserModal');

const showModal = ()=>{
    addUserModal.classList.remove('hidden');
    addUserModal.classList.add('bg-gray-500', 'bg-opacity-70');
};

const closeModal = ()=>{
    addUserModal.classList.add('hidden');
    addUserModal.classList.remove('bg-gray-500', 'bg-opacity-70');
};

const checkError = ((response)=>{
    if (response.status === 422) {
        // return response.json();
        console.log(response.json())
      } else {
        throw Error(response.statusText);
      }
})

const addUser = (()=>{
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password');

    // console.log(`${username}, ${email}, ${password}, ${confirmPassword}`);

    // validate password
    if(password !== confirmPassword.value){
        confirmPassword.setCustomValidity("Passwords Don't Match");
    }else{
        // password matched

        // remove custom message
        confirmPassword.setCustomValidity("");

        // send request to sever;
        axios.post('/createuser', {username: username, email: email, password: password})
        .then(function (response) {
            //successful request

            // clear inputs
            const inputsToBeCleared = document.getElementsByClassName('_clear-onsucess');
            for (const input of inputsToBeCleared) {
                input.value = "";
            }
            // show successful message
            alert('user successfully added');
            // reload the table
            getUsers();
        })
        .catch(function (error) {
        // handle error
        // get error message from xhr error
        const validationError = error.response.data.errors;
        //loop errors
        // extract keys with array on objects
            for (let e in validationError) {
                if (validationError.hasOwnProperty(e)) {
                    //check if errors was email or username
                    if(e === 'username'){
                        document.getElementById('usernameErrMsg')
                            .innerHTML = validationError.username[0];
                    }else if(e === 'email'){
                        document.getElementById('emailErrMsg')
                            .innerHTML = validationError.email[0];
                    }
                }
            }
        })
        .then(function () {
        // always executed
        });
    }
    // prevent the page from submitting
    return false;
});

const searchUser = ()=>{
    // access search inputs property
    const target = event.target || event.srcElement;
    const username = target.value;
    // check if the search value was not empty string
    if(!(username === "")){
        // make http request
         axios.get(`/searchUser/${username}`)
        .then((response)=>{
            // if no results found
            if(response.data.data.length === 0){
                document.getElementById('no-result').classList.remove('hidden');
            }
            // if there's result
            // reload table
            generateTable(response.data.data);
            // reload pagination
            paginationButtons(response.data);
        })
        .catch((error)=>{
            console.log(error)
        })
        
    }else{
        // dont send request if value was "" instead load all users
        getUsers();
    }

}

//add event listener for search input
document.getElementById('search-username').addEventListener('input', searchUser); 

const blockUser = (()=>{
    const target = event.target || event.srcElement;
    // load user details
    // get url with user id for route model binding
     axios.get(`/block/${target.value}`)
        .then(function (response) {
            const currentPageLink = document.getElementById('currentPageLink').value;
            // reload table
            navigatePagination(currentPageLink);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    return false;
});

const unblockUser = (()=>{
    // gain access to element properties
    const target = event.target || event.srcElement;

    // get url with user id for route model binding
     axios.get(`/unblock/${target.value}`)
        .then(function (response) {
       
        const currentPageLink = document.getElementById('currentPageLink').value;
         // reload table
        navigatePagination(currentPageLink);
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })

    return false;
});

const deleteUser = ((user)=>{
    const deleteConfirmation = confirm('Do you want to delete this?')
    // gain access to element properties
    if(deleteConfirmation === true){
        // console.log(user)
        // get url with user id for route model binding
        axios.delete(`/deleteuser/${user}`)
        .then(function (response) {
        const currentPageLink = document.getElementById('currentPageLink').value;
        // // reload table
        navigatePagination(currentPageLink);
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
    }
    
    return false;
});