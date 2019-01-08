//////////////////////////////////////////////////////////////////////
/// Main controller for event declarations, etc.
//////////////////////////////////////////////////////////////////////
define(['dws/model', 'dws/dispatcher'],
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

    ////////////////////////////////////////////////////////////////////
    ///
    ////////////////////////////////////////////////////////////////////
    function checkBrowser() {
        // Opera 8.0+
        var isOpera = (!!window.opr && !! window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';

        // Safari 3.0+ "[object HTMLElementConstructor]" 
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;

        // Chrome 1+
        var isChrome = !!window.chrome;

        // Blink engine detection
        var isBlink = (isChrome || isOpera) && !!window.CSS;

        if (!isChrome && !isFirefox ) {
            $('#dws-browser-version').show();
        }
    }

    //////////////////////////////////
    ///
    ////////////////////////////////
    function showContentArea(selector) {
        if (!$(selector).is(':visible')) {
            hideAllContent();
            $(selector).show(); // beware that using an animated show (fadeIn, etc) may conflict with the visibility check
        }
    }

    function hideAllContent() {
        $('.content-area').hide();
    }

    function dispatch(settings, target) {

        viewModel.target(target);
        Dispatch.ajaxRequest(settings);
    }


    //////////////////////////////////
    /// Incorporate this into an HtmlHelper DwsLink()
    ////////////////////////////////
    function parseNavUrl($link) {
        var url;

        if ($link.attr('data-target-controller') && $link.attr('data-target-action')) {
            url = "/" + $link.attr('data-target-controller') + "/" + $link.attr('data-target-action');
        }
        else {
            url = "/" + $link.attr('data-target-controller') + "/GetView";
        }

        if ($link.attr('data-target-id')) {
            url = url + '/' + $link.attr('data-target-id');
        }

        return url;
    }

    //////////////////////////////////
    ///
    ////////////////////////////////
    function sendMessage($item, target) {
        if (!target)
            target = $item.attr('data-target');
        var url = parseNavUrl($item);
        var settings = {
            url: url,
            cache: false
        }
        viewModel.target(target);
        Dispatch.ajaxRequest(settings);
       
    }

    //////////////////////////////////////////////
    /// What advantage/disadvantage to doing this?
    ////////////////////////////////////////////
    function sendMessageDefer($item) {
        var target = $item.attr('data-target')
        var url = parseNavUrl($item);
        var settings = {
            url: url,
            cache: false
        }
        
        var deferred = new $.Deferred();
        deferred.done(function (data) {
            if (!data) {
                alert('invalid data from server');
            }
            else {
                // or return deferred to calling action
                viewModel.data(data);
            }
        }).fail(function (xhr, textStatus, error) {
            viewModel.abort(xhr, textStatus, error);
        });

        viewModel.target(target);
        Dispatch.ajaxRequestDefer(settings, deferred);

    }

    //////////////////////////////////
    ///
    ////////////////////////////////
    function initKO() {
        ko.applyBindings(viewModel);
    }

    function setXsrf(xsrf) {
        viewModel.xsrfToken(xsrf);
    }

    function setPdfWorker(pdfWorker) {
        PDFJS.workerSrc = pdfWorker;
        viewModel.pdfWorker(pdfWorker);
    }

    return {
        
        initKO: initKO,
        test: test,
        sendMessage: sendMessage,
        sendMessageDefer: sendMessageDefer,
        showContentArea: showContentArea,
        hideAllContent: hideAllContent,
        parseNavUrl: parseNavUrl,
        setXsrf: setXsrf,
        setPdfWorker: setPdfWorker,
        dispatch: dispatch,
        checkBrowser: checkBrowser
    }
});
