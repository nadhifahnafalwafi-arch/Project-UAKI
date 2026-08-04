
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

// Render kartu artikel dari data-artikel.js
// file ini butuh data-artikel.js (variabel daftarArtikel & kelasBadge) yang harus di load lebih dulu di berita.html.


var beritaGridEl = document.getElementById('beritaGrid');

function bukaDetailArtikel(id) {
    window.location.href = 'berita-detail.html?id=' + id;
}

function buatKartuArtikel(data) {
    var kartu = document.createElement('div');
    kartu.className = 'kartu-artikel';
    kartu.setAttribute('role', 'link');
    kartu.setAttribute('tabindex', '0');
    kartu.innerHTML =
        '<div class="kartu-artikel-thumb">' +
            '<img src="' + data.thumbnail + '" alt="' + data.judul + '">' +
            '<span class="kartu-artikel-badge ' + (kelasBadge[data.kategori] || '') + '">' + data.kategori + '</span>' +
        '</div>' +
        '<div class="kartu-artikel-isi">' +
            '<div class="kartu-artikel-judul">' + data.judul + '</div>' +
            '<div class="kartu-artikel-desc">' + data.deskripsi + '</div>' +
            '<div class="kartu-artikel-meta">' +
                '<span class="kartu-artikel-tanggal">' +
                    '<img src="../assets-berita/icon-calendar.svg" alt=""> ' + data.tanggal +
                '</span>' +
                '<a href="berita-detail.html?id=' + data.id + '" class="kartu-artikel-baca">' +
                    'Baca Selengkapnya <img src="../assets-berita/icon-panah.svg" alt="">' +
                '</a>' +
            '</div>' +
        '</div>';


    kartu.addEventListener('click', function (e) {
        if (e.target.closest('.kartu-artikel-baca')) return;
        bukaDetailArtikel(data.id);
    });
    kartu.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            bukaDetailArtikel(data.id);
        }
    });

    return kartu;
}

function renderArtikel(daftar) {
    beritaGridEl.innerHTML = '';
    daftar.forEach(function (data) {
        beritaGridEl.appendChild(buatKartuArtikel(data));
    });
}

if (beritaGridEl) renderArtikel(daftarArtikel);

var semuaTab = document.querySelectorAll('.berita-tab');

semuaTab.forEach(function (tab) {
    tab.addEventListener('click', function () {
        semuaTab.forEach(function (t) { t.classList.remove('is-aktif'); });
        tab.classList.add('is-aktif');

        var kategori = tab.getAttribute('data-kategori');
        if (kategori === 'Semua') {
            renderArtikel(daftarArtikel);
        } else {
            renderArtikel(daftarArtikel.filter(function (a) { return a.kategori === kategori; }));
        }
    });
});

var semuaHalamanBtn = document.querySelectorAll('.halaman-btn[data-halaman]');

semuaHalamanBtn.forEach(function (btn) {
    btn.addEventListener('click', function () {
        semuaHalamanBtn.forEach(function (b) { b.classList.remove('is-aktif'); });
        btn.classList.add('is-aktif');

        window.scrollTo({ top: document.querySelector('.berita').offsetTop, behavior: 'smooth' });
    });
});