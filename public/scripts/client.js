/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  //Event listener for the form submission
  $('.new-tweet-form').on('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Serialize form data into query string
    const formData = $(this).serialize();

    // Make an AJAX POST request to send the serialized data to the server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: function () {
        console.log('Tweet submitted successfully');
      },
      error: function (err) {
        console.log('Error submitting tweet:', err);
      },
    });
  });
});

$(document).ready(function () {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];


  // Function to render an array of tweets to tweets container.
  const renderTweets = function (tweets) {
    const $tweetsContainer = $(".tweets-container");
    $tweetsContainer.empty(); // Clear the container before appending new tweets
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    });
  };

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
          <p>${tweet.created_at}</p>
          <div class="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`);
    return $tweet;
  };

  renderTweets(data);
});