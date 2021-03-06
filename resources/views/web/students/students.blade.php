@extends('layout.verified')
@section('content')
{{-- SMS API configuration status --}}
<input type="hidden" id="sms-api-config-status">
{{-- warning message for empty SMS API config --}}
<div class="flex -m-8 mb-5 justify-center z-0 hidden" id="smsApi-warning">
    <div class="bg-white w-3/4 p-4 rounded">
        <p class="text-red-400 text-sm"><strong>Warning:&nbsp;</strong>You can't notify student for now, because the SMS API configuration was empty, configure it first at the <strong>Setting</strong> to send SMS, thank you</p>
    </div>
</div>
<div class="m5 flex justify-center z-0">
    {{-- table card --}}
    <div class="card w-3/5 h-full bg-white shadow-lg p-6 rounded-lg">
        {{-- add user --}}
        <div class="flex justify-center">
            <input type="text" id="search-username" class="p-1 w-2/3 border-b-2 border-gray-400 mr-3 text-center text-xs" 
            placeholder="Search Name" oninput="searchStudent()">
            {{-- import student --}}
            <button onclick="openImportXlsModal()"
                class="ml-auto mr-2 py-1 w-1/4 px-3 text-center text-xs text-white rounded-full bg-blue-400">
                +&nbsp;Import Student
            </button>
            {{-- add student --}}
            <button onclick="showAddStudentModal()"
                class="ml-auto py-1 px-3 text-center text-xs text-white rounded-full bg-blue-400">
                +&nbsp;Student
            </button>
        </div>
        <div class="flex justify-center mt-5">
            <table id="table" class=" font-sans table-auto p-2 text-xs w-full text-center">
                <thead>
                    <tr class="p-2 bg-gray-300">
                        <th class="p-2 text-gray-700">Name</th>
                        <th class="p-2 text-gray-700">Phone NUmber</th>
                        <th class="p-2 text-gray-700">Added by</th>
                        <th class="p-2 text-gray-700">Date Added</th>
                        <th class="p-2 text-gray-700">Options</th>
                        <th class="p-2 text-gray-700"></th>
                    </tr>
                </thead>
                <tbody id="tbl-main-content">
                </tbody>
            </table>
        </div>
        <p id="no-result" class="hidden mt-4 font-bold text-center text-sm">No Results Found</p>
        <p id="empty-students" class="hidden mt-4 font-bold text-center text-sm">No students added yet.</p>
        {{-- 
            copy the current page url on pagination
            this will use to reload the current page when updating/changing data 
            --}}
        <input type="hidden" id="currentPageLink">
        <div class="flex justify-start mt-5 text-sm">
            <div class="pagination-links" id="paginationLinks">
            </div>
        </div>
    </div>
    {{-- selected student card --}}
    <div>
        <div class="card w-full h-96 ml-2 mr-2 p-3 bg-white shadow-lg rounded-lg">
            <p class="text-left opacity-50 text-xs">Select Student from table</p>
            <div class="flex justify-center">
                {{-- selected student --}}
                <div class="w-48 h-72 mt-3 p-2 bg-gray-100 rounded overflow-y-auto">
                    <table class="font-sans table-auto p-2 text-xs w-full">
                        <tbody id="selected-student-box">
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-2 flex justify-end">
                <button onclick="prepareToNotify()"
                class=" py-1 px-3 text-center text-xs text-white rounded-full bg-gray-400 cursor-not-allowed pointer-events-none"
                id="notify-btn">
                    Notify
                </button>
            </div>
        </div>
    </div>
</div>
{{-- modals --}}
@include('include.modals.students.add_students')
@include('include.modals.students.edit_students')
@include('include.modals.students.notify_students')
@include('include.modals.students.create_message')
@include('include.modals.students.create_message')
@include('include.modals.students.sending_failed')
@include('include.modals.importing.import_xls')
@include('include.modals.import_message.import_failed')
@include('include.modals.import_message.import_success')
@include('include.modals.importing.import_guides')
{{-- animation --}}
@include('include.modals.importing.importing')
@endsection

@section('jsLogic')
<script src="{{ asset('js/students.js') }}"></script>
<script src="{{ asset('js/import_xls.js') }}"></script>
@endsection

@section('sheet-js')
<script src="{{ asset('js/xlsx.full.min.js') }}"></script>
@endsection