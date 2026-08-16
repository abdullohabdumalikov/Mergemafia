import { useState, useEffect } from 'react'
import './App.css'
import Report from './Pages/report/Report'

const API = 'http://localhost:3000'

function App() {
  const [currentTab, setCurrentTab] = useState('report') // Set 'report' as default or switchable
  import { useState } from 'react';
  import { AppProvider, useApp } from './context/AppContext';
  import Sidebar from './Components/Sidebar';
  import Report from './Pages/report/Report';
  import QueuePage from './Pages/Queue/QueuePage';
  import OrdersPage from './Pages/Orders/OrdersPage';
  import ClientsPage from './Pages/Clients/ClientsPage';
  import InventoryPage from './Pages/Inventory/InventoryPage';
  import SettingsPage from './Pages/Settings/SettingsPage';
  import './App.css';

  function MainApp() {
    const [currentTab, setCurrentTab] = useState('bosh_sahifa');
    const [searchQuery, setSearchQuery] = useState('');
    const { theme, toggleTheme, lang, changeLang, t } = useApp();

    return (
      <div className="app-container">
        {/* Dark Sidebar Matching Artisan Mockup */}
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* Main Content Area */}
        <main className="main-content">
          {/* Top Header Bar with Theme Toggle & 3 Language Selector */}
          <header className="top-header-bar">
            <div className="top-search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="top-search-input"
              />
            </div>

            <div className="top-header-right">
              {/* Light / Dark Mode Toggle Button */}
              <button
                className="top-icon-btn theme-toggle-btn"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              {/* 3 Languages Selector Pills (UZ | RU | EN) */}
              <div className="lang-selector-pills">
                <button
                  className={`lang-btn ${lang === 'uz' ? 'active' : ''}`}
                  onClick={() => changeLang('uz')}
                >
                  UZ 🇺🇿
                </button>
                <button
                  className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}
                  onClick={() => changeLang('ru')}
                >
                  RU 🇷🇺
                </button>
                <button
                  className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => changeLang('en')}
                >
                  EN 🇬🇧
                </button>
              </div>

              {/* Admin Profile */}
              <div className="user-profile-pill">
                <div className="profile-avatar">A</div>
                <div className="profile-info">
                  <span className="profile-name">{t('adminName')}</span>
                  <span className="profile-role">{t('adminRole')}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Active Section View */}
          <div className="page-view-container">
            {currentTab === 'bosh_sahifa' && <Report />}
            {currentTab === 'navbat' && <QueuePage />}
            {currentTab === 'buyurtmalar' && <OrdersPage />}
            {currentTab === 'mijozlar' && <ClientsPage />}
            {currentTab === 'ombor' && <InventoryPage />}
            {currentTab === 'hisobot' && <Report />}
            {currentTab === 'sozlamalar' && <SettingsPage />}
          </div>
        </main>
      </div>
    );
  }

  export default function App() {
    return (
      <AppProvider>
        <MainApp />
      </AppProvider>
    );
  }
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <span className="logo-icon">💈</span>
              <h1>Mergemafia</h1>
            </div>
            <div className="nav-tabs">
              <button 
                className={`nav-tab-btn ${currentTab === 'report' ? 'active' : ''}`}
                onClick={() => setCurrentTab('report')}
              >
                📊 Sartaroshxona Hisoboti
              </button>
              <button 
                className={`nav-tab-btn ${currentTab === 'users' ? 'active' : ''}`}
                onClick={() => setCurrentTab('users')}
              >
                👥 Foydalanuvchilar
              </button>
            </div>
          </div>
          {currentTab === 'users' && (
            <button className="btn btn-primary" onClick={openCreate}>
              + Yangi foydalanuvchi
            </button>
          )}
        </div>
      </header>

      <main className="main">
        {error && <div className="alert alert-error">⚠ {error}</div>}
        {success && <div className="alert alert-success">✓ {success}</div>}

        {currentTab === 'report' ? (
          <Report />
        ) : loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Yuklanmoqda...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">👥</div>
            <h2>Foydalanuvchilar yo'q</h2>
            <p>Birinchi foydalanuvchini qo'shing</p>
            <button className="btn btn-primary" onClick={openCreate}>+ Qo'shish</button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ism</th>
                  <th>Email</th>
                  <th>Yosh</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user.id}>
                    <td className="td-id">{i + 1}</td>
                    <td>
                      <div className="user-cell">
                        <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
                        <span className="user-name">{user.name}</span>
                      </div>
                    </td>
                    <td className="td-email">{user.email}</td>
                    <td className="td-age">{user.age ?? '—'}</td>
                    <td className="td-actions">
                      <button className="btn btn-edit" onClick={() => openEdit(user)}>✏ Tahrir</button>
                      <button className="btn btn-danger-outline" onClick={() => setDeletingId(user.id)}>🗑 O'chir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingUser ? '✏ Tahrirlash' : '+ Yangi foydalanuvchi'}</h2>
              <button className="modal-close" onClick={closeForm}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label>Ism *</label>
                <input
                  type="text"
                  placeholder="Ism familiya"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className={formErrors.name ? 'input error' : 'input'}
                />
                {formErrors.name && <span className="field-error">{formErrors.name}</span>}
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="text"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className={formErrors.email ? 'input error' : 'input'}
                />
                {formErrors.email && <span className="field-error">{formErrors.email}</span>}
              </div>
              <div className="form-group">
                <label>Yosh</label>
                <input
                  type="number"
                  placeholder="25"
                  value={form.age}
                  onChange={e => setForm({ ...form, age: e.target.value })}
                  className={formErrors.age ? 'input error' : 'input'}
                  min="1"
                  max="120"
                />
                {formErrors.age && <span className="field-error">{formErrors.age}</span>}
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-ghost" onClick={closeForm}>Bekor qilish</button>
                <button type="submit" className="btn btn-primary">
                  {editingUser ? 'Saqlash' : 'Qo\'shish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingId && (
        <div className="modal-overlay" onClick={() => setDeletingId(null)}>
          <div className="modal modal-confirm" onClick={e => e.stopPropagation()}>
            <div className="confirm-icon">🗑</div>
            <h2>O'chirishni tasdiqlang</h2>
            <p>Bu foydalanuvchini o'chirsangiz, qaytarib bo'lmaydi.</p>
            <div className="form-actions">
              <button className="btn btn-ghost" onClick={() => setDeletingId(null)}>Bekor qilish</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deletingId)}>O'chirish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
