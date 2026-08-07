// Cek preferensi user, kalau dia matiin animasi di sistemnya, kita ikutin (hemat performa juga)
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Kita Masih pakai data dummy, nanti tinggal ganti isi array-nya kalau udah ada data asli

var daftarPesanWaitlist = [
    { nama: 'Leviona Nayla Arzila', fakultas: 'Fakultas Ilmu Komputer 2026', pesan: 'Kapan lagi ya bisa join UAKI, jujur aku suka banget sama kegiatannya apalagi kalo udah berbau muslimah tuh jadi excited buat ikut kegiatannya', waktu: '12.00' },
    { nama: 'Leviona Nayla Arzila', fakultas: 'Fakultas Ilmu Komputer 2026', pesan: 'Kapan lagi ya bisa join UAKI, jujur aku suka banget sama kegiatannya apalagi kalo udah berbau muslimah tuh jadi excited buat ikut kegiatannya', waktu: '12.00' },
    { nama: 'Leviona Nayla Arzila', fakultas: 'Fakultas Ilmu Komputer 2026', pesan: 'Kapan lagi ya bisa join UAKI, jujur aku suka banget sama kegiatannya apalagi kalo udah berbau muslimah tuh jadi excited buat ikut kegiatannya', waktu: '12.00' },
    { nama: 'Leviona Nayla Arzila', fakultas: 'Fakultas Ilmu Komputer 2026', pesan: 'Kapan lagi ya bisa join UAKI, jujur aku suka banget sama kegiatannya apalagi kalo udah berbau muslimah tuh jadi excited buat ikut kegiatannya', waktu: '12.00' },
    { nama: 'Leviona Nayla Arzila', fakultas: 'Fakultas Ilmu Komputer 2026', pesan: 'Kapan lagi ya bisa join UAKI, jujur aku suka banget sama kegiatannya apalagi kalo udah berbau muslimah tuh jadi excited buat ikut kegiatannya', waktu: '12.00' },
    { nama: 'Leviona Nayla Arzila', fakultas: 'Fakultas Ilmu Komputer 2026', pesan: 'Kapan lagi ya bisa join UAKI, jujur aku suka banget sama kegiatannya apalagi kalo udah berbau muslimah tuh jadi excited buat ikut kegiatannya', waktu: '12.00' }
];

var daftarFAQ = [
    { pertanyaan: 'Pertanyaan ?', jawaban: 'Jawaban 1' },
    { pertanyaan: 'Pertanyaan ?', jawaban: 'jawaban 2' },
    { pertanyaan: 'Pertanyaan ?', jawaban: 'jawaban 3' },
    { pertanyaan: 'Pertanyaan ?', jawaban: 'jawaban 4' }
];



// Bagian ini buat Render kartu pesan dari data di atas ke #daftarPesan

var daftarPesanEl = document.getElementById('daftarPesan');

function buatKartuPesan(data) {
    var kartu = document.createElement('div');
    kartu.className = 'kartu-pesan';
    kartu.innerHTML =
        '<div class="pesan-profil">' +
            '<strong>' +
                '<span class="ikon-profil"><img src="assets-tengah/icon-nama.svg" alt="Nama"></span>' +
                data.nama +
            '</strong>' +
            '<span class="pesan-fakultas">' +
                '<span class="ikon-profil"><img src="assets-tengah/icon-faculty.svg" alt="Fakultas"></span>' +
                data.fakultas +
            '</span>' +
        '</div>' +
        '<p class="pesan-isi">' + data.pesan + '</p>' +
        '<span class="pesan-waktu">' + data.waktu + '</span>';
    return kartu;
}

if (daftarPesanEl) {
    daftarPesanWaitlist.forEach(function (data) {
        daftarPesanEl.appendChild(buatKartuPesan(data));
    });
}

// Bagian ini Biar kartu waitlist yang di kanan ukurannya sama dengan kolom kiri. 
function samakanTinggiWaitlist() {
    var kolomKiri = document.getElementById('kolomKiri');
    var kartuWaitlist = document.getElementById('kartuWaitlist');
    if (!kolomKiri || !kartuWaitlist) return;

    kartuWaitlist.style.height = 'auto';

    var anak = Array.prototype.slice.call(kolomKiri.children);
    var gap = 24;
    var tinggiTarget = anak.reduce(function (total, el) {
        return total + el.offsetHeight;
    }, 0);
    tinggiTarget += gap * (anak.length - 1);

    kartuWaitlist.style.height = tinggiTarget + 'px';
}

window.addEventListener('load', samakanTinggiWaitlist);
window.addEventListener('resize', samakanTinggiWaitlist);



