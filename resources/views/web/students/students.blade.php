@extends('layout.verified')
@section('content')
<div class="flex justify-center z-0">
    {{-- table card --}}
    <div class="card w-3/4 bg-white shadow-lg p-6 rounded-lg">
        {{-- add user --}}
        <div class="flex justify-center">
            <input type="text" id="search-username" class="p-1 w-2/3 border-b-2 border-gray-400 text-center text-xs" 
            placeholder="Search Name" oninput="searchStudent()">
            <button onclick="showAddStudentModal()"
                class="ml-auto py-1 px-3 text-center text-xs text-white rounded-full bg-blue-400">
                +&nbsp;Student
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
</div>
@include('include.modals.students.add_students')
@include('include.modals.students.edit_students')
@endsection

@section('jsLogic')
<script src="{{ asset('js/students.js') }}"></script>
@endsection