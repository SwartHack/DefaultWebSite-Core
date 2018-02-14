//////////////////////////////////////////////////////////////////////
/// message dispatcher module
//////////////////////////////////////////////////////////////////////
define(['dws/model'], function (ViewModel) {

    function xhrRequest(url) {
            
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);

            }
            else {
                alert("Message not found!" + this.readyState + ":" + this.status + "-" + this.responseText);
            }
        }
        //Pass the value to a web page on server as query string using XMLHttpObject.    
        xmlHttp.open("GET", url, true);
        xmlHttp.send();

    }

    function ajaxRequest(settings) {
        //waitEffects(true);
        $.ajax(settings)
        .done(function (data, textStatus, xhr) {
            //based on requested data type
            ViewModel.data(data); 
        })
        .fail(function (xhr, textStatus, error) {
            ViewModel.abort(xhr, textStatus, error);
        })
        .always(function () {
        //waitEffects(false);
        });
    }


    function ajaxRequestDefer(settings, deferred) {
        $.ajax(settings)
            .done(function (data, textStatus, xhr) {
                deferred.resolve(data); //ok, fires deferred callback
            })
            .fail(function (xhr, textStatus, error) {
                deferred.reject(this.responseText + '\n' + error);
            })
            .always(function () {
        
            });
    }

    return {
        xhrRequest: xhrRequest,
        ajaxRequest: ajaxRequest,
        ajaxRequestDefer: ajaxRequestDefer
    }
});