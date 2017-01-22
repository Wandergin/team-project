These are the two tests for the Google Places API. They are written in python2 currently, but can very easily be rewritten in basically any other language, because they solely use HTTP GET and JSON.

NB. In order to use the API, you must obtain a key. The key used in the examples is mine, and should be changed when used in the actual project.
Each key has a limited number of uses per day, which is more than enough for our testing purposes for now, but if resdiary uses our search bar they will probably need a paid key with more uses/day.
More info: https://developers.google.com/places/web-service/get-api-key

The two example files are explained below.


getSearchPredictions.py

This example takes an input string from the user and tries to match it to cities in the world. It does this with an HTTP GET request which returns a JSON file.
It's explained in detail here: https://developers.google.com/places/web-service/autocomplete
This can also be improved by limiting where the predictions can be located. This is done by providing a centre (lat,long) and radius which will limit the predictions. This may be useful for ResDiary because they will likely know which country the user is in (ie. resdiary.co.uk vs resdiary.ca etc)


getLatAndLong.py

This example uses the same method as above, but it instead takes the "place_id" of the first result and uses it to determine the lat/long.
It does this by using the "Place Details" part of the API. See https://developers.google.com/places/web-service/details for more info.