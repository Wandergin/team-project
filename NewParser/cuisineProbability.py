import string
import Tokens

def cuisineProbability(s):
	s = s.split(" ")	
	
	#Search all ethnic cusines
	for token in Tokens.Cuisines_ethnic:
		token = token.split(" ")
		if s == token:
			return 1
	
	#Search all dietary cuisines
	for token in Tokens.Cuisines_dietary:
		token = token.split(" ")
		if s == token:
			return 1

	#Search all belief cuisines
	for token in Tokens.Cuisines_belief:
		token = token.split(" ")
		if s == token:
			return 1
	
	#If none return 0
	return 0