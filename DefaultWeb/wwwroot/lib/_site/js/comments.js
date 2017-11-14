//////////////////////////////////////////////////////////////////////
/// comments module
//////////////////////////////////////////////////////////////////////
define('dws/comments', ['dws/controller', 'dws/model'],
function (Control, viewModel) {

    function GetSources() {
        
        var settings = {
            url: "/Comments/GetSources",
            cache: false,
            dataType: 'json'
        }
        viewModel.waitingTarget('#navbar-main');
        viewModel.waiting(true);
        //// integrate into dispatcher.js  TODO
        $.ajax(settings)
            .done(function (data) {
                viewModel.sources([]);
                viewModel.sources(data);
                // this is against my pattern!!!! TODO
                // model should deal with this, but only first time loading...
                if (data.length > 0) {
                 //$('#sources-table tbody tr:first').addClass('active');
                    viewModel.sourceId(data[0].id);
                }
                
            })
            .fail(function (xhr, textStatus, error) {
                viewModel.aborted(xhr, textStatus, error);
            })
            .always(function (data, textStatus, xhr) {
                viewModel.waiting(false);

            });
    }

    $(document).on('click', '#sources-table tbody tr', function (e) {
        var $item = $(e.currentTarget);
        var id = $item.attr("id");
        //$item.addClass('active').siblings().removeClass('active');
        viewModel.sourceId(id);

    });

    $(document).on('click', '.comment.card', function (e) {
        e.preventDefault();
        var $item = $(e.currentTarget);
        var id = $item.attr("id");
        //$item.addClass('active').siblings().removeClass('active');
        viewModel.commentId(id);

    });

    $('#modal-action-template').on('show.bs.modal', function (e) {
        //e.preventDefault();
        var $item = $(e.relatedTarget);
        Control.sendMessage($item, '#modal-action-template');
    });

    $(document).on('submit', 'form#create-source', function (e) {

        e.preventDefault();
        var $form = $(this);
        //var $submitButton = $('.submit', $form);
        //$submitButton.attr("disabled", true);
        $form.attr('disabled', true);

        // here one way to do it from form values to JSON data
        // this works well with unobtrusive validation
        //
        //serialize form values to JSON
        var formvals = $form.serializeArray();

        var settings = {
            url: '/Comments/CreateSource',
            type: 'POST',
            data: formvals
        }

        $.ajax(settings)
            .done(function (data, textStatus, xhr) {
                if (xhr.status == 200) {
                    $form.closest('#modal-action-template').modal('hide');
                    viewModel.addSource(data.source);
                }
                else {
                    $('#target-modal').html(data);
                }
            })
            .fail(function (xhr, textStatus, error) {
                $form.closest('#modal-action-template').modal('hide');
                viewModel.abort(xhr, textStatus, error);
            });
    });

    $(document).on('submit', 'form#create-comment', function (e) {

        e.preventDefault();
        var $form = $(this);
        //var $submitButton = $('.submit', $form);
        //$submitButton.attr("disabled", true);
        $form.attr('disabled', true);

        // populate SourceId
        $('input#SourceId.form-control', $form).val(viewModel.source().id);
        //serialize form values to JSON
        var formvals = $form.serializeArray();
        
        viewModel.waitingTarget('.modal-header');
        viewModel.waiting(true);

        var settings = {
            url: '/Comments/CreateComment',
            type: 'POST',
            dataType: 'json',
            data: formvals
        };

        $.ajax(settings)
            .done(function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                $form.closest('#modal-action-template').modal('hide');
                viewModel.addComment(data.comment);
            }
            else {
                $('#target-modal').html(data);
            }
            
        }).fail(function (xhr, textStatus, error) {
            $form.closest('#modal-action-template').modal('hide');
            viewModel.abort(xhr, textStatus, error);
        }).always(function (data, textStatus, xhr) {
            viewModel.waiting(false);

        });

    });

    $(document).on('click', 'a#source-delete', function (e) {

        //if (viewModel.comments().length > 0) {
            
        //    $.confirm({
        //        title: 'Cascade Delete Source and Comments?',
        //        content: 'There are child Comments! Continuing will delete the Source record and all child Comments. This action can not be undone!!!',
        //        buttons: {
        //            confirm: function () { deleteSource(); },
        //            cancel: function () { return; }
        //        }
        //    });
        //}
        //else {
        //    deleteSource();
        //}
    });

    function deleteSource() {

        $.ajax({
            url: '/Comments/DeleteSource?sid=' + viewModel.source().id,
            type: 'POST',
            headers: { 'RequestVerificationToken': viewModel.xsrfToken() }

        }).done(function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                viewModel.removeSource(data);
            }

        }).fail(function (xhr, textStatus, error) {
            viewModel.abort(xhr, textStatus, error);
        });
    }

    $(document).on('click', 'a#comment-delete', function (e) {
       
        //$.confirm({
        //    title: 'Delete Comment(s)?',
        //    content: 'This action can not be undone!!!',
        //    buttons: {
        //        confirm: function () { deleteComment(); },
        //        cancel: function () { return; }
        //    }
        //});
    });

    function deleteComment() {
        $.ajax({
            url: '/Comments/DeleteComment?cid=' + viewModel.comment().id,
            type: 'POST',
            headers: { 'RequestVerificationToken': viewModel.xsrfToken() }
        }).done(function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                viewModel.removeComment(data);
            }
        }).fail(function (xhr, textStatus, error) {
            viewModel.abort(xhr, textStatus, error);
        });
    }

    return {
        GetSources: GetSources
    }
});




        

