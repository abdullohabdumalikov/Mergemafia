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

// ======================================================
// CHART.JS REGISTRATION
// ======================================================

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

// ======================================================
// INITIAL TRANSACTIONS
// ======================================================

const INITIAL_TRANSACTIONS = [
  {
    id: 1,
    date: '2026-08-16',
    master: 'Jasur',
    service: 'Soch kesish',
    price: 60000,
    client: 'Ahmad',
    rating: 5,
    time: '10:00',
  },
  {
    id: 2,
    date: '2026-08-16',
    master: 'Bobur',
    service: 'Soqol tekislash',
    price: 40000,
    client: 'Diyor',
    rating: 4,
    time: '10:30',
  },
  {
    id: 3,
    date: '2026-08-16',
    master: 'Jasur',
    service: 'Kompleks (Soch + Soqol)',
    price: 90000,
    client: 'Sardor',
    rating: 5,
    time: '11:15',
  },
  {
    id: 4,
    date: '2026-08-15',
    master: 'Farrux',
    service: 'Yuz parvarishi',
    price: 50000,
    client: 'Javohir',
    rating: 5,
    time: '14:00',
  },
  {
    id: 5,
    date: '2026-08-15',
    master: 'Bobur',
    service: 'Soch kesish',
    price: 60000,
    client: 'Bekzod',
    rating: 5,
    time: '15:30',
  },
  {
    id: 6,
    date: '2026-08-14',
    master: 'Farrux',
    service: 'Soch kesish',
    price: 60000,
    client: 'Mirjalol',
    rating: 3,
    time: '12:00',
  },
  {
    id: 7,
    date: '2026-08-14',
    master: 'Jasur',
    service: 'Soqol tekislash',
    price: 40000,
    client: 'Rustam',
    rating: 5,
    time: '16:45',
  },
  {
    id: 8,
    date: '2026-08-13',
    master: 'Bobur',
    service: 'Kompleks (Soch + Soqol)',
    price: 90000,
    client: 'Olim',
    rating: 4,
    time: '11:00',
  },
  {
    id: 9,
    date: '2026-08-13',
    master: 'Farrux',
    service: 'Soch yuvish va styling',
    price: 30000,
    client: 'Elyor',
    rating: 5,
    time: '17:15',
  },
  {
    id: 10,
    date: '2026-08-12',
    master: 'Jasur',
    service: 'Soch kesish',
    price: 60000,
    client: 'Sanjar',
    rating: 5,
    time: '09:30',
  },
];

// ======================================================
// MASTERS
// ======================================================

const MASTERS_METADATA = {
  Jasur: {
    avatar: '👤',
    commission: 0.5,
    role: 'Katta Sartarosh',
  },

  Bobur: {
    avatar: '👤',
    commission: 0.45,
    role: 'Sartarosh',
  },

  Farrux: {
    avatar: '👤',
    commission: 0.4,
    role: 'Kichik Sartarosh',
  },
};

// ======================================================
// SERVICES
// ======================================================

