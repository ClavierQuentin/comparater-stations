<?php
include "connexion.php";
if(isset($_POST['submit'])){
    
    if(isset($_COOKIE['error'])){
        setcookie('error', '', time()-3600);
    }
    if(isset($_COOKIE['error_password'])){
        setcookie('error_password', '', time()-3600);
    }
    if(isset($_COOKIE['error_unique'])){
        setcookie('error_unique', '', time()-3600);
    }

    if(isset($_POST['email']) AND isset($_POST["password"]) AND isset($_POST["password_review"])){

        $email = htmlspecialchars($_POST['email']);
        $password = htmlspecialchars($_POST["password"]);
        $password_review = htmlspecialchars($_POST['password_review']);

        if($password != $password_review){
          setcookie("error_password",true);
          header("location: https://quentin-clavier.com/comparateur-stations/#/register");
          die;
        }

        try{
            $sth = $connexion->prepare("INSERT INTO utilisateur (email, password) VALUES (:email,:password)");

            $password = password_hash($password, PASSWORD_DEFAULT);
            $sth->bindValue(":email", $email);
            $sth->bindValue(":password", $password);
            $sth->execute();

            $_SESSION['email_user'] = $email;

        }
        catch(PDOException $e){
            if($e->getCode() == 23000){
                setcookie("error_unique",true);
                header("location: https://quentin-clavier.com/comparateur-stations/#/register");
                die;

            }
            setcookie("error",true);
            header("location: https://quentin-clavier.com/comparateur-stations/#/register");
            die;
        }
        header("location: https://quentin-clavier.com/comparateur-stations/#/favoris");
    }
        
    //     die;
    //     if($stmt->error){
    //       if($stmt->errno == 1062){
    //         echo "Adresse email déjà existante";
    //         die;
    //       }
    //       echo "Une erreur est survenue";
    //       die;
    //     }
    //     $_SESSION['email_user'] = $email;
    //     header("location: https://quentin-clavier.com/comparateur-stations/#/favoris");
    //   }
}
?>