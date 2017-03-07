var foundTokens = ["Chinese","table for 2", "at 9pm"];
var inputCounter = 0;
var tokenCounter = 0;

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
    o.parent().next().remove();
    o.parent().prev().attr("size","30").focus();
    o.parent().remove();
    forcePlaceholderRemoval();
    var tokenCounter = tokenCounter - 1;
    var inputCounter = inputCounter - 1;
}


function constructQuery(inputQuery) {

    var fields = [];
    console.log(inputQuery);

    var tokenBegin = 0;
    var tokenEnd = 0;

    $.each(foundTokens, function(index, token){
        if (inputQuery.indexOf(token) >= 0) {
            tokenBegin = inputQuery.indexOf(token);
            fields.push({"fillerBegin":tokenEnd,"fillerEnd":tokenBegin, "type":"filler", "value":inputQuery.substring(tokenEnd, tokenBegin)});
            tokenEnd = inputQuery.indexOf(token) + token.length;
            fields.push({"tokenBegin":tokenBegin, "tokenEnd":tokenEnd, "type":"token", "value":token});
        }
    });

    console.log(fields);

    if (fields.length > 0) {
        $("#input0").remove();
    }
    $.each(fields, function(index, item) {
        if (item.type == "token") {
            var unique = true;
            $.each($(".items>div"), function(index, i) {
                //console.log($(this));
            
                if (item.value == i.innerText.substring(0,item.value.length)) {
                    unique = false;
                }
            });
           
            if (unique == true) {
                console.log("New unique token");
                tokenCounter++;
                var $div = $('<div class="item" id="token'+tokenCounter+'" data-token="cuisine" data-value="chinese">'+item.value+'<a href="javascript:void(0)" onClick="removeButton($(this))" class="remove" tabindex="-1" title="Remove">×</a></div>');
                $(".items").append($div)
            }
            

        } else if (item.type == "filler") {
            var unique = true;

            $.each($(".items>input"), function(index, i) {
                //console.log($(this));
            
                if (item.value == i.value.substring(0,item.value.length)) {
                    unique = false;
                }
            });
            console.log("Unique = "+ unique);
            if (unique == true) {
                console.log("New unique input");
                inputCounter++;
                var $input = $('<input type="text"  id="input'+inputCounter+'" class="input-tags demo-default" value="'+item.value+'" placeholder="City, postcode or restaurant name">');            
                $(".items").append($input);
                $("#input"+inputCounter).attr("size",item.value.length);
            }


        }
    });
    if ($(".items").children().last()[0].nodeName == "DIV") {
        console.log("YAS");
        inputCounter++;
        var $input = $('<input type="text"  id="input'+inputCounter+'" class="input-tags demo-default" placeholder="City, postcode or restaurant name">');            
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

    // query += items.children(":text")[0].value;
    console.log("QUERY: "+query);

    // inputQuery = items.children(":text")[0].value;
    return query;
}

$(document).ready(function(){
    $(document).keyup(function(e) {
        if (((e.which > 47) && (e.which < 111)) || (e.which == 32)){
            console.log(e.key);
        }
        else if (e.which == 8) {
            console.log("backspace");
        }
        else if (e.which == 46) {
            e.preventDefault();
            console.log("delete");
        }

        console.log($(".items"));
        var inputQuery = crawlAndCollect($(".items"));

        constructQuery(inputQuery);


        // $.each(tokens, function(index, token){



        //     if (inputQuery.indexOf(token) >= 0) {
                
        //         caretStart = inputQuery.indexOf(token)
        //     //     var caretEnd = caretStart + token.length;
        //     //     console.log("The token is between "+ caretStart +" and " + caretEnd);
        //     //     inputQuery = inputQuery.substring(caretEnd,query.length);
        //     //     console.log("Query should be " + inputQuery);
                
        //     //     // Query constructor
        //     //     var clone = $("#input-tags").clone();  
        //     //     var rest = clone[0].value.split(token); 
        //     //     console.log(rest);
        //     //     //rest.attr("id","input"+inputCounter);

        //     //     // If token is the last word of the :
        //     //     //   put the rest of the query before the word as a new input field



        //     //     $("#input-tags").before($div);
        //     //     $("#input-tags").val(rest[0]);
        //     //     // $("#input-tags").val(inputQuery);

        //     //     console.log(token);
        //     //     console.log("REST: ");
        //     //     console.log(rest[0].value);
        //     }
        // });
        

        forcePlaceholderRemoval();

    });

    // Click listeners
    // $(".items").click(function(){
    //     $("#active").focus();

    //     // $(this).parent().remove();
    // });
});

