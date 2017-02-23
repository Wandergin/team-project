import string
import Tokens
import dateFinder

def dateProbability(s):

	s = s.split(" ")
	i = 0

	#For all words in string
	while (i<len(s)):
		
		#Check for today/tomorrow/monday
		if (s[i] in Tokens.Dates_common) or (s[i] in Tokens.Dates_days) :
			return 100;

		#Else check if the first digit is a number (possible date)
		elif (str.isdigit(s[i][0])):
			
			#If date exists return 100:
			if dateFinder.isDate(s[i]) != "0":
				return 100
			
			#If not might be a date like "2nd of January"		
			
			date = s[i]
			#First word nust be a number (1-31)  followed by month
			if len(date) > 1 and str.isdigit(date[1]):
				day = date[1]
			else:
				day = date[0]
				
			#If day is a real day
			if int(day) > 0 and int(day) <= 31:

				#Check if followed by of
				i = i + 1
				if i < len(s) and s[i] == "of":
					i = i +1

				#Check if followed by a month
				if i < len(s) and Tokens.Dates_months.has_key(s[i]):
					return 100
			
		#Not a digit, move on
		i = i +1
	
	#Nothing returned, no date present
	return 0

print(dateProbability("today"))				#100
print(dateProbability("tomorrow"))		#100
print(dateProbability("never"))				#0
print(dateProbability("ever"))				#0
print(dateProbability("1.11.17"))			#100	
print(dateProbability("2nd of january"))	#100
print(dateProbability("11/1/2017"))		#100
print(dateProbability("3rd of october"))	#100
print(dateProbability("32/1/17"))			#0
print(dateProbability("1.1.2016"))			#0
print(dateProbability("monday"))			#100
print(dateProbability("5.15.17")	)			#0
