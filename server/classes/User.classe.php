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
        $sql = "INSERT INTO utilisateur (prenom, nom, email, password) VALUES (:prenom, :nom, :email,:password)";

        $sth = $connexion->prepare($sql);

        $sth->bindValue(":prenom", htmlspecialchars($infos["prenom"]));
        $sth->bindValue(":nom", htmlspecialchars($infos["nom"]));
        $sth->bindValue(":email", htmlspecialchars($infos["email"]));
        $sth->bindValue(":password", password_hash(htmlspecialchars($infos["password"]), PASSWORD_DEFAULT));

        $sth->execute();

        return User::getUserFromDB($connexion, $infos);
    }


    public static function getUserFromDB($connexion, $infos){
        $sql = "SELECT * FROM utilisateur WHERE email = :email LIMIT 1";

        $sth = $connexion->prepare($sql);

        $sth->bindValue(":email", $infos["email"]);

        $sth->execute();

        $result = $sth->fetch(PDO::FETCH_OBJ);

        return User::createFromInfos($result);
    }

}

?>