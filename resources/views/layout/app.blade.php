<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <title>Grade Sender</title>
    <style>
        input{
            @apply text-center p-4;
        }
    </style>
</head>
<body class="bg-gray-200">
    @yield('content')
</body>
</html>