/*!
 * defaultwebsite.net v1.0.0
 * Homepage: https://hackinc.net
 * Copyright 2012-2017 SwartHack
 * Licensed under ISC
 * Based on...
*/
//////////////////////////////////////////////////////////////////////
/// KO View Model module
//////////////////////////////////////////////////////////////////////
define('dws/model', ['dws/model-utils'], function (ModelUtils) {
    
    var viewModel = {

        data: ko.observable(''),
        target: ko.observable(''),
        dataType: ko.observable(''),
        dataJson: ko.observable(''),
        targetJson: ko.observable(''),
        abort: function (xhr, status, error) {
            viewModel.errorXhr(xhr);
            viewModel.errorStatus(status);
            viewModel.errorMsg(error);
        },
        errorXhr: ko.observableArray([]),
        errorStatus: ko.observable(''),
        errorMsg: ko.observableArray(''),
        waiting: ko.observable(false),
        waitingTarget: ko.observable(''),
        xsrfToken: ko.observable(''),
        sources: ko.observableArray([]),
        source: ko.observable(''),
        sourceId: function (sid) {
            var index = viewModel.sources().findIndex(s => s.id == sid);
            viewModel.sourceIndex(index);
            var source = viewModel.sources()[index];
            viewModel.source(source);
            return viewModel.source();
        },
        sourceIndex: ko.observable(''),
        sourcesCount: ko.pureComputed(function () { return 'Records: ' + viewModel.sources().length }, this),
        addSource: function (source) {
            viewModel.sources.unshift(source);
            viewModel.sourceId(source.id);
        },
        //canDeleteSource: function () { return viewModel.sources().length > 0 },
        removeSource: function (sid) {
            var index = viewModel.sources().findIndex(s => s.id == sid);
            var source = viewModel.sources()[viewModel.sourceIndex()];
            viewModel.sources.remove(source);
            viewModel.source(undefined);
        },
        sourceAdded: function (parent, index, item) {
            var $parent = $(parent); 
            var $item = $(item);
            //viewModel.sources.sort();
            $item.hide().fadeIn('slow');
        },
        comments: ko.observableArray([]),
        comment: ko.observable(''),
        commentId: function (cid) {
            var index = viewModel.comments().findIndex(c => c.id == cid);
            viewModel.commentIndex(index);
            viewModel.comment(viewModel.comments()[index]);
            return viewModel.comment();
        },
        commentIndex: ko.observable(''),
        commentsCount: ko.pureComputed(function () { return 'Records: ' + viewModel.comments().length }, this),
        commentTitle: ko.pureComputed(function () { return 'Ima a stupid title!'}, this),
        addComment: function (comment) {
            viewModel.comments.unshift(comment);
            viewModel.commentId(comment.id);
        },
        removeComment: function (cid) {
            var index = viewModel.comments().findIndex(c => c.id == cid);
            var comment = viewModel.comments()[viewModel.commentIndex()];
            viewModel.comments.remove(comment);
            viewModel.comment(undefined);
        },
        commentAdded: function (item) {
            var $item = $(item);
            $item.hide().fadeIn('slow');
            console.log('Comment afterAdd... ');
        },
        canAddComment: function () { return viewModel.sources().length === 0 ? false : true },
        //canDeleteComment: function () {
        //    var list = $('#comments.list-group').children();
        //    var $element = $(list[viewModel.commentIndex()]);
        //    var isClass = $element.hasClass('active')
        //    return isClass;
        //    //return $($('#comments.list-group').children()[viewModel.commentIndex()]).hasClass('active')
        //}
        contentCacheQueue: ko.observableArray([]),
        fileInfo: ko.observableArray([]),
        clientFiles: ko.observableArray([]),
        contentViewUrl: ko.observable(),
        exif: ko.observableArray([]),
        thumb: ko.observable(),
        thumbRendered: function (elements, item) {
            var count = elements.length;
            console.log('thumbRendered: ' + elements + item);
        },
        thumbAdded: function (parent, index, element) {
            var $image = $(parent).find('img');
            var rendered = $image[0].complete;
            console.log('thumbAdded-rendered: ' + $image.attr('class') + rendered);
            //if (!rendered) {
            //    console.log('thumbAdded-!rendered: ' + $image.attr('class'));
            //    $image.on('load', function () {
            //        finishLoadingThumb($(parent));
            //    });
            //}
            //else {
            //    console.log('thumbAdded-rendered: ' + $image.attr('class'));
            //    finishLoadingThumb($(parent));
            //}

        }
        
    };


    ////////////////////////////////////////
    /// model events/actions
    /// TODO - move to model-utils module
    ///////////////////////////////////////

    

    ////////////////////////////////////////
    /// model events/actions
    ///////////////////////////////////////
    // subscribe to any ajax errors
    viewModel.errorMsg.subscribe(function (error) {
        if (error != undefined)
        {
            if (!ko.dataFor($('#ajax-error')[0])) { ko.applyBindings(viewModel, $('#ajax-error')[0]) }
            $('#ajax-error').dialog({
                autoOpen: true,
                modal: true,
                buttons: {
                    OK: function () { $(this).dialog("close"); }
                }
            });
        }
    });

    ////////////////////////////////////////
    /// model events/actions
    ///////////////////////////////////////
    viewModel.data.subscribe(function (newdata) {

        if (viewModel.target())
            $(viewModel.target()).html(newdata);
        else
            $(newdata).dialog();
    });

    ////////////////////////////////////////
    /// Source subscribe events/actions
    ///////////////////////////////////////
    viewModel.source.subscribe(function (source) {
       
        if (source == undefined) {
            var prev = viewModel.sourceIndex() - 1;
            if (prev >= 0)
            {
                source = viewModel.sources()[prev];
                viewModel.sourceId(source.id);
            }
            return;
        }
       
        ///TODO
        /// this should all be done with a class binding
        var $element = $($('#sources-table tbody tr')[viewModel.sourceIndex()])
        $element.addClass('active').siblings().removeClass('active');
        //re-set comments
        //viewModel.comments([]);
        viewModel.comments(source.comments == null ? [] : source.comments);
        if ( viewModel.comments().length > 0 ) {
            viewModel.commentId(viewModel.comments()[0].id);
        }  

        viewModel.sources.sortByName('sourceName', 'asc')
        // scroll to visible if necessary
        $element.scrollToTop();
        //console.log('source subscribe:' + source.sourceName);
    });

    ////////////////////////////////////////
    /// Comment subscribe events/actions
    ///////////////////////////////////////
    viewModel.comment.subscribe(function (comment) {

        if ( comment == undefined ) {
            var prev = viewModel.commentIndex() - 1;
            if ( prev >= 0 ) {
                comment = viewModel.comments()[prev];
                viewModel.commentId(comment.id);
            }
            return;
        }
      
        ///TODO
        /// this should all be done with a class binding
        var list = $('#comments.list-group').children();
        var $element = $(list[viewModel.commentIndex()]);
        $element.addClass('active').siblings().removeClass('active');
        $('.comment.card a#comment-delete').addClass('disabled');
        $element.find('a#comment-delete').removeClass('disabled');
        

         // sort here ? We souldn't have too?
         // TODO -Always adds on top, need to animate nicely, offer asc/desc
        viewModel.comments.sortByDateTime('datetime', 'desc');

        //console.log('comment subscribe:' + comment.id);
    });


    ////////////////////////////////////////
    /// Waiting subscribe events/actions
    ///////////////////////////////////////
    viewModel.waiting.subscribe(function (wait) {

        ModelUtils.waitStatus(wait, viewModel.waitingTarget());
    });

    ////////////////////////////////////////
    /// observableArray DateTime sort extension
    ///////////////////////////////////////
    ko.observableArray.fn.sortByDateTime = function (property, direction) {

        return this.sort(function (a, b) {
            var dateA = new Date(a[property]);
            var dateB = new Date(b[property]);
            if (direction == 'asc') {
                return (Date.parse(dateA) == Date.parse(dateB) ? 0 :
                    (Date.parse(dateA) > Date.parse(dateB) ? -1 : 1))
                //return dateA.getTime() - dateB.getTime();
            }
            return (Date.parse(dateA) == Date.parse(dateB) ? 0 :
                (Date.parse(dateA) < Date.parse(dateB) ? -1 : 1))
            //return dateB.getTime() - dateA.getTime();
        });
    };

    ko.observable.fn.sortByName = function (property, direction) {
        return this.sort(function (a, b) {
            var textA = a[property];
            var textB = b[property];
            if (direction == 'asc') {
                return textA == textB ? 0 : (textA < textB ? -1 : 1);
            }
            return textA == textB ? 0 : (textA > textB ? -1 : 1);
        });

    };

    return viewModel;
});
//////////////////////////////////////////////////////////////////////
/// KO viewModel extensions module
//////////////////////////////////////////////////////////////////////
define('dws/model-utils', function () {

    function callAborted(xhr, textStatus, error) {





    }

    ///////////////////////////////////////
    /// this is for async ajax calls to server
    //////////////////////////////////////
    function waitStatus(status, target) {

        if (status) {
            $(target).addClass('waiting');
        }
        else
        {
            $(target).removeClass('waiting');
        }
    } 
    
    ///////////////////////////////////////
    /// this is for actual DOM element loading
    ///////////////////////////////////////
    function loadingStatus(status, target)
    {
        var completed = $(target)[0].complete;
        if (!completed) {
            $(target)[0].addClass('loading');
            $(target).load(function () {
                $(target).removeClass('loading');
            });
        }
    }


    return {
        waitStatus: waitStatus,
        loadingStatus: loadingStatus,
        callAborted: callAborted
    }

})
//////////////////////////////////////////////////////////////////////
/// message dispatcher module
//////////////////////////////////////////////////////////////////////
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
        .done(function (data, textStatus, xhr) {
            //based on requested data type
            ViewModel.data(data); 
        })
        .fail(function (xhr, textStatus, error) {
            ViewModel.aborted(xhr, textStatus, error)
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
//////////////////////////////////////////////////////////////////////
/// actions module
//////////////////////////////////////////////////////////////////////
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

        

        /////////////////////////////
        /// show/hide events
        /// TODO - optimize these events...
        ////////////////////////////
        $(document).on("shown.bs.collapse", "#doc-resume", function (e) {
            $('#contact.card').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-cv').hasClass('show')) {
                $('#doc-cv').removeClass('show');
                $('[data-target="#doc-cv"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
            }
            if ($('#doc-masters').hasClass('show')) {
                $('#doc-masters').removeClass('show');
                $('[data-target="#doc-masters"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
            } 
        });

        $(document).on("hide.bs.collapse", "#doc-resume", function (e) {
            $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
        });

        $(document).on('shown.bs.collapse', '#doc-cv', function (e) {
            $('#contact.card').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-cv"] h4 i').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-resume').hasClass('show')) {
                $('#doc-resume').removeClass('show');
                $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
            }
            if ($('#doc-masters').hasClass('show')) {
                $('#doc-masters').removeClass('show');
                $('[data-target="#doc-masters"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
            } 
        });

        $(document).on('hide.bs.collapse','#doc-cv', function (e) {
            $('[data-target="#doc-cv"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
        });

        $(document).on('shown.bs.collapse', '#doc-masters', function (e) {
            e.preventDefault();
            $('#contact.card').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-masters"] h4 i').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-resume').hasClass('show')) {
                $('#doc-resume').removeClass('show');
                $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
            }
            if ($('#doc-cv').hasClass('show')) {
                $('#doc-cv').removeClass('show');
                $('[data-target="#doc-cv"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
            }
        });

        $(document).on('hide.bs.collapse', '#doc-masters', function (e) {
            $('[data-target="#doc-masters"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
        });

        //$('#modal-action-template').on('show.bs.modal', function (e) {
        //    e.preventDefault();
        //    // get event source
        //    var $item = $(e.relatedTarget());
        //    Control.sendMessage($item, '#target-modal');
        //})

        $(document).on('show.bs.modal', '#modal-action-template', function (e) {
            //e.preventDefault();
            // get event source
            var $item = $(e.relatedTarget);
            var $modal = $(this);
            $modal.find('.modal-title').text('Add New ' + $item.attr('data-target-id'));
            Control.sendMessage($item, '#target-modal');
        });

        $(document).on('shown.bs.modal', '#modal-action-template', function (e) {
            //e.preventDefault();
            // get modal 
            var $item = $(e.target);
            $item.find('input:visible').first().focus();
        });

        /////////////////////////////
        /// popover init
        ////////////////////////////

        var options = {
            trigger: 'click',
            title: 'What is a Run-down???',
            content: 'A Run-down is a casual non-authoritative white-paper. In my words and IMHO...',
            footer: 'I am a Bootstrap popover...',
            placement: 'bottom',
            delay: { "show": 200, "hide": 100 }

        }

        $('#rundown-info').popover(options);
        
        //$('#rundown-info').on('click', function (e) {
        //    $(this).popover('toggle');
        //})

        

        /////////////////////////////
        /// Sandbox events
        ////////////////////////////


        $(document).on('click', '.nav-item', function (e) {
            e.preventDefault();
            var $item = $(e.target);
            $('.nav-item').removeClass('active');
            $item.closest('.nav-item').addClass('active');
            Control.sendMessage($item);
        });

        $(document).on('click', 'a.sandbox-toggle-text', function (e) {
            e.preventDefault();
            var $link = $(e.target);
            var $text = $link.parent().siblings('.card-text.expand');

            if ($text.length == 1) {
                $text.removeClass('expand');
                $link.text('More...');
            }
            else {

                $('.sandbox-wrapper').find('.sandbox-item').children('.card-text.expand').removeClass('expand');
                $('.sandbox-wrapper').find('.sandbox-toggle-text').text('More...');
                $link.parent().siblings('.card-text').addClass('expand');
                $link.text('Less...');
            }
        });

        /////////////////////////////
        /// File Ops stuff
        ////////////////////////////
       
     

        $('div#footer-scroll').endlessScroll({ width: '100%', height: '20px', steps: -2, speed: 30, mousestop: true });

    });

    return {
     
    };
});

//////////////////////////////////////////////////////////////////////
/// sandbox module - MutationObserver Here!!!
//////////////////////////////////////////////////////////////////////
define('dws/sandbox', ['dws/model'], function (ViewModel) {

    //lets monitor the sand box area for new content and bind accordingly
    var config = {
        attributes: true,
        childList: true,
        characterData: true
    };

    var observerKo = new MutationObserver(function (changes) {
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
            }
        });
    });

    function observeKo(state) {
        if (state) {
            observerKo.observe(document.getElementById('sandbox-area'), config);
        }
        else {
            observerKo.disconnect();
        }
    }

    //var observerSandItems = new MutationObserver(function (changes) {
    //    changes.forEach(function (change) {

    //        if (change.changedNodes.length > 0) {
    //            var $dataNodes = $(change.addedNodes).find('[data-bind]');
    //            $dataNodes.each(function () {
    //                var $node = $(this);
    //                try {
    //                    if (!ko.dataFor($node[0])) { ko.applyBindings(ViewModel, $node[0]) }
    //                } catch (e) {
    //                    console.log("ko re-bind exception....")
    //                }
    //            })
    //        }
    //    });
    //});

    //function observeSandItems(state) {
    //    if (state) {
    //        observerSandItems.observe(document.getElementById('sandbox-items'), config);
    //    }
    //    else {
    //        observerSandItems.disconnect();
    //    }
    //}
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
        observeKo: observeKo
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
    function sendMessage($item, target) {
        if (!target)
            target = $item.attr('data-target');
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
    function initKO(xsrf) {
        ko.applyBindings(viewModel);
        
    }

    function setXsrf(xsrf) {
        viewModel.xsrfToken(xsrf);
    }

    return {
        initKO: initKO,
        test: test,
        sendMessage: sendMessage,
        sendMessageDefer: sendMessageDefer,
        showContentArea: showContentArea,
        hideAllContent: hideAllContent,
        parseNavUrl: parseNavUrl,
        setXsrf: setXsrf
    }
});

