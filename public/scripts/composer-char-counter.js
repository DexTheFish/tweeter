// all the vars named varObject should be renamed to $var

$(document).ready(function() { //triggers callback function when DOM has finished loading
  $("textarea").on('input', function() { //look for input to a DOM node with selector "textarea"
    const tweetElement = this; // this refers to an html element (<textarea>..</textarea>)
    const tweetObject  = $(tweetElement); //$(this) refers to its corresponding jQuery object
    const tweetLength  = tweetObject.val().length;
    let remainingChars = 140 - tweetLength;
    // access the counter by tree traversal:
    const formObject = tweetObject.parent();
    const counterObject = formObject.find(".counter");
    // set its value:
    counterObject.text(remainingChars);
    // check for eligible values:
    if (remainingChars < 0) {
      counterObject.addClass("long");
    }
    if (remainingChars >= 0) {
      counterObject.removeClass("long");
    }
  });
});