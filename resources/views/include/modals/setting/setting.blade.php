<div id="setting" class="fixed flex h-screen hidden inset-0 items-center justify-center z-10">
    <div class="absolute bg-white m-auto p-6 r-0 rounded-lg w-2/4">
        <div>
            <button onclick="closeSetting()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
        </div>
        <p class="text-center">Setting</p><br>
        <div class="flex justify-center mt-2 text-xs">
            <div>
                <p>SMS Gateway Api Configuration</p><br>
                <div class="border-b border-gray-300 w-full">
                </div><br><br>
                    <input type="hidden" id="setting-id">
                <p class="mb-2 text-xs">API Key</p>
                    <form onsubmit="return saveSetting()">
                        <input type="text" name="smstoken" class="bg-gray-200 mb-2 p-2 rounded-lg text-center w-full" 
                            id="sms-api-key" required placeholder="Api key"><br>
                    <p class="mb-2 text-xs">Device ID</p>
                        <input type="text" name="smstoken" class="bg-gray-200 mb-2 p-2 rounded-lg text-center w-1/4" 
                            id="device-id" required placeholder="Device ID"><br><br>
                    <p class="mb-2 text-xs">Get API key and Device ID after you register here <a class="cursor-pointer text-blue-400 text center">https://https://smsgateway.me/register</a></p>
                    <div class="flex justify-center mb-2 mt-6">
                        <button class="bg-blue-400 p-1 rounded-lg text-center text-white w-2/4">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>