import locationProbability;

print locationProbability.locationProbability("",(0,0)) == {};
print locationProbability.locationProbability("around glasgow near london at paris", (53.8603, -2.3741)) == {"paris": 645.0641956932174, "london": 302.6846897789244, "glasgow": 252.56941711175352};
