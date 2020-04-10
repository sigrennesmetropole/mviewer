var searchSitesorg = (function () {

    var apiKey;

    var getSuggests = function (orgSearch) {
        return new Promise(resolve => {
            $.ajax({
                url: "https://api-sitesorg.sig.rennesmetropole.fr/v1/recherche/suggest?q=" + orgSearch,
                context: document.body,
                headers: {'X-API-KEY': apiKey}
            }).done(function (res) {
                resolve({'response': res, 'category': 'sitesorg'});
            });
        });
    };

    var getOrganismes = function (orgSearch) {
        var requestUrl = 'https://api-sitesorg.sig.rennesmetropole.fr/v1/recherche?adresse=&etats[]=actif&etats[]=projet&etats[]=inactif'
                        + '&niveaux_org[]=3&niveaux_org[]=1&niveaux_org[]=2&niveaux_site[]=1&termes='
                        + orgSearch + '&termes_op=AND&types[]=organisme&limit=20&offset=0';

        return new Promise(resolve => {
            $.ajax({
                url: requestUrl,
                context: document.body,
                headers: {'X-API-KEY': apiKey}
            }).done(function (res) {
                resolve({'response': res, 'category': 'sitesorg'});
            });
        });
    };

    /**
     * get main site from organism
     * @param {*} org organism
     */
    var getMainSite = function (org) {

        var mainSite = '';
        if (org.autres !== null) {

            org.autres.forEach(function (data) {

                if (data.includes('Site principal')) {
                    mainSite = data.split(':')[1].trim();
                }
    
            });
            
        }

        return mainSite;

    };

    /**
     * get main site information from organism
     * @param {*} org organism
     */
    var getSiteFromOrg = function (mainSite) {

        var requestUrl = 'https://api-sitesorg.sig.rennesmetropole.fr/v1/recherche?'
                       + 'adresse=&etats[]=actif&etats[]=projet&etats[]=inactif&niveaux_org[]=3'
                       + '&niveaux_org[]=1&niveaux_org[]=2&niveaux_site[]=1&termes='+ mainSite
                       + '&termes_op=AND&types[]=site&limit=20&offset=0';

        return new Promise(resolve => {
            $.ajax({
                url: requestUrl,
                context: document.body,
                headers: {'X-API-KEY': apiKey}
            }).done(function (site) {
                resolve({site});
            });
        });
        
    };

    /**
     * get [x,y] coordinates from site
     * @param {*} site
     */
    var getSiteCoordinates = function (site) {

        var idSite = site.site[0].id;

        var requestUrl = 'https://api-sitesorg.sig.rennesmetropole.fr/v1/sites/' + idSite;

        return new Promise(resolve => {
            $.ajax({
                url: requestUrl,
                context: document.body,
                headers: {'X-API-KEY': apiKey}
            }).done(function (res) {
                resolve({x: res.sitePt.x, y: res.sitePt.y});
            });
        });

    }

    var setSitesorgAutocompleteDatas = function (response, itemSearchLowerCase) {

        var dataRes = [];

        for (var i=0; i < response.response.length; i++) {
            
            if (response.response[i].nom.toLowerCase().includes(itemSearchLowerCase)) {
                var localisation = '';
                if (response.response[i].autres !== null) {
                    localisation = response.response[i].autres[0].split(':')[1].trim();
                }
                var label = response.response[i].nom + ' (' + localisation + ')';
                dataRes.push({ label: label, category: "Organismes", 
                mainSite: getMainSite(response.response[i]), themes: 'sitesorg'});
            }
        }

        return dataRes;

    };


    var init = function(key) {
        apiKey = key;
    };

    return {
        init: init,
        setSitesorgAutocompleteDatas: setSitesorgAutocompleteDatas,

        getSuggests: getSuggests,
        getOrganismes: getOrganismes,
        getSiteFromOrg: getSiteFromOrg,
        getSiteCoordinates: getSiteCoordinates
    };


})();