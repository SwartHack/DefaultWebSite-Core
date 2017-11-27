//////////////////////////////////////////////////////////////////////
/// actions module
//////////////////////////////////////////////////////////////////////
define('dws/actions', ['dws/controller'],
function (Control) {
    
    $(document).ready(function () {

        
        /////////////////////////////
        /// click events
        ////////////////////////////
        $('.dws-note').on('click',  function (e) {
            e.preventDefault();
            var $rundown = $(this);
            $('.dws-note').removeClass("selected");
            $rundown.addClass("selected");

            Control.sendMessage($rundown);
        });

        $('.nav-link').on('click', function (e) {
            e.preventDefault();
            var $item = $(this);
            Control.sendMessageDefer($item);
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
            placement: 'bottom',
            delay: { "show": 200, "hide": 100 }

        }

        $('#notebook-info').popover(options);
        
        //$('#rundown-info').on('click', function (e) {
        //    $(this).popover('toggle');
        //})

       

        /////////////////////////////
        /// Sandbox events
        ////////////////////////////


        $(document).on('click', '.nav-item', function (e) {
            e.preventDefault();
            var $item = $(e.target);
            $('.nav-item').removeClass('active');
            $item.closest('.nav-item').addClass('active');
            Control.sendMessage($item);
        });

        $(document).on('click', 'a.sandbox-toggle-text', function (e) {
            e.preventDefault();
            var $link = $(e.target);
            var $text = $link.parent().siblings('.card-text.expand');

            if ($text.length == 1) {
                $text.removeClass('expand');
                $link.text('More...');
            }
            else {

                $('.sandbox-wrapper').find('.sandbox-item').children('.card-text.expand').removeClass('expand');
                $('.sandbox-wrapper').find('.sandbox-toggle-text').text('More...');
                $link.parent().siblings('.card-text').addClass('expand');
                $link.text('Less...');
            }
        });

        /////////////////////////////
        /// File Ops stuff
        ////////////////////////////
       
     

        $('div#footer-scroll').endlessScroll({ width: '100%', height: '20px', steps: -2, speed: 30, mousestop: true });

    });

    return {
     
    };
});
