mviewer.customLayers.distconfinement_1km = (function() {
    
    function getradius(dist_m){ // distance en metres
        var _view = mviewer.getMap().getView();
        var resolutionAtEquator = _view.getResolution();
        var center = _view.getCenter();
        var projection = mviewer.getProjection();
        var pointResolution = ol.proj.getPointResolution(projection,resolutionAtEquator,center);
        var resolutionFactor = resolutionAtEquator/pointResolution;
        var radius = (dist_m / ol.proj.Units.METERS_PER_UNIT.m) * resolutionFactor;
        console.log("radius 1km = " + radius);
        return radius;
    }
    
    function circleStyle_1km() {
        let style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: getradius(100),
                fill: new ol.style.Fill({
                    color: 'rgb(63, 209, 238,0.6)',
                }),
                stroke: new ol.style.Stroke({
                    color: '#3FD1EE',
                    width: 0.5
                })
            })
        });
        return [style];
    }
    
    
    function featureStyle() {
        let style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgb(159, 223, 131,0.7)',
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