// Bagian Humberger Menu ketika layar menyusut

var menuToggle = document.getElementById('menuToggle');
var mobileMenu = document.getElementById('mobileMenu');

function setMenuState(isOpen) {
    mobileMenu.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
}

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        setMenuState(!mobileMenu.classList.contains('active'));
    });
}

document.addEventListener('click', function (e) {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            setMenuState(false);
        }
    }
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && mobileMenu) {
        setMenuState(false);
    }
});



// Ini buat Render pertanyaan dari data, terus pasang efek buka tutupnya
var daftarFaqEl = document.getElementById('daftarFaq');

if (daftarFaqEl) {
    daftarFAQ.forEach(function (data) {
        var item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML =
            '<div class="faq-pertanyaan">' +
                '<span>' + data.pertanyaan + '</span>' +
                '<span class="faq-ikon"><img src="assets-faq/icon-arrow.svg" alt="Buka pertanyaan"></span>' +
            '</div>';
        daftarFaqEl.appendChild(item);
    });
}

var semuaFaqItem = document.querySelectorAll('.faq-item');

semuaFaqItem.forEach(function (item, index) {
    var pertanyaan = item.querySelector('.faq-pertanyaan');
    var ikon = item.querySelector('.faq-ikon');
    if (!pertanyaan) return;

    var jawaban = document.createElement('div');
    jawaban.className = 'faq-jawaban';
    jawaban.textContent = (daftarFAQ[index] && daftarFAQ[index].jawaban) || 'Jawaban akan segera ditambahkan.';
    jawaban.style.maxHeight = '0px';
    jawaban.style.overflow = 'hidden';
    jawaban.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
    jawaban.style.padding = '0 20px';
    jawaban.style.fontSize = '13px';
    jawaban.style.lineHeight = '1.6';
    jawaban.style.color = '#626F44';
    item.appendChild(jawaban);

    pertanyaan.style.userSelect = 'none';

    pertanyaan.addEventListener('click', function () {
        var sedangAktif = item.classList.contains('active');

        semuaFaqItem.forEach(function (itemLain) {
            itemLain.classList.remove('active');
            var jawabanLain = itemLain.querySelector('.faq-jawaban');
            if (jawabanLain) {
                jawabanLain.style.maxHeight = '0px';
                jawabanLain.style.padding = '0 20px';
            }
            var ikonLain = itemLain.querySelector('.faq-ikon');
            if (ikonLain) ikonLain.style.transform = 'rotate(0deg)';
        });

        if (!sedangAktif) {
            item.classList.add('active');
            jawaban.style.maxHeight = (jawaban.scrollHeight + 20) + 'px';
            jawaban.style.padding = '4px 20px 20px';
            if (ikon) ikon.style.transform = 'rotate(90deg)';
        }
    });
});



// Bagian countdown time nya agar bisa berjalan (aku setting di 29 Agustus jam 5 pagi)

var semuaAngkaCountdown = document.querySelectorAll('.countdown-angka');
var elHari = semuaAngkaCountdown[0];
var elJam = semuaAngkaCountdown[1];
var elMenit = semuaAngkaCountdown[2];
var elDetik = semuaAngkaCountdown[3];

