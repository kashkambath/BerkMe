var map;

var filter;
var markers = [];
var last_marker;

function initMap() {
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
  markers.push(marker);
  var geocoder = new google.maps.Geocoder();
  last_marker = marker;

  document.getElementById('searchbtn').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}



function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      markers[0].setMap(null);
      markers = []
      markers.push(marker);
      console.log("Marker 2");
      last_marker = marker;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function changeFilter(value) {
  document.getElementById('filter').textContent = value;
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 1; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

$(function() {
    $('#btnFilter').click(function() {
        $.ajax({
            url: '/dataRequest',
            data: {'lat': last_marker.getPosition().lat(), 'lon': last_marker.getPosition().lng(), 'filter': 'Restaurants'},
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});


// $("#map").change(function() {
//   initMap();
// });
// //var geocoder;
// var map;
// function initMap() {
//   //geocoder = new google.maps.Geocoder();
//   var uluru = {lat: 37.8716, lng: -122.2727};
//   map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 14,
//     center: uluru,
//     mapTypeId: 'roadmap'
//   });
//   var marker = new google.maps.Marker({
//     position: uluru,
//     map: map
//   });
// }
//
// // $("#searchbtn").click(function() {
// //   console.log("Hi");
// //   codeAddress();
// // });
//
// // function codeAddress() {
// // var addressInput = document.getElementById('address').value;
// // $.ajax({
// //     url : 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCmlmB_d0ILG7qO3bZ9e-isQGR25gvWBBM',
// //     type : 'GET',
// //     data : {
// //         
// //     },
// //     dataType:'json',
// //     success : function(data) {              
// //         console.log('Data: '+data);
// //     },
// //     error : function(request,error)
// //     {
// //         console.log("Request: "+JSON.stringify(request));
// //     }
// // });
// // // var geocoder = new google.maps.Geocoder();
// // //
// // // geocoder.geocode({address: addressInput}, function(results, status) {
// // //   console.log(addressInput);
// // //   if (status == google.maps.GeocoderStatus.OK) {
// // //     map.setCenter(results[0].geometry.location);
// // //     var marker = new google.maps.Marker({
// // //         map: map,
// // //         position: results[0].geometry.location
// // //     });
// // //   } else {
// // //     alert("Geocode was not successful for the following reason: " + status);
// // //   }
// // // });
// // }
//
// // function codeAddress() {
// //     var address = document.getElementById('address').value;
// //     console.log(address);
// //     geocoder.geocode( {'address': address}, function(results, status) {
// //       if (status == 'OK') {
// //         map.setCenter(results[0].geometry.location);
// //         var marker = new google.maps.Marker({
// //             map: map,
// //             position: results[0].geometry.location
// //         });
// //       } else {
// //         alert('Geocode was not successful for the following reason: ' + status);
// //       }
// //     });
// //   }
//
// // function changeMap() {
// //
// // }
