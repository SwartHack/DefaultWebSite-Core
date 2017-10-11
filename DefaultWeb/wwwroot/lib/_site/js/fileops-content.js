//////////////////////////////////////////////////////////////////////
/// File operations content module
//////////////////////////////////////////////////////////////////////
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