import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';

import Report from './Pages/report/Report';
import QueuePage from './Pages/Queue/QueuePage';
import OrdersPage from './Pages/Orders/OrdersPage';
import ClientsPage from './Pages/Clients/ClientsPage';
import InventoryPage from './Pages/Inventory/InventoryPage';
import SettingsPage from './Pages/Settings/SettingsPage';

import './App.css';


// =====================================================
// SIDEBAR
// =====================================================

function Sidebar({ currentTab, setCurrentTab }) {
  const { t } = useApp();

  const menuItems = [
    {
      id: 'bosh_sahifa',
      icon: '🏠',
      label: t('home') || 'Bosh sahifa',
    },
    {
      id: 'navbat',
      icon: '📅',
      label: t('queue') || 'Navbat',
    },
    {
      id: 'buyurtmalar',
      icon: '📋',
      label: t('orders') || 'Buyurtmalar',
    },
    {
      id: 'mijozlar',
      icon: '👥',
      label: t('clients') || 'Mijozlar',
    },
    {
      id: 'ombor',
      icon: '📦',
      label: t('inventory') || 'Ombor',
    },
    {
      id: 'hisobot',
      icon: '📊',
      label: t('reports') || 'Hisobot',
    },
    {
      id: 'sozlamalar',
      icon: '⚙️',
      label: t('settings') || 'Sozlamalar',
    },
  ];

  return (
    <aside className="sidebar">

      {/* LOGO */}

      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          ✂
        </div>

        <div className="sidebar-logo-text">
          <span className="logo-title">
            SartarBOSS
          </span>

          <span className="logo-subtitle">
            BARBERSHOP
          </span>
        </div>
      </div>


      {/* MENU */}

      <nav className="sidebar-menu">

        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-menu-item ${
              currentTab === item.id
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setCurrentTab(item.id)
            }
          >
            <span className="sidebar-menu-icon">
              {item.icon}
            </span>

            <span className="sidebar-menu-label">
              {item.label}
            </span>
          </button>
        ))}

      </nav>


      {/* BOTTOM */}

      <div className="sidebar-bottom">

        <div className="sidebar-help">
          <span className="sidebar-help-icon">
            💡
          </span>

          <div>
            <strong>
              Yordam kerakmi?
            </strong>

            <small>
              Biz bilan bog'laning
            </small>
          </div>
        </div>

      </div>

    </aside>
  );
}


// =====================================================
// MAIN APP
// =====================================================

function MainApp() {

  const [
    currentTab,
    setCurrentTab
  ] = useState('bosh_sahifa');

  const [
    searchQuery,
    setSearchQuery
  ] = useState('');

  const {
    theme,
    toggleTheme,
    lang,
    changeLang,
    t,
  } = useApp();


  // ===================================================
  // PAGE
  // ===================================================

  const renderPage = () => {

    switch (currentTab) {

      case 'bosh_sahifa':
        return <Report />;

      case 'navbat':
        return <QueuePage />;

      case 'buyurtmalar':
        return <OrdersPage />;

      case 'mijozlar':
        return <ClientsPage />;

      case 'ombor':
        return <InventoryPage />;

      case 'hisobot':
        return <Report />;

      case 'sozlamalar':
        return <SettingsPage />;

      default:
        return <Report />;
    }
  };


  // ===================================================
  // RETURN
  // ===================================================

  return (
    <div
      className={`app-container ${
        theme === 'dark'
          ? 'dark'
          : 'light'
      }`}
    >

      {/* ==============================================
          SIDEBAR
      ============================================== */}

      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />


      {/* ==============================================
          MAIN
      ============================================== */}

      <main className="main-content">

        {/* ============================================
            HEADER
        ============================================ */}

        <header className="top-header-bar">

          {/* SEARCH */}

          <div className="top-search-box">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder={
                t('searchPlaceholder') ||
                'Qidirish...'
              }
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              className="top-search-input"
            />

          </div>


          {/* HEADER RIGHT */}

          <div className="top-header-right">

            {/* THEME */}

            <button
              type="button"
              className="top-icon-btn theme-toggle-btn"
              onClick={toggleTheme}
              title={
                theme === 'dark'
                  ? 'Light Mode'
                  : 'Dark Mode'
              }
            >
              {theme === 'dark'
                ? '☀️'
                : '🌙'}
            </button>


            {/* LANGUAGE */}

            <div className="lang-selector-pills">

              <button
                type="button"
                className={`lang-btn ${
                  lang === 'uz'
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  changeLang('uz')
                }
              >
                UZ 🇺🇿
              </button>


              <button
                type="button"
                className={`lang-btn ${
                  lang === 'ru'
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  changeLang('ru')
                }
              >
                RU 🇷🇺
              </button>


              <button
                type="button"
                className={`lang-btn ${
                  lang === 'en'
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  changeLang('en')
                }
              >
                EN 🇬🇧
              </button>

            </div>


            {/* USER */}

            <div className="user-profile-pill">

              <div className="profile-avatar">
                A
              </div>

              <div className="profile-info">

                <span className="profile-name">
                  {t('adminName') ||
                    'Admin'}
                </span>

                <span className="profile-role">
                  {t('adminRole') ||
                    'Administrator'}
                </span>

              </div>

            </div>

          </div>

        </header>


        {/* ============================================
            PAGE
        ============================================ */}

        <div className="page-view-container">

          {renderPage()}

        </div>

      </main>

    </div>
  );
}


// =====================================================
// APP PROVIDER
// =====================================================

export default function App() {

  return (

    <AppProvider>

      <MainApp />

    </AppProvider>

  );
}

