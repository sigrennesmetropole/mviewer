/**
 * Functions to format the data display on the right panel
 */

var formatter = (function () {

    /**
     *  -- Organizations functions --
     */

    // timetable formating with line break
    var _formatHoraires = function formatHoraires() {
        var li_elements = document.getElementsByClassName("horaires");
        for (var i = 0, len = li_elements.length; i < len; i++) {
            var contenu = li_elements[i].innerHTML;
            li_elements[i].innerHTML = contenu.replace(/ \/ /g, "<br>");
        }
    };

    // public holiday and school holidays reduced displaying
    var _reducerDayOff = function reducerDayOff(hidden = false) {
        var elements = document.getElementsByClassName("daysOff");
        for (var a = 0; a < elements.length; a++) {
            var daysOffInfo = elements[a];
            if (daysOffInfo) {
                var days = daysOffInfo.innerHTML; // Save to be able to show default value if needed
                var daysOffArrayRef = ['jour de l\'An', 'lundi de Pâques', 'fête du Travail', 'Victoire 1945', 'Ascension', 'lundi de Pentecôte', 'fête nationale', 'Assomption', 'Toussaint', 'Armistice 1918', 'Noël'];
                var formatDays = days;
                if (days.indexOf('Fermé les jours fériés') == -1) {
                    if (days.indexOf(':') != -1) {
                        formatDays = days.trim().split(':')[1]; // !! remove "Jour ou périodes de fermeture :" Be careful of formatting 
                    }
                    if (formatDays.length) {
                        if (hidden) {
                            daysOffInfo.parentElement.classList.remove('not-displayed');
                        }
                        var daysOffArray = formatDays.split(',');
                        var exceptions = [];
                        var matchNumber = 0;
                        for (var i = 0, len = daysOffArrayRef.length; i < len; i++) {
                            var match = null;
                            for (var j = 0, len2 = daysOffArray.length; j < len2; j++) {
                                if (daysOffArrayRef[i].toUpperCase().trim() === daysOffArray[j].toUpperCase().trim()) {
                                    match = j;
                                }
                            }
                            if (match !== null) {
                                matchNumber++;
                                daysOffArray.splice(match, 1);
                            } else {
                                exceptions.push(daysOffArrayRef[i]);
                            }
                        }
                        if (matchNumber === 11) {
                            daysOffInfo.innerHTML = "- Fermé les jours fériés";
                        } else if (matchNumber === 0) {
                            daysOffInfo.innerHTML = "";
                        } else {
                            daysOffInfo.innerHTML = "- Fermé les jours fériés sauf " + exceptions.join(', ');
                        }
                        if (daysOffArray.length) {
                            var holidaysArray = daysOffArray;
                            var matchingH = [];
                            var holidaysRef = ['Vacances de la Toussaint', 'Vacances de Noël', 'Vacances d\'hiver', 'Vacances de printemps', 'Vacances d\'été'];

                            var exceptionsH = [];
                            var matchNumberH = 0;
                            for (var k = 0, len3 = holidaysRef.length; k < len3; k++) {
                                var matchH = null;
                                for (var l = 0, len4 = holidaysArray.length; l < len4; l++) {
                                    if (holidaysRef[k].toUpperCase().trim() === holidaysArray[l].toUpperCase().trim()) {
                                        matchH = l;
                                        matchingH.push(holidaysArray[l]);
                                    }
                                }
                                if (matchH !== null) {
                                    matchNumberH++;
                                    holidaysArray.splice(matchH, 1);
                                } else {
                                    exceptionsH.push(holidaysRef[k]);
                                }
                            }
                            var output = "";
                            if (matchNumberH === 5) {
                                output = "- Fermé pendant les vacances scolaires";
                            } else if (matchNumberH >= 3) {
                                output = "- Fermé pendant les vacances scolaires sauf " + exceptionsH.join(', ').toLowerCase();
                            } else if (matchNumberH > 0) {
                                output = "- " + matchingH.join(', ') + (matchingH.length && daysOffArray.length ? ", " : "") + daysOffArray.join(', ');
                            }

                            daysOffInfo.innerHTML = daysOffInfo.innerHTML + (matchNumber > 0 ? "<br/>" : "") + output;
                        }
                    }
                }
            }
        }
    };

    // public holiday and school holidays reduced displaying
    var _reducerDayOffForEpiceries = function reducerDayOffForEpiceries(hidden = false) {
        var elements = document.getElementsByClassName("daysOff");
        var list_element = document.getElementsByClassName("liste-des-jours");
        var list_to_show = [];
        if(elements.length) {
            console.log(elements.length);
            for (var a = 0; a < elements.length; a++) {
                list_to_show = [];
                var daysOffInfo = elements[a];
                if (daysOffInfo) {
                    var days = daysOffInfo.innerHTML;
                    console.log('Numero ' + a);
                    //console.log(days);
                    var daysOffArrayRef = ['jour de l\'An', 'lundi de Pâques', 'fête du Travail', 'Victoire 1945', 'Ascension', 'lundi de Pentecôte', 'fête nationale', 'Assomption', 'Toussaint', 'Armistice 1918', 'Noël', 'Vacances de la Toussaint','Vacances de Noël', 'Vacances d\'hiver', 'Vacanc (...)'];
                    var formatDays = days;
                    if (days.indexOf(':') != -1) {
                        formatDays = days.trim().split(':')[1]; // !! remove "Jour ou périodes de fermeture :" be careful of formatting
                    }
                    if (formatDays.length) {
                        if (hidden) {
                            daysOffInfo.parentElement.classList.remove('not-displayed');
                            daysOffInfo.innerHTML = "";
                        }
                        var daysOffArray = formatDays.split(',');

                        //console.log('toto');
                        //console.log(daysOffArray);
                        for (var i = 0, len = daysOffArrayRef.length; i < len; i++) {
                            for (var j = 0, len2 = daysOffArray.length; j < len2; j++) {
                                if (daysOffArrayRef[i].toUpperCase().trim() === daysOffArray[j].toUpperCase().trim()) {
                                    //console.log(daysOffArray[j]);
                                    list_to_show.push(daysOffArray[j]);
                                }
                            }
                        }
                    }
                }
            }
          /*  console.log('--------------------------');
            console.log(a);
            console.log(list_to_show);
            console.log('--------------------------');*/
            for (var o = 0; o < list_element.length; o++) {
                if (list_to_show.length) {
                   /* console.log('********************************');
                    console.log(a);
                    console.log(list_to_show.length);
                    console.log('********************************');*/
                    for (var v = 0; v < list_to_show.length; v++) {
                        var li = document.createElement("li");
                        //li.setAttribute('id', list_to_show[v]);
                        li.appendChild(document.createTextNode(list_to_show[v]));
                        list_element[o].appendChild(li);
                    }
                }

            }


        }

    };

    var _exceptionalClosure = function exceptionalClosure() {
        var elements = document.getElementsByClassName("exceptionalClosures");
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
                                output = "- Du " + beg.toLocaleDateString() + " au " + end.toLocaleDateString() + comment + "</br>";
                            } else {
                                output = "- Le " + beg.toLocaleDateString() + comment + "</br>";
                            }
                            closure_array.push(new Array(new Date(beg), new Date(end), output));
                        }
                    }

                    // sorting array on start date  
                    closure_array.sort(sortByDate);
                }

                //output corresponding string
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

    var _exceptionalClosureDechet = function exceptionalClosureDechet() {
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

    var getDateFromFrench = function getDateFromFrench(date) {
        var val = date.split("/");
        return new Date(val[2], val[1]-1 , val[0]);
    };

    // sorting on start date 
    var sortByDate = function sortByDate(date1, date2) {
        return (date1[0]-date2[0]);
    };

    // Mise en forme du lien vers l'annuaire
    // directory link formatting
    /*var _formatDirectoryLink = function formatDirectoryLink() {
        var link = document.getElementById("directory-link");
        if (link){
            var nameAndId = link.getAttribute("href").replace(/ +/g, " ").replace(" - ", " ").replace(/ |'/g,"-").toLowerCase();
            link.setAttribute("href", "https://metropole.rennes.fr/organisme/"+nameAndId.sansAccent());
        }
    };*/

    // website link formatting
    var _corrWebAddr = function corrWebAddr() {
        var my_links = document.getElementsByClassName("lienweb");
        console.log(my_links.length);
        //console.log('titi');
        if (my_links){
            console.log('toto'+my_links.length);
            for (var i = 0; i < my_links.length; i++) {
                var adresse = my_links[i].getAttribute("href");
                console.log("adresse = " + adresse);
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
     /*   if (Boolean(document.getElementById("lienweb"))){
            for (var i = 0; i < span_elements.length; i++) {
                var adresse = document.getElementById("lienweb").getAttribute("href");
                console.log("adresse = " + adresse);
                if (adresse.substr(0, 4) != "http") {
                    document.getElementById("lienweb").setAttribute("href", "http://" + adresse);
                }
                if (adresse === 'Sans objet') {
                    var bloc_link = document.getElementById('champ_lien');
                    bloc_link.innerHTML = "";
                }
            }
        }
        */

    };

    var _formatDateInFrench = function formatDateInFrench() {
        var span_elements = document.getElementsByClassName("date_in_french_format");
        //console.log("nb" + span_elements.length);
        for (var i = 0; i < span_elements.length; i++) {
            var contenu="";
            if(span_elements[i].innerHTML) {
                contenu = span_elements[i].innerHTML;
                //console.log("contenu["+i+"] = "+contenu);
                var date_tab = [];
                date_tab = contenu.split('-', 3);
                if(date_tab.length===3){
                    span_elements[i].innerHTML = date_tab[2].substr(0,2) + "/" + date_tab[1] + "/" + date_tab[0];
                    //console.log("valeur supposée utilisé = "+date_tab[2].substr(0,2) + "/" + date_tab[1] + "/" + date_tab[0])
                    //var my_date = new Date(contenu);
                    //console.log(my_date);
                    //console.log(my_date.getFullYear());
                    /*
                    if (my_date)
                        span_elements[i].innerHTML = contenu.replace(contenu,my_date.getDate() + "/" + my_date.getMonth() + "/" + my_date.getFullYear());
                        */
                }
            }

        }
        //formatter.corrWebAddr();




        //span_elements.innerHTML = my_date.getDay()+"/"+my_date.getMonth()+"/"+my_date.getFullYear();

        /*for (var i = 0, len = span_elements.length; i < len; i++) {
            console.log("for------" +i+ "--------");
            if (span_elements[i]) {
                var contenu = span_elements[i].innerHTML;
                var date_tab = [];
                date_tab = contenu.split('-', 3);
                console.log(date_tab.length);
                console.log("1 ---------------"+date_tab[0]);
                console.log("2 ---------------"+date_tab[1]);
                console.log("3 ---------------"+date_tab[2]);
                if (date_tab.length !== 0 && date_tab.length === 3) {
                    console.log("jsui dans le if");
                    console.log("1 ***************"+date_tab[0]);
                    console.log("2 ***************"+date_tab[1]);
                    console.log("3 ***************"+date_tab[2]);
                    var french_date = date_tab[2] + "/" + date_tab[1] + "/" + date_tab[0];
                    var first = date_tab[2] + "/" + date_tab[1] + "/" + date_tab[0];
                }
                    //console.log(date_tab[2].substr(0, 2) + "/" + date_tab[1] + "/" + date_tab[0]);
                    // var date_formatted = date_tab[2].substr(0, 2) + "/" + date_tab[1] + "/" + date_tab[0];
                    //alert(date_tab[2].substr(0, 2) + "/" + date_tab[1] + "/" + date_tab[0]);

            }*/
                //span_elements[i].innerHTML = french_date;
                //span_elements[i].innerHTML =  date_tab[2].substr(0, 2) + "/" + date_tab[1] + "/" + date_tab[0];

                /*
                var year = contenu.substr(0,4);
                var month = contenu.substr(5, 7);
                var day = contenu.substr(8,10);
                */
                //console.log(day+"/"+month+"/"+year);
                //span_elements[i].innerHTML =  contenu.replace(span_elements[i].innerHTML,day+"/"+month+"/"+year);
                //span_elements.innerHTML =  date_tab[2] + "/" + date_tab[1] + "/" + date_tab[0];
       // }
        //span_elements.innerHTML = first;
        //console.log(date_tab[2] + "/" + date_tab[1] + "/" + date_tab[0]);
        //span_elements.innerHTML =  date_tab[2] + "/" + date_tab[1] + "/" + date_tab[0];

/*        var my_date = document.getElementsByClassName("date_in_french_format").innerHTML;
        console.log(my_date);
        alert(my_date);
        return my_date.getDay() + "/" + my_date.getMonth() + "/" + my_date.getFullYear();
*/
    };



    return {
        formatHoraires: _formatHoraires,
        reducerDayOff: _reducerDayOff,
        exceptionalClosureDechet: _exceptionalClosureDechet,
        exceptionalClosure: _exceptionalClosure,
        //formatDirectoryLink: _formatDirectoryLink,
        corrWebAddr: _corrWebAddr,
        formatDateInFrench: _formatDateInFrench,
        reducerDayOffForEpiceries: _reducerDayOffForEpiceries
    };
})();