//////////////////////////////////////////////////////////////////////
/// comments module
//////////////////////////////////////////////////////////////////////
define('dws/comments', ['dws/controller', 'dws/model'],
function (Control, viewModel) {

    function GetSources() {
        
        var settings = {
            url: "/Comments/GetSources",
            cache: false,
            dataType: 'json'
        }
        viewModel.waitingTarget('#navbar-main');
        viewModel.waiting(true);
        //// integrate into dispatcher.js  TODO
        $.ajax(settings)
            .done(function (data) {
                viewModel.sources([]);
                viewModel.sources(data);
                // this is against my pattern!!!! TODO
                // model should deal with this, but only first time loading...
                if (data.length > 0) {
                 //$('#sources-table tbody tr:first').addClass('active');
                    viewModel.sourceId(data[0].id);
                }
                
            })
            .fail(function (xhr, textStatus, error) {
                viewModel.abort(xhr, textStatus, error);
            })
            .always(function (data, textStatus, xhr) {
                viewModel.waiting(false);

            });
    }

    $(document).on('click', '#sources-table tbody tr', function (e) {
        var $item = $(e.currentTarget);
        var id = $item.attr("id");
        //$item.addClass('active').siblings().removeClass('active');
        viewModel.sourceId(id);

    });

    $(document).on('click', '.comment.card', function (e) {
        e.preventDefault();
        var $item = $(e.currentTarget);
        var id = $item.attr("id");
        //$item.addClass('active').siblings().removeClass('active');
        viewModel.commentId(id);

    });

    $('#modal-action-template').on('show.bs.modal', function (e) {
        //e.preventDefault();
        var $item = $(e.relatedTarget);
        Control.sendMessage($item, '#modal-action-template');
    });

    $(document).on('submit', 'form#create-source', function (e) {

        e.preventDefault();
        var $form = $(this);
        //var $submitButton = $('.submit', $form);
        //$submitButton.attr("disabled", true);
        $form.attr('disabled', true);

        //serialize form values to JSON
        var formvals = $form.serializeArray();
        //var csrfToken = $("input[name='__RequestVerificationToken']").val();
        var settings = {
            url: '/Comments/CreateSource',
            type: 'POST',
            dataType: 'json',
            data: formvals
        }

        $.ajax(settings)
            .done(function (data, textStatus, xhr) {
                if (xhr.status == 200) {
                    $form.closest('#modal-action-template').modal('hide');
                    viewModel.addSource(data.source);
                }
                else {
                    $('#target-modal').html(data);
                }
            })
            .fail(function (xhr, textStatus, error) {
                $form.closest('#modal-action-template').modal('hide');
                viewModel.abort(xhr, textStatus, error);
            });
    });

    $(document).on('submit', 'form#create-comment', function (e) {

        e.preventDefault();
        var $form = $(this);
        //var $submitButton = $('.submit', $form);
        //$submitButton.attr("disabled", true);
        $form.attr('disabled', true);

        // populate SourceId
        $('input#SourceId.form-control', $form).val(viewModel.source().id);
        //serialize form values to JSON
        var formvals = $form.serializeArray();
        
        viewModel.waitingTarget('.modal-header');
        viewModel.waiting(true);
        $.ajax({
            url: '/Comments/CreateComment',
            type: 'POST',
            dataType: 'json',
            data: formvals
        }).done(function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                $form.closest('#modal-action-template').modal('hide');
                viewModel.addComment(data.comment);
            }
            else {
                $('#target-modal').html(data);
            }
            
        }).fail(function (xhr, textStatus, error) {
            $form.closest('#modal-action-template').modal('hide');
            viewModel.abort(xhr, textStatus, error);
        }).always(function (data, textStatus, xhr) {
            viewModel.waiting(false);

        });

    });

    $(document).on('click', 'a#source-delete', function (e) {

        if (viewModel.comments().length > 0) {
            
            $.confirm({
                title: 'Cascade Delete Source and Comments?',
                content: 'There are child Comments! Continuing will delete the Source record and all child Comments. This action can not be undone!!!',
                buttons: {
                    confirm: function () { deleteSource(); },
                    cancel: function () { return; }
                }
            });
        }
        else {
            deleteSource();
        }
    });

    function deleteSource() {

        $.ajax({
            url: '/Comments/DeleteSource?sid=' + viewModel.source().id,
            type: 'POST',
            headers: { 'RequestVerificationToken': viewModel.xsrfToken() }

        }).done(function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                viewModel.removeSource(data);
            }

        }).fail(function (xhr, textStatus, error) {
            viewModel.abort(xhr, textStatus, error);
        });
    }

    $(document).on('click', 'a#comment-delete', function (e) {
       
        $.confirm({
            title: 'Delete Comment(s)?',
            content: 'This action can not be undone!!!',
            buttons: {
                confirm: function () { deleteComment(); },
                cancel: function () { return; }
            }
        });
    });

    function deleteComment() {
        $.ajax({
            url: '/Comments/DeleteComment?cid=' + viewModel.comment().id,
            type: 'POST',
            headers: { 'RequestVerificationToken': viewModel.xsrfToken() }
        }).done(function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                viewModel.removeComment(data);
            }
        }).fail(function (xhr, textStatus, error) {
            viewModel.abort(xhr, textStatus, error);
        });
    }

    return {
        GetSources: GetSources
    }
});




        


