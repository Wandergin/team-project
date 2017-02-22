import string
import Tokens

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
			
			#Remove punctuation
			transtable = string.maketrans(".,/", "   ")
			date = s[i].translate(transtable)
			date = date.split(" ")
			
			#Date should be of size 2/3 and all should be numbers
			if len(date) == 2 or len(date) == 3:  
				datePresent = True
				j = 0

				#For all numbers 
				while (j < len(date) and datePresent):
					if str.isdigit(date[j]):
			
						#If first number must be a real day ( 1 - 31 ) 
						if j == 0:
							if (int(date[j]) < 1 or int(date[j]) > 31):
								datePresent = False
						#If second number must be a real month ( 1 - 12 )
						elif j == 1:
							if (int(date[j]) < 1 or int(date[j]) > 12):
								datePresent = False

						#If third number must be a real year (17+) or (2017+)
						else:
							if len(date[j]) ==  2:
								if (int(date[j]) < 17):
									datePresent = False
							elif len(date[j]) == 4:
								if (int(date[j]) < 2017):
									datePresent = False
							else: 
								datePresent = False
					j = j +1
				#If date is present then return 100
				if datePresent:
					return 100
				
			#If only 1 long might be a date like "2nd of January"		
			elif len(date) == 1:
				
				#First word nust be a number (1-31)  followed by month
				if str.isdigit(date[0][1]):
					day = date[0][:1]
				else:
					day = date[0][0]
				
				#If day is a real day
				if int(day) > 0 and int(day) <= 31:

					#Check if followed by of
				 	i = i + 1
					if i < len(s) and s[i] == "of":
						i = i +1

					#Check if followed by a month
					if i < len(s) and Tokens.Dates_months.has_key(s[i]):
						return 100
			
			#Longer than 3, not a date
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