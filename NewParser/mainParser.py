import timeProbability
import timeMatch
import partyProbability
import operator

def main(s):
	timeStrings = timeProbability.timeProbability(s)
	timeStrings = sorted(timeStrings.items(), key=operator.itemgetter(1))
	newStr = str(timeStrings[len(timeStrings) -1])
	newStr = timeMatch.timeMatch(newStr)
	print newStr

	partyStrings = partyProbability.partyProbability(s)
	partyStrings = sorted(partyStrings.items(), key=operator.itemgetter(1))
	print(partyStrings)


main("table for 10  at 10 oclock tonight")