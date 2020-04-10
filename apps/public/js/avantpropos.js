// Get DOM Elements
const apropos = document.querySelector('#a-propos');
//const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.foreword-close');
const didactRecherche = document.querySelector('#didac-recherche');
const didactGauche = document.querySelector('#didac-gauche');
const didactDroite = document.querySelector('#didac-droite');
const didactCarte = document.querySelector('#didac-carte');

// Events
//modalBtn.addEventListener('click', openModal);
if (closeBtn !== null) {
    closeBtn.addEventListener('click', closeModal);
}
window.addEventListener('click', outsideClick);

// Open
function openModal() {
    
    if (localStorage.getItem("NePasAfficher")) {
        //alert('Ne pas afficher le didacticiel');
        apropos.style.display = 'none';
    }else {
        apropos.style.display = 'block';
    }
}

// Close
function closeModal() {
  fermerAPropos();
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target === apropos) { fermerAPropos(); } 
  else if (e.target === didactRecherche && didactRecherche !== null) { fermerDidacRecherche();} 
  else if (e.target === didactGauche && didactGauche !== null) { fermerDidacGauche();} 
  else if (e.target === didactCarte) { fermerDidacCarte();}
  else if (e.target === didactDroite) { fermerDidacDroite();}
}

function fermerAPropos() {
    apropos.style.display = 'none';
    if (didactRecherche !== null) {
        didactRecherche.style.display = 'block';
    }
    if (document.getElementById("neplusafficher").checked){
        localStorage.setItem("NePasAfficher", "true");
    } 
    
}

function fermerDidacRecherche() {
    if (didactRecherche !== null) {
        didactRecherche.style.display = 'none';
    }
    didactGauche.style.display = 'block';    
}

function fermerDidacGauche() {
    if (didactGauche !== null) {
        didactGauche.style.display = 'none';
    }
    didactCarte.style.display = 'block';    
}
function fermerDidacCarte() {
    didactCarte.style.display = 'none';
    didactDroite.style.display = 'block';
}
function fermerDidacDroite() {
    didactDroite.style.display = 'none';  
}


if (apropos === null) {

    if (didactRecherche !== null) {
        didactRecherche.style.display = 'block';
    }

} else if (localStorage.NePasAfficher === "true") {

    apropos.style.display = 'none';

    if (didactRecherche !== null) {
        didactRecherche.style.display = 'block';
    }

}
