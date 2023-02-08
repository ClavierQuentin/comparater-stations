import { setCard, setMap } from "../../utils.js";

const favorisPage = {
    generate : () =>{
        setFetch('server/actions/favoris/favorisReq.php', "GET")   
        .then((res) => {
            if(res.ok){
                return res.json();
            }
        })
        .then((response) => {
            for(let i = 0; i < response.length;i++){
                response[i].essences = JSON.parse(response[i].essences)
            }
            const main = document.querySelector('main');
            main.innerHTML = setCard(response, true);
            var map = L.map('map').setView([51.505, -0.09], 13);
            setMap(map, response);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export default favorisPage;