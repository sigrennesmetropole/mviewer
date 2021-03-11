
mviewer.customLayers.artville= (function() {
    let data_url = 'https://public.sig.rennesmetropole.fr/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeNames=ptou_lois:art_ville&outputFormat=application/json&srsName=EPSG:4326';
    
    
    function markerStyle(feature) {
        let type = feature.get('type');
        let etat = feature.get('etat');
        
        if (etat == "Pour mémoire") {
            return featureMarker('https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_vert.png');
        } else if (type == "Œuvre sur l'espace public") {
            return featureMarker('https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_rouge.png');
        } else if (type == "Œuvre dans un bâtiment") {
            return featureMarker('https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_bleu.png');
        } else if (type == "Street art") {
            return featureMarker('https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_orange.png');
        }
    }
    
    function featureMarker(url) {
        return [
            new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    scale:0.20,
                    src: url,
                  })
            })
        ];
    }
    
    let dataLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: data_url,
            format: new ol.format.GeoJSON()
        }),
        style: markerStyle,
    });
    
    
    return {
        layer: dataLayer,
    }
}());


