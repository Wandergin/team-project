import dateFinder;

print dateFinder.isDate("1/2") != 0;
print dateFinder.isDate("03/04/20") != 0;
print dateFinder.isDate("32/4/20") == "0";
print dateFinder.isDate("20/13/20") == "0";
print dateFinder.isDate("20/4/14") == "0";