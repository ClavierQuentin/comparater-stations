import { getMarkers } from "../../utils.js";

const favorisPage = {
    generate : () =>{
        let id = [];
        let essence = [];
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');    
        fetch('php/favorisReq.php', {
            headers: headers,
            method: "GET",
            mode:"cors",
            cache:"default"
        })
        .then((res) => {
            if(res.ok){
                return res.json();
            }
        })
        .then((response) => {
            id = response.id;  
            essence = response.essence;
            let array = [];
            for(let i = 0; i < response.length; i++){
                fetch("https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-carburants-fichier-instantane-test-ods-copie&q=&lang=js&facet=id&facet=adresse&facet=ville&facet=prix_maj&facet=prix_nom&facet=com_arm_name&facet=epci_name&facet=dep_name&facet=reg_name&facet=services_service&facet=horaires_automate_24_24&refine.prix_nom="+response[i].essence+"&refine.id="+response[i].id)
                .then((res) => {
                    if(res.ok){
                        return res.json();
                    }
                })
                .then((results)=>{
                    let data = results.records;
                    for(let i = 0; i < data.length; i++){
                        let ville = (data[i].fields.ville).toLowerCase();
                        ville = ville.charAt(0).toUpperCase() + ville.slice(1); 
                        let isTrue = false;
                        for(let j = 0; j < array.length; j++){
                            if(array[j].adresse == data[i].fields.adresse){
                                isTrue = true;
                                array[j].essence.push({
                                    
                                    maj: data[i].fields.prix_maj.split("-")[2].split("T")[0] + "/" + data[i].fields.prix_maj.split("-")[1] + "/" + data[i].fields.prix_maj.split("-")[0],
                                    prix: data[i].fields.prix_valeur,
                                    nom: data[i].fields.prix_nom,
                                })
                                break;
                            }
                        }
                        if(!isTrue){
                            array.push({
                                geom1:data[i].fields.geom[0],
                                geom2:data[i].fields.geom[1],
                                id: data[i].fields.id,
                                adresse: data[i].fields.adresse,
                                ville: ville,
                                essence:[
                                    {
                                        maj: data[i].fields.prix_maj.split("-")[2].split("T")[0] + "/" + data[i].fields.prix_maj.split("-")[1] + "/" + data[i].fields.prix_maj.split("-")[0],
                                        prix: data[i].fields.prix_valeur,
                                        nom: data[i].fields.prix_nom
                                    }
                                ]
                            })
                        }            
                    }
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