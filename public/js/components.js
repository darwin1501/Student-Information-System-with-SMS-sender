

// side nav interaction
const openNav = (()=>{
    document.getElementById("mySidenav").style.width = "200px";
})

const closeNav = (()=>{
    document.getElementById("mySidenav").style.width = "0";
})

// setting behavior
const settingModal = document.getElementById('setting')

const openSetting = () => {
    const smsApiKey = document.getElementById('sms-api-key');
    const deviceId = document.getElementById('device-id');
    const settingId = document.getElementById('setting-id');
    // get sms config
    axios.get('/setting')
    .then((response) => {
        settingModal.classList.remove('hidden');
        settingModal.classList.add('bg-gray-500', 'bg-opacity-70');
        // display on element
        if(response.data == ""){
            smsApiKey.value = "";
            deviceId.value = "";
            settingId.value = "";
            // add warnings on inputs
            smsApiKey.classList.add('border-red-400' ,'border-2');
            deviceId.classList.add('border-red-400' ,'border-2');
        }else{
            smsApiKey.value = response.data.api_key;
            deviceId.value = response.data.device_id;
            settingId.value = response.data.id;
            // remove warnings on inputs
            smsApiKey.classList.remove('border-red-400' ,'border-2');
            deviceId.classList.remove('border-red-400' ,'border-2');
        }
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error);
    })
}

const closeSetting = () => {
    settingModal.classList.add('hidden');
    settingModal.classList.remove('bg-gray-500', 'bg-opacity-70');
}

const saveSetting = () => {
    const smsApiKey = document.getElementById('sms-api-key').value;
    const deviceId = document.getElementById('device-id').value;
    const settingId = document.getElementById('setting-id').value;
    const userId = document.getElementById('user-id').value;

    axios.post(`/savesetting`, {userId:userId, smsApiKey: smsApiKey, deviceId: deviceId})
    .then((response) => {
        alert('Setting Successfully Save');
        setSmsApiConfigStatus()
        // remove warnings on inputs
        document.getElementById('sms-api-key')
        .classList.remove('border-red-400' ,'border-2');
        document.getElementById('device-id')
        .classList.remove('border-red-400' ,'border-2');
    })
    .catch((error) => {
        console.log(error);
    });

    return false;
}   