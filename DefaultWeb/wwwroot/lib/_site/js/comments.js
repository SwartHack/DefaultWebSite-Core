define('dws/comments', ['dws/controller', 'dws/model'],
function (Control, viewModel) {

    function GetSources() {
        
        var settings = {
            url: "/Comments/GetSources",
            cache: false,
            dataType: 'json'
        }

        //// integrate into dispatcher.js  TODO
        $.ajax(settings)
            .done(function (data) {
                viewModel.sources([]);
                viewModel.sources(data.sources);
                // this is against my pattern!!!! TODO
                // model should deal with this, but only first time loading...
                if (data.sources.length > 0) {
                    $('#sources-table tbody tr:first').addClass('active');
                    viewModel.source(data.sources[0]);
                }
                
            })
            .fail(function (request, error) {
                viewModel.aborted(request, error, this.responseText)
            })
            .always(function () {
                //waitEffects(false);
            });
    }

    $(document).on('submit', 'form#create-source', function (e) {

        e.preventDefault();

        var $form = $(this);
        var $submitButton = $('.submit', $form);
        $submitButton.attr("disabled", true);

        //serialize form values to JSON
        var data = $form.serializeArray();
       
        //close the form
        $form.parent().hide();

        $.ajax({
            url: '/Comments/CreateSource',
            dataType: 'json',
            type: 'POST',
            data: data

        }).done(function (data, status) {
            if (!status == 'ok') {
                alert('Invalid response from server...')
            }
            viewModel.addSource(data.source);
        }).fail(function (error) {
            alert('error');
        });

    });

    $(document).on('submit', 'form#create-comment', function (e) {

        e.preventDefault();

        var $form = $(this);
        var $submitButton = $('.submit', $form);
        $submitButton.attr("disabled", true);

        //serialize form values to JSON
        var data = $form.serializeArray();
        var index = data.findIndex(obj => obj.name == 'SourceId');
        data[index] = viewModel.source.id;

        //close the form
        $form.parent().close();

        $.ajax({
            url: '/Comments/CreateComment',
            dataType: 'json',
            type: 'POST',
            data: data
        }).done(function (data, status) {
            if (!data.Comment) {
                alert('Invalid response from server...')
            }
            viewModel.addComment(data.Comment);
        }).fail(function (error) {
            alert('error');
        });

    });

    $(document).on('click', '#sources-table tbody tr', function (e) {
        var $item = $(e.currentTarget);
        var id = $item.attr("id");
        $item.addClass('active').siblings().removeClass('active');
        viewModel.sourceId(id);

    });

    $('#modal-action-template').on('show.bs.modal', function (e) {
       
        e.preventDefault();
        var $item = $(this);
        var type = $item.attr('data-type');
        var action = $item.attr('data-action');
        
        var settings = {
            url: "/Comments/GetModalContent?datatype=" + type + '&action=' + action,
            cache: false,
            dataType: 'html'
        }
        Control.sendMessage(settings, '#modal-action-template');

    });

    $(document).on('click', 'a#source-delete', function (e) {
        e.preventDefault();
        
        $.ajax({
            url: '/Comments/DeleteSource?id=' + viewModel.source().id,
            dataType: 'json'
        }).done(function (status) {
            if (!status == 'ok') {
                alert('Invalid response from server...')
            }
            viewModel.removeSource(viewModel.source().id);
        }).fail(function (error) {
            alert(error);
        });
        
    });

    $(document).on('click', '#comment', function (e) {
        var $item = $(e.currentTarget);
        var id = $item.attr("id");
        $item.addClass('active').siblings().removeClass('active');
        viewModel.sourceId(id);

    });

    return {
        GetSources: GetSources
    }
});




        

