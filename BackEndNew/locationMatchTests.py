import locationMatch;

print locationMatch.locationMatch("",(53.8603, -2.3741)) == None;
print locationMatch.locationMatch("glasgow",(53.8603, -2.3741)) == (252.56941711175352, "glasgow", "(55.856656, -4.2435816)");
print locationMatch.locationMatch("london",(53.8603, -2.3741)) == (302.6846897789244, "london", "(51.5073219, -0.1276473)");
print locationMatch.locationMatch("paris",(53.8603, -2.3741)) == (645.0641956932174, "paris", "(48.85881005, 2.32003101155031)");