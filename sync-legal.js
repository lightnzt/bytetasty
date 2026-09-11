// Переносит правовые тексты и описания из словаря приложения (app/i18n.js) в legal.json сайта.
// Запуск: node sync-legal.js [путь к i18n.js]   (по умолчанию ../NorkzttDue/app/i18n.js)
const fs = require('fs'), path = require('path');
const src = process.argv[2] || path.join(__dirname, '..', 'NorkzttDue', 'app', 'i18n.js');
const code = fs.readFileSync(src, 'utf8');
const I18N = new Function(code + '\nreturn I18N;')();
const pick = d => ({
  privacy: d.legal_privacy, terms: d.legal_terms, oss: d.legal_oss,
  privacy_t: d.legal_privacy_t, terms_t: d.legal_terms_t, oss_t: d.legal_oss_t,
  cover: d.cover_tag,
  ob: [[d.ob1_t, d.ob1_s], [d.ob2_t, d.ob2_s], [d.ob3_t, d.ob3_s], [d.ob4_t, d.ob4_s]],
  local: d.ob_local,
});
const out = { ru: pick(I18N.ru), en: pick(I18N.en) };
fs.writeFileSync(path.join(__dirname, 'legal.json'), JSON.stringify(out, null, 2) + '\n');
console.log('legal.json обновлён из', src);
