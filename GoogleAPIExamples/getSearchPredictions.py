import urllib2
import json

key = "AIzaSyC4eIT7iPFBZED56v9HQ7CLBzHrqa9b1uc"

print "Please enter the beginning of a location:"
str = raw_input()

data = json.load(urllib2.urlopen("https://maps.googleapis.com/maps/api/place/autocomplete/json?key="+key+"&types=(cities)&input="+str))

print
print "Here are the first 4 predictions, in order of likelyhood:"
if(len(data["predictions"]) == 0):
    print
    print "there were no results"
if(len(data["predictions"]) > 0):
    print
    print "location: "+data["predictions"][0]["description"]
    print "Autocomplete To: "+data["predictions"][0]["structured_formatting"]["main_text"]
if(len(data["predictions"]) > 1):
    print
    print "location: "+data["predictions"][1]["description"]
    print "Autocomplete To: "+data["predictions"][1]["structured_formatting"]["main_text"]
if(len(data["predictions"]) > 2):
    print
    print "location: "+data["predictions"][2]["description"]
    print "Autocomplete To: "+data["predictions"][2]["structured_formatting"]["main_text"]
if(len(data["predictions"]) > 3):
    print
    print "location: "+data["predictions"][3]["description"]
    print"Autocomplete To: "+data["predictions"][3]["structured_formatting"]["main_text"]

print
print "Press enter to continue"
raw_input()