from flask import Flask, url_for
app = Flask(__name__)
from flask import request
from mainParser import mainParser
import getLocation
from nocache import nocache


#import nltk
import sys
from pprint import pprint
import datetime
import json
from flask_cors import CORS, cross_origin

from mainParser import mainParser

CORS(app)

app.config["CACHE_TYPE"] = "null"
# change to "redis" and restart to cache again

# some time later

app.config.update(
    PROPAGATE_EXCEPTIONS = True
)

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

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
        location = getLocation.getLocation(request)
        search = str(request.args['q'])
        tokens = mainParser(search, location, "search")
        return json.dumps(tokens)
        #return search
    else:
        return ''

@app.route('/tokens')
def api_token():
    if 'q' in request.args:
        location = getLocation.getLocation(request)
        search = str(request.args['q'])
        tokens = mainParser(search, location, "token")
        return json.dumps(tokens)
        #return search
    else:
        return ''

if __name__ == '__main__':
    app.run()
