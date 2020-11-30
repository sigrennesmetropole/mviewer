mviewer.customLayers.distconfinement_20km = (function() {
    function featureStyle20km() {
        let style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgb(63, 209, 238,0.3)',
            }),
            stroke: new ol.style.Stroke({
                color: '#3FD1EE',
                width: 0.5
            })
        });
        return [style];
    }
    
    let confLayer20km = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON()
        }),
        style: featureStyle20km,
    });
    

    
    return {
        layer: confLayer20km,
    }
}());