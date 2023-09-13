// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */


$(document).ready(function() {

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $('#tweet-container').append(newTweet);
    }
  };
  
  const createTweetElement = function(tweet) {
    let $tweet = $(`
  <article class="tweet">
    <header>
      <div class="profile">
        <img src="${tweet.user.avatars}" alt="profile-pic">
        <span class="tweeter-name">${tweet.user.name}</span>
      </div>
      <div>
        <span class="user-handle">${tweet.user.handle}</span>
      </div>
    </header>
    <div class="tweet-content">
      ${tweet.content.text}
    </div>
    <footer>
      <span>${timeago.format(tweet.created_at)}</span>
      <div class="tweet-responses">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `);
    return $tweet;
  };

  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const tweetLength = $("#tweet-text").val().length;
    const maxLength = 140;

    if (!tweetLength) {
      alert("Please enter a tweet!");
    } else if (tweetLength > maxLength) {
      alert("Tweet is too long! Make it less than 140 characters.");
    } else {
      const newTweet = $(this).serialize();
      $.post("/tweets/", newTweet);
    }
  });

  const loadTweets = function() {
    $.get("/tweets/", function(tweets) {
      renderTweets(tweets);
    });
  };

  loadTweets();

});
