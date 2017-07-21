define('dws/model', ['dws/model-actions'], function (ModelActions) {

    var viewModel = {

        file: ko.observable(''),
        files: ko.observableArray([]),
        data: ko.observable(''),
        dataType: ko.observable(''),
        target: ko.observable(''),
        error: function (request, error, response) {
            alert(response + '\n' + error);
        },
        waiting: ko.observable(false),

        sources: ko.observableArray([]).sort(),

        source: ko.observable(''),
        sourceId: function (sid) {
            var index = viewModel.sources().findIndex(s => s.id == sid);
            viewModel.source(viewModel.sources()[index]);
        },
        sourceIndex: ko.observable(''),
        sourcesCount: ko.pureComputed(function () { return 'Records: ' + viewModel.sources().length }, this),
        addSource: function (item) {
            viewModel.sources.unshift(item);
        },
        removeSource: function (item) {
            viewModel.sources.remove(item);
        },
        
        sourceAdded: function (parent, index, item) {
            var $parent = $(parent);
            var $item = $(item);

            //viewModel.sources.sort();
            $item.hide().fadeIn('slow');

            //scroll to view TODO
            console.log('Source afterAdd... ');
        },
        //sourceRemoving: function (parent, index, item) {
        //    var $item = $(item);
        //    var $next = $item.closest('tr');
        //    var id = $next.attr('id');
        //    viewModel.sourceId(id);

        //},
        comments: ko.observableArray([]),
        comment: ko.observable(''),
        commentsCount: ko.pureComputed(function () { return 'Records: ' + viewModel.comments().length }, this),
        addComment: function (item) {
            viewModel.comments.unshift(item);
        },
        removeComment: function (item) {
            viewModel.comments.remove(item);
        },
        commentAdded: function (item) {
            var $item = $(item);
            $item.hide().fadeIn('slow');
            console.log('Comment afterAdd... ');
        },
        canAddComment: function () { return this.source === null ? false : true }

        
    };

    viewModel.data.subscribe(function (newdata) {

        if (viewModel.target())
            $(viewModel.target()).html(newdata);
        else
            $(newdata).dialog();
    });

    viewModel.source.subscribe(function (source) {
        //$('#sources-table tbody tr').removeClass('active');
        //var index = viewModel.sources.indexOf(source);
        //$($('#sources-table tbody tr')[index]).addClass('active').siblings().removeClass('active');

        if (source === null) {
            //when the source has just been removed?!???
        }


        if (source != null && source.comments != null) {
            viewModel.comments(source.comments);
        }

        console.log('source subscribe:' + source);
    });

    viewModel.waiting.subscribe(function (wait) {

        if (wait) {

        }
        else {

        }

        //function waitEffects(status) {

        //    if (status) {
        //        $('').addClass('waiting')
        //    }

        //    var completed = $(target)[0].complete;
        //    if (!completed) {
        //        $(target)[0].addClass('loading');
        //        $(target).load(function () {
        //            $(target).removeClass('loading');
        //        });
        //    }
        //} 

    });


    return viewModel;
});