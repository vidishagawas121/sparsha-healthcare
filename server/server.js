import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Lightweight mock data
const mockProducts = [
  {
    id: 'shustha-digestive-balance',
    name: 'Shustha Digestive Balance',
    category: 'Digestive',
    price: 499,
    rating: 4.8,
    reviewsCount: 42,
    shortDescription: 'Classical Triphala & Sunthi formulation supporting gentle gut cleansing and Agni balance.',
    image: '/images/digestive_balance.jpg',
    description: 'A traditional herbal blend incorporating Triphala, Ginger, and Licorice to gently support natural gastrointestinal harmony and optimal digestive vitality.',
    ingredients: 'Amla (Phyllanthus emblica), Haritaki (Terminalia chebula), Bibhitaki (Terminalia bellirica), Shunthi (Zingiber officinale), Yashtimadhu (Glycyrrhiza glabra).',
    usage: 'Mix 1 teaspoon with warm water in the evening after meals, or as recommended by your wellness advisor.'
  },
  {
    id: 'shustha-herbal-wellness',
    name: 'Shustha Herbal Wellness Blend',
    category: 'Wellness',
    price: 599,
    rating: 4.9,
    reviewsCount: 58,
    shortDescription: 'Synergistic Ayurvedic adaptogenic herbs crafted to nourish Ojas and daily equilibrium.',
    image: '/images/herbal_wellness.jpg',
    description: 'A daily restorative blend of adaptogenic herbs designed to nurture vitality, calm the nervous system, and reinforce your natural biological rhythm.',
    ingredients: 'Ashwagandha (Withania somnifera), Shatavari (Asparagus racemosus), Tulsi (Ocimum sanctum), Cardamom (Elettaria cardamomum).',
    usage: 'Take 1 capsule twice daily with milk or warm water, ideally after breakfast and dinner.'
  },
  {
    id: 'shustha-joint-care',
    name: 'Shustha Joint Care',
    category: 'Herbal',
    price: 649,
    rating: 4.7,
    reviewsCount: 39,
    shortDescription: 'Classical Boswellia, Guggulu, and Curcumin extract nurturing joint flexibility and ease.',
    image: '/images/joint_care.jpg',
    description: 'Crafted with Boswellia and Turmeric extracts to nourish joint tissues, soothe physical discomfort from active movement, and maintain flexibility.',
    ingredients: 'Shallaki (Boswellia serrata), Haridra (Curcuma longa), Guggulu (Commiphora mukul), Rasna (Pluchea lanceolata).',
    usage: '1 tablet twice daily with meals or warm water.'
  },
  {
    id: 'shustha-daily-vitality',
    name: 'Shustha Daily Vitality',
    category: 'Lifestyle',
    price: 549,
    rating: 4.9,
    reviewsCount: 64,
    shortDescription: 'Lush green phytonutrient blend empowering cellular resilience, mental Medha, and stamina.',
    image: '/images/daily_vitality.jpg',
    description: 'Formulated with forest botanicals and cold-pressed bio-extracts to combat midday fatigue, improve focus, and promote cellular rejuvenation.',
    ingredients: 'Moringa (Moringa oleifera), Brahmi (Bacopa monnieri), Shilajit (Purified asphaltum), Giloy (Tinospora cordifolia).',
    usage: 'Take 1 serving with your morning smoothie, juice, or warm water.'
  },
  {
    id: 'shustha-herbal-support',
    name: 'Shustha Herbal Support',
    category: 'Herbal',
    price: 479,
    rating: 4.6,
    reviewsCount: 31,
    shortDescription: 'Seasonal respiratory and wellness support with sacred basil and immune herbs.',
    image: '/images/herbal_support.jpg',
    description: 'A comforting herbal formula designed to support clear breathing, soothe irritated airways, and protect seasonal wellness naturally.',
    ingredients: 'Tulsi Krishna, Vasa (Adhatoda vasica), Pippali (Piper longum), Kantakari (Solanum surattense).',
    usage: 'Add 1/2 teaspoon to steaming water or consume with raw honey once or twice daily.'
  },
  {
    id: 'shustha-wellness-blend',
    name: 'Shustha Serenity Herbal Tea',
    category: 'Wellness',
    price: 429,
    rating: 4.8,
    reviewsCount: 47,
    shortDescription: 'A calming evening infusion promoting peaceful slumber and stress release.',
    image: '/images/serenity_tea.jpg',
    description: 'Whole leaf therapeutic herbal infusion sourced from pesticide-free micro-farms in the Western Ghats to unwind tension and encourage restorative sleep.',
    ingredients: 'Chamomile flowers, Shankhpushpi (Convolvulus pluricaulis), Lemongrass, Brahmi, Spearmint.',
    usage: 'Steep 1 tea bag or 1 teaspoon in boiling water for 4-5 minutes before sleep.'
  },
  {
    id: 'dr-sarja-limcocool',
    name: 'Dr. Sarja’s LimCoCool Pre-mix Juice Powder',
    category: 'Digestive',
    price: 349,
    rating: 4.9,
    reviewsCount: 56,
    shortDescription: 'Refreshing Ayurvedic pre-mix juice powder with zesty lemon, natural coconut hydration, and digestive masala herbs.',
    image: '/images/limcocool.jpg',
    description: 'Dr. Sarja’s LimCoCool is your daily dose of natural zest and comfort. A refreshing instant pre-mix juice powder combining the immune-boosting power of Vitamin C from zesty lemons, deep hydration from coconut water solids, and a classical digestive masala blend.',
    ingredients: 'Natural Lemon Extract (Citrus limon), Coconut Water Solids (Cocos nucifera), Shunthi (Zingiber officinale), Maricha / Black Pepper (Piper nigrum), Jeeraka (Cuminum cyminum), Saindhava Lavana (Himalayan Rock Salt), Mint (Mentha spicata).',
    usage: 'Mix 1 to 2 tablespoons in a glass (200ml) of chilled or ambient water, stir well and consume.'
  },
  {
    id: 'dr-sarja-dia-sparsh',
    name: 'Dr. Sarja’s Dia-Sparsh Herbal Powder',
    category: 'Herbal',
    price: 699,
    rating: 5.0,
    reviewsCount: 84,
    shortDescription: '100% pure herbal formulation specially designed for healthy disease-free life, supporting diabetes, hypertension & obesity care.',
    image: '/images/dia_sparsh.png',
    description: 'Dia-Sparsh (formerly Jayla) is Dr. Sarja’s acclaimed 100% herbal formula specially created for metabolic balance and a disease-free life. Widely recommended for individuals managing Diabetes, Hypertension, and Metabolic Obesity.',
    ingredients: 'Meshashringi / Gurmar (Gymnema sylvestre), Jamun Seed (Syzygium cumini), Karela / Bitter Gourd (Momordica charantia), Haridra / Curcumin (Curcuma longa), Vijaysar (Pterocarpus marsupium), Methi (Trigonella foenum-graecum), Guduchi (Tinospora cordifolia).',
    usage: 'Mix 1 teaspoon (approx. 3-5g) with warm water or buttermilk twice daily, 30 minutes before meals.'
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'Sparsha Healthcare Group',
    tagline: 'Holistic Wellness Through Nature, Science & Expert Care',
    timestamp: new Date().toISOString()
  });
});

