import mainParser;
import dateMatch;

print (mainParser.mainParser("", (0,0), "search") == {});
output =  (mainParser.mainParser("2 people indian tomorrow", (53.8603, -2.3741), "search"));
print (output.get("covers") == "2" and output.get("cuisine") == ["indian"] and output.get("date") == dateMatch.dateMatch("tomorrow"));
output =(mainParser.mainParser("large group today for healthy american food in glasgow", (53.8603, -2.3741), "search"));
print (output.get("covers") == "8" and output.get("cuisine") == ["healthy", "american"] and output.get("locationName") == "glasgow" and output.get("date") == dateMatch.dateMatch("today"));