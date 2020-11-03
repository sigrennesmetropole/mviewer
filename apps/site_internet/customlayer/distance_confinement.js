mviewer.customLayers.distconfinement = (function() {

    
    function circleStyle() {
        let style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 100,
                fill: new ol.style.Fill({
                    color: 'rgb(159, 223, 131,0.6)',
                }),
                stroke: new ol.style.Stroke({
                    color: '#44E000',
                    width: 0.5
                })
            })
        });
        return [style];
    }
    
    
    function featureStyle() {
        let style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgb(159, 223, 131,0.6)',
            }),
            stroke: new ol.style.Stroke({
                color: '#44E000',
                width: 0.5
            })
        });
        return [style];
    }
    
    
    let confLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON()
        }),
        style: featureStyle,
    });
    

    
    return {
        layer: confLayer,
    }
}());