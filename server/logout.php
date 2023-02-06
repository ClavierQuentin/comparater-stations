<?php
if(isset($_SESSION['email_user'])){
    session_destroy();
    if(isset($_COOKIE['error_login'])){
        setcookie('error_login', '', time()-3600);
    }
    if(isset($_COOKIE['error'])){
        setcookie('error', '', time()-3600);
    }
    if(isset($_COOKIE['error_password'])){
        setcookie('error_password', '', time()-3600);
    }
    if(isset($_COOKIE['error_unique'])){
        setcookie('error_unique', '', time()-3600);
    }

    header("location: https://quentin-clavier.com/comparateur-stations/");
    // header("location: http://localhost/mon-comparateur");
}
?>