    <div id="addUserModal" class="fixed flex h-screen hidden inset-0 items-center justify-center z-10">
        {{-- card start--}}
        <div  class="absolute bg-white m-auto p-6 r-0 rounded-lg w-1/4">
            <div>
                <button onclick="closeModal()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
            </div>
            <p class="text-center">Add User</p>
            <div class="flex justify-center mt-4">
                <div class="input-container">
                    <form onsubmit="return addUser()" id="addUserForm">
                        <p id="usernameErrMsg" class=" text-xs text-center text-red-500"></p>
                        <input type="text" name="name" id="username" 
                            class="_clear-onsucess border-2 border-gray-300 user-inputs mb-2 p-2 w-full bg-gray-200 rounded-lg text-center text-sm" 
                            placeholder="username" required>

                        <p id="emailErrMsg" class=" text-xs text-center text-red-500"></p>
                        <input type="email" name="email" id="email" 
                            class="_clear-onsucess border-2 addUserForm border-gray-300 user-inputs mb-2 p-2 w-full bg-gray-200 rounded-lg text-center text-sm" 
                            placeholder="email" required>

                            <input type="password" name="password" id="password" 
                            class="_clear-onsucess border-2 border-gray-300 user-inputs mt-4 mb-2 p-2 w-full bg-gray-200 rounded-lg text-center text-sm" 
                            minlength="8" placeholder="password" required>

                            <input type="password" name="confirm_password" id="confirm-password" 
                            class="_clear-onsucess border-2 border-gray-300 user-inputs mb-4 p-2 w-full bg-gray-200 rounded-lg text-center text-sm" 
                            minlength="8" placeholder="confirm password" required>

                        <button class="w-full bg-blue-400 rounded-lg text-white text-center text-sm p-2 pr-2 pl-2">Add</button>
                    </form>
                </div>
            </div>
        </div>
        {{-- card end --}}
    </div>