define('dws/actions', ['dws/controller'],
function (Control) {

    function showContentArea(selector)
    {
        if (!$(selector).is(':visible')) {
            hideAllContent();
            $(selector).show(); // beware that using an animated show (fadeIn, etc) may conflict with the visibility check
        }
    }

    function hideAllContent()
    {
        $('.content-area').hide();
    }

    $(document).ready(function () {

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

        $('#rundown').on('click',  function (e) {
            e.preventDefault();
            var $rundown = $(this);
            $('li.rundown').removeClass("selected");
            $rundown.addClass("selected");

            var settings = {
                url: "/Home/GetRundown?viewname=" + $rundown.attr('data-target-view'),
                cache: false,
                dataType: 'html'
            }
            Control.sendMessage(settings, '#target-area');
        });

        $(document).on('click', '.nav-link', function (e) {
            e.preventDefault();
            var url = "/Home/GetView?viewname=" + $link.attr('data-target-view');

            var deferred = new $.Deferred();
            deferred.done($("#target-area").html(data))
            .fail(function (error) {
                if (error !== 'aborted') {
                    alert('Error processing request');
                }
            }).always(function () {
               
            });
            Dispatch.ajaxRequestDefer(url, false, 'html', deferred);
        });

        $(document).on('click', '#btn-blog', function (e) {
            e.preventDefault();
            $('#blog-text').toggleClass('hidden');
            $('#blog-content').toggleClass('hidden');
        });


        $('input:checkbox').change(function () {

        })

        $('div#footer-scroll').endlessScroll({ width: '100%', height: '20px', steps: -2, speed: 40, mousestop: true });

    });

    return {
        showContentArea: showContentArea,
        hideAllContent: hideAllContent

    };

});
