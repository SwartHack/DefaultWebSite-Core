//////////////////////////////////////////////////////////////////////
/// File operations content module
//////////////////////////////////////////////////////////////////////
define('dws/fileops-content', ['dws/controller', 'dws/model'],
    function (Control, viewModel) {
        /////////////////////////////////////////////////////////////
        /// late init because we are not present in DOM on site load
        /////////////////////////////////////////////////////////////
        function init() {

            /////////////////////////////////////////////////////////////
            /// Thumbnail click
            /////////////////////////////////////////////////////////////
            $(document).on('click', 'ul#thumbnails li', function (e) {
                e.preventDefault();
                
                var $link = $(this);
                if (!$link.hasClass('selected')) {
                    openFile($link);
                }
            });


            //$('.main-document.content-area').on('show', function (e) {
            //    e.preventDefault();
               
            //    if (viewModel.fileMimeType().match('application/pdf')) {
            //        loadPdfFile();
            //        $(this).children('#my-pdf-container').show();
            //        $('#doc-embedded').hide();
            //    }
            //    else {
            //        $('#my-pdf-container').hide();
            //        //$('#doc-embedded').show();
            //    }

            //});

            $('.main-document.content-area').on('hide', function () {

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

            

            hideAllContent();

            getContent();

            //// expand this
            //$('#col-util').hide();
            //$('#col-main').addClass('full-size');
        }

        ///////////////////////////////////////////////////////////////////////
        // Subscribing to viewModel anywhere you reference it!!
        ////////////////////////////////////////////////////////////////////////
        viewModel.fileViewApi.subscribe(function (newFile) {

            // we have a new file, depending on type we have to account for model binding
            // behavior, <embed> and <video>.
            // do this before show

            if (viewModel.fileMimeType().match('application/pdf')) {
                // try to get pdfjs viewer to work, TODO
                // must replace the element each time! binding does not work!
                // default to HTML5 only
                var target = document.querySelector('.main-content .main-document');
                while (target.firstChild) {
                    target.removeChild(target.firstChild);
                }
                var emb = document.createElement('embed');
                emb.setAttribute('id', 'doc-embedded');
                emb.setAttribute('src', viewModel.fileViewApi());
                emb.setAttribute('type', viewModel.fileMimeType());
                target.appendChild(emb);

                // pdf-js
                //loadPdfFile();
            }
            else if (viewModel.fileMimeType().match('image/*')) {
                // call out to do this TODO
                //var exif = parseEXIF(data.EXIF);
                //if (exif) {
                //    viewModel.exif(exif);
                //    exif.length ? $('.image-info.image-exif').fadeIn() : $('.image-info.image-exif').fadeOut();
                //}
                //data.Desription ? $('.image-info-descr').fadeIn() : $('.image-info-descr').fadeOut();

                //$('#ImageVPathEditImageInfo').val(data.VirtualPath);
            }
            else if (viewModel.fileMimeType().match('video/*')) {

                // switch to videojs TODO
                // this replaces the element each time! binding does not work!
                var video = document.querySelector('.main-content .main-video video');
                var source = document.createElement('source');

                source.setAttribute('src', viewModel.fileViewURL());
                source.setAttribute('type', viewModel.fileMimeType());

                //delete <source> child elements
                $(video).empty();  //detach

                video.appendChild(source);
                video.load();
            }

            // now make it visible
            // what's my visible content area
            var $target = $(viewModel.fileViewTarget());

            if (!$target.is(':visible')) {
                $('.content-area').hide();
                $target.css('display', 'inline');
                $target.show();            }
        });

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
                    viewModel.serverFiles([]);
                    viewModel.serverFiles(data);
                })
                .fail(function (xhr, textStatus, error) {
                    viewModel.abort(xhr, textStatus, error);
                })
                .always(function (data, textStatus, xhr) {
                    viewModel.waiting(false);
                });
        }

        ///////////////////////////////////////////////////////////////////////
        // 
        ////////////////////////////////////////////////////////////////////////
        function clickThumbnail($thumbnail) {
            //figure this latter
            //window.history && window.history.pushState && window.history.replaceState({ image: "", virtualPath: "" }, "", "");
            openFile($thumbnail);
        }

        ///////////////////////////////////////////////////////////////////////
        // 
        ////////////////////////////////////////////////////////////////////////
        function openFile($thumbnail) {
            var fileApi = $thumbnail.attr('data-api');
            var fileTarget = $thumbnail.attr('data-target');
            var type = $thumbnail.attr('data-type');

            styleSelectedThumbnail($thumbnail);

            viewModel.fileMimeType(type);
            viewModel.fileViewTarget(fileTarget);
            viewModel.fileViewApi(fileApi);
        }

        ///////////////////////////////////////////////////////////////////////
        // 
        ////////////////////////////////////////////////////////////////////////
        function loadPdfFile() {

            var SEARCH_FOR = ''; 
            var mypdf = document.getElementById('my-pdf-viewer');
            var container = mypdf.querySelector('#viewerContainer');

            // (Optionally) enable hyperlinks within PDF files.
            var pdfLinkService = new PDFJS.PDFLinkService();
            
            var pdfViewer = new PDFJS.PDFViewer({
                container: container
            });
            pdfLinkService.setViewer(pdfViewer);

            // (Optionally) enable find controller.
            var pdfFindController = new PDFJS.PDFFindController({
                pdfViewer: pdfViewer
            });
            pdfViewer.setFindController(pdfFindController);

            container.addEventListener('pagesinit', function () {
                // We can use pdfViewer now, e.g. let's change default scale.
                pdfViewer.currentScaleValue = 'page-width';

                if (SEARCH_FOR) { // We can try search for things
                    pdfFindController.executeCommand('find', { query: SEARCH_FOR });
                }
            });

            // Loading document.
            PDFJS.getDocument(viewModel.fileViewApi()).then(function (pdfDocument) {
                // Document loaded, specifying document for the viewer and
                // the (optional) linkService.
                pdfViewer.setDocument(pdfDocument);
                pdfLinkService.setDocument(pdfDocument, null);
            });
        }

        function contentNext() {
            var linkNext = $('ul#thumbnails li.selected').next('li');
            $(linkNext).trigger('click');
        }

        function contentPrev() {
            var linkPrev = $('ul#thumbnails li.selected').closest('li');
            $(linkPrev).trigger('click');
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

        

        return {
            init:init,
            contentNext: contentNext,
            contentPrev: contentPrev,
            clickThumbnail: clickThumbnail,
            hideAllContent: hideAllContent,
            showContent: showContent
           
        };

    });