define('dws/fileops-client', ['dws/controller', 'dws/model'],
    function (Control, ViewModel) {

        var selectedFiles;
        var DataURLFileReader = {
            read: function (file, callback) {
                var reader = new FileReader();
                var fileInfo = {
                    name: file.name,
                    type: file.type,
                    fileContent: null,
                    size: function () {
                        var FileSize = 0;
                        if (file.size > 1048576) {
                            FileSize = Math.round(file.size * 100 / 1048576) / 100 + " MB";
                        }
                        else if (file.size > 1024) {
                            FileSize = Math.round(file.size * 100 / 1024) / 100 + " KB";
                        }
                        else {
                            FileSize = file.size + " bytes";
                        }
                        return FileSize;
                    }
                };
                if (!file.type.match('image.*')) {
                    callback("file type not allowed", fileInfo);
                    return;
                }
                reader.onload = function () {
                    fileInfo.fileContent = reader.result;
                    callback(null, fileInfo);
                };
                reader.onerror = function () {
                    callback(reader.error, fileInfo);
                };
                reader.readAsDataURL(file);
            }
        };

        function init() {
            $("#fileInput").change(function (evt) {
                MultiplefileSelected(evt);
            });
            $("form#fileUpload button[id=Cancel_btn]").click(function () {
                Cancel_btn_handler()
            });
            $('a#fileUpload').on('click', function () {
                $('#file-ops-client').dialog();
            });
            
            var dropZone = document.getElementById('drop_zone');
            dropZone.addEventListener('dragover', handleDragOver, false);
            dropZone.addEventListener('drop', MultiplefileSelected, false);
            dropZone.addEventListener('dragenter', dragenterHandler, false);
            dropZone.addEventListener('dragleave', dragleaveHandler, false);
            $.blockUI.defaults.overlayCSS = {
                backgroundColor: '#000',
                opacity: 0.6
            };
            $.blockUI.defaults.css = {
                padding: 0,
                margin: 5,
                width: '60%',
                top: '30%',
                left: '20%',
                color: '#000',
                border: '3px solid #aaa',
                backgroundColor: '#fff'
            };
            //$.blockUI({ message: $('#file-ops-client') });
        }


        function MultiplefileSelected(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            $('#drop_zone').removeClass('hover');

            selectedFiles = evt.target.files || evt.dataTransfer.files;

            if (selectedFiles) {
                //$('#clientFilesList').empty();
                for (var i = 0; i < selectedFiles.length; i++) {
                    DataURLFileReader.read(selectedFiles[i], function (err, fileInfo) {
                        var RowInfo;
                        if (err != null) {
                            RowInfo = '<div id="File_' + i + '" class="info"><div class="file-info-container">' +
                                '<div class="file-error">' + err + '</div>' +
                                '<div data-name="FileName" class="file-info">' + fileInfo.name + '</div>' +
                                '<div data-type="FileType" class="file-info">' + fileInfo.type + '</div>' +
                                '<div data-size="FileSize" class="file-info">' + fileInfo.size() + '</div></div><hr/></div>';
                            $('#clientFilesList').append(RowInfo);
                        }
                        else {
                            var image = '<img src="' + fileInfo.fileContent + '" class="thumb" title="' + fileInfo.name + '" />';
                            RowInfo = '<div id="File_' + i + '" class="file-info"><div class="file-info-container">' +
                                '<div data_img="Imagecontainer">' + image + '</div>' +
                                '<div data-name="FileName" class="file-info">' + fileInfo.name + '</div>' +
                                '<div data-type="FileType" class="file-info">' + fileInfo.type + '</div>' +
                                '<div data-size="FileSize" class="file-info">' + fileInfo.size() + '</div></div><hr/></div>';
                            $('#clientFilesList').append(RowInfo);
                        }
                    });
                }
            }
        }

        $(document).on('submit', 'form#fileUpload', function (e) {

            e.preventDefault();
            var $form = $(this);

            //disable for once and for all TODO
            $form.attr('disabled', true); // does not seem to work?!

            var formData = new FormData($form[0]);
            var settings = {
                url: '/api/dws/upload',  //Server web api
                type: 'POST',
                xhr: function () {  // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) { // Check if upload property exists
                        myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
                    }
                    return myXhr;
                },
                // Form data
                data: formData,
                //Options to tell jQuery not to process data or worry about content-type.
                cache: false,
                contentType: false,
                processData: false
            };

            $.ajax(settings)
                .done(function (data, textStatus, xhr) {
                    if (data.statusCode == 200) {
                        $('#serverFilesList tr:last').after(data.NewRow);
                        alert(data.status);
                    }
                    else {
                        alert(data.status);
                    }
                })
                .fail(function (xhr, textStatus, error) {
                    ViewModel.aborted(xhr, textStatus, error);
                })
                .always(function () {
                    $('#clinet-container').empty();
                    $('.create-file-link').show();
                    $.unblockUI();
                    ViewModel.waitEffects(false);
                });
        });

        function progressHandlingFunction(e) {
            if (e.lengthComputable) {
                var percentComplete = Math.round(e.loaded * 100 / e.total);
                $("#fileProgress").css("width", percentComplete + '%').attr('aria-valuenow', percentComplete);
                $('#fileProgress span').text(percentComplete + "%");
            }
            else {
                $('#fileProgress span').text('unable to compute');
            }
        }
        
        // Drag and Drop Events
        function handleDragOver(evt) {
            evt.preventDefault();
            evt.dataTransfer.effectAllowed = 'copy';
            evt.dataTransfer.dropEffect = 'copy';
        }

        function dragenterHandler() {
            //$('#drop_zone').removeClass('drop_zone');
            $('#drop_zone').addClass('hover');
        }

        function dragleaveHandler() {
            $('#drop_zone').removeClass('hover');
        }

        function OnDeleteAttachmentSuccess(data) {

            if (data.ID && data.ID != "") {
                $('' + data.ID).fadeOut('slow');
            }
            else {
                alert("Unable to Delete");
                console.log(data.message);
            }
        }

        function Cancel_btn_handler() {
            $('#clinet-container').empty();
            $('.create-file-link').show();
            $.unblockUI();
            ViewModel.waitEffects(false);
        }

        return {
            init: init,
            progressHandlingFunction: progressHandlingFunction,
            OnDeleteAttachmentSuccess: OnDeleteAttachmentSuccess,
            Cancel_btn_handler: Cancel_btn_handler
        }
    });
