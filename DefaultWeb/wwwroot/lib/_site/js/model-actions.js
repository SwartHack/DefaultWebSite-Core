define('dws/model-actions', function () {

    function callAborted(xhr, textStatus, data) {

    }

    ///////////////////////////////////////
    /// this is for asynch calls to server
    //////////////////////////////////////
    function waitStatus(status, target) {

        if (status) {
            $(target).addClass('waiting')
        }
        else
        {
            $(target).removeClass('waiting')
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
        loadingStatus: loadingStatus
    }

})