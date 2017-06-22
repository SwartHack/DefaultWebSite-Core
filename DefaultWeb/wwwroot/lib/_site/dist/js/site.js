/*!
 * defaultwebsite.net v1.0.0
 * Homepage: https://hackinc.net
 * Copyright 2012-2017 SwartHack
 * Licensed under ISC
 * Based on Bootstrap
*/
define('dws/komodel', function () {

    var viewModel = {

        file: ko.observable(''),
        files: ko.observableArray(),
        data: ko.observable(''),
        dataType: ko.observable(''),
        target: ko.observable(''),
        error: ko.observable(function (request, error, response) {
            alert(response + '\n' + error);
        }),
        waitEffects: ko.observable(false)

    };

    viewModel.data.subscribe(function (newdata) {

        if (viewModel.target())
            $(viewmodel.target()).html(newdata);
        else
            $(newdata).dialog();
    });



    return viewModel;
});
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
define('dws/actions', ['dws/controller'],
function (Control) {

    function showContentArea(selector)
    {
        if (!$(selector).is(':visible')) {
            hideAllContent();
            $(selector).show(); // beware that using an animated show (fadeIn, etc) may conflict with the visibility check
        }
    }

    function hideAllContent()
    {
        $('.content-area').hide();
    }

    $(document).ready(function () {

        $(document).on("shown.bs.collapse", "#doc-resume", function (e) {
            //$('#col-doc').scrollTop(this.offsetTop);
            $('#target-area').animate({ scrollTop: $(this).offset().top }, 800);
            if ($('#doc-cv').hasClass('in')) {
                $('#doc-cv').removeClass('in');
                $('[data-target="#doc-cv"]').toggleClass('collapsed');
            }

        });

        $(document).on("shown.bs.collapse", "#doc-cv", function (e) {
            //$('#col-doc').scrollTop(this.offsetTop);
            $('#target-area').animate({ scrollTop: $(this).offset().top }, 800);
            if ($('#doc-resume').hasClass('in')) {
                $('#doc-resume').removeClass('in');
                $('[data-target="#doc-resume"]').toggleClass('collapsed');
            }
        });

        $('#rundown').on('click',  function (e) {
            e.preventDefault();
            var $rundown = $(this);
            $('li.rundown').removeClass("selected");
            $rundown.addClass("selected");

            var settings = {
                url: "/Home/GetRundown?viewname=" + $rundown.attr('data-target-view'),
                cache: false,
                dataType: 'html'
            }
            Control.sendMessage(settings, '#target-area');
        });

        $(document).on('click', '.nav-link', function (e) {
            e.preventDefault();
            var url = "/Home/GetView?viewname=" + $link.attr('data-target-view');

            var deferred = new $.Deferred();
            deferred.done($("#target-area").html(data))
            .fail(function (error) {
                if (error !== 'aborted') {
                    alert('Error processing request');
                }
            }).always(function () {
               
            });
            Dispatch.ajaxRequestDefer(url, false, 'html', deferred);
        });

        $(document).on('click', '#btn-blog', function (e) {
            e.preventDefault();
            $('#blog-text').toggleClass('hidden');
            $('#blog-content').toggleClass('hidden');
        });


        $('input:checkbox').change(function () {

        })

        $('div#footer-scroll').endlessScroll({ width: '100%', height: '20px', steps: -2, speed: 40, mousestop: true });

    });

    return {
        showContentArea: showContentArea,
        hideAllContent: hideAllContent

    };

});

define('dws/sandbox', function () {




});
/// Main controller for event declarations, etc.
define('dws/controller', ['dws/komodel', 'dws/dispatcher'],
function (viewModel, Dispatch) {

    function test() {
        var settings = {
            url: "/Home/Talk?message=Hello Server",
            cache: false,
            dataType: 'html'
        }
        viewModel.target(null);
        Dispatch.ajaxRequest(settings);
    }

   
    function sendMessage(settings, target) {
        viewModel.target(target);
        Dispatch.ajaxRequest(settings);

    }

    function initKO() {
        ko.applyBindings(viewModel);
    }


    return {
        initKO: initKO,
        test: test,
        sendMessage: sendMessage
    }
    
});

require(['dws/actions']);
require(['dws/controller'],
function (control) {

    $(document).ready(function () {
        control.initKO();
    });
});
