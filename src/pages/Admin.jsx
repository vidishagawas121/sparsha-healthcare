import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, saveEvents, DEFAULT_EVENTS } from '../data/eventsData';
import { buildWhatsAppUrl } from '../data/contactInfo';
import { getInquiries, deleteInquiry, clearAllInquiries } from '../data/inquiriesService';
import Button from '../components/Button';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Package,
  Layers,
  Sparkles,
  Bell,
  Pin,
  Tag,
  Upload,
  Image as ImageIcon,
  Link2,
  RefreshCw
} from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'inquiries' | 'orders'

  // Events / Notices state
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Recent logs
  const [inquiries, setInquiries] = useState([]);
  const [orders, setOrders] = useState([]);

  // Notice & Event Form State
  const initialForm = {
    title: '',
    type: 'product',
    category: 'Product Launch',
    badge: 'NEW PRODUCT LAUNCH',
    summary: '',
    date: '',
    dateDisplay: 'Available Now',
    time: 'Pan-India Express Dispatch',
    location: 'Sparsha Apothecary & Online Dispatch',
    price: '₹549',
    image: '',
    description: '',
    slotsAvailable: '',
    actionText: 'Order via WhatsApp',
    isPinned: false,
    isFeatured: true
  };
  const [eventForm, setEventForm] = useState(initialForm);
  const [formSuccess, setFormSuccess] = useState('');

  // Banner image upload from device vs URL mode
  const [imageInputMode, setImageInputMode] = useState('upload'); // 'upload' | 'url'
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null); // { name: string, size: string }
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('sparsha_admin_token');
    const user = localStorage.getItem('sparsha_admin_user');
    if (token) {
      setIsAuthenticated(true);
      if (user) {
        try { setAdminUser(JSON.parse(user)); } catch (e) {}
      }
    }
    loadEventsData();
    loadRecentLogs();
  }, []);

  async function loadEventsData() {
    const data = await getEvents();
    setEvents(data);
  }

  const [isSyncingInquiries, setIsSyncingInquiries] = useState(false);

  async function loadRecentLogs() {
    setIsSyncingInquiries(true);
    try {
      const list = await getInquiries();
      setInquiries(list);

      const orderRes = await fetch('/api/orders').catch(() => null);
      if (orderRes && orderRes.ok) {
        const text = await orderRes.text();
        if (text && (text.startsWith('[') || text.startsWith('{'))) {
          const orderData = JSON.parse(text);
          setOrders(orderData);
        }
      }
    } catch (e) {
    } finally {
      setIsSyncingInquiries(false);
    }
  }

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to remove this inquiry from the admin log?')) return;
    const updated = await deleteInquiry(id);
    setInquiries(updated);
  };

  const handleClearInquiries = async () => {
    if (!window.confirm('Are you sure you want to clear all inquiries from the admin log?')) return;
    await clearAllInquiries();
    setInquiries([]);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('sparsha_admin_token', data.token);
        localStorage.setItem('sparsha_admin_user', JSON.stringify(data.admin));
        setIsAuthenticated(true);
        setAdminUser(data.admin);
      } else {
        // Direct demo check fallback
        if (loginEmail === 'admin@sparshahealth.com' && loginPassword === 'sparsha2026') {
          const demoUser = { name: 'Sparsha Medical Administrator', email: loginEmail, role: 'SuperAdmin' };
          localStorage.setItem('sparsha_admin_token', 'demo-token-' + Date.now());
          localStorage.setItem('sparsha_admin_user', JSON.stringify(demoUser));
          setIsAuthenticated(true);
          setAdminUser(demoUser);
        } else {
          setLoginError('Invalid administrator credentials. Please check details below.');
        }
      }
    } catch (err) {
      if (loginEmail === 'admin@sparshahealth.com' && loginPassword === 'sparsha2026') {
        const demoUser = { name: 'Sparsha Medical Administrator', email: loginEmail, role: 'SuperAdmin' };
        localStorage.setItem('sparsha_admin_token', 'demo-token-' + Date.now());
        localStorage.setItem('sparsha_admin_user', JSON.stringify(demoUser));
        setIsAuthenticated(true);
        setAdminUser(demoUser);
      } else {
        setLoginError('Unable to connect to server. Use demo credentials.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const fillDemoCredentials = () => {
    setLoginEmail('admin@sparshahealth.com');
    setLoginPassword('sparsha2026');
    setLoginError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('sparsha_admin_token');
    localStorage.removeItem('sparsha_admin_user');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTypeSelect = (selectedType) => {
    if (selectedType === 'product') {
      setEventForm(prev => ({
        ...prev,
        type: 'product',
        category: 'Product Launch',
        badge: 'NEW PRODUCT LAUNCH',
        time: 'Pan-India Express Dispatch',
        location: 'Sparsha Apothecary & Online Dispatch',
        price: '₹549',
        actionText: 'Order via WhatsApp',
        image: prev.image || ''
      }));
    } else if (selectedType === 'opd') {
      setEventForm(prev => ({
        ...prev,
        type: 'opd',
        category: 'Doctor OPD Schedule',
        badge: 'OPD NOTICE',
        time: '10:00 AM – 4:00 PM',
        location: 'Sparsha Integrated Hospital & Clinics, Bangalore',
        price: '₹600 (Consultation)',
        actionText: 'Book OPD Slot',
        image: prev.image || ''
      }));
    } else if (selectedType === 'retreat') {
      setEventForm(prev => ({
        ...prev,
        type: 'retreat',
        category: 'Detox Retreat',
        badge: 'DETOX RETREAT',
        time: '7-Day Residential Immersion',
        location: 'Sparsha Wellness Resort, Chikkolale, Chikmagalur',
        actionText: 'Register for Retreat',
        image: prev.image || ''
      }));
    } else if (selectedType === 'workshop') {
      setEventForm(prev => ({
        ...prev,
        type: 'workshop',
        category: 'Interactive Workshop',
        badge: 'WORKSHOP',
        time: '10:00 AM – 2:00 PM',
        location: 'Sparsha Multicare Center, Outer Ring Road, Bangalore',
        actionText: 'Register for Workshop',
        image: prev.image || ''
      }));
    } else {
      setEventForm(prev => ({
        ...prev,
        type: 'notice',
        category: 'General Announcement',
        badge: 'CLINICAL NOTICE',
        actionText: 'Inquire via WhatsApp',
        image: prev.image || ''
      }));
    }
  };

  const handleTogglePin = async (id) => {
    const updated = events.map(e => e.id === id ? { ...e, isPinned: !e.isPinned } : e);
    setEvents(updated);
    await saveEvents(updated);
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    if (!eventForm.title.trim()) {
      alert('Please enter a notice / event title');
      return;
    }

    let updatedEvents = [...events];
    if (isEditing && editingId) {
      updatedEvents = updatedEvents.map(evt => evt.id === editingId ? { ...evt, ...eventForm } : evt);
      setFormSuccess('Notice Board item updated successfully!');
    } else {
      const newEvt = {
        ...eventForm,
        id: `evt-${Date.now()}`,
        dateDisplay: eventForm.dateDisplay || eventForm.date
      };
      if (eventForm.isPinned) {
        updatedEvents.unshift(newEvt);
      } else {
        // place after pinned items
        const pinnedCount = updatedEvents.filter(e => e.isPinned).length;
        updatedEvents.splice(pinnedCount, 0, newEvt);
      }
      setFormSuccess('New item published! It is now live on the Home page Notice Board and Events section.');
    }

    setEvents(updatedEvents);
    await saveEvents(updatedEvents);

    setTimeout(() => {
      setFormSuccess('');
      setIsEditing(false);
      setEditingId(null);
      setEventForm(initialForm);
      setUploadedFileInfo(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 2000);
  };

  // Optimize & process image uploaded from device
  const processImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WebP, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Automatically optimize dimensions (max 1200x800 for banner)
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress as high-quality JPEG (0.85) to keep storage under ~150KB
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const estSizeKb = Math.round((optimizedDataUrl.length * 3) / 4 / 1024);

        setEventForm(prev => ({ ...prev, image: optimizedDataUrl }));
        setUploadedFileInfo({
          name: file.name,
          size: `${estSizeKb} KB`
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingImage(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingImage(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingImage(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setEventForm(prev => ({ ...prev, image: '' }));
    setUploadedFileInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStartEdit = (evt) => {
    setIsEditing(true);
    setEditingId(evt.id);
    setEventForm({ ...evt });
    if (evt.image) {
      if (evt.image.startsWith('data:')) {
        setImageInputMode('upload');
        setUploadedFileInfo({ name: 'Uploaded image file', size: 'Optimized' });
      } else {
        setImageInputMode('url');
        setUploadedFileInfo(null);
      }
    } else {
      setUploadedFileInfo(null);
    }
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to remove this announcement from the website?')) return;
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    await saveEvents(updated);
  };

  const handleResetDefaults = async () => {
    if (!window.confirm('Reset all events to default schedule?')) return;
    setEvents(DEFAULT_EVENTS);
    await saveEvents(DEFAULT_EVENTS);
  };

  // If not logged in, display the Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-page" style={{ padding: '96px 20px', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '480px' }}>
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '44px 36px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <img
                src="/images/sparsha_logo.png"
                alt="Sparsha Healthcare Group"
                style={{
                  width: '64px',
                  height: '64px',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  background: '#ffffff',
                  padding: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  marginBottom: '12px'
                }}
              />
              <h2 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>Sparsha Admin Portal</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Manage upcoming wellness events, retreat announcements & enquiries.
              </p>
            </div>

            {loginError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Admin Email</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="admin@sparshahealth.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}
              >
                {isLoggingIn ? 'Verifying...' : 'Sign In to Admin Portal'}
              </button>
            </form>

            {/* Demo Credentials Helper Box */}
            <div style={{ marginTop: '28px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-sm)', padding: '16px', border: '1px dashed var(--color-border)', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} /> Demo Admin Credentials:
              </div>
              <div style={{ color: 'var(--color-text-main)', marginBottom: '4px' }}>
                <strong>Email:</strong> admin@sparshahealth.com
              </div>
              <div style={{ color: 'var(--color-text-main)', marginBottom: '12px' }}>
                <strong>Password:</strong> sparsha2026
              </div>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="btn btn-outline"
                style={{ width: '100%', padding: '6px 12px', fontSize: '0.8rem', background: '#ffffff' }}
              >
                1-Click Autofill Credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard View
  return (
    <div className="admin-portal-page" style={{ padding: '48px 0 96px 0', background: '#f8faf9' }}>
      <div className="container">
        {/* Admin Header */}
        <div className="admin-header-card">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              <ShieldCheck size={16} /> Sparsha Administrative Console
            </div>
            <h1 className="admin-header-title">
              Events & Communications Management
            </h1>
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Logged in as: <strong>{adminUser?.name || 'Administrator'}</strong> ({adminUser?.email || 'admin@sparshahealth.com'})
            </div>
          </div>

          <div className="admin-header-actions">
            <Link
              to="/"
              target="_blank"
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem' }}
            >
              <Eye size={15} />
              <span>Preview Live Site</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleLogout}
              className="btn"
              style={{
                background: '#fee2e2',
                color: '#991b1b',
                border: '1px solid #fecaca',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="admin-nav-tabs">
          <button
            type="button"
            onClick={() => setActiveTab('events')} className="admin-nav-tab-btn" style={{ background: activeTab === 'events' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'events' ? '#ffffff' : 'var(--color-text-main)' }}
          >
            <Bell size={16} />
            <span>Notice Board & Announcements ({events.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inquiries')} className="admin-nav-tab-btn" style={{ background: activeTab === 'inquiries' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'inquiries' ? '#ffffff' : 'var(--color-text-main)' }}
          >
            <MessageCircle size={16} />
            <span>Service Enquiries Log</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')} className="admin-nav-tab-btn" style={{ background: activeTab === 'orders' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'orders' ? '#ffffff' : 'var(--color-text-main)' }}
          >
            <Package size={16} />
            <span>WhatsApp Orders Log</span>
          </button>
        </div>

        {/* TAB 1: NOTICE BOARD & EVENTS MANAGER */}
        {activeTab === 'events' && (
          <div className="admin-events-grid">
            {/* Left: Create / Edit Notice or Event Form */}
            <div className="admin-card-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px' }}>
                <div>
                  <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', color: 'var(--color-primary)' }}>
                    {isEditing ? <Edit3 size={18} color="var(--color-gold)" /> : <Plus size={18} color="var(--color-primary)" />}
                    <span>{isEditing ? 'Edit Notice Board Item' : 'Publish Notice / Product Launch'}</span>
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    Updates will instantly appear on the Home page Hero Notice Board and Events section.
                  </p>
                </div>

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingId(null);
                      setEventForm(initialForm);
                    }}
                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              {formSuccess && (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} />
                  <span>{formSuccess}</span>
                </div>
              )}

              {/* Quick Type Selection Pills */}
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label" style={{ fontSize: '0.85rem', marginBottom: '8px', display: 'block' }}>
                  Select Announcement Type:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[
                    { id: 'product', label: '🚀 New Product Launch', badge: 'NEW PRODUCT LAUNCH' },
                    { id: 'opd', label: '🩺 Doctor OPD Schedule', badge: 'OPD NOTICE' },
                    { id: 'retreat', label: '🌿 Detox Retreat', badge: 'DETOX RETREAT' },
                    { id: 'workshop', label: '🏕️ Camp / Workshop', badge: 'WORKSHOP' },
                    { id: 'notice', label: '📢 General Notice', badge: 'CLINICAL NOTICE' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleTypeSelect(t.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: eventForm.type === t.id ? 'var(--color-primary)' : 'var(--color-border)',
                        background: eventForm.type === t.id ? 'var(--color-primary)' : '#f8faf9',
                        color: eventForm.type === t.id ? '#ffffff' : 'var(--color-text-main)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSaveEvent}>
                {/* Title */}
                <div className="form-group">
                  <label className="form-label" htmlFor="eventTitle">Notice / Launch Title *</label>
                  <input
                    type="text"
                    id="eventTitle"
                    name="title"
                    className="form-control"
                    placeholder="e.g. New Launch: Triphala Gold Rasayana & Gut Revitalizer"
                    value={eventForm.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Short Summary (Notice Board preview) */}
                <div className="form-group">
                  <label className="form-label" htmlFor="eventSummary">Short Summary (Preview line on Notice Board)</label>
                  <input
                    type="text"
                    id="eventSummary"
                    name="summary"
                    className="form-control"
                    placeholder="e.g. Fresh micro-batch with wild-harvested Amla & Western Ghats forest honey."
                    value={eventForm.summary || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="eventBadge">Tag / Badge Text</label>
                    <input
                      type="text"
                      id="eventBadge"
                      name="badge"
                      className="form-control"
                      placeholder="e.g. NEW LAUNCH / OPD NOTICE"
                      value={eventForm.badge || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="eventCategory">Category</label>
                    <input
                      type="text"
                      id="eventCategory"
                      name="category"
                      className="form-control"
                      placeholder="e.g. Product Launch / Retreat / OPD"
                      value={eventForm.category || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="eventDateDisplay">Display Schedule / Date Text *</label>
                    <input
                      type="text"
                      id="eventDateDisplay"
                      name="dateDisplay"
                      className="form-control"
                      placeholder="e.g. Available Now / Every Saturday / OCT 18 - 24, 2026"
                      value={eventForm.dateDisplay || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="eventTime">Timings / Duration</label>
                    <input
                      type="text"
                      id="eventTime"
                      name="time"
                      className="form-control"
                      placeholder="e.g. 10:00 AM – 4:00 PM / 7 Days"
                      value={eventForm.time || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="eventLocation">Location / Delivery Center</label>
                    <input
                      type="text"
                      id="eventLocation"
                      name="location"
                      className="form-control"
                      placeholder="e.g. Sparsha Apothecary / Bangalore Clinic"
                      value={eventForm.location || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="eventPrice">Price / Fee (Optional)</label>
                    <input
                      type="text"
                      id="eventPrice"
                      name="price"
                      className="form-control"
                      placeholder="e.g. ₹549 / ₹600 / Free Entry"
                      value={eventForm.price || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="eventActionText">WhatsApp Button Text</label>
                    <input
                      type="text"
                      id="eventActionText"
                      name="actionText"
                      className="form-control"
                      placeholder="e.g. Order via WhatsApp / Book OPD Slot"
                      value={eventForm.actionText || 'Inquire via WhatsApp'}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="eventSlots">Capacity / Slots (Optional)</label>
                    <input
                      type="number"
                      id="eventSlots"
                      name="slotsAvailable"
                      className="form-control"
                      placeholder="e.g. 10"
                      value={eventForm.slotsAvailable || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Banner Image Selection (Device Upload or URL - Optional) */}
                <div className="form-group" style={{ marginBottom: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <label className="form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ImageIcon size={16} color="var(--color-primary)" />
                      <span>Banner Image</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-leaf)', background: 'rgba(56, 102, 65, 0.08)', padding: '2px 8px', borderRadius: '12px' }}>
                        Optional
                      </span>
                    </label>

                    {/* Mode switcher: Upload from Device vs Image URL */}
                    <div style={{ display: 'inline-flex', background: '#f1f5f3', borderRadius: '8px', padding: '3px', border: '1px solid var(--color-border)' }}>
                      <button
                        type="button"
                        onClick={() => setImageInputMode('upload')}
                        style={{
                          background: imageInputMode === 'upload' ? '#ffffff' : 'transparent',
                          color: imageInputMode === 'upload' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '5px 12px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          boxShadow: imageInputMode === 'upload' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Upload size={13} />
                        <span>Upload from Device</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageInputMode('url')}
                        style={{
                          background: imageInputMode === 'url' ? '#ffffff' : 'transparent',
                          color: imageInputMode === 'url' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '5px 12px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          boxShadow: imageInputMode === 'url' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Link2 size={13} />
                        <span>Web Image URL</span>
                      </button>
                    </div>
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />

                  {imageInputMode === 'upload' ? (
                    <div>
                      {eventForm.image ? (
                        /* Image Uploaded Preview Card */
                        <div
                          style={{
                            border: '1px solid #cce3d2',
                            background: '#f4f9f5',
                            borderRadius: 'var(--radius-md)',
                            padding: '14px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                            flexWrap: 'wrap'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '220px' }}>
                            <div
                              style={{
                                width: '84px',
                                height: '60px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                border: '1px solid var(--color-border)',
                                background: '#f0f0f0',
                                flexShrink: 0
                              }}
                            >
                              <img
                                src={eventForm.image}
                                alt="Banner preview"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = '/images/digestive_balance.jpg';
                                }}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-leaf)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  <CheckCircle2 size={13} /> Image Attached
                                </span>
                              </div>
                              <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--color-text-main)', maxWidth: '280px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                {uploadedFileInfo?.name || 'Selected Banner Image'}
                              </div>
                              {uploadedFileInfo?.size && (
                                <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
                                  Optimized: {uploadedFileInfo.size}
                                </div>
                              )}
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="btn btn-outline"
                              style={{ padding: '6px 14px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                            >
                              <Upload size={14} /> Change Image
                            </button>
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="btn"
                              title="Remove Image (Keep Announcement Text-Only)"
                              style={{
                                background: '#fee2e2',
                                color: '#991b1b',
                                border: '1px solid #fecaca',
                                padding: '6px 12px',
                                fontSize: '0.82rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Upload Dropzone (Empty State) */
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          style={{
                            border: isDraggingImage ? '2px dashed var(--color-primary)' : '2px dashed #cbd5e1',
                            background: isDraggingImage ? '#f3e8ff' : '#fcfdfc',
                            borderRadius: 'var(--radius-md)',
                            padding: '24px 20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div
                            style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '50%',
                              background: 'var(--color-sage-mist)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--color-primary)',
                              marginBottom: '8px'
                            }}
                          >
                            <Upload size={20} />
                          </div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '4px' }}>
                            Click to browse or drag & drop an image from your device
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                            Supports PNG, JPG, JPEG, or WEBP • Auto-compressed • Optional
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Web Image URL Mode */
                    <div>
                      <input
                        type="text"
                        id="eventImage"
                        name="image"
                        className="form-control"
                        placeholder="e.g. /images/digestive_balance.jpg or https://images.unsplash.com/..."
                        value={eventForm.image || ''}
                        onChange={handleInputChange}
                      />
                      {eventForm.image && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', padding: '8px 12px', background: '#f8faf9', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                              src={eventForm.image}
                              alt="URL preview"
                              style={{ width: '40px', height: '30px', objectFit: 'cover', borderRadius: '4px' }}
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Previewing URL image</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="btn"
                            style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '4px 10px', fontSize: '0.76rem' }}
                          >
                            Clear
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="eventDesc">Detailed Description (Shown in "View Details" popup)</label>
                  <textarea
                    id="eventDesc"
                    name="description"
                    className="form-control"
                    rows="3"
                    placeholder="Outline product benefits, doctor guidance, retreat schedules, or clinic instructions..."
                    value={eventForm.description || ''}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Priority Pinning Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', background: '#f8faf9', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <input
                    type="checkbox"
                    id="isPinned"
                    name="isPinned"
                    checked={!!eventForm.isPinned}
                    onChange={handleInputChange}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="isPinned" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Pin size={14} color="var(--color-leaf)" />
                    <span>Pin to Top of Notice Board (High Priority)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
                >
                  {isEditing ? 'Save & Update Notice on Home Page' : 'Publish Notice to Home Page Board'}
                </button>
              </form>
            </div>

            {/* Right: Live Notices & Announcements List */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="live-pulse-dot" />
                  <span>Live on Notice Board ({events.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Reset Defaults
                </button>
              </div>

              <div className="admin-notices-list">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className={`admin-notice-item ${evt.isPinned ? 'is-pinned' : ''}`}
                  >
                    {evt.image && (
                      <div className="admin-notice-thumb">
                        <img
                          src={evt.image}
                          alt={evt.title}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/digestive_balance.jpg';
                          }}
                        />
                      </div>
                    )}

                    <div className="admin-notice-content">
                      <div className="admin-notice-header">
                        <span className={`admin-notice-badge badge-${evt.type || 'product'}`}>
                          {evt.badge || evt.category}
                        </span>

                        {evt.isPinned && (
                          <span className="admin-notice-pinned-tag">
                            <Pin size={11} /> Pinned
                          </span>
                        )}
                      </div>

                      <h4 className="admin-notice-title">
                        {evt.title}
                      </h4>

                      {evt.summary && (
                        <p className="admin-notice-summary">
                          {evt.summary}
                        </p>
                      )}

                      <div className="admin-notice-schedule">
                        📅 {evt.dateDisplay || evt.date} {evt.time ? `• ⏰ ${evt.time}` : ''}
                      </div>

                      <div className="admin-notice-meta">
                        {evt.location && <span>📍 {evt.location.split(',')[0]}</span>}
                        {evt.price && <span className="meta-price">💰 {evt.price}</span>}
                      </div>

                      {/* Action buttons */}
                      <div className="admin-notice-actions">
                        <button
                          type="button"
                          className="admin-action-btn btn-pin"
                          onClick={() => handleTogglePin(evt.id)}
                        >
                          <Pin size={12} />
                          <span className="btn-text-full">{evt.isPinned ? 'Unpin' : 'Pin to Top'}</span>
                          <span className="btn-text-short">{evt.isPinned ? 'Unpin' : 'Pin'}</span>
                        </button>

                        <button
                          type="button"
                          className="admin-action-btn btn-edit"
                          onClick={() => handleStartEdit(evt)}
                        >
                          <Edit3 size={12} />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          className="admin-action-btn btn-delete"
                          onClick={() => handleDeleteEvent(evt.id)}
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES LOG */}
        {activeTab === 'inquiries' && (
          <div className="admin-card-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Client Service & Diet Inquiries Log ({inquiries.length})</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', margin: '4px 0 0 0' }}>
                  Live record of appointment bookings and personalized diet chart consultation inquiries.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={loadRecentLogs}
                  disabled={isSyncingInquiries}
                  className="btn"
                  style={{
                    background: '#f0fdf4',
                    color: '#166534',
                    border: '1px solid #bbf7d0',
                    padding: '6px 14px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <RefreshCw size={13} className={isSyncingInquiries ? 'animate-spin' : ''} />
                  <span>{isSyncingInquiries ? 'Syncing...' : 'Refresh Live Log'}</span>
                </button>

                {inquiries.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearInquiries}
                    className="btn"
                    style={{
                      background: '#fee2e2',
                      color: '#991b1b',
                      border: '1px solid #fecaca',
                      padding: '6px 14px',
                      fontSize: '0.82rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={13} />
                    <span>Clear All Log</span>
                  </button>
                )}
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
                No inquiries recorded yet. Submit a form on the Diet Charts or Appointment page to test!
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-bg-alt)', borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                      <th style={{ padding: '12px' }}>ID & Date</th>
                      <th style={{ padding: '12px' }}>Patient</th>
                      <th style={{ padding: '12px' }}>Contact</th>
                      <th style={{ padding: '12px' }}>Service / Goal</th>
                      <th style={{ padding: '12px' }}>Notes / Symptoms</th>
                      <th style={{ padding: '12px' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => {
                      const waReplyText = `Hello ${inq.name},\nGreetings from Sparsha Healthcare Group. We have received your consultation enquiry regarding "${inq.service || inq.healthGoal || 'Diet Chart'}". Our clinical team has reviewed your details and we are glad to assist you.`;
                      const patientWaUrl = inq.mobile ? buildWhatsAppUrl(waReplyText, inq.mobile) : null;
                      const formattedTime = inq.createdAt ? new Date(inq.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : 'Recent';

                      return (
                        <tr key={inq.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '12px' }}>
                            <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{inq.id}</div>
                            <small style={{ color: 'var(--color-text-muted)' }}>{formattedTime}</small>
                          </td>
                          <td style={{ padding: '12px', fontWeight: 600 }}>
                            {inq.name}
                            {inq.center && <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>📍 {inq.center}</div>}
                          </td>
                          <td style={{ padding: '12px' }}>
                            <div style={{ fontWeight: 600 }}>{inq.mobile}</div>
                            <small style={{ color: 'var(--color-text-muted)' }}>{inq.email}</small>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <strong>{inq.service || inq.healthGoal}</strong>
                            {inq.dietPreference && (
                              <div style={{ fontSize: '0.78rem', color: 'var(--color-leaf)' }}>
                                Pref: {inq.dietPreference}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '12px', maxWidth: '220px' }}>
                            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-main)', whiteSpace: 'pre-wrap', maxHeight: '70px', overflowY: 'auto' }}>
                              {inq.notes || inq.message || 'No extra notes provided'}
                            </div>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              background: inq.status?.includes('WhatsApp') ? '#dcfce7' : '#e0f2fe',
                              color: inq.status?.includes('WhatsApp') ? '#166534' : '#0369a1',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              display: 'inline-block'
                            }}>
                              {inq.status || 'Saved to Admin'}
                            </span>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                              {patientWaUrl && (
                                <a
                                  href={patientWaUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn"
                                  title="Chat with Patient on WhatsApp"
                                  style={{
                                    background: '#25D366',
                                    color: '#ffffff',
                                    padding: '5px 10px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    borderRadius: '4px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    textDecoration: 'none'
                                  }}
                                >
                                  <MessageCircle size={13} />
                                  <span>WhatsApp</span>
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="btn"
                                title="Remove Inquiry"
                                style={{
                                  background: '#fee2e2',
                                  color: '#991b1b',
                                  padding: '5px 8px',
                                  fontSize: '0.78rem',
                                  border: '1px solid #fecaca',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ORDERS LOG */}
        {activeTab === 'orders' && (
          <div className="admin-card-box">
            <h3 style={{ marginBottom: '16px' }}>Dispensary Product Orders Log</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Shows product checkout submissions dispatched to WhatsApp.
            </p>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
                No product orders recorded in this session. Try checking out an item in the Shop!
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-bg-alt)', borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                      <th style={{ padding: '12px' }}>Order ID</th>
                      <th style={{ padding: '12px' }}>Customer</th>
                      <th style={{ padding: '12px' }}>Destination</th>
                      <th style={{ padding: '12px' }}>Items</th>
                      <th style={{ padding: '12px' }}>Courier</th>
                      <th style={{ padding: '12px' }}>Total Amount</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord) => (
                      <tr key={ord.orderId} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '12px', fontWeight: 600 }}>{ord.orderId}</td>
                        <td style={{ padding: '12px' }}>{ord.customer?.fullName}<br /><small>{ord.customer?.phone}</small></td>
                        <td style={{ padding: '12px' }}>{ord.customer?.city} ({ord.customer?.pincode})</td>
                        <td style={{ padding: '12px' }}>
                          {ord.items?.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                            ₹{ord.courierCharge || 100}
                          </div>
                          <small style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                            {ord.courierOption || 'Standard (1 Box)'}
                          </small>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.95rem' }}>
                            ₹{ord.total}
                          </div>
                          {ord.subtotal && ord.subtotal !== ord.total && (
                            <small style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                              (Subtotal: ₹{ord.subtotal})
                            </small>
                          )}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ background: '#f0fdf4', color: '#166534', padding: '3px 8px', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 600 }}>
                            {ord.status || 'WhatsApp Dispatched'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
