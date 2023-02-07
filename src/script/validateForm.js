import { beginningRequestUrl, setCard, setMap, getDataFromFetch } from "../../utils.js";



const validateForm = () => {
    let divResults = document.getElementById('container');
    let selectDepartements = document.getElementById('départements');

    let selectVille = document.getElementById('ville');

    divResults.innerHTML = "";

    let nomVille = selectVille.value;
     
 
    let nomDepartement = selectDepartements.value;
    let request = beginningRequestUrl + "&refine.dep_name=" + nomDepartement + "&refine.com_arm_name=" + nomVille + "&rows=10000";
     
    fetch(request)
     .then((res) => {
         if(res.ok){
             return res.json();
         }
     })
     .then((results)=>{
        let data = results.records;
        let array = getDataFromFetch(data);
        divResults.innerHTML =  setCard(array);      
       var map = L.map('map').setView([51.505, -0.09], 13);
       setMap(map, array);

        let starsIcons = document.getElementsByClassName('star');

        Array.from(starsIcons).forEach(star => {
            star.addEventListener('click', () => {
                array.forEach(station => {
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