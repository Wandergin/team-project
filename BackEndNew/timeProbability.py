import string
import Tokens

finalReturn = {}


def timeProbability(s):
	#Covert string to lowercase list
	s = s.lower()
	s = s.split(" ")
	i = len(s) -1
	returnDict = {}

	#For each word in string
	while (i >= 0):

		#Bool for presence of prefix, number and suffix
		present_suf = False
		present_num = False
		present_pre = False
		present_approx = False

		#Total string with probability
		result = ""
		resultProb = 0


		tempWord = s[i]

		#Search for a suffix that guarantees a time
		for ending in Tokens.Times_specific_suffixes:
			#If found take ending out and add to the result
			if s[i].endswith(ending):
				result  = result +ending
				tempWord = tempWord.replace(ending, '')
				present_suf = True
				break

		#If word is empty move to next word
		if tempWord ==  "" and i > 0:
			tempWord = s[i-1]
			result = " " + result
			i = i-1


		#Search for a number to match the ending
		if Tokens.Times_numbers.has_key(tempWord) or tempWord in str(Tokens.Times_numbers.values()):
			result = tempWord  + result
			present_num = True
			i = i-1
		elif len(tempWord.split(":")) == 2:
			if tempWord.split(":")[0] in str(Tokens.Times_numbers.values()):
				if int(tempWord.split(":")[1]):
					if (int(tempWord.split(":")[1]) >= 0) and (int(tempWord.split(":")[1]) <= 59):
						result = tempWord + result
						present_num = True
						i = i-1
		else:
			result = ""

		#Search for prefixes to append
		if i >= 0 and result != "":
			for prefix in Tokens.Times_specific_prefixes:		#at / for / around
				if s[i] == prefix:
					i = i -1
					result = prefix + " " + result
					present_pre = True
					break

		for time in Tokens.Times_approx_meal:				#dinner / lunch
			if i >= 0 and s[i] == time:
				i = i-1
				returnDict.update({time:25})
				present_approx = True
				break

		for time in Tokens.Times_approx:				#early late evening
			if i >= 0 and s[i] == time:
				i = i-1
				result = time + " " + result
				present_approx = True
				break


		#Determines how likely the string is to be a time
		if present_suf and present_pre and present_num:
			resultProb = 100
		elif present_suf and present_num:
			resultProb = 100
		elif present_approx and present_pre and present_num:
			resultProb = 50
		elif present_pre and present_num:
			resultProb = 25
		elif present_approx:
			resultProb = 25

		if result != "":
			result = result.strip()
			returnDict[result] = resultProb
		else:
			i = i -1
	return returnDict
