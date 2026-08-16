import React, { useState } from 'react';
import '../Queue/QueuePage.css';

export default function ClientsPage() {
  const [clients, setClients] = useState([
    { id: 1, name: 'Ahmadjon Rahimov', phone: '+998 90 123 45 67', visits: 14, spent: 840000, master: 'Jasur', lastVisit: '2026-08-16' },
    { id: 2, name: 'Diyorbek Karimov', phone: '+998 93 987 65 43', visits: 8, spent: 480000, master: 'Bobur', lastVisit: '2026-08-15' },
    { id: 3, name: 'Sardor Mirzayev', phone: '+998 97 555 12 34', visits: 22, spent: 1980000, master: 'Jasur', lastVisit: '2026-08-14' },
    { id: 4, name: 'Javohir Qodirov', phone: '+998 91 333 99 88', visits: 5, spent: 250000, master: 'Farrux', lastVisit: '2026-08-10' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', master: 'Jasur' });

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const newClient = {
      id: Date.now(),
      name: form.name,
      phone: form.phone || '+998 90 000 00 00',
      visits: 1,
      spent: 60000,
      master: form.master,
      lastVisit: new Date().toISOString().split('T')[0],
    };

    setClients([...clients, newClient]);
    setShowAddModal(false);
    setForm({ name: '', phone: '', master: 'Jasur' });
  };

  const deleteClient = (id) => {
    setClients(clients.filter(c => c.id !== id));
  };

  return (
    <div className="queue-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">👥 Mijozlar Baza Boshqaruvi</h1>
          <p className="page-subtitle">Doimiy mijozlar ro'yxati, tashriflar va sadoqat ko'rsatkichlari</p>
        </div>
        <button className="btn-add-primary" onClick={() => setShowAddModal(true)}>
          + Yangi Mijoz Qo'shish
        </button>
      </div>

      <div className="table-card">
        <h3 className="card-section-title">👤 Mijozlar Ma'lumotlar Bazasi</h3>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Mijoz Ismi</th>
                <th>Telefon Raqami</th>
                <th>Tashriflar Soni</th>
                <th>Jami Sarflangan</th>
                <th>Sevimli Usta</th>
                <th>Oxirgi Tashrif</th>
                <th>Amal</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c, idx) => (
                <tr key={c.id}>
                  <td>{idx + 1}</td>
                  <td><span className="client-name">{c.name}</span></td>
                  <td>{c.phone}</td>
                  <td><strong>{c.visits} ta</strong></td>
                  <td><strong>{c.spent.toLocaleString()} UZS</strong></td>
                  <td><span className="master-badge">{c.master}</span></td>
                  <td>{c.lastVisit}</td>
                  <td>
                    <button className="btn-action delete" onClick={() => deleteClient(c.id)}>
                      🗑 O'chir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>👥 Yangi Mijozni Ro'yxatdan O'tkazish</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddClient} className="modal-form">
              <div className="form-group">
                <label>Mijoz Ismi Familiyasi *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Elyor Alimov"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Telefon Raqami</label>
                <input
                  type="text"
                  placeholder="+998 90 123 45 67"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Sevimli Usta</label>
                <select value={form.master} onChange={(e) => setForm({ ...form, master: e.target.value })}>
                  <option value="Jasur">Jasur</option>
                  <option value="Bobur">Bobur</option>
                  <option value="Farrux">Farrux</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Bekor qilish</button>
                <button type="submit" className="btn-primary-gold">Mijozni Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
