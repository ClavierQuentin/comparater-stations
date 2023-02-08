<?php
/**
 * Fonctions toutes faites pour effectuer des requêtes préparées
 * param: 
 * PDO $connexion pour l'objet de connexion en PDO
 * string $table pour le nom de la table cible en DB
 * array $values pour un tableau des valeurs à rentrer et à bind, se décomposera de la manière suivante : 
 *  [
 *      ["param" => chaine de caractère réprésentant la colonne cible et son paramètre à bind, "value" => valeur à utiliser, "type" => type PDO à choisir (ex: PDO::PARAM_INT,      PDO::PARAM_STR, ... Voir doc)]
 *  ]
 */

function insertRequest(PDO $connexion, string $table, array $values){
    $sql = "INSERT INTO {$table} (";

    for($i = 0; $i < sizeof($values); $i++){
        if($i == (sizeof($values) - 1)){
            $sql .= "{$values[$i]["param"]} )";
        }
        else{
            $sql .= "{$values[$i]["param"]}, ";
        }
    }

    $sql .= "VALUE (";

    for($i = 0; $i < sizeof($values); $i++){
        if($i == (sizeof($values) - 1)){
            $sql .= ":{$values[$i]['param']} )";
        }
        else{
            $sql .= ":{$values[$i]["param"]}, ";
        }
    }

    $stmt = $connexion->prepare($sql);

    for($y = 0; $y < sizeof($values); $y++){
        $stmt->bindValue(":".$values[$y]["param"], $values[$y]["value"], $values[$y]["type"]);
    }

    $stmt->execute();

    return $stmt;
}

function selectRequest(PDO $connexion, string $table, array $values){
    $sql = "SELECT * FROM {$table} WHERE ";
    
    if(sizeof($values) > 1){
        for($i = 0; $i < sizeof($values); $i++){
            if($i == (sizeof($values) - 1)){
                $sql .= "{$values[$i]["param"]} = :{$values[$i]["param"]}";
            }
            else{
                $sql .= "{$values[$i]["param"]} = :{$values[$i]["param"]} AND ";
            }
        }
    }
    else{
        $sql .= "{$values[0]["param"]} = :{$values[0]["param"]}";
    }

    $stmt = $connexion->prepare($sql);

    for($y = 0; $y < sizeof($values); $y++){
        $stmt->bindValue(":".$values[$y]["param"], $values[$y]["value"], $values[$y]["type"]);
    }

    $stmt->execute();

    return $stmt;

}

function deleteRequest(PDO $connexion, string $table, array $values){
    $sql = "DELETE FROM {$table} WHERE ";

    if(sizeof($values) > 1){
        for($i = 0; $i < sizeof($values); $i++){
            if($i == (sizeof($values) - 1)){
                $sql .= "{$values[$i]["param"]} = :{$values[$i]["param"]}";
            }
            else{
                $sql .= "{$values[$i]["param"]} = :{$values[$i]["param"]} AND ";
            }
        }
    } else{
        $sql .= "{$values[0]["param"]} = :{$values[0]["param"]}";
    }

    $stmt = $connexion->prepare($sql);

    for($y = 0; $y < sizeof($values); $y++){
        $stmt->bindValue(":".$values[$y]["param"], $values[$y]["value"], $values[$y]["type"]);
    }

    $stmt->execute();

    return $stmt;
}

?>