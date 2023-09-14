$(document).ready(function() {

  //Check that tweet is correct amount of characters
  $("#tweet-text").on("input", function(event) {
    const startingChar = 140;
    const inputLength = ($(this).val().length);
    const charCounter = startingChar - inputLength;
    const counter = $(this).parent().find(".counter");

    counter.text(charCounter);

    if (charCounter < 0) {
      counter.addClass("red-counter");
    } else {
      counter.removeClass("red-counter");
    }
  });

});