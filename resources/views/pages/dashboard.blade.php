<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Register</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>

<body>
    <div class="dash-wrapper">
        <form action="" method="post">
            <input type="hidden" id="user" data-user="{{ $user['username'] }}">
            <input type="hidden" id="saveMemberURL" data-route="{{ route('save.Member') }}">
            <input type="hidden" id="storeImgURL" data-route="{{ route('store.Image') }}">
            <input type="hidden" id="deleteMemberURL" data-route="{{ route('delete.Member') }}">
            <input type="hidden" id="getDataMemberURL" data-route="{{ route('data.Member') }}">
            <input type="hidden" id="defaultImg" data-route="{{ asset('images/upload_image1.jpg') }}">
            <input type="hidden" id="prevEmail">
            <input type="hidden" id="prevContact">
            <input type="hidden" id="curContact">
            <input type="hidden" id="prevImg">
            <div class="dash-content1">
                <div class="logout-link">
                    <p><a href="#" ><button type="button" class="btn" id="logoutBtn">Logout</button></a></p>
                </div>
            </div>
            <div class="dash-content2">
                <div>
                    <h1>MEMBER LIST</h1>
                </div>
                <div class="userInfo">
                    <p>Welcome, ( <b>{{ $user['username'] }}</b> )</p>
                </div>
            </div>
            <div class="dash-content3">
                <div class="list-box">
                    <div class="imgDIV">
                        <img src="{{ asset('images/upload_image1.jpg') }}" class="imgBox">
                        <span class="imgLabel"><i class="fa fa-arrow-left"> Click this box to upload image.</i></span>
                    </div>
                    <input type="text" class="inputbox" name="name" placeholder="Name" autofocus>
                    <input type="email" class="inputbox" name="email" placeholder="Email Address">
                    <div id="contactDIV">
                        <span id='contactDefault'><span>+63</span></span><input type="text" inputmode="numeric" class="inputbox" name="contact" placeholder="Contact #" maxlength="10">
                    </div>
                    <input type="file" hidden id="imageFile" name="image">
                    <button type="button" class="addBtn"><i class="fa fa-plus"></i></button>
                </div>
                <div class="list-row">
                    @foreach($data as $row)
                    <div class="list-box data-row">
                        <div class="imgDIV">
                            <img src="{{ $row['UserImage'] ? 'data:image/jpeg;base64,'.$row['UserImage'] : asset('images/upload_image1.jpg') }}" class="imgBox">
                            <span class="imgLabel"><i class="fa fa-arrow-left"> Click this box to upload image.</i></span>
                        </div>
                        <input type="text" class="inputbox" name="name" value="{{$row['FullName']}}" placeholder="Name" disabled>
                        <input type="email" class="inputbox" name="email" value="{{$row['Email']}}" placeholder="Email Address" disabled>
                        <div id="contactDIV">
                            <span id='contactDefault'><span>+63</span></span><input type="text" inputmode="numeric" class="inputbox" name="contact" value="{{$row['Mobile']}}" placeholder="Contact #" maxlength="10" disabled>
                        </div>
                        <input type="file" hidden id="imageFile" name="image">
                        <button type="button" class="editBtn"><i class="fa fa-edit"></i></button>
                        <button type="button" class="delBtn"><i class="fa fa-trash"></i></button>
                    </div>
                    @endforeach
                </div>
            </div>
        </form>
    </div>
</body>

</html>

<script type="text/javascript" src="{{ asset('js/jquery-3.1.1.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/sweetalert2.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/apps.js') }}"></script>