// Products
app.get('/api/products', (req, res) => {
  res.json(mockProducts);
});

app.get('/api/products/:id', (req, res) => {
  const product = mockProducts.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// In-memory events store
let mockEvents = [
  {
    id: 'evt-panchakarma-autumn',
    title: 'Autumn Panchakarma & Seasonal Detox Retreat',
    date: '2026-10-18',
    dateDisplay: 'OCT 18 - 24, 2026',
    time: '7-Day Residential Immersion',
    location: 'Sparsha Wellness Resort, Chikkolale, Chikmagalur',
    category: 'Detox Retreat',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    description: 'A classical 7-day purification journey under senior Ayurvedic Vaidyas. Includes customized herbal therapies, organic Satvic meals, daily sunrise yoga, and silent meditation.',
    slotsAvailable: 8,
    isFeatured: true
  },
  {
    id: 'evt-forest-mindfulness',
    title: 'Western Ghats Forest Bathing & Mindfulness Weekend',
    date: '2026-11-06',
    dateDisplay: 'NOV 06 - 08, 2026',
    time: 'Friday 4:00 PM – Sunday 2:00 PM',
    location: 'Chikkolale Sanctuary, Western Ghats Foothills',
    category: 'Nature Therapy',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    description: 'Guided Shinrin-yoku (forest immersion) and mindful breathing along coffee estate trails. Disconnect from digital overwhelm and restore nervous system equilibrium.',
    slotsAvailable: 12,
    isFeatured: true
  },
  {
    id: 'evt-gut-health-masterclass',
    title: 'Ayurvedic Gut Health & Satvic Nutrition Masterclass',
    date: '2026-11-21',
    dateDisplay: 'NOV 21, 2026',
    time: '10:00 AM – 2:00 PM',
    location: 'Sparsha Multicare Center, Outer Ring Road, Bangalore',
    category: 'Interactive Workshop',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80',
    description: 'Hands-on workshop on balancing Agni (digestive fire), cooking therapeutic herbal khichdi, and understanding your individual Prakriti with our nutrition specialists.',
    slotsAvailable: 18,
    isFeatured: true
  }
];

let mockAppointments = [];
let mockOrders = [];

// Admin authentication endpoint
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  // Demo admin credentials
  if (email === 'admin@sparshahealth.com' && password === 'sparsha2026') {
    return res.json({
      success: true,
      token: 'admin-sparsha-token-' + Date.now(),
      admin: {
        name: 'Sparsha Medical Administrator',
        email: 'admin@sparshahealth.com',
        role: 'SuperAdmin'
      }
    });
  }
  return res.status(401).json({ error: 'Invalid admin credentials. Use admin@sparshahealth.com / sparsha2026' });
});

