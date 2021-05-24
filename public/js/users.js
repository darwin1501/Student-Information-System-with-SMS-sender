

const removeError =(()=>{
    const target = event.target || event.srcElement;

    document.getElementById(`${target.id}ErrMsg`).innerHTML = "";
}) 

// event listeners on username and email inputs
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

            //
            if(user.status === 1){
                accountStatus = `<td class="text-white"><p class="bg-green-500 p-1 rounded-lg text-xs">active</p></td>`;
            }else if(user.status === 0){
                accountStatus = `<td class="text-white"><p class="bg-red-500 p-1 rounded-lg text-xs">blocked</p></td>`;;
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
                            <button class="hover:bg-gray-300 w-full p2 btn-edit" value=${user.id}>
                                Block
                            </button>
                            <button class="hover:bg-gray-300 w-full p2 btn-edit" onclick="editUserModal()" value=${user.id}>
                                Edit
                            </button>
                            <form onsubmit='return deleteUser(${user.id})'>
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
    if(!(url === 'null')){
         // set new current page link
         currentPageLink.value = url; 
        //  pass url
        getUsers(url);
    }
})
// set default parameters on getUsers
const getUsers = async (url = '/userlist')=>{
    // Make a get request
    await axios.get(url)
        .then(function (response) {
        // handle success
        // console.log(response.data);
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
            // console.log(response.data);
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
                        // console.log(validationError.username[0]);
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
})