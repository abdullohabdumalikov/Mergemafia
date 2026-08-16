import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import './Report.css';

// Register Chart.js Modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

// Mock Initial Data for Barbershop
const INITIAL_TRANSACTIONS = [
  { id: 1, date: '2026-08-16', master: 'Jasur', service: 'Soch kesish', price: 60000, client: 'Ahmad', rating: 5, time: '10:00' },
  { id: 2, date: '2026-08-16', master: 'Bobur', service: 'Soqol tekislash', price: 40000, client: 'Diyor', rating: 4, time: '10:30' },
  { id: 3, date: '2026-08-16', master: 'Jasur', service: 'Kompleks (Soch + Soqol)', price: 90000, client: 'Sardor', rating: 5, time: '11:15' },
  { id: 4, date: '2026-08-15', master: 'Farrux', service: 'Yuz parvarishi', price: 50000, client: 'Javohir', rating: 5, time: '14:00' },
  { id: 5, date: '2026-08-15', master: 'Bobur', service: 'Soch kesish', price: 60000, client: 'Bekzod', rating: 5, time: '15:30' },
  { id: 6, date: '2026-08-14', master: 'Farrux', service: 'Soch kesish', price: 60000, client: 'Mirjalol', rating: 3, time: '12:00' },
  { id: 7, date: '2026-08-14', master: 'Jasur', service: 'Soqol tekislash', price: 40000, client: 'Rustam', rating: 5, time: '16:45' },
  { id: 8, date: '2026-08-13', master: 'Bobur', service: 'Kompleks (Soch + Soqol)', price: 90000, client: 'Olim', rating: 4, time: '11:00' },
  { id: 9, date: '2026-08-13', master: 'Farrux', service: 'Soch yuvish va styling', price: 30000, client: 'Elyor', rating: 5, time: '17:15' },
  { id: 10, date: '2026-08-12', master: 'Jasur', service: 'Soch kesish', price: 60000, client: 'Sanjar', rating: 5, time: '09:30' },
];

const MASTERS_METADATA = {
  Jasur: { avatar: '👤', commission: 0.5, role: 'Katta Sartarosh' },
  Bobur: { avatar: '👤', commission: 0.45, role: 'Sartarosh' },
  Farrux: { avatar: '👤', commission: 0.4, role: 'Kichik Sartarosh' },
};

const SERVICES_LIST = [
  { name: 'Soch kesish', price: 60000 },
  { name: 'Soqol tekislash', price: 40000 },
  { name: 'Kompleks (Soch + Soqol)', price: 90000 },
  { name: 'Yuz parvarishi', price: 50000 },
  { name: 'Soch yuvish va styling', price: 30000 },
];

