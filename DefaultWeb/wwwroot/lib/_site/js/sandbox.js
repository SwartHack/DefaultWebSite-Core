//////////////////////////////////////////////////////////////////////
/// sandbox module - MutationObserver Here!!!
//////////////////////////////////////////////////////////////////////
define('dws/sandbox', ['dws/model'], function (ViewModel) {

    //lets monitor the sand box area for new content and bind accordingly
    var config = {
        attributes: true,
        childList: true,
        characterData: true
    };

    var observer = new MutationObserver(function (changes) {
        changes.forEach(function (change) {
            
            if (change.addedNodes.length > 0) {
                var $dataNodes = $(change.addedNodes).find('[data-bind]');
                $dataNodes.each(function () {
                    var $node = $(this);
                    try {
                        if (!ko.dataFor($node[0])) { ko.applyBindings(ViewModel, $node[0]) }
                    } catch (e) {
                        console.log("ko re-bind exception....")
                    }
                })

                //ko.applyBindings(ViewModel, document.getElementById('sandbox-area'));
                //var newNodes = change.addedNodes;
                //var i;
                //for (i = 0; i < newNodes.length; i++) {
                //    if (!ko.dataFor(newNodes[i])) { ko.applyBindings(ViewModel, newNodes[i]); }
                //}

                //change.addedNodes.forEach(function (item, index) {
                //    if (!ko.dataFor(item))
                //        ko.applyBindings(ViewModel, item);
                //})
            }
        });
    });

    function observe(state) {
        if (state) {
            observer.observe(document.getElementById('sandbox-area'), config);
        }
        else {
            observer.disconnect();
        }
    }
    
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
        observe:observe
    }
});