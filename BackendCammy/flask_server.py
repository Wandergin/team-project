from flask import Flask, url_for
app = Flask(__name__)
from flask import request

#import nltk
import sys
from pprint import pprint
import datetime
import json
from flask_cors import CORS, cross_origin
CORS(app)

def query_to_token(s):

    days = {"monday": 1, "tuesday": 2, "wednesday": 3,
            "thursday": 4, "friday": 5, "saturday": 6, "sunday": 7}

    # s = "indian food for 5 people on the 5th of Febuary at 8pm in Glasgow"
    def StringToDate(day):
        day = day.split(" ")
        next_monday = ""
        if day[0] == "this":

            def next_weekday(d, weekday):
                days_ahead = weekday - d.weekday()
                if days_ahead <= 0: # Target day already happened this week
                    days_ahead += 7
                return d + datetime.timedelta(days_ahead)

            d = datetime.datetime.now()

            next_monday = next_weekday(d, days[day[1]]) # 0 = Monday, 1=Tuesday, 2=Wednesday...
            return next_monday.date()
        elif day[0] == "next":
            def next_weekday(d, weekday):
                days_ahead = weekday - d.weekday()
                #if days_ahead <= 0: # Target day already happened this week
                days_ahead += 7
                return d + datetime.timedelta(days_ahead)

            d = datetime.datetime.now()
            next_monday = next_weekday(d, days[day[1]]) # 0 = Monday, 1=Tuesday, 2=Wednesday...

            return next_monday.date()

        return ""



    def RepresentsInt(s):
        try:
            int(s)
            return True
        except ValueError:
            return False

    cuisine = ["indian", "italian", "chinese", "american", "japanese"]

    days_context = ["this", "tomorrow", "next"]
    days_connection = ["night", "afternoon", "morning", "evening"]
    context_date = ['this', 'next']

    numbers = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6,
               "seven": 7, "eight": 8, "nine": 9, "ten": 10, "eleven": 11, "twelve":12}
    boolean = ["or", "and"]

    missing_tokens = ["date", "time", "covers", "cuisine", "location"]

    #sentences = nltk.sent_tokenize(s.lower())
    #tokenized_sentences = [nltk.word_tokenize(sentence) for sentence in sentences]

    #print tokenized_sentences

    #tagged_sentences = [nltk.pos_tag(sentence) for sentence in tokenized_sentences]
    #chunked_sentences = nltk.ne_chunk_sents(tagged_sentences)

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



    for i in [s]:
        context_words.append(i)


    #for sent in tokenized_sentences:

    sent = s.split(" ")

    for i in range(0, len(sent)):
        if i not in skip and sent[i] not in skip_words:
            if searching:
                search_terms.append(sent[i])
            if i != len(sent):

                # Look for a date like tomorrow night, this evening
                if i+1 < len(sent):
                    if sent[i] in days_context and sent[i + 1] in days_connection:
                        thedate = sent[i] + " " + sent[i + 1]
                        #print "FOUND A DATE: {}".format(thedate)
                        missing_tokens.remove("date")
                        skip.append(i + 1)
                        found_tokens["date"] = thedate
                        continue

                    # Look for a date like next friday or this tuesday
                    elif sent[i] in days_context and sent[i + 1] in days:
                        thedate = sent[i] + " " + sent[i + 1]
                        #print "FOUND A CERTAIN DATE ({} week): {} {}".format(sent[i], sent[i], sent[i + 1])
                        missing_tokens.remove("date")
                        #TODO: fix the String to date function, return formatted date
                        found_tokens["date"] = thedate #StringToDate(thedate)
                        skip.append(i + 1)
                        continue
                else:
                    if sent[i] == "tomorrow":
                        missing_tokens.remove("date")
                        found_tokens["date"] = "tomorrow" #StringToDate(thedate)
                    #    skip.append(i + 1)
                #    else if

                # Look for number of people
                if (sent[i] in numbers.keys() or RepresentsInt(sent[i])):
                    if len(sent) > i+1:
                        if sent[i + 1] == "people":
                            missing_tokens.remove("covers")
                            #print "FOUND NUMBER OF COVERS: {}".format(sent[i])
                            skip.append(i + 1)
                            if (RepresentsInt(sent[i])):
                                found_tokens["covers"] = sent[i]
                            else:
                                found_tokens["covers"] = numbers[sent[i]]
                            if i > 1:

                                if sent[i - 1] == "for":
                                    skip.append(i - 1)
                            continue

            if sent[i] in cuisine:
                found_cuisines.append(sent[i])
                continue

            if sent[i].endswith("pm") or sent[i].endswith("am"):
                #print "FOUND A TIME: {}".format(sent[i])
                missing_tokens.remove("time")
                found_tokens['time'] = sent[i]
                continue

            if sent[i] in terms_locations:
                searching = True

            if sent[i] not in context_words and not searching:
                unmatched.append(sent[i])


    if len(found_cuisines) != 0:
        missing_tokens.remove("cuisine")
    #    print "Found cuisines:"
    #    print found_cuisines
        found_tokens['cuisine'] = found_cuisines

    #print "Search terms:"
    #print search_terms
    found_tokens['location'] = search_terms

    #print "Missing tokens:"
    #print missing_tokens

    #print "Words still to match:"
    #print unmatched

    #print found_tokens
    return found_tokens



@app.route('/')
def api_root():
    return 'Welcome'

@app.route('/articles')
def api_articles():
    return 'List of ' + url_for('api_articles')

@app.route('/articles/<articleid>')
def api_article(articleid):
    return 'You are reading ' + articleid


@app.route('/search')
def api_search():
    if 'q' in request.args:

        search = request.args['q']
        tokens = query_to_token(search)
        return json.dumps(tokens)
        #return search
    else:
        return ''

if __name__ == '__main__':
    app.run()
