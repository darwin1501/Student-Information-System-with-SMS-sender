<div id="import_xls" class="fixed flex h-screen hidden inset-0 items-center justify-center z-10">
    {{-- card --}}
    <div class="absolute bg-white m-auto p-6 r-0 rounded-lg w-2/6">
        <div>
            <button onclick="closeImportXlsModal()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
        </div>
        <div>
            <p class="account-type text-center text-xl mb-2">Import Students From excel Files</p>
            <p class="text-center text-sm mb-4 text-gray-500"><strong>Note:</strong> please see the excel file <a class="text-blue-400 cursor-pointer font-bold" onclick="showImportGuideModal()">specification</a> before importing any excel file.</p>
            <br>
            <div class="flex justify-center">
                <input type="file" id="fileUpload" accept=".xls,.xlsx">
            </div>
            <br>
            <div class="flex justify-center mt-4">
                <button type="button" class="bg-blue-400 p-2 rounded text-white w-2/4" 
                id="uploadExcel">Import</button>
            </div>
            {{-- for testing result --}}
            <pre id="jsonData"></pre>
        </div>
    </div>
</div>