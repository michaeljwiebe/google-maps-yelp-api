var search = document.getElementsByClassName("search")[0];
var results = document.getElementsByClassName("results")[0];
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

setInterval(function(){getFromDatabase()}, 1000);

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
		results.innerHTML += "<div class='business business" + i + "'><div class='biz-text'><p class='bizName'>" + business.name + "</p><p class='biz-address'>" + business.location.address[0] + "</p></div><div class='biz-img'";
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
            addMarkers(response);
            console.log(response);
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
	var philly = {lat: 39.96204, lng: -75.17222};

	map = new google.maps.Map(document.getElementsByClassName('map')[0], {
		zoom: 12,
		center: philly
	});
}

