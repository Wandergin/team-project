import cuisineProbability
import dateProbability
import dateMatch
import locationProbability
import locationMatch
import timeProbability
import timeMatch
import partyProbability
import partyMatch
import operator
import Tokens

#Dictionary to hold final tokens
tokenDict = {}

def mainParser(s, userLocation):
	#Format String
	s = formatString(s)

	#Get different tokens
	cuisineTokens = getCuisine(s)
	dateTokens = getDate(s)
	peopleTokens = getPeople(s)
	timeTokens = getTime(s)
	
	#Start with high probability
	i = 100
	skipped = False

	#While probability is greater than 0
	while i > 0:

		#If probability is high enough and token hasn't been selected already, select people token
		if len(peopleTokens) > 0 and not tokenDict.has_key("people"):
			tempToken = peopleTokens[len(peopleTokens) - 1]
			if tempToken[1] >= i:
				if stillPresent(s, tempToken[0]):
					setPeople(tempToken[0])
					s = removeToken(s, tempToken[0])
				else:
					del peopleTokens[-1]
					skipped  = True

		#If probability is high enough and token hasn't been selected already, select date token	
		if len(dateTokens) > 0 and not tokenDict.has_key("date"):
			tempToken = dateTokens[len(dateTokens) - 1]
			if tempToken[1] == i:
				if stillPresent(s,  tempToken[0]):
					setDate(tempToken[0])
					s = removeToken(s, tempToken[0])
				else:
					del dateTokens[-1]
					skipped  = True

		#If probability is high enough and token hasn't been selected already, select time token
		if len(timeTokens) > 0 and not tokenDict.has_key("time"):
			tempToken = timeTokens[len(timeTokens) - 1]
			if tempToken[1] == i:
				if stillPresent(s,  tempToken[0]):
					setTime(tempToken[0])
					s = removeToken(s, tempToken[0])
				else:
					del timeTokens[-1]
					skipped  = True

		
		#If a token type was skipped (highest token not present in string) keep probability the same, else make lower
		if skipped == False:
			i = i -25
		else:
			skipped = False

	#Get possible location tokens
	locationTokens = getLocation(s, userLocation)

	#If location token, select location token and remove from string
	if len(locationTokens) > 0:
		tempToken = locationTokens[0]
		setLocation(tempToken[0], userLocation)
		s = removeToken(s, tempToken[0])
	
	#For all possible cuisine tokens, select as cuisine token if still present  	 
	cuisines = []
	i = 0
	while i < len(cuisineTokens):
		tempToken = cuisineTokens[i]
		if stillPresent(s, tempToken):
			s = removeToken(s, tempToken)
			cuisines += [tempToken]
		i = i + 1

	if cuisines != []:
		setCuisine(cuisines)

	#If not location tokens try each remaining word
	if len(locationTokens) == 0:
		for word in s.split():
			tempLocation = locationMatch.locationMatch(word, userLocation)
			if tempLocation[0] < 2000:
				setLocation(tempLocation[1], userLocation)
				s = removeToken(s, tempLocation[1])

	#Return tokens 
	return tokenDict

#Checks if string is still present in query
def stillPresent(s, token):
	if token in s:
		return True
	return False

#Removes tokens from the query
def removeToken(s, token):
	s = s.replace(token, "")
	s = s.strip()
	return s
		
#Gets cuisine tokens
def getCuisine(s):
	cuisine = cuisineProbability.cuisineProbability(s)
	return cuisine

#Sets cuisine tokens
def setCuisine(cuisines):
	tokenDict.update({"cuisine": cuisines})

#Gets date tokens
def getDate(s):
	date = dateProbability.dateProbability(s)
	date = sorted(date.items(), key=operator.itemgetter(1))
	return date

#Sets date tokens
def setDate(date):
	date = dateMatch.dateMatch(date)
	tokenDict.update({"date":date})

#Gets location tokens
def getLocation(s, userLocation):
	location = locationProbability.locationProbability(s, userLocation)
	location = sorted(location.items(), key=operator.itemgetter(1))	
	return location

#Sets location tokens
def setLocation(location, userLocation):
	location = locationMatch.locationMatch(location, userLocation)
	tokenDict.update({"location": location[2]})

#Gets people tokens
def getPeople(s):
	people = partyProbability.partyProbability(s)
	people = sorted(people.items(), key=operator.itemgetter(1))
	return people

#Sets people tokens
def setPeople(people):
	people = partyMatch.partyMatch(people)
	tokenDict.update({"people": people})

#Gets time tokens
def getTime(s):
	times = timeProbability.timeProbability(s)
	times = sorted(times.items(), key=operator.itemgetter(1))
	return times

#Sets time tokens
def setTime(time):
	time = timeMatch.timeMatch(time)
	tokenDict.update({"time":time})
	
#Formats the query
def formatString(s):
	s = s.lower()
	s = s.strip()
	return s