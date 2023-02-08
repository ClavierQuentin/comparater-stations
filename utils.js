
const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split("/");
    return{
        page: request[1],
        destination: request[2],
        id: request[3]
    } ;
}


const sortBySmaller = (array) =>{
    array.sort(function (a,b){        
        if(a < b){            
            return -1        
        }else if(a == b){            
            return 0        
        } else {            
            return 1        
        }    
    });
};


const deleteCard = () =>{
    let btn = document.getElementsByClassName('button');
    let cardArray = [];
    Array.from(btn).forEach(btn=>
        btn.addEventListener('click', () => {
            sessionStorage.getItem('liste') ? cardArray = JSON.parse(sessionStorage.getItem('liste')) : cardArray = [];
            const exist = cardArray.find(x => x.id == btn.id);
            if(exist){
                for(let i = 0; i < cardArray.length; i++){
                    if(cardArray[i].id == btn.id){
                        cardArray.splice(i,1);
                    }
                }
            }
            sessionStorage.setItem('liste', JSON.stringify(cardArray));
            comparaisonPage.generate();
        })
    )
}

const  getIcon = () => {
    let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 140"><path style="fill:blue" fill-rule="evenodd" d="M52 0a52 52 0 0 1 52 52c0 12.7-11 32-21.7 48-6.6 10-14.4 22-23.6 36.4a8 8 0 0 1-13.4 0A1953 1953 0 0 0 21.5 100C11.5 85.2 0 64.8 0 52A52 52 0 0 1 52 0zm0 32a21 21 0 1 0 0 42 21 21 0 0 0 0-42z"/></svg>'
    let iconUrl = 'data:image/svg+xml;base64,' + btoa(svg);
    let myIcon = L.icon({
            iconUrl: iconUrl,
            iconSize :[35, 35]
    });
    
    return myIcon;
}

const getMarkers = (array, map) =>{
    var allMarkers = null; // Pour layer

    if (allMarkers!=null) { // si il y'a deja des marqueurs
        allMarkers.clearLayers();
    }

    allMarkers = new L.LayerGroup();

    var LatLngs = new Array();

    for(let i = 0; i < array.length; i++){
        var point_lat = array[i].geom1;
        var point_lng = array[i].geom2;
        var myIcon = getIcon(); 
        let id = array[i].id
        var point = L.marker([point_lat, point_lng], {icon: myIcon, id: id }).addTo(allMarkers).addTo(map);

        // Ajout du layer a la carte
        map.addLayer(allMarkers);

        // Pour Popup
        var contentPopup = "<h4 class='titre_popups'>" + array[i].adresse + "</h4>";
        contentPopup += "<div class='content_popups'><ul>";
        contentPopup +=  array[i].essences.map(essence=>
            `
        <li>Type : ${essence.nom}</li>
        <li>Prix : ${essence.prix} €</li>
        <li><span class="list_maj">Dernière mise à jour le ${essence.maj}</span></li>
            `
            ).join("")
        contentPopup += '</ul></div>'
        
        point.bindPopup(contentPopup);

        // Pour recentrage automatique
        LatLngs.push([point_lat, point_lng]); //remplissage du tableau avec lattitude / longitude des marqueurs    
    }//FIn for
    var bounds = L.latLngBounds(LatLngs);
    map.fitBounds(bounds);
};//Fin fonction getMArker


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


const beginningRequestUrl = "https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-carburants-fichier-instantane-test-ods-copie&q=&lang=js&facet=id&facet=adresse&facet=ville&facet=prix_maj&facet=prix_nom&facet=com_arm_name&facet=epci_name&facet=dep_name&facet=reg_name&facet=services_service&facet=horaires_automate_24_24";


const setMap = (map, array) => {
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

}

