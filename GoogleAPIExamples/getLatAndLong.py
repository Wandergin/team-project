import urllib2
import json

key = "AIzaSyC4eIT7iPFBZED56v9HQ7CLBzHrqa9b1uc"

print "Please enter a location:"
str = raw_input()

data1 = json.load(urllib2.urlopen("https://maps.googleapis.com/maps/api/place/autocomplete/json?key="+key+"&types=(cities)&input="+str))
place_id = data1["predictions"][0]["place_id"]
data2 = json.load(urllib2.urlopen("https://maps.googleapis.com/maps/api/place/details/json?key="+key+"&placeid="+place_id))

print "Lat:  "+repr(data2["result"]["geometry"]["location"]["lat"])
print "Long: "+repr(data2["result"]["geometry"]["location"]["lng"])

print
print "Press enter to continue"
raw_input()