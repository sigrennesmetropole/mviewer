var rmTools = (function() {

    /**
     * gather all layers informations from mviewer.getLayers and configuration file
     */
    var gatherLayersInformations = function () {

        var layersInformations = [];

        layers = mviewer.getLayers();

        for (const layer in layers) {

            configuration.getConfiguration().themes.theme.forEach(function (theme) {

                if (typeof theme.layer !== 'undefined') {

                    theme.layer.forEach(function (confLayer) {
                        var layerInformations = {};

                        if (layers[layer].layername === confLayer.id) {

                            layerInformations = Object.assign(layerInformations, layers[layer]);
                            layerInformations.id2 = layerInformations.id;
                            layerInformations = Object.assign(layerInformations, confLayer);
                            layersInformations.push(layerInformations);
                        }
        
                    });

                }

            });
                        
        }
        return layersInformations;
    };

    var displayMessageModal = function (message) {

        $('body').append('<div id="messageModalContainer"></div>');

        var modal = '<div id="messageModal" class="modal-dialog">'
        + '<div class="modal-content">'
         + '<div class="modal-header">'
         +   '<span class="modalCloseBtn">&times;</span>'
         + '</div>'
         + '<div class="modal-body">'
         +   '<div>' + message + '</div>'
         + '</div> </div> </div>';

         $('#messageModalContainer').html(modal);

         $('#messageModal').css({ 'position': 'fixed', 'top': '10%', 'left': '20%', 'width': '50%', 'height': 'auto'});

         $('.modalCloseBtn').click(function () {
             $('#messageModalContainer').remove();
         });

    };

    var getVisibleLayers = function () {

        var visibleLayers = [];
        var layers = mviewer.getLayers();

        for (layer in layers ) {
            
            if (layers[layer].layer.state_.visible) {
                visibleLayers.push( layers[layer] );
            }

        }

        return visibleLayers;

    };

    // AJOUT CBR
    var initTutorial = function () {
        // insert tutorial container
        if ( document.querySelector('#tutorialContainer') === null ) {
            $('#main').append('<div id="tutorialContainer" class="tutocontainer" role="dialog"></div>');
        } else {
            $('#tutorialContainer').css('z-index', '1');
        }
    };
    
    var displayTutorial = function (tutorialFile) {

                $.getJSON(tutorialFile, function (tutorialData) {

                var tutorialCode = ''; // code of all tutorial
                var ordersTab = [];

                tutorialData.forEach(function (data) {

                    if (typeof data.height === 'undefined') {
                        data.height = "auto";
                    }
                    if (typeof data.width === 'undefined') {
                        data.width = "auto";
                    }
                    if (typeof data.top === 'undefined') {
                        data.top = "auto";
                    }
                    if (typeof data.left === 'undefined') {
                        data.left = "auto";
                    }

                    // set tutorial item
                    var tutoHtml =  '<div id="tutorial' + data.order + '" class="didacticiel">'
                            +'<div class="didact-content" style="width: ' + data.width +'; top: ' + data.top +'; left: ' + data.left +'">'
                            +    '<div class="quote-container">'
                            +        '<i class="pin"></i>'
                            +        '<blockquote class="note postit" style="height: '+ data.height +'">' + data.content + '</blockquote>'
                            +    '</div>'
                            + '</div></div>';

                    tutorialCode += tutoHtml;

                    ordersTab.push( parseFloat(data.order) );

                });

                // SUPPR CBR - container ajouté en amont    
                // add tutorial container
                /*
                if ( document.querySelector('#tutorialContainer') === null ) {
                    $('body').append('<div id="tutorialContainer" class=""></div>');
                } else {
                    $('#tutorialContainer').css('z-index', '1');
                }
                */
                // FIN SUPPR
                $('#tutorialContainer').html(tutorialCode);

                // display first element
                var ordersTabSorted = ordersTab.sort();
                $('#tutorial' + ordersTabSorted[0]).show();
                if ( document.querySelector('#forewordContainer') !== null ) {
                    $('#tutorialContainer').hide();
                }

                $('#tutorialContainer').click(function (e) {

                    //if (e.target.className === 'didacticiel') {
                    var target = getFirstParentWithClass(e.target, 'didacticiel');
                    
                        for (var i =0; i < ordersTabSorted.length; i++) {
                            //if ('tutorial' + ordersTabSorted[i] === e.target.id) {
                            if ('tutorial' + ordersTabSorted[i] === target.id) {

                                $('#tutorial' + ordersTabSorted[i]).hide();

                                if (i+1 < ordersTabSorted.length) {
                                    $('#tutorial' + ordersTabSorted[i+1]).show();
                                    break;
                                } else if (i === (ordersTabSorted.length - 1) ) {
                                    $('#tutorialContainer').remove();
                                    $('#help').removeClass('showtuto'); 
                                    $('#map').focus();
                                }

                            }
                        }

                    //}

                });
            });
            
    };
    
    //That function returns the first parent of a DOM element which respects the given className
    function getFirstParentWithClass(element, className){
                
        if (element.classList.contains(className)){
            return element;
        } else {
            return getFirstParentWithClass(element.parentElement, className);
        }
        
    }
    
    // Function call to generate NRU PDF - API Urba
    function generatePDFNru(pdfUrl) {
        $('body').css('cursor','wait');
        $.get(pdfUrl, function(dataApi) {
            var blob = b64toBlob(dataApi.payload, dataApi.contenttype);
            saveAs(blob, dataApi.filename);
            $('body').css('cursor','auto');
        });
    };

    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);

            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    };

    /* SUPPR CBR
    var displayForeword = function (title, content, displayCheckbox) {

        var forewordContent = '<div class="foreword"> <div class="foreword-modal">'
        +'<div class="foreword-modal-content">'
        +  '<div class="foreword-modal-header">'
        +    '<span class="foreword-close">&times;</span>'
        +    '<h2>'+ title +'</h2>'
        +  '</div>'
        +  '<div class="foreword-modal-body">' + content + '</div>'
        +'<div class="foreword-modal-footer">';

        if (displayCheckbox) {

            forewordContent += '<input type="checkbox" id="neplusafficher"> <span>Ne plus afficher</span>';

        }

        forewordContent += ' </div></div></div></div></div>';

        // add foreword container
        if ( document.querySelector('#forewordContainer') === null ) {
            $('body').append('<div id="forewordContainer"></div>');
        } else {
            $('#forewordContainer').css('z-index', '1');
        }
            

        if (!localStorage.getItem("NePasAfficher")) {

            $('#forewordContainer').html(forewordContent);

        } else {

            $('#forewordContainer').remove();
            
            if (document.querySelector('#tutorialContainer') !== null) {
                $('#tutorialContainer').show();
            }
        }

        const closeBtn = document.querySelector('.foreword-close');

        if (closeBtn != null) {
            closeBtn.addEventListener('click', fermerAPropos);
        }

        $('#forewordContainer').click(function(e) {
            
            if (e.target.className === 'foreword-modal') {
                fermerAPropos(); 
            }

        });

        function fermerAPropos() {
       
            var neplusafficherId = document.getElementById("neplusafficher");

            if (neplusafficherId !== null && neplusafficherId.checked){
                localStorage.setItem("NePasAfficher", "true");
            } 

            $('#forewordContainer').remove();

            if (document.querySelector('#tutorialContainer') !== null) {
                $('#tutorialContainer').show();
            }
            
        }

    };
*/
    var getProjection = function () {

        return mviewer.getMap().getView().getProjection().getCode();

    };


    return {
        gatherLayersInformations: gatherLayersInformations,
        displayMessageModal: displayMessageModal,
        getVisibleLayers: getVisibleLayers,
        initTutorial: initTutorial,
        displayTutorial: displayTutorial,
        /* displayForeword: displayForeword, */
        generatePDFNru: generatePDFNru,
        getProjection: getProjection
    }

})();
