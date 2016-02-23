getData();

var response; 

var events;

var mapped;

var map;

var infowindow;

var markers = [];

function initMap() {
    var mapOptions = {
        center: { lat: 41.398632, lng: 2.167305 }, 
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    infowindow = new google.maps.InfoWindow();
}

window.parseResponse = function (data) {
	response = data;

    //array of events
    events = data.resultsPage.results.event;

    mapped = events.map(function(event) {
        var mappedEvent = {};
        mappedEvent.location = {};
        mappedEvent.location.lat = event.location.lat;
        mappedEvent.location.lng = event.location.lng;
        mappedEvent.title = event.displayName;

        return mappedEvent;
    });


    setMarkers(); 

    function setMarkers() {
        for (var i = 0; i < mapped.length; i++){
            var event = mapped[i];
            var marker = new google.maps.Marker({
                position: event.location,
                map: map,
                title: event.title,
                info: event.title
            });

            //infowindows
            marker.addListener('click', function() {
                infowindow.setContent(this.info);
                infowindow.open(map, this); 
            })

            //push marker in the markers array
            markers.push(marker); 
        }
    }

}

//create script to get data and append it to body
function getData() {
	var url = "http://api.songkick.com/api/3.0/events.json?apikey=*******YOUR KEY*****&&location=sk:28714&jsoncallback=parseResponse";
	var scriptEl = window.document.createElement('script');
	scriptEl.setAttribute('src', url);
	window.document.body.appendChild(scriptEl);
}

