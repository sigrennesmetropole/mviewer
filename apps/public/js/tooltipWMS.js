var tooltipWMS  = (function () {
    
    var init = function () {

        var mobile_device = false;

        if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) 
        || navigator.userAgent.match(/Windows Phone/i)) {
            mobile_device = true;
        }

        if (!mobile_device) {
            $('#main').append('<div id="tooltipWM" class="tooltipWMS"></div>');
        }

    };

    var tootlip = function (evt) {

        var bbox = evt.coordinate[0] + ',' + evt.coordinate[1] + ',' + evt.coordinate[0] + ',' + evt.coordinate[1];

        rmTools.getVisibleLayers().forEach(function (layer) {
            
            if (layer.tooltipWMS) {
                var projection = rmTools.getProjection();
                var requestUrl = layer.url + '?service=WFS&request=GetFeature&typeNames=' + layer.layername 
                                + '&outputFormat=JSON&srsName='+ projection + '&bbox=' + bbox + ',' + projection; 

                $.getJSON(requestUrl, function (data) {
                    
                    if (data.totalFeatures > 0) {
                        
                        if (layer.tooltipWMSContent.trim() !== '') {

                            $.get(layer.tooltipWMSContent, function(template) {
                                var rendered = Mustache.render(template, data.features[0].properties);
                               
                                var posX = evt.originalEvent.clientX + 5;
                                var posY = evt.originalEvent.clientY + 2;
                                $('.tooltipWMS').show();
                                $('.tooltipWMS').css({"top":posY, "left":posX});
                                $('.tooltipWMS').html(rendered);

                              });

                        }
        
                    } else {
                        $('.tooltipWMS').hide();
                    }

                });
            }
            
        });
        
    };

    var activatetooltipWMS = function (layerName, tooltipData) {
        mviewer.getMap().on('pointermove', function (evt) {
            tootlip(evt);
        }); 
    };

       return {
        init: init,
        activatetooltipWMS: activatetooltipWMS
    };

})();