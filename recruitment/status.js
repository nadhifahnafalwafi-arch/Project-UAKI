// buat halaman success, countdown pengumuman, result


// Halaman Success (Pendaftaran Berhasil) 
var tombolGabungWa = document.getElementById('tombolGabungWa');
if (tombolGabungWa) {
    // Tganti href="#" di success.html dengan link grup WA asli
    tombolGabungWa.addEventListener('click', function (e) {
        if (tombolGabungWa.getAttribute('href') === '#') {
            e.preventDefault();
            alert('Link grup WhatsApp belum tersedia (masih dummy).');
        }
    });
}

var tombolLanjutSuccess = document.getElementById('tombolLanjutSuccess');
if (tombolLanjutSuccess) {
    tombolLanjutSuccess.addEventListener('click', function () {
        window.location.href = 'announcement.html';
    });
}

// Halaman Announcement (Countdown Pengumuman) 
var countdownBox = document.getElementById('countdownBox');
if (countdownBox) {
    var elHari = document.getElementById('countdownHari');
    var elJam = document.getElementById('countdownJam');
    var elMenit = document.getElementById('countdownMenit');
    var elDetik = document.getElementById('countdownDetik');
    var labelCountdown = document.getElementById('labelCountdown');
    var pesanCountdown = document.getElementById('pesanCountdown');
    var tombolBukaWrap = document.getElementById('tombolBukaWrap');
    var tombolBukaPengumuman = document.getElementById('tombolBukaPengumuman');

    //  ganti tanggal dummy ini dengan waktu rilis pengumuman asli
    var waktuTarget = new Date(2026, 7, 29, 5, 0, 0);

    var dua = function (angka) { return angka < 10 ? '0' + angka : '' + angka; };
    var intervalCountdown = null;

    function updateCountdown() {
        var sisa = waktuTarget.getTime() - new Date().getTime();

        if (sisa <= 0) {
            clearInterval(intervalCountdown);
            countdownBox.style.display = 'none';
            labelCountdown.style.display = 'none';
            pesanCountdown.textContent = 'Pengumuman dibuka, jangan lupa ucap basmalah ya..';
            pesanCountdown.classList.add('is-selesai');
            tombolBukaWrap.style.display = 'block';

            var blobKiriAtas = document.querySelector('.decor-blob-1');
            var blobKananBawah = document.querySelector('.decor-blob-2');
            if (blobKiriAtas) blobKiriAtas.style.display = 'none';
            if (blobKananBawah) blobKananBawah.style.display = 'none';

            return;
        }

        elHari.textContent = dua(Math.floor(sisa / (1000 * 60 * 60 * 24)));
        elJam.textContent = dua(Math.floor((sisa % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        elMenit.textContent = dua(Math.floor((sisa % (1000 * 60 * 60)) / (1000 * 60)));
        elDetik.textContent = dua(Math.floor((sisa % (1000 * 60)) / 1000));
    }

    updateCountdown();
    intervalCountdown = setInterval(updateCountdown, 1000);

    //  ganti redirect ini kalau hasil oprec nanti dicek dulu ke API
    tombolBukaPengumuman.addEventListener('click', function () {
        window.location.href = 'result.html';
    });
}

//  Halaman Result (Lolos/Tidak Lolos) 
var resultLolos = document.getElementById('resultLolos');
var resultTidakLolos = document.getElementById('resultTidakLolos');
if (resultLolos && resultTidakLolos) {
    // ganti flag dummy ini dengan hasil pengecekan API asli.
    // Buat coba tampilan "tidak lolos", ganti sementara jadi false.
    var statusLolos = true;

    resultLolos.style.display = statusLolos ? 'block' : 'none';
    resultTidakLolos.style.display = statusLolos ? 'none' : 'block';
}