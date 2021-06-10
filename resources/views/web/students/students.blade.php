@extends('layout.verified')
@section('content')
<div class="flex justify-center">
    <button onclick="showAddStudentModal()"
    class="ml-auto py-1 px-3 text-center text-xs text-white rounded-full bg-blue-400">
        +&nbsp;Student
    <button>
</div>
@include('include.modals.students.add_students')
@endsection

@section('jsLogic')
<script src="{{ asset('js/students.js') }}"></script>
@endsection