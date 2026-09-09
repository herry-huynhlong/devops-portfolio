'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function AdminContact() {
  const [form, setForm] = useState({
    whatsapp: '',
    phone: '',
    zalo: '',
    zalo_qr: '',
    email: '',
    github: '',
    linkedin: '',
    facebook: '',
  })

  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.admin.fetch('contact').then((data) => {
      if (data && data[0]) {
        setForm({
          whatsapp: data[0].whatsapp || '',
          phone: data[0].phone || '',
          zalo: data[0].zalo || '',
          zalo_qr: data[0].zalo_qr || '',
          email: data[0].email || '',
          github: data[0].github || '',
          linkedin: data[0].linkedin || '',
          facebook: data[0].facebook || '',
        })
      }
    })
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setMsg('')

    try {
      await api.admin.fetch('contact', {
        method: 'PATCH',
        query: '?id=eq.1',
        body: {
          ...form,
          updated_at: new Date().toISOString(),
        },
      })

      setMsg('Saved successfully!')
    } catch (err) {
      console.error(err)
      setMsg('Error saving')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="pageHeader">
        <h1 className="pageTitle">Contact Info</h1>
        <p className="pageDesc">
          Edit your contact details and social links.
        </p>
      </div>

      {msg && <div className="successMsg">{msg}</div>}

      <form onSubmit={handleSave}>
        <div className="card">
          <div className="cardTitle">Contact Details</div>

          <div className="field">
            <label className="label">Phone Number</label>
            <input
              className="input"
              type="text"
              placeholder="0935269851"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label className="label">Zalo URL</label>
            <input
              className="input"
              type="text"
              placeholder="https://zalo.me/..."
              value={form.zalo}
              onChange={(e) =>
                setForm({ ...form, zalo: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label className="label">Zalo QR Image Path</label>
            <input
              className="input"
              type="text"
              placeholder="/images/zalo-qr.png"
              value={form.zalo_qr}
              onChange={(e) =>
                setForm({ ...form, zalo_qr: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label className="label">WhatsApp URL</label>
            <input
              className="input"
              type="text"
              value={form.whatsapp}
              onChange={(e) =>
                setForm({ ...form, whatsapp: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label className="label">GitHub URL</label>
            <input
              className="input"
              type="text"
              value={form.github}
              onChange={(e) =>
                setForm({ ...form, github: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label className="label">LinkedIn URL</label>
            <input
              className="input"
              type="text"
              value={form.linkedin}
              onChange={(e) =>
                setForm({ ...form, linkedin: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label className="label">Facebook URL</label>
            <input
              className="input"
              type="text"
              value={form.facebook}
              onChange={(e) =>
                setForm({ ...form, facebook: e.target.value })
              }
            />
          </div>

          <button
            className="saveBtn"
            type="submit"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
