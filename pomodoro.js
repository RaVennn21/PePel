// Pomodoro-Timer

// Mengambil elemen-elemen tombol dan elemen tampilan waktu
let focusButton = document.getElementById("focus"); // Tombol untuk mode fokus
let buttons = document.querySelectorAll(".btn"); // Semua tombol mode
let breakButton = document.getElementById("break"); // Tombol untuk mode istirahat
let startBtn = document.getElementById("btn-start"); // Tombol mulai timer
let reset = document.getElementById("btn-reset"); // Tombol reset timer
let pause = document.getElementById("btn-pause"); // Tombol pause timer
let time = document.getElementById("time"); // Elemen waktu
let minutesElement = document.querySelector(".minutes"); // Elemen menit
let secondsElement = document.querySelector(".seconds"); // Elemen detik

// Variabel untuk pengaturan timer
let set; // Variabel untuk menyimpan interval timer
let active = "focus"; // Mode aktif (fokus atau istirahat)
let count = 59; // Hitungan detik
let paused = true; // Status pause
let minCount = 24; // Hitungan menit awal (24 untuk fokus, 5 untuk istirahat)

// Fungsi untuk memperbarui tampilan waktu
const updateTimeDisplay = () => {
  minutesElement.textContent = appendZero(minCount); // Menampilkan menit dengan angka nol depan
  minutesElement.setAttribute("data-minutes", minCount); // Menyimpan menit di atribut data
  secondsElement.textContent = appendZero(count); // Menampilkan detik dengan angka nol depan
  secondsElement.setAttribute("data-seconds", count); // Menyimpan detik di atribut data
};

// Fungsi untuk menambahkan nol di depan angka < 10
const appendZero = (value) => (value < 10 ? `0${value}` : value);

// Event listener untuk tombol reset
reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer(); // Pause timer saat reset
    switch (active) {
      case "short": // Jika mode aktif adalah istirahat pendek
        minCount = 5; // Atur menit ke 5
        break;
      default: // Jika mode aktif adalah fokus
        minCount = 25; // Atur menit ke 25
        break;
    }
    count = 0o0; // Atur detik ke 0
    updateTimeDisplay(); // Perbarui tampilan waktu
  })
);

// Fungsi untuk menghapus fokus pada semua tombol
const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus"); // Hapus kelas 'btn-focus' dari semua tombol
  });
};

// Event listener untuk tombol fokus
focusButton.addEventListener("click", () => {
  removeFocus(); // Hapus fokus dari tombol lain
  focusButton.classList.add("btn-focus"); // Tambahkan fokus ke tombol fokus
  pauseTimer(); // Pause timer
  minCount = 25; // Atur menit ke 25
  count = 0o0; // Atur detik ke 0
  updateTimeDisplay(); // Perbarui tampilan waktu
});

// Event listener untuk tombol istirahat
breakButton.addEventListener("click", () => {
  active = "short"; // Ubah mode aktif ke 'short' (istirahat)
  removeFocus(); // Hapus fokus dari tombol lain
  breakButton.classList.add("btn-focus"); // Tambahkan fokus ke tombol istirahat
  pauseTimer(); // Pause timer
  minCount = 5; // Atur menit ke 5
  count = 0o0; // Atur detik ke 0
  updateTimeDisplay(); // Perbarui tampilan waktu
});

// Event listener untuk tombol pause
pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true; // Atur status pause
    clearInterval(set); // Hentikan interval timer
    startBtn.classList.remove("hide"); // Tampilkan tombol start
    pause.classList.remove("show"); // Sembunyikan tombol pause
    reset.classList.remove("show"); // Sembunyikan tombol reset
  })
);

// Event listener untuk tombol start
startBtn.addEventListener("click", () => {
  reset.classList.add("show"); // Tampilkan tombol reset
  pause.classList.add("show"); // Tampilkan tombol pause
  startBtn.classList.remove("show"); // Sembunyikan tombol start
  startBtn.classList.add("hide"); // Tambahkan kelas hide ke tombol start
  if (paused) { // Jika timer dalam status pause
    paused = false; // Ubah status pause
    updateTimeDisplay(); // Perbarui tampilan waktu
    set = setInterval(() => { // Mulai interval timer
      count--; // Kurangi detik
      if (count < 0) { // Jika detik kurang dari 0
        if (minCount > 0) { // Jika masih ada menit tersisa
          minCount--; // Kurangi menit
          count = 59; // Reset detik ke 59
        } else { // Jika menit habis
          clearInterval(set); // Hentikan timer
        }
      }
      updateTimeDisplay(); // Perbarui tampilan waktu
    }, 1000); // Jalankan interval setiap 1 detik
  }
});
