!function ($) {
  var socket = false;

  var registerSocketIO = function() {
    socket = io();

    $('#btnTitle').css({'color':'orange'});

    socket.emit('lb-connect', 'Connected to portlet ...')

    socket.on('lb-state', function (msg) {
      $('.shutdown').css('fill', msg == 1 ? 'red' : 'lightgreen');
    })
    .on('disconnect', function () {
      $('#btnTitle, .shutdown').css({'color':'#6A5F4D', 'fill': '#6A5F4D'});
    });
  }

  var registerSVG = function () {
    jQuery('img.svg').each( function () {
      var $img = jQuery(this),
          imgID = $img.attr('id'),
          imgClass = $img.attr('class'),
          imgURL = $img.attr('src');

      jQuery.get(imgURL, function (data) {
          var $svg = jQuery(data).find('svg');
          if (typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
          }
          if (typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass+' replaced-svg');
          }
          $img.replaceWith($svg);
      }, 'xml');
    });
  }
  
  var register = function () {
    registerSocketIO();
    registerSVG();

    $(document).on('click', 'a, .svg', function (event) {
      if ($(this).parents().prop('class')=='col-xs-4 lbox') {
        $.post('http://127.0.0.1:8080/sarah/LiveboxRemote/?cmd='+$(this).text().trim());
      }
    });
  }

  $(document).ready(function () {
    register();
  });
  
} (jQuery);


