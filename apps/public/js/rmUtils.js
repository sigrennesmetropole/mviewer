/**
 * Utils functions
 */

    
var utils = (function () {    

// TODO :  à commenter
    var _getDateFromFrench = function getDateFromFrench(date) {
        var val = date.split("/");
        return new Date(val[2], val[1]-1 , val[0]);
    };

    // TODO : à commenter
    // sorting on start date 
    var _sortByDate = function sortByDate(date1, date2) {
        return (date1[0]-date2[0]);
    };
    
    // TODO : à commenter
    // Fonction générique qui retourne les éléments d'une liste A qui ne sont pas dans une liste B
    var _getElemANotInListB = function getElemANotInListB(listA, listB){
        // elements = copie de la liste A
        var elements=Array.from(listA);

        for (var i = 0, lenB = listB.length; i < lenB; i++) {
            //var match = null;
            for (var j = 0, lenA = elements.length; j < lenA; j++) {
                if (listB[i].toUpperCase().trim() === elements[j].toUpperCase().trim()) {
                    // correspondance, on supprime l'entrée de la copie de la liste A 
                    //match = j;
                    elements.splice(j, 1);
                    break;
                }
            }

        }
        return elements;
    }
    
    
    /* ****************************** */
    return {
        getDateFromFrench: _getDateFromFrench,
        sortByDate : _sortByDate,
        getElemANotInListB : _getElemANotInListB
    };
})();