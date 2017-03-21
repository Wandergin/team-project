import string
import Tokens
import time
import calendar
import dateFinder


def isLeapYear():
    year = int(time.strftime("%Y"))
    return calendar.isleap(year)


def addDays(n):
    # Days in the months, Jan = 0  Dec = 11
    months = [31, 28 + isLeapYear(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    # Todays date
    today = time.strftime("%d %m %y")
    today = today.split(" ")
    today = map(int, today)

    # While days to add
    while (n > 0):

        # Add to today
        n = n - 1
        today[0] = today[0] + 1

        # If on to the next month
        if today[0] > months[today[1]]:
            today[0] = 1
            today[1] = today[1] + 1

            # If on to the next year
            if today[1] > 12:
                today[1] = 1
                today[2] = today[2] + 1

    # Change to string and return date
    today = map(str, today)
    return (today[0] + "/" + today[1] + "/" + today[2])


def dateMatch(s):
	s = s.split(" ")
	i = 0
	

	# For all words in string
	while (i < len(s)):

	    # Check for today/tomorrow
	    if s[i] == "today" or s[i] == "tonight":
	        return time.strftime("%d/%m/%y")
	    elif s[i] == "tomorrow":
	        return addDays(1)

	    # Else check for a day like "monday"
	    if Tokens.Dates_days.has_key(s[i]):

	        # Calculate day difference
	        dayDiff = Tokens.Dates_days.get(
	            s[i]) - Tokens.Dates_days.get(time.strftime("%A").lower())
	        if dayDiff < 0:
	            dayDiff = dayDiff + 7

	        # Look for this / next / x weeks
	        if i > 0:
	            if s[i - 1] == "this":
	                return addDays(dayDiff)
	            elif s[i - 1] == "next":
	                return addDays(dayDiff + 7)
	            else:
	                if i > 2 and s[i - 1] == "on" and (s[i - 2] == "weeks" or s[i - 2] == "week") and str.isdigit(s[i - 3]):
	                    weeksAway = int(s[i - 3])
	                    return addDays(dayDiff + 7 * weeksAway)

	        # If no next/this then default to this week
	        return addDays(dayDiff)

	    # If no day like monday look a number to mean a specific date
	    if (str.isdigit(s[i][0])):
	        # Check for DD/MM/YY
	        date = dateFinder.isDate(s[i])
	        if date != "0":
	            return date

	        # Might be a date like "2nd of January"
	        date = s[i]

	        # First word nust be a number (1-31)  followed by month
	        if len(date) > 1 and str.isdigit(date[1]):
	            day = date[:1]
	        else:
	            day = date[0]

	        # If day is a real day
	        if int(day) > 0 and int(day) <= 31:

	            # Check if followed by of
	            i = i + 1
	            if i < len(s) and s[i] == "of":
	                i = i + 1

	            # Check if followed by a month
	            if i < len(s) and Tokens.Dates_months.has_key(s[i]):

	                # If it is return the date
	                if len(day) == 1:
	                    day = "0" + day
	                return day + "." + Tokens.Dates_months.get(s[i]) + "." + time.strftime("%y") + "."
	    i = i + 1
	return 0
