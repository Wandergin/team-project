import string
import Tokens

def cuisineProbability(s):
	s = s.split(" ")	
	returnArray = []
	i = 0
	
	#For all words in the query
	while i < len(s):

		#Search all ethnic cusines
		for token in Tokens.Cuisines_ethnic:
			token = token.split(" ")
			if compare(s, i, token):
			    token = unsplit(token)
				returnArray += [token]
	
		#Search all dietary cuisines
		for token in Tokens.Cuisines_dietary:
			token = token.split(" ")
			if compare(s, i, token):
                token = unsplit(token)
			    returnArray += [token]

		#Search all belief cuisines
		for token in Tokens.Cuisines_belief:
			token = token.split(" ")
			if compare(s, i, token):
                token = unsplit(token)
                returnArray += [token]
		
		i = i +1
	
	#Return cuisines
	if returnArray == []:
		return []
	return returnArray
	
def unsplit(s):
	if type(s) is str:
		return s
	else:
		res = ""
		for w in s:
			res = res + w + " "
		res = res[:-1]
		return res


#Compares a possible token and cuisine tokens
def compare(s, i, token):
	if type(token) is str:
		token = [token]

	if i + len(token) <= len(s):
		j = 0
		while j < len(token):
			if token[j] != s[i+j]:
				return False
			j = j + 1
		return True