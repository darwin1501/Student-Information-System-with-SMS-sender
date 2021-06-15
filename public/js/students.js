// auto creation
// const { default: axios } = require("axios");

document.getElementById('phone-number').addEventListener('input', () => {
    const target = event.target || event.srcElement;
    // prevents the phone number length from exceeding at the given max length
    if (target.value.length > target.maxLength) {
        target.value = target.value.slice(0, target.maxLength)
    };
})

document.getElementById('phone-number-edit').addEventListener('input', () => {
    const target = event.target || event.srcElement;
    // prevents the phone number length from exceeding at the given max length
    if (target.value.length > target.maxLength) {
        target.value = target.value.slice(0, target.maxLength)
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
const paginationButtons = (pagination) => {
    const paginationLinks = document.getElementById('paginationLinks');
    // remove old pagination links
    paginationLinks.innerHTML = "";
    for (const link of pagination.links) {
        let buttonTemplate;

        if (link.active === true) {

            buttonTemplate = `<button class='p-2 text-xs border-2 border-gray-300 active' onclick='navigatePagination("${link.url}")'>
                                ${link.label}
                            </button>
                            `;
        } else {
            buttonTemplate = `<button class='p-2 text-xs border-2 border-gray-300' onclick='navigatePagination("${link.url}")'>
                                ${link.label}
                          </button>
                          `;
        }
        paginationLinks.insertAdjacentHTML('beforeend', buttonTemplate);
    }
}

const generateTable = (data) => {
    const userId = document.getElementById('user-id').value;
    const content = document.getElementById('tbl-main-content');
    let students = data.data
    let optionsContent;
    // remove old data on tables
    content.innerHTML = "";

    for (const student of students) {
        // check if the user owns the data of students
            if(userId == student.user_id || userId == 1){
                // if matched
                optionsContent = `<div class="option-btn" style="background-image: url('/svg/setting.svg')"></div>
                                    <div class="option-dropdown-content">
                                            <button class="hover:bg-gray-300 w-full p2 btn-delete"
                                                onclick="editStudent(${student.id})">
                                                Edit
                                            </button>
                                            <button class="hover:bg-gray-300 w-full p2 btn-delete"
                                                onclick="deleteStudent(${student.id})">
                                                Delete
                                            </button>
                                        </div>`;
            }else{
                // if not
                optionsContent = `<div class="option-btn cursor-not-allowed" style="background-image: url('/svg/setting_disabled.svg')"></div>`;
                                
        }
        // format date
        const dateString = student.created_at;
        // new date format
        const D = new Date(dateString);
        const tableRow = `
                <tr class="table-content" id=${student.id}>
                    <td class="p-2">${student.students_name}</td>
                    <td class="p-2">${student.phone_number}</td>
                    <td class="p-2">${student.created_by}</td>
                    <td class="p-2">${("0" + D.getDate()).slice(-2)}/${("0" + (D.getMonth() + 1)).slice(-2)}/${D.getFullYear()}</td>
                    <td class=" p-2">
                        <div class="option-dropdown">
                            ${optionsContent}
                        </div>
                    </td>
                </tr>`;
        //loop and insert html element on table body
        content.insertAdjacentHTML('beforeend', tableRow);
    }
}
/**
 * 
 * @param {string} url request url
 */
const navigatePagination = ((url) => {
    const currentPageLink = document.getElementById('currentPageLink');
    const paginationLinks = document.getElementById('paginationLinks');

    // check if url on button was not empty
    //then load the url
    if (!((url === 'null') || (url === ''))) {
        // not empty
        // set new current page link
        currentPageLink.value = url;
        //  pass url
        getStudents(url);
    } else {
        // if empty
        getStudents();
    }
})

const addStudent = () => {
    const studentName = document.getElementById('students-name').value;
    const phoneNumber = document.getElementById('phone-number').value;

    axios.post('/addstudent', { studentName: studentName, phoneNumber: phoneNumber })
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
        // show empty message when no contributors added yet
        if(response.data.data.length === 0){
            document.getElementById('empty-students').classList.remove('hidden');
        }else{
            document.getElementById('empty-students').classList.add('hidden')
        }
        // remove the no result message on searching
        document.getElementById('no-result').classList.add('hidden');
            // load table
            generateTable(response.data);
            paginationButtons(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
}
getStudents();

const editStudentModal = document.getElementById('edit-student');

const editStudent = (id) => {
    axios.get(`/editstudent/${id}`)
    .then((response) => {
        const studentName = document.getElementById('students-name-edit')
        const phoneNumber = document.getElementById('phone-number-edit');
        const studentsId = document.getElementById('students-id');
        // load student info on inputs
        studentName.value = response.data.students_name;
        phoneNumber.value = response.data.phone_number;
        // hidden inputs
        studentsId.value = response.data.id;

        // load modal
        editStudentModal.classList.remove('hidden');
        editStudentModal.classList.add('bg-gray-500', 'bg-opacity-70');
    })
    .catch((error) => {
        console.log(error)
    })
}

const closeEditStudent = () => {
    editStudentModal.classList.add('hidden');
    editStudentModal.classList.remove('bg-gray-500', 'bg-opacity-70');
}

const updateStudent = () => {
    const studentsId = document.getElementById('students-id').value;
    const currentPageLink =document.getElementById('currentPageLink').value;
    const studentsName = document.getElementById('students-name-edit');
    const phoneNumber = document.getElementById('phone-number-edit');

    axios.post(`/updatestudent/${studentsId}`, {studentsName:studentsName.value, phoneNumber:phoneNumber.value})
    .then(() => {
        // reload the current page table
        navigatePagination(currentPageLink);
        alert('changes successfully save')
    })
    .catch((error) => {
        console.log(error)
    })

    return false;
}

const deleteStudent = (id) => {
    const confirmDelete = confirm('Do you want to delete this?');
    const currentPageLink =document.getElementById('currentPageLink').value;
    if(confirmDelete === true){
        axios.delete(`/deletestudent/${id}`)
        .then(() => {
            // reload the current page table
            navigatePagination(currentPageLink);
            alert('successfully deleted')
        })
        .catch((error) => {
            console.log(error);
        })        
    }   
}

const searchStudent = () => {
    const target = event.target || event.srcElement;
    const studentsName = target.value;
    // check if the search value was not empty string
    if(!(studentsName === "")){
        // make http request
         axios.get(`/searchstudent/${studentsName}`)
        .then((response)=>{
            // if no results found
            if(response.data.data.length === 0){
                document.getElementById('no-result').classList.remove('hidden');
            }
            // console.log(response.data)
            // if there's result
            // reload table
            generateTable(response.data);
            // // reload pagination
            paginationButtons(response.data);
        })
        .catch((error)=>{
            console.log(error)
        })
        
    }else{
        // dont send request if value was "" instead load all users
        getStudents();
    }

}