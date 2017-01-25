var locations = [
        "Glasgow",
        "Edinburgh",
        "Aberdeen",
        "Dundee"
    ];

//First suggested category will be cuisine

var linkedList;

var times = [];

var terms = [];

var response = '{"date": "", "cuisine": [], "location": [], "covers": "", "time": ""}';

function sendDataToServer(data, linkedList, suggestCat) {
    console.log(suggestCat);
    var response = $.ajax({
        url:"http://localhost:5000/search",
        method:"GET",
        data:{"q":data},
        success:function(res) {
                    }
    });

    console.log("Successfully sent data.");
    console.log(response)
    //response = JSON.parse(response);

    //Check if all categories (keys) have associated data
    //If yes, set data, mark current node as complete
    //If no, remove data, mark as incomplete
    //Will be incomplete by default but change is necessary when terms are deleted

    if (response.cuisine != ""){
        (linkedList.searchNodeType('cuisine')).setData(response.cuisine);
        (linkedList.searchNodeType('cuisine')).markComplete();
    } else {
        (linkedList.searchNodeType('cuisine')).setData("");
        (linkedList.searchNodeType('cuisine')).markNotComplete();
    }

    if (response.location != ""){
        (linkedList.searchNodeType('location')).setData(response.location);
        (linkedList.searchNodeType('location')).markComplete();
    } else {
        (linkedList.searchNodeType('location')).setData("");
        (linkedList.searchNodeType('location')).markNotComplete();
    }

    if (response.rating != ""){
        (linkedList.searchNodeType('rating')).setData(response.rating);
        (linkedList.searchNodeType('rating')).markComplete();
    } else {
        (linkedList.searchNodeType('rating')).setData("");
        (linkedList.searchNodeType('rating')).markNotComplete();
    }

    if (response.people != ""){
        (linkedList.searchNodeType('people')).setData(response.people);
        (linkedList.searchNodeType('people')).markComplete();
    } else {
        (linkedList.searchNodeType('people')).setData("");
        (linkedList.searchNodeType('people')).markNotComplete();
    }

    if (response.time != ""){
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
    updateSuggestionList(suggestCat, data);


    console.log(suggestCat);
    return suggestCat;
}

function updateSuggestionList(suggestedCategory, previousQuery) {
    console.log(suggestedCategory);
    // var suggestionList = [];
    // for (key in relevantList) {
    //     suggestionList.push(previousQuery + " " + locations[key]);
    // }
    // jQuery('#input').autocomplete('destroy');
    // $("#input").autocomplete({
    //     source:[suggestionList]
    // });
}

$( document ).ready(function() {
    //Construct the linkedList for suggested categories to appear in query bar
    var linkedList = new LinkedList();
    var suggestCat = linkedList.head;    


    linkedList.add(1, 'cuisine');
    linkedList.add(2, 'location');
    linkedList.add(3, 'rating');
    linkedList.add(4, 'people');
    linkedList.add(5, 'time');


    var queryText = $("#input").val();


    linkedList.show();

    //Send entered data to backend to check if the typed term matches any of the terms in server's lists
    // listening to keypress
    $(document).keyup(function(e) {
        console.log(e.which);
        if ((e.which > 47) && (e.which < 111)){
            console.log("Yay")
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