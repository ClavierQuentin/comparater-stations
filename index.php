<?php

include "server/connexion.php";
session_start();

if(isset($_GET['page'])){
  $page = $_GET['page'];
  switch ($page){
    case "logout":
      include 'server/logout.php';
      break;
    default:
    break;
  }
}

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/bf57503e64.js" crossorigin="anonymous"></script>
    <script type="module" src="main.js"></script>
    <link rel="stylesheet" href="src/css/style.css">    
    <link rel="shortcut icon" href="./icons8-station-essence-100.png" type="image/x-icon">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
     integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
     crossorigin=""/>

     <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
     integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
     crossorigin=""></script>
     
    <title>Comparateur de station service</title>


</head>
<body onkeyup="recupKeyEvent()" class="container-fluid gx-0">
    <header class="m-0">
        <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active " aria-current="page" href="#">Accueil</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link "  href="#/form">Recherche</a>
                  </li>
                  <?php
                    if(isset($_SESSION['email_user'])){
                      echo '<li class="nav-item">
                              <a class="nav-link "  href="#/favoris">Favoris</a>
                            </li>';
                    }

                  ?>
                </ul>
                <ul class="navbar-nav">
                  <?php
                    if(isset($_SESSION["email_user"])){
                      echo '<li class="nav-item dropdowm">
                              <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bonjour</a>
                                <div class="dropdown-menu dropdown-menu-end m-1" aria-labelledby="navbarDropdown">
                                  <!--<a class="dropdowm-item nav-link" href="#/profil">Mon profil</a>-->
                                  <a class="dropwdowm-item nav-link" href="./?page=logout">Déconnexion</a>
                                </div>
                            </li>';
                    }
                    else{
                      echo '<li class="nav-item">
                      <a class="nav-link " href="#/login">Connexion</a>
                    </li>';
                    }
                  ?>
                  
                </ul>
            </div>
        </nav>
    </header>
    <main class="">

    </main>
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 p-1 border-top border-info">
      <div class="col-md-4 d-flex align-items-center">
        <span class="text-muted">© 2022 Quentin Clavier</span>
      </div>
      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3">
          <a href="https://www.instagram.com/cl_quentin/?hl=fr" target="_blank" class="reseau"><i style="color: #5754cd;" id="instagram" class="fab fa-instagram fa-2x"></i></a>
        </li>
        <li class="ms-3">
          <a href="https://www.linkedin.com/in/quentin-clavier/" target="_blank" class="reseau"><i style="color: #0274b3;" class="fab fa-linkedin fa-2x"></i></a>
        </li>
        <li class="ms-3">
          <a href="https://github.com/ClavierQuentin" class="reseau" target="_blank"><i style="color: black;" class="fab fa-github fa-2x" title="GITHUB"></i></a>
        </li>

      </ul>
    </footer>
    <div class="toast-container position-absolute top-0 end-0 p-3" id ="toastContainer">
      
      </div>
</body>

<script src="src/script/liste-departements.json"></script>

<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
<script src="src/script/script.js" defer></script>
</html