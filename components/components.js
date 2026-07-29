
// buat nyuntik navbar.html dan footer.html ke tiap halaman baru,
// biar navbar/footer nggak perlu ditulis ulang manual di tiap file.

function muatKomponen(selector, path) {
    return fetch(path)
        .then(function (res) {
            if (!res.ok) throw new Error('Gagal memuat ' + path);
            return res.text();
        })
        .then(function (html) {
            var target = document.querySelector(selector);
            if (target) target.innerHTML = html;
        })
        .catch(function (err) {
            console.error(err);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
        muatKomponen('#uakiNavbar', '/components/navbar.html'),
        muatKomponen('#uakiFooter', '/components/footer.html')
    ]).then(function () {
        inisialisasiNavbar();
        // Kabari halaman lain (misal auth.js) kalau navbar+footer sudah siap
        document.dispatchEvent(new CustomEvent('komponenSiap'));
    });
});

// Logic hamburger menu, sama kayak yang ada di script.js lama,
function inisialisasiNavbar() {
    var menuToggle = document.getElementById('menuToggle');
    var mobileMenu = document.getElementById('mobileMenu');

    if (!menuToggle || !mobileMenu) return;

    function setMenuState(isOpen) {
        mobileMenu.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        setMenuState(!mobileMenu.classList.contains('active'));
    });

    document.addEventListener('click', function (e) {
        if (mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                setMenuState(false);
            }
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) setMenuState(false);
    });
}