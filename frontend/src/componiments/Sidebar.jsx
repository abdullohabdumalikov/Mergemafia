import React from 'react';
import { useApp } from '../context/AppContext';
import './Sidebar.css';

export default function Sidebar({ currentTab, setCurrentTab }) {
  const { t } = useApp();

  const mainNavItems = [
    { id: 'bosh_sahifa', label: t('bosh_sahifa'), icon: '🎛️' },
    { id: 'navbat', label: t('navbat'), icon: '➕' },
    { id: 'buyurtmalar', label: t('buyurtmalar'), icon: '📄' },
    { id: 'mijozlar', label: t('mijozlar'), icon: '👥' },
    { id: 'ombor', label: t('ombor'), icon: '📋' },
    { id: 'hisobot', label: t('hisobot'), icon: '📊' },
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-icon-box">
          <span className="scissors-icon">✂️</span>
        </div>
        <div className="brand-text">
          <span className="brand-title-top">{t('artisanTitle')}</span>
          <h2 className="brand-title-main">{t('salonName')}</h2>
          <span className="brand-subtitle">{t('crmSubtitle')}</span>
        </div>
      </div>

      {/* Main Nav Items */}
      <nav className="sidebar-nav">
        <div className="nav-group">
          {mainNavItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentTab(item.id)}
              >
                <span className="item-icon">{item.icon}</span>
                <span className="item-label">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Settings Separator */}
        <div className="nav-bottom-group">
          <div className="sidebar-divider"></div>
          <button
            className={`sidebar-item ${currentTab === 'sozlamalar' ? 'active' : ''}`}
            onClick={() => setCurrentTab('sozlamalar')}
          >
            <span className="item-icon">⚙️</span>
            <span className="item-label">{t('sozlamalar')}</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
