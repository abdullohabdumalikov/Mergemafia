import React, { useState } from 'react';
import './QueuePage.css';

export default function QueuePage() {
  const [queue, setQueue] = useState([
    { id: 1, client: 'Javohir Aka', master: 'Jasur', service: 'Kompleks (Soch + Soqol)', time: '12:30', status: 'Jarayonda', estMinutes: 25 },
    { id: 2, client: 'Sardorbek', master: 'Bobur', service: 'Soch kesish', time: '12:45', status: 'Kutmoqda', estMinutes: 40 },
    { id: 3, client: 'Otabek', master: 'Farrux', service: 'Soqol tekislash', time: '13:00', status: 'Kutmoqda', estMinutes: 55 },
    { id: 4, client: 'Rustam aka', master: 'Jasur', service: 'Yuz parvarishi', time: '13:30', status: 'Kutmoqda', estMinutes: 80 },
    { id: 5, client: 'Bekzod', master: 'Bobur', service: 'Soch yuvish va styling', time: '11:45', status: 'Tugallandi', estMinutes: 0 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ client: '', master: 'Jasur', service: 'Soch kesish', time: '14:00' });

  const handleAddQueue = (e) => {
    e.preventDefault();
    if (!form.client.trim()) return;

    const newItem = {
      id: Date.now(),
      client: form.client,
      master: form.master,
      service: form.service,
      time: form.time,
      status: 'Kutmoqda',
      estMinutes: (queue.filter(q => q.status === 'Kutmoqda').length + 1) * 20,
    };

    setQueue([...queue, newItem]);
    setShowAddModal(false);
    setForm({ client: '', master: 'Jasur', service: 'Soch kesish', time: '14:00' });
  };

  const updateStatus = (id, newStatus) => {
    setQueue(queue.map(q => q.id === id ? { ...q, status: newStatus } : q));
  };

  const removeQueue = (id) => {
    setQueue(queue.filter(q => q.id !== id));
  };

  const activeCount = queue.filter(q => q.status === 'Jarayonda').length;
  const waitingCount = queue.filter(q => q.status === 'Kutmoqda').length;
  const completedCount = queue.filter(q => q.status === 'Tugallandi').length;

  return (
    <div className="queue-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">➕ Navbat Boshqaruvi</h1>
          <p className="page-subtitle">Sartaroshxona jonli navbat rejimi va mijozlar kutish vaqti</p>
        </div>
        <button className="btn-add-primary" onClick={() => setShowAddModal(true)}>
          + Yangi Navbat Qo'shish
        </button>
      </div>

      {/* Metric Cards */}
      <div className="queue-metrics-grid">
        <div className="queue-card in-progress">
          <div className="q-card-icon">⚡</div>
          <div className="q-card-info">
            <span className="q-card-label">Jarayonda</span>
            <span className="q-card-val">{activeCount} kishi</span>
          </div>
        </div>

        <div className="queue-card waiting">
          <div className="q-card-icon">🕒</div>
          <div className="q-card-info">
            <span className="q-card-label">Navbatda kutmoqda</span>
            <span className="q-card-val">{waitingCount} kishi</span>
          </div>
        </div>

        <div className="queue-card completed">
          <div className="q-card-icon">✓</div>
          <div className="q-card-info">
            <span className="q-card-label">Bugun xizmat ko'rsatildi</span>
            <span className="q-card-val">{completedCount} kishi</span>
          </div>
        </div>
      </div>

      {/* Queue List Table */}
      <div className="table-card">
        <h3 className="card-section-title">💈 Jonli Navbat Ro'yxati</h3>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Mijoz</th>
                <th>Biriktirilgan Usta</th>
                <th>Xizmat Turi</th>
                <th>Vaqti</th>
                <th>Holati</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td><span className="client-name">{item.client}</span></td>
                  <td><span className="master-badge">{item.master}</span></td>
                  <td>{item.service}</td>
                  <td><span className="time-badge">⏱️ {item.time}</span></td>
                  <td>
                    <span className={`status-pill ${
                      item.status === 'Jarayonda' ? 'in-progress' :
                      item.status === 'Tugallandi' ? 'completed' : 'waiting'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {item.status === 'Kutmoqda' && (
                        <button className="btn-action start" onClick={() => updateStatus(item.id, 'Jarayonda')}>
                          ▶ Boshlash
                        </button>
                      )}
                      {item.status === 'Jarayonda' && (
                        <button className="btn-action finish" onClick={() => updateStatus(item.id, 'Tugallandi')}>
                          ✓ Tugallash
                        </button>
                      )}
                      <button className="btn-action delete" onClick={() => removeQueue(item.id)}>
                        🗑 O'chir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Queue Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>➕ Yangi Mijozni Navbatga Qo'shish</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddQueue} className="modal-form">
              <div className="form-group">
                <label>Mijoz Ismi *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Jamshid"
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Usta</label>
                <select value={form.master} onChange={(e) => setForm({ ...form, master: e.target.value })}>
                  <option value="Jasur">Jasur (Katta Sartarosh)</option>
                  <option value="Bobur">Bobur (Sartarosh)</option>
                  <option value="Farrux">Farrux (Kichik Sartarosh)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Xizmat Turi</label>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                  <option value="Soch kesish">Soch kesish (60,000 UZS)</option>
                  <option value="Soqol tekislash">Soqol tekislash (40,000 UZS)</option>
                  <option value="Kompleks (Soch + Soqol)">Kompleks (Soch + Soqol) (90,000 UZS)</option>
                  <option value="Yuz parvarishi">Yuz parvarishi (50,000 UZS)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Kelish Vaqti</label>
                <input
                  type="text"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Bekor qilish</button>
                <button type="submit" className="btn-primary-gold">Navbatga Qo'shish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
