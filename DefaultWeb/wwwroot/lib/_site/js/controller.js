/// Main controller for event declarations, etc.
define('dws/controller', ['dws/komodel', 'dws/dispatcher'],
function (viewModel, Dispatch) {

    function test() {
        var settings = {
            url: "/Home/Talk?message=Hello Server",
            cache: false,
            dataType: 'html'
        }
        viewModel.target(null);
        Dispatch.ajaxRequest(settings);
    }

    function sendMessage(settings, target) {
        viewModel.target(target);
        Dispatch.ajaxRequest(settings);
       
    }

    function sendMessageDefer(settings, target) {
        var deferred = new $.Deferred();
        deferred.done(function (data) {
            if (!data) {
                alert('invalid data from server');
            }
            else {
                // or return deferred to calling action
                viewModel.data(data);
            }
        }).fail(function (error) {
            alert(error);
        });

        viewModel.target(target);
        Dispatch.ajaxRequestDefer(settings, deferred);

    }

    function initKO() {
        ko.applyBindings(viewModel);
    }

    return {
        initKO: initKO,
        test: test,
        sendMessage: sendMessage,
        sendMessageDefer: sendMessageDefer
    }
});
