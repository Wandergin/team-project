import timeMatch;

print timeMatch.guessHour(14) == 14;
print timeMatch.guessHour(6) == 18;
print timeMatch.guessHour(26) ==  0;
print timeMatch.timeMatch("for 8am") == "8:00"; print timeMatch.timeMatch("for 12pm") == "12:00";
print timeMatch.timeMatch("for 9 oclock") == "21:00"; print timeMatch.timeMatch("for 5 pm") == "17:00";
print timeMatch.timeMatch("breakfast") == "10:00";
print timeMatch.timeMatch("dinner") == "17:00";