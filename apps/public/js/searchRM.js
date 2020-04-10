var searchRM = (function () {


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


    var map;

    var apiRVAKey;

    var apiSitesorgKey;

    var projection; // projection used

    var autocompleteEnabled;

    var searchParameters;

    var paramsDefaultCheked;

    var searchInput =  '<div id="searchRm" class="col-sm-offset-6 col-sm-6 col-md-offset-3 col-md-8 col-lg-offset-6 col-lg-6 col-xl-offset-7 col-xl-5">'
        +  '<div id="searchContainer " class="displayFlex">'
        + '<input type="text" class="form-control" placeholder="Rechercher" id="searchRmInput" autocomplete="off">'
        + '<div id="containerSearchParams">'
        +  '<button id="searchConfig" title="Choix de recherche" class="btn btn-default btn-raised">'
        +  '</button> </div>'
        +'</div></div>';

    var selectList = '<select id="searchItems" multiple="multiple"></select>';

    var itemSearch; // element the user type in search field
    var itemSearchLowerCase;


    /**
     * get configuration informations from data/searchRMConf.json file
     * @param {*} configurationFileDatas configuartion datas in json
     */
    var getConfiguration = function (configurationFileDatas) {

        apiRVAKey = configurationFileDatas.apiRVAKey;

        if (configurationFileDatas.autocomplete) {
            autocompleteEnabled = true;
        } else {
            autocompleteEnabled = false;
        }

        searchParameters = configurationFileDatas.searchContent;

        paramsDefaultCheked = configurationFileDatas.searchContentDefaultCheck;

        apiSitesorgKey = configurationFileDatas.apiSitesorgKey;
    };


    /**
     * return a word without its accent
     * @param {*} term 
     */
    var normalize = function( term ) {
        if (term !== null) {
            var ret = "";
            for ( var i = 0; i < term.length; i++ ) {
              ret += accentMap[ term.charAt(i) ] || term.charAt(i);
            }
        } else {
            ret = null;
        }
        return ret;
    };

   
    var getResponses = function (parametersList, placeSearch) {

        var promises = [];

        // depending on search parameters, set in requests array, functions to call to get desired result
        if (parametersList != null) {
            parametersList.forEach( function(params) {
                switch(params.toLowerCase()) {
                    case 'communes':
                        promises.push(searchRVA.getCities2());
                        break;
                    case 'voies':
                        promises.push(searchRVA.getLanes(placeSearch));
                        break;
                    case 'adresses':
                        promises.push(searchRVA.getAdresses(placeSearch));
                        break;
                    case 'organismes':
                        promises.push(searchSitesorg.getOrganismes(placeSearch) );
                        break;
                }
            });
        }
        return promises;
    };

    /**
     * gather all autocomplete datas into one result
     * @param {*} requestsResponses 
     * @param {*} itemSearchLowerCase 
     */
    var gatherAutocompleteDatas = function(requestsResponses) {

        var dataAutocomplete = [];

        requestsResponses.forEach(function (response) {
            
            if (response.category === 'sitesorg') {
                setSiteorgRes = searchSitesorg.setSitesorgAutocompleteDatas(response, itemSearchLowerCase);
                dataAutocomplete = dataAutocomplete.concat(setSiteorgRes.slice(0,6));
            } else if (response.category === 'rva') {
                setRvaRes = searchRVA.setRvaAutocompleteDatas(response, itemSearchLowerCase);
                dataAutocomplete = dataAutocomplete.concat(setRvaRes);
            }

        });
        return dataAutocomplete;

    };

    var displayItemMap = async function (uiItem) {

        var coordinatesNewProj;

        if (uiItem.themes === 'rva') {
            searchRVA.displayMapRvaElement(uiItem);
            if (uiItem.category === "Adresses") {
                coordinatesNewProj = proj4('EPSG:3948', projection, [uiItem.x, uiItem.y] );
                mviewer.showLocation(projection, coordinatesNewProj[0], coordinatesNewProj[1]);
            }
        } else if (uiItem.themes === 'sitesorg') {
            var site = await searchSitesorg.getSiteFromOrg(uiItem.mainSite);
            var coord = await searchSitesorg.getSiteCoordinates(site);
            coordinatesNewProj = proj4('EPSG:3948', projection, [coord.x, coord.y]);
            map.getView().setCenter( coordinatesNewProj );
            map.getView().setZoom(19);
            mviewer.showLocation(projection, coordinatesNewProj[0], coordinatesNewProj[1]);
        }

    };

    /**
     * launch autocomplete functionality
     * @param {*} elementId 
     */
    var autocomplete = function (elementId) {

        var idParent = '#' + $('#' + elementId).parent()[0].id;

        // fin catcomplete
        $(document).on('input', '#searchRmInput', function () {

            var parametersList = $('#searchItems').val();
            itemSearch = $("#searchRmInput").val();
            itemSearchLowerCase = itemSearch.toLowerCase();
        
            if(itemSearch.includes(',')) {
                placeSearch = itemSearch.split(',')[0];
            } else {
                placeSearch = itemSearch;
            }
    
            var placeSearchLength = placeSearch.trim().length;
            if (placeSearchLength >= 4 ) {
    
                var promises = getResponses(parametersList, placeSearch);
    
                Promise.all(promises).then(function(requestsResponses) {
    
                    dataAutocomplete = gatherAutocompleteDatas(requestsResponses);
                    autocompleteRM.autocomplete('searchRmInput', 'searchRm', dataAutocomplete, displayItemMap);
                });
    
            }
            
        });
        
    };


    
    var init = function (confFile) {

        map = mviewer.getMap();

        $('#searchRMContainer').append(searchInput);
        $('#searchRm').hide();

        projection = rmTools.getProjection();

        itemSearch = $("#searchRmInput").val();

        $.getJSON(confFile, function (confDatas) {

            getConfiguration(confDatas);

            searchRVA.init(apiRVAKey, projection, map);
            searchSitesorg.init(apiSitesorgKey);

           $('#searchRmInput').keypress(function (event) {
                var placeSearch = $('#searchRmInput').val().trim();
                if (event.keyCode == 13 && placeSearch != '') {
                    searchRVA.searchDisplayRva(placeSearch);
                }
            });

            if (autocompleteEnabled) {
                autocomplete('searchRmInput');
            }

            $('#searchRm').append(selectList);

            var searchParamsData = [];
            searchParameters.split(',').forEach(function (element) {
                searchParamsData.push(element.trim());
            });

            var paramsDefaultChekedData = [];
            paramsDefaultCheked.split(',').forEach(function (element) {
                paramsDefaultChekedData.push(element.trim());
            });


            $("#searchItems").select2({
                closeOnSelect : false,
                width: '88%',
                //dropdowParent: $('#a'),
                data: searchParamsData
            }).val(paramsDefaultChekedData).trigger("change");

            $('#searchRm > .select2-container').css( 'overflow-y','auto');

            var display = false;
            $('#searchRm > .select2-container').hide();

            $('#searchConfig').click(function () {
                if (display == false) {
                    display = true;
                } else if (display == true) {
                    display = false;
                }
                if (display == false) {
                    $("#searchRm > .select2-container").hide();
                } else if (display == true) {
                    $("#searchRm >.select2-container").show();
                }
            });

        });

    };

    /*
    * enable search functionality
    */
    var enable = function() {
        $('#searchRm').show();
    };


    /*
    * disable search functionality
    */
    var disable = function() {
        $('#searchRm').hide();
    };


    return {
        init: init,
        enable: enable,
        disable: disable
    };

})();