import { getCookie } from "../../utils.js";

const registerPage= {
    generate : () => {
        const main = document.querySelector('main');
          let error ;      
          getCookie('error')? error = "Les mots de passe ne correspondent pas" : error = "";  
          main.innerHTML = 
        ` 
            <form style="margin:auto;" action="./server/actions/user/register.php" method="POST" class="col-md-6 col-10">
                <h3>S'enregistrer : </h3>
                <input class="form-control m-1" type="prenom" name="prenom" placeholder="Prénom" required>
                <input class="form-control m-1" type="nom" name="nom" placeholder="Nom" required>
                <input class="form-control m-1" type="email" name="email" placeholder="Email" required>
                <input class="form-control m-1" type="password" name="password" placeholder="Mot de passe" required>
                <input class="form-control m-1" type="password" name="password_review" placeholder="Indiquez à nouveau le mot de passe" required>
                <span style="color:red;">${error}</span>
                <div class=" form-group">
                    <input type="checkbox" class="form-check-input" id="rgpd" required>
                    <label for="rgpd">J'autorise ce site à conserver mes données personnelles transmises via ce formulaire. Aucune exploitation commerciale ne sera faite des données conservée.</label>
                </div>
                <button class="btn btn-success m-1" name="submit">Valider</button>
                <span id="result"></span>
            </form>            
        `
    }
}

export default registerPage;