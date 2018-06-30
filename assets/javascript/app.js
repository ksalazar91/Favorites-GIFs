
$(document).ready(function(){
    
    //holds the name of the giphys that are going to be display 
    var superheros = ["Supergirl", "The Flash", "Wonder Women", "Batman", "Justice League", "Superman", 
                      "Thor", "The Avengers", "Captain America", "The Hulk", "Iron Man"
    ]
    
    var temp=[];
    var count = [];
    var offset=0;

    function newGif(gif){
        if(temp.indexOf(gif) === -1){
            temp.push(gif);
            count.push(0);
        }
        else{
            var x = temp.indexOf(gif);
            count[x] += 10;
            offset = count[x];
        }

    }
    
   
    // display giphy to the DOM
    function display(){
        //$(".gif-view").empty();
        var gif = $(this).attr("data-name");
        offset = 0;
        newGif(gif);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=pR7dC7LdhQcWZMNoB72jRudELla7MUZ7&offset=" + offset + "&limit=10";
    
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
           
            var rating;
            var p1; 
            var imgUrl;
            var still ;
            var animated;
    
            for(var i =0; i<response.data.length; i++){ 
                var gifDiv = $('<div class="gif">'); 
    
                rating = response.data[i].rating;
                
    
                p1 = $("<p>").text("Rating: " + rating);
    
                gifDiv.append(p1);

                if(window.matchMedia("(max-width: 400px)").matches){
                    imgUrl = response.data[i].images.fixed_width_still.url;
                    still = response.data[i].images.fixed_width_still.url;
                    animated = response.data[i].images.fixed_width.url
                    console.log("small");
                }
                else{
                    imgUrl = response.data[i].images.fixed_height_still.url;
                    still = response.data[i].images.fixed_height_still.url;
                    animated = response.data[i].images.fixed_height.url;
                }
    
              
                
    
                images = $("<img>").attr("src", imgUrl);
                images.attr("data-still", still);
                images.attr("data-animated", animated);
                images.addClass("images");
                images.attr("data-state", "still");
    
                gifDiv.append(images);
    
                $(".gif-view").prepend(gifDiv);
            }
        })  
    }
    
    //displays the buttons to the DOM
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
    
    // adds a new giphy when we do click to the add button
    $("#add-gif").on("click", function(event){
        event.preventDefault();
    
        var gifs = $("#Add").val().trim();

        if(superheros.indexOf(gifs) === -1){
            superheros.push(gifs);
            buttonsDisplay();
        }
        else{
            alert("That superhero is alrady done. Try another.")
        }
        
    });
    
//calls the display function when we do click
    $(document).on("click", ".bn", display);
    buttonsDisplay();
 
    
    //pauses and animates the the giphy
    $(document).on("click", ".images", function() {
        //gets the images state 
        var state = $(this).attr("data-state");

        //checks if the ghipy is still and  if it is it animates the giphy
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animated");
        } 
        
        //if the ghipy is animated it will pause it
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });// end of the 
    

}); // end of the on ready document

//https://ksalazar91.github.io/Responsive-Portfolio/portfolio.html