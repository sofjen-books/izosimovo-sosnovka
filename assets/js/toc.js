document.addEventListener('DOMContentLoaded', function () {
  var content = document.getElementById('content');
  var tocList = document.getElementById('toc-list');
  if (!content || !tocList) return;

  var headings = content.querySelectorAll('h1, h2, h3');
  if (headings.length === 0) {
    document.getElementById('toc-sidebar').style.display = 'none';
    return;
  }

  var items = [];
  var activeLink = null;

  headings.forEach(function (h) {
    var id = h.id || h.textContent.trim().toLowerCase().replace(/[^a-zа-яё0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!h.id) h.id = id;

    var li = document.createElement('li');
    li.className = 'toc-' + h.tagName.toLowerCase();

    var a = document.createElement('a');
    a.href = '#' + id;
    a.textContent = h.textContent.trim();
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', '#' + id);
      }
    });

    li.appendChild(a);
    tocList.appendChild(li);
    items.push({ el: li, link: a, id: id });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        items.forEach(function (item) {
          if (item.id === id) {
            item.link.classList.add('active');
            activeLink = item.link;
          } else {
            item.link.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

  headings.forEach(function (h) { observer.observe(h); });

  var hash = window.location.hash;
  if (hash) {
    var el = document.getElementById(hash.slice(1));
    if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
  }
});
