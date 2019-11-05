var tooltipRM = (function () {
    
    /**

     * Property: _map

     *  @type {ol.Map}

     */
    var _map;

    /**

     * Property: _clickCoordinates

     * {Array} Coordinate of the queryMap click

     */
    var _clickCoordinates = null;



    /**

     * Property: _overLayers

     * {object} hash of all overlay Layers (static)

     */

    var _overLayers = {};



     /**

     * Property: _queryableLayers

     * Array of {ol.layer.Layer}.

     */
    var _queryableLayers = [];


    var init = function () {

        var mobile_device = false;

        if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) 
        || navigator.userAgent.match(/Windows Phone/i)) {
            mobile_device = true;
        }

        if (!mobile_device) {
            $('#main').append('<div id="tooltipRM" class="tooltipRM"></div>');
        }

        _map = mviewer.getMap();
        _overLayers = mviewer.getLayers();

        $.each(_overLayers, function (i, layer) {

            if (layer.queryable) {
                _addQueryableLayer(layer);

            }

        });

    };

    var _addQueryableLayer = function (oLayer) {

        _queryableLayers.push(oLayer.layer);

    };


    var tooltipRM = function(evt, layerName, tooltipContent) {
        //var featureInfoByLayer = [];
        var visibleLayers = [];
        visibleLayers =  $.grep( _queryableLayers, function( l, i ) {return l.getVisible();});
    
        _clickCoordinates = evt.coordinate;
        var urls = [];
    
        for (var i = 0; i < visibleLayers.length; i++) {
            
                params = {'INFO_FORMAT': _overLayers[visibleLayers[i].get("mviewerid")].infoformat,
    
                    'FEATURE_COUNT': _overLayers[visibleLayers[i].get("mviewerid")].featurecount || 5
    
                };
    
    
                var url = visibleLayers[i].getSource().getGetFeatureInfoUrl(
                    evt.coordinate, _map.getView().getResolution(), _map.getView().getProjection(), params);
    
    
                urls.push({url:url, layerinfos: _overLayers[visibleLayers[i].get('mviewerid')]});
    
            }
    
            var requests = [];
    
            //var carrousel=false;
    
            var callback = function (result) {
    
        }


        /**
         * Create tooltip content from parameter tooltipRMContent in configuration file
         * @param {*} tooltipContent 
         * @param {*} response 
         */
        var createTooltipContent = function(tooltipContent, response) {

            // get from configuration file, each data use to create tooltip content
            var tooltipData = tooltipContent.split(' ');
                                    
            // variable that containt display result
            var tooltipResult = '';

            tooltipData.forEach(function (data) {

                var dataWithoutStyle = data;  // data without style elements
                
                // remove style informations from data
                if (data.includes('[')) {

                    data.split('[').forEach(function (dataSplitBracketBegining) {

                        dataSplitBracketBegining.split(']').forEach(function (dataSplitBracketEnding) {

                            if (!data.includes('[' + dataSplitBracketEnding + ']') && dataSplitBracketEnding != '') {
                                dataWithoutStyle = dataSplitBracketEnding;
                            }

                        });

                    });
                }

                if (dataWithoutStyle.includes('$')) {
                    var dataSlice = dataWithoutStyle.slice(1, dataWithoutStyle.length);
                    // set xml begining and end tags corresponding to the data
                    var dataTagBegining = "<"+ layerNameSplit[0] + ':' + dataSlice +">";
                    var dataTagEnd = "</"+ layerNameSplit[0] + ':' + dataSlice +">";

                    var dataLength = dataTagBegining.length;

                    // search in the xml tags positions
                    if (typeof response.search !== 'undefined') {
                        var dataBeginingPosistion = response.search(dataTagBegining);
                        var dataEndPosition = response.search(dataTagEnd);
                    }

                    // get the data value
                    if ( (typeof response.substring !== 'undefined') && (dataBeginingPosistion != -1 && dataEndPosition != -1) ) {
                        var dataValue = response.substring(dataBeginingPosistion + dataLength, dataEndPosition);
                    
                        if (dataSlice.includes('date')) {
                            var date = new Date(dataValue);
                            var day = date.getDate();
                            if (day < 10) {
                                day = '0' + day;
                            }
                            var month = date.getMonth() + 1;
                            if (month < 10) {
                                month = '0' + month; 
                            }
                            dataValue = day + '/' + month + '/' + date.getFullYear();
                        }

                        var dataValueWithStyle = data.replace(dataWithoutStyle, dataValue);
                        var regex1 = /\[/gi;
                        var regex2 = /]/gi;
                        tooltipResult += dataValueWithStyle.replace(regex1, '<').replace(regex2, '>') + ' ';
                    }
                } else {
                    if (response.includes('<gml:featureMember>')) {
                        if (data.includes('[')) {
                            var regex1 = /\[/gi;
                            var regex2 = /]/gi;
                            tooltipResult += data.replace(regex1, '<').replace(regex2, '>') + ' ';
                        } else {
                            tooltipResult += data + ' ';
                        }
                    }
                }

            });
            tooltipResult = tooltipResult.trim();
            return tooltipResult;
        };

        var ajaxFunction = function () {
    
                        urls.forEach(function(request) {
    
                            requests.push($.ajax({
    
                                url: mviewer.ajaxURL(request.url),
    
                                layer: request.layerinfos,
    
                                success: function (response, textStatus, request) {
                
                                    layerNameSplit = layerName.split(':');

                                    var tooltipResult = createTooltipContent(tooltipContent, response);

                                   if (tooltipResult != '') {
                                        var posX = evt.pixel[0] + 5;
                                        var posY = evt.pixel[1] + 2;
                                        $('.tooltipRM').show();
                                        $('.tooltipRM').css({"top":posY, "left":posX});
                                        $('.tooltipRM').html(tooltipResult);
                                   } else {
                                    $('.tooltipRM').hide();
                                   }
    
                                }
    
                            }));
    
                        });
    
                    };
    
                    // using $.when.apply() we can execute a function when all the requests
    
                    // in the array have completed
    
                    $.when.apply(new ajaxFunction(), requests).done(function (result) {
    
                        //callback(result)
    
                    });
    };



    var activateTooltipRm = function (layerName, tooltipData) {
        if(!_map && mviewer) {
            _map = mviewer.getMap();
        }
        _map.on('pointermove', function (evt) {
            tooltipRM(evt, layerName, tooltipData);
        }); 
    };

       return {
        init: init,
        addQueryableLayer: _addQueryableLayer,
        activateTooltipRm: activateTooltipRm
    };

})();