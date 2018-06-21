
$(document).ready(function() {

  // Keeps track of the word count
  $('textarea').on('keyup', (event) => {
    let count = 140 - Number($(event.target).val().length);
    $('.counter').text(count);
    if(count < 0 && event.key.charCodeAt(0) !== 66){
      $('.counter').addClass('zero-count');
      alert('You have too many characters!')
      $('textarea').focus();
      event.preventDefault();
    }else if(count > 0){
      $('.counter').removeClass('zero-count');
    }
  });
});
