<div id="mySidenav" class="sidenav shadow-lg z-10">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    @if (auth()->user()->user_type === 'admin')
      <a href="{{ route('users') }}">Users</a>
      <a href="{{ route('students') }}">Students</a>
    @else
      <a href="{{ route('students') }}">Students</a>
    @endif
  </div>
  {{-- side nav menu icon --}}
  <span class="sidenav-icon" onclick="openNav()">&#9776;</span>