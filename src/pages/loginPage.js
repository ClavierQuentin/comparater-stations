import { getCookie } from "../../utils.js";


const loginPage= {
    generate : () => {
        const main = document.querySelector('main');
        let error ;      
        getCookie('error_login')? error = "Mot de passe est faux" : error = "";  

        main.innerHTML = 
        ` 
            <form style="margin:auto;" action="?page=login" method="POST" class="col-md-6 col-10">
                <h3>Connexion : </h3>
                <input class="form-control m-1" type="email" name="email" placeholder="Email" required>
                <span style="color:red;">${error}</span>

                <input class="form-control m-1" type="password" name="password" placeholder="Mot de passe" required>

                <button type="submit" class="btn btn-success m-1" name="submit">Valider</button>
                <a href="#/register">Créer un compte</a>
            </form>
            
        `
    }
}

export default loginPage;