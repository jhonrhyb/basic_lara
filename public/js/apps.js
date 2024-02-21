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
    } else if (inputs[2].value.length<10) {
      topAlert.fire({
        icon: 'error',
        title: 'Invalid!',
        text: 'Contact number must be 10 digits.'
      });
      return;
    } else {
      inputs[0].style.border = 'none';
      inputs[0].focus();
    }

    var route = $('#saveMemberURL').data('route');
    var defaultIMG = $('#defaultImg').data('route');
    var routeIMG = $('#storeImgURL').data('route');
    var file = $(e.currentTarget).closest('.list-box').find('#imageFile')[0].files[0];

    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (f) => {
        var base64String = f.target.result.split(',')[1];
        $.ajax({
          url: routeIMG,
          type: 'post',
          data: {
            'name': inputs[0].value,
            'user': $('#user').data('user'),
            'image': base64String
          },
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: (response) => { }
        });
      }
    }

    $.ajax({
      url: route,
      type: 'post',
      dataType: 'JSON',
      data: {
        'name': inputs[0].value,
        'email': inputs[1].value,
        'contact': inputs[2].value,
        'user': $('#user').data('user')
      },
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: (response) => {
        if (response['code']) {
          var cloneDIV = $('.list-box:first').clone();
          cloneDIV.find('input').attr('disabled', 'disabled');
          cloneDIV.find('input,img').css({ 'pointer-events': 'none', 'color': '#999' });
          cloneDIV.find('.addBtn').hide();
          cloneDIV.append('<button type="button" class="editBtn"><i class="fa fa-edit"></i></button>');
          cloneDIV.append('<button type="button" class="delBtn"><i class="fa fa-trash"></i></button>').appendTo('.clone-row');
          $('.list-box:first').find('input').val('');
          $('.list-box:first').find('img').attr('src', defaultIMG);
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
    $(e.currentTarget).closest('.list-box').find('[name=email],[name=contact]').removeAttr('disabled');
    $(e.currentTarget).closest('.list-box').find('[name=email],[name=contact],.imgBox').css({ 'pointer-events': 'auto', 'color': '#000' });
    $(e.currentTarget).closest('.list-box').find('.delBtn').css({ 'pointer-events': 'none', 'background-color': '#7e7e7e' })
    $(e.currentTarget).closest('.list-box').children().last().before($('<button type="button" class="cancelBtn"><i class="fa fa-undo"></i></button>'));
    $(e.currentTarget).closest('.list-box').find('.imgLabel').css({'display': 'block'});
    $(e.currentTarget).closest('.list-box').find('[name=email]').focus();
    $('#prevEmail').val($(e.currentTarget).closest('.list-box').find('[name=email]').val());
    $('#prevContact').val($(e.currentTarget).closest('.list-box').find('[name=contact]').val());
    $(e.currentTarget).remove();
  });

  $(document).on('click', '.doneBtn', (e) => {
    var inputs = $(e.currentTarget).closest('.list-box').find('input');
    var email = $(e.currentTarget).closest('.list-box').find('[name=email]');
    var contact = $(e.currentTarget).closest('.list-box').find('[name=contact]');
    if (!validEmail.test(email.val()) && email.val()) {
      topAlert.fire({
        icon: 'error',
        title: 'Invalid!',
        text: 'Email Address.'
      });
      email.css({
        'border': '1px solid red'
      });
      return;
    } else if (contact.val().length<10) {
      topAlert.fire({
        icon: 'error',
        title: 'Invalid!',
        text: 'Contact number must be 10 digits.'
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
    var routeIMG = $('#storeImgURL').data('route');
    var file = $(e.currentTarget).closest('.list-box').find('#imageFile')[0].files[0];

    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (f) => {
        var base64String = f.target.result.split(',')[1];
        $.ajax({
          url: routeIMG,
          type: 'post',
          data: {
            'name': inputs[0].value,
            'user': $('#user').data('user'),
            'image': base64String
          },
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: (response) => { }
        });
      }
    }

    $.ajax({
      url: route,
      type: 'post',
      dataType: 'JSON',
      data: {
        'name': inputs[0].value,
        'email': inputs[1].value,
        'contact': inputs[2].value,
        'user': $('#user').data('user'),
        'job': 'edit'
      },
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: (response) => {
        if (response['code']) {
          $(e.currentTarget).closest('.list-box').find('input').attr('disabled', 'disabled');
          $(e.currentTarget).closest('.list-box').find('input,.imgBox').css({ 'pointer-events': 'none', 'color': '#999' });
          $(e.currentTarget).closest('.list-box').find('.delBtn').css({ 'pointer-events': 'auto', 'background-color': '#ff0000' })
          $(e.currentTarget).closest('.list-box').children().last().before($('<button type="button" class="editBtn"><i class="fa fa-edit"></i></button>'));
          $(e.currentTarget).remove();
        } else {
          topAlert.fire({
            icon: 'error',
            title: 'Invalid!',
            text: 'Duplicate name or email is not allowed!'
          });
        }
      }
    });
    inputs[0].blur();
    $(e.currentTarget).closest('.list-box').find('.imgLabel').css({'display': 'none'});
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

  $(document).on('click', '[name=contact]', (e) => {
    var contact = $(e.currentTarget).closest('.list-box').find('[name=contact]');
    contact.val(contact.val().replace(/-/g, ''));
    // $(e.currentTarget).select();
  });

  $(document).on('keypress', '[name=contact]', (e) => {
    var value = String.fromCharCode(e.which ? e.which : e.keyCode);
    var pattern = /^[0-9]$/;
    return pattern.test(value);
  });

  $(document).on('blur', '[name=contact]', (e) => {
    if ($(e.currentTarget).val().length<10) {
      topAlert.fire({
        icon: 'error',
        title: 'Invalid!',
        text: 'Contact number must be 10 digits.'
      });
      return;
    }
    $(e.currentTarget).val($(e.currentTarget).val().replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3'));
  });

  $(document).on('click', '.imgBox', (e) => {
    $(e.currentTarget).closest('.list-box').find('#imageFile').click();
  });

  $(document).on('change', '#imageFile', (e) => {
    var file = e.target.files[0];

    if (!['image/jpg', 'image/jpeg', 'image/png'].find( (val) => { return val==file['type']})) {
      $(e.currentTarget).val('');
      topAlert.fire({
        icon: 'error',
        title: 'Invalid!',
        text: 'Uploaded file is not a valid image. Only JPG, JPEG, PNG and GIF files are allowed.'
      });
      return;
    }

    if (file) {
      var reader = new FileReader();
      reader.onload = (f) => {
        $(e.currentTarget).closest('.list-box').find('.imgBox').attr('src', f.target.result)
      }
      reader.readAsDataURL(file);
    }
  });

  $(document).on('keyup', '[name=email],[name=contact]', (e) => {
    var div = $(e.currentTarget).closest('.list-box');
    var emailVal = div.find('[name=email]').val();
    var prevEmailVal = $('#prevEmail').val();
    var contactVal = div.find('[name=contact]').val().replace(/-/g, '');
    var prevContactVal = $('#prevContact').val().replace(/-/g, '');
    var thisName = $(e.currentTarget).attr('name');
    var divClass = '';
    
    if (e.keyCode==9 && thisName!='email') div.find('[name=contact]').val(contactVal);

    if (thisName=='email') divClass = $(e.currentTarget).parent().closest('div').attr('class');
    else divClass = $(e.currentTarget).parent().parent().closest('div').attr('class');
    
    if (divClass.indexOf('data-row') != -1 && e.keyCode!=9) {
      div.find('.doneBtn').remove();
      div.find('.editBtn').remove();
      div.find('.cancelBtn').remove();
      if ((emailVal!=prevEmailVal || contactVal!=prevContactVal)) {
        div.children().last().before("<button type='button' class='doneBtn'><i class='fa fa-check'></i>");
      } else {
        div.children().last().before("<button type='button' class='cancelBtn'><i class='fa fa-undo'></i>");
      }
    }
  });

  $(document).on('click', '.cancelBtn', (e) => {
    var div = $(e.currentTarget).closest('.list-box');
    div.find('.doneBtn').remove();
    div.find('.editBtn').remove();
    div.find('.cancelBtn').remove();
    div.find('[name=email]').val($('#prevEmail').val());
    div.find('[name=contact]').val($('#prevContact').val());
    div.find('input').attr('disabled', 'disabled');
    div.find('input,img').css({ 'pointer-events': 'none', 'color': '#999' });
    div.find('.delBtn').css({ 'pointer-events': 'auto', 'background-color': '#ff0000' })
    div.children().last().before("<button type='button' class='editBtn'><i class='fa fa-edit'></i>");
  });
});