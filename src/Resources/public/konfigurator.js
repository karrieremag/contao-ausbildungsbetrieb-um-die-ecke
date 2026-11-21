/* Ausbildungsbetrieb um die Ecke: Einstellungen im Backend (WordPress, Contao, TYPO3).
 * Betrieb suchen oder eintragen, Form, Farbe und bis zu drei Berufe wählen, Vorschau zeigen.
 * Schreibt die Auswahl als JSON in das versteckte Feld data-ziel des Containers.
 * Spricht nur mit karrieremag.de/s/ (Suche, Berufe, Vorschläge, Kurzlink, Meldung).
 * Copyright Karrieremag GmbH, Lizenz GPL-2.0-or-later. */
(function () {
  'use strict';
  var API = 'https://karrieremag.de/s/';

  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function norm(x) { return String(x).toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, ' ').trim(); }
  function post(datei, daten) {
    return fetch(API + datei, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(daten) }).then(function (r) { return r.json(); });
  }
  function hole(url) { return fetch(url).then(function (r) { return r.json(); }); }

  var CSS = '.aude{max-width:760px;font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#3b3c42}' +
    '.aude h3{margin:22px 0 8px;font-size:15px}.aude .aude-hilfe{color:#5f616a;margin:0 0 8px}' +
    '.aude input[type=text],.aude input[type=search],.aude input[type=email]{width:100%;max-width:520px;padding:8px 10px;box-sizing:border-box}' +
    '.aude-treffer{max-width:520px;border:1px solid #c9cbd1;background:#fff;margin-top:4px}.aude-treffer[hidden]{display:none}' +
    '.aude-treffer button{display:block;width:100%;text-align:left;border:0;border-top:1px solid #eee;background:#fff;padding:8px 10px;cursor:pointer}' +
    '.aude-treffer button:hover{background:#fff3e3}.aude-treffer small{display:block;color:#6b6d74}.aude-treffer p{margin:8px 10px;color:#6b6d74}' +
    '.aude-treffer .aude-tmeld{font-weight:700;background:#fff7ec}' +
    '.aude-gewaehlt{margin:10px 0;padding:10px 12px;background:#f4f5f7;border-left:4px solid #ffa535}.aude-gewaehlt[hidden]{display:none}' +
    '.aude-pillen button{margin:0 6px 6px 0;padding:6px 10px;border:1px solid #3b3c42;background:#fff;cursor:pointer}' +
    '.aude-pillen button[aria-pressed=true]{background:#3b3c42;color:#fff}' +
    '.aude-ac{position:relative;max-width:520px;margin-bottom:6px}.aude-ac ul{position:absolute;left:0;right:0;top:100%;margin:0;padding:0;list-style:none;background:#fff;border:1px solid #c9cbd1;z-index:50;max-height:240px;overflow:auto}' +
    '.aude-ac li{padding:7px 10px;cursor:pointer}.aude-ac li:hover,.aude-ac li[aria-selected=true]{background:#fff3e3}.aude-ac li.leer{color:#6b6d74;cursor:default}' +
    '.aude-vorschlag{max-width:520px;margin:0 0 10px;padding:10px;border:1px dashed #ffa535;background:#fff7ec}.aude-vorschlag[hidden]{display:none}' +
    '.aude-vorschlag button{margin:6px 6px 0 0;padding:5px 9px;border:1px solid #ffa535;background:#fff;cursor:pointer}' +
    '.aude-melden{max-width:520px;padding:12px;border:1px solid #3b3c42;margin-top:10px}.aude-melden[hidden]{display:none}.aude-melden label{display:block;margin:0 0 8px;font-weight:600}' +
    '.aude-melden .aude-falle{position:absolute;left:-9999px}.aude-fehler{color:#a35200;font-weight:700}' +
    '.aude-vorschau{margin-top:10px;padding:20px;background:#f4f5f7;min-height:120px}.aude-vorschau.farbig{background:linear-gradient(135deg,#ffa535,#e8a04a)}';

  function start(box) {
    if (box.getAttribute('data-aude-an')) return;
    box.setAttribute('data-aude-an', '1');
    var ziel = document.getElementById(box.getAttribute('data-ziel'));
    var basis = box.getAttribute('data-basis') || '';   /* Ordner mit widget.js, maplibre und vorlagen.json */
    var st = {};
    try { st = JSON.parse(ziel.value || '{}') || {}; } catch (e) { st = {}; }
    if (typeof st !== 'object' || Array.isArray(st)) st = {};
    st.form = st.form || 'gross'; st.farbe = st.farbe || 'hell'; st.berufe = st.berufe || [];
    var LISTE = [], VOR = [], VORL = null, lauf = 0, abgeholt = {};

    if (!document.getElementById('aude-css')) { var c = document.createElement('style'); c.id = 'aude-css'; c.textContent = CSS; document.head.appendChild(c); }
    box.className += ' aude';
    box.innerHTML =
      '<h3>1. Ihren Betrieb finden</h3><p class="aude-hilfe">Firmenname, Ort oder Postleitzahl eingeben und den eigenen Standort wählen.</p>' +
      '<input type="search" class="aude-suche" placeholder="Firmenname oder PLZ" autocomplete="off" data-lpignore="true">' +
      '<div class="aude-treffer" hidden></div><div class="aude-gewaehlt" hidden></div>' +
      '<div class="aude-melden" hidden><p><b>Ihr Betrieb fehlt noch?</b> Tragen Sie ihn hier ein. Das Siegel funktioniert sofort, auf die Karte von dein-ausbildungsplatz.de kommt Ihr Betrieb in den nächsten Tagen.</p>' +
      '<label>Name des Betriebs<input type="text" data-f="firma" maxlength="160" data-lpignore="true"></label>' +
      '<label>Straße und Hausnummer<input type="text" data-f="strasse" maxlength="160" data-lpignore="true"></label>' +
      '<label>PLZ<input type="text" data-f="plz" maxlength="5" data-lpignore="true"></label>' +
      '<label>Ort<input type="text" data-f="ort" maxlength="100" data-lpignore="true"></label>' +
      '<label>Webseite (optional)<input type="text" data-f="website" maxlength="200" data-lpignore="true"></label>' +
      '<label>Ansprechpartner (optional)<input type="text" data-f="ansprechpartner" maxlength="120" data-lpignore="true"></label>' +
      '<label>E-Mail<input type="email" data-f="email" maxlength="190" data-lpignore="true"></label>' +
      '<label class="aude-falle" aria-hidden="true">Fax<input type="text" data-f="firmenfax" tabindex="-1" autocomplete="off"></label>' +
      '<p class="aude-fehler" hidden></p><button type="button" class="button button-primary aude-senden">Betrieb eintragen</button></div>' +
      '<h3>2. Aussuchen und anpassen</h3>' +
      '<p class="aude-hilfe">Form</p><div class="aude-pillen" data-k="form"><button type="button" data-w="gross">Widget groß</button><button type="button" data-w="klein">Widget klein</button><button type="button" data-w="siegel">Siegel</button><button type="button" data-w="banner">Banner</button><button type="button" data-w="text">Textlink</button></div>' +
      '<div class="aude-farbfeld"><p class="aude-hilfe">Farbe</p><div class="aude-pillen" data-k="farbe"><button type="button" data-w="hell">Hell</button><button type="button" data-w="dunkel">Dunkel</button><button type="button" data-w="durchsichtig">Durchsichtig</button></div></div>' +
      '<div class="aude-berufefeld"><p class="aude-hilfe">Ihre Berufe (bis zu drei, nur aus unserer Liste)</p><div class="aude-vorschlag" hidden></div>' +
      '<div class="aude-ac"><input type="text" data-b="0" placeholder="Beruf eintippen, z. B. Maler/in" autocomplete="off" data-lpignore="true"></div>' +
      '<div class="aude-ac"><input type="text" data-b="1" placeholder="Zweiter Beruf (optional)" autocomplete="off" data-lpignore="true"></div>' +
      '<div class="aude-ac"><input type="text" data-b="2" placeholder="Dritter Beruf (optional)" autocomplete="off" data-lpignore="true"></div></div>' +
      '<h3>3. Vorschau</h3><div class="aude-vorschau"></div><p class="aude-hilfe aude-status"></p>';

    var q = function (s) { return box.querySelector(s); };
    var berufFelder = [].slice.call(box.querySelectorAll('[data-b]'));
    berufFelder.forEach(function (f, i) { f.value = st.berufe[i] || ''; });

    function berufe() { return berufFelder.map(function (f) { return f.value.trim(); }).filter(Boolean).slice(0, 3); }
    function speichern() { st.berufe = berufe(); ziel.value = JSON.stringify(st); }
    function gewaehlt(neu) {
      var g = q('.aude-gewaehlt');
      if (!st.sto && !st.meldung) { g.hidden = true; return; }
      g.innerHTML = '<b>' + esc(st.firma) + ' · ' + esc(st.ort) + '</b><br>' + (neu ? 'Neu eingetragen. Das Siegel funktioniert ab sofort.' : 'Steht auf der Karte von dein-ausbildungsplatz.de.');
      g.hidden = false;
    }

    /* Kurzlink holen (gleiche Auswahl = gleicher Code) */
    function code() {
      if (!st.sto && !st.meldung) { st.code = ''; speichern(); return zeige(); }
      var f = st.form, w = { aktion: 'code', art: 'siegel', form: f, farbe: f === 'text' ? 'hell' : st.farbe, berufe: (f === 'gross' || f === 'klein') ? berufe() : [] };
      if (st.meldung) { w.meldung = st.meldung; w.schluessel = st.schluessel; } else w.sto = st.sto;
      var n = ++lauf;
      q('.aude-status').textContent = 'Siegel wird vorbereitet …';
      post('neu.php', w).then(function (j) {
        if (n !== lauf) return;
        if (j && j.ok) { st.code = j.code; speichern(); q('.aude-status').textContent = 'Fertig. Speichern nicht vergessen.'; zeige(); }
        else q('.aude-status').textContent = 'Das hat gerade nicht geklappt. Bitte gleich noch einmal versuchen.';
      }).catch(function () { q('.aude-status').textContent = 'karrieremag.de ist gerade nicht erreichbar.'; });
    }

    /* Vorschau mit dem mitgelieferten widget.js */
    function svg(f, c) {
      if (!VORL) return '';
      var firma = String(st.firma || ''), ort = String(st.ort || '');
      var k = function (t, n) { return t.length > n ? t.slice(0, n - 1).trim() + '…' : t; };
      return (VORL[f + '-' + c] || '').replace('{{FIRMA}}', esc(k(firma, 24))).replace('{{ORT}}', esc(k(ort, 28))).replace('{{ZEILE}}', esc(k(firma, 38 - ort.length) + ' · ' + ort));
    }
    function zeige() {
      var v = q('.aude-vorschau'), f = st.form, c = st.farbe;
      q('.aude-farbfeld').style.display = f === 'text' ? 'none' : '';
      q('.aude-berufefeld').style.display = (f === 'gross' || f === 'klein') ? '' : 'none';
      v.classList.toggle('farbig', c === 'durchsichtig' && f !== 'text');
      [].forEach.call(box.querySelectorAll('.aude-pillen button'), function (b) {
        b.setAttribute('aria-pressed', st[b.parentNode.getAttribute('data-k')] === b.getAttribute('data-w') ? 'true' : 'false');
      });
      if (!st.code) { v.innerHTML = '<p>Wählen Sie oben zuerst Ihren Betrieb.</p>'; return; }
      var L = 'https://karrieremag.de/s/' + st.code;
      if (f === 'gross' || f === 'klein') {
        v.innerHTML = '<div class="dap-siegel" data-theme="' + c + '"' + (f === 'klein' ? ' data-groesse="klein"' : '') + ' data-berufe="' + esc(berufe().join('|')) + '" style="max-width:' + (f === 'klein' ? 260 : 360) + 'px"><a rel="nofollow" href="' + L + '">Ausbildungsbetrieb um die Ecke</a> · <a href="https://karrieremag.de/">karrieremag</a></div>';
        if (window.dapwStart) window.dapwStart();
      } else if (f === 'siegel' || f === 'banner') {
        v.innerHTML = '<a rel="nofollow" href="' + L + '" target="_blank" style="display:inline-block;line-height:0">' + svg(f, c) + '</a><br><small><a href="https://karrieremag.de/" target="_blank">karrieremag</a></small>';
      } else {
        v.innerHTML = 'Wir sind <a rel="nofollow" href="' + L + '" target="_blank">Ausbildungsbetrieb um die Ecke</a>.<br><small><a href="https://karrieremag.de/" target="_blank">karrieremag</a></small>';
      }
    }

    /* Pillen */
    [].forEach.call(box.querySelectorAll('.aude-pillen'), function (g) {
      g.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; st[g.getAttribute('data-k')] = b.getAttribute('data-w'); code(); });
    });

    /* Suche */
    var s = q('.aude-suche'), tr = q('.aude-treffer'), sz, slauf = 0;
    if (st.firma) s.value = st.firma + ', ' + (st.ort || '');
    s.addEventListener('input', function () {
      clearTimeout(sz); var qq = s.value.trim();
      if (qq.length < 2) { tr.hidden = true; return; }
      sz = setTimeout(function () {
        var n = ++slauf;
        hole(API + 'suche.php?q=' + encodeURIComponent(qq)).then(function (j) {
          if (n !== slauf) return;
          var t = (j && j.treffer) || [];
          tr.innerHTML = t.map(function (x, i) { return '<button type="button" data-i="' + i + '">' + esc(x.firma) + '<small>' + esc((x.strasse ? x.strasse + ', ' : '') + x.plz + ' ' + x.ort) + '</small></button>'; }).join('') +
            (t.length ? '' : '<p>Kein Treffer. Prüfen Sie die Schreibweise oder suchen Sie mit Ihrer Postleitzahl.</p>') +
            '<button type="button" class="aude-tmeld">' + (t.length ? 'Ihr Betrieb ist nicht dabei? Jetzt eintragen' : 'Ihren Betrieb jetzt eintragen') + '</button>';
          tr.hidden = false;
          [].forEach.call(tr.querySelectorAll('button[data-i]'), function (b) {
            b.addEventListener('click', function () {
              var x = t[+b.getAttribute('data-i')];
              st.sto = x.sto; st.meldung = 0; st.schluessel = ''; st.firma = x.firma; st.ort = x.plz + ' ' + x.ort;
              tr.hidden = true; q('.aude-melden').hidden = true; s.value = x.firma + ', ' + st.ort;
              gewaehlt(false); vorschlaege(); code();
            });
          });
          tr.querySelector('.aude-tmeld').addEventListener('click', function () {
            tr.hidden = true; q('.aude-melden').hidden = false;
            if (!/^\d+$/.test(qq)) q('[data-f=firma]').value = qq; else if (/^\d{5}$/.test(qq)) q('[data-f=plz]').value = qq;
          });
        }).catch(function () {});
      }, 250);
    });

    /* Betrieb eintragen */
    q('.aude-senden').addEventListener('click', function () {
      var d = { quelle: 'plugin', berufe: berufe() }, fe = q('.aude-fehler'), btn = this;
      [].forEach.call(box.querySelectorAll('[data-f]'), function (i) { d[i.getAttribute('data-f')] = i.value.trim(); });
      btn.disabled = true; fe.hidden = true;
      post('melden.php', d).then(function (j) {
        btn.disabled = false;
        if (!j || !j.ok) { var f = (j && j.felder) || {}; fe.textContent = Object.keys(f).length ? Object.keys(f).map(function (k) { return f[k]; }).join(' ') : ((j && j.fehler) || 'Das hat gerade nicht geklappt.'); fe.hidden = false; return; }
        st.sto = ''; st.meldung = j.meldung; st.schluessel = j.schluessel; st.firma = j.firma; st.ort = j.plz + ' ' + j.ort;
        q('.aude-melden').hidden = true; s.value = j.firma + ', ' + st.ort; VOR = []; zeigeVorschlaege();
        gewaehlt(true); code();
      }).catch(function () { btn.disabled = false; fe.textContent = 'karrieremag.de ist gerade nicht erreichbar.'; fe.hidden = false; });
    });

    /* Berufe-Vorschläge aus unseren Daten: nur anbieten */
    function zeigeVorschlaege() {
      var vb = q('.aude-vorschlag'), drin = berufe(), frei = berufFelder.filter(function (f) { return !f.value; }).length;
      var rest = VOR.filter(function (n) { return drin.indexOf(n) < 0; });
      if (!rest.length || !frei) { vb.hidden = true; return; }
      vb.innerHTML = '<b>Vorschlag aus unseren Daten.</b> Diese Berufe stehen bei uns für Ihren Standort. Übernehmen Sie nur, was heute passt.<br>' +
        rest.map(function (n) { return '<button type="button" data-n="' + esc(n) + '">+ ' + esc(n) + '</button>'; }).join('');
      vb.hidden = false;
    }
    q('.aude-vorschlag').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-n]'); if (!b) return;
      var f = berufFelder.filter(function (x) { return !x.value; })[0]; if (f) { f.value = b.getAttribute('data-n'); f.setAttribute('data-ok', f.value); zeigeVorschlaege(); code(); }
    });
    function vorschlaege() {
      VOR = []; zeigeVorschlaege(); if (!st.sto) return;
      hole(API + 'vorschlag.php?sto=' + encodeURIComponent(st.sto)).then(function (j) { VOR = (j && j.ok && j.berufe) || []; zeigeVorschlaege(); }).catch(function () {});
    }

    /* Berufe nur aus der Liste */
    hole(API + 'berufe.php').then(function (l) { LISTE = l || []; }).catch(function () {});
    berufFelder.forEach(function (inp) {
      var ul = document.createElement('ul'); ul.hidden = true; inp.parentNode.appendChild(ul); inp.setAttribute('data-ok', inp.value);
      function nimm(n) { inp.value = n; inp.setAttribute('data-ok', n); ul.hidden = true; zeigeVorschlaege(); code(); }
      inp.addEventListener('input', function () {
        var qq = norm(inp.value); if (qq.length < 2) { ul.hidden = true; return; }
        var w = qq.split(' '), schon = berufFelder.filter(function (x) { return x !== inp; }).map(function (x) { return x.value; });
        var t = LISTE.filter(function (n) { var m = norm(n); return schon.indexOf(n) < 0 && w.every(function (x) { return m.indexOf(x) > -1; }); });
        t.sort(function (a, b) { var x = norm(a).indexOf(w[0]) === 0, y = norm(b).indexOf(w[0]) === 0; return x === y ? a.localeCompare(b, 'de') : (x ? -1 : 1); });
        ul.innerHTML = t.length ? t.slice(0, 8).map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') : '<li class="leer">Kein Beruf gefunden.</li>';
        ul.hidden = false;
      });
      ul.addEventListener('mousedown', function (e) { var l = e.target.closest('li:not(.leer)'); if (l) { e.preventDefault(); nimm(l.textContent); } });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); var l = ul.querySelector('li:not(.leer)'); if (!ul.hidden && l) nimm(l.textContent); } });
      inp.addEventListener('blur', function () {
        ul.hidden = true; if (inp.value === inp.getAttribute('data-ok')) return;
        var t = LISTE.filter(function (n) { return norm(n) === norm(inp.value); });
        if (t.length) nimm(t[0]); else { inp.value = ''; inp.setAttribute('data-ok', ''); zeigeVorschlaege(); code(); }
      });
    });

    /* Beim Speichern im CMS: als „abgeholt per Plugin“ zählen */
    var form = box.closest('form');
    if (form) form.addEventListener('submit', function () {
      speichern();
      if (st.code && !abgeholt[st.code]) { abgeholt[st.code] = 1; try { navigator.sendBeacon && navigator.sendBeacon(API + 'neu.php', new Blob([JSON.stringify({ aktion: 'abgeholt', code: st.code, wie: 'plugin' })], { type: 'text/plain' })); } catch (e) {} }
    });

    if (basis) hole(basis + 'vorlagen.json').then(function (j) { VORL = j; zeige(); }).catch(function () {});
    gewaehlt(false); zeige(); speichern();
  }

  function alle() { [].forEach.call(document.querySelectorAll('[data-aude-konfigurator]'), start); }
  window.audeKonfigurator = alle;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', alle); else alle();
})();
