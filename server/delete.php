<?php
include "connexion.php";
require_once __DIR__ . "/classes/Station.classe.php";
session_start();
if(isset($_SESSION['email_user']) && isset($_POST['id'])){
    try{
        Station::deleteFromDB($connexion, $_POST["id"]);
        echo "Supprimé des favoris !";
        // header('location:https://quentin-clavier.com/comparateur-stations/#/favoris');
        header("location: http://localhost/mon-comparateur/#/favoris");
    }
    catch(PDOException $e){
        echo $e->getMessage();
    }
    die;
}

?>