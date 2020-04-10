var searchRVA = (function () {

    var apiKey;
    var projection;
    var map;

    /**
     * get all cities from Rennes Métropole
     */
    var getCities = function() {
        return $.ajax({
            type: 'GET',
            url:  'https://api-rva.sig.rennesmetropole.fr/?key='+ apiKey +'&version=1.0&format=json&epsg=3948&cmd=getcities&insee=all',
            dataType: "json"
        });
    };

    var getCities2 = function () {
        return new Promise(resolve => {
            $.ajax({
                type: 'GET',
                url:  'https://api-rva.sig.rennesmetropole.fr/?key='+ apiKey +'&version=1.0&format=json&epsg=3948&cmd=getcities&insee=all',
                dataType: "json"
            }).done(function (res) {
                resolve({'response' : res.rva.answer.cities, 'category' : 'rva', 'subcategory': 'city'});
            });
        });
    };


    /**
     * get lanes of Rennes Metropoles, corresponding or including the parameter placeSearch
     * @param {*} placeSearch 
     */
    var getLane = function(placeSearch) {
        return $.ajax({
            type: 'GET',
            url:  'https://api-rva.sig.rennesmetropole.fr/?key='+ apiKey +'&version=1.0&format=json&epsg=3948&cmd=getlanes&insee=all&query=' + placeSearch,
            dataType: "json"
        });
    };

    var getLanes = function () {
        return new Promise(resolve => {
            $.ajax({
                type: 'GET',
                url: 'https://api-rva.sig.rennesmetropole.fr/?key='+ apiKey +'&version=1.0&format=json&epsg=3948&cmd=getlanes&insee=all&query=' + placeSearch,
                dataType: "json"
            }).done(function (res) {
                resolve({'response': res.rva.answer.lanes, 'category': 'rva', 'subcategory': 'lane'});
            });
        });
    };

    /**
     * get addresses of Rennes Metropoles, corresponding or including the parameter placeSearch
     * @param {*} placeSearch 
     */
    var getAdress = function (placeSearch) {
        return $.ajax({
            type: 'GET',
            url:  'https://api-rva.sig.rennesmetropole.fr/?key='+ apiKey +'&version=1.0&format=json&epsg=3948&cmd=getfulladdresses&query='+ placeSearch,
            dataType: "json"
        });
    };    

    var getAdresses = function () {
        return new Promise(resolve => {
            $.ajax({
                type: 'GET',
                url: 'https://api-rva.sig.rennesmetropole.fr/?key='+ apiKey +'&version=1.0&format=json&epsg=3948&cmd=getfulladdresses&query='+ placeSearch,
                dataType: "json"
            }).done(function (res) {
                resolve({'response': res.rva.answer.addresses, 'category': 'rva', 'subcategory': 'address'});
            });
        });
    }; 

    var getAdressesById = function (addressId) {
        return new Promise(resolve => {
            $.ajax({
                type: 'GET',
                url: 'https://api-rva.sig.rennesmetropole.fr/?key='+ apiKey +'&version=1.0&format=json&epsg=3948&cmd=getaddressbyid&idaddress=' + addressId,
                dataType: "json"
            }).done(function (res) {
                resolve([resx, res.y]);
            });
        });
    }; 

    /**
     * Center map on the given city or lane coordinates.
     * @param {*} rvaLowerCorner lowerCorner parameter from RVA API response
     * @param {*} rvaUpperCorner upperCorner parameter from RVA API response
     */
    var centerMapCityLane = function (rvaLowerCorner, rvaUpperCorner) {

        var lowerCornerSplit = rvaLowerCorner.split(' ');
        var xmin = parseFloat(lowerCornerSplit[0]);
        var ymin = parseFloat(lowerCornerSplit[1]);
        var upperCornerSplit = rvaUpperCorner.split(' ');
        var xmax = parseFloat(upperCornerSplit[0]);
        var ymax = parseFloat(upperCornerSplit[1]);

        var xcenter = (xmin + xmax) / 2;
        var ycenter = (ymin + ymax) / 2;

        map.getView().setCenter(proj4('EPSG:3948', projection, [xcenter, ycenter]) );
        
    }

    /**
     * display on map, lane, address or city from RVA API 
     * @param {*} rvaElement lane, address or city from RVA API
     */
    var displayMapRvaElement = function (rvaElement) {

        switch(rvaElement.category) {
            case 'Communes':
                centerMapCityLane(rvaElement.lowerCorner, rvaElement.upperCorner);
                map.getView().setZoom(14);
                break;
            case 'Voies':
                centerMapCityLane(rvaElement.lowerCorner, rvaElement.upperCorner);
                map.getView().setZoom(18);
                break;
            case 'Adresses':
                map.getView().setCenter( proj4('EPSG:3948', projection, [rvaElement.x, rvaElement.y]) );
                map.getView().setZoom(20);
                break;
        }

    };


    /**
     * search lane in set of lanes
     * @param {*} lanes set of lanes
     * @param {*} placeSearchWithCityLowerCase 
     * @param {*} placeSearchWithoutCityLowerCase 
     */
    var searchLane = function(lanes, placeSearchWithCityLowerCase, placeSearchWithoutCityLowerCase) {

        var lane = null;

        if (lanes.length > 1) {
        
            lanes.forEach(function (l) {
                if (l.name4.toLowerCase() == placeSearchWithCityLowerCase) {
                    lane = l;
                } else if (l.name4.toLowerCase().includes(placeSearchWithCityLowerCase)) {
                    //console.log(l.name4);
                    lane = l;
                } else {
                    lane = lanes[0];
                }
            });

        } else if (lanes.length == 1) {
            if (lanes[0].name.toLowerCase() == placeSearchWithoutCityLowerCase || lanes[0].name3.toLowerCase() == placeSearchWithoutCityLowerCase
                || lanes[0].name4.toLowerCase() ==  placeSearchWithCityLowerCase) {
                lane = lanes[0];
            } else if (lanes[0].name.toLowerCase().includes(placeSearchWithoutCityLowerCase) || lanes[0].name3.toLowerCase().includes(placeSearchWithoutCityLowerCase)
            || lanes[0].name4.toLowerCase().includes(placeSearchWithCityLowerCase)) {
                lane = lanes[0];
            }
        } 

        return lane;
    }

    /**
     * search address in set of addresses
     * @param {*} addresses set of addresses
     * @param {*} placeSearchWithCityLowerCase 
     * @param {*} placeSearchWithoutCityLowerCase 
     */
    var searchAddress = function (addresses, placeSearchWithCityLowerCase, placeSearchWithoutCityLowerCase) {

        var address = null;

        if (addresses.length > 1) {
            addresses.forEach(function(addr) {
                if (addr.addr3.toLowerCase() == placeSearchWithCityLowerCase) {
                    address = addr;
                }
                else if (addr.addr2.toLowerCase() == placeSearchWithoutCityLowerCase) {
                    address = addr
                }
                else if (addr.addr3.toLowerCase().includes(placeSearchWithCityLowerCase)) {
                    address = addr;
                }
                else if (addr.addr2.toLowerCase().includes(placeSearchWithoutCityLowerCase)) {
                    address = addr;
                }
            }); 
        } else if (addresses.length == 1){
            if (addresses[0].addr2.toLowerCase() == placeSearchWithoutCityLowerCase 
                || addresses[0].addr3.toLowerCase() == placeSearchWithCityLowerCase) {
                address = addresses[0];
            } else if (addresses[0].addr2.toLowerCase().includes(placeSearchWithoutCityLowerCase) 
                || addresses[0].addr3.toLowerCase().includes(placeSearchWithCityLowerCase)) {
                address = addresses[0];
            }
        }
        return address;

    }

    /**
     * search in RVA API and display on map, place search
     * @param {*} placeSearch city, lane or address
     */
    var searchDisplayRva = function(placeSearch) {
        var placeSearchWithCityLowerCase = '';
        var placeSearchSplit = '';

        var addressSearch = false;
        var laneSearch = false;
        var citySearch = false;


        if (placeSearch.includes(',')) {
            placeSearchSplit = placeSearch.split(',');

            placeSearchWithoutCityLowerCase = placeSearchSplit[0].toLowerCase().trim();
            placeSearchWithCityLowerCase = placeSearch.toLowerCase();
            placeSearch = placeSearchSplit[0];

        } else if (placeSearch.includes('(')) {
            placeSearchSplit = placeSearch.split('(');

            placeSearchWithoutCityLowerCase = placeSearchSplit[0].toLowerCase();
            placeSearchWithCityLowerCase = placeSearchSplit[0].trim().toLowerCase() + ', ' + placeSearchSplit[1].slice(0,-1).trim().toLowerCase();
            placeSearch = placeSearchSplit[0];
        } else {
            placeSearchWithoutCityLowerCase = placeSearchWithCityLowerCase = placeSearch.toLowerCase();
        }

        var parametersList = $('#searchItems').val();

        parametersList.forEach(function (parameter) {
            
            if (parameter.toLowerCase() == "adresses") {
                addressSearch = true;
            }
            if (parameter.toLowerCase() == "voies") {
                laneSearch = true;
            }
            if (parameter.toLowerCase() == "communes") {
                citySearch = true;
            }

        });


        if (citySearch) {

            var city = null;

            $.when( getCities() ).done(function (resultCities) {

                resultCities.rva.answer.cities.forEach(function (cityRes) {

                    if (cityRes.name.toLowerCase() == placeSearchWithCityLowerCase || cityRes.name2.toLowerCase() == placeSearchWithCityLowerCase) {
                        cityFound = true;
                        city = cityRes;
                    } 

                }); 

                if (city !== null) {
                    centerMapCityLane(city.lowerCorner, city.upperCorner);
                    map.getView().setZoom(14);
                } else {

                    $.when( getLane(placeSearch) ).done(function (resultLanes) {
            
                        var lanes = resultLanes.rva.answer.lanes;
                        var lane = searchLane(lanes, placeSearchWithCityLowerCase, placeSearchWithoutCityLowerCase);

                        if (lane !== null) {
        
                            centerMapCityLane(lane.lowerCorner, lane.upperCorner);
                            map.getView().setZoom(18);
                            laneFound = true;

                        } else {
                            laneFound = false;

                            $.when( getAdress(placeSearch) ).done(function ( resultAddresses) {

                                var addresses = resultAddresses.rva.answer.addresses;
                                var address = searchAddress(addresses, placeSearchWithCityLowerCase, placeSearchWithoutCityLowerCase);
                           
                                if (address !== null) {
                
                                    var x = address.x;
                                    var y = address.y;
                
                                    map.getView().setCenter( proj4('EPSG:3948', projection, [x, y]) );
                                    map.getView().setZoom(20);
                                    addressFound = true;
                
                                } else {
                                    console.log('pas trouvé');
                                }
                
                            });

                        }
        
                    });

                }

            });

        } 

        else if (laneSearch) {

            $.when( getLane(placeSearch) ).done(function (resultLanes) {
            
                var lanes = resultLanes.rva.answer.lanes;
                var lane = searchLane(lanes, placeSearchWithCityLowerCase, placeSearchWithoutCityLowerCase);

                if (lane !== null) {

                    centerMapCityLane(lane.lowerCorner, lane.upperCorner);
                    map.getView().setZoom(18);
                    laneFound = true;

                } else {
                    laneFound = false;

                    $.when( getAdress(placeSearch) ).done(function ( resultAddresses) {

                        var addresses = resultAddresses.rva.answer.addresses;
                        var address = searchAddress(addresses, placeSearchWithCityLowerCase, placeSearchWithoutCityLowerCase);
                   
                        if (address !== null) {
        
                            var x = address.x;
                            var y = address.y;
        
                            map.getView().setCenter( proj4('EPSG:3948', projection, [x, y]) );
                            map.getView().setZoom(20);
                            addressFound = true;
        
                        } else {
                            console.log('pas trouvé');
                        }
        
                    });

                }

            });
            
        }
        
       else if (addressSearch) {

            $.when( getAdress(placeSearch) ).done(function ( resultAddresses) {

                var addresses = resultAddresses.rva.answer.addresses;
                var address = searchAddress(addresses, placeSearchWithCityLowerCase, placeSearchWithoutCityLowerCase);
        
                if (address !== null) {

                    var x = address.x;
                    var y = address.y;

                    map.getView().setCenter( proj4('EPSG:3948', projection, [x, y]) );
                    map.getView().setZoom(20);
                    addressFound = true;

                } else {
                    console.log('pas trouvé');
                }

            });

        } else {
            console.log('pas trouvé');
        }

    };

    /**
     * set in autocomplete result, selected datas from RVA API
     * @param {*} response response from RVA API request
     */
    var setRvaAutocompleteDatas = function(response, itemSearchLowerCase) {
            
        var dataRes = [];

        if (response.subcategory == 'city') {

            var cities = response.response;

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
                dataRes.push({ label: city.name, category: "Communes", 
                upperCorner: city.upperCorner, lowerCorner: city.lowerCorner, themes: 'rva'},);
            });


        } else if (response.subcategory == 'lane') {

            var lanes = response.response;

            var nbDatasAdded = 0;

            var laneExist = false;

            dataRes.forEach(function (dataLane) {
                if (dataLane.name4 == lane.name4) {
                    laneExist = true;
                }
            });
            
            lanes.forEach(function (lane) {
                var laneName4Split = lane.name4.split(',');

                var laneName = laneName4Split[0] + ' (' + laneName4Split[1].trim() + ')';

                var labelLowerCase = laneName.toLowerCase();

                if (labelLowerCase.startsWith(itemSearchLowerCase) && !laneExist) {
                    if (nbDatasAdded < 6) {
                        dataRes.push({ label: laneName, category: "Voies", 
                        upperCorner: lane.upperCorner, lowerCorner: lane.lowerCorner, themes: 'rva'},);
                        nbDatasAdded++;
                    } 
                } else if ( labelLowerCase.includes(itemSearchLowerCase) && !laneExist) {
                    if (nbDatasAdded < 6) {
                        dataRes.push({ label: laneName, category: "Voies", upperCorner: lane.upperCorner, 
                        lowerCorner: lane.lowerCorner, themes: 'rva'},);
                        nbDatasAdded++;
                    }
                } else if (nbDatasAdded < 6) {
                    dataRes.push({ label: laneName, category: "Voies", upperCorner: lane.upperCorner, 
                    lowerCorner: lane.lowerCorner, themes: 'rva'},);
                    nbDatasAdded++;
                }

            });
    

        } else if (response.subcategory == 'address') {

            var addresses = response.response;

            var nbDatasAdded = 0;

            addresses.forEach(function (address) {

                var addr3Split = address.addr3.split(',');
                var addressName = addr3Split[0] + ' (' + addr3Split[1].trim() + ')';

                if (address.addr3.toLowerCase() === itemSearchLowerCase || addressName.toLowerCase() === itemSearchLowerCase) {
                    dataRes.push({ label: addressName.trim(), category: "Adresses", x: address.x, y: address.y,
                        themes: 'rva'},);
                } else if (dataRes.length < 6 && ( address.addr3.toLowerCase().startsWith(itemSearchLowerCase) || addressName.toLowerCase().startsWith(itemSearchLowerCase)) ) {
                    dataRes.push({ label: addressName.trim(), category: "Adresses", x: address.x, y: address.y,
                    themes: 'rva'},);
                } else if (dataRes.length < 6 && (address.addr3.toLowerCase().includes(itemSearchLowerCase) || addressName.toLowerCase().includes(itemSearchLowerCase)) ) {
                    dataRes.push({ label: addressName.trim(), category: "Adresses", x: address.x, y: address.y,
                    themes: 'rva'},);
                } else if (dataRes.length < 6 && address.addr2.toLowerCase() === itemSearchLowerCase) {
                    dataRes.push({ label: addressName.trim(), category: "Adresses", x: address.x, y: address.y,
                    themes: 'rva'},);
                } else if (dataRes.length < 6 && address.addr2.toLowerCase().startsWith(itemSearchLowerCase) ) {
                    dataRes.push({ label: addressName.trim(), category: "Adresses", x: address.x, y: address.y,
                    themes: 'rva'},);
                } else if (dataRes.length < 6 && address.addr2.toLowerCase().includes(itemSearchLowerCase)) {
                    dataRes.push({ label: addressName.trim(), category: "Adresses", x: address.x, y: address.y,
                    themes: 'rva'},);
                }

            });

        }

        return dataRes;
    };

    var init = function (key, proj, carte) {
        apiKey = key;
        projection = proj
        map = carte;
    };

    var getRvaSections = function () {
        projection = rmTools.getProjection();
        var sectionsRequest = 'https://public-test.sig.rennesmetropole.fr/geoserver/ows?service=wfs&request=GetFeature&typeNames=trp_rout:v_rva_troncon_fcd &outputFormat=JSON&srsName='+ projection;

        $.get(sectionsRequest, function(data) {
            console.log(data);
        });

    };


    return {
        init: init,
        getCities: getCities,
        getLane: getLane,
        getAdress: getAdress,
        centerMapCityLane: centerMapCityLane,
        displayMapRvaElement: displayMapRvaElement,
        searchDisplayRva: searchDisplayRva,
        setRvaAutocompleteDatas: setRvaAutocompleteDatas,

        getCities2: getCities2,
        getLanes: getLanes,
        getAdresses: getAdresses,
        getAdressesById: getAdressesById,
        getRvaSections: getRvaSections
    };

})();