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
    @yield('content')
</body>
<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ asset('js/login.js') }}"></script>
</html>