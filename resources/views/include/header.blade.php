<div class="w-full p-6 bg-blue-400 text-white">
    <div class="flex">
        <p>{{$header}}</p>
        <div class="ml-auto">
            <div class="flex">
                <p>{{Auth()->user()->username}}</p>
                {{-- dropdown --}}
                <div class="dropdown">
                    <div class="dropbtn">
                        <span class="caret caret-reversed "></span>
                    </div>
                    <div class="dropdown-content">
                    <a href="#">Profile</a>
                    <a href="{{ route('logout') }}">Log out</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>