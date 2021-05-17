<div id="mySidenav" class="sidenav shadow-lg">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    @if (auth()->user()->user_type === 'admin')
      <a href="#">Users</a>
      <a href="#">Students</a>
    @else
      <a href="#">Students</a>
    @endif
    <a href="#">Class</a>
  </div>