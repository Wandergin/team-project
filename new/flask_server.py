from flask import Flask, url_for
app = Flask(__name__)
from flask import request
from mainParser import mainParser
import getLocation

#import nltk
import sys
from pprint import pprint
import datetime
import json
from flask_cors import CORS, cross_origin

from mainParser import mainParser

CORS(app)

app.config.update(
    PROPAGATE_EXCEPTIONS = True
)

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
        tokens = mainParser(search, location)
        return json.dumps(tokens)
        #return search
    else:
        return ''

if __name__ == '__main__':
    app.run()
