define(['esri/Map', 'esri/views/MapView', 'dojo/domReady!'], 
function (Map, MapView) {


    function init() {
        var map = new Map({
            basemap: "streets"
        });

        var view = new MapView({
            container: "map-main",
            map: map
        });

    }


    


    return {
        init: init
    }

});
