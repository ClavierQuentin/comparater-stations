<?php
include "connexion.php";
require_once __DIR__ . "./classes/User.classe.php";
session_start();

User::initCookies();

if(isset($_POST['submit'])){

    $infos = $_POST;

    if(User::validInfos($infos)){

        $password_review = $_POST['password_review'];

        if($infos["password"] != $password_review){
            setcookie("error_password",true);
            // header("location: https://quentin-clavier.com/comparateur-stations/#/register");
            header("location: localhost/mon-comparateur/#/register");

            die;  
        }

        try{
            $user = User::registerNewUser($connexion, $infos);
            $_SESSION["email_user"] = $user->getEmail();
        }
        catch(PDOException $e){
            if($e->getCode() == 23000){
                setcookie("error_unique",true);
                // header("location: https://quentin-clavier.com/comparateur-stations/#/register");
                die;

            }
            setcookie("error",true);
            header("location: localhost/mon-comparateur/#/register");

            // header("location: https://quentin-clavier.com/comparateur-stations/#/register");
            die;
        }
        // header("location: https://quentin-clavier.com/comparateur-stations/#/favoris");
        header("location: localhost/mon-comparateur/#/favoris");

    }
            
}
?>