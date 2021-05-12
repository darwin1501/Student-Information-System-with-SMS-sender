@extends('layout.app')

@section('content')
    <main>
        <div class="login-container flex h-screen">
            <div class="bg-white m-auto login xs:max-w-xs xs:m-auto sm:w-96 sm:m-auto rounded-lg rounded-lg shadow-lg p-4 py-8">
                <p class="font-bold text-center mb-6">Login</p>
                <div class="flex justify-center mb-4">
                    <input type="text" name="username"
                        class="input" 
                        placeholder="username" required>
                </div>
                <div class="flex justify-center">
                    <input type="password" name="username" 
                        class="input"
                        placeholder="password" required>
                </div>
                <div class="flex justify-center">
                    <button class="bg-blue-400 mt-6 p-4 rounded-lg text-center text-white w-3/4 ">
                        login
                    <button>
                </div>
            </div>
        </div>
    </main>
@endsection