/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Function to validate tweet text
  const isTweetValid = function (tweetText) {
    if (!tweetText) {
      alert("Tweet is empty! Please write something before submitting.");
      return false;
    }
  
    if (tweetText.length > 140) {
      alert("Your tweet exceeds maximum character limit of 140");
      return false;
    }

    return true;
  };
  //Event listener for the form submission
  $('.new-tweet-form').on('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const $tweetInput = $(this).find('textarea[name="text"]');
    const tweetText = $tweetInput.val().trim(); // trim() used to remove leading or trailing whitespace from input

    if (!isTweetValid(tweetText)) {
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
        loadTweets();
        $('.new-tweet-form').trigger('reset'); // Clear the form
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
          <p>${tweet.content.text}</p>
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
      $tweetsContainer.append($tweet);
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
  loadTweets();
});

