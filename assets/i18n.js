(function () {
  var STORAGE_KEY = 'nuko_lang';

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved === 'ja' || saved === 'en') return saved;
    var nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.indexOf('ja') === 0 ? 'ja' : 'en';
  }

  function apply(lang) {
    document.documentElement.lang = lang;

    var textNodes = document.querySelectorAll('[data-ja],[data-en]');
    for (var i = 0; i < textNodes.length; i++) {
      var el = textNodes[i];
      var val = el.getAttribute('data-' + lang);
      if (val === null) continue;
      if (el.tagName === 'META') {
        el.setAttribute('content', val);
      } else {
        el.textContent = val;
      }
    }

    var htmlNodes = document.querySelectorAll('[data-ja-html],[data-en-html]');
    for (var j = 0; j < htmlNodes.length; j++) {
      var el2 = htmlNodes[j];
      var val2 = el2.getAttribute('data-' + lang + '-html');
      if (val2 !== null) el2.innerHTML = val2;
    }

    var btns = document.querySelectorAll('[data-lang-btn]');
    for (var k = 0; k < btns.length; k++) {
      var btn = btns[k];
      btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
    }
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply(lang);
  }

  window.NukoI18n = { setLang: setLang, detectLang: detectLang };

  document.addEventListener('DOMContentLoaded', function () {
    apply(detectLang());
    var btns = document.querySelectorAll('[data-lang-btn]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        setLang(this.getAttribute('data-lang-btn'));
      });
    }
  });
})();
