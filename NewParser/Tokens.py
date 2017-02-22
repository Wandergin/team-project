# List of all tokens matchable
##############################
#Words that have no use and should be skipped
Skip_words = 		["i", "want"]


##Cuisines - 	Ethnic: 	Defines cusines by ethnicity like chineese or italian
##		Dietary:	Defines various dietary restrictions one may have
##		Belief:		Defines various belief restrictions one may have

Cusines_ethnic = 	["african", "american", "arabic", "british", "caribbean", "chinese", "european",
		 	"english",  "french", "greek", "indian", "irish", "italian", "japanese", "kurdish", 
		 	"lebanese", "mediterranean", "mexican", "middle eastern", "mongolian", "nordic",
		 	"oriental", "persian", "portuguese", "south american", "spanish", "thai", "turkish"]

Cusines_dietary =	["gluten-free", "healthy",  "low-Cal", "low-calorie", "soy-free"]

Cusines_belief =	["kosher", "halal", "organic", "vegen", "vegetarian"]


##############################
##Dates	-	Prefixes:	Defines words that may come before a date
##		Suffixes:	Defines words that may come after a date
##		Common:		Defines commonly used dates
##		Days:		Dictionary mapping each day to a number (place in the week)
##		Months:		Dictoinary mapping each month a a number (place in the year)
		

Dates_prefixes = 	["this", "next", "on", "for"]

Dates_suffixes = 	["st", "nd", "rd", "th"]

Dates_common = 		["today", "tomorrow"]

Dates_days =		{"monday": 1, "tuesday": 2, "wednesday": 3, "thursday": 4, "friday": 5, "saturday": 6, "sunday": 7}

Dates_months = 		{"january": 1, "february": 2, "march": 3, "april": 4, "may": 5, "june": 6, "july": 7, "august": 8,
			"september": 9, "october": 10, "november": 11, "december": 12}


##############################
##Times -	Specific prefixes:	Defines words that may come before a specific time e.g at 4 o'clock
#		Specific suffixes:	Defines words that may come after a specfic time e.g  '  '
#		Specific actual:	Defines words that will define a specific time e.g at around noon
#		Approx			Defines words that may define an approximate time e.g at afternoon
#		Approx meal:		Defines words that may define an approximate time by meal e.g breakfast
#		Numbers:		Dictionary that maps english numbers i.e "four" to numerical value "4"

Times_specific_prefixes	= 	["at", "around","for", "in"]

Times_specific_actual =		["noon"]

Times_specific_suffixes	= 	["am","hours", "minutes", "oclock", "pm"]

Times_approx =			["early", "morning", "afternoon", "evening", "late", "night"]

Times_approx_meal = 		["breakfast", "brunch", "lunch", "lunchtime", "dinner", "dinnertime"]

Times_numbers = 		{"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10, "eleven": 11, "twelve":12}


##############################
##People	Specific prefixes:	Defines words that may come before an amount of people e.g table for 5 people
##		Specific suffixes:	Defines words that may come after an amount of people e.g 5 people
##		Approx actual:		Defines words used that may approximate the party size
##		Approx suffix:		Defines suffixes that may come after an approximation of size

People_specific_prefixes = 	["for", "table for"]

People_specific_suffixes = 	["people"]

People_approx_actual =		{"couple": 2, "small": 4, "medium": 6, "large": 8}

People_approx_suffix = 		["party", "table", "group"]


##############################
##Location - 	Specific prefixes:	Defines words that may come before a specific place e.g. near George Square	
#		Specific suffixes:	Defines words that may come after a specific place e.g.
#		Radius prefixes:	Defines words that may come before a specified radius e.g. within 2 miles from George Square
#		Radius suff distance:	Defines distances for a radius e.g  	'  '
#		Radius suff time:	Defines times for a radius e.g within 10 minutes walk from Glasgow University
#		Radius suff travel:	Defines travel methods for a radius e.g   '  '		

Location_specific_prefixes = 	["about", "around", "beside","closeby","close to", "near", "nearby", "next to", "not far from", "roughly", "in the vicinity of"]

Location_radius_prefixes =	["at most", "less than", "within"]

Location_radius_suff_distance =	["block", "steet", "mile", "metres" "kilometer", "k"]

Location_radius_suff_time = 	["hours", "minutes"]
	
Location_radius_suff_travel=	["cycle","drive", "walk"]


