import { sortBySmaller, beginningRequestUrl } from "../../utils.js";

const generateDep = () => {
    let selectDepartements = document.getElementById('départements');
    let selectVille = document.getElementById('ville');
    let divVille = document.getElementById('divVille');

    let nomDepartement = "";

    selectDepartements.innerHTML = "";
    let chaine = `
        <option>Sélectionner un département</option>
        ${departement.map(departement => `<option id="${departement.code}" value="${departement.nom}">${departement.code} - ${departement.nom}</option>`
        ).join("")}
    `;
    selectDepartements.innerHTML = chaine;

    selectDepartements.addEventListener('change', () =>{
        divVille.style.visibility = "visible"

        selectVille.innerHTML = "";
        nomDepartement = selectDepartements.value;
        setFetch(beginningRequestUrl + "&refine.departement=" + nomDepartement + "&rows=10000", "GET")
        .then((res) => {
            if(res.ok){
                return res.json();
            }
        })
        .then((data)=>{
            const facetGroup = data.facet_groups[0];
            const array = facetGroup.facets.map(facet => facet.name).sort();

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