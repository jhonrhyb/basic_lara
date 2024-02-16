<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register</title>
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>

<body>
  <div class="wrapper">
    <form action="{{ route('saveUserAcct') }}" method="post">
      @csrf
      <h1>Register</h1>
      <div class="input-box">
        <input type="text" name="username" id="username" placeholder="Username" required autofocus>
        <i class='bx bxs-user'></i>
      </div>
      <div class="input-box">
        <input type="password" name="password" id="password" placeholder="Password" required>
        <i class='bx bxs-lock' id="lock-icon"></i>
      </div>
      <div class="input-box">
        <input type="password" name="confirmpassword" id="confirmpassword" placeholder="Confirm Password" required>
        <i class='bx bxs-lock' id="lock-icon-confirm"></i>
      </div>
      <button type="submit" class="btn">Submit</button>
      <div class="register-link">
        <p>Do you have an account? <a href="home">Login</a></p>
      </div>
    </form>
  </div>
</body>
</html>

<script type="text/javascript" src="{{  asset('js/jquery-3.1.1.min.js') }}"></script>
<script type="text/javascript" src="{{  asset('js/sweetalert2.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/apps.js') }}"></script>