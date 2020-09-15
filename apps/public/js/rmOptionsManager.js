var rmOptionsManager = (function () {

  
    proj4.defs([
        ["EPSG:4326", "+title=WGS 84, +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"],
        ["EPSG:3857", "+title=Web Spherical Mercator, +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"],
        ["EPSG:900913", "+title=Web Spherical Mercator, +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"],
        ["EPSG:3948", "+proj=lcc +lat_1=47.25 +lat_2=48.75 +lat_0=48 +lon_0=3 +x_0=1700000 +y_0=7200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"]
    ]);

    var mapOptions;
    var applicationOptions;
    var configurationTheme;
    var layers;

    var layerDisplayOpacity = [];

    /**

     * Property: _clickNbItems

     * @type {integer}

     * Used to show number of features on click

     */
    var _clickNbItems = 0;
    

    var init = function () {

        mapOptions = configuration.getConfiguration().mapoptions;
        applicationOptions = getApplicationConfiguration();
        configurationTheme = _getThemesConfiguration();

        layers = mviewer.getLayers();

        if (mapOptions.minzoom != null) {
            mviewer.getMap().getView().setMinZoom(parseFloat(mapOptions.minzoom));
        }

        // layers configuration
        for (const layer in layers) {

            configurationTheme.forEach(function (theme) {

                if (typeof theme.layer !== 'undefined') {

                    theme.layer.forEach(function (confLayer) {

                        if (layers[layer].layername === confLayer.id) {
    
                            if (confLayer.tooltipWMS === "true") {
                                layers[layer].tooltipWMS = true;
                                layers[layer].tooltipWMSContent = confLayer.tooltipWMSContent;
                            } else {
                                layers[layer].tooltipWMS = false;
                                layers[layer].tooltipWMSContent = '';
                            }
    
                            if (confLayer.disableOpacity === "true") {
                                interfaceModifying.disableLayerOpacity(confLayer.id);
    
                                $(document).on('click', function () {
                                    interfaceModifying.disableLayerOpacity(confLayer.id);
                                });
    
                            }
    
                            if (typeof confLayer.nameIcon !== 'undefined') {
                                if (confLayer.nameIcon.trim() !== '' ) {
                                    interfaceModifying.addIconToLayerName(layers[layer].layername, confLayer.nameIcon);
                                }
                                
                            }
    
                            if (confLayer.hideLayerName == 'true') {
                                interfaceModifying.hideLayerName(layers[layer].layerid);
                            }

                            
                            // AJOUT - Rechargement des données de la couche au click sur la carte
                            if (confLayer.refreshOnClick === 'true') {
                                interfaceModifying.refreshMap(layers[layer].id);
                            }
                            // FIN AJOUT
    
                        }
        
                    });

                }
    
            });
                        
         }
 
         for (const layer in layers) {
     
            if (layers[layer].tooltipWMS) {
             tooltipWMS.activatetooltipWMS(layers[layer].layername, layers[layer].tooltipWMSContent);
            }
 
         }

         // MODIF CBR 
         //if (applicationOptions.refreshInfoPanel === 'true') {
            interfaceModifying.refreshInfoPanel();
         //}
         // FIN MODIF CBR
         
        // MODIF CBR

        if(applicationOptions.tutorial === 'true' && applicationOptions.tutorialFile.trim() !== '' && !configuration.getConfiguration().mobile){
            rmTools.initTutorial();
            if (applicationOptions.showhelp === 'true') {
                $('#help').addClass('showtuto');
                    $('#help').on('hidden.bs.modal', function () {
                        if ($('#help').hasClass('showtuto')){
                            rmTools.displayTutorial(applicationOptions.tutorialFile);
                        }
                    });
            } else {
                rmTools.displayTutorial(applicationOptions.tutorialFile);
            }
        }
        // FIN MODIF CBR

    };
    
    
    var getLayerCount = function () {

        return configuration.getConfiguration().application.layerCount;

    };

    var getInfoPaneles = function () {

        var infoPanels = [];

        layers = mviewer.getLayers();

        for (const layer in layers) {

            configurationTheme.forEach(function (theme) {

                if (typeof theme.layer !== 'undefined') {

                    theme.layer.forEach(function (confLayer) {

                        if (layers[layer].layername === confLayer.id) {
                            var addInfoPanel = true;
                            for (var i =0; i < infoPanels.length; i++) {
                                if (infoPanels[i] === layers[layer].infospanel) {
                                    addInfoPanel = false;
                                }
                            }

                            if (addInfoPanel) {
                                infoPanels.push(layers[layer].infospanel);
                            }
    
                        }
        
                    });

                }
    
            });
                    
         }
        return infoPanels;

    };

    /**
     * get configuration of node application in configuration file
     */
    var getApplicationConfiguration = function () {
        
        return configuration.getConfiguration().application;

    };


    /**
     * get configuration of all themes in configuration file
     */
    var _getThemesConfiguration = function () {

        return configuration.getConfiguration().themes.theme;
        
    };

    /**
     * get configuration of given theme in configuration file
     * @param {*} themeId theme identifier
     */
    var getThemeConfiguration = function(themeId) {

        var themesConf = _getThemesConfiguration();

        var res = null;

        themesConf.forEach(function (theme) {
            
            if ( ('theme-layers-' + theme.id) === themeId) {
                res = theme;
            }

        });

        return res;

    };

     /**
     * Public Method: getClickNbItems
     */
    var getClickNbItems = function () {

        return _clickNbItems;
 
     };

      /**
     * Public Method: getClickNbItems
     */
    var setClickNbItems = function (value) {

        _clickNbItems = value;
 
     };
  
    return {
        init: init,
        getLayerCount: getLayerCount,
        getInfoPaneles: getInfoPaneles,
        getApplicationConfiguration: getApplicationConfiguration,
        getThemesConfiguration: _getThemesConfiguration,
        getThemeConfiguration: getThemeConfiguration,
        getClickNbItems: getClickNbItems,
        setClickNbItems: setClickNbItems
    };

})();