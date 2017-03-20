import urllib2
import json
import requests
from xml.etree import ElementTree
from geopy.distance import vincenty
import sys

def locationMatch(s, userLocation):

	if type(s) is not str:
		longstr = ""
		for string in s:
			longstr += string + " "
		s = longstr[:-1]
	locations = []

	#Query nominatim.openstreetmap.org
	response = requests.get("http://nominatim.openstreetmap.org/search?format=xml&q=" + s)
	tree = ElementTree.fromstring(response.content)

	#For all possible locations save longitude and latitude
	for elem in tree:
		locations += ["(" + str(elem.attrib.get("lat")) + ", " + str(elem.attrib.get("lon")) + ")"]

	#For all possible locations compare long and lat to the user location
	minDistance = sys.maxsize
	minLocation = ""
	for location in locations:
		distance =   vincenty(location, userLocation).kilometers
		if distance < minDistance:
			minLocation = location
			minDistance = distance

	if minLocation != "":
		return (minDistance, s,minLocation)
	else:
		return None
