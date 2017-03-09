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
        tokens = mainParse.main(search)
        return json.dumps(tokens)
        #return search
    else:
        return ''

if __name__ == '__main__':
    app.run()
