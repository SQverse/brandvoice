/* BrandVoice.id — script halaman */
/* ====== PENGATURAN — GANTI DI SINI ====== */
var WA_NUMBER  = "6281390111550";   // nomor WhatsApp, format 62xxxxxxxxxx (tanpa + dan tanpa 0 di depan)
var WA_DISPLAY = "0813-9011-1550"; // nomor yang tampil di footer
var BG_VOLUME  = 0.4;             // volume musik latar (0 - 1)
/* ======================================== */

document.body.classList.remove('no-js');

// ---------- Link WhatsApp ----------
document.querySelectorAll('[data-wa]').forEach(function(a){
  a.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(a.dataset.wa);
  a.target = '_blank'; a.rel = 'noopener';
});
document.querySelectorAll('[data-wa-text]').forEach(function(e){ e.textContent = WA_DISPLAY; });
document.getElementById('yr').textContent = new Date().getFullYear();

// ---------- Menu mobile ----------
var burger = document.querySelector('.burger'), nav = document.getElementById('nav');
function setMenu(open){
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  burger.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
}
burger.addEventListener('click', function(){ setMenu(!nav.classList.contains('open')); });
nav.addEventListener('click', function(e){ if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', function(e){ if (e.key === 'Escape') setMenu(false); });
document.addEventListener('click', function(e){
  if (nav.classList.contains('open') && !e.target.closest('.header')) setMenu(false);
});

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

(function renderSites(){
  var grid = document.getElementById('sites');
  function el(tag, cls, text){ var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }
  websiteProjects.forEach(function(p, i){
    var a = el(p.url ? 'a' : 'div', 'site rv' + (p.url ? '' : ' soon'));
    if (p.url) {
      a.href = p.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', 'Buka website ' + p.name + ' (tab baru)');
    }
    a.style.transitionDelay = (i % 3) * 80 + 'ms';

    var bar = el('div', 'site-bar');
    bar.setAttribute('aria-hidden', 'true');
    bar.append(el('i'), el('i'), el('i'), el('span', '', p.url ? p.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'segera live'), el('b', 'live', p.url ? 'LIVE' : 'SOON'));

    var shot = el('div', 'site-shot');
    var img = el('img');
    img.src = p.preview; img.alt = 'Tampilan halaman awal website ' + p.name;
    img.loading = 'lazy'; img.decoding = 'async'; img.width = 1584; img.height = 734;
    img.addEventListener('error', function(){ img.remove(); shot.append(el('div', 'fallback', p.name)); }, { once:true });
    shot.append(img);

    var body = el('div', 'site-body');
    var link = el('span', 'site-link', p.url ? 'Buka Website ↗' : 'Segera Live');
    body.append(el('span', 'site-type', p.type), el('h4', '', p.name), el('p', '', p.description), link);

    a.append(bar, shot, body);
    grid.append(a);
  });
  document.getElementById('sitesCount').textContent = websiteProjects.length;
})();

// ---------- Animasi muncul saat scroll ----------
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold: .12});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
} else {
  document.querySelectorAll('.rv').forEach(function(el){ el.classList.add('in'); });
}

// ---------- Audio ----------
var bgAudio   = document.getElementById('bg-audio');
var audioCtrl = document.getElementById('audio-ctrl');
var bgUserOff = false; // true jika pengunjung sengaja mematikan musik latar
bgAudio.volume = BG_VOLUME;

// Hanya satu audio yang boleh berbunyi dalam satu waktu
function pauseOthers(current){
  document.querySelectorAll('audio').forEach(function(a){ if (a !== current && !a.paused) a.pause(); });
}

function formatTime(sec){
  if (!isFinite(sec) || sec < 0) return '0:00';
  var m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}

// Pemutar contoh lagu
document.querySelectorAll('.song').forEach(function(song){
  var audio = song.querySelector('audio');
  var btn   = song.querySelector('.p-btn');
  var icon  = btn.querySelector('use');
  var seek  = song.querySelector('.p-seek');
  var time  = song.querySelector('.p-time');
  var title = song.querySelector('h3').textContent;
  var dragging = false;

  function setProgress(pct){ seek.value = pct; seek.style.setProperty('--p', pct + '%'); }

  btn.addEventListener('click', function(){
    if (audio.paused) {
      audio.play().catch(function(){});
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', function(){
    pauseOthers(audio);
    song.classList.add('playing');
    icon.setAttribute('href', '#i-pause');
    btn.setAttribute('aria-label', 'Jeda ' + title);
  });
  audio.addEventListener('pause', function(){
    song.classList.remove('playing');
    icon.setAttribute('href', '#i-play-solid');
    btn.setAttribute('aria-label', 'Putar ' + title);
  });
  audio.addEventListener('loadedmetadata', function(){ time.textContent = formatTime(audio.duration); });
  audio.addEventListener('timeupdate', function(){
    if (dragging || !audio.duration) return;
    setProgress(audio.currentTime / audio.duration * 100);
    time.textContent = formatTime(audio.currentTime);
  });
  audio.addEventListener('ended', function(){
    setProgress(0);
    audio.currentTime = 0;
    time.textContent = formatTime(audio.duration);
  });

  seek.addEventListener('input', function(){
    dragging = true;
    seek.style.setProperty('--p', seek.value + '%');
    if (audio.duration) time.textContent = formatTime(seek.value / 100 * audio.duration);
  });
  seek.addEventListener('change', function(){
    dragging = false;
    if (audio.duration) audio.currentTime = seek.value / 100 * audio.duration;
  });
});

// Musik latar
function updateBgUI(){
  var on = !bgAudio.paused;
  audioCtrl.classList.toggle('muted', !on);
  audioCtrl.setAttribute('aria-pressed', on);
  audioCtrl.setAttribute('aria-label', on ? 'Matikan musik latar' : 'Putar musik latar');
}
bgAudio.addEventListener('play', function(){ pauseOthers(bgAudio); updateBgUI(); });
bgAudio.addEventListener('pause', updateBgUI);

audioCtrl.addEventListener('click', function(){
  if (bgAudio.paused) { bgUserOff = false; bgAudio.play().catch(function(){}); }
  else { bgUserOff = true; bgAudio.pause(); }
});

// Browser memblokir autoplay bersuara, jadi musik latar dimulai pada interaksi pertama pengunjung
var unlockEvents = ['pointerdown', 'keydown', 'touchstart'];
function startOnInteract(e){
  unlockEvents.forEach(function(ev){ document.removeEventListener(ev, startOnInteract, true); });
  if (bgUserOff || e.target.closest('#audio-ctrl, .song')) return;
  var songPlaying = Array.prototype.some.call(document.querySelectorAll('.song audio'), function(a){ return !a.paused; });
  if (!songPlaying) bgAudio.play().catch(function(){});
}
bgAudio.play().catch(function(){
  unlockEvents.forEach(function(ev){ document.addEventListener(ev, startOnInteract, true); });
});
