// <<<<<<< HEAD
$(document).ready(function() {
	
    $(".button-collapse").sideNav();
    //$('.modal').modal();
    $('#modal1').modal('open');

});

var zillowURL = "https://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1fpm5qkz2tn_aui2x&state=wa&city=seattle&childtype=neighborhood";

$.ajax({
   url: zillowURL,
   method: "GET"
}).done(function(response) {
   console.log(response);
   for (var key in response) {
    var levelOne = response[key];
    console.log(levelOne);
    for (var property in levelOne) {
        var values = levelOne[property];
        console.log(values); //object object
        console.log(values.request);
        // for (var key in values) {
        //     var content = values[key];
        //     console.log(content);
        // }
    }
    
    } 
   // console.log(xmlToJson(response.Object));
   // console.log(xmlToJson(response[1]));
});

//=====================================================

// for (var key in trivia) {

//     var levelOne = trivia[key];
//     console.log("This is levelOne " + levelOne); //object object
  
//   var levelTwo = levelOne.question;
//   console.log("This is levelTwo " + levelTwo); //One of these a day keeps the doctor away;   Two plus Two is...
//   console.log("This is the first question " + levelTwo[0]);

  
//   var levelTwoQues = levelOne.answerA;
//   console.log("This is levelTwoQues " + levelTwoQues); //apple true;   ten, false; 
  
//   var levelTwoQuesBool = levelTwoQues[1];
//   console.log("This is levelTwoQuesBool " + levelTwoQuesBool);// false  true

//   for (var property in levelOne) {
//     var values = levelOne[property];
//     console.log("This is levelOne[property] " + levelOne[property]); //all property values
//     if (Array.isArray(values)) {
//       console.log("this is an array " + values);
//       console.log(values[0]);
//       var checkAnswer = values[1];
//       if (checkAnswer = true) {
//         console.log(property);
//       }
//     }
//   }
// }
















//================================================

// =======
// >>>>>>> 902045d56a13265c52a39e3c7fe9aca208957734
function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.926555,
            lng: -101.080318
        },
        zoom: 4
    });

    var geocoder = new google.maps.Geocoder();

    $("#currentLocationBtn").on("click", function(event) {
        event.preventDefault();
        console.log("heLLO");

        var infoWindow = new google.maps.InfoWindow({
            map: map,
        });

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {

                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);

                console.log(pos);
                map.setZoom(12);
                map.setCenter(pos);

                var reverseGeoURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.lat + "," + pos.lng + "&key=AIzaSyARhPeu596nXJrWQNKL-YoIXwkV0MbhCW0";

                $.ajax({
                    url: reverseGeoURL,
                    method: "GET"
                }).done(function(response) {
                    console.log(response);
                    console.log(response.results[0].address_components[7].short_name);
                    var currZip = response.results[0].address_components[7].short_name;
                    infoWindow.setContent("Current Zip: " + currZip);
                })

            }, function() {

                handleLocationError(true, infoWindow, map.getCenter());

            });

        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());

        }
        locationClicked = true;
        localStorage.setItem("locationClicked", locationClicked);

    });

    $("#searchBtn").on("click", function() {
        event.preventDefault();


        geocodeAddress(geocoder, map);
        $("#zipcode").val("");

    })

}

function geocodeAddress(geocoder, resultsMap) {

    var zip = $("#zipcode").val();

    geocoder.geocode({
        'address': zip
    }, function(results, status) {

        if (status === google.maps.GeocoderStatus.OK) {

            var infoWindow = new google.maps.InfoWindow({
                map: resultsMap,
                position: results[0].geometry.location
            });

            infoWindow.setContent(zip);
            resultsMap.setCenter(results[0].geometry.location);
            resultsMap.setZoom(12);

        } else {

            alert('Geocode was not successful for the following reason: ' + status);

        }

    });

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {

    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

$(document).ready(function() {

    if(localStorage.getItem("squilloName") === null || localStorage.getItem("locationClicked") === false){
        $('.modal').modal();
        $('#modal1').modal('open');
        console.log("NO NAME");
    }else{
        $("#hi").html("Howdy, " + localStorage.getItem("squilloName") + "!");
    }
    
    var locationClicked = false;
    $(".button-collapse").sideNav();

    $("#enterButton").on("click", function() {
        var username = $("#name").val();
        console.log(username);
        if (username !== "" && username !== null) {
            localStorage.setItem("squilloName", username);
        $("#hi").html("Howdy, " + localStorage.getItem("squilloName") + "!");

            // localStorage.setItem("locationClicked", locationClicked);
        }

    })

});


