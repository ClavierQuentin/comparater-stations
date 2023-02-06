<?php

$dbhost = 'quentin-clavier.com';
$dbuser = 'svwz2068_quentin';
$dbpass = 'Pierrette14350!';
$dbname = 'svwz2068_essence';
$dsn = 'mysql:dbname=svwz2068_essence;host=quentin-clavier.com';
// $connection = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
// $connection->set_charset('utf8');
try{
    $connexion = new PDO($dsn,$dbuser,$dbpass);
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}
catch(PDOException $e){
    echo "erreur".$e->getMessage();
}

?>