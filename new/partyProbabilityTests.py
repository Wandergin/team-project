import partyProbability;

print partyProbability.partyProbability("") == {};
print partyProbability.partyProbability("table for 2 table for 6 table for 12") == {"table for 2":75, "table for 6":75, "table for 12":75};
print partyProbability.partyProbability("couple large group") == {"couple": 25, "large group": 25};
print partyProbability.partyProbability("for 5 for 7") == {"for 5": 50, "for 7":50};
