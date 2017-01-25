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
    //Construct the linkedList for suggested categories to appear in query bar
    var linkedList = new LinkedList();


    linkedList.add(1, 'cuisine');
    linkedList.add(2, 'location');
    linkedList.add(3, 'rating');
    linkedList.add(4, 'people');
    linkedList.add(5, 'time');

    //First suggested category will be cuisine
    var suggestCat = (linkedList.head);

    var queryText = $("#input").val();



    console.log("suggestedNode: " + suggestCat.type);
    suggestCat.setType("NEW");
    console.log("suggestedNode type: " + suggestCat.type);
    suggestCat.markComplete();
    console.log("suggestedNode complete: " + suggestCat.completed);
    suggestCat.markNotComplete();
    console.log("suggestedNode not complete: " + suggestCat.completed);
    suggestCat.setData("ALTERED DATA");
    console.log("suggestedNode: " + suggestCat.data);
    console.log((linkedList.searchNodeType('rating')).next);


    linkedList.show();

    //Send entered data to backend to check if the typed term matches any of the terms in server's lists
    // listening to keypress
    $(document).keyup(function(e) {
        console.log(e);

        queryText = $("#input").val();
        console.log("queryText = " + queryText);
        sendDataToServer(queryText);

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