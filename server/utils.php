<?php


function insertRequest($connexion, string $table, array $values){
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

    $sth = $connexion->prepare($sql);

    for($y = 0; $y < sizeof($values); $y++){
        $sth->bindValue(":".$values[$y]["param"], $values[$y]["value"], $values[$y]["type"]);
    }

    $sth->execute();

    return $sth;
}

?>