import dateMatch;
import time;

print dateMatch.addDays(0) == time.strftime("%d/%m/%y");
print dateMatch.dateMatch("") == 0;
print dateMatch.dateMatch("today") == time.strftime("%d/%m/%y");
dateQuery = "next " + time.strftime("%w");
print dateMatch.dateMatch(dateQuery) == dateMatch.addDays(7);
dateQuery = "3 weeks on " + time.strftime("%w");
print dateMatch.dateMatch(dateQuery)  == dateMatch.addDays(21);
print dateMatch.dateMatch("05/05") == "05/05/17";
print dateMatch.dateMatch("25.12.2020") == "25/12/20";