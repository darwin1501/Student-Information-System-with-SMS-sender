

let selectedFile

const importingAnimation = document.getElementById('importing')

const showImportingAnimation = () => {
    importingAnimation .classList.remove('hidden');
    importingAnimation .classList.add('bg-gray-500', 'bg-opacity-70');
}

const closeImportingAnimation = () => {
    importingAnimation.classList.add('hidden');
    importingAnimation.classList.remove('bg-gray-500', 'bg-opacity-70');
}

document.getElementById('fileUpload').addEventListener('change',(event)=> {
     selectedFile = event.target.files[0];
    console.log(selectedFile)
})

document.getElementById('uploadExcel').addEventListener('click',()=> {
    // start importing animation
    showImportingAnimation();

    if(selectedFile){
        var fileReader = new FileReader();

        fileReader.onload = (event) => {
            var data = event.target.result;

            var workbook = XLSX.read(data, {
                type: "binary"
            });

            workbook.SheetNames.forEach(sheet => {
                let rowObjejct = XLSX.utils.sheet_to_row_object_array(
                    workbook.Sheets[sheet]
                );
                // converted to JSON
                let students = JSON.parse(JSON.stringify(rowObjejct));
                // for testing
                // document.getElementById("jsonData").innerHTML = jsonObject;

                // (future updates)
                //check the data if formatted correctly e.g StudentsName PhoneNumber
                // then insert data to students database


                // run for each
                for (const student of students) {
                    // console.log(student.StudentsName);
                    // call a route here to insert students
                    axios.post('/addstudent',{
                        studentName:student.StudentsName,
                        phoneNumber:student.PhoneNumber
                    })
                    .then((response) => {
                        // stop importing animation
                        closeImportingAnimation();
                        // reload the table
                        getStudents();

                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
                // 
            });
        };
        fileReader.readAsBinaryString(selectedFile);
    }
})

const importXlsModal = document.getElementById('import_xls')

const openImportXlsModal = () => {
    // show profile modal
    importXlsModal.classList.remove('hidden');
    importXlsModal.classList.add('bg-gray-500', 'bg-opacity-70');
} 

const closeImportXlsModal = () => {
    // hide profile modal
    importXlsModal.classList.add('hidden');
    importXlsModal.classList.remove('bg-gray-500', 'bg-opacity-70');
}
