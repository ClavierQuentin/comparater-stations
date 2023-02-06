<?php 
include "connexion.php";
session_start();

if(isset($_POST['submit'])){
    if(isset($_POST['email']) AND isset($_POST["password"])){

        $email = htmlspecialchars($_POST['email']);
        $password = htmlspecialchars($_POST["password"]);

        $sth = $connexion->prepare("SELECT password FROM utilisateur WHERE email = :email");

        $sth->bindValue(':email', $email);

        $sth->execute();
        $resultat = $sth->fetchAll(PDO::FETCH_ASSOC);

        if(password_verify($password, $resultat[0]['password'])){
            $_SESSION["email_user"] = $email;

            if(isset($_COOKIE['error'])){
                setcookie('error', '', time()-3600);
            }
            
            if(isset($_COOKIE['error_login'])){
                setcookie('error_login', '', time()-3600);
            }
        
        
            // header("location: https://quentin-clavier.com/comparateur-stations/#/favoris");
            header("location: http://localhost/mon-comparateur/#/favoris");
            die;
        }

        setcookie("error_login",true);
        header("location: https://quentin-clavier.com/comparateur-stations/#/login");

    }
}

?>