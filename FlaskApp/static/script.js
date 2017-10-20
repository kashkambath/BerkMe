var map;

var filter;
var markers = [];
var last_marker;
var markerDict = {};
var geocoder;

function initMap() {
  var uluru = {lat: 37.8716, lng: -122.2727};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: uluru,
    mapTypeId: 'roadmap'
  });
  var marker = new google.maps.Marker({
      position: uluru,
      map: map
  });
  markers.push(marker);
  geocoder = new google.maps.Geocoder();
  last_marker = marker;

  document.getElementById('searchbtn').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function removeFilter() {
  setMapOnAll(null);
  document.getElementById('filter').textContent = 'None';
  //initMap();
  geocodeAddress(geocoder, map);
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  if (address) {
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        setMapOnAll(null);
        markers[0].setMap(null);
        markers = [];
        markers.push(marker);
        last_marker = marker;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}


function changeFilter(value) {
  setMapOnAll(null);
  document.getElementById('filter').textContent = value;
  $(function() {
        $.ajax({
            url: '/dataRequest',
            data: {'lat': last_marker.getPosition().lat(), 'lon': last_marker.getPosition().lng(), 'filter': document.getElementById('filter').textContent},
            type: 'POST',
            success: function(response) {
                console.log('response: ' + response);
                var responseData = JSON.parse(response);
                for(var i = 0; i < responseData['DBA'].length; i++) {
                  var marker = new google.maps.Marker({
                      position: {lat: responseData['Lat'][i], lng: responseData['Lon'][i]},
                    //  label: responseData['DBA'][i],
                      map: map
                  });
                  marker.set("id", i);
                  console.log('marker.get of id: ' + marker.get("id"));
                  console.log('responseData[DBA][i]: ' + responseData['DBA'][i]);
                  var infoString = '<div><strong>' + responseData['DBA'][i] + '</strong>' + '</div>'
                  markerDict[i] = infoString;
                  console.log('infoString: ' + infoString);
                  // console.log('markerDict[' + i + ']: ' + markerDict[i]);
                  var infowindow = new google.maps.InfoWindow();
                  // infowindow.setContent(infoString);
                  // markerDict[i] = infowindow;
                  // console.log('markerDict[' + i + '] content: ' + infowindow.content);
                  setMarkerInfo(marker, infowindow, infoString);
                  // infoWindows.push(infowindow);
                  // google.maps.event.addListener(marker, 'click', function() { //when user clicks on the marker
                  //   console.log('marker.get of id after click: ' + marker.get("id"));
                  //   // infowindow.setContent(markerDict[marker.get("id")]);
                  //   infowindow.open(map, this);
                  //   console.log('marker: ' + marker);
                  // });
                  markers.push(marker);
                  console.log('marker.get of id after pushing: ' + marker.get("id"));
                }
                map.setZoom(18);
                setMarkerInfo();
                console.log(markerDict);
            },
            error: function(error) {
                console.log(error);
            }
        });
  });
}

function setMarkerInfo(m, infowindow, content) {
    m.addListener('click', function() {
        infowindow.setContent(content);
        infowindow.open(map, this);
    });
    m.addListener('mouseover', function() {
        infowindow.setContent(content);
        infowindow.open(map, this);
    });
    m.addListener('mouseout', function() {
        infowindow.close();
    });
}
// function setMarkerInfo() {
//   for (x=0;x<markers.length;x++) {
//     var m = markers[x];
//     m.addListener('click', function() {
//       console.log('Clicked!');
//       var i = m.get("id");
//       console.log(i);
//       if (i) {
//         var info = markerDict[i];
//         console.log(info.content);
//         info.open(map, this);
//       }
//     });
//   }
// }

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  while (markers.length > 1) {
    markers[markers.length - 1].setMap(map);
    markers.pop();
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}




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
