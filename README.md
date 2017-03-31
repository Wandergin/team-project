# ResDiary Search Bar

## Synopsis

Aqb is a search bar that allows ResDiary users to look up restaurants using natural language queries.

## Code Example

Use run.sh to start the system, server is run on "localhost:8082/FrontEnd/ResdiaryStyle"
Use kill.sh to stop the system.

Aqb takes in user input from the search bar, it is then sent through the flask server (BackendNew/flask_server.py) and to the main parser (BackendNew/mainParser.py). The main parser will the distribbute the query to
several probability functions (BackendNew/*Probability.py) which can detect tokens of a certain type and the probability of the tokens being of that type. 
All the probability data is then gathered and the most probable data is assigned first, with real values being generated for each token using the matching functions (BackendNew/*Match.py).
After the tokens have been matched, suggestions are made based on the user input and this is conjoined to the actual search tokens.
This data structure is sent back to the frontend which displayes the query in the seach bar, and finally queries resDiary.com who can display restaurant listings using the values provided.
After the input has been visually tokenized, the users will be able to edit the tags - i.e. remove the given tag, or change the value of the tag to a selected suggestion.


## Installation

System can be installed by running BackendNew/install.sh which will install all the required packages.

## API Reference

API refrencing can be found in the wiki page here:  130.209.251.76/resDiary/aqb/wikis/python-packages

## Tests

Tests are automatically run during after each commit, manual testing can be done by navigating to BackendNew/ and running the required test script, test files take the format [nameOfFunction]Tests.py,
the full list of tests can be found here: 130.209.251.76/resDiary/aqb/wikis/continuous-integration-tests

## License

Copyright © 2017 Resdiary & University of Glasgow
