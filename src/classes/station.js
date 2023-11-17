class GasStation {
    constructor(data) {
        this.id = data.id;
        this.cp = data.cp;
        this.prix = this.parsePrices(data.prix);
        this.ville = data.ville;
        this.geom = data.geom;
        this.carburants_indisponibles = this.parseCarburants(data.carburants_indisponibles);
        this.carburants_disponibles = this.parseCarburants(data.carburants_disponibles);
        this.adresse = data.adresse;
    }

    parsePrices(pricesString) {
        if(pricesString){
            const pricesArray = JSON.parse(pricesString);
            if(pricesArray.length > 0){
                return pricesArray.map(price => ({
                    nom: price["@nom"],
                    id: price["@id"],
                    maj: this.formatDate(price["@maj"]),
                    valeur: price["@valeur"]
                }));        
            }else{
                return pricesArray;
            }
        }else{
            return [];
        }
    }
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        };

        return date.toLocaleString("en-GB", options);
    }
    parseCarburants(carburantsString) {
        if(carburantsString){
            return carburantsString.split(";").map(carburant => carburant.trim());
        }else{
            return "NC";
        }
    }
}

export default GasStation;