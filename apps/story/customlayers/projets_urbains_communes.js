mviewer.customLayers.projurbains_communes = (function() {
    let data_communes = 'https://public.sig.rennesmetropole.fr/geoserver/ows?SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&typeName=v_sitorg_organisme&CQL_FILTER=code_insee%20%3C%3E%20%2735238%27%20AND%20code_nomenclature_principale%20%3D%20%271.1.4%27&outputFormat=application%2Fjson&srsname=EPSG:3857';

    function communeStyle() {
        return [
            new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    scale:0.25,
                    src: 'https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_orange.png',
                  })
            })
        ];
    }
    
    
    let communeLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: data_communes,
            format: new ol.format.GeoJSON()
        }),
        style: communeStyle,
    });
    
    return {
        layer: communeLayer,
    }
}());