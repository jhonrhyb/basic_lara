$('#lock-icon').click(() => {
  if ($('#lock-icon').attr('class') == 'bx bxs-lock') {
    $('#lock-icon').addClass("bxs-lock-open");
    $('#lock-icon').removeClass("bxs-lock");
    $('#password').attr('type', 'text');
    $('.tooltip-text').html("<i class='bx bxs-info-square'></i> click to hide password.");
  } else {
    $('#lock-icon').addClass("bxs-lock");
    $('#lock-icon').removeClass("bxs-lock-open");
    $('#password').attr('type', 'password');
    $('.tooltip-text').html("<i class='bx bxs-info-square'></i> click to show password.");
  }
});

$('#lock-icon-confirm').click(() => {
  if ($('#lock-icon-confirm').attr('class') == 'bx bxs-lock') {
    $('#lock-icon-confirm').addClass("bxs-lock-open");
    $('#lock-icon-confirm').removeClass("bxs-lock");
    $('#confirmpassword').attr('type', 'text');
    $('.tooltip-text').html("<i class='bx bxs-info-square'></i> click to hide password.");
  } else {
    $('#lock-icon-confirm').addClass("bxs-lock");
    $('#lock-icon-confirm').removeClass("bxs-lock-open");
    $('#confirmpassword').attr('type', 'password');
    $('.tooltip-text').html("<i class='bx bxs-info-square'></i> click to show password.");
  }
});

const topAlert = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});