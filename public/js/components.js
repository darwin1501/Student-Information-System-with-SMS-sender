

// side nav interaction
const openNav = (()=>{
    document.getElementById("mySidenav").style.width = "200px";
})

const closeNav = (()=>{
    document.getElementById("mySidenav").style.width = "0";
})

// setting UI behavior
const settingModal = document.getElementById('setting')

const openSetting = () => {
    const smsApiKey = document.getElementById('sms-api-key');
    const deviceId = document.getElementById('device-id');
    // get sms config
    axios.get('/setting')
    .then((response) => {
        settingModal.classList.remove('hidden');
        settingModal.classList.add('bg-gray-500', 'bg-opacity-70');
        // display on element
        smsApiKey.value = response.data.api_key;
        deviceId.value = response.data.device_id;
    })
    .catch((error) => {
        console.log(error);
    })
}

const closeSetting = () => {
    settingModal.classList.add('hidden');
    settingModal.classList.remove('bg-gray-500', 'bg-opacity-70');
}