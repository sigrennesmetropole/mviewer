var searchCadastreRM = (function () {

    var baseUrl_cadastre;

    var languageFr = {
        inputTooShort: function (args) {
            return 'Saisissez au moins ' + args.minimum + ' caractères';
        },
        errorLoading: function () {
            return 'Les résultats ne peuvent pas être chargés.';
        },
        inputTooLong: function (args) {
            return 'Vous pouvez entrer seulement ' + args.maximum + ' caractères';
        },
        noResults: function () {
            return 'Aucun résultat trouvé';
        },
        searching: function () {
            return 'Recherche en cours…';
        },
        maximumSelected: function (args) {
            return 'Vous pouvez seulement sélectionner ' + args.maximum +
              ' élément' + (args.maximum > 1) ? 's' : '';
        }
    };

    var selectCityInput = '<div class="col-lg-7 noPaddingLeft"> <label>Commune</label>'
             + '<select id="communeSearch" name="communeSearch" class="form-control">'
							+	'<option></option> </select></div>';

    var sectionTag = '<div class="col-lg-3">'
            + '<label class="labelSection">Section</label>'
            + '<div class="sectionInputContainer">'
                + '<select id="section" class="sectionsList form-control">'
                    + '<option></option>'
                + '</select>'
            + '</div>'
        + '</div>';
    
    var parcelTag = '<div>'
    +	'<label class="labelParcelle">Parcelle</label>'
    +	'<div class="parcelleInputContainer">'
    +		'<select id="parcelle" class="parcellesList form-control" disabled>'
    +			'<option></option>'
    +		'</select>'
    +	'</div>'
    +'</div>';

    var projection;

    var setCities = function () {

        // get from cadastre API, Rennes métropole cities list
        $.getJSON(baseUrl_cadastre + 'communes', function(dataApiJson) {
            var dataCommune = $.map(dataApiJson, function (item) {
                    return { text: item.name, id: item.idComm }
            });
            $('#communeSearch').select2({
                   minimumInputLength: 0,
                    width: '100%',
                    language: languageFr,
                    closeOnSelect: true,
                    data: dataCommune,
                    placeholder: "recherche de parcelle"
            });

            $(".sectionsList").prop("disabled", true);
            $(".parcellesList").prop("disabled", true);
        });

    };

    var setSections = function () {

        $(document).on('select2:select','#communeSearch', function (e) {
            $('.sectionsList').empty();
            $('.parcellesList').empty();
            $('.sectionsList').append('<option></option>');
            $('.parcellesList').append('<option></option>');
            var data = e.params.data;
            // Liste sections
            $.getJSON(baseUrl_cadastre + 'communes/'+data.id+'/sections', function(dataApiJson) {
                dataSection = $.map(dataApiJson, function (item) {
                    return { text: item.codSect, id: item.idSect }
                });
                $('.sectionsList').select2({
                    minimumInputLength: 0,
                    language: languageFr,
                    closeOnSelect: true,
                    width: 'resolve',
                    data: dataSection
                });
    
                $(".sectionsList").prop("disabled", false);
                $(".parcellesList").prop("disabled", true);
            });
        });

    };

    var setParcelles = function() {

        $(document).on('select2:select','.sectionsList', function (e) {

            var data = e.params.data;
            $('.parcellesList').val('').trigger('change');

            $.getJSON(baseUrl_cadastre + 'sections/'+data.id+'/parcelles', function(dataApiJson) {
                var dataParcelle = $.map(dataApiJson, function (item) {
                    return { text: item.numero, id: item.idParc }
                });
                $('.parcellesList').select2({
                    minimumInputLength: 0,
                    language: languageFr,
                    closeOnSelect: true,
                    width: 'resolve',
                    data: dataParcelle
                });
    
                $(".parcellesList").prop("disabled", false);
            });

        });

    };

  var getCenterGeometry = function (geomCoords) {

    var nbCoords = geomCoords.length;
    var sumX = 0;
    var sumY = 0;

    geomCoords.forEach(function (coord) {
      sumX += parseFloat(coord[0]);
      sumY += parseFloat(coord[1]);
    });

    var x = sumX / nbCoords;
    var y = sumY / nbCoords;

    return [x, y];

  }


  var DisplayParcel = function () {

    $(document).on('select2:select','.parcellesList', function (e) {
        var data = e.params.data;

        var styles = [
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'blue',
              width: 3
            }),
            fill: new ol.style.Fill({
              color: 'rgba(0, 0, 255, 0.1)'
            })
          })
        ];


        $.getJSON(baseUrl_cadastre + 'epsg:3948/parcelles/' + data.id, function(dataApiJson) {

          var geomNewProj = [];

          dataApiJson.coordonnees.geometry.coordinates[0][0].forEach(function (coordinates) {
              geomNewProj.push( proj4('EPSG:3948', projection, coordinates) );
          });

          var geojsonObject = {
            'type': 'FeatureCollection',
            'crs': {
              'type': 'name',
              'properties': {
                'name': 'EPSG:3857'
              }
            },
            'features': [{
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': [geomNewProj]
              }
            } ]
          };
          
          var source = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
          });
          
  
          var layerCadatsreFound = false; 
          
          mviewer.getMap().getLayers().array_.forEach(function (lay) {
  
            if (lay.values_.className === 'cadastreLayer' ) {
              layerCadatsreFound = true;
              lay.setSource(source);
              layerExtent = lay.getExtent();
            }

          });

          if (!layerCadatsreFound) {
          
            var layer = new ol.layer.Vector({
              source: source,
              className: 'cadastreLayer',
              style: styles,
              zIndex: 0
            });

            mviewer.getMap().addLayer(layer);

          }

          mviewer.getMap().getView().setCenter( getCenterGeometry(geomNewProj) );
          mviewer.getMap().getView().setZoom(17);

        });

    });

  };



    var init = function () {

        baseUrl_cadastre = 'https://api-cadastre.sig.rennesmetropole.fr/v1/';

        projection = rmTools.getProjection();

        var searchCadastreElement = '<div id="parcelSelector" class="displayFlex col-sm-offset-6 col-sm-6 col-md-offset-3 col-md-8 col-lg-offset-6 col-lg-6 col-xl-offset-7 col-xl-5">' 
                                  + '<div id="parcelInputs" class="displayFlex">' + selectCityInput + sectionTag  + parcelTag + '</div>'
                                  +'<button id="dispalysearchParcel" title="recherche par parcelle" class="btn btn-default btn-raised">'
                                  + '</button> </div>';

        $('#searchRMContainer').prepend(searchCadastreElement);
        //$('#zoomtoolbar').before(searchCadastreElement);


        setCities();

        setSections();

        setParcelles();

        DisplayParcel();

        $('#dispalysearchParcel').click(function () {

          $('#parcelInputs').removeClass('slideOutEffect');
          $('#parcelInputs').removeClass('slideInEffect');
          
          if ( $('#parcelInputs').css('visibility') === 'visible' ) {

            $('#parcelInputs').addClass('slideOutEffect');
            window.setTimeout(function () {
              $('#parcelInputs').css('visibility', 'hidden');
            }, 1500);

          } else if( $('#parcelInputs').css('visibility') === 'hidden' ) {

            $('#parcelInputs').css('visibility', 'visible');
            $('#parcelInputs').addClass('slideInEffect');

          }

        });

    }



    return {
        init: init
    };

})();