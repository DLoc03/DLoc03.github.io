(function () {
  'use strict';

  var ICONS = {
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7.5" width="18" height="12.5" rx="2.5"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 13h18"/></svg>',
    coffee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V9Z"/><path d="M16 10h1.5a2.75 2.75 0 0 1 0 5.5H16M7 5.5c0-1 .8-1.2.8-2.2M11 5.5c0-1 .8-1.2.8-2.2"/></svg>',
    crown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 17.5 2.5 7l5.2 3.6L12 5l4.3 5.6L21.5 7l-1 10.5h-17Z"/><path d="M4 21h16"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 1.695.765.99 1.485 0 1.11-.015 2.255 0 .705.24 1.365.825 1.51C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.1 21 14.3V21h-4v-5.9c0-1.4-.03-3.2-2-3.2s-2.3 1.53-2.3 3.1V21H9z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.4 2.1 1.8 3.6 4 3.9v3c-1.6 0-3-.5-4-1.3v6.6a6.1 6.1 0 1 1-6.1-6.1c.3 0 .7 0 1 .1v3.2a2.9 2.9 0 1 0 2 2.7V3h3.1Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function render(data) {
    var p = data.profile || {};
    if (p.name) document.getElementById('fullName').textContent = p.name;
    if (p.alias) document.getElementById('alias').textContent = p.alias;
    if (p.tagline) document.getElementById('tagline').textContent = p.tagline;
    if (p.location) document.getElementById('location').textContent = p.location;
    if (p.avatar) document.getElementById('avatar').src = p.avatar;

    var links = (data.links || []).filter(function (l) { return l && l.url; });
    var html = links.map(function (l) {
      var size = ['big', 'medium', 'small'].indexOf(l.size) >= 0 ? l.size : 'small';
      var accent = l.accent ? ' style="--tile-accent:' + esc(l.accent) + '"' : '';
      var external = /^https?:/i.test(l.url);
      var attrs = external ? ' target="_blank" rel="noopener"' : '';
      return '<a class="tile ' + size + '" href="' + esc(l.url) + '"' + attrs + accent + '>' +
        '<span class="ic">' + (ICONS[l.icon] || ICONS.briefcase) + '</span>' +
        '<b>' + esc(l.title) + '</b>' +
        (l.desc ? '<span>' + esc(l.desc) + '</span>' : '') +
        (size === 'big' ? '<span class="go">Xem portfolio ↗</span>' : '') +
        '</a>';
    }).join('');
    document.getElementById('bento').innerHTML = html;
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  fetch('data/links.json', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function () { /* keep static header fallback */ });
})();
