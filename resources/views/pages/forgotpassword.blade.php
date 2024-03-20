<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forgot Password</title>
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>

<body>
  <div class="wrapper">
    <form action="{{ route('reset.Password') }}" method="post">
      @csrf
      <h1>Forgot Password</h1>
      <div class="input-box">
        <input type="text" name="username" id="username" placeholder="Username" value="{{ $data->username ?? '' }}" required autofocus>
        <i class='bx bxs-user'></i>
      </div>
      <div class="input-box">
        <input type="password" name="oldpassword" id="oldpassword" value="{{ $data->oldpassword ?? '' }}" placeholder="Old Password" required>
        <i class='bx bxs-lock' id="lock-icon-old"></i>
      </div>
      <div class="input-box">
        <input type="password" name="newpassword" id="newpassword" value="{{ $data->newpassword ?? '' }}" placeholder="New Password" required>
        <i class='bx bxs-lock' id="lock-icon-new"></i>
      </div>
      <div class="input-box">
        <input type="password" name="confirmpassword" id="confirmpassword" value="{{ $data->confirmpassword ?? '' }}" placeholder="Confirm New Password" required>
        <i class='bx bxs-lock' id="lock-icon-confirm"></i>
      </div>
      <button type="submit" class="btn">Submit</button>
      <div class="register-link">
        <p>Go back to login page? <a href="#" id="login">Click here</a></p>
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