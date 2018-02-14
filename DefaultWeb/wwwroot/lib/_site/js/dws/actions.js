//////////////////////////////////////////////////////////////////////
/// actions module
//////////////////////////////////////////////////////////////////////
define(['dws/controller'],
function (Control) {
    
    $(document).ready(function () {

         /////////////////////////////
        /// main navbar toolbar
        ////////////////////////////
        $('.nav-link').on('click', function (e) {
            e.preventDefault();
            var $item = $(this);
            Control.sendMessageDefer($item);

            //better way/place to do this?
            // TODO - bind class with model!!!
            if ($item.attr('data-target-controller') == 'Home') {
                if ($('#col-main').hasClass('full-size')) {
                    $('#col-util').show();
                    $('#col-main').removeClass('full-size');
                }
            }
            
            if ( $('#container-primary').hasClass('container-fluid')) {
                $('#container-primary').removeClass('container-fluid');
                $('#container-primary').addClass('container');
            }
        });

        /////////////////////////////
        /// SandPit toolbar
        ////////////////////////////
        $(document).on('click', '.nav-item', function (e) {
            e.preventDefault();
            var $item = $(e.target);
            $('.nav-item').removeClass('active');
            $item.closest('.nav-item').addClass('active');
            Control.sendMessage($item);
        });

        /////////////////////////////
        /// NotePad click events
        ////////////////////////////
        $('.dws-note').on('click', function (e) {
            e.preventDefault();
            var $rundown = $(this);
            $('.dws-note').removeClass("selected");
            $rundown.addClass("selected");

            Control.sendMessage($rundown);
        });

        /////////////////////////////
        /// show/hide events
        /// TODO - optimize these events...
        ////////////////////////////
        $(document).on("shown.bs.collapse", "#doc-resume", function (e) {
            $('#contact').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-cv').is(':visible')) {
                $('#doc-cv').hide();
            }
            if ($('#doc-masters').is(':visible')) {
                $('#doc-masters').hide();
            }
        });

        $(document).on("hide.bs.collapse", "#doc-resume", function (e) {
            $('[data-target="#doc-resume"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
        });

        $(document).on('shown.bs.collapse', '#doc-cv', function (e) {
            $('#contact').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-cv"] h4 i').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-resume').is(':visible')) {
                $('#doc-resume').hide();
            }
            if ($('#doc-masters').is(':visible')) {
                $('#doc-masters').hide();
            }
        });

        $(document).on('hide.bs.collapse', '#doc-cv', function (e) {
            $('[data-target="#doc-cv"] h4 i').switchClass('fa-eye-slash', 'fa-eye');
        });

        $(document).on('shown.bs.collapse', '#doc-masters', function (e) {
            e.preventDefault();
            $('#contact').animate({ scrollTop: $(this).offset().top }, 800);
            $('[data-target="#doc-masters"] h4 i.fa.fa-eye').switchClass('fa-eye', 'fa-eye-slash');

            if ($('#doc-resume').is(':visible')) {
                $('#doc-resume').hide();
            }
            if ($('#doc-cv').is(':visible')) {
                $('#doc-cv').hide();
            }
        });

        $(document).on('hide.bs.collapse', '#doc-masters', function (e) {
            $('[data-target="#doc-masters"] h4 i.fa.fa-eye-slash').switchClass('fa-eye-slash', 'fa-eye');
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
        });

        $(document).on('shown.bs.modal', '#modal-action-template', function (e) {
            //e.preventDefault();
            // get modal 
            var $item = $(e.target);
            $item.find('input:visible').first().focus();
        });

        /////////////////////////////
        /// popover init
        ////////////////////////////
        var options = {
            trigger: 'hover',
            title: 'What is the Notepad',
            content: 'My non-authoritative notes and ramblings. In my words and IMHO...',
            footer: 'I am a Bootstrap popover...',
            placement: 'auto',
            delay: { "show": 200, "hide": 100 }
        }
        $('#notebook-info').popover(options);

        var options2 = {
            animation:true,
            trigger: 'click',
            placement: 'auto',
            html: true,
            container: '#dws-carousel',
            content: '<a id="carousel-control" data-state="1">Please turn off...</a>',
            delay: { "show": 200, "hide": 100 }
        }
        $('#carousel-info').popover(options2);

        $(document).on('click', '#carousel-control', function (e) {
            e.preventDefault();
            var $carousel = $('.dws-carousel');
            $carousel.attr('data-interval') ? $carousel.removeAttr('data-interval') : $carousel.attr('data-interval', '7500');
            $('#carousel-info').popover('hide');
            var popover = $('#carousel-info').data('bs.popover');
            popover.config.content = '<h4 class="text-center"></h4><p>Please turn on...</p>';
            
        });

       
        
        $('div#footer-scroll').endlessScroll({ width: '100%', height: '20px', steps: -2, speed: 30, mousestop: true });

    });

    return {
     
    };
});
