//////////////////////////////////////////////////////////////////////
/// File ops client module
//////////////////////////////////////////////////////////////////////
define('dws/fileops-client', ['dws/controller', 'dws/model'],
    function (Control, ViewModel) {

        ///////////////////////////////////////////////////////////////////////
        /// init cause it controls async html content not present at site load
        /// we could pre-load everything, or lazy/late load like this
        /// pros and cons....TODO
        //////////////////////////////////////////////////////////////////////
        function init() {
            $("#file-input").change(function (evt) {
                MultiplefileSelected(evt);
            });
            $("form#file-upload button[id=Cancel_btn]").click(function () {
                Cancel_btn_handler()
            });
            $('a#file-upload-open').on('click', function () {

                var options = {
                    minWidth: 500,
                    height: 'auto',
                    modal: true,
                    title: 'Upload Files'
                };

                $('#file-ops-client').dialog(options);
            });
            
            var dropZone = document.getElementById('file-upload-drop');
            dropZone.addEventListener('dragover', handleDragOver, false);
            dropZone.addEventListener('drop', MultiplefileSelected, false);
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

        ///////////////////////////////////////////////////////////////////////
        /// 
        //////////////////////////////////////////////////////////////////////
        function MultiplefileSelected(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            $('#drop_zone').removeClass('hover');

            ViewModel.uploadFiles = evt.target.files || evt.dataTransfer.files;
        }

        ///////////////////////////////////////////////////////////////////////
        ///  file upload api async call
        //////////////////////////////////////////////////////////////////////
        $(document).on('submit', 'form#file-upload', function (e) {

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
                    $('#client-container').empty();
                    $('.create-file-link').show();
                    $.unblockUI();
                    ViewModel.waitEffects(false);
                });
        });

        ///////////////////////////////////////////////////////////////////////
        /// update upload progress
        /// TODO progress per file
        //////////////////////////////////////////////////////////////////////
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