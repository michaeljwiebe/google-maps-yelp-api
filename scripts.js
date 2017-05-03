// Use the endpoint at https://pelp-api-wdi.herokuapp.com/markers to get all markers stored in a database. The database currently holds zero markers. Markers store information related to a business, using yelp data and its own data. 
// Create a user interface that searches the yelp API at https://pelp-api-wdi.herokuapp.com/search, using term and location.
// Create an interface that allows a user to click a result and save it to the database, using information from the yelp result and additional information that the user adds (type of place).
// To create a marker in the database, send a request to the same endpoint used to get the markers from the database, but using a POST request. The data that needs to be passed to a Marker are:
// name, address, rating, img_url, latitude, longitude, yelp_id, marker_type
// Name refers to the business’ name, marker_type refers to the type of establishment it is (cafe, lunch, pizza, bagels, etc.)
// Using the Google Maps API, show a map on the page that has a map marker for every Marker in the database. If a new Marker is added to the database, a new map marker should appear on the map.
// If a new Marker is added to the database from another user’s browser, the map should automatically update on any other user’s browser. 
// Store the Markers returned from the database in Marker objects
// Each marker type should have an icon associated with it in place of the default google maps marker. Markers with type coffee should have a coffee icon, pizza should have a pizza icon. 
// Add Comment
