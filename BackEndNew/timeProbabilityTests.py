import timeProbability;

print timeProbability.timeProbability("") == {};
print timeProbability.timeProbability("for 8am for 12pm at 11 am for 5 pm around 9 oclock") == {"at 11 am": 100, "around 9 oclock": 100, "for 12pm": 100, "for 5 pm":100, "for 8am": 100};
print timeProbability.timeProbability("for 8:30am for 12:15 around 7:45pm") == {"for 8:30am": 100, "for 12:15": 25, "around 7:45pm": 100}; 
print timeProbability.timeProbability("dinner lunch breakfast") == {"breakfast":25, "dinner":25, "lunch":25};