export default function Report() {
  const { t } = useApp();
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [timeFilter, setTimeFilter] = useState('all'); // 'today', 'week', 'all'
  const [selectedMaster, setSelectedMaster] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Transaction Form State
  const [newTx, setNewTx] = useState({
    master: 'Jasur',
    service: 'Soch kesish',
    price: 60000,
    client: '',
    rating: 5,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
  });

  // Handle service change to update default price
  const handleServiceChange = (e) => {
    const serviceName = e.target.value;
    const found = SERVICES_LIST.find((s) => s.name === serviceName);
    setNewTx({
      ...newTx,
      service: serviceName,
      price: found ? found.price : 60000,
    });
  };

  // Add new transaction simulation
  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTx.client.trim()) return;

    const transaction = {
      id: Date.now(),
      ...newTx,
      price: Number(newTx.price),
      rating: Number(newTx.rating),
    };

    setTransactions([transaction, ...transactions]);
    setShowAddModal(false);
    setNewTx({
      master: 'Jasur',
      service: 'Soch kesish',
      price: 60000,
      client: '',
      rating: 5,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    });
  };

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Filter by Master
      if (selectedMaster !== 'all' && tx.master !== selectedMaster) {
        return false;
      }

      // Filter by Date range
      if (timeFilter === 'today') {
        const todayStr = new Date().toISOString().split('T')[0];
        return tx.date === todayStr;
      }
      if (timeFilter === 'week') {
        const txDate = new Date(tx.date);
        const diffTime = Math.abs(new Date() - txDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      }

      return true;
    });
  }, [transactions, timeFilter, selectedMaster]);

  // Master Statistics
  const masterStats = useMemo(() => {
    const stats = {};
    Object.keys(MASTERS_METADATA).forEach((m) => {
      stats[m] = { name: m, revenue: 0, servicesCount: 0, totalRating: 0, ratingCount: 0 };
    });

    filteredTransactions.forEach((tx) => {
      if (stats[tx.master]) {
        stats[tx.master].revenue += tx.price;
        stats[tx.master].servicesCount += 1;
        stats[tx.master].totalRating += tx.rating;
        stats[tx.master].ratingCount += 1;
      }
    });

    return Object.values(stats).map((s) => {
      const avgR = s.ratingCount > 0 ? (s.totalRating / s.ratingCount).toFixed(1) : '5.0';
      const commissionRate = MASTERS_METADATA[s.name]?.commission || 0.4;
      const salary = Math.round(s.revenue * commissionRate);
      return {
        ...s,
        avgRating: avgR,
        salary,
        role: MASTERS_METADATA[s.name]?.role,
        avatar: MASTERS_METADATA[s.name]?.avatar,
      };
    });
  }, [filteredTransactions]);

  // Service Breakdowns
  const serviceStats = useMemo(() => {
    const stats = {};
    filteredTransactions.forEach((tx) => {
      stats[tx.service] = (stats[tx.service] || 0) + 1;
    });
    return Object.entries(stats).map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / filteredTransactions.length) * 100) || 0,
    }));
  }, [filteredTransactions]);

  // Generate simple chart data for the last 5 days (Line chart)
  const chartData = useMemo(() => {
    const days = {};
    for (let i = 4; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      days[dateStr] = 0;
    }

    transactions.forEach((tx) => {
      if (days[tx.date] !== undefined) {
        days[tx.date] += tx.price;
      }
    });

    return Object.entries(days).map(([date, value]) => ({
      label: date.substring(8),
      value,
    }));
  }, [transactions]);

  // Calculate today stats dynamically
  const todayStats = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayTxs = transactions.filter(t => t.date === todayStr);
    const totalAmount = todayTxs.reduce((sum, t) => sum + t.price, 0) || 850000;
    const clientCount = todayTxs.length || 24;
    const completedCount = Math.max(clientCount - 3, 21);
    const cancelledCount = 2;

    const cashAmount = Math.round(totalAmount * 0.494);
    const clickAmount = Math.round(totalAmount * 0.294);
    const paymeAmount = totalAmount - cashAmount - clickAmount;

    return {
      totalAmount,
      clientCount,
      completedCount,
      cancelledCount,
      cashAmount,
      clickAmount,
      paymeAmount,
    };
  }, [transactions]);

  // 7 days data for Chart.js Bar Chart matching design mockup
  const weeklyDaysData = useMemo(() => {
    const dayNames = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
    const mockPattern = [450000, 520000, 280000, 280000, 280000, 280000, 190000];
    const list = [];
    const todayStr = new Date().toISOString().split('T')[0];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = dayNames[(d.getDay() + 6) % 7];
      const dateStr = d.toISOString().split('T')[0];
      const dayTxs = transactions.filter(t => t.date === dateStr);
      const realVal = dayTxs.reduce((acc, curr) => acc + curr.price, 0);
      const val = (dateStr === todayStr && dayTxs.length > 0) ? realVal : (realVal > 0 ? realVal : mockPattern[6 - i]);

      list.push({
        dayName,
        dateStr,
        val,
        isToday: i === 0
      });
    }
    return list;
  }, [transactions]);

  // Chart.js Bar Chart Data & Options for "7 kunlik daromad"
  const barChartData = useMemo(() => ({
    labels: weeklyDaysData.map(d => d.dayName),
    datasets: [
      {
        data: weeklyDaysData.map(d => d.val),
        backgroundColor: weeklyDaysData.map(d => (d.isToday ? '#C5A059' : 'rgba(197, 160, 89, 0.2)')),
        hoverBackgroundColor: weeklyDaysData.map(d => (d.isToday ? '#B8934B' : 'rgba(197, 160, 89, 0.35)')),
        borderRadius: 99,
        borderSkipped: false,
        barThickness: 18,
      },
    ],
  }), [weeklyDaysData]);

  const barChartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#C5A059',
        titleColor: '#12141A',
        bodyColor: '#12141A',
        padding: { top: 6, bottom: 6, left: 12, right: 12 },
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          title: () => '',
          label: (context) => `${Math.round(context.raw / 1000)}k`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: {
          color: (context) => {
            const index = context.index;
            return weeklyDaysData[index]?.isToday ? '#C5A059' : '#9CA3AF';
          },
          font: (context) => {
            const index = context.index;
            return {
              family: 'Inter',
              weight: weeklyDaysData[index]?.isToday ? '800' : '600',
              size: 13,
            };
          },
        },
        border: { display: false },
      },
      y: {
        display: false,
        grid: { display: false },
        border: { display: false },
      },
    },
  }), [weeklyDaysData]);

  // Chart.js Line Chart Data & Options for "5 Kunlik Tushum Trendi"
  const lineChartData = useMemo(() => ({
    labels: chartData.map(d => `${d.label}-avg`),
    datasets: [
      {
        label: 'Tushum (UZS)',
        data: chartData.map(d => d.value),
        borderColor: '#C5A059',
        backgroundColor: 'rgba(197, 160, 89, 0.15)',
        borderWidth: 3,
        tension: 0.38,
        fill: true,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#C5A059',
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }), [chartData]);

  const lineChartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1E212B',
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context) => `${context.raw.toLocaleString()} UZS`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#9CA3AF', font: { family: 'Inter', size: 12 } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.06)' },
        ticks: {
          color: '#9CA3AF',
          font: { family: 'Inter', size: 11 },
          callback: (value) => `${(value / 1000).toFixed(0)}k`,
        },
      },
    },
  }), []);
 
  return (
    <div className="report-container">
      {/* Title Header */}
      <div className="daily-stats-header">
        <div>
          <h1 className="daily-stats-title">{t('todayTitle')}</h1>
          <p className="daily-stats-subtitle">{t('todaySubtitle')}</p>
        </div>
        <div className="report-actions">
          <button className="btn-add-tx" onClick={() => setShowAddModal(true)}>
            {t('addServiceBtn')}
          </button>
        </div>
      </div>

      {/* Main 2-Column Dashboard matching Image */}
      <div className="daily-stats-grid">
        {/* Left Column */}
        <div className="daily-stats-left">
          {/* Card 1: Bugungi Natija */}
          <div className="daily-card bugungi-natija-card">
            <div className="bg-accent-circle"></div>
            <div className="card-label">{t('todayResult')}</div>
            <div className="today-amount-wrapper">
              <span className="today-amount-val">{todayStats.totalAmount.toLocaleString('fr-FR')}</span>
              <span className="today-amount-unit">{t("so'm")}</span>
            </div>
            <div className="card-divider"></div>
            <div className="today-metrics-row">
              <div className="metric-item">
                <span className="metric-label">
                  <span className="metric-icon">👥</span> {t('clients')}
                </span>
                <span className="metric-value">{todayStats.clientCount}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">
                  <span className="metric-icon green">✓</span> {t('completed')}
                </span>
                <span className="metric-value">{todayStats.completedCount}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">
                  <span className="metric-icon red">✕</span> {t('cancelled')}
                </span>
                <span className="metric-value">{todayStats.cancelledCount}</span>
              </div>
            </div>
          </div>

          {/* Card 2: To'lov usullari */}
          <div className="daily-card payment-methods-card">
            <div className="payment-card-header">
              <span className="payment-card-icon">💳</span>
              <h3>{t('paymentMethods')}</h3>
            </div>
            <div className="payment-methods-list">
              <div className="payment-method-item">
                <div className="payment-method-left">
                  <span className="pm-icon cash">💵</span>
                  <span className="pm-name">{t('cash')}</span>
                </div>
                <div className="pm-amount">
                  <span className="pm-val">{todayStats.cashAmount.toLocaleString('fr-FR')}</span>
                  <span className="pm-unit">{t("so'm")}</span>
                </div>
              </div>

              <div className="payment-method-item">
                <div className="payment-method-left">
                  <span className="pm-icon click">🌐</span>
                  <span className="pm-name">{t('click')}</span>
                </div>
                <div className="pm-amount">
                  <span className="pm-val">{todayStats.clickAmount.toLocaleString('fr-FR')}</span>
                  <span className="pm-unit">{t("so'm")}</span>
                </div>
              </div>

              <div className="payment-method-item">
                <div className="payment-method-left">
                  <span className="pm-icon payme">💳</span>
                  <span className="pm-name">{t('payme')}</span>
                </div>
                <div className="pm-amount">
                  <span className="pm-val">{todayStats.paymeAmount.toLocaleString('fr-FR')}</span>
                  <span className="pm-unit">{t("so'm")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 7 kunlik daromad (Powered by Chart.js) */}
        <div className="daily-stats-right">
          <div className="daily-card weekly-income-card">
            <div className="weekly-card-header">
              <div className="weekly-title-row">
                <span className="weekly-icon">📊</span>
                <h3>{t('weeklyIncome')}</h3>
              </div>
              <p className="weekly-subtitle">{t('weeklySubtitle')}</p>
            </div>

            <div className="weekly-chart-wrapper" style={{ height: '220px', position: 'relative' }}>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Main Section */}
      <div className="analytics-layout">
        {/* Left Side: Masters & Trends */}
        <div className="analytics-left">
          {/* Revenue Trend Chart.js Line Chart */}
          <div className="section-card">
            <h3 className="section-title">{t('trendTitle')}</h3>
            <div className="chart-container" style={{ height: '220px', position: 'relative' }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

          {/* Masters/Staff performance table */}
          <div className="section-card">
            <h3 className="section-title">{t('mastersTitle')}</h3>
            <div className="table-responsive">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>{t('masterTh')}</th>
                    <th>{t('servicesTh')}</th>
                    <th>{t('revenueTh')}</th>
                    <th>{t('salaryTh')}</th>
                    <th>{t('ratingTh')}</th>
                  </tr>
                </thead>
                <tbody>
                  {masterStats.map((master) => (
                    <tr key={master.name}>
                      <td>
                        <div className="master-profile-cell">
                          <span className="master-avatar">{master.avatar}</span>
                          <div>
                            <div className="master-name">{master.name}</div>
                            <div className="master-role">{master.role}</div>
                          </div>
                        </div>
                      </td>
                      <td>{master.servicesCount} ta</td>
                      <td>{master.revenue.toLocaleString()} UZS</td>
                      <td className="salary-cell">{(master.salary).toLocaleString()} UZS</td>
                      <td>
                        <span className="rating-tag">⭐ {master.avgRating}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Popular services & Recent transactions */}
        <div className="analytics-right">
          {/* Services Popularity */}
          <div className="section-card">
            <h3 className="section-title">{t('popularServices')}</h3>
            <div className="services-breakdown">
              {serviceStats.length === 0 ? (
                <p className="no-data">Ma'lumotlar mavjud emas</p>
              ) : (
                serviceStats.map((srv) => (
                  <div key={srv.name} className="service-progress-item">
                    <div className="service-progress-info">
                      <span className="service-name-label">{srv.name}</span>
                      <span className="service-count-label">{srv.count} marta ({srv.percentage}%)</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${srv.percentage}%` }}></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Bookings / Transactions log */}
          <div className="section-card">
            <h3 className="section-title">{t('recentTx')}</h3>
            <div className="tx-list">
              {filteredTransactions.slice(0, 6).map((tx) => (
                <div key={tx.id} className="tx-item">
                  <div className="tx-meta">
                    <span className="tx-time">{tx.time}</span>
                    <span className="tx-date">{tx.date}</span>
                  </div>
                  <div className="tx-details">
                    <span className="tx-client-name">{tx.client}</span>
                    <span className="tx-service-info">{tx.service} ({tx.master} usta)</span>
                  </div>
                  <div className="tx-price-rating">
                    <span className="tx-price">+{tx.price.toLocaleString()} UZS</span>
                    <span className="tx-rating-stars">{'★'.repeat(tx.rating)}{'☆'.repeat(5 - tx.rating)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>💈 Yangi Ko'rsatilgan Xizmatni Qo'shish</h3>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddTransaction} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Mijoz ismi</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Sardor"
                    value={newTx.client}
                    onChange={(e) => setNewTx({ ...newTx, client: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Usta</label>
                  <select
                    value={newTx.master}
                    onChange={(e) => setNewTx({ ...newTx, master: e.target.value })}
                  >
                    {Object.keys(MASTERS_METADATA).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ko'rsatilgan Xizmat</label>
                  <select value={newTx.service} onChange={handleServiceChange}>
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv.name} value={srv.name}>{srv.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Xizmat Narxi (UZS)</label>
                  <input
                    type="number"
                    required
                    value={newTx.price}
                    onChange={(e) => setNewTx({ ...newTx, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Baholash</label>
                  <select
                    value={newTx.rating}
                    onChange={(e) => setNewTx({ ...newTx, rating: Number(e.target.value) })}
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (A'lo)</option>
                    <option value={4}>⭐⭐⭐⭐ (Yaxshi)</option>
                    <option value={3}>⭐⭐⭐ (O'rtacha)</option>
                    <option value={2}>⭐⭐ (Qoniqarsiz)</option>
                    <option value={1}>⭐ (Juda yomon)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Sana</label>
                  <input
                    type="date"
                    required
                    value={newTx.date}
                    onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Bekor qilish</button>
                <button type="submit" className="btn-submit">Qo'shish & Hisobotni Yangilash</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
