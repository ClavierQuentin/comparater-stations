<?php

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

        $sql = "INSERT INTO station (stationId, ville, adresse, essences, geom1, geom2, emailUser) VALUE (:stationId, :ville, :adresse, :essences, :geom1, :geom2, :emailUser)";

        $StationId = htmlspecialchars($infos["id"]);
        $ville = htmlspecialchars($infos["ville"]);
        $adresse = htmlspecialchars($infos["adresse"]);
        $essences = $infos["essence"];
        $geom1 = htmlspecialchars($infos["geom1"]);
        $geom2 = htmlspecialchars($infos["geom2"]);
        $emailUser = $email;

        $sth = $connexion->prepare($sql);

        $sth->bindValue(":stationId", $StationId, PDO::PARAM_INT);
        $sth->bindValue(":ville", $ville);
        $sth->bindValue(":adresse", $adresse);
        $sth->bindValue(":essences", $essences);
        $sth->bindValue(":geom1", $geom1);
        $sth->bindValue(":geom2", $geom2);
        $sth->bindValue(":emailUser", $emailUser);

        $sth->execute();

        if($sth){
            $response = [
                "status"=>"200",
                "Message" => "Ajouté aux favoris"
            ];
            echo json_encode($response);
        }

    }

    public static function checkInDB($connexion, $infos, $email){
        $stationId = htmlspecialchars($infos["id"]);

        $sql = "SELECT * FROM station WHERE emailUser = :email AND stationId = :stationId";

        $sth = $connexion->prepare($sql);

        $sth->bindValue(":email", $email);
        $sth->bindValue(":stationId", $stationId, PDO::PARAM_INT);

        $sth->execute();

        $result = $sth->fetch(PDO::FETCH_OBJ);

        if($result){
            return true;
        }
        return false;
    }

    public static function getFromDB($connexion, $email){
        $sql = "SELECT * FROM station WHERE emailUser = :email";
        $sth = $connexion->prepare($sql);

        $sth->bindValue(":email", $email);

        $sth->execute();

        $result = [];

        while($station = $sth->fetch(PDO::FETCH_OBJ)){
            $result[] = $station;
        }

        echo json_encode($result);
    }

    public static function deleteFromDB($connexio, $id){
        $sql = "DELETE FROM station WHERE id = :id";

        $sth = $connexio->prepare($sql);

        $sth->bindValue(":id", $id, PDO::PARAM_INT);

        return $sth->execute();
    }
}

?>