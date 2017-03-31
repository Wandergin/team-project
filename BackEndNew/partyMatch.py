import string
import Tokens
import sys

def partyMatch(s):
	s = s.split()

	#Search for a number
	i = 0	
	while (i < len(s)):
		if s[i].isdigit():
			return int(s[i])
		i = i+1

	#Search for an approximation
	i = 0	
	while (i < len(s)):
		if Tokens.People_approx_actual.has_key(s[i]):
			return Tokens.People_approx_actual.get(s[i])
		i = i + 1

	#If nothing just return 0
	return 0
