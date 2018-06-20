let count = 140;

$(document).ready(function() {
  $('textarea').on('keydown', (event) => {
    if(event.key.charCodeAt(0) > 31 &&
      event.key.charCodeAt(0) < 127 &&
      event.key.charCodeAt(0) !== 66){
      if(count > 0){
        count = count - 1;
      }if(count === 0){
        $('.counter').addClass('zero-count');
      }
    }else if(event.key.charCodeAt(0) === 66){
      if(count < 140){
        count = count + 1
      }if(count > 0){
        $('.counter').removeClass('zero-count');
      }
    }
    if(($(event.target).val().length < 0 || $(event.target).val().length > 140) && event.key.charCodeAt(0) !== 66){
      event.preventDefault();
    }else {
      $('.counter').text(count);
    }
  });
});
