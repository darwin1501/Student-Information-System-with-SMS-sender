// auto creation
// const { default: axios } = require("axios");

document.getElementById('phone-number').addEventListener('input', () => {
    const target = event.target || event.srcElement;
// prevents the phone number length from exceeding at the given max length
        if (target.value.length > target.max){
            target.value = target.value.slice(0,target.max)
        }; 
})

const addStudentModal = document.getElementById('add-student-modal')

const showAddStudentModal = () => {
    addStudentModal.classList.remove('hidden');
}

const closeStudentModal = () => {
    addStudentModal.classList.add('hidden');
}

const addStudent = () => {
   const studentName = document.getElementById('students-name').value;
   const phoneNumber = document.getElementById('phone-number').value;

   axios.post('/addstudent', {studentName:studentName, phoneNumber:phoneNumber})
   .then((response) => {
        console.log(response.data);
   }).catch((error) => {
       console.log(error)
   })

    return false
}