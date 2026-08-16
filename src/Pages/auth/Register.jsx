import { useState, useEffect } from "react";
import "./Register.css";

function Register() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("barber-theme") || "dark";
  });
  
  // Logged in user state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("logged_in_barber");
    return saved ? JSON.parse(saved) : null;
  });

  // Alert message state
  const [alertInfo, setAlertInfo] = useState({ show: false, type: "", message: "" });

  // Registration Form States
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    workHours: "",
    workPlace: "",
    barbershopName: "",
    phone: "",
    password: "",
  });

  // Login Form States
  const [loginForm, setLoginForm] = useState({
    name: "",
    password: "",
  });

  // Update theme on mount and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("barber-theme", theme);
  }, [theme]);

  // Show status alerts helper
  const showAlert = (message, type = "success") => {
    setAlertInfo({ show: true, type, message });
    setTimeout(() => {
      setAlertInfo({ show: false, type: "", message: "" });
    }, 4000);
  };

  // Toggle Dark/Light Mode
  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // Handle Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      !registerForm.firstName ||
      !registerForm.lastName ||
      !registerForm.workHours ||
      !registerForm.workPlace ||
      !registerForm.barbershopName ||
      !registerForm.phone ||
      !registerForm.password
    ) {
      showAlert("Iltimos, barcha maydonlarni to'ldiring!", "error");
      return;
    }

    if (registerForm.password.length < 4) {
      showAlert("Parol kamida 4 ta belgidan iborat bo'lishi kerak!", "error");
      return;
    }

    // Get existing barbers
    const existingBarbers = JSON.parse(localStorage.getItem("barber_users") || "[]");

    // Check if barber is already registered with the same name or phone
    const nameMatch = `${registerForm.firstName} ${registerForm.lastName}`.toLowerCase();
    const isAlreadyRegistered = existingBarbers.some(
      (b) => `${b.firstName} ${b.lastName}`.toLowerCase() === nameMatch || b.phone === registerForm.phone
    );

    if (isAlreadyRegistered) {
      showAlert("Bu sartarosh allaqachon ro'yxatdan o'tgan!", "error");
      return;
    }

    // Save new barber profile
    const newBarber = {
      ...registerForm,
      fullName: `${registerForm.firstName} ${registerForm.lastName}`
    };
    
    existingBarbers.push(newBarber);
    localStorage.setItem("barber_users", JSON.stringify(existingBarbers));

    // Log the user in directly or save state
    localStorage.setItem("logged_in_barber", JSON.stringify(newBarber));
    setCurrentUser(newBarber);

    showAlert("Ro'yxatdan o'tish muvaffaqiyatli yakunlandi! Tizimga kirildi.", "success");
    
    // Reset form
    setRegisterForm({
      firstName: "",
      lastName: "",
      workHours: "",
      workPlace: "",
      barbershopName: "",
      phone: "",
      password: "",
    });
  };

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!loginForm.name || !loginForm.password) {
      showAlert("Ism va parolni kiriting!", "error");
      return;
    }

    const existingBarbers = JSON.parse(localStorage.getItem("barber_users") || "[]");

    // Search barber by full name (firstName lastName) or first name, or matching names
    const barber = existingBarbers.find(
      (b) => 
        (b.firstName.toLowerCase() === loginForm.name.toLowerCase() || 
         b.fullName.toLowerCase() === loginForm.name.toLowerCase()) && 
        b.password === loginForm.password
    );

    if (barber) {
      localStorage.setItem("logged_in_barber", JSON.stringify(barber));
      setCurrentUser(barber);
      showAlert("Xush kelibsiz! Tizimga muvaffaqiyatli kirdingiz.", "success");
      setLoginForm({ name: "", password: "" });
    } else {
      showAlert("Ism yoki parol noto'g'ri!", "error");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("logged_in_barber");
    setCurrentUser(null);
    showAlert("Tizimdan chiqildi.", "success");
  };

  return (
    <div className="barber-container">
      {/* Header Controls */}
      <header className="barber-header">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {alertInfo.show && (
        <div className={`barber-alert ${alertInfo.type}`} style={{ marginBottom: "20px", width: "100%", maxWidth: "500px" }}>
          {alertInfo.type === "success" ? "✅" : "❌"} {alertInfo.message}
        </div>
      )}

      {/* ----------------- LOGGED IN STATE (DASHBOARD) ----------------- */}
      {currentUser ? (
        <div className="barber-dashboard">
          <div className="dashboard-header">
            <span style={{ fontSize: "50px" }}>💈</span>
            <h1 className="welcome-title">Xush kelibsiz, {currentUser.firstName}!</h1>
            <p style={{ color: "var(--text-secondary)" }}>Sartaroshxonangiz boshqaruv paneli</p>
          </div>

          <div className="profile-grid">
            <div className="profile-card">
              <div className="label">Sartarosh</div>
              <div className="val">{currentUser.fullName}</div>
            </div>
            
            <div className="profile-card">
              <div className="label">Sartaroshxona nomi</div>
              <div className="val">{currentUser.barbershopName}</div>
            </div>

            <div className="profile-card">
              <div className="label">Ishlash vaqti</div>
              <div className="val">{currentUser.workHours}</div>
            </div>

            <div className="profile-card">
              <div className="label">Ish joyi (Manzil)</div>
              <div className="val">{currentUser.workPlace}</div>
            </div>

            <div className="profile-card" style={{ gridColumn: "span 2" }}>
              <div className="label">Telefon raqam</div>
              <div className="val">{currentUser.phone}</div>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            🚪 Tizimdan chiqish
          </button>
        </div>
      ) : (
        /* ----------------- AUTHENTICATION CARD ----------------- */
        <div className="barber-card">
          <div className="barber-brand">
            <span className="icon">✂️</span>
            <h1>GENTLEMAN'S CLUB</h1>
            <p>Sartaroshlar uchun maxsus portal</p>
          </div>

          {/* Form tab selectors */}
          <div className="barber-tabs">
            <button 
              className={`barber-tab ${!isRegisterMode ? "active" : ""}`}
              onClick={() => setIsRegisterMode(false)}
            >
              Kirish
            </button>
            <button 
              className={`barber-tab ${isRegisterMode ? "active" : ""}`}
              onClick={() => setIsRegisterMode(true)}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          {/* ----------------- LOGIN FORM ----------------- */}
          {!isRegisterMode && (
            <form className="barber-form" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="login-name">Sartarosh ismi</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    id="login-name"
                    className="barber-input"
                    type="text"
                    placeholder="Ismingizni kiriting"
                    value={loginForm.name}
                    onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Parol</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    id="login-password"
                    className="barber-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "🙈"}
                  </button>
                </div>
              </div>

              <button type="submit" className="barber-submit-btn">
                Kirish
              </button>
            </form>
          )}

          {/* ----------------- REGISTER FORM ----------------- */}
          {isRegisterMode && (
            <form className="barber-form" onSubmit={handleRegisterSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reg-first">Ism</label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      id="reg-first"
                      className="barber-input"
                      type="text"
                      placeholder="Ism"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-last">Familiya</label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      id="reg-last"
                      className="barber-input"
                      type="text"
                      placeholder="Familiya"
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reg-hours">Ishlash vaqti</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🕒</span>
                    <input
                      id="reg-hours"
                      className="barber-input"
                      type="text"
                      placeholder="Masalan: 09:00 - 20:00"
                      value={registerForm.workHours}
                      onChange={(e) => setRegisterForm({ ...registerForm, workHours: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-shop">Sartaroshxona nomi</label>
                  <div className="input-wrapper">
                    <span className="input-icon">💈</span>
                    <input
                      id="reg-shop"
                      className="barber-input"
                      type="text"
                      placeholder="Salon nomi"
                      value={registerForm.barbershopName}
                      onChange={(e) => setRegisterForm({ ...registerForm, barbershopName: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-place">Ish joyi (Manzil)</label>
                <div className="input-wrapper">
                  <span className="input-icon">📍</span>
                  <input
                    id="reg-place"
                    className="barber-input"
                    type="text"
                    placeholder="Ish joyi manzili"
                    value={registerForm.workPlace}
                    onChange={(e) => setRegisterForm({ ...registerForm, workPlace: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-phone">Telefon raqam</label>
                <div className="input-wrapper">
                  <span className="input-icon">📞</span>
                  <input
                    id="reg-phone"
                    className="barber-input"
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-password">Parol</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    id="reg-password"
                    className="barber-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Kuchsiz bo'lmagan parol"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "🙈"}
                  </button>
                </div>
              </div>

              <button type="submit" className="barber-submit-btn">
                Ro'yxatdan o'tish
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Register;