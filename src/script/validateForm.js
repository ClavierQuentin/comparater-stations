import { beginningRequestUrl, setCard, setMap, getDataFromFetch } from "../../utils.js";

const validateForm = () => {
    let divResults = document.getElementById('container');
    let selectDepartements = document.getElementById('départements');

    let selectVille = document.getElementById('ville');

    divResults.innerHTML = "";

    let nomVille = selectVille.value;
     
    let nomDepartement = selectDepartements.value;
    let request = beginningRequestUrl + "&refine.departement=" + nomDepartement + "&refine.ville=" + nomVille + "&rows=10000";
    fetch(request)
     .then((res) => {
         if(res.ok){
             return res.json();
         }
     })
     .then((data)=>{
        let results = getDataFromFetch(data.records);
        console.log(results);
        divResults.innerHTML =  setCard(results);      
       var map = L.map('map').setView([51.505, -0.09], 13);
       setMap(map, results);

        let starsIcons = document.getElementsByClassName('star');

        Array.from(starsIcons).forEach(star => {
            star.addEventListener('click', () => {
                results.forEach(station => {
                    if(station.id == star.getAttribute('data-id')){
                        registerFavori(station);
                    }
                })
            })
        })
     })
     .catch((err)=>{
         console.log(err);
     })
 }
 

export { validateForm };