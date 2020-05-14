const layer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'https://public.sig.rennesmetropole.fr/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeNames=trp_rout:geotravaux_evenement_1j&outputFormat=application/json&srsName=EPSG:4326',
        format: new ol.format.GeoJSON()
    }),
    style: function(feature, resolution) {
        var fillcolor;
        if(feature.get('niv_perturbation') === 'Secteur à éviter') {
            fillcolor = '#ff0000';
        } else if(feature.get('niv_perturbation') === "Circulation difficile") {
            fillcolor = '#ffff00';
        } else if(feature.get('niv_perturbation') === "Impact limité") {
            fillcolor = '#09ff01';
        } else if(feature.get('niv_perturbation') === "Travaux de nuit") {
            fillcolor = '#6565fe';
        }
        if (fillcolor) {
            if (resolution < 7){
                return [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                        color: "#000",
                        lineCap: "butt",
                        width: 7,
                        })
                    }),
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                        color: fillcolor,
                        lineCap: "butt",
                        width: 5,
                        lineDash: [10,4],
                        })
                    })
                ];
            }else {
                return [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                        color: fillcolor,
                        lineCap: "butt",
                        width: 3,
                        })
                    })
                ];
            }
        }
    }
});



new CustomLayer('geotravaux_evenement_1j', layer);

