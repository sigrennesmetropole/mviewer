var multihighlight = (function() {

    var _overlayer=null;
    
    /*
    * HighlightStyle
    */ 
    var highlightStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        scale:0.25,
        src: 'https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_rennes2030_2.png',
      }),
    });
    
    /*
    * Gestion des features de la couche overlay
    */
    var displayFeatureInfo = function (features) {
        if (features && features.length) {
            _overlayer.getSource().clear(); // remove all features
            let featHL_t = [];
            for (const f in features) {
                featHL_t.push(features[f].clone());
            }
            _overlayer.getSource().addFeatures(featHL_t); // add this
        }
    };
    
    /*
    * Force le style de highlight sur la couche overlay
    */
    function initHighlightLayer() {
        var _map = mviewer.getMap();
        _map.getLayers().forEach(function (lyr) {
            if ('featureoverlay' == lyr.get('mviewerid')) {
                _overlayer = lyr;
                _overlayer.setStyle(highlightStyle);
            }
        });
        _map.on('pointermove', function (e) {
            displayFeatureInfo(_map.getFeaturesAtPixel(e.pixel));
        });
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
