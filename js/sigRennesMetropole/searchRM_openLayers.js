var searchRM_openLayers = (function () {

    var key;

    var olMap;

    var projection;

    proj4.defs([
        ["EPSG:4326", "+title=WGS 84, +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"],
        ["EPSG:3857", "+title=Web Spherical Mercator, +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"],
        ["EPSG:900913", "+title=Web Spherical Mercator, +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"],
        ["EPSG:2154", "+title=RGF-93/Lambert 93, +proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"],
        ["EPSG:3948", "+proj=lcc +lat_1=47.25 +lat_2=48.75 +lat_0=48 +lon_0=3 +x_0=1700000 +y_0=7200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"]
    ]);

    /**
     * 
     * @param {*} apiRVAKey 
     */
    var init = function(apiRVAKey, map) {
        key = apiRVAKey;
        olMap = map;
        projection = map.getView().getProjection().ub;
    };

    var getCities = function() {
        return $.ajax({
            type: 'GET',
            url:  'https://api-rva.sig.rennesmetropole.fr/?key='+ key +'&version=1.0&format=json&epsg=3948&cmd=getcities&insee=all',
            dataType: "json"
        });
    };


    var getLane = function(placeSearch) {
        return $.ajax({
            type: 'GET',
            url:  'https://api-rva.sig.rennesmetropole.fr/?key='+ key +'&version=1.0&format=json&epsg=3948&cmd=getlanes&insee=all&query=' + placeSearch,
            dataType: "json"
        });
    };


    var getAdress = function (placeSearch) {

        return $.ajax({
            type: 'GET',
            url:  'https://api-rva.sig.rennesmetropole.fr/?key='+ key +'&version=1.0&format=json&epsg=3948&cmd=getfulladdresses&query='+ placeSearch,
            dataType: "json"
        });
    };


    /**
     * 
     * @param {*} placeSearch 
     * @param {*} searchParameters 
     */
    var search = function(placeSearch) {
        var placeSearchWithCityLowerCase = '';
        var city;
        var lane;
        var address;
        var placeSearchSplit = '';


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

        $.when(getCities(), getLane(placeSearch), getAdress(placeSearch) ).done(function (resultCities, resultLanes, resultAddresses) {

            resultCities[0].rva.answer.cities.forEach(function (cityRes) {
                if (cityRes.name.toLowerCase() == placeSearchWithCityLowerCase || cityRes.name2.toLowerCase() == placeSearchWithCityLowerCase) {
                   city = cityRes;
                }
            });

            if (typeof city !== 'undefined') {
                var lowerCornerSplit = city.lowerCorner.split(' ');
                var xmin = parseFloat(lowerCornerSplit[0]);
                var ymin = parseFloat(lowerCornerSplit[1]);
                var upperCornerSplit = city.upperCorner.split(' ');
                var xmax = parseFloat(upperCornerSplit[0]);
                var ymax = parseFloat(upperCornerSplit[1]);

                var xcenter = (xmin + xmax) / 2;
                var ycenter = (ymin + ymax) / 2;

                olMap.getView().setCenter (proj4('EPSG:3948', projection, [xcenter, ycenter]) );
                olMap.getView().setZoom(14);

            } else {
                var lanes = resultLanes[0].rva.answer.lanes;
                if (lanes.length > 1) {
                    lane = lanes[0];
                } else if (lanes.length == 1){
                    if (lanes[0].name.toLowerCase() == placeSearchWithoutCityLowerCase || lanes[0].name3.toLowerCase() == placeSearchWithoutCityLowerCase
                        || lanes[0].name4.toLowerCase() ==  placeSearchWithCityLowerCase) {
                        lane = lanes[0];
                    }
                }
                
                if (typeof lane !== 'undefined') {
    
                    var lowerCornerSplit = lane.lowerCorner.split(' ');
                    var xmin = parseFloat(lowerCornerSplit[0]);
                    var ymin = parseFloat(lowerCornerSplit[1]);
                    var upperCornerSplit = lane.upperCorner.split(' ');
                    var xmax = parseFloat(upperCornerSplit[0]);
                    var ymax = parseFloat(upperCornerSplit[1]);
    
                    var xcenter = (xmin + xmax) / 2;
                    var ycenter = (ymin + ymax) / 2;
    
                    olMap.getView().setCenter( proj4('EPSG:3948', projection, [xcenter, ycenter]) );
                    olMap.getView().setZoom(18);
                } else {
                    var addresses = resultAddresses[0].rva.answer.addresses;

                    if (addresses.length > 1) {
                        addresses.forEach(function(addr) {
                            if (addr.addr3.toLowerCase() == placeSearchWithCityLowerCase) {
                                address = addr;
                            }
                            else if (addr.addr2.toLowerCase() == placeSearchWithoutCityLowerCase) {
                                //address = addresses[0];
                                console.log(placeSearchWithCityLowerCase);
                            }
                        }); 
                    } else if (addresses.length == 1){
                        if (addresses[0].addr2.toLowerCase() == placeSearchWithoutCityLowerCase || addresses[0].addr3.toLowerCase() == placeSearchWithCityLowerCase) {
                            address = addresses[0];
                        }
                    }
                    
                    if (typeof address !== 'undefined') {
        
                        var x = address.x;
                        var y = address.y;
        
                        olMap.getView().setCenter( proj4('EPSG:3948', projection, [x, y]) );
                        olMap.getView().setZoom(20);
        
                    } else {
                        console.log('pas de résultats');
                    }
                }
            }

        });
    };


    return {
        init: init,
        search: search
    };

})();