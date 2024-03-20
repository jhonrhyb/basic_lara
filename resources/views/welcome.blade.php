<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>

<body>
  <div class="wrapper">
    <form id="formLogin" action="{{ route('loginUserAcct') }}" method="get">
      @csrf
      <h1>Login</h1>
      <div class="input-box">
        <input type="text" name="username" id="username" placeholder="Username" value="{{ isset($username) ? $username : '' }}" required autofocus>
        <i class='bx bxs-user'></i>
      </div>
      <div class="input-box">
        <input type="password" name="password" id="password" placeholder="Password" required>
        <i class='bx bxs-lock' id="lock-icon"></i>
      </div>
      <div class="remember-forgot">
        <label for="remember">
          <input hidden type="checkbox" name="remember" id="remember"> <span hidden>Remember me</span>
        </label>
        <a href="#" id="forgot_password">Forgot password?</a>
      </div>
      <button type="submit" class="btn">Login</button>
      <div class="register-link">
        <p>Don't have an account? <a href="#" id="register">Register</a></p>
      </div>
    </form>
  </div>
</body>

</html>
<script type="text/javascript" src="{{ asset('js/jquery-3.1.1.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/sweetalert2.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/apps.js') }}"></script>
@if (isset($alert))
<script>
  topAlert.fire({
    icon: 'success',
    title: 'Success!',
    text: 'You can now login.'
  });
</script>
@endif

@if (isset($invalid))
<script>
  $('#password').focus();
  topAlert.fire({
    icon: 'warning',
    title: 'Oops!',
    text: 'Invalid credentials.'
  });
</script>
@endif