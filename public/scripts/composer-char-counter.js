$(document).ready(function () {
  // Targets the <textarea> element inside the .new-tweet section. This is more specific than simply using $("textarea"), which would select all textarea elements on the page 
  $(".new-tweet textarea").on("input", function () {
    // Get the current text in the textarea using $(this) which makes it
    // jquery object and gives access to .val()
    const currentText = $(this).val();

    // Calculate remaining characters
    const remainingChars = 140 - currentText.length;

    // Traverse the DOM: find the '.counter' inside the '.new-tweet' form
    const $counter = $(this).closest('.new-tweet').find('.counter');

    // Update the counter value
    $counter.text(remainingChars);

    // If the character counter is greater than 140, change the counter color to red
    if (remainingChars < 0) {
      $counter.addClass('red-counter');
    } else {
      $counter.removeClass('red-counter');
    }

  });
});