if (elHari && elJam && elMenit && elDetik) {
    var waktuTarget = new Date(2026, 7, 29, 5, 0, 0);

    var dua = function (angka) {
        return angka < 10 ? '0' + angka : '' + angka;
    };

    // Kasih efek flip tiap kali angkanya ganti, biar ga cuma loncat gitu aja
    var setAngkaCountdown = function (el, nilaiBaru) {
        if (el.textContent === nilaiBaru) return;
        el.textContent = nilaiBaru;

        if (prefersReducedMotion) return;

        el.classList.remove('flip');
        void el.offsetWidth; // trik biar animasinya bisa ke-restart tiap kali dipanggil
        el.classList.add('flip');
    };

    var intervalCountdown = null;

    var updateCountdown = function () {
        var sisa = waktuTarget.getTime() - new Date().getTime();

        if (sisa <= 0) {
            setAngkaCountdown(elHari, '00');
            setAngkaCountdown(elJam, '00');
            setAngkaCountdown(elMenit, '00');
            setAngkaCountdown(elDetik, '00');
            if (intervalCountdown) clearInterval(intervalCountdown);

            // Hook ke hero-buka.js, biar file ini nggak perlu tau soal
            // heroTutup/heroBuka - cuma manggil kalau fungsinya ada
            if (typeof tampilkanHeroBuka === 'function') {
                tampilkanHeroBuka();
            }
            return;
        }

        var hari = Math.floor(sisa / (1000 * 60 * 60 * 24));
        var jam = Math.floor((sisa % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var menit = Math.floor((sisa % (1000 * 60 * 60)) / (1000 * 60));
        var detik = Math.floor((sisa % (1000 * 60)) / 1000);

        setAngkaCountdown(elHari, dua(hari));
        setAngkaCountdown(elJam, dua(jam));
        setAngkaCountdown(elMenit, dua(menit));
        setAngkaCountdown(elDetik, dua(detik));
    };

    updateCountdown();
    intervalCountdown = setInterval(updateCountdown, 1000);
}



// bagian Waitlist pesan. Jadi pesan yang dikirim cuma nambah ke tampilan doang 

var inputPesan = document.getElementById('inputPesan');
var inputNama = document.getElementById('inputNama');
var inputFakultas = document.getElementById('inputFakultas');
var tombolKirim = document.getElementById('tombolKirim');

if (tombolKirim && daftarPesanEl) {
    tombolKirim.addEventListener('click', function () {
        var nama = inputNama.value.trim();
        var fakultas = inputFakultas.value.trim();
        var pesan = inputPesan.value.trim();

        if (!nama || !pesan) {
            alert('Jika ingin mengisi, jangan lupa input nama dan pesannya yaa...');
            return;
        }

        var sekarang = new Date();
        var jamSekarang = sekarang.getHours();
        var menitSekarang = sekarang.getMinutes();
        var waktu =
            (jamSekarang < 10 ? '0' + jamSekarang : jamSekarang) + '.' +
            (menitSekarang < 10 ? '0' + menitSekarang : menitSekarang);

        var kartuBaru = buatKartuPesan({
            nama: nama,
            fakultas: fakultas || '-',
            pesan: pesan,
            waktu: waktu
        });

        daftarPesanEl.insertBefore(kartuBaru, daftarPesanEl.firstChild);

        inputNama.value = '';
        inputFakultas.value = '';
        inputPesan.value = '';
    });
}



// Bagian Splash Screen, logo UAKI muncul dulu sebentar sebelum masuk ke halaman

var splashScreen = document.getElementById('splashScreen');

if (splashScreen) {
    var durasiSplash = prefersReducedMotion ? 300 : 1800;
    window.setTimeout(function () {
        splashScreen.classList.add('splash-hide');
    }, durasiSplash);
}



// Bagian Meteor / Bintang Jatuh, muncul acak di section hero

var heroSection = document.querySelector('.hero');

function buatMeteor() {
    if (!heroSection) return;

    var meteor = document.createElement('div');
    meteor.className = 'meteor';
    meteor.style.top = (Math.random() * 35) + '%';
    meteor.style.left = (55 + Math.random() * 40) + '%';
    meteor.style.animationDuration = (2 + Math.random() * 2) + 's';
    heroSection.appendChild(meteor);

    window.setTimeout(function () {
        meteor.remove();
    }, 4200);
}

function jadwalkanMeteor() {
    var jeda = 3000 + Math.random() * 4000;
    window.setTimeout(function () {
        buatMeteor();
        jadwalkanMeteor();
    }, jeda);
}

if (heroSection && !prefersReducedMotion) {
    jadwalkanMeteor();
}



// Bagian Counting Animasi buat jumlah Maba yang lagi menunggu

function animasikanCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;

    if (prefersReducedMotion) {
        el.textContent = target.toLocaleString('id-ID');
        return;
    }

    var durasi = 1500;
    var mulai = null;

    function langkah(waktuSekarang) {
        if (!mulai) mulai = waktuSekarang;
        var progres = Math.min((waktuSekarang - mulai) / durasi, 1);
        var eased = 1 - Math.pow(1 - progres, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('id-ID');
        if (progres < 1) {
            window.requestAnimationFrame(langkah);
        } else {
            el.textContent = target.toLocaleString('id-ID');
        }
    }

    window.requestAnimationFrame(langkah);
}

var elJumlahPendaftar = document.getElementById('jumlahPendaftar');
if (elJumlahPendaftar) {
    window.setTimeout(function () {
        animasikanCounter(elJumlahPendaftar);
    }, prefersReducedMotion ? 0 : 400);
}



// Bagian Fade Up saat Discroll, dipasang ke semua elemen yang punya class "reveal"

var semuaElemenReveal = document.querySelectorAll('.reveal');

if (semuaElemenReveal.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    semuaElemenReveal.forEach(function (elemen) {
        revealObserver.observe(elemen);
    });
} else {
    semuaElemenReveal.forEach(function (elemen) {
        elemen.classList.add('active');
    });
}