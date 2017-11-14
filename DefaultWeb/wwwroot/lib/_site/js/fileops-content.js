//////////////////////////////////////////////////////////////////////
/// File operations content module
//////////////////////////////////////////////////////////////////////
define('dws/fileops-content', ['dws/controller', 'dws/model'],
    function (Control, viewModel) {

        /////////////////////////////////////////////////
        /// late init because we are not present in DOM on site load
        ////////////////////////////////////////////////
        function init() {

            $('#content-left').on("click", function (e) {
                contentPrev();
            });

            $('#content-right').on("click", function (e) {
                contentNext();
            });

            $('.main-content-area').on("swipeleft", function (e) {
                contentPrev();
            });

            $('.main-image').on("swiperight", function (e) {
                contentNext();
            });


            $(document).on('keydown', '#main-content-area', function (e) {
                //if (!shortcutsEnabled) {
                //    return;
                //}

                if (e.keyCode === 37) { //prev
                    contentPrev();
                    return false;
                }

                if (e.keyCode === 39) { //next
                    contentNext();
                    return false;
                }
            });

            $(document).on('click', 'ul#thumbnails li', function (e) {
                e.preventDefault(); 
                var $link = $(this);
                if (!$link.hasClass('selected')) { 
                    openFile($link);
                }
            });

            hideAllContent();

            getContent();

            //// expand this
            //$('#col-util').hide();
            //$('#col-main').addClass('full-size');
        }

        function contentNext() {
            var linkNext = $('ul#thumbnails li.selected').next('li');
            $(linkNext).trigger('click');
        }

        function contentPrev() {
            var linkPrev = $('ul#thumbnails li.selected').closest('li');
            $(linkPrev).trigger('click');
        }

        // do we really need this???
        function clickThumbnail($thumbnail) {
            //figure this latter
            //window.history && window.history.pushState && window.history.replaceState({ image: "", virtualPath: "" }, "", "");
            openFile($thumbnail);
        }

        function openFile($thumbnail) {
            var fileApi = $thumbnail.attr('data-api');
            var fileTarget = $thumbnail.attr('data-target');

            styleSelectedThumbnail($thumbnail);

            viewModel.fileViewTarget(fileTarget);
            viewModel.fileViewApi(fileApi);

        }

        function styleSelectedThumbnail($thumbnail) {
            $('ul#thumbnails li').removeClass("selected");
            $thumbnail.addClass("selected");
        }

        function empty() {
            viewModel.thumbnails([]);
        }

        function hideAllContent() {
            $('.content-area').hide();
        }

        function showContent($selector) {

        }

        ///////////////////////////////////////////////////////////////////////
        // TODO - all ajax calls through dispatcher, extend model to deal with it
        ////////////////////////////////////////////////////////////////////////
        function getContent() {

            var settings = {
                url: "/api/dws/files/list",
                cache: false
            }
            viewModel.waitingTarget('#navbar-main');
            viewModel.waiting(true);
            $.ajax(settings)
                .done(function (data, textStatus, xhr) {
                    viewModel.fileInfo([]);
                    viewModel.fileInfo(data);
                })
                .fail(function (xhr, textStatus, error) {
                    viewModel.abort(xhr, textStatus, error);
                })
                .always(function (data, textStatus, xhr) {
                    viewModel.waiting(false);
                });

        }

        ///////////////////////////////////////////////////////////////////////
        // TODO - all ajax calls through dispatcher, extend model to deal with it
        ////////////////////////////////////////////////////////////////////////
        //function loadContent(fileApi) {

        //    var settings = {
        //        url: fileApi,  //Server web api
        //        type: 'Get',
        //        cache: false
        //    };

        //    $.ajax(settings)
        //        .done(function (data, textStatus, xhr) {
        //            if (data.statusCode == 200) {
        //                viewModel.
        //            }
        //            else {
                        
        //            }
        //        })
        //        .fail(function (xhr, textStatus, error) {
        //            viewModel.aborted(xhr, textStatus, error);
        //        })
        //        .always(function () {
        //            //$('#client-container').empty();
        //            //$('.create-file-link').show();
        //            //$.unblockUI();
        //            viewModel.waitEffects(false);
        //        });


        //}

        return {
            init:init,
            contentNext: contentNext,
            contentPrev: contentPrev,
            clickThumbnail: clickThumbnail,
            hideAllContent: hideAllContent,
            showContent: showContent
           
        };

    });