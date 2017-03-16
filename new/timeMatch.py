import Tokens

def timeMatch(s):

	hour = 0
	minute ="00"
	s = s.split(" ")
	i = 0
	#Scan for number
	while i < len(s):
		for ending in Tokens.Times_specific_suffixes:
			if str.isdigit(s[i][0]) and (s[i].endswith(ending)):
				tempStr = s[i]
				s[i] = tempStr[:-len(ending)]
				s.insert( i+1, tempStr[-len(ending):])
				break
		i = i +1
	i = 0

	while (i < len(s)):
		if s[i] in str(Tokens.Times_numbers.values()):
			hour = int(s[i])
			break
		elif Tokens.Times_numbers.has_key(s[i]):
			hour = int(Tokens.Times_numbers.get(s[i]))
			break
		elif Tokens.Times_approx_meal.has_key(s[i]):
			return Tokens.Times_approx_meal.get(s[i])
		elif Tokens.Times_approx.has_key(s[i]):
			return Tokens.Times_approx.get(s[i])
		else:
			i= i+1
		

	print hour
	#Scan for AM / PM
	if i +1 >= len(s):
                hour = guessHour(hour) 
 	elif s[i+1] == "oclock" or s[i+1] == "o'clock":
		hour = guessHour(hour) 
	elif s[i+1] == "pm":
		hour = hour +12
	elif s[i+1] == "am":
		hour = hour
	else:
		hour = guessHour(hour)
	
	answer = str(hour) + ":" + minute
	return answer

	 
#guessHour: Takes a string and tries to determine if am/pm		
def guessHour(hour):
	#If in 24h format
	if 12 < hour < 24:
		return hour

        #Before 10 then probably PM, else probably AM
	if hour < 10:
		hour = hour + 12
	return hour