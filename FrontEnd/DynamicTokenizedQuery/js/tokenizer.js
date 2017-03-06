tokens = ["Chinese","table for 2", "at 9pm"];
quert = "";

function forcePlaceholderRemoval() {
    var empty = true;
    if ($(".items").children().length > 2) {
        empty = false
    }
    if (empty == false) {
        $("#input-tags").attr("placeholder","");
    }
    else {
        $("#input-tags").attr("placeholder","City, postcode or restaurant name");
    }
}

function removeButton(o) {
    o.parent().remove();
    forcePlaceholderRemoval();
}

function crawlAndCollect(items) {
    query = "";
    var inputQuery = "";
    // Go through each of the items, if it's a div, extract it's token, if it's an
    // input field, extract it's value
    console.log("Crawling...");
    items.children().each(function(){
        console.log($(this));
        if ($(this)[0].nodeName != "BUTTON") {
            query += $(this)[0].innerText;
        }
    });

    query += items.children(":text")[0].value;
    console.log("QUERY: "+query);

    inputQuery = items.children(":text")[0].value
    return inputQuery;
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
        //console.log(query);
        $.each(tokens, function(index, token){
            if (inputQuery.indexOf(token) >= 0) {
                console.log("Found " + token);
                caretStart = inputQuery.indexOf(token)
                var caretEnd = caretStart + token.length;
                console.log("The token is between "+ caretStart +" and " + caretEnd);
                inputQuery = inputQuery.substring(caretEnd,query.length);
                console.log("Query should be " + inputQuery);
                var $div = $('<div class="item" data-token="cuisine" data-value="chinese">'+token+'<a href="javascript:void(0)" onClick="removeButton($(this))" class="remove" tabindex="-1" title="Remove">×</a></div>');
                


                // Query constructor
                var rest = $("#input-tags").clone();
                // $(".items").remove($("#input-tags"));
                $("#input-tags").before($div);
                $("#input-tags").val(inputQuery);

                console.log(token);
                // console.log(rest);
            }
        });
        
        forcePlaceholderRemoval();

    });

    // Click listeners
    $(".items").click(function(){
        $("#input-tags").focus();

        // $(this).parent().remove();
    });
});

