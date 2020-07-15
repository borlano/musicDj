import './index.sass';

export var player;
export default () => {
  // Load the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubePlayerAPIReady = function() {
    let default_code = $('#video-list .video-item .queue_link').first().attr('data-code');
    player = new YT.Player('ytplayer', {
      height: '500',
      width: '100%',
      videoId: default_code ?? $('#ytplayer').attr('data-default'),
      playerVars:{
        controls: 1,
        autoplay: 1,
      },
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  }
  window.onPlayerStateChange = function(event){
    if(event.data == YT.PlayerState.ENDED){
      let element_to_delete = $('#video-list .video-item').first();
      $.ajax({
        url: '/queue/' + element_to_delete.find('.queue_link').attr('data-id'),
        method: 'DELETE',
        success: function(){
          element_to_delete.remove();
          player.loadVideoById($('#video-list .video-item .queue_link').first().attr('data-code') ?? $('#ytplayer').attr('data-default'));
          player.playVideo();
        }
      })
    }
  }
  setInterval(() => {
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
      }
    })
  }, 5000);
};
