import React, { useState } from "react";
import "./Warehouse.css";

// Modern SVG Icons
const Icons = {
  Home: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Queue: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Orders: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  Clients: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Ombor: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Hisobot: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Plus: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Shampoo: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  Razor: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  BeardCream: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <circle cx="12" cy="7" r="3" />
    </svg>
  ),
  Gel: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
};

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Shampun",
    iconKey: "Shampoo",
    bgClass: "shampoo-bg",
    quantity: 8,
    minimum: 5,
    status: "Yetarli",
    type: "good",
    category: "Soch parvarishi",
  },
  {
    id: 2,
    name: "Ustara",
    iconKey: "Razor",
    bgClass: "razor-bg",
    quantity: 12,
    minimum: 10,
    status: "Yetarli",
    type: "good",
    category: "Uskunalar",
  },
  {
    id: 3,
    name: "Soqol kremi",
    iconKey: "BeardCream",
    bgClass: "cream-bg",
    quantity: 2,
    minimum: 5,
    status: "Tugayapti",
    type: "low",
    category: "Soqol va yuz",
  },
  {
    id: 4,
    name: "Gel",
    iconKey: "Gel",
    bgClass: "gel-bg",
    quantity: 15,
    minimum: 8,
    status: "Yetarli",
    type: "good",
    category: "Soch parvarishi",
  },
];

const MENU_ITEMS = [
  { id: "home", iconComponent: Icons.Home, title: "Bosh sahifa" },
  { id: "queue", iconComponent: Icons.Queue, title: "Navbat" },
  { id: "orders", iconComponent: Icons.Orders, title: "Buyurtmalar" },
  { id: "clients", iconComponent: Icons.Clients, title: "Mijozlar" },
  { id: "ombor", iconComponent: Icons.Ombor, title: "Ombor", active: true },
  { id: "hisobot", iconComponent: Icons.Hisobot, title: "Hisobot" },
];

const CATEGORY_ITEMS = [
  { name: "Soch parvarishi" },
  { name: "Soqol va yuz" },
  { name: "Uskunalar" },
  { name: "Gigiyena" },
];

