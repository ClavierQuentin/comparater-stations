import { sortBySmaller, beginningRequestUrl } from "../../utils.js";

const generateDep = () => {
    let selectDepartements = document.getElementById('départements');
    let selectVille = document.getElementById('ville');
    let divVille = document.getElementById('divVille');

    let nomDepartement = "";

    const generateSelectDepartements = () => {
        selectDepartements.innerHTML = "";
        let chaine = `
            <option>Sélectionner un département</option>
            ${departement.map(departement => `<option id="${departement.code}" value="${departement.nom}">${departement.code} - ${departement.nom}</option>`
            ).join("")}
        `;
        selectDepartements.innerHTML = chaine;
    };

    generateSelectDepartements();

    selectDepartements.addEventListener('change', () =>{
        divVille.style.visibility = "visible"

        selectVille.innerHTML = "";
        nomDepartement = selectDepartements.value;
        let fetch = setFetch(beginningRequestUrl + "&refine.dep_name=" + nomDepartement + "&rows=10000", "GET")
        .then((res) => {
            if(res.ok){
                return res.json();
            }
        })
        .then((data)=>{

            let array = [];
            for(let i = 0; i < data.facet_groups[5].facets.length; i++){
                array.push(data.facet_groups[5].facets[i].name);
            }
            sortBySmaller(array);

            let chaine = `
                ${array.map(ville => `<option id="${ville}" value="${ville}">${ville}</option>`)}
            `;

            selectVille.innerHTML = chaine;
        })
        .catch((err)=>{
            console.log(err);
        })
    
    })
}

export { generateDep };