// form oprec (4 step, 1 halaman)
// formData nyimpen semua jawaban di memory, sengaja hilang kalau refresh.
//  submit masih dummy 
// Data esai/departemen/fakultas ada di dummy-data

var TOTAL_STEP = 4;
var currentStep = 1;

// Tempat nyimpen semua jawaban user sepanjang wizard
var formData = {
    namaLengkap: '', nim: '', fakultas: '', prodi: '', whatsapp: '', email: '',
    departemen: [], 
    esai: {} 
};

// Elemen dasar 
var stepperEl = document.getElementById('oprecStepper');
var stepBadgeEl = document.getElementById('oprecStepBadge');
var btnLanjut = document.getElementById('btnLanjut');
var btnKembali = document.getElementById('btnKembali');

// Stepper (1-2-3-4)
function renderStepper() {
    var html = '';
    for (var i = 1; i <= TOTAL_STEP; i++) {
        var kelasAktif = (i === currentStep) ? 'is-active' : '';
        html += '<div class="step-dot ' + kelasAktif + '">' + i + '</div>';
    }
    stepperEl.innerHTML = html;
    stepBadgeEl.textContent = 'Langkah ' + currentStep + ' dari ' + TOTAL_STEP;
}

function labelTombolLanjut(nomor) {
    if (nomor === TOTAL_STEP) {
        return 'Kirim Pendaftaran <img src="/assets-recruitment/icon-send.svg" class="btn-icon-inline" alt="">';
    }
    return 'Lanjutkan <img src="/assets-recruitment/icon-arrow-right.svg" class="btn-icon-inline" alt="">';
}

