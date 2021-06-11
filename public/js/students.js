// auto creation
// const { default: axios } = require("axios");


document.getElementById('phone-number').addEventListener('input', () => {
    const target = event.target || event.srcElement;
// prevents the phone number length from exceeding at the given max length
        if (target.value.length > target.maxLength){
            target.value = target.value.slice(0,target.maxLength)
        }; 
})

const addStudentModal = document.getElementById('add-student-modal')

const showAddStudentModal = () => {
    addStudentModal.classList.remove('hidden');
    addStudentModal.classList.add('bg-gray-500', 'bg-opacity-70');
}

const closeStudentModal = () => {
    addStudentModal.classList.add('hidden');
    addStudentModal.classList.remove('bg-gray-500', 'bg-opacity-70');
}

// generate pagination buttons
const paginationButtons = (pagination)=>{
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
}

const generateTable = (data)=>{
    let students = data.data
    const content = document.getElementById('tbl-main-content');
    // remove old data on tables
    content.innerHTML = "";
        for (const student of students) {
            // format date
            const dateString = student.created_at;
            // new date format
            const D = new Date(dateString);
            const tableRow = `
                <tr class="table-content" id=${student.id}>
                    <td class="p-2"><button class="link" onclick="profileModal()" value=${student.id}>${student.students_name}</button></td>
                    <td class="p-2">${student.phone_number}</td>
                    <td class="p-2">${student.created_by}</td>
                    <td class="p-2">${("0"+D.getDate()).slice(-2)}/${("0"+(D.getMonth()+1)).slice(-2)}/${D.getFullYear()}</td>
                    <td class=" p-2">
                        <div class="option-dropdown">
                        <div class="option-btn" style="background-image: url('/svg/setting.svg')"></div>
                        <div class="option-dropdown-content">
                            <form>
                                <button class="hover:bg-gray-300 w-full p2 btn-delete">
                                    Edit
                                </button>
                            </form>
                            <form>
                                <button class="hover:bg-gray-300 w-full p2 btn-delete">
                                    Delete
                                </button>
                            </form>
                        </div>
                        </div>
                    </td>
                </tr>`;
            //loop and insert html element on table body
            content.insertAdjacentHTML('beforeend', tableRow);
        }
}

const navigatePagination = ((url)=>{
    console.log(url)
    const currentPageLink = document.getElementById('currentPageLink');
    const paginationLinks = document.getElementById('paginationLinks');

    // check if url on button was not empty
    //then load the url
    if(!((url === 'null') || (url === ''))){
        // not empty
         // set new current page link
         currentPageLink.value = url; 
        //  pass url
        getStudents(url);
    }else{
        // if empty
        // getStudents();
    }
})

const addStudent = () => {
   const studentName = document.getElementById('students-name').value;
   const phoneNumber = document.getElementById('phone-number').value;

   axios.post('/addstudent', {studentName:studentName, phoneNumber:phoneNumber})
   .then((response) => {
        //successful request
            // clear inputs
            const inputsToBeCleared = document.getElementsByClassName('_clear-onsucess');
            for (const input of inputsToBeCleared) {
                input.value = "";
            }
            // show successful message
            alert('user successfully added');
            // reload the table
            getStudents();
   }).catch((error) => {
       console.log(error)
   })

    return false
}

const getStudents = (url = '/getstudents') => {
    axios.get(url)
    .then((response) => {
        // load table
        generateTable(response.data);
        // load pagination links
        paginationButtons(response.data);
    })
    .catch((error) => {
        console.log(error);
    })
}
getStudents();