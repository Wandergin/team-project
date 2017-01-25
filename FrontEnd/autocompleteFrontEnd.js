var locations = [
        "Glasgow",
        "Edinburgh",
        "Aberdeen",
        "Dundee"
    ];

var times = []

var terms = [];

var response = '{"date": "", "cuisine": ["chinese"], "location": [], "covers": "", "time": ""}';

function sendDataToServer(data) {
    $.ajax({
        url:"http://localhost:5000/search",
        method:"GET",
        data:{"q":data},
        success:function(res) {
            console.log(JSON.parse(res));
            if (res != response){
                response = JSON.parse(res);;
                updateSuggestionList(locations, data);
            }

        }
    });
}


function updateSuggestionList(relevantList, previousQuery) {
    var suggestionList = [];
    for (key in relevantList) {
        suggestionList.push(previousQuery + " " + locations[key]);
    }
    jQuery('#input').autocomplete('destroy');
    $("#input").autocomplete({
        source:[suggestionList]
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
        console.log(e.which);
        if ((e.which > 47) && (e.which < 111)){
            console.log("Yay")
            sendDataToServer($("#input").val());
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