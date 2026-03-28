const specialistCards = [
  {
    title: 'Jantung dan Pembuluh Darah',
    subtitle: 'Konsultasi cepat dan monitoring rutin untuk pasien risiko tinggi.',
  },
  {
    title: 'Penyakit Dalam',
    subtitle: 'Penanganan komprehensif untuk diabetes, hipertensi, dan metabolik.',
  },
  {
    title: 'Anak',
    subtitle: 'Layanan tumbuh kembang, imunisasi, dan pemeriksaan periodik.',
  },
  {
    title: 'Saraf',
    subtitle: 'Evaluasi neurologi dan terapi lanjutan berbasis rujukan.',
  },
];

const doctorSlots = [
  { doctor: 'dr. Nisa Rahma, Sp.JP', day: 'Senin', hour: '09.00 - 12.00', queue: 'Tersisa 4 slot' },
  { doctor: 'dr. Bima Arta, Sp.PD', day: 'Selasa', hour: '13.00 - 16.00', queue: 'Tersisa 7 slot' },
  { doctor: 'dr. Keisha Putri, Sp.A', day: 'Rabu', hour: '08.00 - 11.00', queue: 'Tersisa 5 slot' },
  { doctor: 'dr. Reza Mulyana, Sp.S', day: 'Kamis', hour: '10.00 - 13.00', queue: 'Tersisa 3 slot' },
];

const steps = [
  'Isi data pasien dan pilih poli tujuan.',
  'Pilih dokter dan slot waktu yang tersedia.',
  'Konfirmasi booking dan terima pengingat otomatis.',
];

export default function PublicPatientPage() {
  return (
    <main className="public-shell">
      <header className="public-nav" data-fade>
        <div className="brand-group">
          <p className="brand-mark">SIMRS+</p>
          <span>Portal Pasien</span>
        </div>
        <nav>
          <a href="#layanan">Layanan</a>
          <a href="#jadwal">Jadwal Dokter</a>
          <a href="#booking">Booking</a>
          <a href="/admin">Admin</a>
        </nav>
      </header>

      <section className="public-hero" data-fade>
        <p className="eyebrow">LAYANAN PUBLIK RUMAH SAKIT</p>
        <h1>Booking Dokter Spesialis Tanpa Antre Panjang</h1>
        <p>
          Akses jadwal dokter, pilih slot kunjungan, dan pantau status booking dalam satu portal yang
          aman dan cepat.
        </p>
        <div className="hero-cta">
          <a href="#booking" className="btn-primary">
            Buat Booking Sekarang
          </a>
          <a href="#jadwal" className="btn-secondary">
            Lihat Jadwal Dokter
          </a>
        </div>
      </section>

      <section className="specialist-panel" id="layanan" data-fade>
        <h2>Layanan Spesialis</h2>
        <div className="specialist-grid">
          {specialistCards.map((card) => (
            <article key={card.title} className="specialist-card" data-rise>
              <h3>{card.title}</h3>
              <p>{card.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="schedule-panel" id="jadwal" data-fade>
        <div className="panel-title-row">
          <h2>Jadwal Dokter Tersedia</h2>
          <p>Data real-time akan terhubung ke API booking pada sprint berikutnya.</p>
        </div>
        <div className="schedule-grid">
          {doctorSlots.map((slot) => (
            <article key={`${slot.doctor}-${slot.day}`} className="schedule-card" data-rise>
              <strong>{slot.doctor}</strong>
              <span>{slot.day}</span>
              <p>{slot.hour}</p>
              <em>{slot.queue}</em>
            </article>
          ))}
        </div>
      </section>

      <section className="booking-panel" id="booking" data-fade>
        <div>
          <h2>Alur Booking Pasien</h2>
          <ol>
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <form className="booking-form" aria-label="Form booking pasien">
          <label>
            Nama Lengkap
            <input type="text" placeholder="Masukkan nama pasien" />
          </label>
          <label>
            Nomor Telepon
            <input type="tel" placeholder="08xxxxxxxxxx" />
          </label>
          <label>
            Poli Tujuan
            <select defaultValue="">
              <option value="" disabled>
                Pilih poli
              </option>
              <option value="jantung">Jantung</option>
              <option value="penyakit-dalam">Penyakit Dalam</option>
              <option value="anak">Anak</option>
              <option value="saraf">Saraf</option>
            </select>
          </label>
          <button type="button">Lanjut Pilih Jadwal</button>
        </form>
      </section>
    </main>
  );
}
