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
            
            mviewer.customLayers.distconfinement.layer.getSource().clear();
            var _view = mviewer.getMap().getView();
            var resolutionAtEquator = _view.getResolution();
            var center = _view.getCenter();
            var projection = mviewer.getProjection();
            var pointResolution = ol.proj.getPointResolution(projection,resolutionAtEquator,center);
            var resolutionFactor = resolutionAtEquator/pointResolution;
            var radius = (1000 / ol.proj.Units.METERS_PER_UNIT.m) * resolutionFactor;
            
            mviewer.customLayers.distconfinement.layer.getSource().addFeature(new ol.Feature(new ol.geom.Circle(coord, radius)));
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
