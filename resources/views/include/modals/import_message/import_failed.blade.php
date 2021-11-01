<div id="import_msg_failed" class="fixed flex h-screen hidden inset-0 items-center justify-center z-10">
    {{-- card --}}
    <div class="absolute bg-white m-auto p-6 r-0 rounded-lg w-2/4">
        <div>
            <button onclick="clcoseImportFailedModal()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
        </div>
        <div class="mt-3">
            <p class="account-type text-center mb-4">Import Failed, because of invalid table Column format</p>
        </div>
    </div>
</div>