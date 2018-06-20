/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}


$(document).ready(function() {
  function createTweetElement(tweetData) {
    let $article = $('<article>');
    let $header = $('<header>');
    let $footer = $('<footer>');
    let $avatar = $('<img>').addClass('avatar').attr('src', tweetData.user.avatars.small);
    let $user = $('<h2>').addClass('tweet-user').text(tweetData.user.name);
    let $handle = $('<h4>').text(tweetData.user.handle).appendTo($header);
    let $content = $('<p>').addClass('tweet-content').text(tweetData.content.text);
    let $date = $('<p>').text(tweetData.created_at);
    $avatar.appendTo($header);
    $user.appendTo($header);
    $handle.appendTo($header);
    $header.appendTo($article);
    $content.appendTo($article);
    $date.appendTo($footer);
    $footer.appendTo($article);
    return $article;
  }


  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});