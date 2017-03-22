var inputCounter = 0;
var tokenCounter = 0;
var suggestions = ["suggestion1","suggestion2","suggestion3"];
var cuisineDict = {'mexican': 63, 'chinese': 28, 'eastern european': 37, 'german': 46, 'contemporary': 29, 'moroccan': 69, 'asian': 6, 'singaporean': 85, 'sunday lunch': 94, 'thai': 98, 'modern australian': 67, 'turkish': 100, 'byo': 21, 'spanish': 91, 'indonesian': 51, 'deli': 34, 'aussie bbq': 8, 'all you can eat': 2, 'wine bar': 114, 'vegan': 101, 'gastro pub': 45, 'banquet': 12, 'malaysian': 60, 'pizza': 75, 'italian': 54, 'modern new zealand': 68, 'piano bar': 74, 'fish': 41, 'scottish': 81, 'mediterranean': 62, 'japanese': 55, 'cocktails': 113, 'persian': 111, 'salads': 79, 'american fusion': 110, 'caribbean': 25, 'high tea': 49, 'asian fusion': 7, 'fondue': 42, 'indian': 50, 'modern peruvian': 109, 'international': 52, 'creole': 31, 'street food style': 93, 'bistro': 14, 'cajun': 23, 'middle eastern': 65, 'french': 43, 'pasta': 73, 'afternoon tea': 1, 'chilean': 27, 'steak': 92, 'diner': 36, 'filipino': 39, 'burger joint': 20, 'vegetarian': 102, 'vietnamese': 103, 'british': 17, 'american': 3, 'levantine': 107, 'smokehouse': 88, 'modern asian': 66, 'locavore': 59, 'pan asian': 72, 'fresh salads': 44, 'latin american': 112, 'nepalese': 70, 'bbq & grill': 13, 'continental': 30, 'brazilian': 16, 'modern balinese': 105, 'danish': 33, 'set menu': 83, 'michelin star': 64, 'bosnian': 15, 'south east asian': 90, 'argentinian': 5, 'brunch': 18, 'tearoom': 97, 'lebanese': 57, 'slow food': 86, 'romantic': 78, 'scandinavian': 80, 'fine dining': 40, 'seafood': 82, 'irish': 53, 'balinese': 10, 'peruvian': 108, 'sushi': 95, 'halal': 48, 'cantonese': 24, 'arabic': 4, 'cafe': 22, 'south american': 89, 'raw food': 77, 'modern indonesian': 104, 'food safari': 106, 'small plates': 87, 'bakery': 9, 'dessert': 35, 'korean': 56, 'european': 38, 'child friendly': 26, 'buffet': 19, 'norwegian': 71, 'maltese': 61, 'tibetan': 99, 'cuban': 32, 'baltic states': 11, 'punjabi': 76, 'greek': 47, 'locally sourced': 58, 'african': 0, 'tapas': 96, 'sicilian': 84};

function sortFoundTokens(foundTokens, inputQuery) {
    var sortOrder = {};
    var sortedTokens = [];
    $.each(foundTokens, function(index, item){
        // console.log(inputQuery+"  "+item);
        key = inputQuery.indexOf(item)
        sortOrder[key] = item;
    });

    $.each(sortOrder, function(index, item){
        sortedTokens.push(item);
    });
    return sortedTokens;
}

function sendTokens(inputQuery) {
    var sendTokens = {};
    console.log("SENDING: "+ inputQuery);
    $.ajax({
        url: "http://localhost:5000/search",
        method: "GET",
        data:{"q":inputQuery.toLowerCase()},
        success: function(res){
            res = JSON.parse(res);
            console.log(res)
            $.each(res, function(key, item){
                if (item != "" && item != [] && (key.indexOf("Suggestions") <= 0) && key != "Name") {
                    console.log(item);
                    sendTokens[key]=item;
                }
            });
            console.log("sending to ResDiary API:");
            // Still returns the name only and not coordinates
            console.log(sendTokens);

            var cuisineEnum = cuisineDict[sendTokens["cuisine"][0]];
            var location = sendTokens["location"].substring(1,sendTokens["location"].length-1).split(", ");
            var latitude = location[0];
            var longitude = location[1];
            var covers = sendTokens["covers"];
            var time = sendTokens["time"];
            var date = sendTokens["date"];

            window.open("https://www.resdiary.com/api/Restaurant/LocationSearch?lat="+latitude+"&lon="+longitude+"&page=1&distance=10&visitDate="+date+"&visitTime="+time+"&covers="+covers+"&includeAllPages=false&selectedCuisines="+cuisineEnum+"&selectedSortOrder=4","_self")

            return sendTokens;
        }

    });

}

