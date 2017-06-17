define('actions', function () {

    $(function () {
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
    });

});