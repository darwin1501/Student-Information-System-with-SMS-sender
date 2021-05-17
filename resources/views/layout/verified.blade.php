{{-- @section('content')
    @include('include.header')
    @include('include.sidenav') --}}
    {{-- side nav menu icon --}}
    {{-- <span class="sidenav-icon" onclick="openNav()">&#9776;</span>
    @yield('main-content') --}}
{{-- @endsection --}}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <title>Grade Sender</title>
</head>
<body class="bg-gray-200">
    @include('include.header')
    @include('include.sidenav')
    @yield('content')
</body>
<script src="{{ asset('js/app.js') }}"></script>
{{-- js for static components --}}
<script src="{{ asset('js/components.js') }}"></script>
{{-- dynamic js logic --}}
@yield('jsLogic')
</html>