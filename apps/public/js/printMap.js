var printMap = (function() {

      /**

        * Property: _map

        *  @type {ol.Map}

        */
       var _map;


      var printInput = '<a href="#" id="printMapbtn" title="Imprimer cette carte" download="carte.png" class="btn btn-default btn-raised" accesskey="">'
                   + '<span class="glyphicon glyphicon-print" aria-hidden="true"></span>'
                  + '</a>';
    

    var init = function () {
        _map = mviewer.getMap();
    
        $('#toolstoolbar').append(printInput);
        $('#printMapbtn').hide();

       $('#printMapbtn').click(function(event) {
            event.preventDefault();
            print();
        });
    };

        /*
        * enable search print map functionality
        */
       var enable = function() {
        $('#printMapbtn').show();
    };


    /*
    * disable print map functionality
    */
    var disable = function() {
        $('#printMapbtn').hide();
    };


    var createPrintWindow = function(pictureSrc) {

      var legendTitles = [];
      var legendImages = [];
      var legend = '';

      // for each item in the lengend of mviewer, we get the item name
      $.each($('.layerdisplay-title'), function (i, title) {
        legendTitles.push(title.firstChild.innerText);
      });

      // for each item in the lengend of mviewer, we get the picture of the lengend
      $.each($('.layerdisplay-legend > img'), function (i, legend) {
        legendImages.push(legend.outerHTML);
      });

      
      for (var i=0; i< legendTitles.length; i++) {
        legend += '<div class="legendItem"><p>' + legendTitles[i] + '</p>' + legendImages[i] +'</div>';
      }


      var printPage = '<div id="printPage"> <div id="mapLegend"><label>Légende</label><div class="legendContainer">'+ legend +'</div></div>'
      + '<div id="mapToPrint" class="mapToPrint">'
      +    '<img id="exportMap" class="exportMap fit-picture" src="'+ pictureSrc +'" alt="carte à imprimer">'
      +  '</div>'
      +  '<div class="notesContainer">'
      +   '<label>Notes</label> '
      +    '<textarea rows="3" type="textfield"></textarea>'
      +  '</div>'
      +   '<div class="printBtnContainer"> <a href="#" id="printPage_printBtn" class="btn">'
      +       '<span class="glyphicon glyphicon-print" aria-hidden="true"> <span class="printLabel">Imprimer</span> </span>'
     +     '</a> </div>'
      +'</div>';

      var printScript = '<script type="text/javascript">'
                        +  '$("#printPage_printBtn").click(function(event) {'
                        +  'event.preventDefault();'
                        +   '$(".printBtnContainer").hide();'
                        +   'window.print();'
                        +   '$(".printBtnContainer").show(); /*window.close()*/ });'
                        +'</script>';

      var printWindow = window.open('', 'Print', 'height=600,width=800');
  
      printWindow.document.write('<html><head><title>Impression de votre plan</title>');
      printWindow.document.write('<link rel="stylesheet" href="apps/public/css/printMap.css" type="text/css" />');
      printWindow.document.write('<script type="text/javascript" src="lib/jquery/base/1.10.2/jquery-1.10.2.min.js"></script>');
      printWindow.document.write('<script type="text/javascript" src="lib/bootstrap/3.3.6/js/bootstrap.min.js"></script>');
      printWindow.document.write('<link href="lib/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />');
      printWindow.document.write('</head><body >');
      printWindow.document.write(printPage);
      printWindow.document.write(printScript);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
    };

    /*
    */
    var print = function() {
      

      var exportPNGElement = document.getElementById('printMapbtn');
      _map.once('postcompose', function(event) {
          try {
              //var canvas = event.context.canvas;
              var canvas = $('.ol-layer > canvas')[0];
              exportPNGElement.href = canvas.toDataURL('image/png');
              createPrintWindow(exportPNGElement.href);
          }
          catch(err) {
              mviewer.alert(err, "alert-info");
          }
      });
      _map.renderSync();

    };

    return {
        init: init,
        enable: enable,
        disable, disable
    };

})();

setTimeout(function () {
  if (configuration.getConfiguration().application.printMap === "true") {
    printMap.init();
    printMap.enable();
  } else {
    printMap.disable();
  }
}, 2000);
