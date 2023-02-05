<?php
include "connexion.php";
session_start();
if(isset($_GET) AND isset($_SESSION['email_user'])){
    $email = $_SESSION['email_user'];
    // $query = "SELECT * FROM favoris WHERE user_email = '$email'";
    // $result = $connection->query($query);

    $sth = $connexion->prepare("SELECT * FROM favoris WHERE user_email = :email");

    $sth->bindValue(':email', $email);

    $sth->execute();

    $resultat = $sth->fetchAll(PDO::FETCH_ASSOC);
    
    if($resultat){
        foreach($resultat as $row){
            $station[] = ['id'=>$row['id_station'], 'essence'=>$row['essence']];
            /*$id[] = $row['id_station'];
            $nom[] = $row['essence'];
        }
        $results = ["id" => $id, "essence"=>$nom];*/
        }
        echo json_encode($station);    
    }
    else{
        $station[] = [];
        echo json_encode($station);    

    }
}

?>