var artville_base = (function() {
    var _featureMarker = function featureMarker(url) {
        return [
            new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    scale:0.25,
                    src: url,
                  })
            })
        ];
    }
    
    return {
        featureMarker: _featureMarker
    };
}());


mviewer.customLayers.artville_espub= (function() {
    let data_url = 'https://public.sig.rennesmetropole.fr/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeNames=ptou_lois:art_ville&outputFormat=application/json&srsName=EPSG:4326&CQL_FILTER=type%3D%27%C5%92uvre%20sur%20l%27%27espace%20public%27%20AND%20%28etat%3D%27Existant%27%20OR%20etat%3D%27En%20projet%27%29';
    
    let marker = artville_base.featureMarker('https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_rouge.png');
    
        
    let dataLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: data_url,
            format: new ol.format.GeoJSON()
        }),
        style: marker,
    });
    
    
    return {
        layer: dataLayer,
    }
}());


mviewer.customLayers.artville_bati= (function() {
    let data_url = 'https://public.sig.rennesmetropole.fr/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeNames=ptou_lois:art_ville&outputFormat=application/json&srsName=EPSG:4326&CQL_FILTER=type%3D%27%C5%92uvre%20dans%20un%20b%C3%A2timent%27%20AND%20%28etat%3D%27Existant%27%20OR%20etat%3D%27En%20projet%27%29';
    
    let marker = artville_base.featureMarker('https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_bleu.png');
    
        
    let dataLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: data_url,
            format: new ol.format.GeoJSON()
        }),
        style: marker,
    });
    
    
    return {
        layer: dataLayer,
    }
}());


mviewer.customLayers.artville_street= (function() {
    let data_url = 'https://public.sig.rennesmetropole.fr/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeNames=ptou_lois:art_ville&outputFormat=application/json&srsName=EPSG:4326&CQL_FILTER=type%3D%27%C5%92uvre%20sur%20l%27%27street%20art%27%20AND%20%28etat%3D%27Existant%27%20OR%20etat%3D%27En%20projet%27%29';
    let marker = artville_base.featureMarker('https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_orange.png');
    
        
    let dataLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: data_url,
            format: new ol.format.GeoJSON()
        }),
        style: marker,
    });
    
    
    return {
        layer: dataLayer,
    }
}());


mviewer.customLayers.artville_memoire= (function() {
    let data_url = 'https://public.sig.rennesmetropole.fr/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeNames=ptou_lois:art_ville&outputFormat=application/json&srsName=EPSG:4326&CQL_FILTER=etat%3D%27Pour%20m%C3%A9moire%27';
    let marker = artville_base.featureMarker('https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_vert.png');
    
        
    let dataLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: data_url,
            format: new ol.format.GeoJSON()
        }),
        style: marker,
    });
    
    
    return {
        layer: dataLayer,
    }
}());