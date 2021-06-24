<div class="w-full p-4 bg-blue-400 text-white">
    <div class="flex">
        <p>{{$header}}</p>
        <div class="ml-auto">
            <div class="flex">
                <p id="username-on-header">{{Auth()->user()->username}}</p>
                {{-- dropdown --}}
                <div class="dropdown">
                    <div class="dropbtn">
                        <span class="caret caret-reversed "></span>
                    </div>
                    <div class="dropdown-content">
                         <a class="cursor-pointer" onclick="showProfile()">Profile</a>
                         <a onclick="openSetting()" class="cursor-pointer">Setting</a>
                         <a href="{{ route('logout') }}">Log out</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="user-id" value="{{auth()->user()->id}}">