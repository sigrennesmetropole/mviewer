var searchRM = (function () {

    var searchParameters = [];

    var nbResults = 0;
    var currentRmAutocompleteItem = -1; 
    var apiSitesOrgkey = '';

    var previousRequest;

    var _init = function (searchRMConf) {
        if ($("#searchtool").length === 0) {
           var searchtool =  '<div class="navbar-form" role="search" id="searchtool">'
            +    '<div class="form-group input-group">'
            +        '<input type="text" class="form-control" placeholder="Rechercher" i18n="navbar.search.placeholder" id="searchfield">'
            +        '<div class="input-group-btn">'
            +            '<button type="button" class="btn btn-default" aria-label="Help" data-toggle="modal" data-target="#parameterspanel">'
            +                '<span class="glyphicon glyphicon-option-vertical"></span>'
            +            '</button>'
            +        '</div>'
            +    '</div>'
            +'</div>';
            $('.navbar-right')[0].firstElementChild.innerHTML = searchtool;
        }
        _configureSearch(searchRMConf);
    };


    var _configureSearch = function (searchRMConf) {
        $.getJSON(searchRMConf, function (confData) {
            _setSearchParameters(confData);

            $(document).on("keyup", "#searchfield", function (e) {
                if (e.keyCode == 40) { //down arrow keyCode
                    currentRmAutocompleteItem++;
                    if (currentRmAutocompleteItem >= nbResults) {
                        currentRmAutocompleteItem = 0;
                    }
                    var previousItem = currentRmAutocompleteItem - 1;
                    if (previousItem < 0) {
                        previousItem = nbResults -1;
                    }
                    $('#autocompleteRmItem_' + previousItem).removeClass("selectedRmAutocompleteItem");
                    $('#autocompleteRmItem_' + currentRmAutocompleteItem).addClass("selectedRmAutocompleteItem");
                    $('#searchfield').val($('#autocompleteRmItem_' + currentRmAutocompleteItem)[0].innerText);
                    return;
                }
                if (e.keyCode == 38) { // up arrow keyCode
                    currentRmAutocompleteItem--;
                    if (currentRmAutocompleteItem < 0) {
                        currentRmAutocompleteItem = nbResults -1;
                    }
                    var nextItem = currentRmAutocompleteItem + 1;
                    if (nextItem >= nbResults) {
                        nextItem = 0;
                    }
                    $('#autocompleteRmItem_' + nextItem).removeClass("selectedRmAutocompleteItem");
                    $('#autocompleteRmItem_' + currentRmAutocompleteItem).addClass("selectedRmAutocompleteItem");
                    $('#searchfield').val($('#autocompleteRmItem_' + currentRmAutocompleteItem)[0].innerText);
                    return;
                }
                if (e.keyCode == 13 && $('#searchresults a').length > 1) {
                    $('#autocompleteRmItem_' + currentRmAutocompleteItem).trigger('click');
                    return;
                }
                var chars = $(this).val().length;
                if (chars === 0) {
                } else if ((chars >0) && (chars < 3)) {
                    $("#searchresults .list-group-item").remove();
                } else {
                    _searchRM(confData, $(this).val());
                }
            });
        });
    };


    //////////////////// Search parameters //////////////////////////////////////////

    var _setSearchParameters = function (confData) {
        confData.searchContent.forEach(function (searchElem) {

            var newSearchParameter = '<li class="mv-param-item" onclick="searchRM.toggleParameter(this)">'
            + '<a href="#">'
            +    '<span id="param_search_' + searchElem.categoryName + '" class="state-icon far ';
            if (searchElem.defaultCheck) {
                newSearchParameter += 'mv-checked';
                searchParameters.push('Communes');
            } else {
                newSearchParameter += 'mv-unchecked';
            } 
            newSearchParameter += '"></span>'
                +    '<div style="display:inline;">'+ searchElem.searchParameterName +'</div>'
                + '</a>'
            + '</li>';
            $('#searchparameters').append(newSearchParameter);
        });
    };

    var toggleParameter = function (li) {
        var span = $(li).find("span");
        var param = span[0].id.replace('param_search_', '');
        var parameterIndex = searchParameters.indexOf(param);
        if (span.hasClass('mv-unchecked') === true ) {
            span.removeClass('mv-unchecked').addClass('mv-checked');
            if (parameterIndex === -1) {
                searchParameters.push(param);
            }
        } else {
            span.removeClass('mv-checked').addClass('mv-unchecked');
            if (parameterIndex !== -1) {
                searchParameters.splice(parameterIndex, 1);
            }
        }
    };

    //////////////////// Search input ////////////////////////////////////////////////

    var _filterCities = function (citiesList, elemSearch, citiesSearch) {
        var citiesFound = [];
        if (typeof citiesSearch !== 'undefined') {
            var citiesSearchSplitArray = citiesSearch.split(',');
            citiesList.forEach(function (city) {
                var citiesFilter = citiesSearchSplitArray.findIndex(item => city.name.toLowerCase() === item.toLowerCase());

                if ( (city.name.toLowerCase().startsWith(elemSearch.toLowerCase()) || city.name2.toLowerCase().startsWith(elemSearch.toLowerCase()) )
                 && citiesFilter !== -1 ) {
                    citiesFound.push(city);
                }
                if ( ( (city.name.toLowerCase().includes(elemSearch.toLowerCase()) || city.name.toLowerCase() === elemSearch.toLowerCase() || 
                city.name2.toLowerCase().includes(elemSearch.toLowerCase()) || city.name2.toLowerCase() === elemSearch.toLowerCase() )
                && citiesFound.indexOf(city) === -1) && citiesFilter !== -1)  {
                    citiesFound.push(city);
                }

            });
        } else {
            citiesList.forEach(function (city) {
                if (city.name.toLowerCase().startsWith(elemSearch.toLowerCase()) || city.name2.toLowerCase().startsWith(elemSearch.toLowerCase()) ) {
                    citiesFound.push(city);
                }
                if ( (city.name.toLowerCase().includes(elemSearch.toLowerCase()) || city.name.toLowerCase() === elemSearch.toLowerCase() || 
                city.name2.toLowerCase().includes(elemSearch.toLowerCase()) || city.name2.toLowerCase() === elemSearch.toLowerCase() )
                && citiesFound.indexOf(city) === -1) {
                    citiesFound.push(city);
                }
            });
        };
        return citiesFound;
    };

    var _filterLanes = function (lanesData) {
        var lanesFound = [];
        var lanes = lanesData.result.rva.answer.lanes;
        if (typeof lanesData.citiesSearch !== 'undefined') {
            var citiesSearchSplitArray = lanesData.citiesSearch.split(',');
            lanes.forEach(function (lane) {
                if ( citiesSearchSplitArray.findIndex(item => lane.name4.split(',')[1].trim().toLowerCase() === item.toLowerCase()) !== -1) {
                    lanesFound.push(lane);
                }
            });
        } else {
            lanesFound = lanes;
        }
        return lanesFound.slice(0,lanesData.nbItemDisplay);
    };

    var _filterAddresses = function (addressesData) {
        var addressesFound = [];
        var addresses = addressesData.result.rva.answer.addresses;
        if (typeof addressesData.citiesSearch !== 'undefined') {
            var citiesSearchSplitArray = addressesData.citiesSearch.split(',');
            addresses.forEach(function (address) {
                if ( citiesSearchSplitArray.findIndex(item => address.addr3.split(',')[1].trim().toLowerCase() === item.toLowerCase()) !== -1) {
                    addressesFound.push(address);
                }
            });
        } else {
            addressesFound = addresses;
        }
        return addressesFound.slice(0,addressesData.nbItemDisplay);
    };

    var _filterOrganisms = function (organismsData) {
        var organismsFound = [];
        var organisms = organismsData.result;
        if (typeof organismsData.citiesSearch !== 'undefined') {
            var citiesSearchSplitArray = organismsData.citiesSearch.split(',');
            organisms.forEach(function (organism) {
                if ( organism.autres !== null && citiesSearchSplitArray.findIndex(item => organism.autres[0].split(':')[1].trim().toLowerCase() === item.toLowerCase()) !== -1) {
                    organismsFound.push(organism);
                }
            });
        } else {
            organismsFound = organisms;
        }
        return organismsFound.slice(0,organismsData.nbItemDisplay);
    };

    /**
     * get main site from organism
     * @param {*} org organism
     */
    var _getMainSite = function (org) {
        var mainSite = '';
        if (org.autres !== null) {
            org.autres.forEach(function (data) {
                if (data.includes('Site principal :')) {
                    mainSite = data.split(':')[1].trim();
                }

            });
            
        }

        return mainSite;

    };

    /**
     * get main site information from organism
     * @param {*} org organism
     */
    var _getSiteFromOrg = function (mainSite) {

        var requestUrl = 'https://api-sitesorg.sig.rennesmetropole.fr/v1/recherche?'
                       + 'adresse=&etats[]=actif&etats[]=projet&etats[]=inactif&niveaux_org[]=3'
                       + '&niveaux_org[]=1&niveaux_org[]=2&niveaux_site[]=1&termes='+ mainSite
                       + '&termes_op=AND&types[]=site&limit=20&offset=0';

        return new Promise(resolve => {
            $.ajax({
                url: requestUrl,
                context: document.body,
                headers: {'X-API-KEY': apiSitesOrgkey}
            }).done(function (site) {
                resolve({site});
            });
        });
        
    };

    /**
     * get [x,y] coordinates from site
     * @param {*} site
     */
    var _getSiteCoordinates = function (idSite) {

        var requestUrl = 'https://api-sitesorg.sig.rennesmetropole.fr/v1/sites/' + idSite;

        return new Promise(resolve => {
            $.ajax({
                url: requestUrl,
                context: document.body,
                headers: {'X-API-KEY': apiSitesOrgkey}
            }).done(function (res) {
                resolve({x: res.sitePt.x, y: res.sitePt.y});
            });
        });

    }

    var displayOrganism = async function (elem, zoom, querymaponclick) {
        var mainSite = elem.title;
        var site = await _getSiteFromOrg(mainSite);
        var coord = await _getSiteCoordinates(site.site[0].id);
        var coordNewProj = proj4('EPSG:3948', 'EPSG:4326', [coord.x, coord.y]);
        mviewer.zoomToLocation(coordNewProj[0], coordNewProj[1], zoom, querymaponclick);
        $("#mv_marker").show();
        mviewer.showLocation('EPSG:4326', coordNewProj[0], coordNewProj[1]);
    };

    var _getBoundigBoxCenterX = function (lowerCorner, upperCorner) {
        var xmin = parseFloat(lowerCorner.split(' ')[0]);
        var xmax = parseFloat(upperCorner.split(' ')[0]);
        return (xmin + xmax) / 2;
    }

    var _getBoundigBoxCenterY = function (lowerCorner, upperCorner) {
        var ymin = parseFloat(lowerCorner.split(' ')[1]);
        var ymax = parseFloat(upperCorner.split(' ')[1]);
        return (ymin + ymax) / 2;
    }

    var displayLocationMarker = function (coordX, coordY, zoom, querymaponclick, proj) {
        mviewer.zoomToLocation(coordX, coordY, zoom, querymaponclick);
        $("#mv_marker").show();
        mviewer.showLocation(proj, coordX, coordY);
    };

    var displayLocation = function (coordX, coordY, zoom, querymaponclick) {
        mviewer.zoomToLocation(coordX, coordY, zoom, querymaponclick);
        mviewer.hideLocation();
    };

    var _getApisRequests = function (confData, value) {
        var promises = [];
        confData.searchContent.forEach( function (content) {
            var apiRvaBaseUrl = 'https://api-rva.sig.rennesmetropole.fr/';
            var apiSitesOrg_url_recherche = 'https://api-sitesorg.sig.rennesmetropole.fr/v1/recherche';
            var ajaxSetting = {type: 'GET', crossDomain: true,  dataType: "json"};
            apiSitesOrgkey = confData.apiSitesorgKey;
            switch (content.categoryName) {
                case 'Communes':
                    ajaxSetting.url = apiRvaBaseUrl;
                    ajaxSetting.data = {key: confData.apiRVAKey, version: '1.0', format: 'json', 'epsg': '3948', 'cmd': 'getcities', 'insee':'all'};
                    break;
                case 'Voies':
                    ajaxSetting.url = apiRvaBaseUrl;
                    ajaxSetting.data = {key: confData.apiRVAKey, version: '1.0', format: 'json', 'epsg': '3948', 'cmd': 'getlanes', 'insee':'all', "query": value};
                    break;
                case 'Adresses':
                    ajaxSetting.url = apiRvaBaseUrl;
                    ajaxSetting.data =  {key: confData.apiRVAKey, version: '1.0', format: 'json', 'epsg': '3948', 'cmd': 'getfulladdresses',"query": value};
                    break;
                case 'Organismes':
                    ajaxSetting.url = apiSitesOrg_url_recherche;
                    ajaxSetting.data = 'adresse=&etats[]=actif&etats[]=projet&etats[]=inactif&niveaux_org[]=3&niveaux_org[]=1&niveaux_org[]=2&niveaux_site[]=1'
                    + '&termes='+ value + '&termes_op=AND&types[]=organisme&limit=20&offset=0';
                    ajaxSetting.headers = {'X-API-KEY': apiSitesOrgkey};
                    break;
            }
            promises.push( new Promise(resolve => {
                $.ajax(ajaxSetting).done(function (result) {
                    var nbItemDisplay = 5;
                    if (!Number.isNaN(parseInt(content.nbItemDisplay))) {
                        nbItemDisplay = parseInt(content.nbItemDisplay);
                    }
                    var resolveRes = {result : result, nbItemDisplay: nbItemDisplay};
                    resolveRes['zoom'] = content.zoom;
                    resolveRes['categoryName'] = content.categoryName;
                    resolveRes['citiesSearch'] = content.citiesSearch;
                    resolve(resolveRes);
                });
            }) );
        } );
        return promises;
    };

    var _displayAutocompleteData = function (allResult, value) {
        var str = '';
        var nbItem = 0;
        allResult.forEach( function (data) {
            str += '<a class="geoportail list-group-item disabled" id="list-group-'+ data.categoryName +'">'+ data.categoryName +'</a>';
            var dataFiltered = [];
          switch (data.categoryName) {
            case 'Communes':
                var communeData = data.result.rva.answer.cities;
                dataFiltered = _filterCities(communeData, value, data.citiesSearch);
                dataFiltered.forEach(function (elem) {
                    str += "<a class=\"geoportail list-group-item autocompleteRmItem\" id=\"autocompleteRmItem_" + nbItem + "\" href=\"#\" title=\"" + elem.name;
                    var x = _getBoundigBoxCenterX(elem.lowerCorner, elem.upperCorner);
                    var y = _getBoundigBoxCenterY(elem.lowerCorner, elem.upperCorner);
                    var coordNewProj = proj4('EPSG:3948', 'EPSG:4326', [x, y]);
                    str += '" onclick="searchRM.displayLocation('+
                    coordNewProj[0] + ',' +
                    coordNewProj[1] + ',' + data.zoom + ',' + search.options.querymaponclick +', \'EPSG:4326\');">' + elem.name + '</a>';
                    nbItem++;
                });
                break;
            case 'Voies':
                //dataFiltered =  data.result.rva.answer.lanes.slice(0,data.nbItemDisplay);
                dataFiltered = _filterLanes(data);
                dataFiltered.forEach(function (elem) {
                    str += "<a class=\"geoportail list-group-item autocompleteRmItem\" id=\"autocompleteRmItem_" + nbItem + "\" href=\"#\" title=\"" + elem.name4;
                    var x = _getBoundigBoxCenterX(elem.lowerCorner, elem.upperCorner);
                    var y = _getBoundigBoxCenterY(elem.lowerCorner, elem.upperCorner);
                    var coordNewProj = proj4('EPSG:3948', 'EPSG:4326', [x, y]);
                    str += '" onclick="searchRM.displayLocation('+
                    coordNewProj[0] + ',' +
                    coordNewProj[1] + ',' + data.zoom + ',' + search.options.querymaponclick +', \'EPSG:4326\');">' + elem.name4 + '</a>';
                    nbItem++;
                });
                break;
            case 'Adresses':
                //dataFiltered = data.result.rva.answer.addresses.slice(0,data.nbItemDisplay);
                dataFiltered = _filterAddresses(data);
                dataFiltered.forEach(function (elem) {
                    str += "<a class=\"geoportail list-group-item autocompleteRmItem\" id=\"autocompleteRmItem_" + nbItem + "\" href=\"#\" title=\"" + elem.addr3;
                    var coordNewProj = proj4('EPSG:3948', 'EPSG:4326', [elem.x, elem.y]);
                    str += '" onclick="searchRM.displayLocationMarker('+
                    coordNewProj[0] + ',' +
                    coordNewProj[1] + ',' + data.zoom + ',' + search.options.querymaponclick +', \'EPSG:4326\');">' + elem.addr3 + '</a>';
                    nbItem++;
                });
                break;
            case 'Organismes':
                //dataFiltered = data.result.slice(0,data.nbItemDisplay);
                dataFiltered = _filterOrganisms(data);
                dataFiltered.forEach( function (elem) {
                    var elemName = elem.nom;
                    elem.autres.forEach(function (autresData) {
                        if (autresData.includes('Localisation :')) {
                            elemName += ', ' + autresData.split(':')[1].trim();
                        }
                    });
                    var mainSite = _getMainSite(elem);
                    str += "<a class=\"geoportail list-group-item autocompleteRmItem\" id=\"autocompleteRmItem_" + nbItem + "\" href=\"#\" title=\"" + mainSite
                    + ' " onclick="searchRM.displayOrganism(this,' + data.zoom
                    + ','+ search.options.querymaponclick + ')">' + elemName + '</a>';
                    nbItem++;
                });
                break;
          }
        });

        $(".geoportail").remove();
        $("#searchresults").append(str);
        if (search.options.closeafterclick) {
            $("#searchresults .list-group-item").click(function(){
                $(".searchresults-title .close").trigger("click");
            });
        }
        $("#searchresults").show();
    };


    var _searchRM = function (confData, value) {
        var promises = _getApisRequests(confData, value);
        previousRequest = Promise.all(promises).then(function(allResult) {
            _displayAutocompleteData(allResult, value);
            nbResults = $('.autocompleteRmItem').length;
        });
    };

    var enable = function () {
        var searchParams = configuration.getConfiguration().searchparameters;
        if (searchParams.searchRM === 'true' && searchParams.searchRMConf !== '' && typeof searchParams.searchRMConf !== 'undefined') {
            _init(searchParams.searchRMConf);
        }
    };

    return {
        enable: enable,
        displayLocation: displayLocation,
        displayLocationMarker: displayLocationMarker,
        toggleParameter: toggleParameter,
        displayOrganism: displayOrganism
    };

})();

setTimeout(searchRM.enable, 2000);