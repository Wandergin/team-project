import datetime
import fileinput
import string

f = open('test.txt', 'r')


#---------------------------------Matchable tokens---------------------------------#

#---Cusines
#simple list of strings of cuisines
Cuisines = ["African", "American", "Arabic", "Asian", "Cafe",
	    "Chineese", "European", "Greek", "Halal", "Indian", "Italian",
	    "Japanese", "Mexican", "Oriental", "Thai","Vegetarian"]


#---Time
#used to match exact times like 8am
TimeExact = ["oclock", "am", "pm","inhours"]
#used to estimate time roughly
TimeEstimate = [["morning", "breakfast", "brunch", "early"],
 	        ["noon", "afternoon", "lunch", "lunchtime"],
 		["evening", "dinner", "dinnertime"],
		["night", "late"]]
#maps estimated time to exact time
TimeEstimateMap = ["9am", "12pm", "6pm", "9pm"]



#---Dates
#used to map actual weekdays e.g "monday"
DateWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
#common days e.g "tomorrow"
DateCommons = ["Today", "Tomorrow"]
#special days e.g "mothers day"
DateSpecial = ["Mother's Day", "Valentine's Day"]
#prefixes to common/week days e.g. "next monday" or "5 weeks on friday"
DatePrefix = ["This", "Next", "WeekOn", "WeeksOn"]
#suffixes to specific dates e.g "13th of January"
DateSuffix = ["st", "nd", "rd", "th"]

#---------------------------------------------------------------------------------#



#Tries to match matchQuery with specified cuisines, returns the token if matches or None if no match
def match_cuisine(matchQuery):
	for cuisine in Cuisines:			
		if (matchQuery == cuisine.lower()):
			return matchQuery
	return None 


#Tries to match matchQuery with a specific time (e.g. 6pm) and with estimated times (e.g. noon), returns the token if matches or None if no match
def match_time(matchQuery):			
	if (has_number(matchQuery)):
		#If number try match with a specific time
		matchQuery = matchQuery.split()
		i = 0
		#Find number and delete
		if (len(matchQuery) == 1):
			if (is_number(matchQuery[0][:2])):
				number = matchQuery[0][:2]
				matchQuery[0] = matchQuery[0][2:]
			elif (is_number(matchQuery[0][:1])):
				number = matchQuery[0][:1]
				matchQuery[0] = matchQuery[0][1:]
			else:
				return None
		else:	
			for part in matchQuery:
				if is_number(part):
					number = part
					matchQuery.pop(i)
					break
				i += 1
		
		periodPart = ""
		for part in matchQuery:
			periodPart += part

		#Identify the number as a time token
		#if (len(matchQuery) < 2):
			#matchQuery = matchQuery[0][len(number):]
		#else:
				#matchQuery = matchQuery[1]
		
		for time in TimeExact:
			if (periodPart == time):
				period = time
				return (str(number) + period)
		return None
	else:				
		#If no number try match with estimate times		
		i = 0
		while (i < len(TimeEstimate)):
			for time in TimeEstimate[i]:		
				if (matchQuery == time):
					return TimeEstimateMap[i]
			i+=1
	return None

	

#Tries to match matchQuery with a date
def match_date(matchQuery):
	weekday = ""
	#Try match with common days
	for day in DateCommons:
		currentDay = day.translate(None, string.punctuation).replace(" ", "").lower()
		currentQuery = matchQuery.translate(None, string.punctuation).replace(" ", "").lower()
		if (currentQuery == currentDay):
			return (currentDay)
	#Try match with special days
	for day in DateSpecial:
		currentDay = day.translate(None, string.punctuation).replace(" ", "").lower()
		if (currentQuery == currentDay):
			return (currentDay)

	#Try match with actual week days
	weekday = ""
	tempstring = ""	
	for day in DateWeekDays:
		parts = matchQuery.split()
		i = 0
		#Try find weekday and remove
		for part in parts:
			if (part == day.lower()):
				weekday = day
				parts.pop(i)
				tempstring = ""
				for part in parts:
					tempstring += part
				if (tempstring.replace(" ", "") == ""):
					return (weekday)
				break
			
			i+=1


	#Try match with "today" or "tomorrow"
	if ( weekday == ""):
		for day in DateCommons:
			i = 0
			for part in parts:
				if (part == day.lower()):
					weekday = day
					parts.pop(i)
					tempstring = ""
					for part in parts:
						tempstring += part
				i +=1 
			
	#If a day is found
	if (weekday != ""):
		for date in DatePrefix:
			#Try to match the week, either "this" or "next"
			if (tempstring == date.lower()):
				return (date + weekday)
			#Or (x) weeks on (day)
			#Parse number and make sure the rest of string is "weekson"
			if (date == "WeeksOn" or date == "WeekOn"):	
				if (is_number(tempstring[:2]) and tempstring[2:] == date.lower()):
					number = tempstring[0][:2]
					return (number + date + weekday)
				elif (is_number(tempstring[:1]) and tempstring[1:] == date.lower()):
					number = tempstring[:1]
					return (number + date + weekday)
			  
	#Now look for any combo of 01/02/2017, 01/02/17, 01/02, 1/2 etc...
	#Also any digit + suffix e.g "4th, 5th" --- wrong suffixes like "1th" and "9st" should work for simplicity 
	return None

#Tries to match matchQuery with a location
def match_location(matchQuery):
	return None

#Returns true if string is a number
def is_number(string):
	return all(char.isdigit() for char in string)

#Returns true if sting contains a number
def has_number(string):
	return any(char.isdigit() for char in string)	



#Boolean to represent which tokens have been matched
mtd_cuisine = mtd_date = mtd_party = mtd_time = mtd_location = mtd_price = False

#Holds all tokens
Tokens = []

#Hold exact string query
QueryExact =""

#Hold the current token trying to be matched
currentToken = ""
for line in f:
	#Reset everything
	mtd_cuisine = mtd_date = mtd_party = mtd_time = mtd_location = mtd_price = False
	Tokens = []
	QueryExact = line
	currentToken = ""
	#Ignore comments
	if (line[:2] != "##"):	
		words = line.split()
		wordCounter = 0
		j = 0
		while (wordCounter < len(words)):
			j+=1
	
			#Add space if already a word in token
			if (currentToken != ""):
				currentToken += " "

			#Add word 
			word = words[wordCounter]
			word = word.translate(None, string.punctuation)
			currentToken += word.lower()
			
		
			#Scan for cuisine if not already got one
			if (mtd_cuisine == False):
				returnVal = match_cuisine(currentToken)
				if (returnVal != None):				
					mtd_cuisine = True
					Tokens.append(["Cusine", returnVal])		
					currentToken = ""
					wordCounter +=1			
					continue

			#Scan for time if not already got one
			if (mtd_time == False):
				returnVal = match_time(currentToken)
				if (returnVal != None):	
					mtd_time = True		
					Tokens.append(["Time", returnVal])
					currentToken = ""
					wordCounter +=1
					continue

			#Scan for date if not already got one
			if (mtd_date == False):
				returnVal = match_date(currentToken)
	
				if (returnVal != None):
					mtd_date = True
					Tokens.append(["Date", returnVal])
					currentToken = ""
					wordCounter +=1
					continue

			#Scan for location if not already got one
			if (mtd_location == 0):
				match_location(currentToken)
		
			
			if (len(currentToken.split()) >= 5):
 				wordCounter -= 2
				currentToken = ""
			else:			
				wordCounter +=1
			 
		print Tokens





	
