// Create an interface that allows a user to click a result and save it to the database, using information from the yelp result and additional information that the user adds (type of place).
// To create a marker in the database, send a request to the same endpoint used to get the markers from the database, but using a POST request. The data that needs to be passed to a Marker are:
// name, address, rating, img_url, latitude, longitude, yelp_id, marker_type
// Name refers to the business’ name, marker_type refers to the type of establishment it is (cafe, lunch, pizza, bagels, etc.)
// Using the Google Maps API, show a map on the page that has a map marker for every Marker in the database. If a new Marker is added to the database, a new map marker should appear on the map.
// If a new Marker is added to the database from another user’s browser, the map should automatically update on any other user’s browser. 
// Store the Markers returned from the database in Marker objects
// Each marker type should have an icon associated with it in place of the default google maps marker. Markers with type coffee should have a coffee icon, pizza should have a pizza icon. 


var search = document.getElementsByClassName("search")[0];
var results = document.getElementsByClassName("results")[0];

search.addEventListener("click", function(){
	var food = document.getElementsByClassName("food")[0].value;
	var location = document.getElementsByClassName("location")[0].value;
	searchYelp(food, location);
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
            console.log(responseObj);
            listResults(responseObj);
        }

    })
}

function listResults(responseObj){
	var i = 0;
	responseObj.businesses.forEach(function(business){
		results.innerHTML += "<div class='business business" + i + "'><p class='bizName'>" + business.name + "</p><p class='bizAddress'>" + business.location.address[0] + "</p></div>";
		i += 1;
	})
}

function searchMap(searchText, searchLocation){
    $.ajax({
        url: "https://pelp-api-wdi.herokuapp.com/markers",
        method: "GET",
        data: {
            term: searchText,
            location: searchLocation,
            radius: 1000,
            sort_by: "rating"

        },
        success: function(response){
            console.log(response);
        }

    })
}

