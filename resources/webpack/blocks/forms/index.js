import './index.sass';

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
            $('#video-list').html(result)
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
