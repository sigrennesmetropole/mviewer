/**
 * Functions to format the data display on the right panel
 */

    
var formatter = (function () {
    const l_ref_feries = ['jour de l\'An', 'lundi de Pâques', 'fête du Travail', 'Victoire 1945', 'Ascension', 'lundi de Pentecôte', 'fête nationale', 'Assomption', 'Toussaint', 'Armistice 1918', 'Noël'];
    const l_ref_vacances = ['Vacances de la Toussaint', 'Vacances de Noël', 'Vacances d\'hiver', 'Vacances de printemps', 'Vacances d\'été'];

    /**
     *  -- Organizations functions --
     */
    
    /****** Fonctions utiles *******/
    
    // TODO : à vérifier / à déplacer dans RMUtils.js / à commenter
    var getDateFromFrench = function getDateFromFrench(date) {
        var val = date.split("/");
        return new Date(val[2], val[1]-1 , val[0]);
    };

    // TODO : à déplacer dans RMUtils.js
    // sorting on start date 
    var sortByDate = function sortByDate(date1, date2) {
        return (date1[0]-date2[0]);
    };
    
    // TODO : à déplacer dans un fichier RMUtils.js
    // Fonction générique qui retourne les éléments d'une liste A qui ne sont pas dans une liste B
    function getElemANotInListB(listA, listB){
        // elements = copie de la liste A
        var elements=Array.from(listA);

        for (var i = 0, lenB = listB.length; i < lenB; i++) {
            //var match = null;
            for (var j = 0, lenA = elements.length; j < lenA; j++) {
                if (listB[i].toUpperCase().trim() === elements[j].toUpperCase().trim()) {
                    // correspondance, on supprime l'entrée de la copie de la liste A 
                    //match = j;
                    elements.splice(j, 1);
                    break;
                }
            }

        }
        return elements;
    }
    
    
    // Fonctions de formattage
    
    /****** HORAIRES ******/
    
    // Mise en forme des horaires sous forme de liste
    //var _formatHoraires = function formatHoraires() {
    function formatHoraires() {
        var li_tab = document.getElementsByClassName("carousel slide");
        for (var cpt = 0, len_cpt = li_tab.length; cpt < len_cpt; cpt++) {
            var li_elements = li_tab[cpt].getElementsByClassName("horaires");
            var li_ouvert = li_tab[cpt].getElementsByClassName("horaires_ouvert");
            var variations = li_tab[cpt].getElementsByClassName("variationvac");

            if (li_elements.length >0 || li_ouvert.length >0){
                // grille complete
                for (var i = 0, len = li_elements.length; i < len; i++) {
                    var contenu = "<ul><li>";
                    contenu += li_elements[i].innerHTML.replace(/ \/ /g, "</li><li>")
                    if (variations.length > 0) {
                        contenu += "</li><li><i>" + variations[0].innerHTML+"</i>";
                    }
                    contenu += "</li></ul>";
                    li_elements[i].innerHTML = contenu ;
                }
                // grille d'ouvertures
                for (var j = 0, len_j = li_ouvert.length; j < len_j; j++) {
                    /*
                    var contenu = "<ul>";
                    const jours = li_ouvert[j].innerHTML.split(' / ');
                    for (jour_j=0, len_jours = jours.length; jour_j < len_jours; jour_j++){
                        if (jours[jour_j].indexOf("Fermé")===-1){
                            contenu += "<li>"+jours[jour_j]+"</li>";
                        }
                    }
                    
                    if (variations.length > 0) {
                        contenu += "<li><i>" + variations[0].innerHTML+"</i></li>";
                    }
                    contenu += "</ul>";
                    li_ouvert[j].innerHTML = contenu ;
                    */
                    var ligne_h = [];
                    const jours = li_ouvert[j].innerHTML.split(' / ');
                    for (jour_j=0, len_jours = jours.length; jour_j < len_jours; jour_j++){
                        if (jours[jour_j].indexOf("Fermé")===-1){
                            ligne_h.push(jours[jour_j]);
                        }
                    }
                    if (variations.length > 0) {
                        ligne_h.push(variations[0].innerHTML);
                    }
                    var contenu = "<ul>";
                    for (lignej=0, len_lignes=ligne_h.length; lignej < len_lignes; lignej++){
                        contenu += "<li>"+ligne_h[lignej]+"</li>";
                    }
                    contenu += "</ul>";
                    li_ouvert[j].innerHTML = contenu ;
                }
                // non affichage des noeuds inutiles
                for (var k = 0, len_k = variations.length; k < len_k; k++) {variations[k].style.display="none";}   
            } else if (variations.length > 0) {//  cas des variations sans grille horaire définie
                variations[0].innerHTML = "<span class='rm-popup-label'> Horaires :</span>" + variations[0].innerHTML+"<br/>";
            } 
        }
    };
    
    /****** FERMETURES ORGANISMES ******/
    
    // analyse de la liste des jours fériés
    function fermeturesFerie(li_elements){
        var list_retenue=[];
        
        if (li_elements.length === l_ref_feries.length) {
            list_retenue.push("Fermé les jours fériés");
        } else if (li_elements.length > 0) {
            list_retenue.push("Fermé les jours fériés sauf " + getElemANotInListB(l_ref_feries, li_elements.map(Function.prototype.call, String.prototype.trimStart)).join(', '));
        } 
        return list_retenue;
    }
    
    // analyse de la liste des vacances
    function fermeturesVacances(li_elements){
        var list_retenue=[];
        
        if (li_elements.length === l_ref_vacances.length) {
            list_retenue.push ("Fermé pendant les vacances scolaires");
        } else if (li_elements.length > 0) {
            //listException = getElemANotInListB(l_ref_vacances, li_elements);
            if (li_elements.length >= 3) {
                list_retenue.push("Fermé pendant les vacances scolaires sauf " + getElemANotInListB(l_ref_vacances, li_elements).join(', '));
            } else if (li_elements.length > 0) {
                for (var j = 0, len = li_elements.length; j < len; j++) {
                    list_retenue.push(li_elements[j].trimStart());
                }
            }
        } 
        return list_retenue;
    }
    
    
    // Affichage mode réduit des jours fériés et des vacances scolaires pour les organismes
    //var _rmFermeturesOrga = function rmFermeturesOrga() {
    function rmFermeturesOrga() {
        var li_tab = document.getElementsByClassName("carousel slide");
        for (var cpt = 0, len_cpt = li_tab.length; cpt < len_cpt; cpt++) {
        
            var fermetures_html=li_tab[cpt].getElementsByClassName("rm-fermetures")[0];
            var joursfermes = li_tab[cpt].getElementsByClassName("daysOff");
            var comfermeture = li_tab[cpt].getElementsByClassName("comfermeture");


            //for (var i = 0, len_ul = elements.length; i < len_ul; i++) {            
            var li_fermetures = [];    
            if (joursfermes.length > 0) {
                var daysOffInfo = joursfermes[0]; 
            //if (daysOffInfo.trim() == "") {
                var days ;
                if (daysOffInfo.innerHTML.indexOf(':')>0){
                    days = daysOffInfo.innerHTML.trim().split(':')[1]; //retire le préfixe du texte (ex : "Jour ou périodes de fermeture :" )
                } else {
                    days= daysOffInfo.innerHTML;
                }
                var li_fermetures_st = days.split(',');
                var li_feries_st = [];
                var li_vac_st = [];

                // différencier les fériés des vacances scolaires
                for (var j = 0, len_j = li_fermetures_st.length; j < len_j; j++) { 
                    if (li_fermetures_st[j].indexOf("Vacance") > 0){
                        li_vac_st.push(li_fermetures_st[j]);
                    } else {
                        li_feries_st.push(li_fermetures_st[j]);   
                    }
                }

                // Traitement des Jours fériés
                var liste_feries = fermeturesFerie(li_feries_st);
                li_fermetures=li_fermetures.concat(liste_feries);

                // Traitement des Vacances
                var liste_vacs = fermeturesVacances(li_vac_st);
                li_fermetures=li_fermetures.concat(liste_vacs);
            }

            if (comfermeture.length > 0) {
                // traitement du commentaire des fermetures
                li_fermetures.push(comfermeture[0].innerHTML.trimStart());
            }

            // formatage sortie
            var st_html='';
            if (li_fermetures.length === 0) {
                st_html=" - <br/>";
            } else if (li_fermetures.length === 1) {
                st_html= li_fermetures[0]+ "<br/>";
            } 
            else {
                st_html="<br/><ul>"
                //elements[i].innerHTML="<br/><ul>";
                for (var k = 0, len_k = li_fermetures.length; k < len_k; k++) {
                    st_html+="<li>"+li_fermetures[k]+"</li>";
                }
                st_html +="</ul>"
            }
            if (fermetures_html) {
            fermetures_html.innerHTML=st_html;
            //fermetures_html.className='fermetures';
            //fermetures_html.classList.remove('rm-fermetures');
            }

            // non affichage des noeuds inutiles
            for (var i = 0, len_i = joursfermes.length; i < len_i; i++) {joursfermes[i].style.display="none";}
            for (var k = 0, len_k = comfermeture.length; k < len_k; k++) {comfermeture[k].style.display="none";}
        }
    };
    
    
    // TODO : à commenter
    //var _exceptionalClosure = function exceptionalClosure() {
    function exceptionalClosure() {
        var li_tab = document.getElementsByClassName("carousel slide");
        for (var cpt = 0, len_cpt = li_tab.length; cpt < len_cpt; cpt++) {
        
            var elements = li_tab[cpt].getElementsByClassName("exceptionalClosures");
            for (var a = 0; a < elements.length; a++) {
                var closureInfo = elements[a];
                if (closureInfo) {
                    var closures = closureInfo.innerHTML;
                    closureInfo.innerHTML = "";
                    var closure_array = new Array();
                    var all_closures = closures.match(/[^{}]+(?=\})/g);
                    if (all_closures) {
                        for (var i = 0; i < all_closures.length; i++) {
                            var closure = all_closures[i].trim();
                            // splitting closing three parts
                            var elem = closure.split("|");
                            // keep only values, without inverted commas
                            var beg = new Date(elem[0].split(":")[1].replace(/\"/g, ""));
                            var end = new Date(elem[1].split(":")[1].replace(/\"/g, ""));
                            var comment = elem[2].split(":")[1].replace(/\"/g, "").length > 0 ? " : " + elem[2].split(":")[1].replace(/\"/g, "") : "";

                            // keep only ongoing or future closing
                            if (new Date(end) >= Date.now()) {
                                var output = "";
                                if (beg < end) {
                                    output = "<li> Du " + beg.toLocaleDateString() + " au " + end.toLocaleDateString() + comment + "</li>";
                                } else {
                                    output = "<li> Le " + beg.toLocaleDateString() + comment + "</li>";
                                }
                                closure_array.push(new Array(new Date(beg), new Date(end), output));
                            }
                        }

                        // sorting array on start date  
                        closure_array.sort(sortByDate);
                    }

                    //output corresponding string
                    if (closure_array.length > 0) {
                        st_html="<ul>";
                        for (var j = 0; j < closure_array.length; j++) {
                            st_html+= closureInfo.innerHTML + closure_array[j][2];
                        }
                        st_html+="</ul>";
                        closureInfo.innerHTML = st_html;
                    } else {
                        closureInfo.parentElement.classList.add('not-displayed');
                    }
                }
            }
        }
    };
    
    /****** DECHETERIES ******/
    
    // Affichage mode réduit des jours fériés et des vacances scolaires pour les décheteries
    //var _rmFermeturesDecheterie = function rmFermeturesDecheterie() {
    function rmFermeturesDecheterie() {
        
        var li_tab = document.getElementsByClassName("carousel slide");
        for (var cpt = 0, len_cpt = li_tab.length; cpt < len_cpt; cpt++) {


            var ul_element=li_tab[cpt].getElementsByClassName("l_fermetures");

            for (var i = 0, len_ul = ul_element.length; i < len_ul; i++) {            
                var li_fermetures = []; 

                // Cas des jours fériés
                var li_feries = ul_element[i].getElementsByClassName("ferie_true");
                var li_feries_st = [];
                for(var j = 0, len = li_feries.length; j < len; j++){
                    li_feries_st.push(li_feries[j].innerHTML);
                }
                var liste_feries = fermeturesFerie(li_feries_st);
                li_fermetures=li_fermetures.concat(liste_feries);


                // Cas des vacances scolaires
                var liste_vac = fermeturesVacances(ul_element[i].getElementsByClassName("vac_true"), ul_element[i].getElementsByClassName("variationvac_true"));
                li_fermetures = li_fermetures.concat(liste_vac);

                // formatage sortie
                if (li_fermetures.length === 0) {
                    ul_element[i].innerHTML=" - <br/>";
                } else if (li_fermetures.length === 1) {
                    ul_element[i].innerHTML= li_fermetures[0]+ "<br/>";
                } 
                else {
                    ul_element[i].innerHTML="<br/><ul>";
                    for (var k = 0, len_k = li_fermetures.length; k < len_k; k++) {
                        ul_element[i].innerHTML="<li>"+li_fermetures[k]+"</li>";
                    }
                    ul_element[i].innerHTML+="</ul><br/>";

                }
            }
        }
        
    };
    
    // Liste des déchets acceptés dans les décheteries
    //var _rmListeDechets = function rmListeDechets() {
    function rmListeDechets() {
        var ul_element=document.getElementsByClassName("liste_dechets");
        var list_retenue='';
        if (ul_element.length >0){
            var li_elements = ul_element[0].getElementsByClassName("rm_visible_true");
                for (var i = 0, len = li_elements.length; i < len; i++) {
                //alert (li_elements[i].innerHTML);
                    list_retenue +=  "<li>" +li_elements[i].innerHTML+"</li>";
                }
            ul_element[0].innerHTML="<ul>"+list_retenue+"</ul>";
        }
    };
    
    // TODO : à commenter
    function exceptionalClosureDechet() {
        var elements = document.getElementsByClassName("exceptionalClosuresDechet");
        for (var a = 0; a < elements.length; a++) {
            var closureInfo = elements[a];
            if (closureInfo) {
                var closures = closureInfo.innerHTML;
                closureInfo.innerHTML = "";
                var closure_array = new Array();
                var all_closures = closures.trim().split(",");
                for (var i = 0; i < all_closures.length; i++) {
                    var closure_dates = all_closures[i].match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g);
                    var beg = closure_dates[0];
                    var end = closure_dates.length > 1 ? closure_dates[1] : beg;
                    var comment = all_closures[i].split(":").length > 1 ? " : " + all_closures[i].split(":")[1] : "";

                    // keep only ongoing or future closing
                    if (getDateFromFrench(end)>= Date.now()){
                        var output = "";
                        var begFr = getDateFromFrench(beg);
                        var endFr = getDateFromFrench(end)
                        if (begFr < endFr) {
                            output = "- Du " + begFr.toLocaleDateString() + " au " + endFr.toLocaleDateString() + comment + "</br>";
                        } else {
                            output = "- Le " + begFr.toLocaleDateString() + comment + "</br>";
                        }
                        closure_array.push(new Array(begFr, endFr, output));
                    }
                }

                // sorting on start date 
                closure_array.sort(sortByDate);

                // output corresponding string
                if (closure_array.length > 0) {
                    for (var j = 0; j < closure_array.length; j++) {
                        closureInfo.innerHTML = closureInfo.innerHTML + closure_array[j][2];
                    }
                } else {
                    closureInfo.parentElement.classList.add('not-displayed');
                }
            }
        }
    };
    
    
    /****** EQUIPEMENTS / LISTES AVEC GESTION BOOLEEN ******/
    // Liste des équipements (exemeple : broyeurs)
    function rmListeEquipt() {
        var ul_element=document.getElementsByClassName("liste_equipement");
        for (var k = 0; k < ul_element.length; k++) {
            var list_retenue='';
            var li_elements = ul_element[k].getElementsByClassName("rm_visible_true");
                for (var i = 0, len = li_elements.length; i < len; i++) {
                    list_retenue +=  "<li>" +li_elements[i].innerHTML+"</li>";
                }
            ul_element[k].innerHTML="<ul>"+list_retenue+"</ul>";
        }
    };

    /****** LIENS WEB ******/
    // TODO : à commenter
    // website link formatting
    //var _corrWebAddr = function corrWebAddr() {
    function corrWebAddr() {
        var my_links = document.getElementsByClassName("lienweb");
        if (my_links){
            for (var i = 0; i < my_links.length; i++) {
                var adresse = my_links[i].getAttribute("href");
                //console.log("adresse = " + adresse);
                if (adresse !== null) {

                    if (adresse.substr(0, 4) != "http") {
                        my_links[i].setAttribute("href", "http://" + adresse);
                    }
                    if (adresse.trim() === 'Sans objet') {
                        var bloc_link = document.getElementsByClassName('champ_lien');
                        for (var a = 0; a < bloc_link.length; a++) {
                            bloc_link[a].innerHTML = "";
                        }
                    }
                }
           
            }
        }
    };

    
    /****** DATES ******/
    
    // TODO : à commenter
    //var _formatDateInFrench = function formatDateInFrench() {
    function formatDateInFrench() {
        var span_elements = document.getElementsByClassName("date_in_french_format");
        for (var i = 0; i < span_elements.length; i++) {
            var contenu="";
            if(span_elements[i].innerHTML) {
                contenu = span_elements[i].innerHTML;
                //console.log("contenu["+i+"] = "+contenu);
                var date_tab = [];
                date_tab = contenu.split('-', 3);
                if(date_tab.length===3){
                    span_elements[i].innerHTML = date_tab[2].substr(0,2) + "/" + date_tab[1] + "/" + date_tab[0];
                }
            }
        }
    };
    
    function formatDateTimeInFrench() {
        var dates = document.getElementsByClassName("datetimeField");
        var heure = '';
        for (var i = 0; i < dates.length; i++) {
            var text = dates[i].innerText;
            var timestampSplit = text.split('T');

            if (typeof timestampSplit[1] !== 'undefined') {
                var heureSplit = text.split('T')[1].split(':');
                heure = ' à ' + heureSplit[0] + 'h' + heureSplit[1];
            }

            var date = timestampSplit[0].split('-');
            if (typeof date[2] === 'undefined' || typeof date[1] === 'undefined') {
                dates[i].innerText = date[0];
            } else {
                dates[i].innerText = date[2] + '/' + date[1] + '/' + date[0] + heure;
            }
        }
    };
    
    
    /****** QUARTIERS ******/
    function rmQuartiers() {
        var l_element=document.getElementsByClassName("rm-quartier");
        for (var i = 0, len = l_element.length; i < len; i++ ) {
            if (l_element[i].innerHTML.indexOf("Non attribué") >= 0){
                l_element[i].style.display = "none";
            }
        }
    };


    /****** DONNEES TRAFIC TR ******/

    function rmTraficStatus() {
        var trafficStatus = document.getElementsByClassName("trafficStatus");
        for (var j = 0; j < trafficStatus.length; j++) {    
            var text = trafficStatus[j].innerText;
            var newText = '';
            switch (text) {
                case 'freeFlow':
                    newText = 'fluide'
                    break;
                case 'heavy':
                    newText = 'ralenti'
                    break;
                case 'congested':
                    newText = 'bouchon';
                    break;
                case 'impossible':
                    newText = 'impossible';
                    break;
                case 'unknown':
                    newText = 'inconnu';
                    break;
                default:
                    newText = text;
            }
            trafficStatus[j].innerText = newText;
        }
        
    };
    

    // Mise en forme des composants des panneaux d'information (appelée à chaque chargement de panel)
    var _rmFormatTabs = function rmFormatTabs() {
        formatHoraires();
        rmFermeturesOrga();
        exceptionalClosure();
        rmFermeturesDecheterie();
        rmListeDechets();
        exceptionalClosureDechet();
        rmListeEquipt();
        corrWebAddr();
        formatDateInFrench();
        formatDateTimeInFrench();
        rmQuartiers();
        rmTraficStatus();
    };

    return {
        rmFormatTabs: _rmFormatTabs
    };
})();

