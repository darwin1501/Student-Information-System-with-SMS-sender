

let selectedFile

const importingAnimation = document.getElementById('importing');
const btnImport = document.getElementById('uploadExcel');
const fileUploadInput = document.getElementById('fileUpload');

const showImportingAnimation = () => {
    importingAnimation .classList.remove('hidden');
    importingAnimation .classList.add('bg-gray-500', 'bg-opacity-70');
}

const closeImportingAnimation = () => {
    importingAnimation.classList.add('hidden');
    importingAnimation.classList.remove('bg-gray-500', 'bg-opacity-70');
}

const enableImportBtn = (()=>{
    btnImport.classList.remove('cursor-not-allowed','pointer-events-none', 'bg-gray-400');
    btnImport.classList.add('bg-blue-400');
})

const disableImportBtn = (()=>{
    btnImport.classList.add('cursor-not-allowed','pointer-events-none', 'bg-gray-400');
    btnImport.classList.remove('bg-blue-400');
})

// disable import button by default
disableImportBtn()

fileUploadInput.addEventListener('change',(event)=> {
     selectedFile = event.target.files[0];
    const fileFormat = selectedFile.name.split('.')[1];
    console.log(fileFormat)
    if(fileFormat === 'xls' || fileFormat === 'xlsx'){
        // valid file
        // enable import button
        enableImportBtn();
    }else{
        // invalid file
        // disable import button
        disableImportBtn();
        // reset input file
        fileUploadInput.value = null;
        alert("Can't load file, because of Invalid File Format. Valid file formats are .xls, .xlsx")
        // 
    }
})

btnImport.addEventListener('click',()=> {
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
                let studentsCount = Object.keys(students).length;
                        
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
                        // reload the table
                        getStudents();
                        closeImportingAnimation();
                        // clear input file
                        fileUploadInput.value = null;
                        // set the total number of imported data
                        document.getElementById('imported_info').innerHTML = `Import Success, you imported ${studentsCount}
                         ${studentsCount > 1 ? ' Students':' Student'}`;
                        showImportSuccessModal();
                        // clear input file
                        fileUploadInput.value = null;
                        disableImportBtn();
                    })
                    .catch((error) => {
                        console.log(error);
                        closeImportingAnimation();
                        // clear input file
                        fileUploadInput.value = null;
                        showImportFailedModal();
                        disableImportBtn();
                        return false;
                        // alert('import failed')
                        // load modal instead of alert
                    })
                }               
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
