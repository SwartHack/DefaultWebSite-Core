// Write your Javascript code.
$(function () {

    $(document).on('click', 'div.contents-panel.rundown', function (e) {
        e.preventDefault();
        var $panel = $(this);
        var viewname = $panel.attr('data-target-view');

        $('div.contents-panel').removeClass("selected");
        $panel.addClass("selected");

        $.ajax({
            url: "/Home/GetRundown?viewname=" + viewname,
            cache: false,
            success: function (data) {
                $("#target-area").html(data)
            }
        })
    });

    $(document).on('click', '.nav-link', function (e) {
        e.preventDefault();
        var $panel = $(this);
        var viewname = $panel.attr('data-target-view');

        $.ajax({
            url: "/GetView?viewname=" + viewname,
            cache: false,
            success: function (data) {
                $("#target-area").html(data)
            }
        })
    });

    $(document).on('click', '#btn-blog', function (e) {
        e.preventDefault();
        $('#blog-text').toggleClass('hidden');
        $('#blog-content').toggleClass('hidden');
    });
});

$('input:checkbox').change(function () {

})

$('div#footer-scroll').endlessScroll({ width: '100%', height: '20px', steps: -2, speed: 40, mousestop: true });

$(document).on("shown.bs.collapse", "#doc-resume", function (e) {
    //$('#col-doc').scrollTop(this.offsetTop);
    $('#target-area').animate({ scrollTop: $(this).offset().top }, 800);
    if ($('#doc-cv').hasClass('in')) {
        $('#doc-cv').removeClass('in');
        $('[data-target="#doc-cv"]').toggleClass('collapsed');
    }

});

$(document).on("shown.bs.collapse", "#doc-cv", function (e) {
    //$('#col-doc').scrollTop(this.offsetTop);
    $('#target-area').animate({ scrollTop: $(this).offset().top }, 800);
    if ($('#doc-resume').hasClass('in')) {
        $('#doc-resume').removeClass('in');
        $('[data-target="#doc-resume"]').toggleClass('collapsed');
    }
});
