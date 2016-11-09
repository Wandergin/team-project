    numberOfButtons = 0;
    numberOfGroups = 0;
    colors = [
        "lime darken-2",
        "lime",
        "lime lighten-2",
        "lime accent-4",
        "light-blue darken-4",
        "light-blue darken-2",
        "light-blue",
        "light-blue lighten-2",
        "deep-orange darken-1"
    ];
    query = "";

    cuisines = ["indian","morrocan","chinese", "british"];
    locations = ["glasgow", "edinburgh"];
    queryJson = {};
    var specifiedCousine = false;
    var specifiedPeopleCount = false;
    var specifiedTime = false;
    var specifiedLocation = false;


    // function appendToQuery(term) {

    //     if (query !== "") {
    //         query += " OR " + term;
    //     }
    //     else {
    //         query += term;
    //     }
    //     $("#query").html(query);
    // }


    function clearQuery(){
        query = "";
        numberOfButtons = 0;
        numberOfGroups = 0;
        $("#query").html(query);
        $(".queries").children().remove();
    }

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');



    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    // function sendRequest(query){
    //     $('#loading_modal').openModal();
    //     $.ajax({
    //         url: "/sysrev/review/"+$("#reviewValue").text()+"/stage1",
    //         //url: "localhost:8000/sysrev/review/1/stage1",
    //         type: "POST",
    //         data: {query: query},
    //         beforeSend: function(xhr, settings) {
    //             if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
    //                 xhr.setRequestHeader("X-CSRFToken", csrftoken);
    //             }
    //         },
    //         success: function(){
    //             window.location.href = "/sysrev/review/"+$("#reviewValue").text()+"/stage2/1";
    //         },
    //         error: function(){
    //             $('#loading_modal').closeModal();
    //             $('#error').html("There was an error with your query, please try again.");
    //         }
    //     });
    // }


    $( document ).ready(function(){

        $("#query").css("margin-left","10px"); 

        $(document).keypress(function(e) {

            if(e.which == 13) {
                query = $("#query").val();
                query = query.split(" ");
                //console.log("query submitted: " + query );
                //console.log(cuisines);
                for (var i = 0; i < query.length; i++) {

                    if (query[i][query[i].length-1] == ","){

                        query[i] = query[i].substring(0,query[i].length-1);
                    }

                    for (var j = 0; j < cuisines.length; j++) {
                        if (cuisines[j] == query[i].toLowerCase()) {
                            console.log("Cuisine: " + query[i]);
                            queryJson.cuisine = query[i];
                            specifiedCousine = true;
                        }
                    }
                    for (var j = 0; j < locations.length; j++) {
                        if (locations[j] == query[i].toLowerCase()) {
                            console.log("Location: " + query[i]);
                            queryJson.location = query[i];
                            specifiedLocation = true;
                        }
                    }
                    if (query[i].match("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]|AM|PM|am|pm$")) {
                        console.log("Time: "+query[i]);
                        queryJson.time = query[i];
                        specifiedTime = true;
                    }
                    if (query[i].toLowerCase() == "people" || query[i].toLowerCase() == "person"){
                        console.log("People count: " + query[i-1]); 
                        queryJson.peopleCount = query[i-1];
                        specifiedPeopleCount = true;
                    }



                }
                if (!specifiedCousine) {
                    console.log("cuisine: any");
                }
                if (!specifiedTime) {
                    console.log("Time: any");
                }
                if (!specifiedLocation) {
                    console.log("Location: none");
                }
                if (!specifiedPeopleCount) {
                    console.log("People count: any");
                }

                console.log(queryJson);
                console.log("_________________\n");


            }

        });

    });