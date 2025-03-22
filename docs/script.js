// Fonction pour charger le header
function loadHeaderFooter() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        })
        .catch(error => console.error('Erreur lors du chargement du header:', error));

    fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Erreur lors du chargement du footer:', error));
}

document.addEventListener('scroll', function(){
    let scrollY = window.scrollY;
    console.log(scrollY);
});
// Charger le header une fois la page chargée

function anim_scroll() {
            let elementFonduGauche = document.querySelectorAll('.fg-enter-anim');
            let elementFonduHaut = document.querySelectorAll('.fh-enter-anim');
            let elementFonduDroite = document.querySelectorAll('.fd-enter-anim');
            let elementCompetence = document.querySelectorAll('.h-competence-anim');
            let elementComptenceLegend = document.querySelectorAll('.fondu');

            elementFonduGauche.forEach(function(elementFonduGauche) {
                let position = elementFonduGauche.getBoundingClientRect();
                if((position.top <= window.innerHeight - 50) && (position.bottom >= -50)) {
                    elementFonduGauche.classList.add('anim-fg-E');
                }
                else{
                    elementFonduGauche.classList.remove('anim-fg-E');
                };
            });            
            elementComptenceLegend.forEach(function(elementComptenceLegend){
                let position = elementComptenceLegend.getBoundingClientRect();
                if((position.top <= window.innerHeight - 50) && (position.bottom >= -50)){
                    elementComptenceLegend.classList.add('anim-fondu');
                }
                else{
                    elementComptenceLegend.classList.remove('anim-fondu');
                }
            });
            elementCompetence.forEach(function(elementCompetence){
                let position = elementCompetence.getBoundingClientRect();
                if((position.top <= window.innerHeight - 50) && (position.bottom >= -50)){
                    elementCompetence.classList.add('anim-competence-E');
                }
                else{
                    elementCompetence.classList.remove('anim-competence-E');
                };
            }); 
            elementFonduHaut.forEach(function(elementFonduHaut){
                let position = elementFonduHaut.getBoundingClientRect();
                if((position.top <= window.innerHeight - 50) && (position.bottom >= -50)){
                    elementFonduHaut.classList.add('anim-fh-E');
                }
                else{
                    elementFonduHaut.classList.remove('anim-fh-E');

                };
            });
            elementFonduDroite.forEach(function(elementFonduDroite){
                let position = elementFonduDroite.getBoundingClientRect();
                if((position.top <= window.innerHeight - 50) && (position.bottom >= -50)){
                    elementFonduDroite.classList.add('anim-fd-E');
                }
                else{
                    elementFonduDroite.classList.remove('anim-fd-E');
                };
            });

            
        };

// Chargement du document //
document.addEventListener('DOMContentLoaded', function(){
    loadHeaderFooter(); 
    anim_scroll();
});

document.addEventListener('scroll', anim_scroll);



function scrollToSection(event, ancreId) {

    let section = document.getElementById(ancreId);
    section.scrollIntoView({
        behavior: "smooth",  // Animation fluide
    });
}

function redirectToPage(event, pageName, ancreId) {
    console.log(window.location.pathname);
    event.preventDefault();
    if(window.location.pathname === pageName){            // si on est déjà dans la page
        scrollToSection(event,ancreId);
    }
    else{
    let transition = document.getElementById("body");
    transition.classList.add("page-transition");

    let newTexte = document.createElement("h1");
    newTexte.classList.add("redirection");
    newTexte.textContent = "Voyage..";
    transition.appendChild(newTexte);

    let placementTop = 2;
    let placementLeft = -10 ;
    let colomun = 0;
    let Delay = 0;

    for (let i = 0; i < 100; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("nuage");

        Delay += 70;

        colomun++
        if(colomun == 15) {
            placementTop += 20 ;
            placementLeft = -10;
            Delay = 70;
            colomun = 0;
        };

        newDiv.style.animationDelay = Delay + "ms";
        newDiv.style.left = placementLeft + "%";
        newDiv.style.top = placementTop + "%";

        placementLeft += 10;

        transition.appendChild(newDiv);       
    }

    setTimeout(() => {
        window.location.href = pageName + "#" + ancreId;
    }, 2200); // ms
    };
}


function showProjet(id){
    let container = document.getElementById('info-projet');
    let projet = document.getElementById(id);
    let rightContent = document.querySelector('.right');
    let leftContent = document.querySelector('.left');

    let title = projet.querySelector('.info .info-title').textContent;
    let text = projet.querySelector('.info .info-content').textContent;
    let software = projet.querySelector('.info .info-software').textContent;
    let images = projet.querySelectorAll('.info img');
    
    let titre = document.createElement('h3');
    titre.textContent = title;
    rightContent.appendChild(titre);

    let texte = document.createElement('p');
    texte.textContent = text;
    rightContent.appendChild(texte);

    let logiciel = document.createElement('p');
    logiciel.textContent = software;
    rightContent.appendChild(logiciel);

    images.forEach(image => {
        let img = document.createElement('img');
        img.src = image.src;
        leftContent.appendChild(img);
    });

    container.style.display = "flex";
}

function closeProjet(){
    let container = document.getElementById('info-projet');
    container.style.display = "none";
    
    let content = document.querySelector('.content');
    content.querySelectorAll("*").forEach(element => {
        // Supprime les images
        element.querySelectorAll("img").forEach(img => img.remove());
        // Supprime les titres
        element.querySelectorAll("h3").forEach(title => title.remove());
        // Supprime les paragraphes
        element.querySelectorAll("p").forEach(paragraph => paragraph.remove());
    });

}