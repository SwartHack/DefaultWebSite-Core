//////////////////////////////////////////////////////////////////////
/// thumb client module
//////////////////////////////////////////////////////////////////////
define('dws/thumbnail', [],
    function () {

        //////////////////////////////////////////////////////////////////////
        /// 
        //////////////////////////////////////////////////////////////////////
        function getThumbFromFile(file, callback) {

            if ( file.type.match('image/*') ) {
               thumbFromImageFile(file, callback);
            }
                    
            if (file.type.match('application/*')) {
                thumbFromAppFile(file, callback);
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

            if (file.type.match('*/pdf')) {
                thumbFromPdf(file, callback);
            }
           
        }

         //////////////////////////////////////////////////////////////////////
        /// 
        //////////////////////////////////////////////////////////////////////
        function thumbFromPdf(file, callback) {

            PDFJS.workerSrc = 'pdf.worker.js';

            var fullname = file.name;
            PDFJS.getDocument(fullname).then(function (pdf) {

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
                        // create an img from the canvas which contains the page contents
                        var img_src = canvas.toDataURL();

                        callback(file, img_src);
                    });

                });


            });

        }

         //////////////////////////////////////////////////////////////////////
        /// 
        //////////////////////////////////////////////////////////////////////
        function thumbFromVideoFile() {

        }

         

        return {
            getThumbFromFile: getThumbFromFile
        }

    });
