<?php
include "connexion.php";
session_start();
if(isset($_SESSION['email_user'])){
    if(isset($_POST)){
        if(isset($_POST['id']) AND isset($_POST['nom'])){

            $id = htmlspecialchars($_POST['id']) ;
            $essence = htmlspecialchars($_POST['nom']) ;
            $email = htmlspecialchars($_SESSION['email_user']);

            // $rqt_verif = "DELETE  FROM favoris where user_email = '{$email}' AND id_station = '{$id}' AND essence = '{$essence}' ;";
            // $result = $connection->query($rqt_verif);

            $sth = $connexion->prepare("DELETE  FROM favoris where user_email = :email AND id_station = :id AND essence = :essence ");
            $sth->bindValue(':email', $email);
            $sth->bindValue(':id', $id, PDO ::PARAM_INT);
            $sth->bindValue(':essence', $essence);

            $sth->execute();

            if($sth){
                echo "Supprimé des favoris !";
                header('location:https://quentin-clavier.com/comparateur-stations/#/favoris');
                // header("location: http://localhost/mon-comparateur/#/favoris");
            }
            else{
                echo "Une erreur est survenue";
            }
        }
    }    
}

?>