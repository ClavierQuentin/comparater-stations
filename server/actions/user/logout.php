<?php
require_once "../../classes/User.classe.php";

if(isset($_SESSION['email_user'])){
    session_destroy();
    
    User::initCookies();

    header("location: https://quentin-clavier.com/comparateur-stations/");
    // header("location: http://localhost/mon-comparateur");
}
?>