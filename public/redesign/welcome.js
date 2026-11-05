/*
 * Multilingual welcome splash: "Welcome" in the six languages of the people
 * Bharath works with, once per browser session, on whichever page a visitor
 * lands. Plain JS so the static homepage (public/redesign) and the Next.js
 * pages can share it. Click, tap or any key skips it.
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
  // language, holds a little longer than the rest.
  var WORDS = [
    { text: "Welcome", lang: "en", ms: 500 },
    { text: "வணக்கம்", lang: "ta", ms: 1200 },
    { text: "स्वागत है", lang: "hi", ms: 500 },
    { text: "స్వాగతం", lang: "te", ms: 500 },
    { text: "ಸ್ವಾಗತ", lang: "kn", ms: 500 },
    { text: "സ്വാഗതം", lang: "ml", ms: 500 },
  ];
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var INDIC = "'Noto Sans Tamil','Noto Sans Devanagari','Noto Sans Telugu','Noto Sans Kannada','Noto Sans Malayalam','Nirmala UI','Latha','Mangal',";

  var css =
    "#bs-welcome{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;" +
    "background:radial-gradient(60vw 50vh at 20% 10%,rgba(139,92,246,.22),transparent 70%),radial-gradient(50vw 45vh at 85% 90%,rgba(34,211,238,.14),transparent 70%),#0a0b14;" +
    "color:#e8e9f3;cursor:pointer;transition:opacity .6s ease,transform .6s cubic-bezier(.2,.7,.2,1)}" +
    "#bs-welcome.bs-out{opacity:0;transform:translateY(-12px);pointer-events:none}" +
    "#bs-welcome .bs-word{font:700 clamp(44px,9vw,112px)/1.15 'Sora'," + INDIC + "system-ui,sans-serif;letter-spacing:-.02em;" +
    "background:linear-gradient(90deg,#a78bfa,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent;" +
    "padding:0 .1em;transition:opacity .2s ease,transform .2s ease}" +
    "#bs-welcome .bs-word.bs-swap{opacity:0;transform:translateY(8px)}" +
    "#bs-welcome .bs-row{font:600 clamp(18px,2.6vw,26px)/1.6 " + INDIC + "system-ui,sans-serif;color:#c9cbe6;text-align:center;max-width:90vw}" +
    "#bs-welcome .bs-by{font:500 14px/1.4 system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#a9abc4}" +
    "#bs-welcome .bs-skip{position:absolute;bottom:28px;font:500 13px system-ui,sans-serif;color:#a9abc4}" +
    "#bs-welcome .bs-dots{display:flex;gap:6px}" +
    "#bs-welcome .bs-dots span{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.18);transition:background .2s,width .2s}" +
    "#bs-welcome .bs-dots span.on{width:18px;border-radius:6px;background:linear-gradient(90deg,#a78bfa,#22d3ee)}";

  var root = document.createElement("div");
  root.id = "bs-welcome";
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-label", "Welcome to Bharath Sathiskumar's portfolio");
  var style = document.createElement("style");
  style.textContent = css;
  root.appendChild(style);

  var word, dots;
  if (reduced) {
    var row = document.createElement("div");
    row.className = "bs-row";
    row.textContent = WORDS.map(function (w) { return w.text; }).join(" · ");
    root.appendChild(row);
  } else {
    word = document.createElement("div");
    word.className = "bs-word";
    word.textContent = WORDS[0].text;
    word.lang = WORDS[0].lang;
    root.appendChild(word);
    dots = document.createElement("div");
    dots.className = "bs-dots";
    dots.setAttribute("aria-hidden", "true");
    WORDS.forEach(function (_, i) {
      var d = document.createElement("span");
      if (i === 0) d.className = "on";
      dots.appendChild(d);
    });
    root.appendChild(dots);
  }
  var by = document.createElement("div");
  by.className = "bs-by";
  by.textContent = "Bharath Sathiskumar · Implementation Specialist";
  root.appendChild(by);
  var skip = document.createElement("div");
  skip.className = "bs-skip";
  skip.textContent = "Tap anywhere to skip";
  root.appendChild(skip);

  // The static homepage swaps its whole <html> element once its bundle loads,
  // which would drop the splash, so keep it attached until it is dismissed.
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
    }, 600);
  }
  root.addEventListener("click", finish);
  addEventListener("keydown", finish, true);

  if (reduced) {
    timers.push(setTimeout(finish, 2200));
  } else {
    // Chained rather than scheduled up front: each word's clock starts only
    // once it is on screen, so a busy main thread (the homepage bundle
    // loading) can't shorten a word's turn.
    var hold = function (i) {
      timers.push(setTimeout(function () {
        if (i === WORDS.length - 1) return finish();
        word.classList.add("bs-swap");
        timers.push(setTimeout(function () {
          var w = WORDS[i + 1];
          word.textContent = w.text;
          word.lang = w.lang;
          word.classList.remove("bs-swap");
          var spans = dots.children;
          for (var j = 0; j < spans.length; j++) spans[j].className = j === i + 1 ? "on" : "";
          hold(i + 1);
        }, 200));
      }, WORDS[i].ms));
    };
    hold(0);
  }
})();
