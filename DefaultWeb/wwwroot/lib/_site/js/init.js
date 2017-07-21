require(['dws/actions']);
require(['dws/comments']);
require(['dws/sandbox']);
require(['dws/model-actions']);
require(['dws/controller']),
function (control) {

    $(document).ready(function () {
        control.initKO();
    });
}
