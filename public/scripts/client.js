// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */


$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];



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
      <span>${tweet.created_at}</span>
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


  renderTweets(data);
});
