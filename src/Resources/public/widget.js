/* Siegel-Widget „Ausbildungsbetrieb um die Ecke“ (karrieremag.de/s/widget.js, live seit 21.11.2026)
   Einbau: <div class="dap-siegel" data-sto="STO-SUB" data-theme="hell|dunkel|durchsichtig"><a href="DEEP-LINK">Ausbildungsbetrieb um die Ecke auf dein-ausbildungsplatz.de</a></div>
           <script src="https://karrieremag.de/s/widget.js" async></script>
   Der Link im HTML bleibt immer stehen (Backlink), das Skript baut nur das Widget darum. */
(function () {
  var DATEN = {
    "1000000227-1000000412": {
      firma: "karrieremag GmbH",
      strasse: "Bergedorfer Schloßstraße 9",
      plz: "21029", ort: "Hamburg",
      lat: 53.488793, lng: 10.212652,
      berufe: ["Kaufmann/frau Marketingkommunikation", "Mediengestalter/in Digital und Print", "Kaufmann/frau Büromanagement"] /* Demo: Beispielberufe */
    }
  };
  var SMILEY = '<svg width="34" height="34" viewBox="157.7 -4.8 42 42" fill="none" aria-hidden="true"><path d="M161.124 3.69486C161.124 1.71719 162.728 0.112183 164.706 0.112183C166.684 0.112183 168.289 1.71662 168.289 3.69486C168.289 5.67425 166.684 7.27869 164.706 7.27869C162.728 7.27811 161.124 5.67425 161.124 3.69486ZM177.369 3.69486C177.369 1.71719 178.975 0.112183 180.952 0.112183C182.93 0.112183 184.535 1.71662 184.535 3.69486C184.535 5.67425 182.931 7.27869 180.952 7.27869C178.975 7.27811 177.369 5.67425 177.369 3.69486Z" fill="#FFA535"/><path d="M179.892 31.1792C187.227 28.7945 192.415 22.4908 193.108 15.1193C193.227 13.8576 192.301 12.7388 191.038 12.621C189.777 12.5002 188.658 13.4275 188.54 14.6892C188.017 20.2385 184.066 24.9983 178.474 26.8165C172.752 28.6767 166.729 27.1619 163.129 22.9569C162.507 22.2302 161.531 21.9879 160.676 22.2659C160.397 22.3567 160.131 22.5027 159.894 22.7044C158.931 23.5289 158.819 24.9773 159.643 25.9396C164.453 31.5581 172.401 33.6146 179.892 31.1792Z" fill="#FFA535"/><path d="M185.119 15.0578L191.589 10.9699L195.902 17.607" stroke="#FFA535" stroke-width="4.72922" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var PIN = "<svg width=\"48\" height=\"48\" viewBox=\"0 0 40 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_10477_36565)\"><path d=\"M20.0002 1.66675C16.556 1.66572 13.2164 2.85033 10.5427 5.02147C7.86905 7.19262 6.02424 10.218 5.31835 13.589C4.61246 16.9601 5.08851 20.4714 6.6665 23.5329C8.2445 26.5943 10.8282 29.0192 13.9835 30.4001C14.5966 30.6567 15.1292 31.0739 15.5252 31.6077C15.9211 32.1415 16.1658 32.7722 16.2335 33.4334L16.3668 35.0168C16.4445 35.9242 16.861 36.7692 17.5335 37.3834C18.2135 37.9884 19.09 38.326 20.0002 38.3334C20.9107 38.3345 21.7886 37.9947 22.4611 37.3809C23.1336 36.767 23.5518 35.9236 23.6335 35.0168L23.7668 33.4334C23.8345 32.7722 24.0792 32.1415 24.4752 31.6077C24.8711 31.0739 25.4037 30.6567 26.0168 30.4001C29.1721 29.0192 31.7558 26.5943 33.3338 23.5329C34.9118 20.4714 35.3879 16.9601 34.682 13.589C33.9761 10.218 32.1313 7.19262 29.4576 5.02147C26.7839 2.85033 23.4443 1.66572 20.0002 1.66675ZM20.0002 25.0001C18.352 25.0001 16.7408 24.5113 15.3704 23.5957C14 22.68 12.9319 21.3785 12.3012 19.8558C11.6704 18.3331 11.5054 16.6575 11.8269 15.041C12.1485 13.4245 12.9422 11.9396 14.1076 10.7742C15.273 9.60876 16.7579 8.81508 18.3744 8.49354C19.9909 8.172 21.6665 8.33702 23.1892 8.96775C24.7119 9.59848 26.0134 10.6666 26.9291 12.037C27.8447 13.4074 28.3335 15.0186 28.3335 16.6667C28.3327 18.8766 27.4545 20.9958 25.8918 22.5584C24.3292 24.1211 22.2101 24.9993 20.0002 25.0001Z\" fill=\"#FFC266\"/><path d=\"M20 6.66675C18.0222 6.66675 16.0888 7.25324 14.4443 8.35205C12.7998 9.45087 11.5181 11.0127 10.7612 12.8399C10.0043 14.6672 9.8063 16.6778 10.1922 18.6177C10.578 20.5575 11.5304 22.3393 12.9289 23.7378C14.3275 25.1363 16.1093 26.0888 18.0491 26.4746C19.9889 26.8605 21.9996 26.6624 23.8268 25.9055C25.6541 25.1487 27.2159 23.8669 28.3147 22.2225C29.4135 20.578 30 18.6446 30 16.6667C29.9971 14.0155 28.9426 11.4736 27.0679 9.5989C25.1931 7.72416 22.6513 6.66966 20 6.66675ZM20 23.3334C18.6815 23.3334 17.3925 22.9424 16.2962 22.2099C15.1999 21.4773 14.3454 20.4361 13.8408 19.218C13.3362 17.9998 13.2042 16.6594 13.4614 15.3661C13.7187 14.0729 14.3536 12.8851 15.286 11.9527C16.2183 11.0204 17.4062 10.3854 18.6994 10.1282C19.9926 9.87095 21.3331 10.003 22.5512 10.5076C23.7694 11.0121 24.8106 11.8666 25.5431 12.9629C26.2757 14.0593 26.6667 15.3482 26.6667 16.6667C26.6648 18.4343 25.9618 20.1289 24.712 21.3787C23.4622 22.6286 21.7675 23.3316 20 23.3334Z\" fill=\"#FFA535\"/><path d=\"M20 2.28181e-06C16.1736 -0.00197488 12.4633 1.31335 9.4925 3.72489C6.52175 6.13643 4.47175 9.49716 3.68707 13.2422C2.9024 16.9872 3.43089 20.8882 5.18371 24.2894C6.93654 27.6907 9.80684 30.3848 13.3121 31.919C13.652 32.0559 13.9483 32.2826 14.1693 32.5749C14.3904 32.8672 14.5278 33.214 14.567 33.5783L14.7086 35.1628C14.8263 36.4852 15.4348 37.7156 16.4144 38.6117C17.3939 39.5078 18.6735 40.0047 20.0011 40.0045C21.3287 40.0043 22.6081 39.507 23.5873 38.6106C24.5666 37.7142 25.1747 36.4836 25.292 35.1612L25.4336 33.5798C25.4724 33.2155 25.6096 32.8686 25.8303 32.5763C26.051 32.2839 26.3471 32.057 26.6868 31.9198C30.1924 30.3859 33.063 27.6918 34.8161 24.2905C36.5691 20.8892 37.0978 16.9881 36.3133 13.2429C35.5287 9.49768 33.4787 6.13676 30.5078 3.72508C27.537 1.3134 23.8265 -0.00199969 20 2.28181e-06ZM25.3466 28.8667C24.4623 29.2463 23.6958 29.8561 23.1272 30.6326C22.5585 31.4091 22.2084 32.3238 22.1133 33.2815L21.9716 34.8628C21.9279 35.3553 21.7014 35.8135 21.3367 36.1473C20.9721 36.4811 20.4957 36.6663 20.0013 36.6665C19.507 36.6667 19.0304 36.4818 18.6655 36.1483C18.3006 35.8148 18.0738 35.3567 18.0296 34.8643L17.888 33.28C17.7923 32.3222 17.4417 31.4076 16.8725 30.6314C16.3033 29.8552 15.5364 29.2458 14.6516 28.8667C11.8468 27.6387 9.55008 25.4827 8.14734 22.7611C6.7446 20.0394 6.32133 16.9179 6.94864 13.921C7.57594 10.924 9.21561 8.23433 11.5921 6.30374C13.9687 4.37315 16.9373 3.31933 19.9991 3.31933C23.061 3.31933 26.0296 4.37315 28.4061 6.30374C30.7827 8.23433 32.4223 10.924 33.0496 13.921C33.6769 16.9179 33.2537 20.0394 31.8509 22.7611C30.4482 25.4827 28.1515 27.6387 25.3466 28.8667Z\" fill=\"#FFA535\"/></g><defs><clipPath id=\"clip0_10477_36565\"><rect width=\"48\" height=\"48\" fill=\"white\"/></clipPath></defs></svg>"; /* Original-Pin von dein-ausbildungsplatz.de/img/mapPin.svg */
  var CSS = '' +
    '.dapw{box-sizing:border-box;width:100%;max-width:360px;font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;line-height:1.35;border:1px solid var(--dapw-rand);border-radius:0 0 22px 0;overflow:hidden;background:var(--dapw-bg);color:var(--dapw-fg);text-align:left}' +
    '.dapw *{box-sizing:border-box}' +
    '.dapw.dapw p{margin:0!important;max-width:none!important;color:var(--dapw-fg)!important;line-height:1.35}' +
    '.dapw.dapw .dapw-label,.dapw.dapw .dapw-ecki-mini{color:var(--dapw-leise)!important}.dapw.dapw .dapw-titel span,.dapw.dapw .dapw-ecki-h span{color:var(--dapw-akz)!important}' +
    '.dapw.dapw .dapw-mitte .dapw-label{margin:0 0 8px!important;font-size:11px!important;font-weight:700}.dapw.dapw .dapw-ecki-text{padding:4px 18px 12px;font-size:13px!important;line-height:1.5}.dapw.dapw .dapw-ecki-mini{padding:0 18px 14px;font-size:11px!important}.dapw.dapw.dapw-klein .dapw-ecki-text{padding:2px 14px 10px;font-size:12px!important}.dapw.dapw.dapw-klein .dapw-ecki-mini{padding:0 14px 12px;font-size:10px!important}.dapw.dapw .dapw-titel{font-size:15px!important}.dapw.dapw.dapw-klein .dapw-titel{font-size:12px!important}.dapw.dapw .dapw-firma{font-size:12px!important}.dapw.dapw.dapw-klein .dapw-firma{font-size:11px!important}.dapw.dapw .dapw-ecki-h{font-size:19px!important}.dapw.dapw.dapw-klein .dapw-ecki-h{font-size:15px!important}' +
    '.dapw-hell{--dapw-bg:#fff;--dapw-fg:#3b3c42;--dapw-rand:#e3e6ea;--dapw-leise:#5f616a;--dapw-akz:#3b3c42;--dapw-chip:#f2f4f7}' +
    '.dapw-dunkel{--dapw-bg:#3b3c42;--dapw-fg:#fff;--dapw-rand:#55575e;--dapw-leise:#d0d2d7;--dapw-akz:#ffa535;--dapw-chip:#4d4e55}' +
    '.dapw-durchsichtig{--dapw-bg:transparent;--dapw-fg:#3b3c42;--dapw-rand:#3b3c42;--dapw-leise:#55575e;--dapw-akz:#3b3c42;--dapw-chip:rgba(59,60,66,.08)}' +
    '.dapw-kopf{display:flex;align-items:center;gap:12px;padding:16px 18px 12px}' +
    '.dapw-titel{font-size:15px;font-weight:800;letter-spacing:-.3px;margin:0}' +
    '.dapw-titel span{color:var(--dapw-akz)}' +
    '.dapw-firma{font-size:12px;font-weight:600;margin:3px 0 0}' +
    '.dapw-karte{position:relative;height:190px;background:#f2f3f0}' +
    '.dapw-map{height:100%;width:100%}' +
    '.dapw-quelle{position:absolute;right:0;bottom:0;z-index:2;font-size:9px;padding:2px 5px;background:rgba(255,255,255,.8);color:#3b3c42}' +
    '.dapw-zahl{position:absolute;right:10px;bottom:22px;z-index:500;font-size:11px;font-weight:700;padding:5px 7px;background:var(--dapw-bg);color:var(--dapw-fg);border-radius:0 0 6px 0;box-shadow:0 1px 3px rgba(0,0,0,.18)}' +
    '.dapw-mitte{padding:14px 18px 4px}' +
    '.dapw-label{font-size:11px;font-weight:700;color:var(--dapw-leise);margin:0 0 8px}' +
    '.dapw-berufe{display:flex;flex-wrap:wrap;gap:6px}' +
    '.dapw-berufe span{font-size:12px;font-weight:600;padding:6px 8px;background:var(--dapw-chip);border-radius:0 0 6px 0}' +
    '.dapw-knoepfe{display:flex;gap:8px;padding:12px 18px 16px}' +
    '.dapw-knoepfe a{flex:1;text-align:center;text-decoration:none!important;font-size:12.5px;font-weight:800;padding:11px 6px;white-space:nowrap;border-radius:0 0 8px 0}' +
    '.dapw-k1{background:#ffa535;color:#3b3c42!important}' +
    '.dapw-k2{border:1px solid var(--dapw-fg);color:var(--dapw-fg)!important}' +
    '.dapw-fuss{padding:9px 18px;border-top:1px solid var(--dapw-rand);font-size:10px}' +
    '.dapw-fuss{color:var(--dapw-leise)}.dapw-fuss a{color:var(--dapw-fg)!important;font-weight:700}' +
    '.dapw-pin{background:none;border:0}' +
    '.dapw-klein{max-width:260px}.dapw-klein .dapw-kopf{padding:12px 14px 10px;gap:9px}.dapw-klein .dapw-kopf svg{width:26px;height:26px}' +
    '.dapw-klein .dapw-titel{font-size:12px;white-space:nowrap}.dapw-klein .dapw-firma{font-size:11px}.dapw-klein .dapw-karte{height:120px}' +
    '.dapw-klein .dapw-mitte{padding:10px 14px 2px}.dapw-klein .dapw-berufe span{font-size:11px;padding:5px 7px}' +
    '.dapw-klein .dapw-knoepfe{flex-direction:column;gap:6px;padding:10px 14px 12px}.dapw-klein .dapw-knoepfe a{padding:9px 6px}' +
    '.dapw-klein .dapw-fuss{padding:7px 14px}.dapw-klein .dapw-ecki-logo{width:40px;height:40px}.dapw-klein .dapw-ecki-h{font-size:15px}' +
    '.dapw-ecki-kopf{display:flex;align-items:center;gap:14px;padding:18px 18px 8px}.dapw-ecki-logo{width:56px;height:56px;flex:none}' +
    '.dapw-ecki-h{font-size:19px;font-weight:800;letter-spacing:-.4px;margin:0;line-height:1.15}.dapw-ecki-h span{color:var(--dapw-akz)}' +
    '.dapw-ecki-text{font-size:13px;line-height:1.5;margin:0;padding:4px 18px 12px}' +
    '.dapw-ecki-form{display:flex;gap:8px;padding:0 18px 8px}.dapw-ecki-form input{flex:1;min-width:0;font:inherit;font-size:14px;padding:10px 12px;border:1px solid var(--dapw-fg);background:var(--dapw-bg);color:var(--dapw-fg);border-radius:0 0 8px 0}' +
    '.dapw-ecki-form a{font-size:13px;font-weight:800;padding:11px 14px;background:#ffa535;color:#3b3c42!important;text-decoration:none!important;white-space:nowrap;border-radius:0 0 8px 0}' +
    '.dapw-ecki-mini{font-size:11px;color:var(--dapw-leise);padding:0 18px 14px;margin:0}' +
    '.dapw-klein .dapw-ecki-kopf{padding:14px 14px 6px;gap:10px}.dapw-klein .dapw-ecki-text{padding:2px 14px 10px;font-size:12px}.dapw-klein .dapw-ecki-form{padding:0 14px 6px;flex-direction:column}.dapw-klein .dapw-ecki-form a{text-align:center}.dapw-klein .dapw-ecki-mini{padding:0 14px 12px;font-size:10px}' +
    '';

  var STIL = null;
  function maplibre(cb) {
    var los = false, fertig = function () { if (!los && window.maplibregl && STIL) { los = true; cb(); } };   /* nur einmal bauen */
    if (!document.getElementById('dapw-mcss')) {
      var l = document.createElement('link'); l.id = 'dapw-mcss'; l.rel = 'stylesheet';
      l.href = (window.DAPW_MAPLIBRE && window.DAPW_MAPLIBRE.css) || 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css'; document.head.appendChild(l);
    }
    var s = document.getElementById('dapw-mjs');
    if (!s) { s = document.createElement('script'); s.id = 'dapw-mjs'; s.src = (window.DAPW_MAPLIBRE && window.DAPW_MAPLIBRE.js) || 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js';   /* Plugins liefern MapLibre selbst mit */ document.head.appendChild(s); }
    if (window.maplibregl) fertig(); else s.addEventListener('load', fertig);
    if (STIL) fertig(); else if (!window.__dapwStil) {
      window.__dapwStil = fetch('https://tiles.openfreemap.org/styles/positron').then(function (r) { return r.json(); });
    }
    if (!STIL) window.__dapwStil.then(function (j) { STIL = marke(j); fertig(); });
  }
  /* Kartenstil in Markenfarben: grau, Hauptstraßen und Grenzen in Orange */
  function marke(st) {
    var O = '#ffa535', A = '#3b3c42';
    st.layers.forEach(function (l) {
      var p = l.paint = l.paint || {};
      if (/^(highway_motorway_inner|highway_motorway_bridge_inner)$/.test(l.id)) p['line-color'] = O;
      if (/^(highway_motorway_casing|highway_motorway_bridge_casing)$/.test(l.id)) p['line-color'] = '#e8a04a';
      if (/^boundary/.test(l.id)) { p['line-color'] = O; }
      if (l.id === 'highway_major_inner') { p['line-color'] = O; p['line-opacity'] = 0.28; }
      if (l.id === 'park' || l.id === 'landcover_wood') p['fill-color'] = 'rgb(232,234,236)';
      if (l.type === 'symbol' && p['text-color'] && /^label_|highway-name/.test(l.id)) p['text-color'] = A;
    });
    return st;
  }

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* Aktuelle Daten zum Kurzlink: karrieremag.de/s/daten.php?c=CODE (Standort, gemeldeter Betrieb oder abgeschaltet) */
  var DATENCACHE = {};
  function holeDaten(code, cb) {
    if (!DATENCACHE[code]) DATENCACHE[code] = fetch('https://karrieremag.de/s/daten.php?c=' + code).then(function (r) { return r.json(); })
      .catch(function () { return null; });
    DATENCACHE[code].then(cb);
  }
  function bau(el) {
    if (el.getAttribute('data-dapw')) return;
    var l0 = el.querySelector('a[rel~="nofollow"]'), km = l0 && /karrieremag\.de\/s\/([a-z0-9]{5,12})/.exec(l0.href);
    if (km && !el.__dapwDaten) {
      el.setAttribute('data-dapw', 'laedt');
      return holeDaten(km[1], function (j) {
        if (j && j.ok === false) { el.removeAttribute('data-dapw'); el.__dapwDaten = DATEN[el.getAttribute('data-sto')] || null; if (el.__dapwDaten) bau(el); return; }   /* Server gerade nicht erreichbar */
        if (!j || !j.aktiv) { el.style.display = 'none'; return; }   /* abgeschaltet */
        el.__dapwDaten = { firma: j.firma, strasse: j.strasse, plz: j.plz, ort: j.ort, lat: j.lat, lng: j.lng, pin: j.pin !== false, berufe: [] };
        el.removeAttribute('data-dapw'); bau(el);
      });
    }
    var d0 = el.__dapwDaten || DATEN[el.getAttribute('data-sto')]; if (!d0) return;
    var d = Object.assign({}, d0), eb = el.getAttribute('data-berufe');
    if (eb !== null) d.berufe = eb.split('|').map(function (x) { return x.trim(); })
      .filter(function (x) { return x && BERUFE && BERUFE[x]; }).slice(0, 3);   /* nur Berufe aus unserer Berufeliste */
    el.setAttribute('data-dapw', '1');
    var th = el.getAttribute('data-theme'); th = (th === 'dunkel' || th === 'durchsichtig') ? th : 'hell';
    var link = el.querySelector('a[rel~="nofollow"]') || el.querySelector('a[href*="dein-ausbildungsplatz"]');   /* Standort-Link (Kurzlink) aus dem Einbaucode */
    var marke = el.querySelector('a:not([rel~="nofollow"])[href^="https://karrieremag.de/"]:not([href*="/k/"])');   /* Markenlink karrieremag */
    var ziel = link ? link.href : 'https://dein-ausbildungsplatz.de/';
    var route = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(d.pin === false ? (d.strasse + ', ' + d.plz + ' ' + d.ort) : (d.lat + ',' + d.lng)) + '&travelmode=transit';
    var box = document.createElement('div');
    box.className = 'dapw dapw-' + th + (el.getAttribute('data-groesse') === 'klein' ? ' dapw-klein' : '');
    box.innerHTML =
      '<div class="dapw-kopf">' + SMILEY + '<div><p class="dapw-titel">Ausbildungsbetrieb <span>um die Ecke</span></p>' +
      '<p class="dapw-firma">' + esc(d.firma) + ' · ' + esc(d.plz + ' ' + d.ort) + '</p></div></div>' +
      '<div class="dapw-karte"><div class="dapw-map"></div></div>' +
      (d.berufe.length ? '<div class="dapw-mitte"><p class="dapw-label">Bei uns lernst du</p><div class="dapw-berufe">' +
      d.berufe.map(function (b) { return '<span>' + esc(b) + '</span>'; }).join('') + '</div></div>' : '') +
      '<div class="dapw-knoepfe"><a class="dapw-k1" href="' + route + '" target="_blank" rel="noopener">Weg mit Bus und Bahn</a>' +
      '<a class="dapw-k2" href="' + esc(ziel) + '" target="_blank" rel="nofollow noopener">Auf der Karte</a></div>' +
      '<div class="dapw-fuss"></div>';
    var fuss = box.querySelector('.dapw-fuss');
    if (!marke) { marke = document.createElement('a'); marke.href = 'https://karrieremag.de/'; marke.textContent = 'karrieremag'; }
    marke.target = '_blank';
        fuss.appendChild(marke);                                            /* Markenlink bleibt im HTML erhalten */
    if (link) { link.style.display = 'none'; fuss.appendChild(link); }  /* Standort-Link bleibt im HTML, sichtbar über die Knöpfe */
    el.innerHTML = ''; el.appendChild(box);

    maplibre(function () {
      var m = box.querySelector('.dapw-map'); m.style.height = '100%';
      var q = document.createElement('span'); q.className = 'dapw-quelle'; q.textContent = '© OpenStreetMap · OpenFreeMap'; m.parentNode.appendChild(q);
      var map = new maplibregl.Map({ container: m, style: STIL, center: [d.lng, d.lat], zoom: 12.4, interactive: false, attributionControl: false });
      if (d.pin !== false) {   /* gemeldete Betriebe bis zur Prüfung ohne Pin, nur die Gegend */
        var pin = document.createElement('div'); pin.innerHTML = PIN; pin.style.cssText = 'width:48px;height:48px;cursor:pointer';
        new maplibregl.Marker({ element: pin, anchor: 'bottom' }).setLngLat([d.lng, d.lat]).addTo(map);
      }
      m.style.cursor = 'pointer';
      m.addEventListener('click', function () { window.open(ziel, '_blank', 'noopener'); });
    });
  }

  var ECKI = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1080 1080\" class=\"dapw-ecki-logo\" aria-hidden=\"true\"><circle cx=\"540\" cy=\"540\" r=\"525\" fill=\"#ffffff\" stroke=\"#ffa535\" stroke-width=\"30\"/><circle cx=\"309.6\" cy=\"339.2\" r=\"69.5\" fill=\"#ffa535\"/><circle cx=\"626.6\" cy=\"339.2\" r=\"69.5\" fill=\"#ffa535\"/><path d=\"M526.5,892.5C573.8,887.0 613.3,875.5 655.7,855.0C721.4,823.3 773.2,777.0 812.3,715.2C830.1,687.1 849.8,639.9 856.0,610.5C856.7,607.2 857.6,604.1 858.0,603.7C858.4,603.3 864.0,611.0 870.5,621.0C877.0,631.0 884.3,641.1 886.7,643.5C892.3,649.1 903.7,654.8 912.2,656.2C925.7,658.6 942.1,652.9 951.9,642.5C964.8,628.9 968.2,609.1 960.6,592.5C956.2,582.8 872.2,454.5 866.6,448.9C853.7,436.0 833.2,432.0 816.8,439.3C813.9,440.6 781.8,460.4 745.5,483.3C674.2,528.3 672.8,529.4 667.0,541.5C652.0,572.9 676.8,609.1 711.7,606.7C722.6,605.9 726.5,604.1 750.9,588.8C762.1,581.7 771.5,576.1 771.7,576.4C772.0,576.7 771.4,580.4 770.5,584.7C752.8,664.6 699.5,732.5 623.7,771.5C579.0,794.6 535.8,805.1 484.5,805.4C451.5,805.6 429.2,802.4 400.6,793.5C382.1,787.8 373.6,784.4 357.9,776.6C329.2,762.2 306.7,744.8 279.6,716.1C273.2,709.4 270.3,707.1 264.1,704.1C256.8,700.6 256.1,700.5 245.5,700.5C236.5,700.6 233.5,701.0 229.0,702.8C217.9,707.2 208.2,716.9 203.8,728.0C201.9,732.5 201.5,735.5 201.5,744.6C201.5,755.3 201.6,755.8 205.2,763.1C214.6,781.9 255.9,819.6 290.4,840.9C342.5,872.9 394.9,889.2 462.5,894.4C472.8,895.2 514.0,894.0 526.5,892.5Z\" fill=\"#ffa535\" fill-rule=\"evenodd\"/></svg>";
  function baueEcki(el) {
    if (el.getAttribute('data-dapw')) return;
    var l0 = el.querySelector('a[rel~="nofollow"]'), km = l0 && /karrieremag\.de\/s\/([a-z0-9]{5,12})/.exec(l0.href);
    if (km && !el.__dapwOk) {   /* Kurzlink: kurz fragen, ob er abgeschaltet ist */
      el.setAttribute('data-dapw', 'laedt');
      return holeDaten(km[1], function (j) { if (j && j.ok && !j.aktiv) { el.style.display = 'none'; return; } el.__dapwOk = 1; el.removeAttribute('data-dapw'); baueEcki(el); });
    }
    el.setAttribute('data-dapw', '1');
    var th = el.getAttribute('data-theme'); th = (th === 'dunkel' || th === 'durchsichtig') ? th : 'hell';
    var eckiLink = l0 || el.querySelector('a[href*="/ecki"]'), marke = el.querySelector('a:not([rel~="nofollow"])[href^="https://karrieremag.de/"]:not([href*="/ecki"]):not([href*="/s/"])');
    var ziel = eckiLink ? eckiLink.href : 'https://karrieremag.de/ecki/';
    var box = document.createElement('div');
    box.className = 'dapw dapw-' + th + (el.getAttribute('data-groesse') === 'klein' ? ' dapw-klein' : '');
    box.innerHTML = '<div class="dapw-ecki-kopf">' + ECKI + '<p class="dapw-ecki-h">Welcher Beruf <span>passt zu dir?</span></p></div>' +
      '<p class="dapw-ecki-text">Ecki findet in drei Minuten Berufe, die zu dir passen. Dazu Ausbildungsbetriebe um die Ecke.</p>' +
      '<div class="dapw-ecki-form"><a href="' + esc(ziel) + '" target="_blank" rel="nofollow noopener" style="flex:1;text-align:center">Los geht\'s mit Ecki</a></div>' +
      '<p class="dapw-ecki-mini">Kostenlos · ohne Anmeldung · etwa 3 Minuten</p><div class="dapw-fuss"></div>';
    var fuss = box.querySelector('.dapw-fuss');
    if (!marke) { marke = document.createElement('a'); marke.href = 'https://karrieremag.de/'; marke.textContent = 'karrieremag'; }
    marke.target = '_blank'; fuss.appendChild(marke);
    if (eckiLink) { eckiLink.style.display = 'none'; fuss.appendChild(eckiLink); }
    el.innerHTML = ''; el.appendChild(box);
  }

  /* Berufeliste von karrieremag.de: nur diese Namen zeigt das Widget an */
  var BERUFE = null, berufeLaden = null;
  function berufe(cb) {
    if (BERUFE) return cb();
    if (!berufeLaden) berufeLaden = fetch('https://karrieremag.de/s/berufe.php').then(function (r) { return r.json(); })
      .then(function (l) { var m = {}; (l || []).forEach(function (n) { m[n] = 1; }); BERUFE = m; })
      .catch(function () { BERUFE = {}; });
    berufeLaden.then(cb);
  }
  function start() {
    if (!BERUFE && document.querySelector('.dap-siegel[data-berufe]:not([data-dapw])')) return berufe(start);
    if (!document.getElementById('dapw-css')) { var st = document.createElement('style'); st.id = 'dapw-css'; st.textContent = CSS; document.head.appendChild(st); }
    var els = document.querySelectorAll('.dap-siegel'); for (var i = 0; i < els.length; i++) bau(els[i]);
    var ek = document.querySelectorAll('.ecki-widget'); for (var k = 0; k < ek.length; k++) baueEcki(ek[k]);
  }
  window.dapwStart = start;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
