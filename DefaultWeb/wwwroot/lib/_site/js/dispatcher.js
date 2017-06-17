define('dispatch', function () {


    $(function () {

        $(document).on('click', 'div.contents-panel', function (e) {
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

        $(document).on('click', '.dws-nav-link', function (e) {
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


    });




});