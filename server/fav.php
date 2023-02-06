<?php
include "connexion.php";
session_start();

if(isset($_SESSION['email_user'])){
    if(isset($_POST)){
        if(isset($_POST['id']) AND isset($_POST['nom'])){
            $id = htmlspecialchars($_POST['id']) ;
            $essence = htmlspecialchars($_POST['nom']) ;
            $email = htmlspecialchars($_SESSION['email_user']);

            $sth = $connexion->prepare("SELECT * FROM favoris where user_email = :email AND id_station = :id AND essence = :essence ");

            $sth->bindValue(':email', $email);
            $sth->bindValue(':id', $id, PDO ::PARAM_INT);
            $sth->bindValue(':essence', $essence);

        
            $sth->execute();
        
            $resultat = $sth->fetchAll(PDO::FETCH_ASSOC);

            if(sizeof($resultat) > 0){
                $response = [
                    "status"=>"404",
                    "Message" => "Déjà en favoris !"
                ];
                echo json_encode($response);
                die;
            }else{
                $sth =  $connexion->prepare('INSERT INTO favoris (id_station, essence, user_email) VALUEs (:id, :essence, :email)');
                $sth->bindValue(':email', $email);
                $sth->bindValue(':id', $id, PDO ::PARAM_INT);
                $sth->bindValue(':essence', $essence);

                $sth->execute();

                if($sth){
                    $response = [
                        "status"=>"200",
                        "Message" => "Ajouté aux favoris"
                    ];
                    echo json_encode($response);
                }

            }
            // $rqt_verif = ("SELECT * FROM favoris where user_email = '{$email}' AND id_station = '{$id}' AND essence = '{$essence}' ;");
            // $result = $connexion->query($rqt_verif);
            // if($result->num_rows){
            //     $response = [
            //         "status"=>"404",
            //         "Message" => "Déjà en favoris !"
            //     ];
            //     echo json_encode($response);
            //     die;
            // }
            // else{
            //     $stmt = $connection->prepare("INSERT INTO favoris (id_station, essence, user_email) VALUEs (?,?,?)");
            //     $stmt->bind_param("sss", $id,$essence, $email);
            //     $stmt->execute();
            //     if($stmt->error == false){
            //         $response = [
            //             "status"=>"200",
            //             "Message" => "Ajouté aux favoris"
            //         ];
            //         echo json_encode($response);
            //     }
            // }
        }
    }    
}else{
    $response = [
        "status"=>"404",
        "Message" => "Vous devez être authentifié pour cela"
    ];
    echo json_encode($response);
    die;
    
}

?>