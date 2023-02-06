import { beginningRequestUrl, getMarkers } from "../../utils.js";
import { essenceDetails, getDataFromFetch } from "../script/validateForm.js";

const favorisPage = {
    generate : () =>{
        let id = [];
        let essence = [];
        let fetch = setFetch('server/favorisReq.php', "GET")   
        .then((res) => {
            if(res.ok){
                return res.json();
            }
        })
        .then((response) => {
            id = response.id;  
            essence = response.essence;
            for(let i = 0; i < response.length; i++){
                let secondFetch = setFetch(beginningRequestUrl + "&refine.prix_nom="+response[i].essence+"&refine.id="+response[i].id)
                .then((res) => {
                    if(res.ok){
                        return res.json();
                    }
                })
                .then((results)=>{
                    let data = results.records;
                    let array = getDataFromFetch(data);
                    const main = document.querySelector('main');
                    main.innerHTML = 
                    `
                    <div class="row gx-0">
                        <div class = "liste col-6">
                            <div class = "row gx-0">
                                ${array.map(item=>
                                    `
                                <div class="col-sm-3 col-10 p-2">
                                    <div class="card bg-light items" id="${item.id}" data-lat="${item.geom1}" data-lng ="${item.geom2}">
                                        <div class="card-body">                                                                                              
                                            <h5 class="card-title m-1">${item.ville}</h5>
                                            
                                            <ul>
                                                ${item.essence.map(essence=>
                                                    `
                                                <li>Type : ${essence.nom}</li>
                                                <li>Prix : ${essence.prix} €</li>
                                                <li><span class="list_maj">Dernière mise à jour le ${essence.maj}</span></li>
                                                <button id="${item.id}" value="${essence.nom}" class="btn btn-danger" onclick="delFavori(this.id, this.value)">Supprimer</button>
                                                    `
                                                    )}
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
    
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export default favorisPage;