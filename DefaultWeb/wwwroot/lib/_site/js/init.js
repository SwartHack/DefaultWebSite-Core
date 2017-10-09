//////////////////////////////////////////////////////////////////////
/// init module - TODO eliminate redundant requires, control initiates all
//////////////////////////////////////////////////////////////////////
require(['dws/actions']);
require(['dws/comments']);
require(['dws/sandbox']);
require(['dws/model-utils']);
require(['dws/controller']);
require(['dws/fileops-client']);
require(['dws/fileops-content']);


require(['dws/controller'],
    function (control) {

        $(document).ready(function () {
            control.initKO();
        });
    });

//////////////////////////////////////////////////////////////////////
/// globals go here
//////////////////////////////////////////////////////////////////////

/// This just deals with X,Y in a scrolling list
////////////////////////////////////////////////////////////////////////
$.fn.scrollToTop = function () {

    var $element = this;
    var $parent = $element.scrollParent() ? $element.scrollParent() : $(window);

    var viewport = {
        top: $parent.scrollTop(),
        bottom: $parent.height()
    };

    console.log('parent viewport: top ' + viewport.top + ', left ' + viewport.left + ', bottom ' + viewport.bottom + ', right ' + viewport.right);

    console.log('viewport parent bottom: ' + viewport.bottom);
    var position = $element.position();
    position.bottom = position.top + $element.height();
    position.right = position.left + $element.width();

    console.log('element position top ' + position.top + ', left ' + position.left + ', bottom ' + position.bottom + ', right ' + position.right);

    // above or below = !in-between
    if ((position.bottom < viewport.top) || (position.top > viewport.bottom)) {
        $parent.animate({ scrollTop: position.top }, 800);
    }
}

$.fn.isWithinParent = function () {
    var $element = this;
    var $parent = $element.scrollParent() ? $element.scrollParent() : $(window);

    var viewport = {
        top: $parent.scrollTop(),
        left: $parent.scrollLeft()
    };
    viewport.right = viewport.left + $parent.width();
    viewport.bottom = viewport.top + $parent.height();

    
    var bounds = $element.offset();
    bounds.right = bounds.left + $element.outerWidth();
    bounds.bottom = bounds.top + $element.outerHeight();

    
    //return ((viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

}
