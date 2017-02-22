import Tokens

def timeMatch(s):

	hour = 0
	minute ="00"
	s = s.split(" ")
	i = 0
	#Scan for number
	while (i < len(s)):
		if s[i] in str(Tokens.Times_numbers.values()):
			hour = int(s[i])
			break
		elif Tokens.Times_numbers.has_key(s[i]):
			hour = int(Times_numbers.get(s[i]))
			break
		else:
			i= i+1

	#Scan for AM / PM
	if i +1 >= len(s):
                hour = guessHour(hour) 
 	elif s[i+1] == "oclock":
		hour = guessHour(hour) 
	elif s[i+1] == "pm":
		hour = hour +12
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
