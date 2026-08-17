import React, { useState } from 'react';
import '../Queue/QueuePage.css';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    salonName: 'Artisan Sartaroshxona',
    subtitle: 'Premium Craft CRM',
    phone: '+998 71 200 00 00',
    address: 'Toshkent shahri, Amir Temur shox ko\'chasi 15-uy',
    workingHours: '09:00 - 21:00',
    jasurCommission: 50,
    boburCommission: 45,
    farruxCommission: 40,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="queue-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">⚙️ Sozlamalar</h1>
          <p className="page-subtitle">Sartaroshxona CRM profil ma'lumotlari, usta ulushlari va ish tartibi</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="status-pill completed" style={{ padding: '14px 20px', fontSize: '14px', borderRadius: '12px' }}>
          ✓ Sozlamalar muvaffaqiyatli saqlandi!
        </div>
      )}

      <div className="table-card">
        <h3 className="card-section-title">💈 Sartaroshxona Profil Sozlamalari</h3>
        <form onSubmit={handleSubmit} className="modal-form" style={{ maxWidth: '600px' }}>
          <div className="form-group">
            <label>Sartaroshxona Nomi</label>
            <input
              type="text"
              value={settings.salonName}
              onChange={(e) => setSettings({ ...settings, salonName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Kichik Izoh (Subtitle)</label>
            <input
              type="text"
              value={settings.subtitle}
              onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Aloqa Telefoni</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Manzil</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Ish Vaqti</label>
            <input
              type="text"
              value={settings.workingHours}
              onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
            />
          </div>

          <h3 className="card-section-title" style={{ marginTop: '20px', marginBottom: '10px' }}>
            💰 Ustalar Komissiya Foizlari (%)
          </h3>

          <div className="form-group">
            <label>Jasur (Katta Sartarosh) Foizi (%)</label>
            <input
              type="number"
              value={settings.jasurCommission}
              onChange={(e) => setSettings({ ...settings, jasurCommission: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Bobur (Sartarosh) Foizi (%)</label>
            <input
              type="number"
              value={settings.boburCommission}
              onChange={(e) => setSettings({ ...settings, boburCommission: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Farrux (Kichik Sartarosh) Foizi (%)</label>
            <input
              type="number"
              value={settings.farruxCommission}
              onChange={(e) => setSettings({ ...settings, farruxCommission: e.target.value })}
            />
          </div>

          <div style={{ marginTop: '16px' }}>
            <button type="submit" className="btn-add-primary">
              💾 Sozlamalarni Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
