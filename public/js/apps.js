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

const loadAlert = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

const confirmAlert = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: true,
  showCancelButton: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

$(document).ready(() => {
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

  var validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  $(document).on('keypress', '[name=name]', (e) => {
    $(e.currentTarget).css({ 'border': 'none' });
    var value = String.fromCharCode(e.which ? e.which : e.keyCode);
    var pattern = new RegExp(/[a-zåäö ]/i);
    return pattern.test(value);
  });

  $(document).on('blur', '[name=email]', (e) => {
    if (!validEmail.test($(e.currentTarget).val()) && $(e.currentTarget).val()) {
      topAlert.fire({
        icon: 'error',
        title: 'Invalid!',
        text: 'Email Address.'
      });
      $(e.currentTarget).css({
        'border': '1px solid red'
      });
    } else {
      $(e.currentTarget).css({
        'border': 'none'
      });
    }
  })

  $(document).on('click', '.addBtn', (e) => {
    var inputs = $('.list-box:first').find('input');
    if (inputs[0].value == '') {
      topAlert.fire({
        icon: 'error',
        title: 'Invalid!',
        text: 'Name is required.'
      });
      inputs[0].style.border = '1px solid red';
      $(e.currentTarget).closest('.list-box').find('[name=name]').focus();
      return;
    } else if (!validEmail.test(inputs[1].value) && inputs[1].value) {
      topAlert.fire({
        icon: 'error',
        title: 'Invalid!',
        text: 'Email Address.'
      });
      inputs[1].style.border = '1px solid red';
      $(e.currentTarget).closest('.list-box').find('[name=email]').focus();
      return;
    } else {
      inputs[0].style.border = 'none';
      inputs[0].focus();
    }

    var route = $('#saveMemberURL').data('route');
    $.ajax({
      url: route,
      type: 'post',
      dataType: 'JSON',
      data: {
        'name': inputs[0].value,
        'email': inputs[1].value,
        'contact': inputs[2].value
      },
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: (response) => {
        if (response['code']) {
          var cloneDIV = $('.list-box:first').clone();
          cloneDIV.find('input').css({ 'pointer-events': 'none', 'color': '#999' });
          cloneDIV.find('.addBtn').hide();
          cloneDIV.append('<button type="button" class="editBtn"><i class="fa fa-edit"></i></button>');
          cloneDIV.append('<button type="button" class="delBtn"><i class="fa fa-trash"></i></button>').appendTo('.clone-row');
          $('.list-box:first').find('input').val('');
        } else {
          topAlert.fire({
            icon: 'error',
            title: 'Invalid!',
            text: 'Duplicate name or email is not allowed!'
          });
        }
      }
    });
  });

  $(document).on('click', '.editBtn', (e) => {
    $(e.currentTarget).closest('.list-box').find('[name=email],[name=contact]').css({ 'pointer-events': 'auto', 'color': '#000' });
    $(e.currentTarget).hide();
    $(e.currentTarget).closest('.list-box').find('.delBtn').css({ 'pointer-events': 'none', 'background-color': '#7e7e7e' })
    $(e.currentTarget).closest('.list-box').children().last().before($('<button type="button" class="doneBtn"><i class="fa fa-check"></i></button>'));
    var contact = $(e.currentTarget).closest('.list-box').find('[name=contact]');
    contact.val(contact.val().replace(/-/g, ''));
    $(e.currentTarget).closest('.list-box').find('[name=email]').focus();
  });

  $(document).on('click', '.doneBtn', (e) => {
    var inputs = $(e.currentTarget).closest('.list-box').find('input');
    var email = $(e.currentTarget).closest('.list-box').find('[name=email]');
    if (inputs[0].value == '') {
      topAlert.fire({
        icon: 'error',
        title: 'Invalid!',
        text: 'Data is required.'
      });
      inputs[0].style.border = '1px solid red';
      $(e.currentTarget).closest('.list-box').find('[name=name]').focus();
      return;
    } else if (!validEmail.test(email.val()) && email.val()) {
      topAlert.fire({
        icon: 'error',
        title: 'Invalid!',
        text: 'Email Address.'
      });
      email.css({
        'border': '1px solid red'
      });
      return;
    } else {
      email.css({
        'border': 'none'
      });
      inputs[0].style.border = 'none';
      inputs[0].focus();
    }

    var route = $('#saveMemberURL').data('route');
    $.ajax({
      url: route,
      type: 'post',
      dataType: 'JSON',
      data: {
        'name': inputs[0].value,
        'email': inputs[1].value,
        'contact': inputs[2].value,
        'job': 'edit'
      },
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: (response) => {
        if (response['code']) {
          $(e.currentTarget).closest('.list-box').find('input').css({ 'pointer-events': 'none', 'color': '#999' });
          $(e.currentTarget).hide();
          $(e.currentTarget).closest('.list-box').find('.delBtn').css({ 'pointer-events': 'auto', 'background-color': '#ff0000' })
          $(e.currentTarget).closest('.list-box').children().last().before($('<button type="button" class="editBtn"><i class="fa fa-edit"></i></button>'));
        } else {
          topAlert.fire({
            icon: 'error',
            title: 'Invalid!',
            text: 'Duplicate name or email is not allowed!'
          });
        }
      }
    });
  });

  $(document).on('click', '.delBtn', (e) => {
    confirmAlert.fire({
      icon: 'warning',
      title: ' ',
      text: 'Are you sure you want to delete?'
    }).then((result) => {
      if (result.isConfirmed) {
        var route = $('#deleteMemberURL').data('route');
        var inputs = $(e.currentTarget).closest('.list-box').find('input');
        $.ajax({
          url: route,
          type: 'post',
          dataType: 'JSON',
          data: {
            'name': inputs[0].value,
          },
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: () => {
            $(e.currentTarget).closest('.list-box').remove();
            topAlert.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Your data was successfully deleted.'
            });
          }
        });
      }
    });
  });

  $(document).on('keypress', '[name=contact]', (e) => {
    var value = String.fromCharCode(e.which ? e.which : e.keyCode);
    var pattern = /^[0-9]$/;
    return pattern.test(value);
  });

  $(document).on('blur', '[name=contact]', (e) => {
    $(e.currentTarget).val($(e.currentTarget).val().replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3'));
  });
});