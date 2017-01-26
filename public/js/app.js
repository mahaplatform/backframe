(function() {
  if (location.search === '?cordova=true') {
    var ma = document.createElement('script');
    ma.type = 'text/javascript';
    ma.async = true;
    ma.src = '/js/cordova.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ma,s);
  }
})();
