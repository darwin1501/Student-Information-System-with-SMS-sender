@extends('layout.main')

@section('content')
    <main>
        <div class="login-container flex h-screen">
            <div class="bg-white m-auto login xs:max-w-xs xs:m-auto sm:w-96 sm:m-auto rounded-lg rounded-lg shadow-lg p-4 py-8">
                <p class="font-bold text-center mb-6">Login</p>
                <form onsubmit="return login()" >
                    <div class="flex justify-center mb-4">
                        <input type="email" name="email"
                            class="input border-gray-400"
                            id="email"
                            placeholder="email" required>
                    </div>
                    <div class="flex justify-center">
                        <input type="password" name="username" 
                            class="input border-gray-400"
                            id="password"
                            placeholder="password" required>
                    </div>
                    <div class="flex justify-center">
                        <button class="bg-blue-400 mt-6 p-4 rounded-lg text-center text-white w-3/4">
                            login
                        <button>
                    </div>
                </form>
            </div>
        </div>
    </main>
@endsection