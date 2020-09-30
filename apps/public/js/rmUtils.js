/**
 * Utils functions provided from a module (can be imported from other modules)
 */

// Fonction de génération de pdf
export function generatePDFNru(pdfUrl){
    $('body').css('cursor','wait');
    $.get(pdfUrl, function(dataApi) {
        var blob = b64toBlob(dataApi.payload, dataApi.contenttype);
        // MODIF CBR 
        //saveAs(blob, dataApi.filename);
        /*
        import fileSaver from '../lib/FileSaver.min.js';
        fileSaver.saveAs(blob, dataApi.filename);
        */
        import('../lib/FileSaver.min.js').then((saveAs)=>{saveAs(blob, dataApi.filename);});

        // FIN MODIF CBR
        $('body').css('cursor','auto');
    });
}


 