import dateProbability;

print dateProbability.dateProbability("") == {}; 
print dateProbability.dateProbability("today tomorrow") == {"today":100, "tomorrow":100};
print dateProbability.dateProbability("this monday next friday") == {"this monday":100, "next friday":100};
print dateProbability.dateProbability("1/1/20 05/05 30/10/2020") == {"1/1/20": 100, "30/10/2020": 100, "05/05": 100};
print dateProbability.dateProbability("17.1.20 01.07 25.12.2020") == {"17.1.20": 100, "25.12.2020": 100, "01.07": 100};
print dateProbability.dateProbability("32.1.2020 1.13.2020 4/20/2015") == {};