var searchRM = (function () {

        /**

        * Property: _map

        *  @type {ol.Map}

        */
        var _map;

        var _searchRVAInput =  '<div id="rechercheRVA"><div id="searchContainer">'
        +  '<input type="text" class="form-control" placeholder="Rechercher" id="adressInput">'
        + '<div id="containerSearchParams">'
        +  '<button href="#" id="searchConfig" title="Recherche addresse ou commune" class="btn btn-default btn-raised">'
        +      '<span class="glyphicon glyphicon-search" aria-hidden="true"></span>'
        +  '</button> </div>'
        +'</div></div>';

        var init = function(searchParameters, paramsDefaultCheked) {
            _map = mviewer.getMap();
            $('#zoomtoolbar').before(_searchRVAInput);
            $('#rechercheRVA').hide();

            searchRM_openLayers.init('4d6518cc4f4d39580da4', _map);


            $('#adressInput').keypress(function (event) {
                var placeSearch = $('#adressInput').val().trim();
                if (event.keyCode == 13) {
                    searchLocation(placeSearch);
                }
            });

            autocompleteRM.init('4d6518cc4f4d39580da4');
        
            var selectList = '<select id="searchItems" multiple="multiple"></select>';

            autocompleteRM.autocomplete('adressInput', searchRM_openLayers, 'searchItems');

            $('#rechercheRVA').append(selectList);

            var searchParamsData = [];
            searchParameters.split(',').forEach(function (element) {
                searchParamsData.push(element.trim());
            });

            var paramsDefaultChekedData = [];
            paramsDefaultCheked.split(',').forEach(function (element) {
                paramsDefaultChekedData.push(element.trim());
            });


            $("#searchItems").select2({
                closeOnSelect : false,
                width: '88%',
                //dropdowParent: $('#a'),
                data: searchParamsData
            }).val(paramsDefaultChekedData).trigger("change");

            $('.select2-container').css( 'overflow-y','auto');

            var display = false;
            $('.select2-container').hide();

            $('#searchConfig').click(function () {
                if (display == false) {
                    display = true;
                } else if (display == true) {
                    display = false;
                }
                if (display == false) {
                    $('.select2-container').hide();
                } else if (display == true) {
                    $('.select2-container').show();
                }
            });

        };

        /*
        * enable search location from RVA functionality
        */
        var enable = function() {
            $('#zoomtoolbar').css('top','109px');
            $('#toolstoolbar').css('top','206px');
            $('#rechercheRVA').show();
        };


        /*
        * disable search location from RVA functionality
        */
        var disable = function() {
            $('#zoomtoolbar').css('top','65px');
            $('#toolstoolbar').css('top','160px');
            $('#rechercheRVA').hide();
        };


        /*
        *  
        */
        var searchLocation = function(searchVal) {
            var searchParameters = $('#searchItems').val();

            if (placeSearch != '') {
                searchRM_openLayers.search(searchVal);
            }
        };


        return {
            init: init,
            enable: enable,
            disable, disable
        };

})();