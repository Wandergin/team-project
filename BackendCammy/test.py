import nltk
import sys
from pprint import pprint

s = sys.argv[1]

# s = "indian food for 5 people on the 5th of Febuary at 8pm in Glasgow"


def RepresentsInt(s):
    try:
        int(s)
        return True
    except ValueError:
        return False

cuisine = ["indian", "italian", "chinese", "american", "japanese"]
days = ["monday", "tuesday", "wednesday",
        "thursday", "friday", "saturday", "sunday"]
days_context = ["this", "tomorrow", "next"]
days_connection = ["night", "afternoon", "morning", "evening"]
context_date = ['this', 'next']
numbers = ["one", "two", "three", "four", "five", "six",
           "seven", "eight", "nine", "ten", "eleven", "twelve"]
boolean = ["or", "and"]

missing_tokens = ["date", "time", "covers", "cuisine", "location"]

sentences = nltk.sent_tokenize(s.lower())
tokenized_sentences = [nltk.word_tokenize(sentence) for sentence in sentences]

print tokenized_sentences

tagged_sentences = [nltk.pos_tag(sentence) for sentence in tokenized_sentences]
chunked_sentences = nltk.ne_chunk_sents(tagged_sentences)

terms_locations = ["near", "in", "next to", "around"]

found_cuisines = []

unmatched = []
skip = []
skip_words = ["i", "want"]

searching = False

search_terms = []
context_words = ["for", "at", "near"]

found_tokens = {"date": "", "time": "",
                "location": "", "cuisine": [], "covers": ""}

months = ["january", "feburary", "march", "april", "may", "june",
          "july", "august", "september", "october", "november", "december"]

for i in terms_locations:
    context_words.append(i)

for sent in tokenized_sentences:

    for i in range(0, len(sent)):
        if i not in skip and sent[i] not in skip_words:
            if searching:
                search_terms.append(sent[i])
            if i != len(sent):
                # Look for a date like tomorrow night, this evening
                if sent[i] in days_context and sent[i + 1] in days_connection:
                    thedate = sent[i] + " " + sent[i + 1]
                    print "FOUND A DATE: {}".format(thedate)
                    missing_tokens.remove("date")
                    skip.append(i + 1)
                    found_tokens["date"] = date
                    continue

                # Look for a date like next friday or this tuesday
                elif sent[i] in days_context and sent[i + 1] in days:
                    print "FOUND A CERTAIN DATE ({} week): {} {}".format(sent[i], sent[i], sent[i + 1])
                    missing_tokens.remove("date")
                    skip.append(i + 1)
                    continue

                # Look for number of people
                if (sent[i] in numbers or RepresentsInt(sent[i])) and sent[i + 1] == "people":
                    missing_tokens.remove("covers")
                    print "FOUND NUMBER OF COVERS: {}".format(sent[i])
                    skip.append(i + 1)
                    if i > 1:
                        print "{} {} {}".format(sent[i - 1], sent[i], sent[i + 1])

                        if sent[i - 1] == "for":
                            skip.append(i - 1)
                    continue

            if sent[i] in cuisine:
                found_cuisines.append(sent[i])
                continue

            if sent[i].endswith("pm") or sent[i].endswith("am"):
                print "FOUND A TIME: {}".format(sent[i])
                missing_tokens.remove("time")
                continue

            if sent[i] in terms_locations:
                searching = True

            if sent[i] not in context_words and not searching:
                unmatched.append(sent[i])


if len(found_cuisines) != 0:
    missing_tokens.remove("cuisine")
    print "Found cuisines:"
    print found_cuisines

print "Search terms:"
print search_terms

print "Missing tokens:"
print missing_tokens

print "Words still to match:"
print unmatched

'''
for docs in chunked_sentences:


   others, nouns,proper_nouns, nouns_p, junk, nums, adjectives, keys = [],[],[],[],[],[],[],[]


   for d in docs:
      print d
      if len(d) == 2:
         if d[1] == 'NN':
            nouns.append(d[0])
         elif d[1] == 'NNP':
            proper_nouns.append(d[0])
         elif d[1] == 'NNS':
            nouns_p.append(d[0])
         elif d[1] == 'IN':
            junk.append(d[0])
         elif d[1] == 'CD':
            nums.append(d[0])
         elif d[1] == 'JJ':
            adjectives.append(d[0])
         elif d[1] == 'DT':
            junk.append(d[0])
         else:
            others.append(d)
      elif len(d) == 1:
         keys.append(d)

   print "Nouns:"
   print nouns
   print "\n"

   print "Proper nouns:"
   print proper_nouns
        print "\n"

   print "Junk:"
   print junk
        print "\n"

   print "Numbers:"
   print nums
        print "\n"

   print "Adjectives:"
   print adjectives
        print "\n"

   print "Keys:"
   print keys
   print "\n"

   print "Others:"
   pprint(others)
'''
