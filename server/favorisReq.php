<?php
include "connexion.php";
require_once __DIR__ . "/classes/Station.classe.php";
session_start();

if(isset($_GET) AND isset($_SESSION['email_user'])){
    $email = $_SESSION['email_user'];
    try{
        Station::getFromDB($connexion, $email);
    }
    catch(PDOException $e){
        echo $e->getMessage();
    }
    die;
}

?>