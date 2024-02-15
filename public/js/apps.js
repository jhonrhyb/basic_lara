$(document).ready(() => {
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

  $(document).on('click', '.addBtn', () => {
    var inputs = $('.list-box:first').find('input');
    if (inputs[0].value == '' && inputs[1].value == '' && inputs[2].value == '') {
      topAlert.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Data is required.'
      })
      for (var i = 0; i < 3; i++) inputs[i].style.border = '1px solid red';
      return;
    } else {
      for (var i = 0; i < 3; i++) inputs[i].style.border = 'none';
    }
    var cloneDIV = $('.list-box:first').clone();
    cloneDIV.find('input').css({ 'pointer-events': 'none' });
    cloneDIV.find('.addBtn').hide();
    cloneDIV.append('<button type="button" class="editBtn" onclick="this.closest(\'.list-box\').find(\'input\').css({\'pointer-events\': \'auto\'});"><i class="fa fa-edit"></i></button>');
    cloneDIV.append('<button type="button" class="delBtn" onclick="this.closest(\'.list-box\').remove();"><i class="fa fa-trash"></i></button>').appendTo('.clone-row');
    $('.list-box:first').find('input').val('');
  });
});