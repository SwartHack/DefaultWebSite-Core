//////////////////////////////////////////////////////////////////////
/// KO View Model module
//////////////////////////////////////////////////////////////////////
define('dws/model', ['dws/model-utils'], function (ModelUtil) {

    /////////////////////////////
    ///
    /////////////////////////////
    var viewModel = {

        //////////////////////////////////////////////////
        ///
        //////////////////////////////////////////////////
        data: ko.observable(''),
        target: ko.observable(''),
        dataType: ko.observable(''),
        dataJson: ko.observable(''),
        targetJson: ko.observable(''),
        abort: function (xhr, status, error) {
            viewModel.errorStatus(status);
            viewModel.errorXhr(xhr);
            viewModel.errorMsg(error);
        },
        errorXhr: ko.observable(''),
        errorStatus: ko.observable(''),
        errorMsg: ko.observable(''),
        waiting: ko.observable(false),
        waitingTarget: ko.observable(''),
        xsrfToken: ko.observable([]),

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        sources: ko.observableArray([]),
        source: ko.observable(''),
        sourceId: function (sid) {
            var index = viewModel.sources().findIndex(s => s.id == sid);
            viewModel.sourceIndex(index);
            var source = viewModel.sources()[index];
            viewModel.source(source);

        },
        sourceIndex: ko.observable(''),
        sourcesCount: ko.pureComputed(function () {
            return 'Records: ' + viewModel.sources().length
        }, this),
        addSource: function (source) {
            viewModel.sources.unshift(source);
            viewModel.sourceId(source.id);
        },
        //canDeleteSource: function () { return viewModel.sources().length > 0 },
        removeSource: function (sid) {
            var index = viewModel.sources().findIndex(s => s.id == sid);
            var source = viewModel.sources()[viewModel.sourceIndex()];
            viewModel.sources.remove(source);
            viewModel.source('');
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
        commentTitle: ko.pureComputed(function () { return 'Ima a stupid title!' }, this),
        addComment: function (comment) {
            viewModel.comments.unshift(comment);
            viewModel.commentId(comment.id);
        },
        removeComment: function (cid) {
            var index = viewModel.comments().findIndex(c => c.id == cid);
            var comment = viewModel.comments()[viewModel.commentIndex()];
            viewModel.comments.remove(comment);
            viewModel.comment('');
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

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        uploadFilesInfo: ko.observableArray([]),  // dialog binding 'selected-upload-files' template
        uploadFiles: ko.observableArray([]), //matching array of IForm files.
        mimeTypes: ko.observableArray(['image/*', 'application/pdf', 'video/mp4']), //these should come from settings
        uploadFilesSize: ko.pureComputed(function () { return viewModel.uploadFiles.sumProperty('size') }, this),
        uploadFilesCount: ko.pureComputed(function () { return viewModel.uploadFiles().length }, this),
        uploadCount: ko.pureComputed(function () { return 'Number files: ' + viewModel.uploadFiles().length }, this),
        uploadSize: ko.pureComputed(function () { return 'Total size: ' + viewModel.getFileSize(viewModel.uploadFiles.sumProperty('size')) }, this),
        showFileUpload: ko.pureComputed(function () { return viewModel.uploadFiles().length > 0 && !viewModel.isMaxUpload() }, this),
        getFileSize: function (size) {
            var fileSize = 0;
            if (size > 1048576) {
                fileSize = Math.round(size * 100 / 1048576) / 100 + " MB";
            }
            else if (size > 1024) {
                fileSize = Math.round(size * 100 / 1024) / 100 + " KB";
            }
            else {
                fileSize = size + " bytes";
            }
            return fileSize;
        },
        isMaxUpload: ko.pureComputed(function () {
            var max = (parseInt(viewModel.uploadFilesSize()) + parseInt(viewModel.serverSpaceCurrent())) > parseInt(viewModel.serverSpaceMax());
            return max
        }, this),

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        contentCacheQueue: ko.observableArray([]), // TODO

        serverFiles: ko.observableArray([]),  // the server-side files after upload
        serverFile: ko.observable(''),
        serverSpaceMax: ko.observable(10000000),
        serverSpaceCurrent: ko.pureComputed(function () { return viewModel.serverFiles.sumProperty('fileSize') }, this),
        serverFilesCount: ko.pureComputed(function () { return viewModel.serverFiles().length }, this),
        serverSpace: ko.pureComputed(function () {
            var max = viewModel.serverSpaceMax();
            var current = viewModel.serverSpaceCurrent();
            var num = parseInt(max) - parseInt(current);
            return viewModel.getFileSize(num);
        }, this),
        imageViewApi: ko.pureComputed(function () { return viewModel.serverFile().fileApi }, this),

        pdfWorker: ko.observable(''),
        exif: ko.observableArray([]) // image header details

        //thumb: ko.observable(),
        //thumbRendered: function (elements, item) {
        //    var count = elements.length;
        //    console.log('thumbRendered: ' + elements + item);
        //},
        //thumbAdded: function (parent, index, element) {
        //    var $image = $(parent).find('img');
        //    var rendered = $image[0].complete;
        //    console.log('thumbAdded-rendered: ' + $image.attr('class') + rendered);
        //    if (!rendered) {
        //        console.log('thumbAdded-!rendered: ' + $image.attr('class'));
        //        $image.on('load', function () {
        //            finishLoadingThumb($(parent));
        //        });
        //    }
        //    else {
        //        console.log('thumbAdded-rendered: ' + $image.attr('class'));
        //        finishLoadingThumb($(parent));
        //    }

        //}

    };


    ////////////////////////////////////////
    /// model events/actions
    /// TODO - move to model-utils module
    ///////////////////////////////////////

    //viewModel.fileViewApi.subscribe(function (newFile) {

    //    // what's my visible content area
    //    var $target = $(viewModel.fileViewTarget());

    //    if (!$target.is(':visible'))
    //    {
    //        $('.content-area').hide();
    //        $target.show();
    //    }
    //});


    ////////////////////////////////////////
    /// model events/actions
    ///////////////////////////////////////


    // subscribe to any ajax errors
    viewModel.errorMsg.subscribe(function (error) {
        if (error != null) {
            var $ajaxerr = $('#ajax-error');
            if (!ko.dataFor($ajaxerr[0])) {
                ko.applyBindings(viewModel, $ajaxerr[0]);
            }

            $($ajaxerr).html(viewModel.errorXhr().responseText);

            $('#ajax-error').dialog({
                maxWidth: 800,
                maxHeight: 600,
                width:800,
                autoOpen: true,
                modal: true,
                buttons: {
                    OK: function () { $(this).dialog("close"); }
                }
            });
        }
        else {
            $('viewModel.errorData').dialog();

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

    //viewModel.source.subscribe(function (data) {
    //    viewModel.sources.sortByName('sourceName', 'asc')
    //});



    ////////////////////////////////////////
    /// Sandpit - Comments Manager
    /// Source subscribe events/actions
    ///////////////////////////////////////
    viewModel.source.subscribe(function (source) {

        if ( !source ) {

            //clear out comments here?
            viewModel.comments([]);

            if (viewModel.sources().length >= 1) {
                //was there a previous source loaded?
                var last = parseInt(viewModel.sourceIndex());
                var prev = last != 'NaN' ? last - 1 : 0;
                var next = last != 'NaN' ? last : 0;

                if (prev >= 0) {
                    source = viewModel.sources()[prev];
                    viewModel.sourceId(source.id);
                }
                else {
                    source = viewModel.sources()[next];
                    viewModel.sourceId(source.id);
                }
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
    /// Sandpit - Comments Manager
    /// Comment subscribe events/actions
    ///////////////////////////////////////
    viewModel.comment.subscribe(function (comment) {

        if ( !comment ) {
            if (viewModel.comments().length >= 1) {
                //was there a previous source loaded?
                var last = parseInt(viewModel.commentIndex());
                var prev = last != 'NaN' ? last - 1 : 0;
                var next = last != 'NaN' ? last : 0;

                if (prev >= 0) {
                    comment = viewModel.comments()[prev];
                    viewModel.commentId(comment.id);
                }
                else {
                    comment = viewModel.comments()[next];
                    viewModel.commentId(comment.id);
                }
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
        viewModel.comments.sortByDateTime('datetime', 'asc');

        //console.log('comment subscribe:' + comment.id);
    });



    ////////////////////////////////////////
    /// Waiting subscribe events/actions
    ///////////////////////////////////////
    viewModel.waiting.subscribe(function (wait) {

        ModelUtil.waitStatus(wait, viewModel.waitingTarget());
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

    ko.observableArray.fn.sumProperty = function (property) {

        var total = 0;
    
        for (var i = 0, len = this().length; i < len; i++) {
            total += this()[i][property];
        }

        return total;
    };

    return viewModel;
});
