//////////////////////////////////////////////////////////////////////
/// KO viewModel extensions module
//////////////////////////////////////////////////////////////////////
define('dws/model-utils', function () {

    //var dataURLFileReader = {
    //    read: function (file, callback) {
    //        var reader = new FileReader();
    //        var fileInfo = {
    //            name: file.name,
    //            type: file.type,
    //            fileContent: null,
    //            size: function () {
    //                var FileSize = 0;
    //                if (file.size > 1048576) {
    //                    FileSize = Math.round(file.size * 100 / 1048576) / 100 + " MB";
    //                }
    //                else if (file.size > 1024) {
    //                    FileSize = Math.round(file.size * 100 / 1024) / 100 + " KB";
    //                }
    //                else {
    //                    FileSize = file.size + " bytes";
    //                }
    //                return FileSize;
    //            }
    //        };
    //        if (!file.type.match('image.*')) {
    //            callback("file type not allowed", fileInfo);
    //            return;
    //        }
    //        reader.onload = function () {
    //            fileInfo.fileContent = reader.result;
    //            callback(null, fileInfo);
    //        };
    //        reader.onerror = function () {
    //            callback(reader.error, fileInfo);
    //        };
    //        reader.readAsDataURL(file);
    //    }
    //};

    function callAborted(xhr, textStatus, error) {

     }

    ///////////////////////////////////////
    /// this is for async ajax calls to server
    //////////////////////////////////////
    function waitStatus(status, target) {

        if (status) {
            $(target).addClass('waiting');
        }
        else {
            $(target).removeClass('waiting');
        }
    }

    ///////////////////////////////////////
    /// this is for actual DOM element loading
    ///////////////////////////////////////
    function loadingStatus(status, target) {
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

});