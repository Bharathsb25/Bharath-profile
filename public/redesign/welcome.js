/*
 * Multilingual welcome popup: "Welcome" in the six languages of the people
 * Bharath works with, once per browser session, on whichever page a visitor
 * lands. A colourful card floats over the dimmed, blurred page and changes
 * colour with each language. Plain JS so the static homepage (public/redesign)
 * and the Next.js pages can share it. Click, tap, any key or the close button
 * dismisses it.
 */
(function () {
  var KEY = "welcome_seen";
  try {
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
  } catch (e) {
    return; // no storage (private mode, blocked): skip rather than show every page
  }
  if (/^\/admin/.test(location.pathname)) return;

  // ms = how long each greeting stays on screen. Tamil, Bharath's own
  // language, holds a little longer than the rest; English is a touch longer
  // too because the card is still easing in during its first moments.
  // c1/c2 = the card's gradient for that language (dark enough for white text).
  var WORDS = [
    { text: "Welcome", lang: "en", name: "English", ms: 800, c1: "#6d28d9", c2: "#0e7490" },
    { text: "வணக்கம்", lang: "ta", name: "Tamil", ms: 1200, c1: "#c2410c", c2: "#be185d" },
    { text: "स्वागत है", lang: "hi", name: "Hindi", ms: 500, c1: "#be185d", c2: "#6d28d9" },
    { text: "స్వాగతం", lang: "te", name: "Telugu", ms: 500, c1: "#047857", c2: "#0e7490" },
    { text: "ಸ್ವಾಗತ", lang: "kn", name: "Kannada", ms: 500, c1: "#1d4ed8", c2: "#7e22ce" },
    { text: "സ്വാഗതം", lang: "ml", name: "Malayalam", ms: 500, c1: "#a21caf", c2: "#c2410c" },
  ];
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var INDIC = "'Noto Sans Tamil','Noto Sans Devanagari','Noto Sans Telugu','Noto Sans Kannada','Noto Sans Malayalam','Nirmala UI','Latha','Mangal',";
  var SANS = "'Sora'," + INDIC + "system-ui,sans-serif";

  var css = [
    // registered colours let the card's gradient glide between languages
    "@property --bs-c1{syntax:'<color>';inherits:true;initial-value:#6d28d9}",
    "@property --bs-c2{syntax:'<color>';inherits:true;initial-value:#0e7490}",
    "@keyframes bs-fade{from{opacity:0}}",
    "@keyframes bs-pop{from{opacity:0;transform:translateY(26px) scale(.9)}}",
    "@keyframes bs-drift{50%{transform:translate(26px,-18px) scale(1.12)}}",
    "@keyframes bs-sweep{from{transform:translateX(-130%) skewX(-18deg)}to{transform:translateX(330%) skewX(-18deg)}}",
    "#bs-welcome{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;" +
      "background:rgba(7,8,22,.58);-webkit-backdrop-filter:blur(10px) saturate(1.2);backdrop-filter:blur(10px) saturate(1.2);" +
      "cursor:pointer;animation:bs-fade .35s ease;transition:opacity .45s ease}",
    "#bs-welcome.bs-out{opacity:0;pointer-events:none}",
    "#bs-welcome.bs-out .bs-card{transform:translateY(10px) scale(.96)}",
    "#bs-welcome .bs-card{position:relative;overflow:hidden;box-sizing:border-box;width:min(100%,540px);padding:62px 28px 30px;border-radius:32px;" +
      "text-align:center;color:#fff;cursor:default;font-family:" + SANS + ";" +
      "background:linear-gradient(135deg,var(--bs-c1),var(--bs-c2));transition:--bs-c1 .5s ease,--bs-c2 .5s ease,transform .45s cubic-bezier(.2,.7,.2,1);" +
      "box-shadow:0 44px 90px -24px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.22) inset,0 0 90px -10px var(--bs-c2);" +
      "animation:bs-pop .45s cubic-bezier(.2,.9,.25,1.15)}",
    "#bs-welcome .bs-card>*{position:relative}",
    "#bs-welcome .bs-deco{position:absolute!important;pointer-events:none}",
    "#bs-welcome .bs-dotgrid{inset:0;background-image:radial-gradient(rgba(255,255,255,.22) 1px,transparent 1.4px);background-size:22px 22px;" +
      "-webkit-mask-image:radial-gradient(ellipse at 50% 30%,#000,transparent 75%);mask-image:radial-gradient(ellipse at 50% 30%,#000,transparent 75%)}",
    "#bs-welcome .bs-orb{border-radius:50%;filter:blur(30px);background:#fff;opacity:.22;animation:bs-drift 7s ease-in-out infinite}",
    "#bs-welcome .bs-orb.a{width:220px;height:220px;left:-70px;top:-80px}",
    "#bs-welcome .bs-orb.b{width:260px;height:260px;right:-90px;bottom:-110px;animation-duration:9s;animation-direction:reverse}",
    "#bs-welcome .bs-shine{top:0;bottom:0;left:0;width:34%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);animation:bs-sweep 3.2s ease-in-out .5s infinite}",
    "#bs-welcome .bs-x{position:absolute!important;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.35);" +
      "background:rgba(255,255,255,.16);color:#fff;font:500 15px/1 system-ui,sans-serif;cursor:pointer;transition:background .2s,transform .2s}",
    "#bs-welcome .bs-x:hover{background:rgba(255,255,255,.3);transform:rotate(90deg)}",
    "#bs-welcome .bs-chip{display:inline-block;padding:7px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.32);background:rgba(255,255,255,.16);" +
      "font:600 12px/1 system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;transition:opacity .2s ease,transform .2s ease}",
    "#bs-welcome .bs-word{margin:20px 0 6px;font:800 clamp(42px,11vw,82px)/1.2 " + SANS + ";letter-spacing:-.02em;padding:0 .08em;" +
      "text-shadow:0 8px 34px rgba(0,0,0,.28);transition:opacity .2s ease,transform .2s ease}",
    "#bs-welcome .bs-word.bs-swap,#bs-welcome .bs-chip.bs-swap{opacity:0;transform:translateY(8px)}",
    "#bs-welcome .bs-row{margin:20px 0 6px;font:700 clamp(20px,3.6vw,28px)/1.7 " + SANS + ";text-shadow:0 4px 20px rgba(0,0,0,.25)}",
    "#bs-welcome .bs-dots{display:flex;gap:7px;justify-content:center;margin:14px 0 22px}",
    "#bs-welcome .bs-dots span{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.38);transition:background .2s,width .25s}",
    "#bs-welcome .bs-dots span.on{width:22px;border-radius:7px;background:#fff}",
    "#bs-welcome .bs-name{font:700 clamp(20px,3.4vw,24px)/1.2 'Sora',system-ui,sans-serif;letter-spacing:-.01em}",
    "#bs-welcome .bs-by{margin-top:6px;font:600 12px/1.4 system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.88)}",
    "#bs-welcome .bs-btn{margin-top:22px;padding:14px 28px;border:0;border-radius:999px;background:#fff;color:var(--bs-c1);cursor:pointer;" +
      "font:700 15px/1 system-ui,sans-serif;box-shadow:0 14px 30px -10px rgba(0,0,0,.45);transition:transform .2s,box-shadow .2s}",
    "#bs-welcome .bs-btn:hover{transform:translateY(-2px);box-shadow:0 18px 34px -10px rgba(0,0,0,.55)}",
    "@media (prefers-reduced-motion:reduce){#bs-welcome,#bs-welcome .bs-card,#bs-welcome .bs-orb,#bs-welcome .bs-shine{animation:none}" +
      "#bs-welcome .bs-card,#bs-welcome .bs-x,#bs-welcome .bs-btn{transition:none}}",
  ].join("\n");

  function el(tag, cls, text, parent) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    if (parent) parent.appendChild(n);
    return n;
  }

  var root = el("div");
  root.id = "bs-welcome";
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-label", "Welcome to Bharath Sathiskumar's portfolio");
  el("style", "", css, root);

  var card = el("div", "bs-card", "", root);
  function theme(w) {
    card.style.setProperty("--bs-c1", w.c1);
    card.style.setProperty("--bs-c2", w.c2);
  }
  theme(WORDS[0]);
  // decorative layers
  ["bs-dotgrid", "bs-orb a", "bs-orb b", "bs-shine"].forEach(function (c) {
    el("div", "bs-deco " + c, "", card).setAttribute("aria-hidden", "true");
  });
  var close = el("button", "bs-x", "✕", card);
  close.type = "button";
  close.setAttribute("aria-label", "Close welcome");

  var chip, word, dots;
  if (reduced) {
    el("div", "bs-chip", "Welcome", card);
    el("div", "bs-row", WORDS.map(function (w) { return w.text; }).join(" · "), card);
  } else {
    chip = el("div", "bs-chip", WORDS[0].name, card);
    word = el("div", "bs-word", WORDS[0].text, card);
    word.lang = WORDS[0].lang;
    dots = el("div", "bs-dots", "", card);
    dots.setAttribute("aria-hidden", "true");
    WORDS.forEach(function (_, i) {
      el("span", i === 0 ? "on" : "", "", dots);
    });
  }
  el("div", "bs-name", "Bharath Sathiskumar", card);
  el("div", "bs-by", "Implementation Specialist", card);
  var btn = el("button", "bs-btn", "Explore my work →", card);
  btn.type = "button";

  // The static homepage swaps its whole <html> element once its bundle loads,
  // which would drop the popup, so keep it attached until it is dismissed.
  var done = false;
  function attach() {
    if (done) return;
    var host = document.body || document.documentElement;
    if (host && root.parentNode !== host) host.appendChild(root);
  }
  attach();
  var keeper = setInterval(attach, 40);

  var timers = [];
  function finish() {
    if (done) return;
    timers.forEach(clearTimeout);
    root.classList.add("bs-out");
    setTimeout(function () {
      done = true;
      clearInterval(keeper);
      if (root.parentNode) root.parentNode.removeChild(root);
      removeEventListener("keydown", finish, true);
    }, 450);
  }
  root.addEventListener("click", finish);
  addEventListener("keydown", finish, true);

  if (reduced) {
    timers.push(setTimeout(finish, 3000));
  } else {
    // Chained rather than scheduled up front: each word's clock starts only
    // once it is on screen, so a busy main thread (the homepage bundle
    // loading) can't shorten a word's turn.
    var hold = function (i) {
      timers.push(setTimeout(function () {
        if (i === WORDS.length - 1) return finish();
        word.classList.add("bs-swap");
        chip.classList.add("bs-swap");
        timers.push(setTimeout(function () {
          var w = WORDS[i + 1];
          word.textContent = w.text;
          word.lang = w.lang;
          chip.textContent = w.name;
          theme(w);
          word.classList.remove("bs-swap");
          chip.classList.remove("bs-swap");
          var spans = dots.children;
          for (var j = 0; j < spans.length; j++) spans[j].className = j === i + 1 ? "on" : "";
          hold(i + 1);
        }, 200));
      }, WORDS[i].ms));
    };
    hold(0);
  }
})();