function grabTokens(inputQuery) {
    var foundTokens = [];
    var foundSuggestions = [];
    console.log("SENDING: "+ inputQuery);
    $.ajax({
        url: "http://localhost:5000/tokens",
        method: "GET",
        data:{"q":inputQuery.toLowerCase()},
        success: function(res){
            res = JSON.parse(res);
            console.log(res)
            $.each(res, function(key, item){
                if (item != "" && item != [] && (key.indexOf("Suggestions") <= 0) && key != "location") {
                    if (typeof item === "string" || typeof item === "integer") {
                        foundTokens.push(item)
                    }
                    else { // the token is an array
                        $.each(item, function(k, i){
                            foundTokens.push(i);
                        });
                    }
                }
                else if (key.indexOf("Suggestions") > 0) {
                    switch(key.replace("Suggestions","")){
                        case "cover":
                            console.log("COVER");
                            break;
                        case "cuisine":
                            pres = res.cuisineSuggestions;
                            console.log(pres)
                            suggestions = [pres[0],pres[1],pres[2]];
                            console.log(suggestions);
                            console.log("CUISINE");
                            break;
                        case "date":
                            console.log("DATE");
                            break;
                        case "time":
                            console.log("TIME");
                            break;
                    }
                }
            });
            foundTokens = sortFoundTokens(foundTokens, inputQuery);
            console.log("grabTokens found:");
            console.log(foundTokens);
            constructQuery(foundTokens, inputQuery)
        },
    });
}

function modifyTheFiller(filler, token) {
    console.log("in modifyTheFiller");

    if (filler[0].nodeName == "BUTTON") {
        return;
    }
    fillerVal = filler[0].value;
    console.log(fillerVal.indexOf(token[0].innerText.substring(0,token[0].innerText.length-1)));
    filler[0].value = fillerVal.substring(0,fillerVal.indexOf(token[0].innerText.substring(0,token[0].innerText.length-1)));
    fillerVal = filler[0].value;
    $("#"+filler[0].id).css("width",fillerVal.length*0.8+"ch");
    console.log(filler);
    console.log(token);
}

function closeDropdown(token) {
    console.log("E");
    console.log(token);
    console.log($("#"+token.id+">#myDropdown"));
    $("#"+token.id+">#myDropdown")[0].style.display = "none !important";
}

function forcePlaceholderRemoval() {
    var empty = true;
    if ($(".items").children().length > 2) {
        empty = false
    }
    if (empty == false) {
        $("#input0").attr("placeholder","");
    }
    else {
        $("#input0").attr("placeholder","City, postcode or restaurant name");
    }
}

function removeButton(o) {
    if (o.parent().next()[0].value == " ") {
        inputCounter = inputCounter - 1;
        o.parent().next().remove();

    }
    if (o.parent().prev()[0].nodeName != "BUTTON") {
        o.parent().prev().css("width","30ch").focus();
    }
    o.parent().remove();
    forcePlaceholderRemoval();
    tokenCounter = tokenCounter - 1;

    if ($(".items").children().length == 1) {
        var $input = $('<input type="text"  id="input'+inputCounter+'" value="" onfocus="this.value = this.value;" class="input-tags demo-default" placeholder="Enter some values">');
        $(".items").prepend($input);
        $("#input"+inputCounter).focus();
    }
}

