document.addEventListener('DOMContentLoaded', function () {
  var chapters = [
    { title: 'Тихая моя родина', url: '/' },
    { title: 'Глава 1: С чего всё начиналось', url: '/chapters/01-s-chego-vsyo-nachinalos' },
    { title: 'Глава 2: Однодворцы', url: '/chapters/02-odnodvorcy' },
    { title: 'Глава 3: Землевладельцы', url: '/chapters/03-zemlevladelcy' },
    { title: 'Глава 4: Дворяне', url: '/chapters/04-dvoryane' },
    { title: 'Глава 5: Александровка', url: '/chapters/05-aleksandrovka' },
    { title: 'Ссылки', url: '/chapters/ref' }
  ];

  var path = window.location.pathname;
  var list = document.getElementById('toc-list');
  if (!list) return;

  chapters.forEach(function (ch) {
    var li = document.createElement('li');
    li.className = 'toc-item';

    var a = document.createElement('a');
    a.href = ch.url;
    a.textContent = ch.title;

    if (path === ch.url || path === ch.url + '.html' || (ch.url !== '/' && path.startsWith(ch.url))) {
      li.className = 'toc-item active';
    }

    li.appendChild(a);
    list.appendChild(li);
  });
});
