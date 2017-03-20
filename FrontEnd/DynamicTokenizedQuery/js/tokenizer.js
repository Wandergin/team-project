var inputCounter = 0;
var tokenCounter = 0;
var suggestions = ["suggestion1","suggestion2","suggestion3"]

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

function grabTokens(inputQuery) {   
    var foundTokens = [];
    console.log("SENDING: "+ inputQuery);
    $.ajax({
        url: "http://localhost:5000/search",
        method: "GET",
        data:{"q":inputQuery.toLowerCase()},
        success: function(res){
            res = JSON.parse(res);
            console.log(res)
            $.each(res, function(key, item){
                if (item != "" && item != [] && !(key.indexOf("Suggestions") > 0)) {
                    if (typeof item === "string" && typeof item === "integer") {
                        foundTokens.push(item)
                    }

                    else {
                        foundTokens.push(item[0])
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

function closeDropdown() {
    ("#myDropdown").classList.remove('show');
    for (var i = 0; i < $(".dropdown-content").length; i++) {
        var openDropdown = $(".dropdown-content")[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
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
        var $input = $('<input type="text"  id="input'+inputCounter+'" value="" onfocus="this.value = this.value;" class="input-tags demo-default s-box" placeholder="City, postcode or restaurant name">');            
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

                var $div = $('<div class="item dropdown" id="token'+tokenCounter+'" data-token="cuisine" data-value="chinese">'+item.value+'<a href="javascript:void(0)" onClick="removeButton($(this))" class="remove" tabindex="-1" title="Remove">×</a></div>');
                $(".items").append($div);

                if (tokenCounter > 1) {
                    modifyTheFiller($("#token"+tokenCounter).prev(), $div); // Passing filler before the token and the token itself
                }

                // Suggestion dropdown constructor
                $(".dropdown").append('<div id="myDropdown" class="dropdown-content"></div>');
                for (var i=0; i<suggestions.length; i++) {
                    $("#myDropdown").append('<a class="suggestion'+(i+1)+'" onClick="close()" href="#"> '+suggestions[i]+'</a>');
                } 

                // Click listeners (dropdown)
                $(".item").click(function(){
                    console.log($(this)[0].id);
                    document.getElementById("myDropdown").classList.toggle("show");
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
            if (unique == true) {
                console.log("New unique input");
                inputCounter++;
                var $input = $('<input type="text"  id="input'+inputCounter+'" class="input-tags demo-default s-box" value="'+item.value+'" placeholder="City, postcode or restaurant name">');            
                $(".items").append($input);
                $("#input"+inputCounter).css("width",item.value.length+"ch");
            }


        }
    });

    // If the last item in the query is a token, add a filler field to the end
    if ($(".items").children().last()[0].nodeName == "DIV") {
        inputCounter++;
        var $input = $('<input type="text"  id="input'+inputCounter+'" value=" " onfocus="this.value = this.value;" class="input-tags demo-default s-box" placeholder="City, postcode or restaurant name">');            
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
        var dictionary = {"cuisine": "", "location": "", "time": "", "covers": "","features": ""};
        $(".item").each(function() {
            var str = $(this).text().replace('×', '');
            var token = $(this).data('token');
            dictionary[token] = str;                
        });
        console.log(dictionary);
    });
});

/* Bugs: 
 * When a token gets deleted and gets inputted again, it doesn't reduce the width of the previous input field 
 */
