var autocompleteRM = (function () {

    var key;

    var accentMap = {
        "Á": "A", "á": "a", "À": "A", "à": "a", "Â": "A", "â": "a", "Ä": "A", "ä": "a",	"A̧": "A", "a̧" : "a","Ą": "A", "ą": "a", 	
        "Ⱥ": "A", "ⱥ": "a", "Ǎ": "A", "ǎ": "a", "Ȧ": "A", "ȧ": "a", "Ạ": "A", "ạ": "a", "Ā": "A", "ā": "a", "Ã": "A", "ã": "a",
        "Ć": "C", "ć": "c", "C̀": "C", "c̀": "c", "Ĉ": "C", "ĉ": "c", "C̈": "C", "c̈": "c", "Ç": "C", "ç": "c", "C̨": "C", "c̨": "c", 
        "Ȼ": "C", "ȼ": "c", "Č": "C", "č" : "c", "Ċ": "C", "ċ": "c", "C̣": "C", "c̣": "c", "C̄": "C", "c̄": "c", "C̃": "C", "c̃": "c",
        "É": "E", "é": "e", "È": "E", "è": "e", "Ê": "E", "ê": "e", "Ë": "E", "ë": "e", "Ȩ": "E", "ȩ": "e", "Ę": "E", "ę": "e", 
        "Ɇ": "E", "ɇ": "e", "Ě": "E", "ě": "e", "Ė": "E", "ė": "e", "Ẹ": "E", "ẹ": "e", "Ē": "E", "ē": "e", "Ẽ": "E", "ẽ": "e",
        "Í": "I", "í": "i", "Ì": "I", "ì": "i", "Î": "I", "î": "i", "Ï": "I", "ï": "i", "I̧": "I", "i̧": "i", "Į":"I", "į": "i", 	
        "Ɨ": "I", "ɨ": "i", "Ǐ": "I", "ǐ": "i", "İ": "I", "i": "i", "Ị": "I", "ị": "i", "Ī": "I", "ī": "i", "Ĩ": "I", "ĩ": "i",
        "J́": "J", "j́": "j", "J̀": "J", "j̀": "j", "Ĵ": "J", "ĵ": "j", "J̈": "J", "j̈": "j", "J̧": "J", "j̧": "j", "J̨": "J", "j̨":"j",
        "Ɉ": "J", "ɉ": "j",	"J̌": "J", "ǰ": "j", "J̇": "J", "j": "j", "J̣": "J", "j̣": "j", "J̄": "J", "j̄": "j", "J̃": "J", "j̃": "j",
        "Ĺ": "L", "ĺ": "l", "L̀": "L", "l̀": "l", "L̂": "L", "l̂": "l", "L̈": "L", "l̈": "l", "Ļ": "L", "ļ": "l", "L̨": "L", "l̨": "l", "Ł": "L", 
        "ł": "l", "Ƚ": "L", "ƚ": "l",	"Ľ": "L", "ľ": "l",	"L̇": "L", "l̇": "l", "Ḷ": "L" ,"ḷ": "l", "L̄": "L", "l̄": "l", "L̃": "L", "l̃": "l",
        "Ń": "N", "ń": "n", "Ǹ": "N", "ǹ": "n", "N̂": "N", "n̂": "n", "N̈": "N", "n̈": "n", "Ņ": "N", "ņ": "n", "N̨": "N", "n̨": "n", 	
        "Ꞥ": "N", "ꞥ": "n", "Ň": "N", "ň": "n", "Ṅ": "N", "ṅ": "n", "Ṇ": "N", "ṇ": "n", "N̄": "N", "n̄": "n",	"Ñ": "N", "ñ": "n",
        "Ó": "O", "ó": "o", "Ò": "O", "ò": "o", "Ô": "O", "ô": "o",	"Ö": "O", "ö": "o",	"O̧": "O", "o̧": "o", "Ǫ": "O", "ǫ": "o", 	
        "Ø": "O", "ø": "o", "Ɵ": "O", "ɵ": "o", "Ǒ": "O", "ǒ": "o", "Ȯ": "O", "ȯ": "o", "Ọ": "O", "ọ": "o" , "Ō": "O", "ō": "o", "Õ": "O", "õ": "o",
        "Ś": "S", "ś": "s", "S̀": "S", "s̀": "s", "Ŝ": "S", "ŝ": "s", "S̈": "S", "s̈": "s", "Ş": "S", "ş": "s",	"S̨": "S", "s̨": "s", 
        "Ꞩ": "S", "ꞩ": "s", "Š": "S", "š": "s", "Ṡ": "S", "ṡ": "s", "Ṣ": "S", "ṣ": "s", "S̄": "S", "s̄": "s", "S̃": "S", "s̃": "s",
        "T́": "T", "t́": "t", "T̀": "T", "t̀": "t",	"T̂": "T", "t̂": "t", "T̈": "T", "ẗ": "t", "Ţ": "T" ,"ţ": "t",	"T̨": "T", "t̨": "t", 	
        "Ⱦ": "T", "ⱦ": "t", "Ŧ": "T", "ŧ": "t", "Ť": "T", "ť": "t", "Ṫ": "T", "ṫ":"t", "Ṭ": "T", "ṭ": "t", "T̄": "T", "t̄": "t", "T̃": "T", "t̃": "t",
        "Ú": "U", "ú": "u", "Ù": "U", "ù": "u", "Û": "U", "û": "u", "Ü": "U", "ü": "u", "U̧": "U", "u̧": "u", "Ų": "U", "ų": "u", 	
        "Ʉ": "U", "ʉ": "u", "Ǔ": "U", "ǔ": "u", "U̇": "U", "u̇": "u", "Ụ": "U", "ụ": "u", "Ū": "U", "ū": "u", "Ũ": "U" ,"ũ": "u",
        "Ý": "Y", "ý": "y", "Ỳ": "Y", "ỳ": "y", "Ŷ": "Y", "ŷ": "y", "Ÿ": "Y", "ÿ": "y", "Y̧": "Y", "y̧": "y", "Y̨": "Y", "y̨": "y", 	
        "Ɏ": "Y", "ɏ": "y", "Y̌": "Y", "y̌": "y", "Ẏ": "Y", "ẏ": "y", "Ỵ": "Y", "ỵ": "y", "Ȳ": "Y", "ȳ": "y", "Ỹ": "Y", "ỹ": "y",
        "Ź": "Z", "ź": "z", "Z̀": "Z", "z̀": "z", "Ẑ": "Z", "ẑ": "z", "Z̈": "Z", "z̈": "z", "Z̧": "Z", "z̧":"z", "Z̨": "Z", "z̨": "z", 	
        "Ƶ": "Z", "ƶ": "z", "Ž": "Z", "ž": "z",	"Ż": "Z", "ż": "z", "Ẓ": "Z", "ẓ": "z", "Z̄": "Z", "z̄": "z", "Z̃": "Z", "z̃": "z"
      };

    var normalize = function( term ) {
        var ret = "";
        for ( var i = 0; i < term.length; i++ ) {
          ret += accentMap[ term.charAt(i) ] || term.charAt(i);
        }
        return ret;
    };

    var init = function(apiRVAKey, elementId) {
        key = apiRVAKey;
    };


    /**
     * get all cities from Rennes Métropole
     */
    var getCities = function() {
        return $.ajax({
            type: 'GET',
            url:  'https://api-rva.sig.rennesmetropole.fr/?key='+ key +'&version=1.0&format=json&epsg=3948&cmd=getcities&insee=all',
            dataType: "json"
        });
    };

    /**
     * get lanes of Rennes Metropoles, corresponding or including the parameter placeSearch
     * @param {*} placeSearch 
     */
    var getLane = function(placeSearch) {
        return $.ajax({
            type: 'GET',
            url:  'https://api-rva.sig.rennesmetropole.fr/?key='+ key +'&version=1.0&format=json&epsg=3948&cmd=getlanes&insee=all&query=' + placeSearch,
            dataType: "json"
        });
    };

    /**
     * get addresses of Rennes Metropoles, corresponding or including the parameter placeSearch
     * @param {*} placeSearch 
     */
    var getAdress = function (placeSearch) {
        return $.ajax({
            type: 'GET',
            url:  'https://api-rva.sig.rennesmetropole.fr/?key='+ key +'&version=1.0&format=json&epsg=3948&cmd=getfulladdresses&query='+ placeSearch,
            dataType: "json"
        });
    };

    var filterRvaResult = function (rvaResultTab, label) {

        var rvaResultFiltered = [];
        var nbDatasAdded = 0;

        rvaResultTab.forEach(function (datas) {
            
            var labelLowerCase = datas.label.toLowerCase();

            var index = labelLowerCase.indexOf(itemSearchLowerCase);

            if ( (labelLowerCase[index -1] == ' ' || labelLowerCase == itemSearchLowerCase  ) 
            && !rvaResultFiltered.includes(datas) ) {
                if (nbDatasAdded < 6) {
                    rvaResultFiltered.push(datas);
                    nbDatasAdded++;
                } else {
                    rvaResultFiltered.pop();
                    nbDatasAdded--;
                    rvaResultFiltered.push(datas);
                    nbDatasAdded++;
                }
            } 
        });

        if (nbDatasAdded < 6) {

            rvaResultTab.forEach(function (datas) {
                var labelLowerCase = datas.label.toLowerCase();

                if (labelLowerCase.startsWith(itemSearchLowerCase) && !rvaResultFiltered.includes(datas)) {
                    if (nbDatasAdded < 6) {
                        rvaResultFiltered.push(datas);
                        nbDatasAdded++;
                    } 
                } else if ( labelLowerCase.includes(itemSearchLowerCase) && !rvaResultFiltered.includes(datas)) {
                    if (nbDatasAdded < 6) {
                        rvaResultFiltered.push(datas);
                        nbDatasAdded++;
                    }
                } else if (nbDatasAdded < 6) {
                    rvaResultFiltered.push(datas);
                    nbDatasAdded++;
                }

            });

        }
        return rvaResultFiltered;
    };

  /**
   * 
   * @param {*} response 
   * @param {*} itemSearchLowerCase 
   */
    var setRvaAutocompleteDatas = function(response, itemSearchLowerCase) {
        
        var dataRes = [];
        var rvaResponse = '';

        // get response depending if there is one or many results
        if (typeof response[0] !== 'undefined') {
            rvaResponse = response[0];
        } else {
            rvaResponse = response;
        }

        if (typeof rvaResponse.rva !== 'undefined') {
                       
            if (rvaResponse.rva.request.includes('getcities')) {

                var cities = rvaResponse.rva.answer.cities;

                function filterCities(city) {
                    var cityName2 = '';
                    var cityNameLowerCase = city.name.toLowerCase();
            
                    if (city.name2.includes(' ')) {
                        var regex = / /gi;
                        cityName2 = city.name2.replace(regex, '-');
                    } else {
                        cityName2 = city.name2;
                    }
            
                    if (cityNameLowerCase.includes(itemSearchLowerCase) || cityNameLowerCase == itemSearchLowerCase 
                    || cityName2.toLowerCase().includes(itemSearchLowerCase) 
                    || cityName2.toLowerCase() == itemSearchLowerCase ) {
                            return city;
                    }
                }

                var citiesFiltered = cities.filter(filterCities);

                citiesFiltered.forEach(function (city) {
                    dataRes.push({ label: city.name, category: "Communes"},);
                });


            } else if (rvaResponse.rva.request.includes('getlane')) {

                var lanes = rvaResponse.rva.answer.lanes;

                var nbDatasAdded = 0;

                lanes.forEach(function (lane) {

                    var laneName4Split = lane.name4.split(',');

                    var laneName = laneName4Split[0] + ' (' + laneName4Split[1].trim() + ')';

                    var labelLowerCase = laneName.toLowerCase();

                    var index = labelLowerCase.indexOf(itemSearchLowerCase);
        
                    if ( (labelLowerCase[index -1] == ' ' || labelLowerCase == itemSearchLowerCase  ) 
                    && !dataRes.includes(lane) ) {
                        if (nbDatasAdded < 6) {
                            dataRes.push({ label: laneName, category: "Voies"},);
                            nbDatasAdded++;
                        } else {
                            dataRes.pop();
                            nbDatasAdded--;
                            dataRes.push({ label: laneName, category: "Voies"},);
                            nbDatasAdded++;
                        }
                    } 
                });
        
                if (nbDatasAdded < 6) {
        
                    lanes.forEach(function (lane) {
                        var laneName4Split = lane.name4.split(',');

                        var laneName = laneName4Split[0] + ' (' + laneName4Split[1].trim() + ')';
    
                        var labelLowerCase = laneName.toLowerCase();
        
                        if (labelLowerCase.startsWith(itemSearchLowerCase) && !dataRes.includes(lane)) {
                            if (nbDatasAdded < 6) {
                                dataRes.push({ label: laneName, category: "Voies"},);
                                nbDatasAdded++;
                            } 
                        } else if ( labelLowerCase.includes(itemSearchLowerCase) && !dataRes.includes(lane)) {
                            if (nbDatasAdded < 6) {
                                dataRes.push({ label: laneName, category: "Voies"},);
                                nbDatasAdded++;
                            }
                        } else if (nbDatasAdded < 6) {
                            dataRes.push({ label: laneName, category: "Voies"},);
                            nbDatasAdded++;
                        }
        
                    });
        
                }

                    //dataRes.push({ label: laneName, category: "Voies"},);


            } else if (rvaResponse.rva.request.includes('getfulladdresses')) {

                var addresses = rvaResponse.rva.answer.addresses;

                var nbDatasAdded = 0;

                addresses.forEach(function (address) {

                    var addr3Split = address.addr3.split(',');

                    var addressName = addr3Split[0] + ' (' + addr3Split[1].trim() + ')';

                    var labelLowerCase = addressName.toLowerCase();

                    var index = labelLowerCase.indexOf(itemSearchLowerCase);
        
                    if ( (labelLowerCase[index -1] == ' ' || labelLowerCase == itemSearchLowerCase  ) 
                    && !dataRes.includes(address) ) {
                        if (nbDatasAdded < 6) {
                            dataRes.push({ label: addressName.trim(), category: "Adresses"},);
                            nbDatasAdded++;
                        } else {
                            dataRes.pop();
                            nbDatasAdded--;
                            dataRes.push({ label: addressName.trim(), category: "Adresses"},);
                            nbDatasAdded++;
                        }
                    } 
                });
        
                if (nbDatasAdded < 6) {
        
                    addresses.forEach(function (address) {
                        var addr3Split = address.addr3.split(',');

                        var addressName = addr3Split[0] + ' (' + addr3Split[1].trim() + ')';
    
                        var labelLowerCase = addressName.toLowerCase();
        
                        if (labelLowerCase.startsWith(itemSearchLowerCase) && !dataRes.includes(address)) {
                            if (nbDatasAdded < 6) {
                                dataRes.push({ label: addressName.trim(), category: "Adresses"},);
                                nbDatasAdded++;
                            } 
                        } else if ( labelLowerCase.includes(itemSearchLowerCase) && !dataRes.includes(address)) {
                            if (nbDatasAdded < 6) {
                                dataRes.push({ label: addressName.trim(), category: "Adresses"},);
                                nbDatasAdded++;
                            }
                        } else if (nbDatasAdded < 6) {
                            dataRes.push({ label: addressName.trim(), category: "Adresses"},);
                            nbDatasAdded++;
                        }
        
                    });
        
                }

            }

        }
        return dataRes;
    };

    /**
     * 
     * @param {*} parametersList 
     */
    var makeAjaxRequestsList = function (parametersList) {

        var requests = []; // contains apis requests functions

        // depending on search parameters, set in requests array, functions to call to get desired result
        if (parametersList != null) {
            parametersList.forEach( function(params) {
                switch(params.toLowerCase()) {
                    case 'communes':
                        requests.push(getCities());
                        break;
                    case 'voies':
                        requests.push(getLane(placeSearch));
                        break;
                    case 'adresses':
                        requests.push(getAdress(placeSearch));
                        break;
                }
            });
        }
        return requests;
    };

    /**
     * 
     * @param {*} requestsResponses 
     * @param {*} itemSearchLowerCase 
     */
    var setAutocompleteDatas = function(requestsResponses, itemSearchLowerCase) {

        var dataAutocomplete = [];

        requestsResponses.forEach(function (response) {

            setRvaRes = setRvaAutocompleteDatas(response, itemSearchLowerCase);
            dataAutocomplete = dataAutocomplete.concat(setRvaRes);

        });
        return dataAutocomplete;

    };


    var autocomplete = function (elementId, searchRM_openLayers, parameterListId) {

        var idParent = '#' + $('#' + elementId).parent()[0].id;

        $.widget( "custom.catcomplete", $.ui.autocomplete, {
            _create: function() {
              this._super();
              this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
            },
            _renderMenu: function( ul, items ) {
              var that = this,
                currentCategory = "";
              $.each( items, function( index, item ) {
                var li;
                if ( item.category != currentCategory ) {
                  ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
                  currentCategory = item.category;
                }
                li = that._renderItemData( ul, item );
                if ( item.category ) {
                  li.attr( "aria-label", item.category + " : " + item.label );
                }
              });
            }
          });

        $("#" + elementId).catcomplete({
            delay: 0,
            minLength: 4,
            appendTo: idParent,
            maxShowItems: 10,
            select: function( event, ui ) {
                searchRM_openLayers.search(ui.item.label);
            },
            source: function( request, response ) {

                var itemSearch =  $("#" + elementId).val();
                var parametersList = $('#'+ parameterListId).val();
    
                if(itemSearch.includes(',')) {
                    placeSearch = itemSearch.split(',')[0];
                } else {
                    placeSearch = itemSearch;
                }
        
                var itemSearchLowerCase = itemSearch.toLowerCase();
        
                var placeSearchLength = placeSearch.trim().length;
    
                if (placeSearchLength >= 4 ) {
    
                    //var dataAutocomplete = [];
                    var requests = makeAjaxRequestsList(parametersList);
    
                    // call functions includes in "requests" array
                    $.when.apply($, requests).done(function (...requestsResponses) {
    
                        dataAutocomplete = setAutocompleteDatas(requestsResponses, itemSearchLowerCase);
                        
                        var matcher = new RegExp( $.ui.autocomplete.escapeRegex( request.term ), "i" );
                        response( $.grep( dataAutocomplete, function( value ) {
                            value = value.label || value.value || value;
                            return matcher.test( value ) || matcher.test( normalize( value ) );
                        }) ); 
                      
                    });
    
                }

            }

        });
        
    };

    return {
        init: init,
        autocomplete: autocomplete
    };

})();