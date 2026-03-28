const metricCards = [
  { label: 'Booking Hari Ini', value: '128', delta: '+12%' },
  { label: 'Success Rate Booking', value: '99.2%', delta: '+0.4%' },
  { label: 'Pasien Aktif', value: '1,842', delta: '+3.1%' },
  { label: 'Antrian Berjalan', value: '37', delta: '-2.0%' },
];

const modules = [
  { title: 'Master Data', desc: 'Kelola pasien, dokter, departemen, dan jadwal.' },
  { title: 'Real-time Booking', desc: 'Validasi slot dan pencegahan double booking.' },
  { title: 'EMR', desc: 'Rekam medis terpusat + lampiran dokumen digital.' },
  { title: 'Audit Trail', desc: 'Pelacakan aktivitas user dan perubahan data kritikal.' },
];

export default function AdminPage() {
  return (
    <main className="admin-shell">
      <section className="admin-hero">
        <p className="eyebrow">SIMRS ADMIN</p>
        <h1>Control Center Rumah Sakit</h1>
        <p>
          Dashboard operasional untuk admin, petugas, dokter, dan auditor dengan integrasi cloud-native
          Azure.
        </p>
      </section>

      <section className="metric-grid">
        {metricCards.map((metric) => (
          <article key={metric.label} className="metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <em>{metric.delta}</em>
          </article>
        ))}
      </section>

      <section className="module-panel">
        <h2>Scope MVP</h2>
        <div className="module-grid">
          {modules.map((module) => (
            <article key={module.title} className="module-card" data-rise>
              <h3>{module.title}</h3>
              <p>{module.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