define('dws/fileops-content', ['dws/controller', 'dws/model'],
    function (Control, viewModel) {

        function init() {

            $('#content-left').on("click", function (e) {
                contentNext();
            });

            $('#content-right').on("click", function (e) {
                contentNext();
            });

            $('.main-content-area').on("swipeleft", function (e) {
                contentNext();
            });

            $('.main-image').on("swiperight", function (e) {
                contentNext();
            });

            $(document).on('keydown', '#main-content-area', function (e) {
                if (!shortcutsEnabled) {
                    return;
                }

                if (e.keyCode === 37) { //prev
                    contentPrev();
                    return false;
                }

                if (e.keyCode === 39) { //next
                    contentNext();
                    return false;
                }
            });

            $(document).on('click', 'ul#thumbnails li a', function (e) {
                e.preventDefault(); // what defaults?
                var $link = $(this);
                if (!$('img', $link).hasClass('selected')) { // if currently selected do nothing
                    $(document).trigger('thumbnailclicked', $link);
                    clickThumbnail($link); // will pushstate ???
                }
            });

            hideAllContent();

            getContent();

            $('#col-util').hide();
            $('#col-main').addClass('full-size');
        }

        var shortcutsEnabled = true;

        function enableShortcuts() {
            shortcutsEnabled = true;
        }

        function disableShortcuts() {
            shortcutsEnabled = false;
        }


        function getContent() {

            var settings = {
                url: "/api/dws/list",
                cache: false
            }
            viewModel.waitingTarget('#navbar-main');
            viewModel.waiting(true);
            //// integrate into dispatcher.js  TODO
            $.ajax(settings)
                .done(function (data, textStatus, xhr) {
                    viewModel.fileInfo([]);
                    viewModel.fileInfo(data.fileInfo);
                })
                .fail(function (xhr, textStatus, error) {
                    viewModel.abort(xhr, textStatus, error);
                })
                .always(function (data, textStatus, xhr) {
                    viewModel.waiting(false);
                });
            
        }


        function showContent(selector) {
            if (!$(selector).is(':visible')) {
                hideAllContent();
                $(selector).show(); // beware that using an animated show (fadeIn, etc) may conflict with the visibility check
            }
        }

        function hideAllContent() {
            $('.content-area').hide();
        }

        function contentNext() {
            var linkNext = $('ul#thumbnails li a img.selected').closest('li').next().find(">:first-child").trigger('click');
            $(linkNext).trigger('click');
        }

        function contentPrev() {
            var linkPrev = $('ul#thumbnails li a img.selected').closest('li').prev().find(">:first-child");
            $(linkPrev).trigger('click');
        }

        function clickThumbnail($link) {
            var fileURL = $link.attr('href');
            var virtualPath = $link.attr('data-virtual-path');
            var mimeType = $link.attr('data-mime-type');  //added to template!!!

            //learn what this is doing
            window.history && window.history.pushState && window.history.replaceState({ image: "", virtualPath: "" }, "", "");
            openFile(virtualPath, mimeType);
        }

        function openFile(virtualPath, mimeType) {
            var $thumbnail = $('a[data-virtual-path = "' + virtualPath + '"] img');
            styleSelectedThumbnail($thumbnail);
            loadContent(virtualPath, mimeType);
        }

        function styleSelectedThumbnail($thumbnail) {
            $('ul#thumbnails li a img').removeClass("selected");
            $thumbnail.addClass("selected");
        }

        function empty() {
            viewModel.thumbnails([]);
        }


        function loadContent() {

            var settings = {
                url: '/api/dws/view/{id}',  //Server web api
                type: 'Get',
                cache: false
            };

            $.ajax(settings)
                .done(function (data, textStatus, xhr) {
                    if (data.statusCode == 200) {
                        
                    }
                    else {
                        alert(data.status);
                    }
                })
                .fail(function (xhr, textStatus, error) {
                    viewModel.aborted(xhr, textStatus, error);
                })
                .always(function () {
                    $('#clinet-container').empty();
                    $('.create-file-link').show();
                    $.unblockUI();
                    viewModel.waitEffects(false);
                });


        }

        return {
            init:init,
            showContent: showContent,
            hideAllContent: hideAllContent,
            contentNext: contentNext,
            contentPrev: contentPrev,
            clickThumbnail: clickThumbnail
           
        };

    });
