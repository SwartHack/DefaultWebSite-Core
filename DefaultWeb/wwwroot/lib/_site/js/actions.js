define('dws/actions', ['dws/controller'],
function (Control) {
    
    $(document).ready(function () {

        
        /////////////////////////////
        /// click events
        ////////////////////////////
        $('.rundown').on('click',  function (e) {
            e.preventDefault();
            var $rundown = $(this);
            $('.rundown').removeClass("selected");
            $rundown.addClass("selected");

            Control.sendMessage($rundown);
        });

        $('.nav-link').on('click', function (e) {
            e.preventDefault();
            var $item = $(this);
            Control.sendMessageDefer($item);
        });

        $(document).on('click', '#sand-link', function (e) {
            e.preventDefault();
            var $item = $(e.target);
            $('#sand-link').removeClass('active');
            $item.addClass('active');
            Control.sendMessageDefer($item);
        });

        $(document).on('click', '#btn-blog', function (e) {
            e.preventDefault();
            $('#blog-text').toggleClass('hidden');
            $('#blog-content').toggleClass('hidden');
        });


        /////////////////////////////
        /// show/hide events
        ////////////////////////////
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

        $(document).on('hide.shown.bs.collapse', '#doc-cv', function (e) {
            e.preventDefault();
            $('#target-area').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-cv"] button h4 i').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-resume').hasClass('show')) {
                $('#doc-resume').removeClass('show');
            }
        });

        $(document).on('bs.collapse','#doc-cv', function (e) {
            $('[data-target="#doc-cv"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
        });

        $('#source-modal').on('hidden.bs.modal', function (e) {
            // refresh after add, detect cancel
            var settings = {
                url: "/Sources/Main",
                cache: false
            }
            Control.sendMessage(settings, '#sandbox-area');
        })

        /////////////////////////////
        /// popover init
        ////////////////////////////

        var options = {
            trigger: 'click',
            title: 'What is a Run-down???',
            content: 'A Run-down is a casual non-authoritative white-paper. In my words and IMHO...',
            placement: 'bottom',
            delay: { "show": 200, "hide": 100 }

        }

        $('#rundown-info').popover(options);
        
        //$('#rundown-info').on('click', function (e) {
        //    $(this).popover('toggle');
        //})

        ////////////////////////////////
        // stupid re-size events..
        ///////////////////////////////
        //$(window).resize( function () {
        //    var $rd = $('#rundowns');
        //    var $colrd = $('#col-rundowns');
        //    var $hdrd = $('#rundowns-header')
        //    $rd.height( $colrd.height() - $hdrd.innerHeight() );
        //})

        //$(window).load(function () {
        //    var $rd = $('#rundowns');
        //    var $colrd = $('#col-rundowns');
        //    var $hdrd = $('#rundowns-header')
        //    $rd.height( $colrd.height() - $hdrd.innerHeight() );
        //})

        /////////////////////////////
        /// other events
        ////////////////////////////


     

        $('div#footer-scroll').endlessScroll({ width: '100%', height: '20px', steps: -2, speed: 40, mousestop: true });

    });

    return {
     
    };
});
