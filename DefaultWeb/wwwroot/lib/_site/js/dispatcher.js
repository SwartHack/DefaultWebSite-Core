define('dws/dispatcher', ['dws/komodel'], function (viewModel) {

  



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
        .done(function (data) {
            viewModel.data(data); 
        })
        .fail(function (request, error) {
            viewModel.aborted(request, error, this.responseText)
        })
        .always(function () {
            //waitEffects(false);
        });
    }

    function ajaxRequestDefer(url, cache, dataType, deferred) {
        $.ajax({
            url: url,
            cache: cache,
            dataType: dataType
        })
        .done(function (data) {
            deferred.resolve(data); //ok, fires deferred callback
        })
        .fail(function (request, error) {
            deferred.reject(this.responseText + '\n' + error)
        })
        .always(function () {

        });

    }

    function waitEffects(status) {

        if (status)
        {
            $('').addClass('waiting')
        }

        var completed = $(target)[0].complete;
        if (!completed) {
            $(target)[0].addClass('loading');
            $(target).load(function () {
                $(target).removeClass('loading');
            });
        }
    } 

    return {
        xhrRequest: xhrRequest,
        ajaxRequest: ajaxRequest
    }
    

});