function constructQuery(foundTokens, inputQuery) {
    var fields = [];
    console.log(inputQuery);
    inputQuery = inputQuery.toLowerCase();
    var tokenBegin = 0;
    var tokenEnd = 0;
    var previousTokenEnd = 0;
    // Parsing query into token and filler list
    console.log(foundTokens)
    $.each(foundTokens, function(index, token){
        // console.log("Parsing: "+token);
        console.log(inputQuery.indexOf(token));
        if (inputQuery.indexOf(token) > 0) { // Token is not the first item
            fillerBegin = previousTokenEnd;
            fillerEnd = inputQuery.indexOf(token);
            tokenBegin = inputQuery.indexOf(token);
            tokenEnd = inputQuery.indexOf(token) + token.length;
            console.log("Token begins at "+tokenBegin+" and ends at "+tokenEnd+ " : "+inputQuery.substring(tokenBegin, tokenEnd));
            console.log("Filler begins at "+fillerBegin+" and ends at "+fillerEnd+ " : "+inputQuery.substring(fillerBegin, fillerEnd));
            fields.push({"fillerBegin":fillerBegin,"fillerEnd":fillerEnd, "type":"filler", "value":inputQuery.substring(fillerBegin, fillerEnd)});
            tokenEnd = inputQuery.indexOf(token) + token.length;
            fields.push({"tokenBegin":tokenBegin, "tokenEnd":tokenEnd, "type":"token", "value":token});
            previousTokenEnd = tokenEnd;
        }
        else if (inputQuery.indexOf(token) == 0) { // Token is the first item
            tokenBegin = 0;
            tokenEnd = token.length;
            console.log("Token begins at "+tokenBegin+" and ends at "+tokenEnd+ " : "+inputQuery.substring(tokenBegin, tokenEnd));
            fields.push({"tokenBegin":tokenBegin, "tokenEnd":tokenEnd, "type":"token", "value":token});
            previousTokenEnd = tokenEnd;
        }
    });
    console.log("Fields: ");
    console.log(fields);

    // if there are tokens in the query, remove the first input
    if (fields.length > 0) {
        $("#input0").remove();
    }

    $.each(fields, function(index, item) {
        // Parsing through each token
        if (item.type == "token") {
            var unique = true;

            // Parsing through tokens that are already in the query, checking for duplicates
            $.each($(".items>div"), function(index, i) {
                if (item.value == i.innerText.substring(0,item.value.length)) {
                    unique = false;
                    console.log("Found a duplicate token: "+i.innerText.substring(0,item.value.length));
                }
            });

            // If no duplicate tokens found, add the token to the end of the query
            if (unique == true) {
                console.log("New unique token: "+item.value);
                tokenCounter++;

                var $div = $('<div class="item dropdown" id="token'+tokenCounter+'">'+item.value+'<a href="javascript:void(0)" onClick="removeButton($(this))" class="remove" tabindex="-1" title="Remove">×</a></div>');
                $(".items").append($div);

                if (tokenCounter > 1) {
                    modifyTheFiller($("#token"+tokenCounter).prev(), $div); // Passing filler before the token and the token itself
                }

                // Suggestion dropdown constructor
                $(".dropdown").append('<div id="myDropdown" class="dropdown-content"></div>');
                for (var i=0; i<suggestions.length; i++) {
                    $("#myDropdown").append('<a class="suggestion'+(i+1)+'" onClick="closeDropdown(token'+tokenCounter+')" href="#"> '+suggestions[i]+'</a>');
                }

                
                
                // Click listeners (dropdown)
                $(".dropdown").click(function(){
                    console.log($(this));
                    // for (tokens in $(".item")) {
                    //     console.log(tokens);
                    // }
                    if ($(this).id != "token1") {
                        $(".item").children()[1].style.display = "block";
                    }
                    
                });
            }

        } else if (item.type == "filler") {
            var unique = true;

            // Parsing through fillers that are already in the query, checking for duplicates
            $.each($(".items>input"), function(index, i) {
                if (item.value == i.value.substring(0,item.value.length)) {
                    unique = false;
                    console.log("Found a duplicate filler: "+i.innerText.substring(0,item.value.length));
                }
            });

            console.log("Unique = "+ unique);

            // ??? RESOLVE THIS MESS
            // If no duplicate tokens found, add the filler to the end of the query
            // if (unique == true) {
            //     console.log("New unique input");
            //     inputCounter++;
            //     var $input = $('<input type="text"  id="input'+inputCounter+'" class="input-tags demo-default " value="'+item.value+'" placeholder="Enter some values">');
            //     $(".items").append($input);
            //     $("#input"+inputCounter).css("width",item.value.length+"ch");
            // }


        }
    });

    // If the last item in the query is a token, add a filler field to the end
    if ($(".items").children().last()[0].nodeName == "DIV") {
        inputCounter++;
        var $input = $('<input type="text"  id="input'+inputCounter+'" value=" " onfocus="this.value = this.value;" class="input-tags demo-default " placeholder="Enter some values">');
        $(".items").append($input);
        $("#input"+inputCounter).focus();
    }
}


function crawlAndCollect(items) {
    var query = "";
    // Go through each of the items, if it's a div, extract it's token, if it's an
    // input field, extract it's value
    console.log("Crawling...");
    items.children().each(function(){
        // console.log($(this));
        if ($(this)[0].nodeName == "DIV") {
            query += $(this)[0].innerText.substring(0,$(this)[0].innerText.length-1);
        }
        else if ($(this)[0].nodeName == "INPUT") {
            query += $(this)[0].value;
        }
    });
    // console.log("QUERY: "+query);

    return query;
}

$(document).ready(function() {
    $("#input0").focus();
    $(document).keyup(function(e) {
        if (e.which == 32){
            var inputQuery = crawlAndCollect($(".items"));
            grabTokens(inputQuery);
            forcePlaceholderRemoval();
        }
        else if (e.which == 8) {
            console.log("backspace");
        }
        else if (e.which == 46) {
            e.preventDefault();
            console.log("delete");
        }



    });

    //Search button - console.log the tokens
    $(document).on('click', 'button', function() {
        var inputQuery = crawlAndCollect($(".items"));

        //var dictionary = sendTokens(inputQuery);
        // var cuisineEnum = cuisineDict[dictionary["cuisine"]][0];
        // var latitude = dictionary["location"][0];
        // var longitude = dictionary["location"][1];
        // var covers = dictionary["covers"];
        // var time = dictionary["time"];
        // var date = dictionary["date"];
        sendTokens(inputQuery);
        // XML request does not work due to same-site origin policies of the internet.
        // var xhr = new XMLHttpRequest();
        // xhr.open("GET", "https://www.resdiary.com/api/Restaurant/LocationSearch?lat=51.5073509&lon=-0.1277583&page=1&distance=10&visitDate=null&visitTime=10pm&covers=null&includeAllPages=false&selectedCuisines=1&selectedSortOrder=4");
        // xhr.send();
        // console.log(xhr.status);
        // console.log(xhr.statusText);

    });
});

/* Bugs:
 * When a token gets deleted and gets inputted again, it doesn't reduce the width of the previous input field
 */
