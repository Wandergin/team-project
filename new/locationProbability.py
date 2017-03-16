import locationMatch
import sys

def locationProbability(s, userLocation):
	returnDict= {}
	i = 0
	s = s.split(" ")

	#Try and find locations with words after "in" "near" "at" 
	while i < len(s):
		if s[i] in ["in", "near", "at"]:
			if len(s) -  i -1 >= 3  :
				j = 3
			else:
				j = len(s) -  i -1
			locationArray = []
			while j > 0:
				location =  locationMatch.locationMatch(s[i+1:i+j+1], userLocation)
				if location != None:
					locationArray += [location]
				j = j - 1

			#Find closest location
			minDistance = sys.maxsize
			minLocation = ""
			for location in locationArray:
				if location[0] < minDistance:
					minDistance = location[0]
					minLocation = location[1]
				
			#Add to return Dictionary
			returnDict.update({minLocation: minDistance})
		i = i+ 1

	return returnDict
		

		
			
			

				
	