//////////////////////////////////////////////////////////////////////
/// sandpit module - MutationObserver Here!!!
//////////////////////////////////////////////////////////////////////
define(['dws/model'], function (viewModel) {

    $(document).ready(function () {

        $(document).on('click', 'a.sandpit-toggle-text', function (e) {
            e.preventDefault();
            var $link = $(e.target);
            var $text = $link.parent().siblings('.card-text.expand');

            if ($text.length == 1) {
                $text.removeClass('expand');
                $link.text('More...');
            }
            else {

                $('.sandpit-wrapper').find('.sandpit-item').children('.card-text.expand').removeClass('expand');
                $('.sandpit-wrapper').find('.sandpit-toggle-text').text('More...');
                $link.parent().siblings('.card-text').addClass('expand');
                $link.text('Less...');
            }
        });

    });
    
    //lets monitor the sand box area for new content and bind accordingly
    var config = {
        attributes: true,
        childList: true,
        characterData: true
    };

    var observerKo = new MutationObserver(function (changes) {
        changes.forEach(function (change) {
            
            if (change.addedNodes.length > 0) {

                var $dataNodes = $(change.addedNodes).find('[data-bind]');
                $dataNodes.each(function () {
                    var $node = $(this);
                    try {
                        //if (!ko.dataFor($node[0])) {
                            ko.applyBindings(viewModel, $node[0])
                        //}
                    } catch (e) {

                        console.log("ko re-bind exception:\n");
                    }
                })
            }
        });
    });

    function observeKo(state) {
        if (state) {
            observerKo.observe(document.getElementById('sandpit-target-area'), config);
            //observerKo.observe(document.getElementById('file-ops-client'), config);
        }
        else {
            observerKo.disconnect();
        }
    }

    //var observerSandItems = new MutationObserver(function (changes) {
    //    changes.forEach(function (change) {

    //        if (change.changedNodes.length > 0) {
    //            var $dataNodes = $(change.addedNodes).find('[data-bind]');
    //            $dataNodes.each(function () {
    //                var $node = $(this);
    //                try {
    //                    if (!ko.dataFor($node[0])) { ko.applyBindings(ViewModel, $node[0]) }
    //                } catch (e) {
    //                    console.log("ko re-bind exception....")
    //                }
    //            })
    //        }
    //    });
    //});

    //function observeSandItems(state) {
    //    if (state) {
    //        observerSandItems.observe(document.getElementById('sandbox-items'), config);
    //    }
    //    else {
    //        observerSandItems.disconnect();
    //    }
    //}
    ///
    ///if we ever need for some reason....
    ///
    //function findNode($nodes) {
    //    $nodes.each(function () {
    //        var $node = $(this);
    //        if ($node.children().length() > 0) {
    //            findNode($node.children());
    //        }

    //        if ($node.attr('data-bind')) {
    //            console.log($node.attr('data-bind'));  // the new element	
    //            try {
    //                ko.applyBindings(ViewModel, $node);
    //            } catch (e) {
    //                alert(e.message);
    //            }
    //        }

    //    });
    //}

    return {
        observeKo: observeKo
    }
});