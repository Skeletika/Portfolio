// Fonction pour charger le header
// window.location.href
function loadHeaderFooter() {
    if(window.location.href.includes("github")){
        fetch('header-git.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        })
        .catch(error => console.error('Erreur lors du chargement du header:', error));
    }
    else{
        fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        })
        .catch(error => console.error('Erreur lors du chargement du header:', error));
    }
    fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Erreur lors du chargement du footer:', error));
}
// Charger le header une fois la page chargée

// document.addEventListener('scroll', function(){
//     let scrollY = window.scrollY;
// });


function anim_scroll() {
            let elementFonduGauche = document.querySelectorAll('.fg-enter-anim');
            let elementFonduHaut = document.querySelectorAll('.fh-enter-anim');
            let elementFonduDroite = document.querySelectorAll('.fd-enter-anim');
            let elementCompetence = document.querySelectorAll('.h-competence-anim');
            let elementComptenceLegend = document.querySelectorAll('.fondu');

            elementFonduGauche.forEach(function(elementFonduGauche) {
                let position = elementFonduGauche.getBoundingClientRect();
                if((position.top <= window.innerHeight - 50) && (position.bottom >= -100)) {
                    elementFonduGauche.classList.add('anim-fg-E');
                }
                else{
                    elementFonduGauche.classList.remove('anim-fg-E');
                };
            });            
            elementComptenceLegend.forEach(function(elementComptenceLegend){
                let position = elementComptenceLegend.getBoundingClientRect();
                if((position.top <= window.innerHeight - 50) && (position.bottom >= -100)){
                    elementComptenceLegend.classList.add('anim-fondu');
                }
                else{
                    elementComptenceLegend.classList.remove('anim-fondu');
                }
            });
            elementCompetence.forEach(function(elementCompetence){
                let position = elementCompetence.getBoundingClientRect();
                if((position.top <= window.innerHeight - 50) && (position.bottom >= -100)){
                    elementCompetence.classList.add('anim-competence-E');
                }
                else{
                    elementCompetence.classList.remove('anim-competence-E');
                };
            }); 
            elementFonduHaut.forEach(function(elementFonduHaut){
                let position = elementFonduHaut.getBoundingClientRect();
                if((position.top <= window.innerHeight - 50) && (position.bottom >= -100)){
                    elementFonduHaut.classList.add('anim-fh-E');
                }
                else{
                    elementFonduHaut.classList.remove('anim-fh-E');

                };
            });
            elementFonduDroite.forEach(function(elementFonduDroite){
                let position = elementFonduDroite.getBoundingClientRect();
                if((position.top <= window.innerHeight - 50) && (position.bottom >= -100)){
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

function scrollToSection(ancreId) {
    let section = document.getElementById(ancreId);
    section.scrollIntoView({
        behavior: "smooth",  // Animation fluide
    });
}

function redirectToPageExterne(event, pageName){
    event.preventDefault();
    let transition = document.getElementById("transition");
    transition.classList.add("transition-page-enter");
    transition.style.display = "flex";
    setTimeout(() => {
        window.open(pageName, '_blank');
    }, 700);
}

function redirectToPage(event, pageName, ancreId) {
    event.preventDefault();
    const ancreElement = document.getElementById(ancreId);
    if (ancreElement) {
        // L'ancre existe dans la page actuelle
        scrollToSection(ancreId);
    }
    else{
        const url = pageName; // currentTarget pour choisir l'element de lien et pas d'autre comme img
        fetch(url)
        .then(res => res.text())
        .then(html => {
          // Créer un document temporaire
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

          // Extraire le nouveau contenu
            const newContent = doc.querySelector('#main-content').innerHTML;

            let transition = document.getElementById("transition");
            transition.classList.add("transition-page-enter");
            transition.style.display = "flex";
            setTimeout(() => {
                document.querySelector('#main-content').innerHTML = newContent;
                if(ancreId){
                    scrollToSection(ancreId); //scroll vers l'ancre demandée
                }
                let mod = document.getElementById('mod');
                if(mod.checked == true){
                    lightModeImage();
                    darkModeImage();
                    }
                transition.classList.remove("transition-page-enter");
                transition.classList.add("transition-page-exit");
                }, 700);
        
        anim_scroll(); // Actualisation du contenu animé
    });
    }
}

function showAbout(event, filter){

    let buttonActive = document.querySelectorAll('span button');
    buttonActive.forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.toggle('active');

    let elements = document.querySelectorAll('.about-content > .about, .about-content > .activity, .about-content > .passions, .about-content > .others');

    elements.forEach(element => {
        if(element.classList.contains(filter)){
            element.classList.remove('hidden');
        }
        else{
            element.classList.add('hidden');
        }
    })
}

function search(event, filter){

    let buttonActive = document.querySelectorAll('span button');
    buttonActive.forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.toggle('active');

    let visible = document.querySelectorAll(filter);
    let notVisible = document.querySelectorAll('.item-projets');
    notVisible.forEach(element => {
        element.classList.add('hidden');
    });
    visible.forEach(element => {
        element.classList.toggle('hidden');
    });
}

function resetFilter(){
    let buttonActive = document.querySelectorAll('.span button');
    buttonActive.forEach(button => {
        button.classList.remove('active');
    });
    let notVisible = document.querySelectorAll('.item-projets');
    notVisible.forEach(element => {
        element.classList.remove('hidden');
    });
}

function showProjet(id){
    let container = document.getElementById('info-projet');
    let projet = document.getElementById(id);
    let rightContent = document.querySelector('.right');
    let leftContent = document.querySelector('.left');

    let title = projet.querySelector('.info .info-title').textContent;
    let text = projet.querySelector('.info .info-content').textContent;
    let software = projet.querySelector('.info .info-software').textContent;
    let button = projet.querySelector('.info a');
    let images = projet.querySelectorAll('.info img');
    let videos = projet.querySelectorAll('.info video');
    
    let titre = document.createElement('h3');
    titre.textContent = title;
    rightContent.appendChild(titre);

    let texte = document.createElement('p');
    texte.textContent = text;
    rightContent.appendChild(texte);

    let logiciel = document.createElement('p');
    logiciel.textContent = software;
    rightContent.appendChild(logiciel);

    if (button){
    let lien = document.createElement('a');
    lien.classList.add('cv');
    lien.textContent = button.textContent;
    lien.setAttribute("href", button.getAttribute("href"));
    lien.setAttribute("target", button.getAttribute("target"));
    rightContent.appendChild(lien);
    }
    videos.forEach(video => {
        let vid = document.createElement('video');
        video.currentsrc = vid.src; 
        leftContent.appendChild(video);
    });

    images.forEach(image => {
        let img = document.createElement('img');
        img.src = image.src;
        leftContent.appendChild(img);
    });
    container.style.display = "flex";

    let blur = document.getElementById("blur");
    blur.style.display = "flex";
}

function closeProjet(){
    let container = document.getElementById('info-projet');
    container.style.display = "none";
    
    let content = document.querySelector('.content');
    content.querySelectorAll("*").forEach(element => {
        // Supprime les images
        element.querySelectorAll("img").forEach(img => img.remove());

        element.querySelectorAll("video").forEach(video => video.remove());
        
        // Supprime les titres
        element.querySelectorAll("h3").forEach(title => title.remove());
        // Supprime les paragraphes
        element.querySelectorAll("p").forEach(paragraph => paragraph.remove());

        element.querySelectorAll("a").forEach(lien => lien.remove());
    });
    
    let blur = document.getElementById("blur");
    blur.style.display = "none";
}
// [#0BB7DB, #B8EAEC, #FFFFFF, #FFFFFF, #000000, #5FB0BB, #FFFFFF00, #0000007F]
// color #0BB7BD --> #030a4f MainColor
// color #B8EAEC --> #000000 SecondColor
// color #FFFFFF --> #1d1d1d ThirdColor
// color #FFFFFF --> #000000 InverseColorWtoB
// color #000000 --> #FFFFFF InverseColorBtoW
// color #5FB0BB --> #030a4f ColorOne
// color #FFFFFF --> #252D7A TitleColor
// transparent #FFFFFF --> #FFFFFF00 ColorWtoTransparent
// shadow #0000007F --> #FFFFFF7F ColorShadow

function changeColor() {
    let mod = document.getElementById('mod');
    if (mod.checked == true) {
        darkMode();
    }
    else{
        lightMode();
    }
}

function darkMode(){
    document.documentElement.style.setProperty('--MainColor', '#030a4f');
    document.documentElement.style.setProperty('--SecondColor', '#000000');
    document.documentElement.style.setProperty('--ThirdColor', '#1d1d1d');
    document.documentElement.style.setProperty('--InverseColorWtoB', '#000000');
    document.documentElement.style.setProperty('--InverseColorBtoW', '#FFFFFF');
    document.documentElement.style.setProperty('--ColorOne', '#030a4f');
    document.documentElement.style.setProperty('--ColorWtoTransparent', '#FFFFFF00');
    document.documentElement.style.setProperty('--ColorShadow', '#FFFFFF7F');
    document.documentElement.style.setProperty('--TitleColor', '#252D7A');
    darkModeImage();
};

function lightMode(){
    document.documentElement.style.setProperty('--MainColor', '#0BB7BD');
    document.documentElement.style.setProperty('--SecondColor', '#B8EAEC');
    document.documentElement.style.setProperty('--ThirdColor', '#FFFFFF');
    document.documentElement.style.setProperty('--InverseColorWtoB', '#FFFFFF');
    document.documentElement.style.setProperty('--InverseColorBtoW', '#000000');
    document.documentElement.style.setProperty('--ColorOne', '#5FB0BB');
    document.documentElement.style.setProperty('--ColorWtoTransparent', '#FFFFFF');
    document.documentElement.style.setProperty('--ColorShadow', '#FFFFFF7F');
    document.documentElement.style.setProperty('--TitleColor', '#FFFFFF');
    lightModeImage()
};

function darkModeImage(){
    let images = document.querySelectorAll('.darkmod');
    images.forEach(image => {
        let bgImage = window.getComputedStyle(image).backgroundImage; // Récupère le background-image
        if(bgImage !== 'none'){
            // Sépare le nom de fichier et l'extension
            let lastDotIndex = bgImage.lastIndexOf(".");
            let newBgImage = bgImage.slice(0, lastDotIndex) + "-dark" + bgImage.slice(lastDotIndex);
            image.style.backgroundImage = newBgImage; // Applique la nouvelle image de fond
        }
        else{
            let src = image.src;
            // Sépare le nom de fichier et l'extension
            let lastDotIndex = src.lastIndexOf(".");
            let newSrc = src.slice(0, lastDotIndex) + "-dark" + src.slice(lastDotIndex);
            image.src = newSrc; // Applique la nouvelle source
        }
    });
}

function lightModeImage(){
    let images = document.querySelectorAll('.darkmod');
    images.forEach(image => {
        let bgImage = window.getComputedStyle(image).backgroundImage; // Récupère le background-image
        if(bgImage !== 'none'){
            let newBgImage = bgImage.replace("-dark","");
            image.style.backgroundImage = newBgImage; // Applique la nouvelle image de fond
        }
        else{
            let src = image.src; 
            let newSrc = src.replace("-dark","");
            image.src = newSrc; // Applique la nouvelle source
        }
    });
}