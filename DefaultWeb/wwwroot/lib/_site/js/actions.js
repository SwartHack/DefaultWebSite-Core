//////////////////////////////////////////////////////////////////////
/// actions module
//////////////////////////////////////////////////////////////////////
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

        $(document).on('click','.sand-link', function (e) {
            e.preventDefault();
            var $item = $(e.target);
            $('.sand-link').removeClass('active');
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
        /// TODO - optimize these events...
        ////////////////////////////
        $(document).on("shown.bs.collapse", "#doc-resume", function (e) {
            $('#contact.card').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-cv').hasClass('show')) {
                $('#doc-cv').removeClass('show');
                $('[data-target="#doc-cv"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
            }
            if ($('#doc-masters').hasClass('show')) {
                $('#doc-masters').removeClass('show');
                $('[data-target="#doc-masters"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
            } 
        });

        $(document).on("hide.bs.collapse", "#doc-resume", function (e) {
            $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
        });

        $(document).on('shown.bs.collapse', '#doc-cv', function (e) {
            $('#contact.card').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-cv"] h4 i').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-resume').hasClass('show')) {
                $('#doc-resume').removeClass('show');
                $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
            }
            if ($('#doc-masters').hasClass('show')) {
                $('#doc-masters').removeClass('show');
                $('[data-target="#doc-masters"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
            } 
        });

        $(document).on('hide.bs.collapse','#doc-cv', function (e) {
            $('[data-target="#doc-cv"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
        });

        $(document).on('shown.bs.collapse', '#doc-masters', function (e) {
            e.preventDefault();
            $('#contact.card').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-masters"] h4 i').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-resume').hasClass('show')) {
                $('#doc-resume').removeClass('show');
                $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
            }
            if ($('#doc-cv').hasClass('show')) {
                $('#doc-cv').removeClass('show');
                $('[data-target="#doc-cv"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
            }
        });

        $(document).on('hide.bs.collapse', '#doc-masters', function (e) {
            $('[data-target="#doc-masters"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
        });

        //$('#modal-action-template').on('show.bs.modal', function (e) {
        //    e.preventDefault();
        //    // get event source
        //    var $item = $(e.relatedTarget());
        //    Control.sendMessage($item, '#target-modal');
        //})

        $(document).on('show.bs.modal', '#modal-action-template', function (e) {
            //e.preventDefault();
            // get event source
            var $item = $(e.relatedTarget);
            var $modal = $(this);
            $modal.find('.modal-title').text('Add New ' + $item.attr('data-target-id'));
            Control.sendMessage($item, '#target-modal');
        })

        $(document).on('shown.bs.modal', '#modal-action-template', function (e) {
            //e.preventDefault();
            // get modal 
            var $item = $(e.target);
            $item.find('input:visible').first().focus();
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
