from partyProbability import partyProbability


# Thesr are examples of strings representing number of covers
partyValue1 = "for 7 people"
partyValue2 = "for 8"
partyValue3 = "for two"
partyValue4 = "table for 2 people"
partyValue5 = "four people"
partyValue6 = "four covers"
partyValue7 = "3 covers"

partyValues = ["for 7 people","for 8","for two" ,"for a couple" ,"four people" ,"four covers", "3 covers"]

# These are examples of strings that are not numbers of people
nonPartyValues = ["chinese food", "near glasgow",  "at 7:30pm", "tomorrow night", "this afternoon", "cheap"]

#def test1():
#	assert partyProbability(partyValue1) > partyProbability(nonPartyValue1)

#assert partyProbability(partyValues[1]) > partyProbability(nonPartyValues[0])
print partyProbability(partyValues[1])
