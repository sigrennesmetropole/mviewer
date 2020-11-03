  var carousel = (function() {
    
    // Fenetre de consultation des images (avec carousel)
    function _getpopupslide(idSlider, posSlide){
        
        var premiernumSlide="";
        var codeHTML="";
        
        var aRecuperer=document.getElementById(idSlider).getElementsByClassName("slick-slide");
        var numPhoto=1;
        for (var i = 0, len = aRecuperer.length; i < len; i++ ) {
            if (aRecuperer[i].getAttribute("role") && aRecuperer[i].getAttribute("role")=="tabpanel"){
                let src = aRecuperer[i].querySelectorAll('img')[0].src;
                let datasource = aRecuperer[i].querySelectorAll('img')[0].getAttribute('data-sources');
                let credit = aRecuperer[i].querySelector('.text-credit').innerHTML;
                codeHTML +="<div style='height: 100%;'>";
                codeHTML +="<a class='img_downld' href='"+ src + "' download>Télécharger l'image</a>";
                codeHTML +="<center style='height: 90%;'><img id='car_photo"+ numPhoto +"' class='car_photo' src='" + src + "'  data-sources='"+ datasource + "' />";
                codeHTML +="<span class='text-credit car-text-credit'>" + credit + "</span></center>";
                codeHTML +="</div>";
                numPhoto++;
            }
        }
        
        $("#car-slideauto")[0].innerHTML=codeHTML;
        
        $("#carousel-modal").on("hidden.bs.modal", function () {
            $('.slide-car').slick('unslick');
            if($('.modal-backdrop').length > 0){
                $('.modal-backdrop')[$('.modal-backdrop').length-1].remove();
            }
        });
        
        $("#carousel-modal").modal("toggle");
        
        $("#car-slideauto").ready(function(){
            setTimeout(function(){  
                $('.slide-car').slick({
                    dots:true,
                    arrows:true,
                    slidesToScroll:1,
                    slidesToShow: 1,
                    lazyLoad: 'ondemand',
                    initialSlide: posSlide });
                    
             }, 180);
        });
    }
    

    // Instanciation carousel des fiches d'info
    function rmSlickPhotoCarousel(){
        slick_tab=$("div.slide-feature");
        for (var cpt = 0, len_cpt = slick_tab.length; cpt < len_cpt; cpt++) {
            var carousel = slick_tab[cpt];
            var carousel_cls = carousel.classList[1];
            $('.'+carousel_cls).slick({
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                infinite: true,
                arrows : true,
                autoplaySpeed:2000,
                centerMode: true,
                variableWidth: true,
                centerPadding: '60px',
                lazyLoad: 'ondemand'
          });
        }
    }


    // MAJ icone de couleur catégorie de projet
    function rmCategorieProjUrbain() {
        // utilisation de font awesome
        pj_tab=$("#p_categ > i");
        for (var cpt = 0, len_cpt = pj_tab.length; cpt < len_cpt; cpt++) {
            valeur = pj_tab[cpt].getAttribute("categorie");
            switch(valeur) {
            case "Espace public":
                pj_tab[cpt].classList.add('marker-categ-vert');
                break;
            case "Projet d'aménagement":
                pj_tab[cpt].classList.add('marker-categ-bleu');
                break;
            default:
                url="";
        }
        }
    }

    // initialisation des événements
    function _init(){
        console.log("mise en place de l'événement");
        var activeTabs;
        var oldTabs;
        jQuery('#right-panel > .popup-content').on("DOMSubtreeModified", function() {
                var l_tabs = $("h4.title-feature");
                activeTabs=[];
                for(var i= 0; i < l_tabs.length; i++){
                    activeTabs.push(l_tabs[i].innerHTML);
                }
                if(!oldTabs || oldTabs.length==0 ||activeTabs.sort().join() != oldTabs.sort().join()){
                    console.log("panneau droit chargé à nouveau");
                    oldTabs =  [].concat(activeTabs);
                    rmCategorieProjUrbain();
                    rmSlickPhotoCarousel();
                }
            });
        jQuery('#modal-panel .popup-content').on("DOMSubtreeModified", function() {
                var l_tabs = $("h4.title-feature");
                activeTabs=[];
                for(var i= 0; i < l_tabs.length; i++){
                    activeTabs.push(l_tabs[i].innerHTML);
                }
                if(!oldTabs || oldTabs.length==0 ||activeTabs.sort().join() != oldTabs.sort().join()){
                    console.log("panneau droit chargé à nouveau");
                    oldTabs =  [].concat(activeTabs);
                    rmCategorieProjUrbain();
                    rmSlickPhotoCarousel();
                }
            });
    }
    
    
    return {
        init:_init,
        getpopupslide:_getpopupslide
    }

})();
//This instruction is only necessary if init function is needed.
//Very important first parameter is customComponent id + '-componentLoaded',
//second parameter is init function to execute
//document.addEventListener('graph3d-componentLoaded', graph3d.init);
new CustomComponent("carousel", carousel.init());