export default function Warehouse() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    iconKey: "Shampoo",
    quantity: 10,
    minimum: 5,
    category: "Soch parvarishi",
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;

    const qty = Number(newProduct.quantity);
    const min = Number(newProduct.minimum);
    const isLow = qty <= min;

    const item = {
      id: Date.now(),
      name: newProduct.name,
      iconKey: "Shampoo",
      bgClass: isLow ? "cream-bg" : "shampoo-bg",
      quantity: qty,
      minimum: min,
      status: isLow ? "Tugayapti" : "Yetarli",
      type: isLow ? "low" : "good",
      category: newProduct.category,
    };

    setProducts([...products, item]);
    setShowAddProductModal(false);
    setNewProduct({ name: "", iconKey: "Shampoo", quantity: 10, minimum: 5, category: "Soch parvarishi" });
    triggerToast(`"${item.name}" mahsuloti omborga qo'shildi!`);
  };

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="artisan-app">
      {/* Toast alert notification */}
      {toastMessage && (
        <div className="toast-notification">
          <span>✓</span> {toastMessage}
        </div>
      )}

      {/* HEADER */}
      <header className="artisan-header">
        <div className="header-logo">
          Artisan Sartaroshxona
        </div>

        <div className="header-actions">
          <button className="icon-btn notification-btn" title="Xabarnomalar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="notification-badge"></span>
          </button>

          <div className="user-avatar-wrapper" title="Profil">
            <div className="avatar-img-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2B2D38" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
     

      {/* MAIN CONTENT AREA */}
      <main className="artisan-main">
        {/* PAGE TOP */}
        <div className="page-header">
          <div className="page-title-box">
            <h1 className="page-title">Ombor</h1>
            <p className="page-subtitle">Nima tugayapti?</p>
          </div>

          <button
            className="btn-add-product"
            onClick={() => setShowAddProductModal(true)}
          >
            <Icons.Plus />
            <span>+ Mahsulot qo'shish</span>
          </button>
        </div>

        {/* CONTENT GRID */}
        <div className="ombor-grid">
          {/* LEFT COLUMN: Asosiy zahiralar Table */}
          <div className="ombor-card inventory-main-card">
            <div className="card-top-bar">
              <div className="card-heading">
                <span className="box-symbol">
                  <Icons.Ombor />
                </span>
                <h2>Asosiy zahiralar</h2>
              </div>

              <button
                className="link-view-all"
                onClick={() => setSelectedCategory("all")}
              >
                Barchasini ko'rish
              </button>
            </div>

            {/* TABLE HEADER */}
            <div className="inventory-table-header">
              <div className="col-product">Mahsulot</div>
              <div className="col-qty">Qoldiq</div>
              <div className="col-min">Minimal miqdor</div>
              <div className="col-status">Holat</div>
            </div>

            {/* TABLE ROWS */}
            <div className="inventory-table-body">
              {filteredProducts.map((p) => {
                const isLow = p.type === "low";
                const ProductIcon = Icons[p.iconKey] || Icons.Shampoo;
                return (
                  <div
                    key={p.id}
                    className={`inventory-table-row ${isLow ? "row-low-alert" : ""}`}
                  >
                    <div className="col-product font-medium">
                      <div className={`product-icon-container ${p.bgClass || "shampoo-bg"}`}>
                        <ProductIcon />
                      </div>
                      <span className="product-name-text">{p.name}</span>
                    </div>

                    <div className={`col-qty ${isLow ? "qty-text-red" : ""}`}>
                      {p.quantity} dona
                    </div>

                    <div className="col-min">{p.minimum}</div>

                    <div className="col-status">
                      <span className={`status-pill ${isLow ? "pill-danger" : "pill-success"}`}>
                        <span className="status-bullet"></span>
                        {p.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="ombor-right-column">
            {/* WARNING CARD */}
            <div className="alert-warning-card">
              {/* Background Watermark Triangle */}
              <svg className="watermark-warning-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="9" x2="12" y2="13" strokeWidth="2"/>
                <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5"/>
              </svg>

              <div className="warning-card-header">
                <span className="warning-danger-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </span>
                <h3 className="warning-title">Diqqat!</h3>
              </div>

              <p className="warning-description">
                Soqol kremi zaxirasi minimal miqdordan tushib ketdi (2/5). Iltimos tez kunda buyurtma bering.
              </p>

              <button
                className="btn-call-supplier"
                onClick={() => setShowCallModal(true)}
              >
                <span>Ta'minotchiga qo'ng'iroq</span>
              </button>
            </div>

            {/* CATEGORIES CARD */}
            <div className="ombor-card categories-card">
              <h3 className="categories-title">Mahsulot toifalari</h3>
              <div className="categories-list">
                {CATEGORY_ITEMS.map((catItem) => {
                  const isSelected = selectedCategory === catItem.name;
                  return (
                    <div
                      key={catItem.name}
                      className={`category-item-row ${isSelected ? "selected-cat" : ""}`}
                      onClick={() => setSelectedCategory(isSelected ? "all" : catItem.name)}
                    >
                      <span className="cat-label">{catItem.name}</span>
                      <span className="cat-arrow">
                        <Icons.ChevronRight />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL 1: ADD PRODUCT */}
      {showAddProductModal && (
        <div className="modal-backdrop" onClick={() => setShowAddProductModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <h3>📦 Yangi Mahsulot Qo'shish</h3>
              <button className="modal-x-btn" onClick={() => setShowAddProductModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddProduct} className="modal-form">
              <div className="form-group">
                <label>Mahsulot nomi *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Soch vositasi"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Mavjud Qoldiq (dona)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Minimal Miqdor</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newProduct.minimum}
                    onChange={(e) => setNewProduct({ ...newProduct, minimum: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Toifa</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  {CATEGORY_ITEMS.map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="modal-buttons">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowAddProductModal(false)}>
                  Bekor qilish
                </button>
                <button type="submit" className="btn-modal-save">
                  Omborga Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CALL SUPPLIER */}
      {showCallModal && (
        <div className="modal-backdrop" onClick={() => setShowCallModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <h3>📞 Ta'minotchi bilan bog'lanish</h3>
              <button className="modal-x-btn" onClick={() => setShowCallModal(false)}>✕</button>
            </div>
            <div className="supplier-card-body">
              <div className="supplier-avatar">🏬</div>
              <h4>"Barber Professional Supplies" MCHJ</h4>
              <p className="supplier-phone">+998 91 555 44 33</p>
              <div className="supplier-info">
                <p><strong>Yetkazish vaqti:</strong> 24 soat ichida</p>
                <p><strong>Zaxiradagi soqol kremlari:</strong> Mavjud</p>
              </div>
              <div className="supplier-actions">
                <a href="tel:+998915554433" className="btn-call-direct">
                  📞 Qo'ng'iroq qilish
                </a>
                <button
                  className="btn-order-quick"
                  onClick={() => {
                    setShowCallModal(false);
                    triggerToast("Ta'minotchiga 10 ta Soqol kremi buyurtmasi yuborildi!");
                  }}
                >
                  📦 10 dona Buyurtma berish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}