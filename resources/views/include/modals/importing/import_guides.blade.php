<div id="import_guides" class="fixed flex h-screen hidden inset-0 items-center justify-center z-10">
    {{-- card --}}
    <div class="absolute bg-white m-auto p-6 r-0 rounded-lg w-2/6">
        <div>
            <button onclick="closeImportGuideModal()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
        </div>
        <div>
            <p class="account-type text-center text-xl mb-2">Excel File Table Specification</p>
            <p class="text-center text-sm mb-4 text-gray-500">The table must follow the table structure and table name on the image below.</p>
            <br>
            <img src="{{url('/img/png/excel_table_format.png')}}">
        </div>
    </div>
</div>