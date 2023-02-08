<?php 
include "connexion.php";
require_once __DIR__ . "/classes/User.classe.php";
session_start();

if(isset($_POST['submit'])){
    $infos = $_POST;

    if(isset($infos["email"]) && isset($infos["password"])){
        try{
            $user = User::getUserFromDB($connexion, $infos);
        }
        catch(PDOException $e){
            echo $e->getMessage();
            die;
        }
        
        if(password_verify($infos["password"], $user->getPassword())){
            
            $_SESSION["email_user"] = $user->getEmail();
            $_SESSION["prenom_user"] = $user->getPrenom();

            User::initCookies();
        
        
            // header("location: https://quentin-clavier.com/comparateur-stations/#/favoris");
            header("location: http://localhost/mon-comparateur/#/favoris");
            die;
        }

        setcookie("error_login",true);
        header("location: https://quentin-clavier.com/comparateur-stations/#/login");

    }
}

?>