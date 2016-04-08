!function ($) {
  var lbSock = false,
      stby;

  var registerSocketIO = function() {
    lbSock = io();
    lbSock.on('lb-connected', function(callback) {
      $('#btnTitle').css({'color':'orange'});
      callback('connected to portlet');
    });
    lbSock.on('lb-state', function (msg) {
      stby = msg;
      if (msg) $('.shutdown').css('fill', msg == 0 ? 'lightgreen' : 'red');
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
        var lbPost = 'http://127.0.0.1:8080/sarah/LiveboxRemote/?cmd='+ $(this).text().trim();
        if ($(this).text().trim() == 'Shutdown')
          lbPost = lbPost + '&stby=' + (1-stby);
        $.post('http://127.0.0.1:8080/sarah/LiveboxRemote/?cmd='+ $(this).text().trim());
      }
    });
  }

  $(document).ready(function () {
    register();
  });
  
} (jQuery);


