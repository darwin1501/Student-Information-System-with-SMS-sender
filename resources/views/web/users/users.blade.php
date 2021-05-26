@extends('layout.verified')
@section('content')
<div class="flex justify-center z-0">
    {{-- table card --}}
    <div class="card w-3/4 bg-white shadow-lg p-6 rounded-lg">
        <div class="flex justify-center">
            <input type="text" id="search-username" class="p-1 w-2/3 border-b-2 border-gray-400 text-center text-xs" placeholder="Search Name">
            <button onclick="showModal()"
            class="ml-auto py-1 px-3 text-center text-xs text-white rounded-full bg-blue-400">
                +&nbsp;User
            <button>
        </div>
        <p id="no-result" class="hidden text-center text-sm">No Results Found</p>
        <div class="flex justify-center mt-5">
            <table id="table" class=" font-sans table-auto p-2 text-xs w-full text-center">
                <thead>
                    <tr class="p-2 bg-gray-300">
                        <th class="p-2 text-gray-700">Name</th>
                        <th class="p-2 text-gray-700">Email</th>
                        <th class="p-2 text-gray-700">Created At</th>
                        <th class="p-2 text-gray-700">Status</th>
                        <th class="p-2 text-gray-700">Options</th>
                    </tr>
                </thead>
                <tbody id="usersTable">
                </tbody>
                </table>
        </div>
        {{-- 
            copy the current page url on pagination
            this will use to reload the current page when updating/changing data 
            --}}
        <input type="hidden" id="currentPageLink">
        <div class="flex justify-center mt-5 text-sm">
            <div class="pagination-links" id="paginationLinks">
            </div>
        </div>
    </div>
</div>
@include('include.modals.users.add_user')
@endsection

@section('jsLogic')
<script src="{{ asset('js/users.js') }}"></script>
@endsection

