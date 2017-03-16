tokens = ["Chinese","table for 2"];

function crawlAndCollect() {
    
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
        var query = $("#input-tags").val();
        //console.log(query);
        $.each(tokens, function(index, token){
            if (query.indexOf(token) >= 0) {
                console.log("Found " + token);
            }
        });
    });
});

