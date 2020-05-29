
function getLegendGraphicUrl(serviceUri, params) {
    if (serviceUri === undefined) {
      return undefined;
    }

    // transform to uppercase param keys
    var uppercaseParams = {};
    for (var key in params) {
        var upperKey = key.toUpperCase();
        uppercaseParams[ upperKey ] = params[key];
    }

    const defaultParams = {
      'SERVICE': 'WMS',
      'VERSION': '1.3.0',
      'REQUEST': 'GetLegendGraphic',
      'SLD_VERSION': '1.1.0',
      'FORMAT': encodeURIComponent('image/png'),
      /*'WIDTH': '30',
      'HEIGHT': '20',*/
      'LEGEND_OPTIONS': encodeURIComponent('fontName:Open Sans;fontAntiAliasing:true;fontColor:0x777777;fontSize:10;dpi:96'),
      'TRANSPARENT': true
    };

    if (params !== undefined) {
        Object.assign(defaultParams, uppercaseParams);
    }

    return appendParams(serviceUri, defaultParams);
}