var multihighlight = (function() {

    var _overlayer=null;
    var _communeoverlayer=null;
    
    /*
    * HighlightStyle
    */ 
    var highlightGoutteStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        scale:0.25,
        src: 'https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_rennes2030_3.png',
      }),
    });
    
    var highlightRondStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        scale:0.25,
        src: 'https://public.sig.rennesmetropole.fr/ressources/img/mviewer/rond_rennes2030.png',
      }),
    });
    
    /*
    * Gestion des features de la couche overlay
    */
    var displayFeatureInfo = function (features) {
        _overlayer.getSource().clear(); // remove all features
        _communeoverlayer.getSource().clear(); // remove all features
        if (features && features.length) {
            let featHL_pj_t = [];
            let featHL_com_t = [];
            for (const f in features) {
                if (features[f].get('id_organisme') != undefined && features[f].get('id_organisme') != null){
                    featHL_com_t.push(features[f].clone());
                } else {
                    featHL_pj_t.push(features[f].clone());
                }
            }
            _overlayer.getSource().addFeatures(featHL_pj_t); // add this
            _communeoverlayer.getSource().addFeatures(featHL_com_t); // add this
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
                _overlayer.setStyle(highlightGoutteStyle);
            }
        });
        createLayerHighCommune();
        
        _map.on('pointermove', function (e) {
            displayFeatureInfo(_map.getFeaturesAtPixel(e.pixel));
        });
    }
    
    
    function createLayerHighCommune() {
        
        let communeHighlightLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: highlightRondStyle,
        });
        communeHighlightLayer.mviewerid='communeOverlay';
        _map.getLayers().push(communeHighlightLayer);
        _communeoverlayer = communeHighlightLayer;
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
