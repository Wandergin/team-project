var terms = [ 
        "table",
        "table for 2 people", 
        "table for 2 people in Glasgow",
        "table for 2 people in Edinburgh",
        "2 people Glasgow 7pm",
        "Scottish cousine",
        "Scottish cousine Glasgow",
        "Scottish cousine Glasgow 2 people",
        "Scottish cousine Glasgow 2 people 8pm"
    ];


function sendDataToServer(data) {
    $.ajax({
        url:"http://localhost:5000/search",
        method:"GET",
        data:{"q":data},
        success:function(res) {
            console.log("Successfully sent data.");
            console.log(res);
        }
    });
}

$( document ).ready(function() {
    
    var test = new LinkedList();

    test.add(1, 'cuisine');
    test.add(2, 'location');
    test.add(3, 'rating');
    test.add(4, 'people');
    test.add(5, 'time');

    console.log(test);


    // listening to keypress
    $(document).keyup(function(e) {
        console.log(e);
        sendDataToServer($("#input").val());
        switch(e.which){
            case 8:
                console.log("backspace");
                break; 
            
            case 46:
                console.log("delete");
                break;
            
            case 39:
                console.log("User autocompleted the term.");
                break;
            
            default:
                console.log($("#input").val());
                break;
        }
    });

    // Initialize autocomplete
    $("#input").autocomplete({
            source:[terms]
        });

});