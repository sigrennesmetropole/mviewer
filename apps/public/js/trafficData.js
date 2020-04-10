var trafficData = (function() {

    var getTrafficData = function () {

        var urlTraffic = "http://provider2.autoroutes-trafic.fr/RennesOpenData/TP_FCD_AT.json";
        var tronconRequest = 'https://public-test.sig.rennesmetropole.fr/geoserver/ows?service=wfs&request=GetFeature&typeNames=trp_rout:v_rva_troncon_fcd&outputFormat=JSON&srsName=EPSG:4326';

        var trafficInfo = [];
        
        $.when( $.get(tronconRequest), $.ajax({
            url: 'http://localhost/curl/get_crossorigin_datas.php',
            data: { url: urlTraffic },
            type: 'GET',
            context: document.body
        }) ).done(function ( tronconData, curlData) {

            var trafficDatas = JSON.parse(curlData[0]);

            trafficDatas.forEach( function (datas) {

                tronconData[0].features.forEach( function (troncon) {

                    if (datas.predefinedLocationReference === troncon.properties.id_troncon) {

                        console.log(troncon.geometry);

                        trafficInfo.push({id: troncon.properties.id_troncon, geometry: troncon.geometry, 
                            averageVehicleSpeed: datas.averageVehicleSpeed, datetime: datas.datetime, trafficStatus: datas.trafficStatus, 
                            travelTime: datas.travelTime, travelTimeReliability: datas.travelTimeReliability });

                    }

                });

            });

            displayTrafficInfo(trafficInfo);
        });
          
    };

    var displayTrafficInfo = function (trafficInfo) {

        console.log(trafficInfo);

    };


    return {
        getTrafficData: getTrafficData
    };

})();
