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
    $(function() {

        $("#input")
            .autocomplete({
                source:[terms]
            });
    });