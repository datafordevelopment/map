(function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoibHhiYXJ0aCIsImEiOiJFVXdYcUlvIn0.bbaHTEWlnAwGgyVwJngMdQ';
    var mapIDs = {
        Streets: 'lxbarth.mo5k9cn2',
        Satellite: 'lxbarth.map-n8gsdqn4'
    };
    var layers = {};
    Object.keys(mapIDs).forEach(function(k) {
        layers[k] = L.mapbox.tileLayer(mapIDs[k]);
    });
    var search = (function() {
        var result = {};
        var elems = location.search.substr(1).split('&');
        for (var i = 0; i < elems.length; i++) {
            var kv = elems[i].split('=');
            if (kv.length = 2) {
                result[kv[0]] = kv[1];
            }
        }
        return result;
    })();
    var active = search['layer'] || 'Streets';

    var map = L.mapbox.map('map', null, {zoomControl: false})
        .setView([20, 0], 3)
        .addControl(L.mapbox.geocoderControl('mapbox.places', {
            autocomplete: true
        }))
        .addControl(L.control.zoom({position: 'topright'}))
        .addControl(L.mapbox.shareControl(mapIDs[active]))
        .addControl(L.control.scale());
    L.control.layers(layers).addTo(map);
    layers[active].addTo(map);
    L.hash(map);
    var lc = L.control.locate().addTo(map);
    !location.hash && lc.locate();
    map.on('baselayerchange', function(e) {
        var s = 'layer=' + e.name;
        if (history.replaceState) {
            history.replaceState(null, null, [location.origin, '/map/?', s, location.hash].join(''));
        } else {
            location.search = s;
        }
    });
})();