// Events Endpoints
app.get('/api/events', (req, res) => {
  res.json(mockEvents);
});

app.post('/api/events', (req, res) => {
  const newEvent = {
    id: req.body.id || `evt-${Date.now()}`,
    title: req.body.title || 'Untitled Event',
    date: req.body.date || new Date().toISOString().split('T')[0],
    dateDisplay: req.body.dateDisplay || req.body.date,
    time: req.body.time || '10:00 AM - 1:00 PM',
    location: req.body.location || 'Sparsha Wellness Resort, Chikmagalur',
    category: req.body.category || 'Wellness Event',
    image: req.body.image || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    description: req.body.description || '',
    slotsAvailable: req.body.slotsAvailable ? parseInt(req.body.slotsAvailable) : 10,
    isFeatured: req.body.isFeatured !== false
  };
  mockEvents.unshift(newEvent);
  res.status(201).json(newEvent);
});

app.put('/api/events/:id', (req, res) => {
  const index = mockEvents.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  mockEvents[index] = { ...mockEvents[index], ...req.body };
  res.json(mockEvents[index]);
});

app.put('/api/events', (req, res) => {
  if (Array.isArray(req.body)) {
    mockEvents = req.body;
    return res.json(mockEvents);
  }
  res.status(400).json({ error: 'Array expected' });
});

app.delete('/api/events/:id', (req, res) => {
  const index = mockEvents.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  const deleted = mockEvents.splice(index, 1);
  res.json({ success: true, deleted: deleted[0] });
});

// Appointment booking & WhatsApp inquiry endpoint
const handleInquiryPost = (req, res) => {
  const { name, mobile, email, center, service, preferredDate, preferredTime, message } = req.body;
  const newAppointment = {
    id: req.body.id || ('APT-' + Math.floor(100000 + Math.random() * 900000)),
    name,
    mobile,
    email,
    center,
    service: service || 'General Enquiry',
    preferredDate,
    preferredTime,
    message,
    status: req.body.status || 'Forwarded to WhatsApp',
    createdAt: req.body.createdAt || new Date().toISOString()
  };
  mockAppointments.unshift(newAppointment);
  res.json({
    success: true,
    message: 'Your service request has been formatted for WhatsApp dispatch.',
    appointmentId: newAppointment.id,
    data: newAppointment
  });
};

app.post('/api/appointments', handleInquiryPost);
app.post('/api/inquiries', handleInquiryPost);

app.get(['/api/appointments', '/api/inquiries'], (req, res) => {
  res.json(mockAppointments);
});

// Orders endpoint (WhatsApp order dispatch)
app.post('/api/orders', (req, res) => {
  const { customer, items, subtotal, courierCharge, courierOption, total, paymentMethod } = req.body;
  const orderId = `SP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder = {
    orderId,
    customer,
    items,
    subtotal: subtotal || total,
    courierCharge: courierCharge || 100,
    courierOption: courierOption || 'Standard Courier (1 Box)',
    total: total || ((subtotal || 0) + (courierCharge || 100)),
    paymentMethod: paymentMethod || 'WhatsApp Direct Dispatch',
    status: 'WhatsApp Dispatched',
    date: new Date().toISOString()
  };
  mockOrders.unshift(newOrder);
  res.json({
    success: true,
    orderId,
    status: 'Order Dispatched to WhatsApp',
    message: 'Order formatted and launched via WhatsApp for immediate confirmation.',
    order: newOrder
  });
});

app.get('/api/orders', (req, res) => {
  res.json(mockOrders);
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[Sparsha Healthcare Backend] Running smoothly on port ${PORT}`);
  });
}

export default app;
