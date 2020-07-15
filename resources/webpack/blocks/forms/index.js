import './index.sass';
import {player} from './../../pages/queue/index.js'
export default () => {
  $('#add-queue').on('submit', function(e){
    e.preventDefault();
    let link = $(this).find("input[name='link']").val()
    $.ajax({
      url: '/queue',
      method: 'POST',
      data:{
        link: link
      },
      success: function(){
        $.ajax({
          url: '/',
          success: function (result) {
            let old_length = $('#video-list').children().length;
            $('#video-list').html(result);
            let new_length = $('#video-list').children().length;
            if(old_length == 0 && new_length > old_length){
              player.loadVideoById($('#video-list .video-item .queue_link').first().attr('data-code'));
              player.playVideo();
            }
            $('#error').text('');
          }
        })
      },
      error: function(result){
        let err = JSON.parse(result.responseText)
        $('#error').text(err.message);
      }
    })
  })
};
