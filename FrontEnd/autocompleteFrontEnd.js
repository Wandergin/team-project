var relevantList =
    {
        "cuisine":["Chinese","Scottish","Japanese","Indian"],
        "location":["Glasgow","Edinburgh","Aberdeen","Dundee"],
        "covers":["for 2 people","for 3 people","for 4 people","for 6 people"],
        "time":["7pm","7:30pm","8pm","9pm"],
        "date":["January 26th","January 27th","January 28th","January 29th"]
    };

//First suggested category will be cuisine

var linkedList;

var times = [];

var terms = [];


function sendDataToServer(data, suggestCat, linkedList) {
    $.ajax({
        url:"http://localhost:5000/search",
        method:"GET",
        data:{"q":data}, // Lowercase
        success:function(res) {
            var changed = false;
            
            var response = JSON.parse(res);
            console.log(res);
            //Check if all categories (keys) have associated data
            //If yes, set data, mark current node as complete
            //If no, remove data, mark as incomplete
            //Will be incomplete by default but change is necessary when terms are deleted
            // console.log("This is the node in the linked list");
            // console.log(linkedList.searchNodeType('covers').data);
            // console.log("");
            // console.log("This is the response from the server.");
            // console.log(response.covers);
            // console.log("");
            // console.log("This is the comparison between the two.");
            // console.log((linkedList.searchNodeType('covers')).data[0] != response.covers[0]);
            

            if ((response.cuisine != "") && ((linkedList.searchNodeType('cuisine')).data[0] != response.cuisine[0])){
                console.log("cuisine???");
                (linkedList.searchNodeType('cuisine')).setData(response.cuisine);
                (linkedList.searchNodeType('cuisine')).markComplete();
                changed = true;
            } else if (response.cuisine == "" && (linkedList.searchNodeType('cuisine')).data != "") {
                (linkedList.searchNodeType('cuisine')).setData("");
                (linkedList.searchNodeType('cuisine')).markNotComplete();
            }

            if (response.location != "" && ((linkedList.searchNodeType('location')).data[0] != response.location[0])){
                console.log("location???");
                (linkedList.searchNodeType('location')).setData(response.location);
                (linkedList.searchNodeType('location')).markComplete();
                changed = true;
            } else if (response.cuisine == "" && (linkedList.searchNodeType('location')).data != "") {
                (linkedList.searchNodeType('location')).setData("");
                (linkedList.searchNodeType('location')).markNotComplete();
            }

            if (response.covers != "" && ((linkedList.searchNodeType('covers')).data[0] != response.covers[0])){
                console.log("covers???");
                (linkedList.searchNodeType('covers')).setData(response.covers);
                (linkedList.searchNodeType('covers')).markComplete();
                changed = true;
            } else if (response.cuisine == "" && (linkedList.searchNodeType('covers')).data != "") {
                (linkedList.searchNodeType('covers')).setData("");
                (linkedList.searchNodeType('covers')).markNotComplete();
            }

            if (response.date != "" && ((linkedList.searchNodeType('date')).data[0] != response.date[0])){
                console.log("date???");
                (linkedList.searchNodeType('date')).setData(response.date);
                (linkedList.searchNodeType('date')).markComplete();
                changed = true;
            } else if (response.cuisine == "" && (linkedList.searchNodeType('date')).data != "") {
                (linkedList.searchNodeType('date')).setData("");
                (linkedList.searchNodeType('date')).markNotComplete();
            }

            if (response.time != "" && ((linkedList.searchNodeType('time')).data[0] != response.time[0])){
                console.log("time???");
                (linkedList.searchNodeType('time')).setData(response.time);
                (linkedList.searchNodeType('time')).markComplete();
                changed = true;
            } else if (response.cuisine == "" && (linkedList.searchNodeType('time')).data != "") {
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
                } 
            }

            if (changed) updateSuggestionList(suggestCat, data);
        }
    });
    return suggestCat;
}

function updateSuggestionList(suggestedCategory, previousQuery) {
    console.log("Updating...");
    console.log("suggestedCategory: " + suggestedCategory.type);
    console.log("previousQuery: " + previousQuery);
    var type = suggestedCategory.type;
    var suggestionList = [];
    for (item in relevantList[type]) {
        suggestionList.push(previousQuery + " " + relevantList[type][item]);
    }

    console.log(suggestionList);
    jQuery('#input').autocomplete('destroy');

    $("#input").autocomplete({
        source:[suggestionList]
    });
    $('#input').focus();
}

$( document ).ready(function() {
    $('#input').focus();
    //Construct the linkedList for suggested categories to appear in query bar
    var linkedList = new LinkedList();  


    linkedList.add(1, 'cuisine');
    linkedList.add(2, 'covers');
    linkedList.add(3, 'date');
    linkedList.add(4, 'time');
    linkedList.add(5, 'location');
    linkedList.add(6, 'endpoint');

    console.log(linkedList);

    var suggestCat = linkedList.head;

    //linkedList.add(6, 'endpoint');



    // listening to keypress
    $(document).keyup(function(e) {
        if (((e.which > 47) && (e.which < 111)) || (e.which == 32)){
            sendDataToServer($("#input").val(), suggestCat, linkedList);
        }
        else if (e.which == 8) {
            console.log("backspace");
        }
        else if (e.which == 46) {
            console.log("delete");
        }

    });

    $(".xdsoft_autocomplete").click(function(){
        sendDataToServer($("#input").val(), suggestCat, linkedList);
    })

    // $("#input").autocomplete({
    //     source:[relevantList["cuisine"]]
    // });
    $('#input').focus();
        

});