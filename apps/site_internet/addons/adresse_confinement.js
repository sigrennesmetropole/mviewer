adresse_confinement = (function() {

    var mapresolution = 0;
    
    /*
    * Initialise les événements attendus pour ajouter les cercles
    */
    function initHighlightLayer() {
        var _map = mviewer.getMap();
        _map.on('click', function (e) {
            mviewer.showLocation(mviewer.getProjection().getCode(), e.coordinate[0], e.coordinate[1]);
            addCircleFeature(e.coordinate);
        });
        
        $("#searchresults").hover(function(){
            console.log("Liste chargée");
            $("#searchresults > .autocompleteRmItem").click(function() {
                console.log("Sélection d'adresse");
                addCircleFeature(mviewer.getMap().getView().getCenter());
            });
        });
    }

    /*
    * Ajoute un cercle de 1000m de rayon autour d'un point passé en paramètre
    */
    function addCircleFeature(coord){
            mviewer.customLayers.distconfinement_20km.layer.getSource().clear();
            mviewer.customLayers.distconfinement_1km.layer.getSource().clear();
            var feat_1km = new ol.Feature(new ol.geom.Circle(coord, getradius(1000)));
            var feat_20km = new ol.Feature(new ol.geom.Circle(coord, getradius(20000)));
            //var feat = new ol.Feature(new ol.geom.Point(coord));
            mviewer.customLayers.distconfinement_1km.layer.getSource().addFeature(feat_1km);
            mviewer.customLayers.distconfinement_20km.layer.getSource().addFeature(feat_20km);
    }
    
    function getradius(dist_m){ // distance en metres
        var _view = mviewer.getMap().getView();
        var resolutionAtEquator = _view.getResolution();
        var center = _view.getCenter();
        var projection = mviewer.getProjection();
        var pointResolution = ol.proj.getPointResolution(projection,resolutionAtEquator,center);
        var resolutionFactor = resolutionAtEquator/pointResolution;
        var radius = (dist_m / ol.proj.Units.METERS_PER_UNIT.m) * resolutionFactor;
        
        return radius;
    }
    
    
    
    /*
    * Attend le chargement de la carte avant d'initialiser le highlight
    */
    var check = function(){
        if(mviewer.getMap()){
            mviewer.getMap().once('postrender', m => {
                    initHighlightLayer();
                });
        } else {
            setTimeout(check, 100); // check again in a second
        }
    }
    check();

})();
