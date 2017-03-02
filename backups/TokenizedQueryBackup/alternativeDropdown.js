// $('.input-tags').selectize({
//     // plugins: ['remove_button'],
//     persist: false,
//     create: true,
//     render: {
//         item: function(data, escape) {
//             return '<div class="dropdown"><button class="clickable btn btn-primary dropdown-toggle" data-toggle="dropdown" id="menu1" type="button" data-toggle="dropdown">"' + escape(data.text) + '"</div></div>';
//         }
//     }
// });

// $(".clickable").click(function(e){ 
//     e.preventDefault();
//     $('.dropdown').on('show.bs.dropdown', function(){
//         alert('The dropdown is about to be shown.');
//     });
//     $(this).append('<ul class="dropdown-menu" role="menu" aria-labelledby="menu1"></ul>');
//         $(".dropdown-menu").append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#">HTML</a></li>');
//         $(".dropdown-menu").append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#">CSS</a></li>');
//     console.log(this);
    
// });