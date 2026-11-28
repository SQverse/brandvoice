/* BrandVoice.id — script halaman */
/* ====== PENGATURAN — GANTI DI SINI ====== */
var WA_NUMBER  = "6281390111550";   // nomor WhatsApp, format 62xxxxxxxxxx (tanpa + dan tanpa 0 di depan). Link di index.html ikut diperbarui otomatis oleh script ini
var WA_DISPLAY = "0813-9011-1550"; // nomor yang tampil di footer
var BG_VOLUME  = 0.4;             // volume musik latar (0 - 1)
/* ======================================== */

// Daftar website klien sekarang ditulis langsung di index.html (bagian #portofolio),
// supaya terbaca Google tanpa menunggu JavaScript. Petunjuk menambah klien ada di sana.

(function () {
  "use strict";
  document.body.classList.remove("no-js");

  function waLink(msg) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg || "Halo Brandvoice.id");
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  // Semua tombol WhatsApp
  document.querySelectorAll(".js-wa").forEach(function (a) {
    a.setAttribute("href", waLink(a.getAttribute("data-msg")));
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });
  document.querySelectorAll("[data-wa-text]").forEach(function (e) { e.textContent = WA_DISPLAY; });

  // ---------- Portofolio website klien ----------
  var sites = document.querySelectorAll("#sites .site");
  sites.forEach(function (card) {
    var img = card.querySelector(".site__shot img");
    if (!img) return;
    function fallback() {
      var shot = img.parentNode;
      img.remove();
      shot.append(el("div", "site__fallback", card.querySelector("h3").textContent));
    }
    if (img.complete && img.naturalWidth === 0) fallback();
    else img.addEventListener("error", fallback, { once: true });
  });
  document.getElementById("sitesCount").textContent = sites.length;

  // Header saat scroll + tombol ke atas
  var header = document.getElementById("header");
  var toTop = document.getElementById("toTop");
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("scrolled", y > 20);
    toTop.classList.toggle("show", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menu mobile
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  }
  burger.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // Menu aktif sesuai section.
  // Browser modern (Chrome/Edge 140+) menandai link aktif sendiri lewat CSS
  // (scroll-target-group + :target-current); di sini cukup menyalin statusnya ke aria-current.
  // Browser lain memakai IntersectionObserver sebagai cadangan.
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]:not(.btn)'));
  function markCurrent(current) {
    links.forEach(function (l) {
      var on = l === current;
      l.classList.toggle("active", on);
      if (on) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
    });
  }
  if (CSS.supports("scroll-target-group: auto")) {
    var syncCurrent = function () { markCurrent(nav.querySelector("a:target-current")); };
    syncCurrent();
    document.addEventListener("scrollend", syncCurrent);
  } else if ("IntersectionObserver" in window) {
    var sections = links.map(function (l) { return document.querySelector(l.getAttribute("href")); }).filter(Boolean);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          markCurrent(links.filter(function (l) { return l.getAttribute("href") === "#" + e.target.id; })[0]);
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // Animasi muncul saat di-scroll.
  // Browser yang mendukung scroll-driven animation menjalankannya murni lewat CSS (lihat style.css);
  // IntersectionObserver di bawah hanya cadangan untuk browser lama.
  var cssReveal = CSS.supports("(animation-timeline: view()) and (animation-range: entry)");
  if (!cssReveal && "IntersectionObserver" in window) {
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); rev.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (r, i) {
      r.style.transitionDelay = (i % 4) * 80 + "ms";
      rev.observe(r);
    });
  } else if (!cssReveal) {
    document.querySelectorAll(".reveal").forEach(function (r) { r.classList.add("in"); });
  }

  // FAQ: "hanya satu terbuka" kini ditangani HTML sendiri (<details name="faq">).

  // Form -> WhatsApp
  var form = document.getElementById("leadForm");
  var err = document.getElementById("formError");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    ["nama", "bisnis"].forEach(function (n) {
      var f = form.elements[n];
      var bad = !f.value.trim();
      f.classList.toggle("invalid", bad);
      if (bad) f.setAttribute("aria-invalid", "true"); else f.removeAttribute("aria-invalid");
      if (bad) ok = false;
    });
    if (!ok) {
      err.textContent = "Mohon isi nama dan nama bisnis Anda.";
      form.querySelector("[aria-invalid]").focus();
      return;
    }
    err.textContent = "";
    var msg =
      "Halo Brandvoice.id, saya ingin konsultasi brand gratis.\n\n" +
      "Nama: " + form.elements.nama.value.trim() + "\n" +
      "Bisnis: " + form.elements.bisnis.value.trim() + "\n" +
      "Paket: " + form.elements.paket.value +
      (form.elements.pesan.value.trim() ? "\nPesan: " + form.elements.pesan.value.trim() : "");
    window.open(waLink(msg), "_blank", "noopener");
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // ---------- Audio ----------
  var bgAudio = document.getElementById("bg-audio");
  var audioCtrl = document.getElementById("audio-ctrl");
  bgAudio.volume = BG_VOLUME;

  // Hanya satu audio yang boleh berbunyi dalam satu waktu
  function pauseOthers(current) {
    document.querySelectorAll("audio").forEach(function (a) { if (a !== current && !a.paused) a.pause(); });
  }
  function formatTime(sec) {
    if (!isFinite(sec) || sec < 0) return "0:00";
    var m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  // Pemutar contoh lagu
  document.querySelectorAll(".song").forEach(function (song) {
    var audio = song.querySelector("audio");
    var btn = song.querySelector(".p-btn");
    var icon = btn.querySelector("use");
    var seek = song.querySelector(".p-seek");
    var time = song.querySelector(".p-time");
    var title = song.querySelector("h3").textContent;
    var dragging = false;

    function setProgress(pct) { seek.value = pct; seek.style.setProperty("--p", pct + "%"); }

    btn.addEventListener("click", function () {
      if (audio.paused) audio.play().catch(function () {});
      else audio.pause();
    });
    audio.addEventListener("play", function () {
      pauseOthers(audio);
      song.classList.add("playing");
      icon.setAttribute("href", "#i-pause");
      btn.setAttribute("aria-label", "Jeda " + title);
    });
    audio.addEventListener("pause", function () {
      song.classList.remove("playing");
      icon.setAttribute("href", "#i-play");
      btn.setAttribute("aria-label", "Putar " + title);
    });
    audio.addEventListener("loadedmetadata", function () { time.textContent = formatTime(audio.duration); });
    audio.addEventListener("timeupdate", function () {
      if (dragging || !audio.duration) return;
      setProgress(audio.currentTime / audio.duration * 100);
      time.textContent = formatTime(audio.currentTime);
    });
    audio.addEventListener("ended", function () {
      setProgress(0);
      audio.currentTime = 0;
      time.textContent = formatTime(audio.duration);
    });
    seek.addEventListener("input", function () {
      dragging = true;
      seek.style.setProperty("--p", seek.value + "%");
      if (audio.duration) time.textContent = formatTime(seek.value / 100 * audio.duration);
    });
    seek.addEventListener("change", function () {
      dragging = false;
      if (audio.duration) audio.currentTime = seek.value / 100 * audio.duration;
    });
  });

  // Musik latar
  function updateBgUI() {
    var on = !bgAudio.paused;
    audioCtrl.classList.toggle("muted", !on);
    audioCtrl.setAttribute("aria-pressed", on);
    audioCtrl.setAttribute("aria-label", on ? "Matikan musik latar" : "Putar musik latar");
  }
  bgAudio.addEventListener("play", function () { pauseOthers(bgAudio); updateBgUI(); });
  bgAudio.addEventListener("pause", updateBgUI);

  audioCtrl.addEventListener("click", function () {
    if (bgAudio.paused) bgAudio.play().catch(function () {});
    else bgAudio.pause();
  });

  // Musik latar hanya diputar saat pengunjung menekan tombol musik (file ±3,5 MB baru diunduh saat itu).
})();
