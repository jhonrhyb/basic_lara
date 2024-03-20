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
      <div class="input-box-email">
        <div class="input-box-email-input">
          <input type="email" name="emailReg" id="emailReg" placeholder="Email Address" required autofocus>
          <button type="button" id="verfiyEmail">Verify</button>
          <!-- <i class='bx bxs-user'></i> -->
        </div>
      </div>
      <button type="submit" class="btn">Submit</button>
      <div class="register-link">
        <p>Do you have an account? <a href="#" id="login">Login</a></p>
      </div>
    </form>
  </div>
  <div class="otp-wrapper">
    <div class="otp-container">
      <i class="bx bx-x bx-border" id="closeOTP"></i>
      <h1>OTP Verfication</h1>
      <p>Enter the OTP sent to your registered email</p>
      <span></span>
      <div class="otp-input-container">
        <input type="text" class="otp-input" maxlength="1">
        <input type="text" class="otp-input" maxlength="1">
        <input type="text" class="otp-input" maxlength="1">
        <input type="text" class="otp-input" maxlength="1">
        <input type="text" class="otp-input" maxlength="1">
        <input type="text" class="otp-input" maxlength="1">
      </div>
      <input type="button" class="btn" id="emailConfirm" value="Confirm">
    </div>
  </div>
</body>

</html>

<script type="text/javascript" src="{{  asset('js/jquery-3.1.1.min.js') }}"></script>
<script type="text/javascript" src="{{  asset('js/sweetalert2.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/apps.js') }}"></script>