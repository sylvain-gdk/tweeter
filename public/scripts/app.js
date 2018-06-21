/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Creates a DOM for the new tweet
  function createTweetElement(tweet) {
    let $article = $('<article>');
    let $header = $('<header>');
    let $footer = $('<footer>');
    let $avatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars.small);
    let $user = $('<h2>').addClass('tweet-user').text(tweet.user.name);
    let $handle = $('<h4>').text(tweet.user.handle).appendTo($header);
    let $content = $('<p>').addClass('tweet-content').text(tweet.content.text);
    let $separator = $('<hr>').addClass('tweet-separator');
    let $date = $('<p>').text(convertDate(tweet.created_at));
    $avatar.appendTo($header);
    $user.appendTo($header);
    $handle.appendTo($header);
    $header.appendTo($article);
    $content.appendTo($article);
    $separator.appendTo($article);
    $date.appendTo($footer);
    $footer.appendTo($article);

    return $article;
  }

  // Renders tweets into html page
  function renderTweets(tweetsArr){
    for(let article of tweetsArr){
      $('#tweets-container').prepend(createTweetElement(article));
    }
  }

  // Converts date into readable string
  function convertDate(date){
    const dateReal = new Date(date);
    return dateReal.toString().substring(0, 21);
  }

  // Loads/renders tweets from database
  function loadTweets(){
    $('.new-tweet').hide();
    $.ajax({
      url: '/tweets',
      type: 'GET'
    }).success(function (jsonContent) {
      renderTweets(jsonContent);
    });
  }

  // Submits new tweet on click
  $('form').on('submit', (event) => {
    event.preventDefault();
    if($('textarea').val() === ''){
      alert('Your tweet is empty!');
      $('textarea').focus();
   }else if($('textarea').val().length > 140){
      alert('You have too many characters!')
      $('textarea').focus();
    }else{
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(event.target).serialize()
      }).success(function (data) {
        $('#tweets-container').prepend(createTweetElement(data));
        $('textarea').val('');
        $('.counter').text(140);
        $('.new-tweet').slideUp();
      });
    }
  });

  // Toggles the new tweet window
  $('button').on('click', (event) => {
    $('.new-tweet').slideDown();
    $('textarea').focus();
  });

  loadTweets();
});