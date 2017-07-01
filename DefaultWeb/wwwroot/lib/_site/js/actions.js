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
            e.preventDefault();
            $('#target-area').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-cv').hasClass('show')) {
                $('#doc-cv').removeClass('show');
            }
        });

        $(document).on("hide.bs.collapse", "#doc-resume", function (e) {
            $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
        });

        $(document).on("hide.shown.bs.collapse", "#doc-cv", function (e) {
            e.preventDefault();
            $('#target-area').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-cv"] button h4 i').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-resume').hasClass('show')) {
                $('#doc-resume').removeClass('show');
            }
        });

        $(document).on("bs.collapse", "#doc-cv", function (e) {
            $('[data-target="#doc-cv"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
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

        $('.nav-link').on('click', function (e) {
            e.preventDefault();
            var settings = {
                url: "/Home/GetView?viewname=" + $(this).attr('data-target-view'),
                cache: false,
                dataType: 'html'
            }

            
            Control.sendMessageDefer(settings, '#target-area');
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
