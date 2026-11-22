/* BrandVoice.id — script halaman */
/* ====== PENGATURAN — GANTI DI SINI ====== */
var WA_NUMBER  = "6281390111550";   // nomor WhatsApp, format 62xxxxxxxxxx (tanpa + dan tanpa 0 di depan)
var WA_DISPLAY = "0813-9011-1550"; // nomor yang tampil di footer
var BG_VOLUME  = 0.4;             // volume musik latar (0 - 1)
/* ======================================== */

// ---------- Portofolio website klien ----------
// CARA TAMBAH WEBSITE BARU:
// 1. Screenshot halaman awal website (tanpa bar browser & taskbar, ukuran 1584x734), simpan ke folder assets/images/portofolio/websites/
// 2. Salin satu baris di bawah, lalu ganti name, type, description, url, dan preview.
//    Kalau link belum ada, isi url:'' -> kartu tampil sebagai "Segera Live" tanpa link.
var websiteProjects = [
  { name:'Quantum Telecommunication', type:'Company Profile Website', description:'Website company profile untuk LPK Quantum Telecommunication Semarang.', url:'https://quantumtelecom.id/', preview:'assets/images/portofolio/websites/ss-quantum.webp' },
  { name:'Vbat Ponsel', type:'Landing Page', description:'Landing page untuk Vbat Ponsel.', url:'https://vbatponsel.com/', preview:'assets/images/portofolio/websites/ss-vbatponsel.webp' },
  { name:'Soppi - Sop Iga Sapi', type:'Landing Page', description:'Landing page untuk rumah makan Soppi - Sop Iga Sapi.', url:'https://sqverse.github.io/soppi/', preview:'assets/images/portofolio/websites/ss-soppi.webp' },
  { name:'Kopi Gelas Tjilik', type:'Landing Page', description:'Landing page untuk Kopi Gelas Tjilik.', url:'https://sqverse.github.io/kopi-gelas-tjilik/', preview:'assets/images/portofolio/websites/ss-kgt.webp' },
  { name:'Soto Angkring Mas Boed', type:'Landing Page', description:'Landing page untuk rumah makan Soto Angkring Mas Boed.', url:'https://sqverse.github.io/soto-angkring-mas-boed/', preview:'assets/images/portofolio/websites/ss-soto-angkring-mas-boed.webp' },
  { name:'Kedai Pleburan', type:'Landing Page', description:'Landing page untuk Kedai Pleburan.', url:'https://sqverse.github.io/kedai-pleburan/', preview:'assets/images/portofolio/websites/ss-kedai-pleburan.webp' },
  { name:'Keboen Buah', type:'Landing Page', description:'Landing page untuk Keboen Buah.', url:'https://sqverse.github.io/keboen-buah/', preview:'assets/images/portofolio/websites/ss-keboen-buah.webp' },
  { name:'Burjo Bae', type:'Landing Page', description:'Landing page untuk Burjo Bae.', url:'https://sqverse.github.io/burjo-bae/', preview:'assets/images/portofolio/websites/ss-burjo-bae.webp' },
  { name:'Olsen', type:'Landing Page', description:'Landing page untuk Olsen.', url:'https://sqverse.github.io/olsen/', preview:'assets/images/portofolio/websites/ss-olsen.webp' },
  { name:'Tiyan Massage', type:'Landing Page', description:'Landing page untuk Tiyan Massage Semarang.', url:'https://sqverse.github.io/tiyan-message/', preview:'assets/images/portofolio/websites/ss-tiyan-massage.webp' },
  { name:'Amaga Corp', type:'Company Profile & Lagu Perusahaan', description:'Website company profile holding company Amaga Corp Semarang, lengkap dengan lagu perusahaan.', url:'https://sqverse.github.io/amaga-corp/', preview:'assets/images/portofolio/websites/ss-amaga-corp.webp' }
];

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
  var grid = document.getElementById("sites");
  websiteProjects.forEach(function (p) {
    var card = el(p.url ? "a" : "div", "site reveal" + (p.url ? "" : " soon"));
    if (p.url) {
      card.href = p.url; card.target = "_blank"; card.rel = "noopener noreferrer";
      card.setAttribute("aria-label", "Buka website " + p.name + " (tab baru)");
    }
    card.title = p.description;

    var shot = el("div", "site__shot");
    var img = el("img");
    img.src = p.preview; img.alt = "Tampilan halaman awal website " + p.name;
    img.loading = "lazy"; img.decoding = "async"; img.width = 1584; img.height = 734;
    img.addEventListener("error", function () { img.remove(); shot.append(el("div", "site__fallback", p.name)); }, { once: true });
    shot.append(img);

    var body = el("div", "site__body");
    body.append(el("span", "site__type", p.type), el("h3", "", p.name), el("span", "site__link", p.url ? "Buka Website ↗" : "Segera Live"));

    card.append(shot, el("span", "site__live", p.url ? "LIVE" : "SOON"), body);
    grid.append(card);
  });
  document.getElementById("sitesCount").textContent = websiteProjects.length;

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

  // Menu aktif sesuai section + animasi muncul
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]:not(.btn)'));
  var sections = links.map(function (l) { return document.querySelector(l.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });

    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); rev.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (r, i) {
      r.style.transitionDelay = (i % 4) * 80 + "ms";
      rev.observe(r);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (r) { r.classList.add("in"); });
  }

  // FAQ: hanya satu terbuka
  var details = document.querySelectorAll(".accordion details");
  details.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) details.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

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
      if (bad) ok = false;
    });
    if (!ok) { err.textContent = "Mohon isi nama dan nama bisnis Anda."; return; }
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
  var bgUserOff = false; // true jika pengunjung sengaja mematikan musik latar
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
    if (bgAudio.paused) { bgUserOff = false; bgAudio.play().catch(function () {}); }
    else { bgUserOff = true; bgAudio.pause(); }
  });

  // Browser memblokir autoplay bersuara, jadi musik latar dimulai pada interaksi pertama pengunjung.
  // File musik (±5 MB) baru diunduh saat itu, supaya halaman tetap cepat terbuka.
  var unlockEvents = ["pointerdown", "keydown", "touchstart"];
  function startOnInteract(e) {
    unlockEvents.forEach(function (ev) { document.removeEventListener(ev, startOnInteract, true); });
    if (bgUserOff || e.target.closest("#audio-ctrl, .song")) return;
    var songPlaying = Array.prototype.some.call(document.querySelectorAll(".song audio"), function (a) { return !a.paused; });
    if (!songPlaying) bgAudio.play().catch(function () {});
  }
  unlockEvents.forEach(function (ev) { document.addEventListener(ev, startOnInteract, true); });
})();
