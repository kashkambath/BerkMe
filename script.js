$("#map").change(function() {
  initMap();
});
var geocoder;
var map;
function initMap() {
  geocoder = new google.maps.Geocoder();
  var uluru = {lat: 37.8716, lng: -122.2727};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: uluru,
    mapTypeId: 'roadmap'
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

$("#searchbtn").click(function() {
  codeAddress();
});

function codeAddress() {
    var address = document.getElementById('address').value;
    console.log(address);
    geocoder.geocode( {'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

// function changeMap() {
//
// }
