
(function trainer($) {

  $(function onDocReady() {
    hello("world");
  });

  function hello(message) {
    $('#updates').append($('<div>' + message + '</div>'));
  }

}(jQuery));