//////////////////////////////////////////////////////////////////////
/// init module - TODO eliminate redundant requires, control initiates all
//////////////////////////////////////////////////////////////////////
require(['dws/actions']);
require(['dws/comments']);
require(['dws/sandbox']);
require(['dws/model-utils']);
require(['dws/controller']);
require(['dws/fileops-client']);
require(['dws/fileops-content']);


require(['dws/controller'],
    function (control) {

        $(document).ready(function () {
            control.initKO();
        });
    });

//////////////////////////////////////////////////////////////////////
/// globals go here
//////////////////////////////////////////////////////////////////////

/// This just deals with X,Y in a scrolling list
////////////////////////////////////////////////////////////////////////
$.fn.scrollToTop = function () {

    var $element = this;
    var $parent = $element.scrollParent() ? $element.scrollParent() : $(window);

    var viewport = {
        top: $parent.scrollTop(),
        bottom: $parent.height()
    };

    console.log('parent viewport: top ' + viewport.top + ', left ' + viewport.left + ', bottom ' + viewport.bottom + ', right ' + viewport.right);

    console.log('viewport parent bottom: ' + viewport.bottom);
    var position = $element.position();
    position.bottom = position.top + $element.height();
    position.right = position.left + $element.width();

    console.log('element position top ' + position.top + ', left ' + position.left + ', bottom ' + position.bottom + ', right ' + position.right);

    // above or below = !in-between
    if ((position.bottom < viewport.top) || (position.top > viewport.bottom)) {
        $parent.animate({ scrollTop: position.top }, 800);
    }
}

$.fn.isWithinParent = function () {
    var $element = this;
    var $parent = $element.scrollParent() ? $element.scrollParent() : $(window);

    var viewport = {
        top: $parent.scrollTop(),
        left: $parent.scrollLeft()
    };
    viewport.right = viewport.left + $parent.width();
    viewport.bottom = viewport.top + $parent.height();

    
    var bounds = $element.offset();
    bounds.right = bounds.left + $element.outerWidth();
    bounds.bottom = bounds.top + $element.outerHeight();

    
    //return ((viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

}
