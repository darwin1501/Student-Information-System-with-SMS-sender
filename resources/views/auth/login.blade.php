@extends('layout.app')

@section('content')
    <main>
        <div class="login-container flex h-screen">
            <div class="login xs:w-full xs:ml-10 xs:mr-10 sm:w-96 sm:m-auto rounded-lg m-auto p-4 bg-white">
                <p class="text-center mb-4">Login</p>
                <input type="text" name="username" class="input" placeholder="username">
            </div>
        </div>
    </main>
@endsection