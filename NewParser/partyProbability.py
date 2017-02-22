import string
import Tokens

def partyProbability(s):

	returnDict = {}
	s = s.split(" ")
	i = 0
	result = ""
	probability = 0

	while(i< len(s)):
		if s[i] == "for":
			result = "for"
			if i > 0:
				if s[i-1] == "table":
					result = "table " + result
					probability += 25
			if i < len(s):
				i+=1
			if s[i] .isdigit():
				result = result + " " + str(s[i])
			        probability += 50
				if i < len(s):
					i+=1
				if s[i] == "people":
					result = result + " " + "people"
					probability = 100
					print result

			elif s[i] in Tokens.People_approx_actual:
				result = result + " " + s[i]
				probability += 25
				if i < len(s):
					i+=1
				if s[i] in Tokens.People_approx_suffix:
					result = result + " " + s[i]
					probability = 100
			returnDict[result] = probability
		i +=1
	return probability
