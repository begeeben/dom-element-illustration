  $(function() {
    $( ".draggable" ).draggable();
  });

$(document).ready(function() {
        $(".draggable").draggable();
        $('body>div').bind("dragstart", function(event, ui){
        event.stopPropagation();
        });
    });