/// Main controller for event declarations, etc.
define('controller', function () {
    
    $(function () {

        $(document).on('click', '#btn-blog', function (e) {
            e.preventDefault();
            $('#blog-text').toggleClass('hidden');
            $('#blog-content').toggleClass('hidden');
        });

    });

    $('input:checkbox').change(function () {

    })

    $('div#footer-scroll').endlessScroll({ width: '100%', height: '20px', steps: -2, speed: 40, mousestop: true });

    
});
