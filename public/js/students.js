// auto creation
// const { default: axios } = require("axios");



let studentsToNotify = [];

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
/**
 * 
 * @param {node} element html element 
 */
const enableSelectButton = (element) => {
    // enable select button
    element.classList.add('bg-blue-400');
    element.classList.remove('bg-gray-400');
    element.classList.remove('cursor-not-allowed');
    element.classList.remove('pointer-events-none')
}

/**
 * 
 * @param {node} element html element
 */
 const disableSelectButton = (element) => {
    // disable select button 
    element.classList.remove('bg-blue-400');
    element.classList.add('bg-gray-400');
    element.classList.add('cursor-not-allowed');
    element.classList.add('pointer-events-none');  
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
        let studentName = student.students_name;
        let phoneNumber = student.phone_number;
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
                <tr class="table-content">
                    <td class="p-2">${student.students_name}</td>
                    <td class="p-2">${student.phone_number}</td>
                    <td class="p-2">${student.created_by}</td>
                    <td class="p-2">${("0" + D.getDate()).slice(-2)}/${("0" + (D.getMonth() + 1)).slice(-2)}/${D.getFullYear()}</td>
                    <td class=" p-2">
                        <div class="option-dropdown">
                            ${optionsContent}
                        </div>
                    </td>
                    <td class="p-2">
                        <button onclick="selectStudent(${student.id},'${studentName}', '${phoneNumber}')"
                        class="ml-auto py-1 px-3 text-center text-xs text-white rounded-full bg-blue-400"
                        id="btn-${student.id}">
                            Select
                        </button>
                    </td>
                </tr>`;
        //loop and insert html element on table body
        content.insertAdjacentHTML('beforeend', tableRow);

        // check if the student has been seleted,
        // loop on json and check
        // if student has been selected then disable select button
        for (let [i, selectedStudent] of studentsToNotify.entries()) {
            // if student was selected disable button
            if (selectedStudent.id === student.id) {
                let selectBtnToBeDisable = document.getElementById(`btn-${student.id}`);
                
                disableSelectButton(selectBtnToBeDisable);  
            }
         }
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

// notofication logic
/**
 * 
 * @param {string} studentsName 
 * @param {number} phoneNumber 
 * @param {number} id
 */
const selectStudent = (id,studentsName, phoneNumber ) => {
    const target = event.target || event.srcElement;
    const notifyBtn = document.getElementById('notify-btn');
    const boxOfStudent = document.getElementById('selected-student-box');
    let studentsToBeAdded
    // add student info in JSON
    studentsToNotify.push({id:id, studentsName:studentsName, phoneNumber:phoneNumber, message:""})
    // inside selected student
    studentsToBeAdded = `<tr class="table-content flex" id='${id}'>
                            <td class="p-2">${studentsName}</td>
                            <td class="p-2 ml-auto">
                            <button onclick="removeOnSelected(${id})"
                            class=" py-1 px-3 text-center text-xs text-white rounded bg-red-400">
                                x
                            </button>
                            </td>
                        </tr?`;
    // add student on selected list
    boxOfStudent.insertAdjacentHTML('beforeend', studentsToBeAdded)  
    // disable select button after the student has been selected
    disableSelectButton(target) 
    // enable notify button
    notifyBtn.classList.remove('bg-gray-400');
    notifyBtn.classList.remove('cursor-not-allowed');
    notifyBtn.classList.remove('pointer-events-none');
    notifyBtn.classList.add('bg-blue-400');
}

const removeOnSelected = (id) => {
    const selectedStudent = document.getElementById('selected-student-box');
    const notifyBtn = document.getElementById('notify-btn');
    // loop on json
    // remove student in json
    for (let [i, student] of studentsToNotify.entries()) {
        if (student.id === id) {
            studentsToNotify.splice(i, 1); 
        }
     }
    //  remove student on selected
    let studentsToRemove = document.getElementById(`${id}`);
    selectedStudent.removeChild(studentsToRemove);
    //enable the disabled select button
    let btnToBeEnable = document.getElementById(`btn-${id}`);
    //check if value wasn't null
    if(btnToBeEnable !== null){
        // not empty
        // enable button
        enableSelectButton(btnToBeEnable);
    }
    // disable notify button if none was selected
   if(selectedStudent.childElementCount === 0){
       // disable notify button
    notifyBtn.classList.remove('bg-blue-400');
    notifyBtn.classList.add('pointer-events-none');
    notifyBtn.classList.add('cursor-not-allowed');
    notifyBtn.classList.add('bg-gray-400');
   }
}

const notifyStudentModal = document.getElementById('notify-student');

const prepareToNotify = () => {
    // load modal for notifying student
    notifyStudentModal.classList.remove('hidden');
    notifyStudentModal.classList.add('bg-gray-500', 'bg-opacity-70');
    // console.log(studentsToNotify);
    const notifyStudentBox = document.getElementById('notify-student-box');
    let selectedStudent;
    for (const students of studentsToNotify) {
        selectedStudent = `<tr class="table-content flex" id='student-msg-${students.id}'>
                                <td class="p-2">${students.studentsName}</td>
                                <td class="p-2 ml-auto">
                                <button onclick="prepareMessage(${students.id})"
                                id="btn-msg-${students.id}"
                                class=" py-1 px-3 text-center text-xs text-white rounded-full bg-gray-400"
                                id="notify-btn">
                                    Message
                                </button>
                                </td>
                            </tr?`;
        notifyStudentBox.insertAdjacentHTML('beforeend', selectedStudent)        
    }
}

const closeNotifyStudent = () => {
    notifyStudentModal.classList.add('hidden');
    notifyStudentModal.classList.remove('bg-gray-500', 'bg-opacity-70');
    // remove all students to notify
    document.getElementById('notify-student-box').innerHTML = '';
}

const setMessageModal = document.getElementById('set-message-modal');
/**
 * 
 * @param {number} id id of student
 */
const prepareMessage = (id) => {
    // find user id at json
    const student = studentsToNotify.find(student => student.id === id);
    const textAreaMessage = document.getElementById('textarea-message');
    const setStudentId = document.getElementById('student-to-message');
    // then set message property then save
    // found.name = 'carl'
    // student.message = 'hello world';
    textAreaMessage.value = student.message;
    setStudentId.value = id;
   
    setMessageModal.classList.remove('hidden');
    setMessageModal.classList.add('bg-gray-500', 'bg-opacity-70');
}

const closeSetMessageModal = () => {
    setMessageModal.classList.add('hidden');
    setMessageModal.classList.remove('bg-gray-500', 'bg-opacity-70');
}

const saveMessage = () => {
   const studentId = document.getElementById('student-to-message').value;
   const textAreaMessage = document.getElementById('textarea-message').value;
   const sendButton = document.getElementById('send-btn');
   // find user id at json
   const student = studentsToNotify.find(student => student.id == studentId);
   student.message = textAreaMessage;
    // loop on json and check if all messages are empty
    const findEmptyMessage = studentsToNotify.find(student => student.message === "");

    // if no empty message left , then enable send btn
    // else disable send btn
    if(findEmptyMessage === undefined){
        // enable send btn
        sendButton.classList.remove('bg-gray-400');
        sendButton.classList.remove('cursor-not-allowed');
        sendButton.classList.remove('pointer-events-none');
        sendButton.classList.add('bg-blue-400');
    }else{
        // disable send btn
        sendButton.classList.add('bg-gray-400');
        sendButton.classList.add('cursor-not-allowed');
        sendButton.classList.add('pointer-events-none');
        sendButton.classList.remove('bg-blue-400');
    }

    alert('Message Save');
}

const checkTextAreaValue = () => {
    const target = event.targe || event.srcElement;
    const studentId = document.getElementById('student-to-message').value;
    const messageButton = document.getElementById(`btn-msg-${studentId}`);

    if(target.value === ""){
        // empty
        // add inactive button style
        messageButton.classList.add('bg-gray-400');
        messageButton.classList.remove('bg-blue-400');
    }else{
        // not empty
        // add active button style
        messageButton.classList.add('bg-blue-400');
        messageButton.classList.remove('bg-gray-400');
    }
}

const sendGroupMessages = () => {
    // loading animation start
    axios.post('/sendgroupsms', studentsToNotify)
    .then(() => {
    // loading animation stop
        alert('sucessfully sent')
    })
    .catch((error) => {
        // load modal of detailed posible error
        showSendFailedModal()
    })
}

const sendFailedModal = document.getElementById('send-failed')

const showSendFailedModal = () => {
    sendFailedModal.classList.remove('hidden');
    sendFailedModal.classList.add('bg-gray-500', 'bg-opacity-70');
}

const closeSendFailedModal = () => {
    sendFailedModal.classList.add('hidden');
    sendFailedModal.classList.remove('bg-gray-500', 'bg-opacity-70');
}


