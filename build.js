// ByteTasty — сайт студии на GitHub Pages. Сборка: node sync-legal.js && node build.js → index.html, due/*.html
// Правовые тексты и описания берутся из legal.json (копия строк приложения Due, app/i18n.js) — на сайте и в приложении они одинаковые.
const fs = require('fs');
const L = JSON.parse(fs.readFileSync('legal.json', 'utf8'));
const YEAR = 2026, MAIL = 'norkztt@gmail.com';
const STUDIO = 'ByteTasty', APP = 'Due';

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const paras = txt => txt.split(/\n\n+/).map(p => '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>').join('\n');

// знак студии: байт с откушенным углом (пиксельная дуга) и отлетевшей крошкой-битом
const BTMARK = `<svg class="nmark" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="btg" gradientUnits="userSpaceOnUse" x1="8" y1="56" x2="56" y2="8"><stop offset="0" stop-color="#38E1D4"/><stop offset=".5" stop-color="#7E8CFF"/><stop offset="1" stop-color="#E479F4"/></linearGradient><mask id="btm"><rect width="64" height="64" fill="#fff"/><polygon points="33,11 53,11 53,31 45,31 45,27 41,27 41,23 37,23 37,19 33,19" fill="#000"/></mask></defs><rect width="64" height="64" rx="16" fill="#0A0B18"/><g mask="url(#btm)"><rect x="11" y="11" width="42" height="42" rx="12" fill="url(#btg)"/></g><rect x="53.5" y="6.5" width="6.5" height="6.5" rx="1.8" fill="#E479F4"/></svg>`;

function page({ root, title, body, desc }) {
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#050508">
<meta name="description" content="${esc(desc)}">
<title>${esc(title)}</title>
<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${root}site.css">
<script>(function(){var l=null;try{l=localStorage.getItem('bt.lang');}catch(e){}if(!l){l=((navigator.language||'ru').slice(0,2)==='ru')?'ru':'en';}document.documentElement.setAttribute('data-lang',l);document.documentElement.lang=l;})();</script>
</head>
<body>
<div class="glow" aria-hidden="true"></div>
<header class="top">
  <a class="brand" href="${root}index.html">${BTMARK}<span>${STUDIO}</span></a>
  <div class="lang" role="group" aria-label="Language">
    <button type="button" data-set="ru">RU</button><button type="button" data-set="en">EN</button>
  </div>
</header>
<main class="wrap">
${body}
</main>
<footer class="foot">
  <span>© ${YEAR} ${STUDIO}</span>
  <a href="mailto:${MAIL}">${MAIL}</a>
</footer>
<script>
document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){var l=b.dataset.set;document.documentElement.setAttribute('data-lang',l);document.documentElement.lang=l;try{localStorage.setItem('bt.lang',l);}catch(e){}});});
</script>
</body>
</html>
`;
}

// ---------- студия ----------
const studio = page({
  root: '', title: STUDIO, desc: `${STUDIO} — простые приложения без аккаунтов и рекламы. Данные остаются у вас.`,
  body: `
<section class="hero">
  <div class="L" lang="ru">
    <h1>Простые приложения.<br>Без аккаунтов и&nbsp;рекламы.</h1>
    <p class="lead">${STUDIO} делает маленькие приложения, которые делают одно дело хорошо и хранят данные только у вас.</p>
  </div>
  <div class="L" lang="en">
    <h1>Simple apps.<br>No accounts, no&nbsp;ads.</h1>
    <p class="lead">${STUDIO} makes small apps that do one thing well and keep your data on your device.</p>
  </div>
</section>
<section class="apps">
  <a class="card app" href="due/index.html">
    <img src="due/icon.png" alt="" width="72" height="72">
    <div>
      <div class="eyebrow"><span class="L" lang="ru">Android · бесплатно</span><span class="L" lang="en">Android · free</span></div>
      <h2>${APP}</h2>
      <p><span class="L" lang="ru">${esc(L.ru.cover)}</span><span class="L" lang="en">${esc(L.en.cover)}</span></p>
    </div>
    <span class="arrow" aria-hidden="true">→</span>
  </a>
