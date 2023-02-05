import { generateDep } from "../script/generateDep.js";
import { validateForm } from "../script/validateForm.js";

const formPage =  {
    generate : () => {
        const main = document.querySelector('main');
        
        main.innerHTML = 
        `
        <div id="form">
        <div class="selects ">
            <div class="m-2 form-group">
                <label for="liste-departements">Sélectionner un département</label>
                <select class="form-control" name="departements" id="départements"></select>
            </div>
            <div class="m-2 form-group" id="divVille">
                <label for="ville">Choisir une ville</label>
                <select class="form-control" name="ville" id="ville"></select>
            </div>
            </div>
        <div class="m-2">
            <button id="btnValidate" class="btn btn-success">Valider</button>
        </div>
      </form>
  
    </div>
    <section>
        <div id="results">
            <h2>Résultats</h2>
            <div class="container-fluid" id="container"></div>
        </div>
    </section>
        `
        generateDep();
        let btnValidate = document.getElementById('btnValidate');

        btnValidate.addEventListener('click', validateForm);

    }
}

export default formPage;