// Toggle tampilan hero begitu pendaftaran resmi dibuka.

function tampilkanHeroBuka() {
    var heroTutup = document.getElementById('heroTutup');
    var heroBuka = document.getElementById('heroBuka');
    var dekorasiTutup = document.getElementById('dekorasiTutup');
    var dekorasiBuka = document.getElementById('dekorasiBuka');
    var navbarTutup = document.getElementById('navbarTutup');
    var navbarBuka = document.getElementById('navbarBuka');

    if (!heroTutup || !heroBuka) return;

    // waktuTarget di script.js nanti diganti tanggal
    heroTutup.style.display = 'none';
    heroBuka.style.display = 'block';

    if (dekorasiTutup) dekorasiTutup.style.display = 'none';
    if (dekorasiBuka) dekorasiBuka.style.display = 'block';

    if (navbarTutup) navbarTutup.style.display = 'none';
    if (navbarBuka) navbarBuka.style.display = 'flex';
}

var menuToggleBuka = document.getElementById('menuToggleBuka');
var mobileMenuBuka = document.getElementById('mobileMenuBuka');

if (menuToggleBuka && mobileMenuBuka) {
    menuToggleBuka.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = mobileMenuBuka.classList.toggle('active');
        menuToggleBuka.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
        if (mobileMenuBuka.classList.contains('active')) {
            if (!mobileMenuBuka.contains(e.target) && !menuToggleBuka.contains(e.target)) {
                mobileMenuBuka.classList.remove('active');
                menuToggleBuka.setAttribute('aria-expanded', 'false');
            }
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) mobileMenuBuka.classList.remove('active');
    });
}