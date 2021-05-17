@extends('layout.main')

@section('content')
    @include('include.header')
    @include('include.sidenav')
    {{-- side nav menu icon --}}
    <span class="sidenav-icon" onclick="openNav()">&#9776;</span>
    @yield('main-content')
@endsection