// Default Upcoming Events, Product Launches & Live Notices for Sparsha Healthcare Group
export const DEFAULT_EVENTS = [
  {
    id: 'evt-dia-sparsh-launch',
    type: 'product',
    badge: '100% HERBAL • LIMITED OFFER',
    category: 'Product Launch',
    title: 'Dr. Sarja’s Dia-Sparsh Herbal Powder (Formerly Jayla)',
    summary: 'Clinically crafted 100% herbal formula recommended for Diabetes, Hypertension & Obesity.',
    date: '2026-09-15',
    dateDisplay: 'Available Now',
    time: 'Pan-India Express Dispatch',
    location: 'Sparsha Apothecary & Online Dispatch',
    price: '₹699 (200g)',
    image: '/images/dia_sparsh.png',
    description: 'Dr. Sarja’s acclaimed 100% herbal formula specially created for metabolic balance and a disease-free life. Recommended for individuals managing Diabetes, Hypertension, and Obesity. Zero added sugars, colours, or preservatives.',
    actionText: 'Order via WhatsApp',
    isPinned: true,
    isFeatured: true
  },
  {
    id: 'evt-limcocool-launch',
    type: 'product',
    badge: 'NEW PRODUCT LAUNCH',
    category: 'Product Launch',
    title: 'Dr. Sarja’s LimCoCool: Tangy Masala Refresh & Recharge',
    summary: 'Instant pre-mix juice powder with Vitamin C Lemon, Coconut Hydration & Digestive Masala.',
    date: '2026-09-15',
    dateDisplay: 'Available Now',
    time: 'Pan-India Express Dispatch',
    location: 'Sparsha Apothecary & Online Dispatch',
    price: '₹349 (200g Jar)',
    image: '/images/limcocool.jpg',
    description: 'Refresh and recharge your wellness with LimCoCool pre-mix juice powder. Combines natural lemon Vitamin C boost, pure coconut hydration, and digestive masala herbs for daily zest and comfort.',
    actionText: 'Order via WhatsApp',
    isPinned: true,
    isFeatured: true
  },
  {
    id: 'evt-product-launch-rasayana',
    type: 'product',
    badge: 'AYURVEDIC RASAYANA',
    category: 'Product Launch',
    title: 'Triphala Gold Rasayana & Gut Revitalizer',
    summary: 'Fresh micro-batch with wild-harvested Amla & Western Ghats raw bee honey.',
    date: '2026-09-12',
    dateDisplay: 'Available Now',
    time: 'Pan-India Delivery',
    location: 'Sparsha Apothecary & Online Dispatch',
    price: '₹549 (250g Glass Jar)',
    image: '/images/digestive_balance.jpg',
    description: 'Our newest clinical herbal formulation: Triphala Gold Rasayana. Cold-compounded with wild-harvested Triphala, organic dry ginger, and natural rock-bee honey from the Western Ghats. Clears accumulated Ama, restores digestive Agni, and supports gentle daily regularity.',
    actionText: 'Order via WhatsApp',
    isPinned: false,
    isFeatured: true
  },
  {
    id: 'evt-opd-specialist',
    type: 'opd',
    badge: 'OPD NOTICE',
    category: 'Doctor OPD Schedule',
    title: 'Visiting Vaidya OPD: Spine, Joint & Metabolic Disorders',
    summary: 'Senior Ayurvedic Vaidyas available for in-person Nadi Pariksha & consultation.',
    date: '2026-09-20',
    dateDisplay: 'Every Saturday & Sunday',
    time: '10:00 AM – 4:00 PM',
    location: 'Sparsha Multi-Specialty Clinic, Outer Ring Road, Bangalore',
    image: '/images/ayurveda_shirodhara.jpg',
    description: 'Exclusive outpatient consultation camp focusing on sciatica, chronic slip disc, cervical spondylosis, and metabolic health. Comprehensive Nadi Pariksha (pulse reading) and customized treatment charting included.',
    actionText: 'Book OPD Slot',
    isPinned: true,
    isFeatured: true
  },
  {
    id: 'evt-panchakarma-autumn',
    type: 'retreat',
    badge: 'DETOX RETREAT',
    category: 'Detox Retreat',
    title: 'Autumn Panchakarma & Seasonal Detox Retreat',
    summary: '7-day residential bio-purification amidst pristine coffee hills.',
    date: '2026-10-18',
    dateDisplay: 'OCT 18 - 24, 2026',
    time: '7-Day Residential Immersion',
    location: 'Sparsha Wellness Resort, Chikkolale, Chikmagalur',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    description: 'A classical 7-day purification journey under senior Ayurvedic Vaidyas. Includes customized herbal therapies, organic Satvic meals, daily sunrise yoga, and silent meditation.',
    slotsAvailable: 8,
    actionText: 'Register for Retreat',
    isPinned: false,
    isFeatured: true
  },
  {
    id: 'evt-forest-mindfulness',
    type: 'retreat',
    badge: 'NATURE THERAPY',
    category: 'Nature Therapy',
    title: 'Western Ghats Forest Bathing & Mindfulness Weekend',
    summary: 'Shinrin-yoku forest immersion and circadian nervous system reset.',
    date: '2026-11-06',
    dateDisplay: 'NOV 06 - 08, 2026',
    time: 'Friday 4:00 PM – Sunday 2:00 PM',
    location: 'Chikkolale Sanctuary, Western Ghats Foothills',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    description: 'Guided Shinrin-yoku (forest immersion) and mindful breathing along coffee estate trails. Disconnect from digital overwhelm and restore nervous system equilibrium.',
    slotsAvailable: 12,
    actionText: 'Reserve Immersion',
    isPinned: false,
    isFeatured: true
  },
  {
    id: 'evt-gut-health-masterclass',
    type: 'workshop',
    badge: 'WORKSHOP',
    category: 'Interactive Workshop',
    title: 'Ayurvedic Gut Health & Satvic Nutrition Masterclass',
    summary: 'Hands-on workshop on Agni rekindling, therapeutic khichdi, and Prakriti balancing.',
    date: '2026-11-21',
    dateDisplay: 'NOV 21, 2026',
    time: '10:00 AM – 2:00 PM',
    location: 'Sparsha Multicare Center, Outer Ring Road, Bangalore',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80',
    description: 'Hands-on workshop on balancing Agni (digestive fire), cooking therapeutic herbal khichdi, and understanding your individual Prakriti with our nutrition specialists.',
    slotsAvailable: 18,
    actionText: 'Register for Masterclass',
    isPinned: false,
    isFeatured: true
  }
];


const STORAGE_KEY = 'sparsha_upcoming_events';

function sanitizeEvents(list) {
  if (!Array.isArray(list)) return list;
  return list.map(item => {
    let img = item.image;
    if (img === '/images/digestive_tea.jpg' || (!img && item.id === 'evt-product-launch-rasayana')) {
      img = '/images/digestive_balance.jpg';
    }
    return {
      ...item,
      image: img
    };
  });
}

/**
 * Get all events (from server or localStorage fallback)
 */
export async function getEvents() {
  try {
    const res = await fetch('/api/events');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const sanitized = sanitizeEvents(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
        return sanitized;
      }
    }
  } catch (err) {
    // offline or static preview fallback
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const sanitized = sanitizeEvents(parsed);
        if (JSON.stringify(sanitized) !== stored) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
        }
        return sanitized;
      }
    } catch (e) {
      // fallback
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EVENTS));
  return DEFAULT_EVENTS;
}

/**
 * Save events to localStorage and sync with server
 */
export async function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  try {
    await fetch('/api/events', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(events)
    }).catch(() => {});
  } catch (err) {}
}
