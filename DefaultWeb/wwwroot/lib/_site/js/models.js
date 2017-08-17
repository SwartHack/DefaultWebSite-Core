define('dws/model', ['dws/model-actions'], function (ModelActions) {

    var viewModel = {

        file: ko.observable(''),
        files: ko.observableArray([]),
        data: ko.observable(''),
        dataType: ko.observable(''),
        target: ko.observable(''),
        abort: function (xhr, textStatus, data) {
            ModelActions.callAborted(xhr, textStatus, data);
        },
        waiting: ko.observable(false),
        waitingTarget:ko.observable(''),

        sources: ko.observableArray([]).extend( { deffer: true }),
        source: ko.observable(''),
        sourceId: function (sid) {
            var index = viewModel.sources().findIndex(s => s.id == sid);
            viewModel.sourceIndex(index);
            viewModel.source(viewModel.sources()[index]);
            return viewModel.source();
        },
        sourceIndex: ko.observable(''),
        sourcesCount: ko.pureComputed(function () { return 'Records: ' + viewModel.sources().length }, this),
        addSource: function (source) {
            viewModel.sources.unshift(source);
            viewModel.sourceId(source.id);
        },
        canDeleteSource: function () { return viewModel.sources().length > 0 },
        removeSource: function (sid) {
            var index = viewModel.sources().findIndex(s => s.id == sid);
            var source = viewModel.sources()[viewModel.sourceIndex()];
            viewModel.sources.remove(source);
            viewModel.source(undefined);
        },
        sourceAdded: function (parent, index, item) {
            var $parent = $(parent);
            var $item = $(item);

            //viewModel.sources.sort();
            $item.hide().fadeIn('slow');

            // sort and scroll to view TODO
           console.log('Source afterAdd... ');
        },
        comments: ko.observableArray([]).extend({ deffer: true }),
        comment: ko.observable(''),
        commentId: function (cid) {
            var index = viewModel.comments().findIndex(c => c.id == cid);
            viewModel.commentIndex(index);
            viewModel.comment(viewModel.comments()[index]);
            return viewModel.comment();
        },
        commentIndex: ko.observable(''),
        commentsCount: ko.pureComputed(function () { return 'Records: ' + viewModel.comments().length }, this),
        commentTitle: ko.pureComputed(function () { return 'Ima a stupid title!'}, this),
        addComment: function (comment) {
            viewModel.comments.unshift(comment);
            viewModel.commentId(comment.id);
        },
        removeComment: function (cid) {
            var index = viewModel.comments().findIndex(c => c.id == cid);
            var comment = viewModel.comments()[viewModel.commentIndex()];
            viewModel.comments.remove(comment);
            viewModel.comment(undefined);
        },
        commentAdded: function (item) {
            var $item = $(item);
            $item.hide().fadeIn('slow');
            console.log('Comment afterAdd... ');
        },
        canAddComment: function () { return viewModel.sources().length === 0 ? false : true }
        //canDeleteComment: function () {
        //    var list = $('#comments.list-group').children();
        //    var $element = $(list[viewModel.commentIndex()]);
        //    var isClass = $element.hasClass('active')
        //    return isClass;
        //    //return $($('#comments.list-group').children()[viewModel.commentIndex()]).hasClass('active')
        //}
    };

    viewModel.data.subscribe(function (newdata) {

        if (viewModel.target())
            $(viewModel.target()).html(newdata);
        else
            $(newdata).dialog();
    });

    viewModel.source.subscribe(function (source) {
       
        if (source == undefined) {
            var prev = viewModel.sourceIndex() - 1;
            if (prev >= 0)
            {
                source = viewModel.sources()[prev];
                viewModel.sourceId(source.id);
            }
            return;
            //when the source has just been removed?!???
            //select the one above
            // if its the last one
        }
        else
        {
            //var index = viewModel.sources.indexOf(source);
            $($('#sources-table tbody tr')[viewModel.sourceIndex()]).addClass('active').siblings().removeClass('active');
            //re-set comments
            //viewModel.comments([]);
            viewModel.comments(source.comments == null ? [] : source.comments);
            if (viewModel.comments().length > 0) {
                viewModel.commentId(viewModel.comments()[0].id);
            }
            console.log('source subscribe:' + source.sourceName);
        }

        
    });

    viewModel.comment.subscribe(function (comment) {

        if (comment == undefined) {
            var prev = viewModel.commentIndex() - 1;
            if (prev >= 0) {
                comment = viewModel.comments()[prev];
                viewModel.commentId(comment.id);
            }
        }
        else
        {
            //var index = viewModel.comments.indexOf(comment);
            //$($('#comments.list-group').children()[viewModel.commentIndex()]).addClass('active').siblings().removeClass('active');
            var list = $('#comments.list-group').children();
            var $element = $(list[viewModel.commentIndex()]);
            $element.addClass('active').siblings().removeClass('active');
            $('.comment.card a#comment-delete').addClass('disabled');
            $element.find('a#comment-delete').removeClass('disabled');
            console.log('comment subscribe:' + comment.id);
        }
    });


    viewModel.waiting.subscribe(function (wait) {

        ModelActions.waitStatus(wait, viewModel.waitingTarget());
    });


    return viewModel;
});