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
