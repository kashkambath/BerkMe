$("#map").change(function() {
  initMap();
});
function initMap() {
  var uluru = {lat: 37.8716, lng: -122.2727};
  var map = new google.maps.Map(document.getElementById('map'), {
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
  changeMap();
});

function changeMap() {

}
