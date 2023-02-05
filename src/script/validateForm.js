import { beginningRequestUrl, getMarkers } from "../../utils.js";

const returnFunctionIFTrue = (data) => {
    return data? data : "Aucune information disponible";
}

const essenceDetails = (data) => {
    return {
        maj: data.fields.prix_maj? data.fields.prix_maj.split("-")[2].split("T")[0] + "/" + data.fields.prix_maj.split("-")[1] + "/" + data.fields.prix_maj.split("-")[0] : "Aucune information disponible",
        prix: returnFunctionIFTrue(data.fields.prix_valeur),
        nom: returnFunctionIFTrue(data.fields.prix_nom)
    }
}

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
        let array = [];
        let villeReq = results.facet_groups[5].facets[0].name;
        for(let i = 0; i < data.length; i++){
            let ville = (data[i].fields.ville).toLowerCase();
            ville = ville.charAt(0).toUpperCase() + ville.slice(1); 
            let isTrue = false;
            for(let j = 0; j < array.length; j++){
                if(array[j].adresse == data[i].fields.adresse){
                    isTrue = true;
                    array[j].essence.push(essenceDetails(data[i]))
                    break;
                }
            }
            if(!isTrue){

                array.push({
                    comm_name: villeReq,
                    dep: data[i].fields.dep_name,
                    geom1:data[i].fields.geom[0],
                    geom2:data[i].fields.geom[1],
                    id: data[i].fields.id,
                    adresse: data[i].fields.adresse,
                    ville: ville,
                    essence:[essenceDetails(data[i])]
                })
            }
        }
        divResults.innerHTML =        
            `
            <div class="row gx-0">
                <div class = "liste col-6">
                    <div class = "row gx-0">
                        ${array.map(item=>
                            `
                        <div class="col-sm-3 col-10 p-2">
                            <div class="card bg-light items" id="${item.id}" data-lat="${item.geom1}" data-lng ="${item.geom2}">
                                <div class="card-body">
                                <svg data-id="${item.id}" data-type="${item.essence[0].nom}" class = "star" version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                width="25px" height="25px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                           <g>
                               <path class="border" fill="" d="M50.538,63.991c-0.332,0-0.666-0.082-0.969-0.25l-17.571-9.717l-17.571,9.717    c-0.67,0.373-1.496,0.326-2.121-0.115s-0.945-1.201-0.822-1.955l3.379-20.706L0.569,26.308c-0.523-0.537-0.703-1.32-0.465-2.031    s0.854-1.229,1.594-1.342l19.674-3.006L30.188,1.15C30.518,0.447,31.223,0,31.998,0s1.48,0.447,1.811,1.15l8.815,18.778    l19.675,3.006c0.74,0.113,1.355,0.631,1.594,1.342s0.059,1.494-0.465,2.031L49.134,40.965l3.379,20.706    c0.123,0.754-0.197,1.514-0.822,1.955C51.347,63.868,50.942,63.991,50.538,63.991z M31.998,49.739c0.334,0,0.666,0.084,0.969,0.25    l14.935,8.258l-2.879-17.634c-0.102-0.627,0.1-1.264,0.543-1.719L57.847,26.3l-16.884-2.578c-0.658-0.1-1.225-0.523-1.508-1.127    L31.998,6.708l-7.457,15.887c-0.283,0.604-0.85,1.027-1.508,1.127L6.149,26.3l12.282,12.595c0.443,0.455,0.645,1.092,0.543,1.719    l-2.879,17.634l14.935-8.258C31.332,49.823,31.664,49.739,31.998,49.739z"/>
                               <path class="background" fill="" d="M31.998,49.739c0.334,0,0.666,0.084,0.969,0.25l14.935,8.258l-2.879-17.634    c-0.102-0.627,0.1-1.264,0.543-1.719L57.847,26.3l-16.884-2.578c-0.658-0.1-1.225-0.523-1.508-1.127L31.998,6.708l-7.457,15.887    c-0.283,0.604-0.85,1.027-1.508,1.127L6.149,26.3l12.282,12.595c0.443,0.455,0.645,1.092,0.543,1.719l-2.879,17.634l14.935-8.258    C31.332,49.823,31.664,49.739,31.998,49.739z"/>
                           </g>
                           </svg>
                                                                                      
                                    <h5 class="card-title m-1">${item.ville}</h5>
                                    <p>${item.adresse}</p>
                                    <ul class="listeEssence">
                                        ${item.essence.map(essence=>
                                            `
                                        <li><span class="underline">Type:</span> ${essence.nom}</li>
                                        <li><span class="underline">Prix:</span> ${essence.prix} €</li>
                                        <li><span class="list_maj">Dernière mise à jour le ${essence.maj}</span></li>
                                        <input type="hidden" value = ${beginningRequestUrl}"&refine.dep_name=${item.dep}&refine.com_arm_name=${item.comm_name}&refine.prix_nom=${essence.nom}&rows=10000">
                                            `
                                            ).join("")}
                                    </ul>

                                </div>
                            </div>
                        </div>
                    `
                ).join('\n')}
                    </div>
                </div>
                    
                <div class = "col-6 carte">
                        <div id="map"></div>
                </div>
            </div>
             
                `
       var map = L.map('map').setView([51.505, -0.09], 13);
       L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
           maxZoom: 19,
           attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
       }).addTo(map);


        let cards = document.getElementsByClassName('items');

        Array.from(cards).forEach(card =>{
            card.addEventListener('click', () => {
                let lat = card.getAttribute('data-lat');
                let lng = card.getAttribute('data-lng');
                let LatLngs = [];
                LatLngs.push([lat, lng]); //remplissage du tableau avec lattitude / longitude des marqueurs

                var bound = L.latLngBounds([LatLngs]);
                map.fitBounds(bound);

            })
        })
        getMarkers(array, map);

        let starsIcons = document.getElementsByClassName('star');

        Array.from(starsIcons).forEach(star => {
            star.addEventListener('click', () => {
                rajoutFavori(star.getAttribute('data-id'), star.getAttribute('data-type'));
            })
        })
     })
     .catch((err)=>{
         console.log(err);
     })
 }
 

export { validateForm };