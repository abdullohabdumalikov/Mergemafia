import React, { useState } from 'react';
import '../Queue/QueuePage.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    { id: 'ORD-101', client: 'Ahmadjon', master: 'Jasur', service: 'Kompleks (Soch + Soqol)', price: 90000, payment: 'Naqd', status: 'To\'langan', date: '2026-08-16 11:15' },
    { id: 'ORD-102', client: 'Diyorbek', master: 'Bobur', service: 'Soqol tekislash', price: 40000, payment: 'Click', status: 'To\'langan', date: '2026-08-16 10:30' },
    { id: 'ORD-103', client: 'Sardor', master: 'Farrux', service: 'Soch kesish', price: 60000, payment: 'Payme', status: 'To\'langan', date: '2026-08-16 10:00' },
    { id: 'ORD-104', client: 'Javohir', master: 'Jasur', service: 'Yuz parvarishi', price: 50000, payment: 'Naqd', status: 'Kutilmoqda', date: '2026-08-16 12:00' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ client: '', master: 'Jasur', service: 'Soch kesish', price: 60000, payment: 'Naqd' });

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (!form.client.trim()) return;

    const newOrd = {
      id: `ORD-${105 + orders.length}`,
      client: form.client,
      master: form.master,
      service: form.service,
      price: Number(form.price),
      payment: form.payment,
      status: 'To\'langan',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    setOrders([newOrd, ...orders]);
    setShowAddModal(false);
    setForm({ client: '', master: 'Jasur', service: 'Soch kesish', price: 60000, payment: 'Naqd' });
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  return (
    <div className="queue-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">📄 Buyurtmalar Boshqaruvi</h1>
          <p className="page-subtitle">Sartaroshxona xizmatlari buyurtmalari va to'lov jurnali</p>
        </div>
        <button className="btn-add-primary" onClick={() => setShowAddModal(true)}>
          + Yangi Buyurtma Qo'shish
        </button>
      </div>

      <div className="table-card">
        <h3 className="card-section-title">📦 Barcha Buyurtmalar Ro'yxati</h3>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Mijoz</th>
                <th>Usta</th>
                <th>Xizmat Turi</th>
                <th>Narxi</th>
                <th>To'lov Usuli</th>
                <th>Holati</th>
                <th>Sana</th>
                <th>Amal</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => (
                <tr key={ord.id}>
                  <td><strong>{ord.id}</strong></td>
                  <td><span className="client-name">{ord.client}</span></td>
                  <td><span className="master-badge">{ord.master}</span></td>
                  <td>{ord.service}</td>
                  <td><strong>{ord.price.toLocaleString()} UZS</strong></td>
                  <td><span className="time-badge">{ord.payment}</span></td>
                  <td>
                    <span className={`status-pill ${ord.status === 'To\'langan' ? 'completed' : 'waiting'}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td>{ord.date}</td>
                  <td>
                    <button className="btn-action delete" onClick={() => deleteOrder(ord.id)}>
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
              <h3>📄 Yangi Buyurtma Qo'shish</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddOrder} className="modal-form">
              <div className="form-group">
                <label>Mijoz Ismi *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Sardor"
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Usta</label>
                <select value={form.master} onChange={(e) => setForm({ ...form, master: e.target.value })}>
                  <option value="Jasur">Jasur</option>
                  <option value="Bobur">Bobur</option>
                  <option value="Farrux">Farrux</option>
                </select>
              </div>

              <div className="form-group">
                <label>Xizmat</label>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                  <option value="Soch kesish">Soch kesish (60,000 UZS)</option>
                  <option value="Soqol tekislash">Soqol tekislash (40,000 UZS)</option>
                  <option value="Kompleks (Soch + Soqol)">Kompleks (90,000 UZS)</option>
                </select>
              </div>

              <div className="form-group">
                <label>To'lov Usuli</label>
                <select value={form.payment} onChange={(e) => setForm({ ...form, payment: e.target.value })}>
                  <option value="Naqd">Naqd</option>
                  <option value="Click">Click</option>
                  <option value="Payme">Payme</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Bekor qilish</button>
                <button type="submit" className="btn-primary-gold">Buyurtma Qo'shish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
