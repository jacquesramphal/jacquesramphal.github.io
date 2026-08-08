// Plain Web Components + a tiny router. No framework, no build for this file.

// ---- minimal markdown renderer (enough for these articles) ----
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function inline(s) {
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => `<a href="${u.startsWith('/doc/') ? '#' + u : u}">${t}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  return s;
}
export function mdToHtml(md) {
  const blocks = md.replace(/\r/g, '').split(/\n{2,}/);
  const out = [];
  for (let b of blocks) {
    b = b.trim();
    if (!b) continue;
    if (/^#{1,3}\s/.test(b)) {
      const l = b.match(/^#+/)[0].length;
      out.push(`<h${l}>${inline(b.replace(/^#+\s/, ''))}</h${l}>`);
      continue;
    }
    if (/^---+$/.test(b)) { out.push('<hr>'); continue; }
    if (/^>\s/.test(b)) {
      out.push(`<blockquote><p>${inline(b.replace(/^>\s?/gm, '').split('\n').join(' '))}</p></blockquote>`);
      continue;
    }
    out.push(`<p>${inline(b.split('\n').join(' '))}</p>`);
  }
  return out.join('\n');
}

function b64utf8(b64) {
  return new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));
}

// ---- <md-article src="..."> : renders Markdown into LIGHT DOM (so the site's global
//      CSS styles the content). `src` is either a URL to a .md file (dev: fetched over
//      HTTP) or a "#id" selector pointing at an inline base64 block (used by the
//      self-contained preview build, where fetch isn't available). ----
customElements.define('md-article', class extends HTMLElement {
  async connectedCallback() {
    const src = this.getAttribute('src');
    if (!src) return;
    try {
      let md;
      if (src.startsWith('#')) {
        const node = document.querySelector(src);
        md = node ? b64utf8(node.textContent.trim()) : '';
      } else {
        md = await (await fetch(src)).text();
      }
      this.innerHTML = `<div class="markdown">${mdToHtml(md)}</div>`;
    } catch (e) {
      this.innerHTML = `<p>Could not load ${src}. Serve this folder over HTTP (fetch needs a server).</p>`;
    }
  }
});

// ---- <theme-toggle> : System / Light / Dark using the site's own class mechanism ----
customElements.define('theme-toggle', class extends HTMLElement {
  connectedCallback() {
    this.modes = ['system', 'light', 'dark'];
    this.i = this.modes.indexOf(localStorage.getItem('proto-theme') || 'system');
    if (this.i < 0) this.i = 0;
    this.btn = document.createElement('button');
    this.appendChild(this.btn);
    this.apply();
    this.btn.onclick = () => { this.i = (this.i + 1) % 3; this.apply(); };
  }
  apply() {
    const m = this.modes[this.i];
    localStorage.setItem('proto-theme', m);
    const r = document.documentElement;
    r.classList.remove('light-theme', 'dark-theme');
    if (m === 'light') r.classList.add('light-theme');
    if (m === 'dark') r.classList.add('dark-theme');
    this.btn.textContent = 'Theme: ' + m.charAt(0).toUpperCase() + m.slice(1);
  }
});

// ---- tiny hash router ----
function route() {
  const h = location.hash || '#/';
  const article = h.startsWith('#/doc/');
  document.getElementById('view-home').hidden = article;
  document.getElementById('view-article').hidden = !article;
  window.scrollTo(0, 0);
}
addEventListener('hashchange', route);
route();
