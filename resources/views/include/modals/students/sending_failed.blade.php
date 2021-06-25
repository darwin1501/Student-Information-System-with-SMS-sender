<div id="send-failed" class="fixed flex h-screen hidden inset-0 items-center justify-center z-10">
        <div class="absolute bg-white m-auto p-6 r-0 rounded-lg w-2/4">
            <div>
                <button onclick="closeSendFailedModal()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
            </div>
            <p class="text-center">Your Messege(s) Can't Be sent</p>
            <div class="flex justify-center mt-2 text-xs">
                <div>
                    <p>Here are possible solution to solve the problem:</p><br><br>
                    <ul>
                        <li>1. Check your internet connection.</li><br>
                        <li>2. Your phone must have enough load to send SMS</li><br>
                        <li>2. You must connect your phone to the internet with SMS Gateway App installed on it.</li><br>
                        <li>3 .Check your SMS API configuration if was configured correctly at the setting.</li><br>
                    </ul>
                </div>
            </div>
        </div>
</div>