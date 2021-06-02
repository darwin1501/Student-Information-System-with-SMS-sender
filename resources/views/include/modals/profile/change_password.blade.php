<div id="change-password" class="fixed flex h-screen hidden inset-0 items-center justify-center z-10">
    {{-- card --}}
        <div class="absolute bg-white m-auto p-6 r-0 rounded-lg w-1/4">
            <div>
                <button onclick="closeChangePassword()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
            </div>
            <div>
                <p class="account-type text-center mb-4">Change Password</p>
                <form onsubmit="return updatePassword()">
                    <p class="mb-2 text-xs">Old Password</p>
                    <input type="password" name="old_password" class="bg-gray-300 mb-2 p-2 rounded-lg text-center w-full" 
                        id="oldpassword-profile"  required>
                    <p class="mb-2 mt-2 text-xs">New Password</p>
                    <input type="password" name="password" class="bg-gray-300 p-2 rounded-lg text-center w-full" 
                        id="newpassword-profile" minlength="8" required>
                    <p class="mb-2 mt-2 text-xs">Confirm New Password</p>
                    <input type="password" name="confirm_password" class="bg-gray-300 p-2 rounded-lg text-center w-full" 
                        id="confirm-newpassword-profile" minlength="8" required>
                    <div class="flex justify-center mb-2 mt-4">
                        <button class="bg-blue-400 p-1 rounded-lg text-center text-white w-3/4">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>