import string
import Tokens
import time

def isDate(s):
	
	#Remove punctuation
	transtable = string.maketrans(".,/", "   ")
	date = s.translate(transtable)
	date = date.split(" ")

	#Date should be of size 2/3 and all should be numbers
	if len(date) != 2 and len(date) != 3:  
		return "0"	
	
	datePresent = True
	j = 0

	#For all numbers 
	while (j < len(date)):
		if str.isdigit(date[j]):

			#If first number must be a real day ( 1 - 31 ) 
			if j == 0:
				if (int(date[j]) < 1 or int(date[j]) > 31):
					return "0"

			#If second number must be a real month ( 1 - 12 )
			elif j == 1:
				if (int(date[j]) < 1 or int(date[j]) > 12):
					return "0"

			#If third number must be a real year (17+) or (2017+)
			else:
				if len(date[j]) ==  2:
					if (int(date[j]) < 17):
						return "0"
				elif len(date[j]) == 4:
					if (int(date[j]) < 2017):
						return "0"
				else: 
					return "0"
		j = j +1
	
	#If date exists then return
	returnString =  date[0] + "/" + date[1] 
	if len(date) > 2:
		returnString = returnString + "/" + date[2] 
	else:
		returnString = returnString + time.strftime("/%y")
	return returnString