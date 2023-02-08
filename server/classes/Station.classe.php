<?php

include_once("./utils.php");

class Station{
    private $id;
    private $StationId;
    private $ville;
    private $adresse;
    private $essences;
    private $geom1;
    private $geom2;
    private $emailUser;

    public function __construct($id, $StationId, $ville, $adresse, $essences, $geom1, $geom2, $emailUser)
    {
        $this->id = $id;
        $this->StationId = $StationId;
        $this->ville = $ville;
        $this->adresse = $adresse;
        $this->essences = $essences;
        $this->geom1 = $geom1;
        $this->geom2 = $geom2;
        $this->emailUser = $emailUser;
    }

    public static function registerNew($connexion, $infos, $email){

        if(Station::checkInDB($connexion, $infos, $email)){
            $response = [
                "status"=>"404",
                "Message" => "Déjà en favoris !"
            ];
            echo json_encode($response);
            die;
        }

        $values = [
            ["param" => "stationId", "value" => htmlspecialchars($infos["id"]), "type" => PDO::PARAM_INT],
            ["param" => "ville", "value" => htmlspecialchars($infos["ville"]), "type" => PDO::PARAM_STR],
            ["param" => "adresse", "value" => htmlspecialchars($infos["adresse"]), "type" => PDO::PARAM_STR],
            ["param" => "essences", "value" => $infos["essence"], "type" => PDO::PARAM_STR],
            ["param" => "geom1", "value" => htmlspecialchars($infos["geom1"]), "type" => PDO::PARAM_STR],
            ["param" => "geom2", "value" => htmlspecialchars($infos["geom2"]), "type" => PDO::PARAM_STR],
            ["param" => "emailUser", "value" => $email, "type" => PDO::PARAM_STR]
        ];

        $rqt = insertRequest($connexion, "station", $values);

        if($rqt){
            $response = [
                "status"=>"200",
                "Message" => "Ajouté aux favoris"
            ];
            echo json_encode($response);
        }

    }

    public static function checkInDB($connexion, $infos, $email){

        $values = [
            ["param" => "emailUser", "value" => $email, "type" => PDO::PARAM_STR],
            ["param" => "stationId", "value" => htmlspecialchars($infos["id"]), "type" => PDO::PARAM_INT]
        ];

        $stmt = selectRequest($connexion, "station", $values);

        $result = $stmt->fetch(PDO::FETCH_OBJ);

        if($result){
            return true;
        }
        return false;
    }

    public static function getFromDB($connexion, $email){
        $values = [
            ["param" => "emailUser", "value" => $email, "type" => PDO::PARAM_STR]
        ];

        $stmt = selectRequest($connexion, "station", $values);

        $result = [];

        while($station = $stmt->fetch(PDO::FETCH_OBJ)){
            $result[] = $station;
        }

        echo json_encode($result);
    }

    public static function deleteFromDB($connexion, $id){
        $values = [
            ["param" => "id", "value" => $id, "type" => PDO::PARAM_INT]
        ];

        return deleteRequest($connexion, "station", $values);
    }
}

?>