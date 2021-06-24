<div id="setting" class="fixed flex h-screen hidden inset-0 items-center justify-center z-10">
    <div class="absolute bg-white m-auto p-6 r-0 rounded-lg w-2/4">
        <div>
            <button onclick="closeSetting()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
        </div>
        <p class="text-center">Setting</p><br>
        <div class="flex justify-center mt-2 text-xs">
            <div>
                <p>SMS Gateway Api Configuration</p><br><br>
                <p class="mb-2 text-xs">API Key</p>
                    <input type="text" name="smstoken" class="bg-gray-300 mb-2 p-2 rounded-lg text-center w-full" 
                        id="sms-api-key"><br>
                <p class="mb-2 text-xs">Device ID</p>
                    <input type="text" name="smstoken" class="bg-gray-300 mb-2 p-2 rounded-lg text-center w-1/4" 
                        id="device-id"><br><br>
                <p class="mb-2 text-xs">Get API key and Device ID after you register here <a class="cursor-pointer">https://www.smsgateway.me</a></p>
            </div>
        </div>
    </div>
</div>