import cuisineProbability
import dateProbability
import dateMatch
import timeProbability
import timeMatch
import partyProbability
import partyMatch
import operator
import Tokens

tokenDict = {}

def mainParser(s):
	s = formatString(s)

	cuisineTokens = getCuisine(s)
	dateTokens = getDate(s)
	peopleTokens = getPeople(s)
	timeTokens = getTime(s)
	print s
	print ("cuisines " + str(cuisineTokens))
	print ("date " + str(dateTokens))
	print ("people " + str(peopleTokens))
	print ("time " + str(timeTokens))


	i = 100
	tokenType = 0
	skipped = False
	while i > 0:

		if len(dateTokens) > 0 and not tokenDict.has_key("date"):
			tempToken = dateTokens[len(dateTokens) -1]
			if tempToken[1] == i:
				if stillPresent(s,  tempToken[0]):
					setDate(tempToken[0])
					s = removeToken(s, tempToken[0])
				else:
					del dateTokens[-1]
					skipped  = True

		if len(timeTokens) > 0 and not tokenDict.has_key("time"):
			tempToken = timeTokens[len(timeTokens) -1]
			if tempToken[1] == i:
				if stillPresent(s,  tempToken[0]):
					setTime(tempToken[0])
					s =removeToken(s, tempToken[0])
				else:
					del timeTokens[-1]
					skipped  = True

		if len(peopleTokens) > 0 and not tokenDict.has_key("people"):
			tempToken = peopleTokens[len(peopleTokens) -1]
			if tempToken[1] == i:
				if stillPresent(s, tempToken[0]):
					setPeople(tempToken[0])
					s =removeToken(s, tempToken[0])
				else:
					del peopleTokens[-1]
					skipped  = True

		if skipped == False:
			i = i -25
		else:
			skipped = False

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

	return formatDict(tokenDict)

def formatDict(inDict):
	output = {  "cuisine": "",  "cuisineSuggestions": [""],  "covers": "",  "coverSuggestions": [],  "date": "",  "dateSuggestions": [],  "time": "",  "timeSuggestions": [],  "location": "",  "locationSuggestions": [],  "lat": "",  "long": "",  "distance": "5"}

	if 'cuisine' in inDict.keys():
		output['cuisine']  = inDict['cuisine']

	if 'date' in inDict.keys():
		output['date']  = inDict['date']
		output['dateSuggestions'] = dateSuggestions(output['date'])

	if 'time' in inDict.keys():
		output['time']  = inDict['time']
		output['timeSuggestions'] = timeSuggestions(output['time'])


	if 'people' in inDict.keys():
		output['covers']  = inDict['people']
		output['coverSuggestions'] = coverSuggestions(output['covers'])

	#TODO: remove Glasgow from location when location search is fixed
	output['location'] = "Glasgow"
	output['locationSuggestions'] = ["Queen Street Station", "West End"]


	suggestions = []
	for cuisine in Tokens.Cuisines_ethnic:
		if cuisine != output['cuisine'][0]:
			suggestions.append(cuisine)

	output['cuisineSuggestions'] = suggestions


	output['lat'] = '51'
	output['long'] = '40'
	#TODO: change distance?
	#TODO: add in lat and long from location search

	return output


def coverSuggestions(covers):
	return [covers-1, covers+1]

def timeSuggestions(time):
	from datetime import datetime, timedelta

	datetime_object = datetime.strptime(time, '%H:%M')

	d1 = datetime_object + timedelta(hours=1)
	d2 = datetime_object + timedelta(hours=-1)

	return [d1.strftime("%H:%M"), d2.strftime("%H:%M")]

def dateSuggestions(date):
	from datetime import datetime, timedelta

	datetime_object = datetime.strptime(date, '%d/%m/%y')

	d1 = datetime_object + timedelta(days=1)
	d2 = datetime_object + timedelta(days=-1)

	return [d1.strftime("%d/%m/%y"), d2.strftime("%d/%m/%y")]

def stillPresent(s, token):
	if token in s:
		return True
	return False

def removeToken(s, token):
	s = s.replace(token, "")
	return s


def getCuisine(s):
	#Runs cuisineProbability to get all possible cusine tokens
	cuisine = cuisineProbability.cuisineProbability(s)

	#Return cuisines
	return cuisine

def setCuisine(cuisines):
	tokenDict.update({"cuisine": cuisines})

def getDate(s):
	#Runs dateProbability to get all possible date tokens, and sort by most likely
	date = dateProbability.dateProbability(s)
	date = sorted(date.items(), key=operator.itemgetter(1))

	#Return date value
	return date

def setDate(date):
	date = dateMatch.dateMatch(date)
	tokenDict.update({"date":date})


def getPeople(s):
	#Runs partyProbabilty to get all possible people tokens, and sort by most likely
	people = partyProbability.partyProbability(s)
	people = sorted(people.items(), key=operator.itemgetter(1))

	#Return people
	return people

def setPeople(people):
	people = partyMatch.partyMatch(people)
	tokenDict.update({"people": people})


def getTime(s):
	#Run timeProbability to get all possible time tokens, and sort by most likely
	times = timeProbability.timeProbability(s)
	times = sorted(times.items(), key=operator.itemgetter(1))

	#Return time
	return times

def setTime(time):
	time = timeMatch.timeMatch(time)
	tokenDict.update({"time":time})


def formatString(s):
	s = s.lower()
	s = s.strip()
	return s



print mainParser("6pm Tonight near Kilwinning for indian for 6")