const getSvg = (item) => {
    return `
        <svg data-id="${item.id}"  class = "star" version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
            <g>
                <path class="border" fill="" d="M50.538,63.991c-0.332,0-0.666-0.082-0.969-0.25l-17.571-9.717l-17.571,9.717    c-0.67,0.373-1.496,0.326-2.121-0.115s-0.945-1.201-0.822-1.955l3.379-20.706L0.569,26.308c-0.523-0.537-0.703-1.32-0.465-2.031    s0.854-1.229,1.594-1.342l19.674-3.006L30.188,1.15C30.518,0.447,31.223,0,31.998,0s1.48,0.447,1.811,1.15l8.815,18.778    l19.675,3.006c0.74,0.113,1.355,0.631,1.594,1.342s0.059,1.494-0.465,2.031L49.134,40.965l3.379,20.706    c0.123,0.754-0.197,1.514-0.822,1.955C51.347,63.868,50.942,63.991,50.538,63.991z M31.998,49.739c0.334,0,0.666,0.084,0.969,0.25    l14.935,8.258l-2.879-17.634c-0.102-0.627,0.1-1.264,0.543-1.719L57.847,26.3l-16.884-2.578c-0.658-0.1-1.225-0.523-1.508-1.127    L31.998,6.708l-7.457,15.887c-0.283,0.604-0.85,1.027-1.508,1.127L6.149,26.3l12.282,12.595c0.443,0.455,0.645,1.092,0.543,1.719    l-2.879,17.634l14.935-8.258C31.332,49.823,31.664,49.739,31.998,49.739z"/>
                <path class="background" fill="" d="M31.998,49.739c0.334,0,0.666,0.084,0.969,0.25l14.935,8.258l-2.879-17.634    c-0.102-0.627,0.1-1.264,0.543-1.719L57.847,26.3l-16.884-2.578c-0.658-0.1-1.225-0.523-1.508-1.127L31.998,6.708l-7.457,15.887    c-0.283,0.604-0.85,1.027-1.508,1.127L6.149,26.3l12.282,12.595c0.443,0.455,0.645,1.092,0.543,1.719l-2.879,17.634l14.935-8.258    C31.332,49.823,31.664,49.739,31.998,49.739z"/>
            </g>
    </svg>
    `
}

const setCard = (array, isFavori = false) => {
        return `
            <div class="row gx-0">
            <div class = "liste col-12 col-md-6">
                <div class = "row gx-0">
                    ${array.map(item=>
                        `
                    <div class="col-6 col-md-3 p-2">
                        <div class="card bg-light items" id="${item.id}" data-lat="${item.geom1}" data-lng ="${item.geom2}">
                            <div class="card-body">
                                ${!isFavori? getSvg(item) : `<button data-id="${item.id}" onclick="delFavori(${item.id})" class='deleteBtn btn btn-danger'>X</button>`}                                                                                              
                                <h5 class="card-title m-1">${item.ville}</h5>
                                <p>${item.adresse}</p>
                                <ul class="listeEssence">
                                    ${item.essences.map(essence=>
                                        `
                                    <li><span class="underline">Type:</span> ${essence.nom}</li>
                                    <li><span class="underline">Prix:</span> ${essence.prix} €</li>
                                    <li><span class="list_maj">Dernière mise à jour le ${essence.maj}</span></li>
                                        `
                                        ).join("")}
                                </ul>

                            </div>
                        </div>
                    </div>
                `
            ).join("")}
                </div>
            </div>
                
            <div class = "col-12 col-md-6 carte">
                    <div id="map"></div>
            </div>
        </div>
        `
}

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

const getDataFromFetch = (data) => {
    let array = [];
    for(let i = 0; i < data.length; i++){
        let ville = (data[i].fields.ville).toLowerCase();
        ville = ville.charAt(0).toUpperCase() + ville.slice(1); 
        let isTrue = false;
        for(let j = 0; j < array.length; j++){
            if(array[j].adresse == data[i].fields.adresse){
                isTrue = true;
                array[j].essences.push(essenceDetails(data[i]))
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
                essences:[essenceDetails(data[i])]
            })
        }
    }
    return array;
}


export { parseRequestUrl, sortBySmaller , deleteCard, getIcon, getMarkers, getCookie, beginningRequestUrl, setMap, setCard, getDataFromFetch };