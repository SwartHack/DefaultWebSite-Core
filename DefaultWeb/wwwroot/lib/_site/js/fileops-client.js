//////////////////////////////////////////////////////////////////////
/// File ops client module
//////////////////////////////////////////////////////////////////////
define('dws/fileops-client', ['dws/controller','/dws/thumbnail', 'dws/model'],
    function (Control, Thumbnail, viewModel) {

        ///////////////////////////////////////////////////////////////////////
        /// init cause it controls/binds async html content not present at site load
        /// we could pre-load everything, or lazy/late load like this
        /// pros and cons....TODO
        //////////////////////////////////////////////////////////////////////
        function init() {

            $('#file-input').change(function (evt) {
                filesSelected(evt);
            });
            //$("form#file-upload button[id=Cancel_btn]").click(function () {
            //    Cancel_btn_handler()
            //});
            $('a#file-upload-open').on('click', function (e) {

                var options = {
                    minWidth: 500,
                    //height: 'auto',
                    modal: true,
                    title: 'Upload Files'
                };
                $('#file-ops-client').dialog(options);
            });

            $('#file-ops-client').on('dialogclose', function (event, ui) {
                var $diag = $(this);
                $diag.hide(); //animate
                $diag.empty();
                $diag.remove();
            });

            $(document).on('click', '.upload-file-delete', function (e) {
                e.preventDefault();
                fileRemove(e);
            });
            
            var dropZone = document.getElementById('file-upload-drop');
            dropZone.addEventListener('dragover', handleDragOver, false);
            dropZone.addEventListener('drop', filesSelected, false);
            dropZone.addEventListener('dragenter', dragenterHandler, false);
            dropZone.addEventListener('dragleave', dragleaveHandler, false);
            $.blockUI.defaults.overlayCSS = {
                backgroundColor: '#000',
                opacity: 0.6
            };

            //$.blockUI.defaults.css = {
            //    padding: 0,
            //    margin: 5,
            //    width: '60%',
            //    top: '30%',
            //    left: '20%',
            //    color: '#000',
            //    border: '3px solid #aaa',
            //    backgroundColor: '#fff'
            //};
            //$.blockUI({ message: $('#file-ops-client') });
        }

        function isValidMimeType(file) {

            for (var i = 0; i < viewModel.mimeTypes().length; i++) {
                if ( file.type.match(viewModel.mimeTypes()[i]) ) {
                    return true;
                }
            }
            return false;
        }

        ///////////////////////////////////////////////////////////////////////
        /// 
        //////////////////////////////////////////////////////////////////////
        function filesSelected(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            $('#file-upload-drop').removeClass('hover');

            var files = (evt.target.files || evt.dataTransfer.files);
            var filelist = [];

            for (var i = 0, f; f = files[i]; i++) {

                if (!isValidMimeType(f)) {
                    //TODO
                    // Don't push error file
                    //viewModel.uploadFiles.push({ name: fileInfo.name, size: fileInfo.size(), type: fileInfo.type, error: error });
                    //notify ?
                    continue;
                }
                else {
                    var fname = f.name;
                    var dups = viewModel.uploadFilesInfo().findIndex(f => f.name == fname);
                    if (dups > -1) { continue; }

                    
                    var fileSize = getFileSize(f.size);
                    
                   
                    //viewModel.uploadFilesInfo.push({ name: file.name, size: fileSize, type: file.type, filecontent: fileContent });
                    //viewModel.uploadFiles.push(file);

                    
                }
            }
        }

        function pushFile(file) {

            switch (file.type) {

                case file.type.match('image/*'):

                    var reader = new FileReader();
                    reader.onload = (function (file) {
                        return function (e) {
                            viewModel.fileContent(e.target.result);
                            //push should be localized
                        }
                    });

                    reader.readAsDataURL(file);
                    break;

                case 'application/pdf':
                    //getApplicationIcon(file);
                    break;

                default:
            }

        }

        //function readImageContent(file) {

        //    var reader = new FileReader();
        //    reader.onload = (function (file) {
        //        return function (e) {
        //            viewModel.fileContent(e.target.result);
        //        }
        //    })(f);

        //    reader.readAsDataURL(f);
        //}

        function getFileSize(size) {
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
        }

        function fileRemove(e) {
            var $item = $(e.originalEvent.target).closest('#file-info-container');
            var index = $item.index();
            // remove from viewModel uploadFiles
            viewModel.uploadFilesInfo.splice(index, 1);
            viewModel.uploadFiles.splice(index, 1);
        }

        ///////////////////////////////////////////////////////////////////////
        ///  file upload api async call
        //////////////////////////////////////////////////////////////////////
        $(document).on('submit', 'form#file-upload', function (e) {

            e.preventDefault();
            var $form = $(this);
            
            // we are going to manually client-side validate here before submit
            // WHY? Well, I'll tell you why....
            // TODO
            var desc = $('textarea#description', $form[0]).val();
            if ( desc == '' || desc.length < 10 ) {
                $('span#description-validate', $form[0]).text('Description is required, ten(10) character minimum...');
                return;
            }
            $('textarea#description', $form[0]).val(desc);
            $('textarea#description', $form[0]).text(desc);

            //disable for once and for all 
            // TODO
            $form.attr('disabled', true); // does not seem to work?!

             //var formvals = $form.serializeArray();
            // here is another way to get form values for JSON data
            // get the DOM element from Jquery
            // Have not tested with unobstrusive, but we are not using Model validation here
            // TODO - can't effectively deal with FormData here, but Controller likes it...
            
            var formData = new FormData($form[0]);
            formData.set('files', '');

            //load in the selected files, check for dups? YES!
            for (var i = 0; i < viewModel.uploadFiles().length; i++) {
                var file = viewModel.uploadFiles()[i];
                formData.append('files', file);
            }
           
            var settings = {
                url: '/api/dws/files/upload',  //Server web api
                type: 'POST',
                data: formData,
                contentType: false,
                processData:false
            };

            // TODO
            // as always we want to dispatch, but need to account for variety of request types and targets.
            viewModel.waitingTarget('#navbar-main');
            viewModel.waiting(true);
            $($form,'.progress.upload-progress').show();

            $.ajax(settings)
                .done(function (data, textStatus, xhr) {
                    if (xhr.status == 200) {
                        viewModel.fileInfo(data);
                    }
                    else {
                        viewModel.abort(data, textStatus, null);
                    }
                })
                .fail(function (xhr, textStatus, error) {
                    viewModel.abort(xhr, textStatus, error);
                })
                .always(function () {
                    viewModel.uploadFiles([]);
                    viewModel.uploadFilesInfo([]);
                    $('#file-ops-client').dialog('close');
                    //$('#file-ops-client').find('.progress.upload-progress').hide();
                    //$('#file-ops-client').remove();
                    viewModel.waiting(false);
                });
        });

        ///////////////////////////////////////////////////////////////////////
        /// update upload progress
        /// TODO progress per file
        //////////////////////////////////////////////////////////////////////
        function progressHandlingFunction(e) {
            if (e.lengthComputable) {
                var percentComplete = Math.round(e.loaded * 100 / e.total);
                $("#file-progress").css("width", percentComplete + '%').attr('aria-valuenow', percentComplete);
                $('#file-progress span').text(percentComplete + "%");
            }
            else {
                $('#file-progress span').text('unable to compute');
            }
        }
        
        ///////////////////////////////////////////////////////////////////////
        /// Drop zone drag and drop stuff
        //////////////////////////////////////////////////////////////////////
        function handleDragOver(evt) {
            evt.preventDefault();
            evt.dataTransfer.effectAllowed = 'copy';
            evt.dataTransfer.dropEffect = 'copy';
        }

        function dragenterHandler() {
            //$('#drop_zone').removeClass('drop_zone');
            $('#file-upload-drop').addClass('hover');
        }

        function dragleaveHandler() {
            $('#file-upload-drop').removeClass('hover');
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
            $('#file-upload-list').empty();
            //$('#file-upload-list').show();
           // $.unblockUI();
            viewModel.waitEffects(false);
        }

        return {
            init: init,
            progressHandlingFunction: progressHandlingFunction,
            fileRemove: fileRemove
        }
    });