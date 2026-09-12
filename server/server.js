import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

// Appointment booking endpoint (demo mock)
app.post('/api/appointments', (req, res) => {
  const { name, phone, email, center, service, date, time, message } = req.body;
  res.json({
    success: true,
    message: 'Your appointment request has been recorded for this demo. Our team will contact you regarding availability.',
    appointmentId: 'APT-' + Math.floor(100000 + Math.random() * 900000),
    data: { name, phone, email, center, service, date, time, message }
  });
});

// Orders endpoint (demo mock)
app.post('/api/orders', (req, res) => {
  const { customer, items, total, paymentMethod } = req.body;
  const orderId = `SP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  res.json({
    success: true,
    orderId,
    status: 'Order Placed Successfully',
    message: 'Thank you for choosing Sparsha.',
    order: {
      orderId,
      customer,
      items,
      total,
      paymentMethod,
      date: new Date().toISOString()
    }
  });
});

app.listen(PORT, () => {
  console.log(`[Sparsha Healthcare Backend] Running smoothly on port ${PORT}`);
});
