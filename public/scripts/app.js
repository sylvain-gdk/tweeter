/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
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

  function renderTweets(tweet){
    for(let article of tweet){
      var $tweet = createTweetElement(article);
      $('#tweets-container').append($tweet);
    }
  }

  function convertDate(date){
    const dateReal = new Date(date);
    return dateReal.toString().substring(0, 21);
  }

  function loadTweets(){
    $('.new-tweet').hide();
    $.ajax({
        url: '/tweets',
        type: 'GET'
    }).success(function (jsonContent) {
        renderTweets(jsonContent);
    });
  }

  $('form').on('submit', (event) => {
    event.preventDefault();
    const me = [
      {
        user: {
          name: 'Me',
          avatars: {
            small: '/images/avatar.png',
            regular: '',
            large: ''
          },
          handle: '@dev'
        },
        content:{
          text: $('textarea').val()
        },
        created_at: Date.now()
      }
    ];
    if($('textarea').val() === ''){
      alert('Your tweet is empty!');
    }else{
      $.ajax({
          method: 'POST',
          url: '/tweets',
          data: $(event.target).serialize()
      }).success(function () {
          renderTweets(me);
          $('textarea').val('');
          $('.counter').text(140);
          $('.new-tweet').slideUp();
      });
    }
  });

  $('button').on('click', (event) => {
    $('.new-tweet').slideDown();
    $('textarea').focus();
  });

  loadTweets();
});