</section>`
});

// ---------- приложение ----------
const feats = lang => L[lang].ob.map(([t, s]) => `<div class="card f"><h3>${esc(t)}</h3><p>${esc(s)}</p></div>`).join('\n');
const due = page({
  root: '../', title: `${APP} — платежи и подписки`, desc: `${APP} — все платежи и подписки в одном месте. Напоминания, сводки, данные только на устройстве. От студии ${STUDIO}.`,
  body: `
<section class="hero app-hero">
  <img class="icon" src="icon.png" alt="" width="96" height="96">
  <div class="L" lang="ru">
    <div class="eyebrow">Android · бесплатно · от ${STUDIO}</div>
    <h1>${APP}</h1>
    <p class="lead">${esc(L.ru.cover)}</p>
    <div class="cta"><span class="btn soon">Скоро в Google Play</span></div>
  </div>
  <div class="L" lang="en">
    <div class="eyebrow">Android · free · by ${STUDIO}</div>
    <h1>${APP}</h1>
    <p class="lead">${esc(L.en.cover)}</p>
    <div class="cta"><span class="btn soon">Coming soon on Google Play</span></div>
  </div>
</section>
<section class="grid">
  <div class="L" lang="ru">${feats('ru')}</div>
  <div class="L" lang="en">${feats('en')}</div>
</section>
<section class="card note">
  <div class="L" lang="ru"><h3>${esc(L.ru.local)}</h3><p>Приложение работает без интернета: нет аккаунтов, рекламы, аналитики и трекеров. Резервная копия создаётся только по вашей команде.</p></div>
  <div class="L" lang="en"><h3>${esc(L.en.local)}</h3><p>The app works offline: no accounts, ads, analytics or trackers. A backup is created only when you ask for it.</p></div>
</section>
<section class="links">
  <a href="privacy.html"><span class="L" lang="ru">${esc(L.ru.privacy_t)}</span><span class="L" lang="en">${esc(L.en.privacy_t)}</span></a>
  <a href="terms.html"><span class="L" lang="ru">${esc(L.ru.terms_t)}</span><span class="L" lang="en">${esc(L.en.terms_t)}</span></a>
  <a href="licenses.html"><span class="L" lang="ru">${esc(L.ru.oss_t)}</span><span class="L" lang="en">${esc(L.en.oss_t)}</span></a>
  <a href="mailto:${MAIL}"><span class="L" lang="ru">Поддержка</span><span class="L" lang="en">Support</span></a>
</section>`
});

// ---------- правовые страницы ----------
function legal(key, extra) {
  const ru = L.ru, en = L.en;
  return page({
    root: '../', title: `${APP} — ${ru[key + '_t']} / ${en[key + '_t']}`, desc: `${APP}: ${ru[key + '_t']}.`,
    body: `
<article class="doc">
  <div class="L" lang="ru">
    <div class="eyebrow">${APP} · ${STUDIO}</div>
    <h1>${esc(ru[key + '_t'])}</h1>
    ${paras(ru[key])}
    ${extra ? extra.ru : ''}
  </div>
  <div class="L" lang="en">
    <div class="eyebrow">${APP} · ${STUDIO}</div>
    <h1>${esc(en[key + '_t'])}</h1>
    ${paras(en[key])}
    ${extra ? extra.en : ''}
  </div>
  <p class="back"><a href="index.html">← ${APP}</a></p>
</article>`
  });
}
const contacts = {
  ru: `<h2>Разработчик и контакты</h2><p>Разработчик приложения: ${STUDIO}. Вопросы по этой политике и по данным: <a href="mailto:${MAIL}">${MAIL}</a>.</p>`,
  en: `<h2>Developer and contact</h2><p>App developer: ${STUDIO}. Questions about this policy or your data: <a href="mailto:${MAIL}">${MAIL}</a>.</p>`
};

fs.writeFileSync('index.html', studio);
fs.writeFileSync('due/index.html', due);
fs.writeFileSync('due/privacy.html', legal('privacy', contacts));
fs.writeFileSync('due/terms.html', legal('terms'));
fs.writeFileSync('due/licenses.html', legal('oss'));
fs.writeFileSync('favicon.svg', BTMARK.replace(' class="nmark"', ' xmlns="http://www.w3.org/2000/svg"').replace(' aria-hidden="true"', ''));
console.log('ok');
