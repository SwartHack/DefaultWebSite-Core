//////////////////////////////////////////////////////////////////////
/// thumb client module
//////////////////////////////////////////////////////////////////////
define('dws/thumbnail', [],
    function () {

        PDFJS.workerSrc = '/lib/_site/dist/js/pdf.worker.js';

        //////////////////////////////////////////////////////////////////////
        /// 
        //////////////////////////////////////////////////////////////////////
        function getThumbFromFile(file, callback) {

            if ( file.type.match('image/*') ) {
                thumbFromImageFile(file, callback);
                return;
            }
                    
            if (file.type.match('application/*')) {
                thumbFromAppFile(file, callback);
                return;
            }

            if (file.type.match('video/*')) {
                thumbFromVideoFile(file, callback);
                return;
            } 

            // unsupported/invalid
        }

        //////////////////////////////////////////////////////////////////////
        /// 
        //////////////////////////////////////////////////////////////////////
        function thumbFromImageFile(file, callback) {
            var reader = new FileReader();
            reader.file = file;

            reader.onload = (function (e) {
                callback(reader.file,e.target.result);
            });

            reader.readAsDataURL(file);
        }

        //////////////////////////////////////////////////////////////////////
        /// TODO
        /// Gonna have to deal with each application type individually as we 
        /// support more. Need a smarter way to do it as there are so many!!!
        //////////////////////////////////////////////////////////////////////
        function thumbFromAppFile(file, callback) {

            if (file.type.match('/pdf')) {
                var reader = new FileReader();
                reader.file = file;
                reader.callback = callback;

                reader.onload = (function (e) {
                    thumbFromPdf(reader.file, e.target.result, reader.callback);
                });

                reader.readAsDataURL(file);
            }
        }

        //////////////////////////////////////////////////////////////////////
        /// 
        //////////////////////////////////////////////////////////////////////
        function thumbFromVideoFile(file, callback) {
            
            var reader = new FileReader();
            reader.file = file;
            reader.callback = callback;

            reader.onload = (function (e) {

                var domVideo = document.createElement('video');
                var objVideo = videojs(domVideo);
                objVideo.height(90);
                objVideo.width(160);
                objVideo.preload('auto');
                //$(video).show();
                //$('.main-content').append(video);

                objVideo.on('loadeddata', function () {
                    objVideo.currentTime(10);
                });

                objVideo.on('seeked', function () {
                    generateThumbnail(this, file, callback);
                });

                //video.addEventListener('loadeddata', function (e) {
                //    video.currentTime = 10;
                //}, false);

                //video.addEventListener('seeked', function () {

                //    generateThumbnail(video, file, callback);

                   
                //}, false);

                objVideo.src(e.target.result);
                //video.load();
          
            });

            reader.readAsDataURL(file);
        }


         //////////////////////////////////////////////////////////////////////
        /// 
        //////////////////////////////////////////////////////////////////////
        function generateThumbnail(video, file, callback) {

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.height = 90;
            canvas.width = 160;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video.el().children[0], 0, 0, canvas.width, canvas.height);
            //var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            //$('.main-content').append(canvas);
            var dataurl = canvas.toDataURL();

            callback(file, dataurl);

            //clean up, no dispose on DOM elements, how does HTML5 API deal with this?
            //TODO
            //objVideo = videojs(video);
            video.src(null);
            video.dispose();
        }

         //////////////////////////////////////////////////////////////////////
        /// 
        //////////////////////////////////////////////////////////////////////
        function thumbFromPdf(file, fileUrl, callback) {
            
            PDFJS.getDocument(fileUrl).then(function (pdf) {

                pdf.getPage(1).then(function (page) {
                    var viewport = page.getViewport(0.5);
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    var renderContext = {
                        canvasContext: ctx,
                        viewport: viewport
                    };

                    page.render(renderContext).then(function () {
                        //set to draw behind current content
                        ctx.globalCompositeOperation = "destination-over";
                        //set background color
                        ctx.fillStyle = "#fff";
                        //draw on entire canvas
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        // send back an img from the canvas which contains the page contents
                        callback(file, canvas.toDataURL());

                    });

                });
            });
        }

        return {
            getThumbFromFile: getThumbFromFile
        }

    });
