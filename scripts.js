// Use the endpoint at https://pelp-api-wdi.herokuapp.com/markers to get all markers stored in a database. The database currently holds zero markers. Markers store information related to a business, using yelp data and its own data. 
// Create a user interface that searches the yelp API at https://pelp-api-wdi.herokuapp.com/search, using term and loca
// Create an interface that allows a user to click a result and save it to the database, using information from the yelp result and additional information that the user adds (type of place).
// To create a marker in the database, send a request to the same endpoint used to get the markers from the database, but using a POST request. The data that needs to be passed to a Marker are:
// Name refers to the business’ name, marker_type refers to the type of establishment it is (cafe, lunch, pizza, bagels, etc.)
// Using the Google Maps API, show a map on the page that has a map marker for every Marker in the database. If a new Marker is added to the database, a new map marker should appear on the map.
// If a new Marker is added to the database from another user’s browser, the map should automatically update on any other user’s browser. 
// Store the Markers returned from the database in Marker objects
// Each marker type should have an icon associated with it in place of the default google maps marker. Markers with type coffee should have a coffee icon, pizza should have a pizza icon. 


var search = document.getElementsByClassName("search")[0];
var results = document.getElementsByClassName("results")[0];
var markersObject;
var populateMarkers = document.getElementsByClassName("populateMarkers")[0];
var map;



search.addEventListener("click", function(){
	var food = document.getElementsByClassName("food")[0].value;
	var location = document.getElementsByClassName("location")[0].value;
	searchYelp(food, location);
})
populateMarkers.addEventListener("click", function(){
	getFromDatabase();
})



function searchYelp(searchText, searchLocation){
    $.ajax({
        url: "https://yelp-search.herokuapp.com/search",
        method: "GET",
        data: {
            term: searchText,
            location: searchLocation,
            radius: 1000,
            sort_by: "rating"

        },
        success: function(responseObj){
            listResults(responseObj);
        }

    })
}

function listResults(responseObj){
	results.innerHTML = "";
	var i = 0;
	responseObj.businesses.forEach(function(business){
		var j = i;
		results.innerHTML += "<div class='business business" + i + "'><p class='bizName'>" + business.name + "</p><p class='bizAddress'>" + business.location.address[0] + "</p></div>";
		setTimeout(function(){
			var businessDiv = document.getElementsByClassName("business" + j)[0];
			addButtons(businessDiv, business)
		}, 1);
			i += 1;
	});
};

function addButtons(businessDiv, business){
	businessDiv.addEventListener("click", function(){
			addToDatabase(business);
	});
}

function addToDatabase(business){
    $.ajax({
        url: "https://pelp-api-wdi.herokuapp.com/markers",
        method: "POST",
        data: {marker: { 
        	name: business.name,
        	address: business.location.address[0],
        	rating: business.rating,
        	img_url: business.img_url,
        	latitude: business.location.coordinate.latitude,
        	longitude: business.location.coordinate.longitude,
        	yelp_id: business.id,
        	marker_type: business.categories[0][0]
        	}
        },
        success: function(response){
        }
    })
}

function getFromDatabase(){
	    $.ajax({
        url: "https://pelp-api-wdi.herokuapp.com/markers",
        method: "GET",
        data: {
        },
        success: function(response){
            markersObject = response;
            addMarkers(response);
        }
    })
}

function addMarkers(markersObj){
	markersObj.markers.forEach(function(business){
		var bizCoordinates = {
			lat: business.latitude,
			lng: business.longitude
		}
		var marker = new google.maps.Marker({
			position: bizCoordinates,
			map: map
		})
	})
}

function initMap(){
	var philly = {lat: 39.9691826, lng: -75.1338785};

	map = new google.maps.Map(document.getElementsByClassName('map')[0], {
		zoom: 12,
		center: philly
	});
}

