from timeProbability import timeProbability


# A more complete time string which should receive the highest value
time1 = timeProbability("lunch at 4 oclock")

# A less complete time string which will receive a lower than highest value
time2 = timeProbability("lunch at 4")

# These are two examples of non-time strings, which should receive the lowest values
notTime1 = timeProbability("dinner")
notTime2 = timeProbability("for 5")


# This test ensures that a more complete time string has a higher
# score than a less complete time string
def test1():
	assert time1 > time2


# These tests ensure that the score of an time is higher than a
# term that is not a time

def test2():
	assert time1 > notTime1

def test3():
	assert time1 > notTime2

def test4():
	assert time2 > notTime1

def test5():
	assert time2 > notTime2

# This test ensures that two non time strings are given the same value
def test6():
	assert notTime1 == notTime2
