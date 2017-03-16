import string
import Tokens
import dateFinder

def dateProbability(s):

	s = formatString(s)

	i = 0
	returnDict = {}

	#For all words in string
	while (i<len(s)):
		#Check for today/tomorrow/monday
		if (s[i] in Tokens.Dates_common) or (s[i] in Tokens.Dates_days) :
			returnDict.update( {s[i]:100} )

		#Else check if the first digit is a number (possible date)
		elif (str.isdigit(s[i][0])):
			
			#If date exists return 100:
			if dateFinder.isDate(s[i]) != "0":
				returnDict.update( {s[i]:100} )
			
			#If not might be a date like "2nd of January"		
			
			date = s[i]
			#First word nust be a number (1-31)  followed by month
			tmpStr = ""
			if len(date) > 1 and str.isdigit(date[1]):
				day = date[1]
			else:
				day = date[0]

			#If day is a real day
			if int(day) > 0 and int(day) <= 31:
				tmpStr += day
			
				#Check if followed by of
				if i +1 < len(s) and s[i+1] == "of":
					i = i +1
					tmpStr += " of"

				#Check if followed by a month
				if i +1 < len(s) and Tokens.Dates_months.has_key(s[i +1]):
					tmpStr += " " + s[i+1]
					returnDict.update( {tmpStr[i+1]:100} )
			
		#Not a digit, move on
		i = i +1
	
	#Nothing returned, no date present
	return returnDict

	
def formatString(s):
	s = s.split(" ")
	for word in s:
		if word.isspace() or word == "":
			s.remove(word) 

	return s

