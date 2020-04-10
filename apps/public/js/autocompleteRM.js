var autocompleteRM = (function () {


    var _autocomplete = function(inputId, domLocation, autocompleteDatas, clickAction) {

        var autoCompleteElement = '<div id="rm-autocomplete-list"> </div>';

        // delete previous autocomplete results
        $('#rm-autocomplete-list').remove();

        $('#'+ domLocation).append(autoCompleteElement);
        $('#rm-autocomplete-list').append('<ul id="autocomplete-datas-list"></ul>');

        var nbItems = 0;

        // autocomplete creation
        autocompleteDatas.forEach(function (data) {
            
            if (typeof data.category !== 'undefined') {

                if ($('#' + data.category + '-list').length === 0) {
                    $('#autocomplete-datas-list').append('<li id="'+ data.category +'-list" class="autocomplete-list-title">'+ data.category +'</li>');
                }
               
                var inputVal = $('#' + inputId).val().trim();
                var indexItemSearch = data.label.toLowerCase().indexOf( inputVal.toLowerCase() );
                var substr = data.label.substring(indexItemSearch, indexItemSearch + inputVal.length );
                var dataLabelSplit = data.label.split(substr);
                var dataDisplay = dataLabelSplit[0] + '<span class="autocomplete-item-substr">' + substr + '</span>' + dataLabelSplit[1];
                $('#' + data.category + '-list').append('<li id="autocompleteItem-'+ nbItems +'" class="autocomplete-item">' + dataDisplay + '</li>');
            
            } else {

                var inputVal = $('#' + inputId).val().trim();
                var indexItemSearch = data.label.toLowerCase().indexOf( inputVal.toLowerCase() );
                var substr = data.label.substring(indexItemSearch, indexItemSearch + inputVal.length );
                var dataLabelSplit = data.label.split(substr);
                var dataDisplay = dataLabelSplit[0] + '<span class="autocomplete-item-substr">' + substr + '</span>' + dataLabelSplit[1];
                $('#' + data.category + '-list').append('<li id="autocompleteItem-'+ nbItems +'" class="autocomplete-item">' + dataDisplay + '</li>');
                $('#autocomplete-datas-list').append('<li id="autocompleteItem-'+ nbItems + '" class="autocomplete-item">' + dataDisplay + '</li>');
            
            }

            nbItems++;
        });

        var position = -1;
        
        // on keybord pressed in search input
        $(document).on('keydown', '#'+ inputId, function (e) {
           
            // keydown 
            if (e.keyCode === 40) {
                position++;
                if (position >= $('.autocomplete-item').length) {
                    position = 0;
                }
                for (var i =0; i < $('.autocomplete-item').length; i++) {
                    if (i === position) {
                        $('.autocomplete-item')[i].style = "background-color: #37B6FA";
                        $('#'+ inputId).val( $('.autocomplete-item')[i].innerText );
                    } else {
                        $('.autocomplete-item')[i].style = "background-color: white";
                    }
                }
                $('#rm-autocomplete-list').show();
            }
            // keyup 
            else if (e.keyCode === 38) {
                position--;
                if (position < 0) {
                    position = $('.autocomplete-item').length - 1;
                }
                for (var i =0; i < $('.autocomplete-item').length; i++) {
                    if (i === position) {
                        $('.autocomplete-item')[i].style = "background-color: #37B6FA";
                        $('#'+ inputId).val( $('.autocomplete-item')[i].innerText );
                    } else {
                        $('.autocomplete-item')[i].style = "background-color: white";
                    }
                }
                $('#rm-autocomplete-list').show();
            }
            // enter
            else if (e.keyCode === 13) {
                $('#'+ inputId).val( $('.autocomplete-item')[position].innerText );
                $('#rm-autocomplete-list').hide();
            }

        });
        // on mouse over autocomplete item event
        $(document).on('mouseover', '.autocomplete-item, .autocomplete-item-substr', function (e) {

            var eventId = '';
            if (e.target.className === 'autocomplete-item') {
             eventId = e.target.id;
            } else if (e.target.className === 'autocomplete-item-substr') {
             eventId = e.target.parentElement.id;
            }
            

            for (var i =0; i < $('.autocomplete-item').length; i++) {
    
                if ($('.autocomplete-item')[i] === $('#' + eventId)[0] ) {
                    position = i;
                    $('.autocomplete-item')[i].style = "background-color: #37B6FA";
                } else {
                    $('.autocomplete-item')[i].style = "background-color: white";
                }
            }

        });
        // on click  event 
        $(document).on('click', '#main', function (e) {
            
           if (e.target.className === 'autocomplete-item' || e.target.className === 'autocomplete-item-substr') {
           
               //var data = e.originalEvent.explicitOriginalTarget.data;
               var eventId = '';
               if (e.target.className === 'autocomplete-item') {
                eventId = e.target.id;
               } else if (e.target.className === 'autocomplete-item-substr') {
                eventId = e.target.parentElement.id;
               }
               var data = $('#' + eventId)[0].innerText;
               if (typeof clickAction === 'function') {

                    if (autocompleteDatas.length > 0) {
                        if (typeof autocompleteDatas[parseFloat(eventId.split('-')[1])] !== 'undefined') {

                            if (autocompleteDatas[parseFloat(eventId.split('-')[1])].label === data) {
                                clickAction(autocompleteDatas[parseFloat(eventId.split('-')[1])]);
                            }

                        }
                    }
                 
               }
                $('#' + inputId).val(data);
                $('#rm-autocomplete-list').hide();
            }  else if (e.target.id === inputId ) {
                $('#rm-autocomplete-list').show();
            }
            else if (e.target.className !== 'autocomplete-list-title' && e.target.id !== 'rm-autocomplete-list') {
                $('#rm-autocomplete-list').hide();
          }
        });

        $('#rm-autocomplete-list').css('width', $('#' + inputId).css('width') );

    };

    return {
        autocomplete: _autocomplete
    };

})();