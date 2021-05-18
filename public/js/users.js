

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
            // format date
            const dateString = user.created_at;
            // new date format
            const D = new Date(dateString);
            const tableRow = `
                <tr class="table-content" id=${user.id}>
                    <td class=" p-2"><button class="link" onclick="profileModal()" value=${user.id}>${user.username}</button></td>
                    <td class=" p-2">${user.email}</td>
                    <td class=" p-2">${("0"+D.getDate()).slice(-2)}/${("0"+(D.getMonth()+1)).slice(-2)}/${D.getFullYear()}</td>
                    <td class=" p-2">
                        <div class="option-dropdown">
                        <div class="option-btn" style="background-image: url('/svg/setting.svg')"></div>
                        <div class="option-dropdown-content">
                            <button class="hover:bg-gray-300 w-full p2 btn-edit" onclick="editUserModal()" value=${user.id}>
                                edit
                            </button>
                            <form onsubmit='return deleteUser(${user.id})'>
                                <button class="hover:bg-gray-300 w-full p2 btn-delete">
                                    delete
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