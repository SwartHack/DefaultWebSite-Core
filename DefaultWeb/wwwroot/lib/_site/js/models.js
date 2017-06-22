define('dws/komodel', function () {

    var viewModel = {

        file: ko.observable(''),
        files: ko.observableArray(),
        data: ko.observable(''),
        dataType: ko.observable(''),
        target: ko.observable(''),
        error: ko.observable(function (request, error, response) {
            alert(response + '\n' + error);
        }),
        waitEffects: ko.observable(false)

    };

    viewModel.data.subscribe(function (newdata) {

        if (viewModel.target())
            $(viewmodel.target()).html(newdata);
        else
            $(newdata).dialog();
    });



    return viewModel;
});