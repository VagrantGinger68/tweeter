// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */


$(document).ready(function() {

  $(".error").hide();
  $("#new-tweet-container").hide();

  const renderTweets = function(tweets) {
    $('#tweet-container').empty();
    for (let tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $('#tweet-container').append(newTweet);
    }
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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
      ${escape(tweet.content.text)}
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

    if (!tweetLength) {
      $(".error").slideUp("slow", function() {
        $("#error-message").html("Please enter a tweet!");
        $(".error").slideDown("slow");
      });
    } else if (tweetLength > 140) {
      $(".error").slideUp("slow", function() {
        $("#error-message").html("Tweet is too long! Make sure it is less than 140 characters.");
        $(".error").slideDown("slow");
      });
    } else {
      $(".error").slideUp("slow");
      const newTweet = $(this).serialize();
      $.post("/tweets/", newTweet, function() {
        $("#tweet-text").val("");
        $(".counter").val(140);
        loadTweets();
      });
    }
  });

  const loadTweets = function() {
    $.get("/tweets/", function(tweets) {
      renderTweets(tweets.reverse());
    });
  };

  loadTweets();

  $("#compose-button").click(function() {
    $("#new-tweet-container").slideDown("slow");
    $("#tweet-text").focus();
  });
});