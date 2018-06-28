$(document).ready(function(){


var superheros = ["Supergirl", "The Flash", "Wonder Women", "Batman", "Justice League", "Superman", 
                  "Thor", "The Avengers", "Captain America", "The Hulk", "Iron Man"
]

function display(){
    var gif = $(this).attr("data-name");
    console.log(gif);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=pR7dC7LdhQcWZMNoB72jRudELla7MUZ7&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        console.log(response);
        console.log(response.data.length);
       
        var rating;
        var p1; 
        var imgUrl;
        var still ;
        var animated;
       

        for(var i =0; i<response.data.length; i++){ 
            var gifDiv = $('<div class="gif">'); 

            rating = response.data[i].rating;
            console.log(rating);

            p1 = $("<p>").text("Rating: " + rating);

            gifDiv.append(p1);

            imgUrl = response.data[i].images.fixed_height_still.url;
            still = response.data[i].images.fixed_height_still.url;
            animated = response.data[i].images.fixed_height.url;
            console.log(imgUrl);

            images = $("<img>").attr("src", imgUrl);
            images.attr("data-still", still);
            images.attr("data-animated", animated);
            images.addClass("images");
            images.attr("data-state", "still");

            gifDiv.append(images);

            $(".gif-view").append(gifDiv);
        }
    })

    

}


function buttonsDisplay(){
    $("#buttons").empty();

    for(var i=0; i<superheros.length; i++){

        var b = $("<button>");

        b.addClass("bn");

        b.attr("data-name", superheros[i]);

        b.text(superheros[i]);
        
        $("#buttons").append(b);
    }
}

$("#add-gif").on("click", function(event){
    event.preventDefault();

    var gifs = $("#Add").val().trim();
    superheros.push(gifs);
    buttonsDisplay();
});





$(document).on("click", ".bn", display);
buttonsDisplay();

$(".images").on("click", function() {
        
    var state = $(this).attr("data-state");
    
    if (state === "still") {
    var x= $(this).attr("src", $(this).attr("data-animated"));
    var y =$(this).attr("data-state", "animated");
    console.log(x);
    console.log(y);
    console.log("animate");
    } else {
    var z=  $(this).attr("src", $(this).attr("data-still"));
    var j= $(this).attr("data-state", "still");
    console.log(z);
    console.log(j);
    console.log("pause");
    }
});

});