{
mviewer.customLayers.sirene = {};
mviewer.customLayers.sirene.layer = new ol.layer.Heatmap({
        source: new ol.source.Vector({
            url: 'https://public.sig.rennesmetropole.fr/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeNames=eco_comm:audiar_commerce_2014&outputFormat=application/json&srsName=EPSG:4326',
            format: new ol.format.GeoJSON()
        })
  });
mviewer.customLayers.sirene.handle = false;
} 