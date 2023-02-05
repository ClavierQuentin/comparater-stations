
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
        contentPopup +=  array[i].essence.map(essence=>
            `
        <li>Type : ${essence.nom}</li>
        <li>Prix : ${essence.prix} €</li>
        <li><span class="list_maj">Dernière mise à jour le ${essence.maj}</span></li>
            `
            )
        contentPopup += '</ul></div>'
        
        point.bindPopup(contentPopup);

        // Pour recentrage automatique
        LatLngs.push([point_lat, point_lng]); //remplissage du tableau avec lattitude / longitude des marqueurs

        var bounds = L.latLngBounds([LatLngs]);
        map.fitBounds(bounds);
    }//FIn for
};//Fin fonction getMArker


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


const beginningRequestUrl = "https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-carburants-fichier-instantane-test-ods-copie&q=&lang=js&facet=id&facet=adresse&facet=ville&facet=prix_maj&facet=prix_nom&facet=com_arm_name&facet=epci_name&facet=dep_name&facet=reg_name&facet=services_service&facet=horaires_automate_24_24";


export { parseRequestUrl, sortBySmaller , deleteCard, getIcon, getMarkers, getCookie, beginningRequestUrl };