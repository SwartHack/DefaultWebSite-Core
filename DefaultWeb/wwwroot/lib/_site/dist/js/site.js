/*!
 * defaultwebsite.net v1.0.0
 * Homepage: https://hackinc.net
 * Copyright 2012-2017 SwartHack
 * Licensed under ISC
 * Based on Bootstrap
*/
define('dws/model', ['dws/model-actions'], function (ModelActions) {

    var viewModel = {

        file: ko.observable(''),
        files: ko.observableArray([]),
        data: ko.observable(''),
        dataType: ko.observable(''),
        target: ko.observable(''),
        error: function (request, error, response) {
            alert(response + '\n' + error);
        },
        waiting: ko.observable(false),

        sources: ko.observableArray([]).sort(),

        source: ko.observable(''),
        sourceId: function (sid) {
            var index = viewModel.sources().findIndex(s => s.id == sid);
            viewModel.source(viewModel.sources()[index]);
        },
        sourceIndex: ko.observable(''),
        sourcesCount: ko.pureComputed(function () { return 'Records: ' + viewModel.sources().length }, this),
        addSource: function (item) {
            viewModel.sources.unshift(item);
        },
        removeSource: function (item) {
            viewModel.sources.remove(item);
        },
        
        sourceAdded: function (parent, index, item) {
            var $parent = $(parent);
            var $item = $(item);

            //viewModel.sources.sort();
            $item.hide().fadeIn('slow');

            //scroll to view TODO
            console.log('Source afterAdd... ');
        },
        //sourceRemoving: function (parent, index, item) {
        //    var $item = $(item);
        //    var $next = $item.closest('tr');
        //    var id = $next.attr('id');
        //    viewModel.sourceId(id);

        //},
        comments: ko.observableArray([]),
        comment: ko.observable(''),
        commentsCount: ko.pureComputed(function () { return 'Records: ' + viewModel.comments().length }, this),
        addComment: function (item) {
            viewModel.comments.unshift(item);
        },
        removeComment: function (item) {
            viewModel.comments.remove(item);
        },
        commentAdded: function (item) {
            var $item = $(item);
            $item.hide().fadeIn('slow');
            console.log('Comment afterAdd... ');
        },
        canAddComment: function () { return this.source === null ? false : true }

        
    };

    viewModel.data.subscribe(function (newdata) {

        if (viewModel.target())
            $(viewModel.target()).html(newdata);
        else
            $(newdata).dialog();
    });

    viewModel.source.subscribe(function (source) {
        //$('#sources-table tbody tr').removeClass('active');
        //var index = viewModel.sources.indexOf(source);
        //$($('#sources-table tbody tr')[index]).addClass('active').siblings().removeClass('active');

        if (source === null) {
            //when the source has just been removed?!???
        }


        if (source != null && source.comments != null) {
            viewModel.comments(source.comments);
        }

        console.log('source subscribe:' + source);
    });

    viewModel.waiting.subscribe(function (wait) {

        if (wait) {

        }
        else {

        }

        //function waitEffects(status) {

        //    if (status) {
        //        $('').addClass('waiting')
        //    }

        //    var completed = $(target)[0].complete;
        //    if (!completed) {
        //        $(target)[0].addClass('loading');
        //        $(target).load(function () {
        //            $(target).removeClass('loading');
        //        });
        //    }
        //} 

    });


    return viewModel;
});
define('dws/model-actions', function () {


    

})
define('dws/dispatcher', ['dws/model'], function (ViewModel) {

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
                //based on requested data type
                ViewModel.data(data); 
        })
        .fail(function (request, error) {
            ViewModel.aborted(request, error, this.responseText)
        })
        .always(function () {
            //waitEffects(false);
        });
    }

    function ajaxRequestDefer(settings, deferred) {
        $.ajax(settings)
        .done(function (data) {
            deferred.resolve(data); //ok, fires deferred callback
        })
        .fail(function (request, error) {
            deferred.reject(this.responseText + '\n' + error)
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
define('dws/actions', ['dws/controller'],
function (Control) {
    
    $(document).ready(function () {

        
        /////////////////////////////
        /// click events
        ////////////////////////////
        $('.rundown').on('click',  function (e) {
            e.preventDefault();
            var $rundown = $(this);
            $('.rundown').removeClass("selected");
            $rundown.addClass("selected");

            Control.sendMessage($rundown);
        });

        $('.nav-link').on('click', function (e) {
            e.preventDefault();
            var $item = $(this);
            Control.sendMessageDefer($item);
        });

        $(document).on('click','.sand-link', function (e) {
            e.preventDefault();
            var $item = $(e.target);
            $('.sand-link').removeClass('active');
            $item.addClass('active');
            Control.sendMessageDefer($item);
        });

        $(document).on('click', '#btn-blog', function (e) {
            e.preventDefault();
            $('#blog-text').toggleClass('hidden');
            $('#blog-content').toggleClass('hidden');
        });


        /////////////////////////////
        /// show/hide events
        ////////////////////////////
        $(document).on("shown.bs.collapse", "#doc-resume", function (e) {
            e.preventDefault();
            $('#contact.card').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-cv').hasClass('show')) {
                $('#doc-cv').removeClass('show');
            }
        });

        $(document).on("hide.bs.collapse", "#doc-resume", function (e) {
            $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
        });

        $(document).on('hide.shown.bs.collapse', '#doc-cv', function (e) {
            e.preventDefault();
            $('#contact.card').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-cv"] button h4 i').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-resume').hasClass('show')) {
                $('#doc-resume').removeClass('show');
            }
        });

        $(document).on('bs.collapse','#doc-cv', function (e) {
            $('[data-target="#doc-cv"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
        });

        $('#source-modal').on('hidden.bs.modal', function (e) {
            // refresh after add, detect cancel
            var settings = {
                url: "/Sources/Main",
                cache: false
            }
            Control.sendMessage(settings, '#sandbox-area');
        })

        /////////////////////////////
        /// popover init
        ////////////////////////////

        var options = {
            trigger: 'click',
            title: 'What is a Run-down???',
            content: 'A Run-down is a casual non-authoritative white-paper. In my words and IMHO...',
            placement: 'bottom',
            delay: { "show": 200, "hide": 100 }

        }

        $('#rundown-info').popover(options);
        
        //$('#rundown-info').on('click', function (e) {
        //    $(this).popover('toggle');
        //})

        ////////////////////////////////
        // stupid re-size events..
        ///////////////////////////////
        //$(window).resize( function () {
        //    var $rd = $('#rundowns');
        //    var $colrd = $('#col-rundowns');
        //    var $hdrd = $('#rundowns-header')
        //    $rd.height( $colrd.height() - $hdrd.innerHeight() );
        //})

        //$(window).load(function () {
        //    var $rd = $('#rundowns');
        //    var $colrd = $('#col-rundowns');
        //    var $hdrd = $('#rundowns-header')
        //    $rd.height( $colrd.height() - $hdrd.innerHeight() );
        //})

        /////////////////////////////
        /// other events
        ////////////////////////////


     

        $('div#footer-scroll').endlessScroll({ width: '100%', height: '20px', steps: -2, speed: 40, mousestop: true });

    });

    return {
     
    };
});

define('dws/sandbox', ['dws/model'], function (ViewModel) {

    //lets monitor the sand box area for new content and bind accordingly
    var config = {
        attributes: true,
        childList: true,
        characterData: true
    };

    var observer = new MutationObserver(function (changes) {
        changes.forEach(function (change) {
            
            if (change.addedNodes.length > 0) {
                var $dataNodes = $(change.addedNodes).find('[data-bind]');
                $dataNodes.each(function () {
                    var $node = $(this);
                    try {
                        if (!ko.dataFor($node[0])) { ko.applyBindings(ViewModel, $node[0]) }
                    } catch (e) {
                        console.log("ko re-bind exception....")
                    }
                })

                //ko.applyBindings(ViewModel, document.getElementById('sandbox-area'));
                //var newNodes = change.addedNodes;
                //var i;
                //for (i = 0; i < newNodes.length; i++) {
                //    if (!ko.dataFor(newNodes[i])) { ko.applyBindings(ViewModel, newNodes[i]); }
                //}

                //change.addedNodes.forEach(function (item, index) {
                //    if (!ko.dataFor(item))
                //        ko.applyBindings(ViewModel, item);
                //})
            }
        });
    });

    function observe(state) {
        if (state) {
            observer.observe(document.getElementById('sandbox-area'), config);
        }
        else {
            observer.disconnect();
        }
    }
    
    ///
    ///if we ever need for some reason....
    ///
    //function findNode($nodes) {
    //    $nodes.each(function () {
    //        var $node = $(this);
    //        if ($node.children().length() > 0) {
    //            findNode($node.children());
    //        }

    //        if ($node.attr('data-bind')) {
    //            console.log($node.attr('data-bind'));  // the new element	
    //            try {
    //                ko.applyBindings(ViewModel, $node);
    //            } catch (e) {
    //                alert(e.message);
    //            }
    //        }

    //    });
    //}

    return {
        observe:observe
    }
});
/// Main controller for event declarations, etc.
define('dws/controller', ['dws/model', 'dws/dispatcher'],
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

    //////////////////////////////////
    ///
    ////////////////////////////////
    function showContentArea(selector) {
        if (!$(selector).is(':visible')) {
            hideAllContent();
            $(selector).show(); // beware that using an animated show (fadeIn, etc) may conflict with the visibility check
        }
    }

    function hideAllContent() {
        $('.content-area').hide();
    }
    
    //////////////////////////////////
    ///
    ////////////////////////////////
    function parseNavUrl($link) {
        var url;

        if ($link.attr('data-target-controller') && $link.attr('data-target-action')) {
            url = "/" + $link.attr('data-target-controller') + "/" + $link.attr('data-target-action');
        }
        else {
            url = "/Home/GetView";
        }

        if ($link.attr('data-target-id')) {
            url = url + '?id=' + $link.attr('data-target-id');
        }

        return url;
    }

    //////////////////////////////////
    ///
    ////////////////////////////////
    function sendMessage($item) {
        var target = $item.attr('data-target')
        var url = parseNavUrl($item);
        var settings = {
            url: url,
            cache: false
        }
        viewModel.target(target);
        Dispatch.ajaxRequest(settings);
       
    }

    //////////////////////////////////
    ///
    ////////////////////////////////
    function sendMessageDefer($item) {
        var target = $item.attr('data-target')
        var url = parseNavUrl($item);
        var settings = {
            url: url,
            cache: false
        }
        
        var deferred = new $.Deferred();
        deferred.done(function (data) {
            if (!data) {
                alert('invalid data from server');
            }
            else {
                // or return deferred to calling action
                viewModel.data(data);
            }
        }).fail(function (error) {
            alert(error);
        });

        viewModel.target(target);
        Dispatch.ajaxRequestDefer(settings, deferred);

    }

    //////////////////////////////////
    ///
    ////////////////////////////////
    function initKO() {
        ko.applyBindings(viewModel);
    }

    return {
        initKO: initKO,
        test: test,
        sendMessage: sendMessage,
        sendMessageDefer: sendMessageDefer,
        showContentArea: showContentArea,
        hideAllContent: hideAllContent,
        parseNavUrl: parseNavUrl
    }
});

define('dws/comments', ['dws/controller', 'dws/model'],
function (Control, viewModel) {

    function GetSources() {
        
        var settings = {
            url: "/Comments/GetSources",
            cache: false,
            dataType: 'json'
        }

        //// integrate into dispatcher.js  TODO
        $.ajax(settings)
            .done(function (data) {
                viewModel.sources([]);
                viewModel.sources(data.sources);
                // this is against my pattern!!!! TODO
                // model should deal with this, but only first time loading...
                if (data.sources.length > 0) {
                    $('#sources-table tbody tr:first').addClass('active');
                    viewModel.source(data.sources[0]);
                }
                
            })
            .fail(function (request, error) {
                viewModel.aborted(request, error, this.responseText)
            })
            .always(function () {
                //waitEffects(false);
            });
    }

    $(document).on('submit', 'form#create-source', function (e) {

        e.preventDefault();

        var $form = $(this);
        var $submitButton = $('.submit', $form);
        $submitButton.attr("disabled", true);

        //serialize form values to JSON
        var data = $form.serializeArray();
       
        //close the form
        $form.parent().hide();

        $.ajax({
            url: '/Comments/CreateSource',
            dataType: 'json',
            type: 'POST',
            data: data

        }).done(function (data, status) {
            if (!status == 'ok') {
                alert('Invalid response from server...')
            }
            viewModel.addSource(data.source);
        }).fail(function (error) {
            alert('error');
        });

    });

    $(document).on('submit', 'form#create-comment', function (e) {

        e.preventDefault();

        var $form = $(this);
        var $submitButton = $('.submit', $form);
        $submitButton.attr("disabled", true);

        //serialize form values to JSON
        var data = $form.serializeArray();
        var index = data.findIndex(obj => obj.name == 'SourceId');
        data[index] = viewModel.source.id;

        //close the form
        $form.parent().close();

        $.ajax({
            url: '/Comments/CreateComment',
            dataType: 'json',
            type: 'POST',
            data: data
        }).done(function (data, status) {
            if (!data.Comment) {
                alert('Invalid response from server...')
            }
            viewModel.addComment(data.Comment);
        }).fail(function (error) {
            alert('error');
        });

    });

    $(document).on('click', '#sources-table tbody tr', function (e) {
        var $item = $(e.currentTarget);
        var id = $item.attr("id");
        $item.addClass('active').siblings().removeClass('active');
        viewModel.sourceId(id);

    });

    $('#modal-action-template').on('show.bs.modal', function (e) {
       
        e.preventDefault();
        var $item = $(this);
        var type = $item.attr('data-type');
        var action = $item.attr('data-action');
        
        var settings = {
            url: "/Comments/GetModalContent?datatype=" + type + '&action=' + action,
            cache: false,
            dataType: 'html'
        }
        Control.sendMessage(settings, '#modal-action-template');

    });

    $(document).on('click', 'a#source-delete', function (e) {
        e.preventDefault();
        
        $.ajax({
            url: '/Comments/DeleteSource?id=' + viewModel.source().id,
            dataType: 'json'
        }).done(function (status) {
            if (!status == 'ok') {
                alert('Invalid response from server...')
            }
            viewModel.removeSource(viewModel.source().id);
        }).fail(function (error) {
            alert(error);
        });
        
    });

    $(document).on('click', '#comment', function (e) {
        var $item = $(e.currentTarget);
        var id = $item.attr("id");
        $item.addClass('active').siblings().removeClass('active');
        viewModel.sourceId(id);

    });

    return {
        GetSources: GetSources
    }
});




        


require(['dws/actions']);
require(['dws/comments']);
require(['dws/sandbox']);
require(['dws/model-actions']);
require(['dws/controller']),
function (control) {

    $(document).ready(function () {
        control.initKO();
    });
}
