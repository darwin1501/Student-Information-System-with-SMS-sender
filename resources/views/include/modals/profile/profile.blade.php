<div id="profile" class="fixed flex h-screen hidden inset-0 items-center justify-center z-10">
{{-- card --}}
    <div class="absolute bg-white m-auto p-6 r-0 rounded-lg w-1/4">
        <div>
            <button onclick="closeProfile()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
        </div>
        <div>
            <p class="account-type text-center mb-4">Profile</p>
            <p class="mt-2 text-xs opacity-50" id="account-type-profile"></p>
            <p class="mt-2" id="username-profile">Username:</p>
            <p id="email-profile">Email:</p>
            <div class="flex justify-center mb-2 mt-4">
                <button class="bg-blue-400 p-1 rounded-lg text-center text-white w-3/4"
                onclick="editProfile()">Edit Profile</button>
            </div>
            <div class="flex justify-center">
                <button class="bg-blue-400 p-1 rounded-lg text-center text-white w-3/4"
                onclick="changePassword()">Change Password</button>
            </div>
        </div>
    </div>
</div>