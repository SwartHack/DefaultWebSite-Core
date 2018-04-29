define(['esri/Map', 'esri/views/MapView','esri/views/SceneView','dws/model','dws/arcgis.utils', 'dojo/domReady!'], 
function (Map, MapView, SceneView, viewModel, Utils) {

    ///////////////////////////
    //put late bind events here
    $(document).ready(function () {

        $('.map-default-toggle').on('click', function () {
            $('.map-default-toggle').removeClass('active');
            $(this).addClass('active');
            $('#map-main').empty();
            toggleDefaultView($(this).attr('id'));
        });

        $('#toggle-fullscreen').on('click', function () {
            $('#container-primary.container').toggleClass('full-screen');

            $(this).empty();
            $('#container-primary.container').hasClass('full-screen') ? $(this).append('<i class="fa fa-window-restore"></i>') : $(this).append('<i class="fa fa-window-maximize"></i>')
        });

        $('#map-base ul li').on('click', function () {
            var map = $(this).text();
            $('#map-base div.dropdown-toggle').text(map);

            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            viewModel.viewMap().basemap = $('#map-base div.dropdown-toggle').text().toLowerCase()
            //viewModel.mapView().map(viewModel.viewMap());
            //viewModel.sceneView().map(viewModel.viewMap());
            //loadDefaultViews();
        });

        $('#showCursor').on('click', function () {
            $('');
        });



        viewModel.viewMap( new Map({ basemap: $('#map-base div.dropdown-toggle').text().toLowerCase() }));

        loadDefaultViews()
        $('#map-view-main').css('display', 'flex');
        $('#map-view-main').show();
    });

    viewModel.viewMap.subscribe(function (map) {
        var test = map;

    });

    function loadDefaultViews() {
        $('#map-view-main').empty();
        var mapview = new MapView({
            container: "map-view-main",
            map: viewModel.viewMap()
        });
        viewModel.mapView(mapview);

        /////////////////////////////
        ///
        mapview.when(function () {

            var info = Utils.viewToInfo(mapview);
            viewModel.viewInfo(info);

        }, function (error) {
            console.log(error);

        });

        
        

        $('#scene-view-main').empty();
        var sceneview = new SceneView({
            container: "scene-view-main",     // Reference to the scene div created in step 5
            map: viewModel.viewMap(),                 // Reference to the map object created before the scene
            scale: 50000000,          // Sets the initial scale to 1:50,000,000
            center: [-101.17, 21.78]  // Sets the center point of view with lon/lat
        });
        viewModel.sceneView(sceneview);

    }

    function toggleDefaultView(type) {

        if (type == 'mapView') {

            if (!$('#map-view-main').is(':visible')) {
                $('#scene-view-main').hide();
                $('#map-view-main').css('display', 'flex');
                $('#map-view-main').show();
            }
        }
        else {
            if (!$('#scene-view-main').is(':visible')) {
                $('#map-view-main').hide();
                $('#scene-view-main').css('display', 'flex');
                $('#scene-view-main').show();
            }
        }
    }

    function mapChanged(map) {

    }

    return {
        toggleDefaultView: toggleDefaultView,
        loadDefaultViews: loadDefaultViews
    }

});
