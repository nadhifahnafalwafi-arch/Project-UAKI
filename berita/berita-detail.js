
var menuToggle = document.getElementById('menuToggle');
var mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = mobileMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
        if (mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) mobileMenu.classList.remove('active');
    });
}

// Kita Ambil ?id=... dari URL, cari artikelnya dari data-artikel.js, lalu render ke halaman.


function ambilIdDariUrl() {
    var params = new URLSearchParams(window.location.search);
    var id = parseInt(params.get('id'), 10);
    return isNaN(id) ? null : id;
}

function cariArtikel(id) {
    var ditemukan = daftarArtikel.find(function (a) { return a.id === id; });
    return ditemukan || daftarArtikel[0];
}

function renderDetailArtikel(data) {
    document.title = data.judul + ' - UAKI UB';

    var gambarEl = document.getElementById('detailGambar');
    gambarEl.src = data.gambarDetail;
    gambarEl.alt = data.judul;

    var badgeEl = document.getElementById('detailBadge');
    badgeEl.textContent = data.kategori;
    badgeEl.className = 'detail-badge ' + (kelasBadge[data.kategori] || '');

    document.getElementById('detailTanggal').textContent = data.tanggal;
    document.getElementById('detailJudul').textContent = data.judul;

    document.getElementById('detailPenulisFoto').src = data.penulis.foto;
    document.getElementById('detailPenulisFoto').alt = data.penulis.nama;
    document.getElementById('detailPenulisNama').textContent = data.penulis.nama;
    document.getElementById('detailPenulisPeran').textContent = data.penulis.peran;

    var kontenEl = document.getElementById('detailKonten');
    kontenEl.innerHTML = '';
    data.konten.forEach(function (paragraf) {
        var p = document.createElement('p');
        p.textContent = paragraf;
        kontenEl.appendChild(p);
    });
}

var artikelSaatIni = cariArtikel(ambilIdDariUrl());
if (artikelSaatIni) renderDetailArtikel(artikelSaatIni);

var tombolInstagram = document.getElementById('shareInstagram');
var tombolWhatsapp = document.getElementById('shareWhatsapp');
var tombolLink = document.getElementById('shareLink');

if (tombolWhatsapp) {
    tombolWhatsapp.addEventListener('click', function () {
        var teks = encodeURIComponent(artikelSaatIni.judul + ' - ' + window.location.href);
        window.open('https://wa.me/?text=' + teks, '_blank');
    });
}

if (tombolInstagram) {
    tombolInstagram.addEventListener('click', function () {

        salinTautan(tombolInstagram);
    });
}

if (tombolLink) {
    tombolLink.addEventListener('click', function () {
        salinTautan(tombolLink);
    });
}

function salinTautan(tombol) {
    navigator.clipboard.writeText(window.location.href).then(function () {
        tombol.classList.add('tersalin');
        setTimeout(function () { tombol.classList.remove('tersalin'); }, 1200);
    });
}