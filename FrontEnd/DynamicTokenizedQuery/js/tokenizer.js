tokens = ["Chinese","table for 2", "at 9pm"];

function crawlAndCollect(items) {
    // Go through each of the items, if it's a div, extract it's token, if it's an
    // input field, extract it's value
    items.children().each(function(){
        console.log("Hi")
    });
    
    var value = items.children(":text")[0].value;
    console.log(value);
    
    return value;
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
        var query = crawlAndCollect($(".items"));
        //console.log(query);
        $.each(tokens, function(index, token){
            if (query.indexOf(token) >= 0) {
                console.log("Found " + token);
                caretStart = query.indexOf(token)
                var caretEnd = caretStart + token.length;
                console.log("The token is between "+ caretStart +" and " + caretEnd);
                query = query.substring(caretEnd,query.length);
                console.log("Query should be " + query);
                var $div = $('<div class="item" data-token="cuisine" data-value="chinese">'+token+'<a href="javascript:void(0)" class="remove" tabindex="-1" title="Remove">×</a></div>');
               

                // Query constructor
                var rest = $("#input-tags").clone();
                // $(".items").remove($("#input-tags"));
                $("#input-tags").before($div);
                $("#input-tags").val(query);

                console.log(token);
                // console.log(rest);
            }
        });
    });
});