const SERVICES_LIST = [
  {
    name: 'Soch kesish',
    price: 60000,
  },
  {
    name: 'Soqol tekislash',
    price: 40000,
  },
  {
    name: 'Kompleks (Soch + Soqol)',
    price: 90000,
  },
  {
    name: 'Yuz parvarishi',
    price: 50000,
  },
  {
    name: 'Soch yuvish va styling',
    price: 30000,
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function Report() {
  const { t } = useApp();

  // ====================================================
  // STATES
  // ====================================================

  const [transactions, setTransactions] = useState(
    INITIAL_TRANSACTIONS
  );

  const [timeFilter, setTimeFilter] = useState('all');

  const [selectedMaster, setSelectedMaster] =
    useState('all');

  const [showAddModal, setShowAddModal] =
    useState(false);

  // ====================================================
  // NEW TRANSACTION
  // ====================================================

  const [newTx, setNewTx] = useState({
    master: 'Jasur',
    service: 'Soch kesish',
    price: 60000,
    client: '',
    rating: 5,
    date: new Date()
      .toISOString()
      .split('T')[0],
    time: new Date()
      .toTimeString()
      .split(' ')[0]
      .substring(0, 5),
  });

  // ====================================================
  // SERVICE CHANGE
  // ====================================================

  const handleServiceChange = (e) => {
    const serviceName = e.target.value;

    const found = SERVICES_LIST.find(
      (service) => service.name === serviceName
    );

    setNewTx((prev) => ({
      ...prev,
      service: serviceName,
      price: found ? found.price : 60000,
    }));
  };

  // ====================================================
  // ADD TRANSACTION
  // ====================================================

  const handleAddTransaction = (e) => {
    e.preventDefault();

    if (!newTx.client.trim()) {
      return;
    }

    const transaction = {
      id: Date.now(),
      ...newTx,
      price: Number(newTx.price),
      rating: Number(newTx.rating),
    };

    setTransactions((prev) => [
      transaction,
      ...prev,
    ]);

    setShowAddModal(false);

    setNewTx({
      master: 'Jasur',
      service: 'Soch kesish',
      price: 60000,
      client: '',
      rating: 5,
      date: new Date()
        .toISOString()
        .split('T')[0],
      time: new Date()
        .toTimeString()
        .split(' ')[0]
        .substring(0, 5),
    });
  };

  // ====================================================
  // FILTERED TRANSACTIONS
  // ====================================================

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Master filter
      if (
        selectedMaster !== 'all' &&
        tx.master !== selectedMaster
      ) {
        return false;
      }

      // Today filter
      if (timeFilter === 'today') {
        const todayStr = new Date()
          .toISOString()
          .split('T')[0];

        return tx.date === todayStr;
      }

      // Week filter
      if (timeFilter === 'week') {
        const txDate = new Date(tx.date);

        const today = new Date();

        const diffTime =
          Math.abs(today - txDate);

        const diffDays =
          Math.ceil(
            diffTime /
              (1000 * 60 * 60 * 24)
          );

        return diffDays <= 7;
      }

      return true;
    });
  }, [
    transactions,
    timeFilter,
    selectedMaster,
  ]);

  // ====================================================
  // MASTER STATISTICS
  // ====================================================

  const masterStats = useMemo(() => {
    const stats = {};

    Object.keys(MASTERS_METADATA).forEach(
      (master) => {
        stats[master] = {
          name: master,
          revenue: 0,
          servicesCount: 0,
          totalRating: 0,
          ratingCount: 0,
        };
      }
    );

    filteredTransactions.forEach((tx) => {
      if (!stats[tx.master]) {
        return;
      }

      stats[tx.master].revenue += tx.price;

      stats[tx.master].servicesCount += 1;

      stats[tx.master].totalRating +=
        tx.rating;

      stats[tx.master].ratingCount += 1;
    });

    return Object.values(stats).map(
      (stat) => {
        const avgRating =
          stat.ratingCount > 0
            ? (
                stat.totalRating /
                stat.ratingCount
              ).toFixed(1)
            : '5.0';

        const commissionRate =
          MASTERS_METADATA[
            stat.name
          ]?.commission || 0.4;

        const salary = Math.round(
          stat.revenue * commissionRate
        );

        return {
          ...stat,
          avgRating,
          salary,
          role:
            MASTERS_METADATA[
              stat.name
            ]?.role || 'Sartarosh',
          avatar:
            MASTERS_METADATA[
              stat.name
            ]?.avatar || '👤',
        };
      }
    );
  }, [filteredTransactions]);

  // ====================================================
  // SERVICE STATISTICS
  // ====================================================

  const serviceStats = useMemo(() => {
    const stats = {};

    filteredTransactions.forEach((tx) => {
      stats[tx.service] =
        (stats[tx.service] || 0) + 1;
    });

    const total =
      filteredTransactions.length;

    return Object.entries(stats).map(
      ([name, count]) => ({
        name,
        count,
        percentage:
          total > 0
            ? Math.round(
                (count / total) * 100
              )
            : 0,
      })
    );
  }, [filteredTransactions]);

  // ====================================================
  // TODAY STATISTICS
  // ====================================================

  const todayStats = useMemo(() => {
    const todayStr = new Date()
      .toISOString()
      .split('T')[0];

    const todayTxs = transactions.filter(
      (transaction) =>
        transaction.date === todayStr
    );

    const totalAmount =
      todayTxs.reduce(
        (sum, transaction) =>
          sum + transaction.price,
        0
      );

    const clientCount =
      todayTxs.length;

    const completedCount =
      todayTxs.filter(
        (transaction) =>
          transaction.rating > 0
      ).length;

    const cancelledCount = 0;

    const cashAmount = Math.round(
      totalAmount * 0.494
    );

    const clickAmount = Math.round(
      totalAmount * 0.294
    );

    const paymeAmount =
      totalAmount -
      cashAmount -
      clickAmount;

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

  // ====================================================
  // WEEKLY DATA
  // ====================================================

  const weeklyDaysData = useMemo(() => {
    const dayNames = [
      'Du',
      'Se',
      'Ch',
      'Pa',
      'Ju',
      'Sh',
      'Ya',
    ];

    const result = [];

    const todayStr = new Date()
      .toISOString()
      .split('T')[0];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();

      date.setDate(
        date.getDate() - i
      );

      const dayName =
        dayNames[
          (date.getDay() + 6) % 7
        ];

      const dateStr = date
        .toISOString()
        .split('T')[0];

      const dayTransactions =
        transactions.filter(
          (transaction) =>
            transaction.date === dateStr
        );

      const value =
        dayTransactions.reduce(
          (sum, transaction) =>
            sum + transaction.price,
          0
        );

      result.push({
        dayName,
        dateStr,
        value,
        isToday:
          dateStr === todayStr,
      });
    }

    return result;
  }, [transactions]);

  // ====================================================
  // BAR CHART
  // ====================================================

  const barChartData = useMemo(
    () => ({
      labels: weeklyDaysData.map(
        (day) => day.dayName
      ),

      datasets: [
        {
          data: weeklyDaysData.map(
            (day) => day.value
          ),

          backgroundColor:
            weeklyDaysData.map((day) =>
              day.isToday
                ? '#C5A059'
                : 'rgba(197, 160, 89, 0.2)'
            ),

          hoverBackgroundColor:
            weeklyDaysData.map((day) =>
              day.isToday
                ? '#B8934B'
                : 'rgba(197, 160, 89, 0.35)'
            ),

          borderRadius: 99,

          borderSkipped: false,

          barThickness: 18,
        },
      ],
    }),
    [weeklyDaysData]
  );

  // ====================================================
  // BAR CHART OPTIONS
  // ====================================================

  const barChartOptions = useMemo(
    () => ({
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          enabled: true,

          backgroundColor: '#C5A059',

          titleColor: '#12141A',

          bodyColor: '#12141A',

          padding: {
            top: 6,
            bottom: 6,
            left: 12,
            right: 12,
          },

          cornerRadius: 10,

          displayColors: false,

          callbacks: {
            title: () => '',

            label: (context) =>
              `${Math.round(
                context.raw / 1000
              )}k`,
          },
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },

          ticks: {
            color: (context) => {
              const index =
                context.index;

              return weeklyDaysData[
                index
              ]?.isToday
                ? '#C5A059'
                : '#9CA3AF';
            },

            font: (context) => {
              const index =
                context.index;

              return {
                family: 'Inter',
                weight:
                  weeklyDaysData[
                    index
                  ]?.isToday
                    ? '800'
                    : '600',
                size: 13,
              };
            },
          },

          border: {
            display: false,
          },
        },

        y: {
          display: false,

          grid: {
            display: false,
          },

          border: {
            display: false,
          },
        },
      },
    }),
    [weeklyDaysData]
  );

  // ====================================================
  // 5 DAY TREND DATA
  // ====================================================

  const chartData = useMemo(() => {
    const days = {};

    for (let i = 4; i >= 0; i--) {
      const date = new Date();

      date.setDate(
        date.getDate() - i
      );

      const dateStr = date
        .toISOString()
        .split('T')[0];

      days[dateStr] = 0;
    }

    transactions.forEach((tx) => {
      if (
        Object.prototype.hasOwnProperty.call(
          days,
          tx.date
        )
      ) {
        days[tx.date] += tx.price;
      }
    });

    return Object.entries(days).map(
      ([date, value]) => ({
        label: date.substring(8),
        value,
      })
    );
  }, [transactions]);

  // ====================================================
  // LINE CHART DATA
  // ====================================================

  const lineChartData = useMemo(
    () => ({
      labels: chartData.map(
        (day) => `${day.label}-avg`
      ),

      datasets: [
        {
          label: 'Tushum (UZS)',

          data: chartData.map(
            (day) => day.value
          ),

          borderColor: '#C5A059',

          backgroundColor:
            'rgba(197, 160, 89, 0.15)',

          borderWidth: 3,

          tension: 0.38,

          fill: true,

          pointBackgroundColor:
            '#FFFFFF',

          pointBorderColor:
            '#C5A059',

          pointBorderWidth: 3,

          pointRadius: 5,

          pointHoverRadius: 7,
        },
      ],
    }),
    [chartData]
  );

  // ====================================================
  // LINE CHART OPTIONS
  // ====================================================

  const lineChartOptions = useMemo(
    () => ({
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          backgroundColor: '#1E212B',

          padding: 10,

          cornerRadius: 8,

          callbacks: {
            label: (context) =>
              `${Number(
                context.raw || 0
              ).toLocaleString()} UZS`,
          },
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
          },

          ticks: {
            color: '#9CA3AF',

            font: {
              family: 'Inter',
              size: 12,
            },
          },
        },

        y: {
          grid: {
            color:
              'rgba(255, 255, 255, 0.06)',
          },

          ticks: {
            color: '#9CA3AF',

            font: {
              family: 'Inter',
              size: 11,
            },

            callback: (value) =>
              `${(
                Number(value) / 1000
              ).toFixed(0)}k`,
          },
        },
      },
    }),
    []
  );

  // ====================================================
  // RETURN
  // ====================================================

  return (
    <div className="report-container">

      {/* ================= HEADER ================= */}

      <div className="daily-stats-header">
        <div>
          <h1 className="daily-stats-title">
            {t('todayTitle')}
          </h1>

          <p className="daily-stats-subtitle">
            {t('todaySubtitle')}
          </p>
        </div>

        <div className="report-actions">
          <button
            className="btn-add-tx"
            onClick={() =>
              setShowAddModal(true)
            }
          >
            {t('addServiceBtn')}
          </button>
        </div>
      </div>

      {/* ================= FILTERS ================= */}

      <div className="report-filters">
        <button
          className={
            timeFilter === 'today'
              ? 'active'
              : ''
          }
          onClick={() =>
            setTimeFilter('today')
          }
        >
          Bugun
        </button>

        <button
          className={
            timeFilter === 'week'
              ? 'active'
              : ''
          }
          onClick={() =>
            setTimeFilter('week')
          }
        >
          7 kun
        </button>

        <button
          className={
            timeFilter === 'all'
              ? 'active'
              : ''
          }
          onClick={() =>
            setTimeFilter('all')
          }
        >
          Hammasi
        </button>

        <select
          value={selectedMaster}
          onChange={(e) =>
            setSelectedMaster(
              e.target.value
            )
          }
        >
          <option value="all">
            Barcha ustalar
          </option>

          {Object.keys(
            MASTERS_METADATA
          ).map((master) => (
            <option
              key={master}
              value={master}
            >
              {master}
            </option>
          ))}
        </select>
      </div>

      {/* ================= TOP DASHBOARD ================= */}

      <div className="daily-stats-grid">

        {/* LEFT */}

        <div className="daily-stats-left">

          {/* TODAY RESULT */}

          <div className="daily-card bugungi-natija-card">

            <div className="bg-accent-circle"></div>

            <div className="card-label">
              {t('todayResult')}
            </div>

            <div className="today-amount-wrapper">
              <span className="today-amount-val">
                {todayStats.totalAmount.toLocaleString(
                  'fr-FR'
                )}
              </span>

              <span className="today-amount-unit">
                {t("so'm")}
              </span>
            </div>

            <div className="card-divider"></div>

            <div className="today-metrics-row">

              <div className="metric-item">
                <span className="metric-label">
                  <span className="metric-icon">
                    👥
                  </span>

                  {t('clients')}
                </span>

                <span className="metric-value">
                  {todayStats.clientCount}
                </span>
              </div>

              <div className="metric-item">
                <span className="metric-label">
                  <span className="metric-icon green">
                    ✓
                  </span>

                  {t('completed')}
                </span>

                <span className="metric-value">
                  {todayStats.completedCount}
                </span>
              </div>

              <div className="metric-item">
                <span className="metric-label">
                  <span className="metric-icon red">
                    ✕
                  </span>

                  {t('cancelled')}
                </span>

                <span className="metric-value">
                  {todayStats.cancelledCount}
                </span>
              </div>

            </div>
          </div>

          {/* PAYMENT METHODS */}

          <div className="daily-card payment-methods-card">

            <div className="payment-card-header">
              <span className="payment-card-icon">
                💳
              </span>

              <h3>
                {t('paymentMethods')}
              </h3>
            </div>

            <div className="payment-methods-list">

              <div className="payment-method-item">
                <div className="payment-method-left">
                  <span className="pm-icon cash">
                    💵
                  </span>

                  <span className="pm-name">
                    {t('cash')}
                  </span>
                </div>

                <div className="pm-amount">
                  <span className="pm-val">
                    {todayStats.cashAmount.toLocaleString(
                      'fr-FR'
                    )}
                  </span>

                  <span className="pm-unit">
                    {t("so'm")}
                  </span>
                </div>
              </div>

              <div className="payment-method-item">
                <div className="payment-method-left">
                  <span className="pm-icon click">
                    🌐
                  </span>

                  <span className="pm-name">
                    {t('click')}
                  </span>
                </div>

                <div className="pm-amount">
                  <span className="pm-val">
                    {todayStats.clickAmount.toLocaleString(
                      'fr-FR'
                    )}
                  </span>

                  <span className="pm-unit">
                    {t("so'm")}
                  </span>
                </div>
              </div>

              <div className="payment-method-item">
                <div className="payment-method-left">
                  <span className="pm-icon payme">
                    💳
                  </span>

                  <span className="pm-name">
                    {t('payme')}
                  </span>
                </div>

                <div className="pm-amount">
                  <span className="pm-val">
                    {todayStats.paymeAmount.toLocaleString(
                      'fr-FR'
                    )}
                  </span>

                  <span className="pm-unit">
                    {t("so'm")}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="daily-stats-right">

          <div className="daily-card weekly-income-card">

            <div className="weekly-card-header">

              <div className="weekly-title-row">
                <span className="weekly-icon">
                  📊
                </span>

                <h3>
                  {t('weeklyIncome')}
                </h3>
              </div>

              <p className="weekly-subtitle">
                {t('weeklySubtitle')}
              </p>

            </div>

            <div
              className="weekly-chart-wrapper"
              style={{
                height: '220px',
                position: 'relative',
              }}
            >
              <Bar
                data={barChartData}
                options={barChartOptions}
              />
            </div>

          </div>
        </div>

      </div>

      {/* ================= ANALYTICS ================= */}

      <div className="analytics-layout">

        {/* LEFT */}

        <div className="analytics-left">

          {/* TREND */}

          <div className="section-card">

            <h3 className="section-title">
              {t('trendTitle')}
            </h3>

            <div
              className="chart-container"
              style={{
                height: '220px',
                position: 'relative',
              }}
            >
              <Line
                data={lineChartData}
                options={lineChartOptions}
              />
            </div>

          </div>

          {/* MASTER TABLE */}

          <div className="section-card">

            <h3 className="section-title">
              {t('mastersTitle')}
            </h3>

            <div className="table-responsive">

              <table className="report-table">

                <thead>
                  <tr>
                    <th>
                      {t('masterTh')}
                    </th>

                    <th>
                      {t('servicesTh')}
                    </th>

                    <th>
                      {t('revenueTh')}
                    </th>

                    <th>
                      {t('salaryTh')}
                    </th>

                    <th>
                      {t('ratingTh')}
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {masterStats.map(
                    (master) => (
                      <tr
                        key={master.name}
                      >

                        <td>
                          <div className="master-profile-cell">

                            <span className="master-avatar">
                              {master.avatar}
                            </span>

                            <div>
                              <div className="master-name">
                                {master.name}
                              </div>

                              <div className="master-role">
                                {master.role}
                              </div>
                            </div>

                          </div>
                        </td>

                        <td>
                          {master.servicesCount}{' '}
                          ta
                        </td>

                        <td>
                          {master.revenue.toLocaleString()}{' '}
                          UZS
                        </td>

                        <td className="salary-cell">
                          {master.salary.toLocaleString()}{' '}
                          UZS
                        </td>

                        <td>
                          <span className="rating-tag">
                            ⭐ {master.avgRating}
                          </span>
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>
            </div>

          </div>
        </div>

        {/* RIGHT */}

        <div className="analytics-right">

          {/* POPULAR SERVICES */}

          <div className="section-card">

            <h3 className="section-title">
              {t('popularServices')}
            </h3>

            <div className="services-breakdown">

              {serviceStats.length === 0 ? (
                <p className="no-data">
                  Ma'lumotlar mavjud emas
                </p>
              ) : (
                serviceStats.map(
                  (service) => (
                    <div
                      key={service.name}
                      className="service-progress-item"
                    >

                      <div className="service-progress-info">

                        <span className="service-name-label">
                          {service.name}
                        </span>

                        <span className="service-count-label">
                          {service.count} marta (
                          {service.percentage}
                          %)
                        </span>

                      </div>

                      <div className="progress-bar-bg">

                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${service.percentage}%`,
                          }}
                        ></div>

                      </div>

                    </div>
                  )
                )
              )}

            </div>
          </div>

          {/* RECENT TRANSACTIONS */}

          <div className="section-card">

            <h3 className="section-title">
              {t('recentTx')}
            </h3>

            <div className="tx-list">

              {filteredTransactions
                .slice(0, 6)
                .map((tx) => (

                  <div
                    key={tx.id}
                    className="tx-item"
                  >

                    <div className="tx-meta">
                      <span className="tx-time">
                        {tx.time}
                      </span>

                      <span className="tx-date">
                        {tx.date}
                      </span>
                    </div>

                    <div className="tx-details">

                      <span className="tx-client-name">
                        {tx.client}
                      </span>

                      <span className="tx-service-info">
                        {tx.service} (
                        {tx.master} usta)
                      </span>

                    </div>

                    <div className="tx-price-rating">

                      <span className="tx-price">
                        +
                        {tx.price.toLocaleString()}{' '}
                        UZS
                      </span>

                      <span className="tx-rating-stars">
                        {'★'.repeat(
                          tx.rating
                        )}
                        {'☆'.repeat(
                          5 - tx.rating
                        )}
                      </span>

                    </div>

                  </div>

                ))}

            </div>
          </div>

        </div>
      </div>

      {/* ================= ADD TRANSACTION MODAL ================= */}

      {showAddModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowAddModal(false)
          }
        >

          <div
            className="modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h3>
                💈 Yangi Ko'rsatilgan Xizmatni
                Qo'shish
              </h3>

              <button
                className="modal-close-btn"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={
                handleAddTransaction
              }
              className="modal-form"
            >

              {/* CLIENT + MASTER */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Mijoz ismi
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Masalan: Sardor"
                    value={newTx.client}
                    onChange={(e) =>
                      setNewTx({
                        ...newTx,
                        client:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Usta
                  </label>

                  <select
                    value={newTx.master}
                    onChange={(e) =>
                      setNewTx({
                        ...newTx,
                        master:
                          e.target.value,
                      })
                    }
                  >

                    {Object.keys(
                      MASTERS_METADATA
                    ).map((master) => (
                      <option
                        key={master}
                        value={master}
                      >
                        {master}
                      </option>
                    ))}

                  </select>

                </div>

              </div>

              {/* SERVICE + PRICE */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Ko'rsatilgan Xizmat
                  </label>

                  <select
                    value={newTx.service}
                    onChange={
                      handleServiceChange
                    }
                  >

                    {SERVICES_LIST.map(
                      (service) => (
                        <option
                          key={
                            service.name
                          }
                          value={
                            service.name
                          }
                        >
                          {service.name}
                        </option>
                      )
                    )}

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Xizmat Narxi (UZS)
                  </label>

                  <input
                    type="number"
                    required
                    min="0"
                    value={newTx.price}
                    onChange={(e) =>
                      setNewTx({
                        ...newTx,
                        price:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>

              {/* RATING + DATE */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Baholash
                  </label>

                  <select
                    value={newTx.rating}
                    onChange={(e) =>
                      setNewTx({
                        ...newTx,
                        rating: Number(
                          e.target.value
                        ),
                      })
                    }
                  >

                    <option value={5}>
                      ⭐⭐⭐⭐⭐ (A'lo)
                    </option>

                    <option value={4}>
                      ⭐⭐⭐⭐ (Yaxshi)
                    </option>

                    <option value={3}>
                      ⭐⭐⭐ (O'rtacha)
                    </option>

                    <option value={2}>
                      ⭐⭐ (Qoniqarsiz)
                    </option>

                    <option value={1}>
                      ⭐ (Juda yomon)
                    </option>

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Sana
                  </label>

                  <input
                    type="date"
                    required
                    value={newTx.date}
                    onChange={(e) =>
                      setNewTx({
                        ...newTx,
                        date:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>

              {/* ACTIONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >
                  Bekor qilish
                </button>

                <button
                  type="submit"
                  className="btn-submit"
                >
                  Qo'shish & Hisobotni
                  Yangilash
                </button>

              </div>

            </form>
          </div>
        </div> 
      )}

    </div>
  );
}