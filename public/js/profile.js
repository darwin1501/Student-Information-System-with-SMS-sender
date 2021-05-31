
const profile = document.getElementById('profile');

const showProfile = (()=>{
    profile.classList.remove('hidden');
    profile.classList.add('bg-gray-500', 'bg-opacity-70');
})

const closeProfile = (()=>{
    profile.classList.add('hidden');
    profile.classList.remove('bg-gray-500', 'bg-opacity-70');
})