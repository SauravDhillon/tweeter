/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  //Event listener for the form submission
  $('.new-tweet-form').on('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Hide any visible error messages before validation
    const $errorMessage = $('.error-message');
    $errorMessage.slideUp();

    const $tweetInput = $(this).find('textarea[name="text"]');
    // trim() used to remove leading or trailing whitespace from input
    const tweetText = $tweetInput.val().trim(); 

    // Validate the tweet
    if (!tweetText) {
      $errorMessage.find('span').text('Your tweet cannot be empty.');
      $errorMessage.slideDown();
      return;
    }
    if (tweetText.length > 140) {
      $errorMessage.find('span').text('Too long. Plz rspct our arbitrary limit of 140 chars. #kthxbye.');
      $errorMessage.slideDown();
      return;
    }

    // Serialize form data into query string
    const formData = $(this).serialize();

    // Make an AJAX POST request to send the serialized data to the server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: function () {
        console.log('Tweet submitted successfully');
        //The loadTweets function is called after a successful tweet submission, which ensures the newly added tweet is displayed without needing to refresh the page.
        loadTweets(); 

        $('.new-tweet-form').trigger('reset'); // Clear the form

        // Reset the character count
        const $counter = $('.new-tweet .counter');
        $counter.text(140);
      },
      error: function (err) {
        console.log('Error submitting tweet:', err);
      },
    });
  });

  // Function to create a tweet element 
  const createTweetElement = function (tweet) {
    const $tweet = $(`
      <article class="tweet">
          <header>
            <div class="tweets-user-info">
              <img src="${tweet.user.avatars}" alt="Avatar of ${tweet.user.name}">
              <p>${tweet.user.name}</p>
            </div>
            <div class="user-id">
              <p>${tweet.user.handle}</p>
            </div>
          </header>
          <p>${$('<div>').text(tweet.content.text).html()}</p> 
          <hr>
          <footer>
            <p>${timeago.format(tweet.created_at)}</p>
            <div class="tweet-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
        `);
    return $tweet;
  };

  // Function to render an array of tweets to tweets container.
  const renderTweets = function (tweets) {
    const $tweetsContainer = $(".tweets-container");
    $tweetsContainer.empty(); // Clear the container before appending new tweets
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    });
  };

  // Function to fetch tweets from the server and render them
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function (tweets) {
        console.log("Tweets fetched successfully:", tweets);
        renderTweets(tweets);
      },
      error: function (err) {
        console.log("Error fecthing tweets:", err);
      },
    })
  };
  //When the page loads for the first time, there is no content in the .tweets-container. Calling loadTweets() retrieves the existing tweets from the server and renders them in the container.
  loadTweets();
});

