<?php
include "connexion.php";
require_once __DIR__ . "/classes/Station.classe.php";
session_start();

$infos = $_POST;

if(isset($_SESSION['email_user'])){
    if(isset($infos)){
    try{
        Station::registerNew($connexion, $infos, $_SESSION["email_user"]);
    }
    catch(PDOException $e){
        echo $e->getMessage(); 
        die;
    }
    die;
    }
} else{
    $response = [
        "status"=>"404",
        "Message" => "Vous devez être authentifié pour cela"
    ];
    echo json_encode($response);
    die;    
}

?>