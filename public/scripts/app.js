/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Creates a DOM for the new tweet
  function createTweetElement(tweet) {
    let $article    = $('<article>');
    let $header     = $('<header>');
    let $footer     = $('<footer>');

    let $avatar     = $('<img>')
                        .addClass('avatar')
                        .attr('src', tweet.user.avatars.small);
    let $user       = $('<h2>')
                        .addClass('tweet-user')
                        .text(tweet.user.name);
    let $handle     = $('<h4>')
                        .text(tweet.user.handle)
                        .appendTo($header);

    let $content    = $('<p>')
                        .addClass('tweet-content')
                        .text(tweet.content.text);

    let $separator  = $('<hr>')
                        .addClass('tweet-separator');

    let $date       = $('<span>')
                        .text(convertDate(tweet.created_at));

    let $flag       = $('<span>')
                        .addClass('fas')
                        .addClass('fa-flag');

    let $retweet    = $('<span>')
                        .addClass('fas')
                        .addClass('fa-retweet');

    let $like       = $('<span>')
                        .addClass('fas')
                        .addClass('fa-heart');

    $header.append($avatar)
            .append($user)
            .append($handle);

    $footer.append($date)
            .append($flag)
            .append($retweet)
            .append($like);

    $article.append($header)
            .append($content)
            .append($separator)
            .append($footer);

    return $article;
  };

  // Renders tweets into index.html
  const renderTweets = (tweetsArr) => {
    for(let article of tweetsArr){
      $('.tweets-container')
        .prepend(createTweetElement(article));
    }
  };

  // Handles errors gracefully
  const errorValidation = (error) => {
    $('.error').text('');
    switch(error){
      case 'empty':
        $('.error')
            .text('Your tweet is empty!');
        $('textarea').on('focus', () => {
          $('.error').text('');
        });
        break;
      case 'too-many':
        $('.error')
            .text('You have too many characters!');
        break;
    }
  };

  // Resets the new tweet box
  const reset = () => {
    $('textarea').val('');
    $('.counter').text(140);
    $('.new-tweet').slideUp();
  };

  // Converts date into readable string
  const convertDate = (date) => {
    const dateReal = new Date(date);
    return dateReal.toString().substring(0, 21);
  };

  // Keeps track of the word count
  $('textarea').on('keyup', (event) => {
    let count = 140 - Number($(event.target)
                              .val().length);
    $('.counter').text(count);
    if(count < 0 && event.key.charCodeAt(0) !== 66){
      $('.counter').addClass('zero-count');
      errorValidation('too-many');
    }else if(count > 0){
      $('.counter').removeClass('zero-count');
      $('.error').text('');
    }
  });

  // Refreshes tweets from url
  const loadTweets = () => {
    $('.new-tweet').hide();
    $.ajax({
      url: '/tweets',
      type: 'GET'
    }).success(function (jsonContent) {
      renderTweets(jsonContent);
    });
  };

  // Creates a new tweet and resets on success
  const postTweet = (event) => {
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(event.target).serialize()
    }).success(function (data) {
      $('.tweets-container')
          .prepend(createTweetElement(data));
      reset();
    });
  };

  // Submits new tweet
  $('form').on('submit', (event) => {
    event.preventDefault();
    if($('textarea').val() === ''){
      errorValidation('empty');
   }else if($('textarea').val().length > 140){
      errorValidation('too-many');
    }else{
      postTweet(event);
    }
  });

  // Toggles the new tweet window
  $('button').on('click', (event) => {
    if($('section').hasClass('hidden')){
      $('.new-tweet').slideDown();
      $('textarea').focus();
      $('section').removeClass('hidden')
    }else{
      $('.new-tweet').slideUp();
      $('section').addClass('hidden')
    }
  });

  loadTweets();
});