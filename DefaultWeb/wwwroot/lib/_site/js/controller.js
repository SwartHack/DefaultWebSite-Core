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

    function initKO() {
        ko.applyBindings(viewModel);
    }


    return {
        initKO: initKO,
        test: test,
        sendMessage: sendMessage
    }
    
});
