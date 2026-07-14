document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('sup[id^="fnref"] a').forEach(function (ref) {
    var fnId = ref.getAttribute('href').replace('#', '');
    var fnEl = document.getElementById(fnId);
    if (fnEl) {
      var text = fnEl.textContent.replace('↩', '').trim();
      ref.setAttribute('title', text);
    }
  });
});
