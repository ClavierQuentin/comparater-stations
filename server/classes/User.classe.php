<?php

class User {

    private $prenom;
    private $nom;
    private $email;
    private $password;
    private $stations = [];

    public function __construct($prenom, $nom, $email, $password)
    {
        $this->prenom = $prenom;
        $this->nom = $nom;
        $this->email = $email;
        $this->password = $password;
    }

    public function getEmail(){
        return $this->email;
    }
    public function getPassword(){
        return $this->password;
    }
    public function getPrenom(){
        return $this->prenom;
    }

    public static function initCookies(){
        if(isset($_COOKIE['error'])){
            setcookie('error', '', time()-3600);
        }
        if(isset($_COOKIE['error_password'])){
            setcookie('error_password', '', time()-3600);
        }
        if(isset($_COOKIE['error_unique'])){
            setcookie('error_unique', '', time()-3600);
        }   

        if(isset($_COOKIE['error_login'])){
            setcookie('error_login', '', time()-3600);
        }

    }

    public static function validInfos($infos){
        $valid = isset($infos["email"]) && isset($infos["password"]) && isset($infos["prenom"]) && isset($infos["nom"]);
        return $valid;
    }

    public static function createFromInfos($infos){

        return new User(
            $infos->prenom,
            $infos->nom,
            $infos->email, 
            $infos->password
        );

    }


    public static function registerNewUser($connexion, $infos){

        $values = [
            ["param" => "prenom", "value" => htmlspecialchars($infos["prenom"]), "type" => PDO::PARAM_STR],
            ["param" => "nom", "value" => htmlspecialchars($infos["nom"]), "type" => PDO::PARAM_STR],
            ["param" => "email", "value" => htmlspecialchars($infos["email"]), "type" => PDO::PARAM_STR],
            ["param" => "password", "value" => htmlspecialchars($infos["password"]), "type" => PDO::PARAM_STR],
        ];
        $rqt = insertRequest($connexion, "utilisateur", $values);

        return User::getUserFromDB($connexion, $infos);
    }


    public static function getUserFromDB($connexion, $infos){
        $values = [
            ["param" => "email", "value" => htmlspecialchars($infos["email"]), "type" => PDO::PARAM_STR]
        ];

        $stmt = selectRequest($connexion, "utilisateur", $values);

        $result = $stmt->fetch(PDO::FETCH_OBJ);

        return User::createFromInfos($result);
    }

}

?>