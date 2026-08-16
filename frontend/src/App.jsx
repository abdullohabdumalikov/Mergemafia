import { useState, useEffect } from 'react'
import './App.css'

const API = 'http://localhost:3000'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', age: '' })
  const [formErrors, setFormErrors] = useState({})
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const showMessage = (msg, isError = false) => {
    if (isError) setError(msg)
    else setSuccess(msg)
    setTimeout(() => { setError(''); setSuccess('') }, 3000)
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API}/users`)
      const data = await res.json()
      setUsers(data.data || [])
    } catch {
      showMessage('Serverga ulanib bo\'lmadi', true)
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!form.name.trim()) errors.name = 'Ism kiritilishi shart'
    if (!form.email.trim()) errors.email = 'Email kiritilishi shart'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Email noto\'g\'ri formatda'
    if (form.age && (isNaN(form.age) || +form.age < 1 || +form.age > 120)) errors.age = 'Yosh 1-120 orasida bo\'lishi kerak'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const body = { name: form.name, email: form.email, age: form.age ? +form.age : null }

    try {
      if (editingUser) {
        const res = await fetch(`${API}/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        if (!data.success) throw new Error(data.message)
        setUsers(users.map(u => u.id === editingUser.id ? data.data : u))
        showMessage('Foydalanuvchi yangilandi!')
      } else {
        const res = await fetch(`${API}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        if (!data.success) throw new Error(data.message)
        setUsers([...users, data.data])
        showMessage('Foydalanuvchi qo\'shildi!')
      }
      closeForm()
    } catch (err) {
      showMessage(err.message || 'Xatolik yuz berdi', true)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/users/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      setUsers(users.filter(u => u.id !== id))
      setDeletingId(null)
      showMessage('Foydalanuvchi o\'chirildi!')
    } catch (err) {
      showMessage(err.message || 'O\'chirishda xatolik', true)
    }
  }

  const openEdit = (user) => {
    setEditingUser(user)
    setForm({ name: user.name, email: user.email, age: user.age ?? '' })
    setFormErrors({})
    setShowForm(true)
  }

  const openCreate = () => {
    setEditingUser(null)
    setForm({ name: '', email: '', age: '' })
    setFormErrors({})
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingUser(null)
    setForm({ name: '', email: '', age: '' })
    setFormErrors({})
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <span className="logo-icon">👤</span>
              <h1>User Manager</h1>
            </div>
            <span className="badge">{users.length} foydalanuvchi</span>
          </div>
          <button className="btn btn-primary" onClick={openCreate}>
            + Yangi foydalanuvchi
          </button>
        </div>
      </header>

      <main className="main">
        {error && <div className="alert alert-error">⚠ {error}</div>}
        {success && <div className="alert alert-success">✓ {success}</div>}

        {loading ? (
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
