<div id="set-message-modal" class="fixed flex h-screen hidden inset-0 items-center justify-center z-10">
    {{-- selected student card --}}
    <input type="hidden" id="student-to-message">
        <div class="absolute bg-white m-auto p-6 r-0 rounded-lg w-1/4">
            <div>
                <button onclick="closeSetMessageModal()" class="close-btn p-2 pl-2 pr-2 hover:bg-red-400 hover:text-white">&times;</button>
            </div>
            <p class="text-center">Message</p>
            <div class="flex justify-center">
                {{-- selected student --}}
                <textarea id="textarea-message" oninput="checkTextAreaValue()" class="m-3 ml-4 mr-4 bg-gray-200 p-2">
                </textarea>
            </div>
            <div class="mt-2 flex justify-end">
                <button onclick="saveMessage()"
                class=" py-1 px-3 text-center text-xs text-white rounded-full bg-blue-400"
                id="notify-btn">
                    Save
                </button>
            </div>
        </div>
</div>