<div id="add-student-modal" class="fixed flex h-screen hidden inset-0 items-center justify-center z-10">
    {{-- card start--}}
    <div  class="absolute bg-white m-auto p-6 r-0 rounded-lg w-1/4">
        <div>
            <button onclick="closeStudentModal()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
        </div>
        <p class="text-center">Add Student</p>
        <div class="flex justify-center mt-4">
            <div class="input-container">
                <form onsubmit="return addStudent()">
                    <input type="text" name="students-name" id="students-name" 
                        class="_clear-onsucess border-2 border-gray-300 user-inputs mb-2 p-2 w-full bg-gray-200 rounded-lg text-center text-sm" 
                        placeholder="students name" required>

                    <input type="text" name="phone-number" id="phone-number"
                        class="_clear-onsucess border-2 addUserForm border-gray-300 user-inputs mb-2 p-2 w-full bg-gray-200 rounded-lg text-center text-sm"
                        maxlength="11"
                        placeholder="phone number" required>

                    <button class="w-full bg-blue-400 rounded-lg text-white text-center text-sm p-2 pr-2 pl-2">Add</button>
                </form>
            </div>
        </div>
    </div>
    {{-- card end --}}
</div>