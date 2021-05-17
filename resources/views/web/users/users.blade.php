@extends('layout.verified')
@section('content')
<div class="flex justify-center">
    <div>
        <div class="flex justify-center mt-6">
            <input type="text" id="searchName" class="p-4 w-4/4 bg-gray-200 rounded-lg border-2 border-gray-300 text-center" placeholder="Search Name">
        </div>
        <div class="flex justify-center mt-10">
            <p id="noResult" class="hidden">No Results Found</p>
            <table id="table" class="table-auto border-2 border-gray-400 p-2">
                <thead>
                    <tr class="border-2 border-gray-400 p-2">
                    <th class="border-2 border-gray-400 p-2">Name</th>
                    <th class="border-2 border-gray-400 p-2">Email</th>
                    <th class="border-2 border-gray-400 p-2">Created At</th>
                    <th class="border-2 border-gray-400 p-2">Options</th>
                    </tr>
                </thead>
                <tbody id="usersTable">
                </tbody>
                </table>
        </div>
        {{-- this will use to reload the current page when updating data --}}
        <input type="hidden" id="currentPageLink">
        <div class="flex justify-center mt-5">
            <div class="pagination-links" id="paginationLinks">
            </div>
        </div>
    </div>
</div>
@endsection

@section('jsLogic')
<script src="{{ asset('js/users.js') }}"></script>
@endsection

