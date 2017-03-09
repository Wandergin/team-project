import urllib2 
import json
import requests
from xml.etree import ElementTree

def locationMatch(s):

	locations = []
	
	#Query nominatim.openstreetmap.org	
	response = requests.get("http://nominatim.openstreetmap.org/search?format=xml&q=" + s)
	tree = ElementTree.fromstring(response.content)

	#For all possible locations save longitude and latitude
	for elem in tree:
		locations += [elem.attrib.get("lon"), elem.attrib.get("lat")]
	
	#Get user location
	userLoc = getUserLongLat()
	
	#For all possible locations compare long and lat to the user location
	for location in locations:
		longDiff = userLoc[0] 
	
	

def getUserLongLat():
	try:
		location = json.load(urllib2.urlopen("http://ipinfo.io/json"))
		return location['loc']
	except urllib2.HTTPError:
		return False


locationMatch("Glasgow")
#locationMatch("Edinburgh")
#locationMatch("Dundee")
#locationMatch("New York City")
#locationMatch("Mexico City")
#locationMatch("London")
#locationMatch("Libya")

