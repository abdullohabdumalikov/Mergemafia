import React, { useState } from 'react';
import '../Queue/QueuePage.css';

export default function InventoryPage() {
  const [items, setItems] = useState([
    { id: 1, name: 'Professional Barber Qaychi To\'plami', category: 'Asboblar', qty: 12, minQty: 5, price: 450000, status: 'Etarli' },
    { id: 2, name: 'Premium Soch Geli (Matte Wax)', category: 'Kosmetika', qty: 35, minQty: 10, price: 85000, status: 'Etarli' },
    { id: 3, name: 'Aftershave Loson (Cool Mint)', category: 'Kosmetika', qty: 4, minQty: 8, price: 120000, status: 'Kam qoldi' },
    { id: 4, name: 'Ustara Pichoqlari (100x Derby)', category: 'Sarflanma', qty: 50, minQty: 15, price: 65000, status: 'Etarli' },
    { id: 5, name: 'Professional Shampun 5 Litr', category: 'Kosmetika', qty: 3, minQty: 5, price: 210000, status: 'Kam qoldi' },
  ]);

  const addStock = (id, amount = 10) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = item.qty + amount;
        return {
          ...item,
          qty: newQty,
          status: newQty >= item.minQty ? 'Etarli' : 'Kam qoldi',
        };
      }
      return item;
    }));
  };

  return (
    <div className="queue-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">📋 Ombor va Asboblar Boshqaruvi</h1>
          <p className="page-subtitle">Sartaroshxona mahsulotlari, sarflanma materiallar va qoldiqlar</p>
        </div>
      </div>

      <div className="table-card">
        <h3 className="card-section-title">📦 Ombor Qoldiqlari</h3>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Mahsulot Nomi</th>
                <th>Kategoriya</th>
                <th>Mavjud Qoldiq</th>
                <th>Minimal Chegara</th>
                <th>Birlik Narxi</th>
                <th>Holati</th>
                <th>Amal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td><span className="client-name">{item.name}</span></td>
                  <td><span className="master-badge">{item.category}</span></td>
                  <td><strong>{item.qty} ta</strong></td>
                  <td>{item.minQty} ta</td>
                  <td>{item.price.toLocaleString()} UZS</td>
                  <td>
                    <span className={`status-pill ${item.status === 'Etarli' ? 'completed' : 'waiting'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-action start" onClick={() => addStock(item.id)}>
                      + Qoldiq Qo'shish (+10)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
