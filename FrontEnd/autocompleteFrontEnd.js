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

            var response = $.parseJSON(res);

            //Check if all categories (keys) have associated data
            //If yes, set data, mark current node as complete
            //If no, remove data, mark as incomplete
            //Will be incomplete by default but change is necessary when terms are deleted

            if (res.cuisine != ""){
                (linkedList.searchNodeType('cuisine')).setData(response.cuisine);
                (linkedList.searchNodeType('cuisine')).markComplete();
            } else {
                (linkedList.searchNodeType('cuisine')).setData("");
                (linkedList.searchNodeType('cuisine')).markNotComplete();
            }

            if (res.location != ""){
                (linkedList.searchNodeType('location')).setData(response.location);
                (linkedList.searchNodeType('location')).markComplete();
            } else {
                (linkedList.searchNodeType('location')).setData("");
                (linkedList.searchNodeType('location')).markNotComplete();
            }

            if (res.rating != ""){
                (linkedList.searchNodeType('rating')).setData(response.rating);
                (linkedList.searchNodeType('rating')).markComplete();
            } else {
                (linkedList.searchNodeType('rating')).setData("");
                (linkedList.searchNodeType('rating')).markNotComplete();
            }

            if (res.people != ""){
                (linkedList.searchNodeType('people')).setData(response.people);
                (linkedList.searchNodeType('people')).markComplete();
            } else {
                (linkedList.searchNodeType('people')).setData("");
                (linkedList.searchNodeType('people')).markNotComplete();
            }

            if (res.time != ""){
                (linkedList.searchNodeType('time')).setData(response.time);
                (linkedList.searchNodeType('time')).markComplete();
            } else {
                (linkedList.searchNodeType('time')).setData("");
                (linkedList.searchNodeType('time')).markNotComplete();
            }

            //See which nodes are marked as incomplete
            //Set first incomplete node found as next in-box suggestion category
            for (var i = 0; i <= linkedList._length; i++){
                if (suggestCat.completed == true){
                    suggestCat = suggestCat.next;
                //i == linkedList._length only if all nodes are marked complete
                //Set suggestCat as null, nothing more to suggest
                } else if (i == linkedList._length){
                    suggestCat = null;
                }
            }

        }
    });
}

function

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