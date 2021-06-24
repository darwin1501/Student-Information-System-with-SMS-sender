<div id="notify-student" class="fixed flex h-screen hidden inset-0 items-center justify-center z-10">
    {{-- selected student card --}}

        <div class="absolute bg-white m-auto p-6 r-0 rounded-lg w-1/4">
            <div>
                <button onclick="closeNotifyStudent()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
            </div>
            <p class="text-center">Create Messages</p>
            <div class="flex justify-center">
                {{-- selected student --}}
                <div class="w-48 h-72 mt-3 p-2 bg-gray-100 rounded overflow-y-auto">
                    <table class="font-sans table-auto p-2 text-xs w-full">
                        <tbody id="notify-student-box">
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-2 flex justify-end">
                <button onclick="sendGroupMessages()"
                class=" py-1 px-3 text-center text-xs text-white rounded-full bg-gray-400 cursor-not-allowed pointer-events-none"
                id="send-btn">
                    Send
                </button>
            </div>
        </div>
</div>