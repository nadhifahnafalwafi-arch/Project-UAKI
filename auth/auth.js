// ALogin, Register, Lupa Sandi, Kata Sandi Baru
// "login"/"daftar" masih dummy.

// Toggle show/hide password (dipakai di login & register) ---
document.querySelectorAll('.toggle-password').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-target');
        var input = document.getElementById(targetId);
        var icon = btn.querySelector('img');
        if (!input || !icon) return;

        var isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        icon.src = isPassword ? '/assets-auth/icon-eye-slash.svg' : '/assets-auth/icon-eye.svg';
        icon.alt = isPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi';
    });
});

// Form Login 
var formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', function (e) {
        e.preventDefault();

        var email = document.getElementById('emailLogin');
        var password = document.getElementById('passwordLogin');
        var tombolMasuk = document.getElementById('tombolMasuk');

        var valid = true;
        [email, password].forEach(function (input) {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                valid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        if (!valid) return;

        tombolMasuk.disabled = true;
        tombolMasuk.textContent = 'Memproses...';

        // ganti setTimeout bagian ini dengan fetch ke endpoint login asli
        setTimeout(function () {
            window.location.href = '../recruitment/form.html';
        }, 700);
    });
}

// Form Lupa Kata Sandi
var formLupaSandi = document.getElementById('formLupaSandi');
if (formLupaSandi) {
    formLupaSandi.addEventListener('submit', function (e) {
        e.preventDefault();

        var email = document.getElementById('emailLupaSandi');
        var tombolKirimReset = document.getElementById('tombolKirimReset');
        var noticeTerkirim = document.getElementById('noticeTerkirim');

        if (!email.value.trim()) {
            email.classList.add('is-invalid');
            return;
        }
        email.classList.remove('is-invalid');

        tombolKirimReset.disabled = true;
        tombolKirimReset.textContent = 'Mengirim...';

        // ganti setTimeout bagian ini dengan fetch ke endpoint kirim link reset asli
        setTimeout(function () {
            noticeTerkirim.classList.add('active');
            tombolKirimReset.textContent = 'Kirim Ulang';
            tombolKirimReset.disabled = false;
        }, 700);
    });
}

// Form Kata Sandi Baru
var formSandiBaru = document.getElementById('formSandiBaru');
if (formSandiBaru) {
    formSandiBaru.addEventListener('submit', function (e) {
        e.preventDefault();

        var sandiBaru = document.getElementById('sandiBaru');
        var konfirmasiSandiBaru = document.getElementById('konfirmasiSandiBaru');
        var errorKonfirmasiSandiBaru = document.getElementById('errorKonfirmasiSandiBaru');
        var tombolSimpanSandi = document.getElementById('tombolSimpanSandi');

        var valid = true;
        [sandiBaru, konfirmasiSandiBaru].forEach(function (input) {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                valid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        if (sandiBaru.value && konfirmasiSandiBaru.value && sandiBaru.value !== konfirmasiSandiBaru.value) {
            konfirmasiSandiBaru.classList.add('is-invalid');
            errorKonfirmasiSandiBaru.textContent = 'Konfirmasi kata sandi tidak cocok.';
            valid = false;
        }

        if (!valid) return;

        tombolSimpanSandi.disabled = true;
        tombolSimpanSandi.textContent = 'Menyimpan...';

        // ganti setTimeout bagian ini dengan fetch ke endpoint simpan sandi baru asli
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 700);
    });
}

// Form Register 
var formRegister = document.getElementById('formRegister');
if (formRegister) {
    formRegister.addEventListener('submit', function (e) {
        e.preventDefault();

        var nama = document.getElementById('namaRegister');
        var email = document.getElementById('emailRegister');
        var password = document.getElementById('passwordRegister');
        var konfirmasi = document.getElementById('konfirmasiRegister');
        var errorKonfirmasi = document.getElementById('errorKonfirmasi');
        var tombolDaftar = document.getElementById('tombolDaftar');

        var valid = true;
        [nama, email, password, konfirmasi].forEach(function (input) {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                valid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        if (password.value && konfirmasi.value && password.value !== konfirmasi.value) {
            konfirmasi.classList.add('is-invalid');
            errorKonfirmasi.textContent = 'Konfirmasi kata sandi tidak cocok.';
            valid = false;
        }

        if (!valid) return;

        tombolDaftar.disabled = true;
        tombolDaftar.textContent = 'Memproses...';

        // ganti setTimeout bagian ini dengan fetch ke endpoint register asli
        setTimeout(function () {
            window.location.href = '../recruitment/form.html';
        }, 700);
    });
}