function tampilkanStep(nomor) {
    document.querySelectorAll('.oprec-step-panel').forEach(function (panel) {
        panel.classList.toggle('is-active', Number(panel.getAttribute('data-step')) === nomor);
    });

    btnKembali.style.visibility = nomor === 1 ? 'hidden' : 'visible';
    btnLanjut.innerHTML = labelTombolLanjut(nomor);

    if (nomor === 4) renderReview();

    renderStepper();
    perbaruiTombolLanjut();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Cek apakah semua jawaban wajib di step ini udah keisi.
function cekLengkapStep(step) {
    if (step === 1) {
        var idField = ['namaLengkap', 'nim', 'fakultas', 'prodi', 'whatsapp', 'emailOprec'];
        return idField.every(function (id) {
            var el = document.getElementById(id);
            return el && el.value.trim() !== '';
        });
    }
    if (step === 2) {
        return formData.departemen.length > 0;
    }
    if (step === 3) {
        return daftarEsai.every(function (soal) {
            var textarea = document.getElementById(soal.id);
            return textarea && textarea.value.trim() !== '';
        });
    }

    return formData.departemen.length > 0;
}

function perbaruiTombolLanjut() {
    var lengkap = cekLengkapStep(currentStep);
    btnLanjut.disabled = !lengkap;
    btnLanjut.classList.toggle('btn-oprec-primary', lengkap);
    btnLanjut.classList.toggle('btn-oprec-secondary', !lengkap);
}

// STEP 1: Data Diri
var selectFakultas = document.getElementById('fakultas');
var selectProdi = document.getElementById('prodi');

function isiDropdownFakultas() {
    daftarFakultas.forEach(function (f) {
        var opt = document.createElement('option');
        opt.value = f.nama;
        opt.textContent = f.nama;
        selectFakultas.appendChild(opt);
    });
}

selectFakultas.addEventListener('change', function () {
    var fakultasTerpilih = daftarFakultas.find(function (f) { return f.nama === selectFakultas.value; });
    selectProdi.innerHTML = '<option value="" selected disabled>Pilih Program Studi</option>';
    selectProdi.disabled = !fakultasTerpilih;

    if (fakultasTerpilih) {
        fakultasTerpilih.prodi.forEach(function (p) {
            var opt = document.createElement('option');
            opt.value = p;
            opt.textContent = p;
            selectProdi.appendChild(opt);
        });
    }
    perbaruiTombolLanjut();
});

document.getElementById('formDataDiri').addEventListener('input', perbaruiTombolLanjut);
document.getElementById('formDataDiri').addEventListener('change', perbaruiTombolLanjut);

function validasiStep1() {
    var field = {
        namaLengkap: document.getElementById('namaLengkap'),
        nim: document.getElementById('nim'),
        fakultas: selectFakultas,
        prodi: selectProdi,
        whatsapp: document.getElementById('whatsapp'),
        email: document.getElementById('emailOprec')
    };

    var valid = true;
    Object.keys(field).forEach(function (key) {
        var input = field[key];
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            valid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    if (valid) {
        formData.namaLengkap = field.namaLengkap.value.trim();
        formData.nim = field.nim.value.trim();
        formData.fakultas = field.fakultas.value;
        formData.prodi = field.prodi.value;
        formData.whatsapp = field.whatsapp.value.trim();
        formData.email = field.email.value.trim();
    }
    return valid;
}

// STEP 2: Pilih Departemen (maksimal 2)
var departemenGridEl = document.getElementById('departemenGrid');
var errorDepartemenEl = document.getElementById('errorDepartemen');

function renderDepartemen() {
    departemenGridEl.innerHTML = '';

    var tengah = Math.ceil(daftarDepartemen.length / 2);
    var kolomKiri = document.createElement('div');
    kolomKiri.className = 'departemen-col';
    var kolomKanan = document.createElement('div');
    kolomKanan.className = 'departemen-col';

    daftarDepartemen.forEach(function (dep, index) {
        var isChecked = formData.departemen.indexOf(dep.id) !== -1;
        var item = document.createElement('label');
        item.className = 'departemen-item';
        item.setAttribute('data-id', dep.id);
        item.innerHTML =
            '<input type="checkbox" class="departemen-checkbox" value="' + dep.id + '" ' + (isChecked ? 'checked' : '') + '>' +
            '<div class="departemen-card">' +
                '<div class="departemen-nama">' + dep.nama + '</div>' +
                '<div class="departemen-deskripsi">' + dep.deskripsi + '</div>' +
            '</div>' +
            '<span class="departemen-checkbox-visual"></span>';

        (index < tengah ? kolomKiri : kolomKanan).appendChild(item);
    });

    departemenGridEl.appendChild(kolomKiri);
    departemenGridEl.appendChild(kolomKanan);
    perbaruiStateDepartemen();
}

function perbaruiStateDepartemen() {
    var sudahMaks = formData.departemen.length >= 2;
    document.querySelectorAll('.departemen-item').forEach(function (item) {
        var id = item.getAttribute('data-id');
        var checkbox = item.querySelector('.departemen-checkbox');
        var isChecked = formData.departemen.indexOf(id) !== -1;

        item.classList.toggle('is-disabled', sudahMaks && !isChecked);
        checkbox.disabled = sudahMaks && !isChecked;
    });
}

departemenGridEl.addEventListener('change', function (e) {
    if (!e.target.classList.contains('departemen-checkbox')) return;
    var id = e.target.value;
    var idx = formData.departemen.indexOf(id);

    if (e.target.checked && idx === -1) {
        if (formData.departemen.length >= 2) { e.target.checked = false; return; }
        formData.departemen.push(id);
    } else if (!e.target.checked && idx !== -1) {
        formData.departemen.splice(idx, 1);
    }
    errorDepartemenEl.style.display = 'none';
    perbaruiStateDepartemen();
    perbaruiTombolLanjut();
});

function validasiStep2() {
    if (formData.departemen.length === 0) {
        errorDepartemenEl.style.display = 'block';
        return false;
    }
    return true;
}

// STEP 3: Esai / Motivasi
var esaiGridEl = document.getElementById('esaiGrid');

function renderEsai() {
    esaiGridEl.innerHTML = '';
    daftarEsai.forEach(function (soal) {
        var item = document.createElement('div');
        item.className = 'esai-item';
        item.innerHTML =
            '<label class="oprec-label" for="' + soal.id + '">' + soal.pertanyaan + '<span class="wajib">*</span></label>' +
            '<textarea class="form-control" id="' + soal.id + '" placeholder="Tulis jawabanmu disini"></textarea>' +
            '<div class="form-error">Jawaban wajib diisi.</div>';
        esaiGridEl.appendChild(item);

        if (formData.esai[soal.id]) {
            item.querySelector('textarea').value = formData.esai[soal.id];
        }
    });
}


esaiGridEl.addEventListener('input', perbaruiTombolLanjut);

function validasiStep3() {
    var valid = true;
    daftarEsai.forEach(function (soal) {
        var textarea = document.getElementById(soal.id);
        if (!textarea.value.trim()) {
            textarea.classList.add('is-invalid');
            valid = false;
        } else {
            textarea.classList.remove('is-invalid');
            formData.esai[soal.id] = textarea.value.trim();
        }
    });
    return valid;
}

// STEP 4: Periksa Data 
var reviewContainerEl = document.getElementById('reviewContainer');

function namaDepartemen(id) {
    var dep = daftarDepartemen.find(function (d) { return d.id === id; });
    return dep ? dep.nama : id;
}

function renderReview() {
    var chipHtml = formData.departemen.map(function (id) {
        return '<span class="review-chip">' + namaDepartemen(id) + '</span>';
    }).join('');

    // Nggak ditampilin kalau udah nggak ada departemen yang dipilih.
    var tombolHapusHtml = formData.departemen.length > 0
        ? '<button type="button" class="review-hapus-chip" id="hapusChipTerakhir">&times;</button>'
        : '';

    var esaiTerisi = daftarEsai.filter(function (s) { return formData.esai[s.id]; }).length;

    var esaiDetailHtml = daftarEsai.map(function (soal) {
        return '<div class="review-label">' + soal.pertanyaan + '</div>' +
            '<div class="review-value">' + (formData.esai[soal.id] || '-') + '</div>';
    }).join('');

    reviewContainerEl.innerHTML =
        '<div class="review-card">' +

            '<div class="review-subsection">' +
                '<h4 class="review-heading">Data Diri</h4>' +
                '<div class="review-grid">' +
                    '<div><div class="review-label">Nama Lengkap</div><div class="review-value">' + formData.namaLengkap + '</div></div>' +
                    '<div><div class="review-label">Program Studi</div><div class="review-value">' + formData.prodi + '</div></div>' +
                    '<div><div class="review-label">NIM</div><div class="review-value">' + formData.nim + '</div></div>' +
                    '<div><div class="review-label">Email</div><div class="review-value">' + formData.email + '</div></div>' +
                    '<div><div class="review-label">Fakultas</div><div class="review-value">' + formData.fakultas + '</div></div>' +
                    '<div><div class="review-label">No. Whatsapp</div><div class="review-value">' + formData.whatsapp + '</div></div>' +
                '</div>' +
            '</div>' +

            '<div class="review-subsection">' +
                '<h4 class="review-heading">Divisi yang Dipilih (' + formData.departemen.length + ')</h4>' +
                '<div class="review-chip-list">' + chipHtml + tombolHapusHtml + '</div>' +
            '</div>' +

            '<div class="review-subsection">' +
                '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                    '<h4 class="review-heading" style="margin:0;">Essai / Motivasi</h4>' +
                    '<button type="button" class="review-esai-toggle" id="toggleEsai">Lihat <img src="/assets-recruitment/icon-eye.svg" class="btn-icon-inline" alt=""></button>' +
                '</div>' +
                '<div class="review-value" style="margin-top:8px;">' + esaiTerisi + ' Jawaban telah diisi</div>' +
                '<div class="review-esai-detail" id="esaiDetail">' + esaiDetailHtml + '</div>' +
            '</div>' +

        '</div>';

    // Tombol silang: hapus departemen paling deket ke tombol
    var tombolHapus = document.getElementById('hapusChipTerakhir');
    if (tombolHapus) {
        tombolHapus.addEventListener('click', function () {
            formData.departemen.pop();
            renderDepartemen(); 
            renderReview();
            perbaruiTombolLanjut(); 
        });
    }

    var toggleEsaiBtn = document.getElementById('toggleEsai');
    var esaiDetailEl = document.getElementById('esaiDetail');
    toggleEsaiBtn.addEventListener('click', function () {
        var isOpen = esaiDetailEl.classList.toggle('is-open');
        toggleEsaiBtn.innerHTML = (isOpen ? 'Tutup' : 'Lihat') + ' <img src="/assets-recruitment/icon-eye.svg" class="btn-icon-inline" alt="">';
    });
}

// Navigasi antar step
// Validasi ulang pas tombol diklik. Harusnya nggak pernah gagal karena
// tombol Lanjutkan udah ke-disable duluan kalau belum lengkap 
function validasiStepSaatIni() {
    if (currentStep === 1) return validasiStep1();
    if (currentStep === 2) return validasiStep2();
    if (currentStep === 3) return validasiStep3();
    return true;
}

btnLanjut.addEventListener('click', function () {
    if (!validasiStepSaatIni()) return;

    if (currentStep === TOTAL_STEP) {
        // ganti simulasi ini dengan fetch submit pendaftaran asli
        btnLanjut.disabled = true;
        btnLanjut.textContent = 'Mengirim...';
        setTimeout(function () {
            window.location.href = 'success.html';
        }, 700);
        return;
    }

    currentStep++;
    tampilkanStep(currentStep);
});

btnKembali.addEventListener('click', function () {
    if (currentStep === 1) return;
    currentStep--;
    tampilkanStep(currentStep);
});

// Init pertama kali halaman dibuka
isiDropdownFakultas();
renderDepartemen();
renderEsai();
tampilkanStep(currentStep);