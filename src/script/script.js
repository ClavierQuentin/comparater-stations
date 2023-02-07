const recupKeyEvent = (e) =>{
    e=e || window.event;
    if(e.keyCode == "13"){
       validateForm();
    }
}


//_________________________________________________________________________
// fonctions pour les TOAST
//_________________________________________________________________________
// Fonction allant chercher les messages du la réponse json et les affiches
function displayAllMessage(retour){
    for(let i=0; i<retour._MESSAGES.length; i++){
        toastGenerator(retour._MESSAGES[i]._TITRE, retour._MESSAGES[i]._MESSAGE, retour._MESSAGES[i]._TYPE, 10000);
    }
}

//_________________________________________________________________________
function toastGenerator( contenu,timeout){
    let toaster = document.getElementById("toastContainer");
    // on fabrique un toast dans le container de toast (toaster)
    let myToast = document.createElement("div");
    myToast.classList.add("toast", "align-items-center",  "text-black", "border-0");
    myToast.role = "alert";
    myToast.ariaLive="assertive";
    myToast.ariaAtomic="true";
    
    let myToastH = document.createElement("div");
    myToastH.classList.add("toast-header");
    myToast.appendChild(myToastH);

    let btClose = document.createElement("button");
    btClose.classList.add("btn-close");
    // quand on clique sur le bouton on détruit
    btClose.addEventListener("click", function(){
        myToast.remove();
    });
    myToastH.appendChild(btClose);
    // on fabrique la div de contenu uniquement si il y en a à afficher
    if(contenu !== ""){
        let myToastB = document.createElement("div");
        myToastB.classList.add("toast-body");
        myToastB.textContent = contenu;
        myToast.appendChild(myToastB);
    }

    // on ajoute un toast au toaster
    toaster.appendChild(myToast);
    // on l'affiche
    var ttLeToaster = bootstrap.Toast.getOrCreateInstance(myToast) // Returns a Bootstrap toast instance
    ttLeToaster.show();

    // permet de nettoyer le html afin que les toasts ne ce cumule pas
    try{
        // dans un try car si l'utilisateur clique sur supprimer, cela genere une erreur
        setTimeout(function(){
            myToast.remove();
        }, timeout);
    }catch{

    }
    
}

const setFetch = (url, method, data = false) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let init = {
        method: method,
        headers:headers,
        mode: "cors",
        cache: "default",
    };
    if(data){
        init.body = data;
    }

     return fetch(url, init);
    
}

const registerFavori = (item) => {
    let data = `id=${item.id}`;
    data += `&ville=${item.ville}`;
    data += `&adresse=${item.adresse}`;
    data += `&geom1=${item.geom1}`;
    data += `&geom2=${item.geom2}`;
    data += `&essence=${JSON.stringify(item.essences)}`;
    setFetch("server/fav.php", "POST", data)
    .then((res)=>{
        if(res.ok){
            return res.json();
        }
    })
    .then((response) => {
        toastGenerator(response.Message, 5000);
        if(response.status == "200"){
            let starsIcons = document.getElementsByClassName('star');

            Array.from(starsIcons).forEach(star => {
                if(item.id == star.getAttribute('data-id')){
                   star.childNodes[1].childNodes[3].classList.add('background_yellow');
                }
            })
        }
    })
    .catch((err) => {
        console.log(err);
    })

}

const delFavori = (a) => {
    let data = "id="+a;
    setFetch("server/delete.php", "POST", data)
    .then((res)=>{
        if(res.ok){
            return res.text();
        }
    })
    .then((response) => {
        console.log(response);
        location.reload();
        
    })
    .catch((err) => {
        console.log(err);
    })
}
