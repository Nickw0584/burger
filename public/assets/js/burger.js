// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".create-form").on("submit", function(event) {
     event.preventDefault();
      console.log("submit")
     
      const newBurger= {
        burger_name: $("#newburger")
          .val()
          .trim(),
          devoured:0
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("Added new burger",);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".eatburger").on("click", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var id = $(this).data("id");
      var devouredState ={
        devoured: 1
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", + id, {
        type: "PUT",
        data: devouredState
      }).then(
        function() {
          console.log("Burger devoured");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
});