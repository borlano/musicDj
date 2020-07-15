import './index.sass';

export default () => {
  setInterval(() => {
    $.ajax({
      url: '/',
      success: function (result) {
        $('#video-list').html(result)
      }
    })
  }, 5000);
  let item = $('#video-list .video-item .queue_link').first();
  if(item){
    $('#video iframe').attr('src', item.html() + '?controls=1&autoplay=1')
  }else{
    $('#video iframe').attr('src', $('#video').attr('data-default'))
  }
};
