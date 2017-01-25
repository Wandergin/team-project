var relevantList =
    {
        "cuisine":["Chinese","Scottish","Japanese","Indian"],
        "location":["Glasgow","Edinburgh","Aberdeen","Dundee"],
        "covers":["January 26th","January 27th","January 28th","January 29th"],
        "time":["7pm","7:30pm","8pm","9pm"],
        "date":["January 26th","January 27th","January 28th","January 29th"]
    };

//First suggested category will be cuisine

var linkedList;

var times = [];

var terms = [];

var response = '{"date": "", "cuisine": [], "location": [], "covers": "", "time": ""}';

function sendDataToServer(data, suggestCat, linkedList) {
    console.log(linkedList);
    $.ajax({
        url:"http://localhost:5000/search",
        method:"GET",
        data:{"q":data},
        success:function(res) {
            var changed = false;
            console.log("Successfully sent data.");
            console.log(res);
            
            var response = JSON.parse(res);

            //Check if all categories (keys) have associated data
            //If yes, set data, mark current node as complete
            //If no, remove data, mark as incomplete
            //Will be incomplete by default but change is necessary when terms are deleted

            if ((linkedList.searchNodeType('cuisine')).data != response.cuisine){
                console.log("cuisine???");
                (linkedList.searchNodeType('cuisine')).setData(response.cuisine);
                (linkedList.searchNodeType('cuisine')).markComplete();
                changed = true;
            } else {
                (linkedList.searchNodeType('cuisine')).setData("");
                (linkedList.searchNodeType('cuisine')).markNotComplete();
            }

            if ((linkedList.searchNodeType('location')).data != response.location){
                console.log("location???");
                (linkedList.searchNodeType('location')).setData(response.location);
                (linkedList.searchNodeType('location')).markComplete();
                changed = true;
            } else {
                (linkedList.searchNodeType('location')).setData("");
                (linkedList.searchNodeType('location')).markNotComplete();
            }

            if ((linkedList.searchNodeType('covers')).data != response.covers){
                (linkedList.searchNodeType('covers')).setData(response.covers);
                (linkedList.searchNodeType('covers')).markComplete();
                changed = true;
            } else {
                (linkedList.searchNodeType('covers')).setData("");
                (linkedList.searchNodeType('covers')).markNotComplete();
            }

            if ((linkedList.searchNodeType('date')).data != response.date){
                (linkedList.searchNodeType('date')).setData(response.date);
                (linkedList.searchNodeType('date')).markComplete();
                changed = true;
            } else {
                (linkedList.searchNodeType('date')).setData("");
                (linkedList.searchNodeType('date')).markNotComplete();
            }

            if ((linkedList.searchNodeType('time')).data != response.time){
                (linkedList.searchNodeType('time')).setData(response.time);
                (linkedList.searchNodeType('time')).markComplete();
                changed = true;
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
                } 
            }
            if (changed) updateSuggestionList(suggestCat, data);
        }
    });
    return suggestCat;
}

function updateSuggestionList(suggestedCategory, previousQuery) {
    var type = suggestedCategory.type;
    console.log(type);
    var suggestionList = [];
    console.log(relevantList[type]);
    for (item in relevantList[type]) {
        suggestionList.push(previousQuery + " " + relevantList[type][item]);
    }
    jQuery('#input').autocomplete('destroy');
    $("#input").autocomplete({
        source:[suggestionList]
    });
}

$( document ).ready(function() {
    //Construct the linkedList for suggested categories to appear in query bar
    var linkedList = new LinkedList();  


    linkedList.add(1, 'cuisine');
    linkedList.add(2, 'location');
    linkedList.add(3, 'covers');
    linkedList.add(4, 'date');
    linkedList.add(5, 'time');
    linkedList.add(6, 'endpoint');

    console.log(linkedList);

    var suggestCat = linkedList.head;

    //linkedList.add(6, 'endpoint');


    var queryText = $("#input").val();


    linkedList.show();

    //Send entered data to backend to check if the typed term matches any of the terms in server's lists
    // listening to keypress
    $(document).keyup(function(e) {
        if ((e.which > 47) && (e.which < 111)){
            sendDataToServer($("#input").val(), suggestCat, linkedList);
        }
        else if (e.which == 8) {
            console.log("backspace");
        }
        else if (e.which == 46) {
            console.log("delete");
        }

    });

    // Initialize autocomplete

});