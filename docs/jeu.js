//Déclaration des varibles du jeu
tab = [0,0,0,0,0,0,0,0,0]; //tableau qui va contenir les valeur 0 ou 1 ou 2 selon les cases remplit : 0 = vide, 1 = croix, 2 = rond
let nbTour = 0;
let solution = [] ; //tableau des case gagante en cas de victoire

function reset(){
    nbTour = 0;
    solution = [];
    tab = [0,0,0,0,0,0,0,0,0];
    document.querySelectorAll('span[id]').forEach(back => {
        back.style.backgroundImage = "none";
        back.style.backgroundColor = "goldenrod";
        back.classList.remove("disabled");
    });
}

function play(event){
    let span = event.target; // Récupère l'élément <span> cliqué

    let tour = choix();
    let image = tour[0]; // le renvoie est un tabelau contenant le src de l'image/ le numéro de la case/ le status du jeu
    span.style.backgroundImage = `url("${image}")`;
    span.classList.add(tour[1] == 1 ? "croix" : "rond");
    span.classList.add("disabled"); // empeche le joueur de rejouer sur une même case

    tab[parseInt(span.id)] = (tour[1]); // met à jour le tableau avec la valeur du joueur (1 ou 2)
    
    if(nbTour >= 5){
        let verif = row(tab) || col(tab) || diag(tab); // vérifie si le joueur a gagné

        if(verif){
            document.querySelectorAll(`span[id='${solution[0]}'], span[id='${solution[1]}'], span[id='${solution[2]}']`).forEach(spanG => {
                spanG.style.backgroundColor = "green"; // Exemple : fond jaune
            });
            console.log("vainqueur");
            return overlay(tour[1]);
        }
        else if (tour[2] == "fin"){
            console.log("match null");
            return overlay(tour[2]);
        }
    }
}


function choix(){           //changement de joueur entre chaque tour (rond/croix)
    nbTour++;
    last = "";
    if(nbTour == 9)
        {last = "fin";}       // dernier tour
    if (nbTour % 2 == 0){
        return ["images/croix.png",2, last];
    }
    else {
        return ["images/rond.png",1,last];
    }
};

// tab = [0,1,0,1,0,1,0,0,0]; //gg row  //def col
// tabd = [1,1,1,0,1,1,0,0,1]; //gg row //gg col
// tabt = [1,1,0,0,1,1,0,1,0]; //def row //gg col
// tabq = [0,0,1,0,0,1,1,1,1]; //gg row //gg col

// tabaz = [1,0,0,0,1,0,0,0,1]; //gg diag
// tabaa = [0,0,1,0,1,0,1,0,0]; //gg diag
// rien = [0,0,1,0,1,0,0,1,0]; //def diag

function row(tab){      //fonction qui vérifie si une ligne est gagnante
    let count = 1;
    for (let i = 0; i < tab.length ; i = i+3){
        if (tab[i] == tab[i+1] && tab[i] == tab[i+2] && tab[i] != 0){
            solution = [i, i+1, i+2];
            return true;
        }
    }
    return false;
}

function col(tab){    //fonction qui vérifie si une colonne est gagnante
    for (let i = 0; i < tab.length ; i++){
        if (tab[i] == tab[i+3] && tab[i] == tab[i+6] && tab[i] != 0){
            solution = [i,i+3,i+6]; // on stocke les cases gagnantes
            return true;
        }
    }
    return false;
}

function diag(tab){     //fonction qui vérifie si une diagonale est gagnante
    let center = tab[4];
    if(center != 0){
        if(tab[0] == center && center == tab[8]){
            solution = [0,4,8];
            return true;
        }
        if(tab[2] == center && center == tab[6]){
            solution = [2,4,6];
            return true;
        }
    }
    return false;
}

function overlay(statue){
    document.querySelectorAll('span[id]').forEach(back => {
        back.classList.add("disabled");
    });

    let aff = document.getElementById("statue");
    console.log(aff);
    aff.querySelector("h4").textContent = (statue == "fin") ? "Match nul ! Vous avez tout les deux bien joués !" : `Bien joué,  joueur ${statue} , Tu as Gagné` ;
    aff.style.display = "flex";
}

function closeOverlay(event){
    let element = event.target;
    let parent = element.parentElement ;
    parent.style.display = "none";
}
