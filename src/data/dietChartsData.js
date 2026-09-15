// Clinical & Therapeutic Diet Charts - Sparsha Healthcare Group
export const DIET_CHARTS = [
  {
    id: 'hormonal-menstrual-harmony',
    title: 'Hormonal Balance & Menstrual Wellness Diet Chart',
    category: "Women's Health",
    icon: '🌸',
    targetConditions: 'Irregular cycles, PMS, Dysmenorrhea (painful periods), PCOS, Endometriosis support, Perimenopausal shifts',
    description: 'Designed to modulate estrogen clearance, nourish ovarian tissue, alleviate pelvic inflammation, and stabilize insulin spikes that disrupt ovulation.',
    schedule: [
      {
        time: '06:30 AM',
        title: 'Awakening Uterine Elixir',
        meal: '1 cup warm water with soaked methi (fenugreek) seeds or 1 tsp organic Amla juice + pinch of turmeric.',
        benefit: 'Alkalinizes digestive tract and supports hepatic phase-1 estrogen breakdown.'
      },
      {
        time: '08:30 AM',
        title: 'Nutritious Low-Glycemic Breakfast',
        meal: 'Sprouted ragi (finger millet) porridge with almond milk, pinch of cardamom, OR steamed vegetable idlis with fresh coriander-mint chutney + 1 tbsp roasted pumpkin & flax seeds.',
        benefit: 'Sustained complex carbohydrates and seed cycling lignans to balance follicular phase hormones.'
      },
      {
        time: '11:30 AM',
        title: 'Mid-Morning Hydration & Blood Nourishment',
        meal: '1 glass tender coconut water OR fresh pomegranate juice with 4 soaked almonds & 2 soaked black raisins.',
        benefit: 'Replenishes iron, bio-available electrolytes, and nourishes Rakta Dhatu (blood tissue).'
      },
      {
        time: '01:30 PM',
        title: 'Balanced Healing Lunch (Largest Meal)',
        meal: 'Small bowl of red rice or foxtail millet, warm seasonal vegetable sambar (drumstick, bottle gourd, carrots), 1 cup cooked spinach or methi leaves stir-fried in cow ghee, and a small glass of cumin-spiced buttermilk (Takra).',
        benefit: 'Bioactive folate, digestible plant proteins, and probiotic microflora for gut hormone metabolism.'
      },
      {
        time: '05:00 PM',
        title: 'Hormone Soothing Evening Tea',
        meal: 'Warm fennel, coriander & cinnamon infusion + a handful of dry-roasted makhana (lotus seeds) or soaked walnuts.',
        benefit: 'Cinnamon stabilizes insulin sensitivity; fennel prevents evening fluid retention and cramps.'
      },
      {
        time: '07:30 PM',
        title: 'Light Easy-Digesting Dinner',
        meal: 'Moong dal and bottle gourd soup (khichdi consistency) tempered with cumin, ginger, and turmeric. Keep it warm and fresh. Consume at least 2.5 hours before sleep.',
        benefit: 'Prevents Ama (digestive toxicity) accumulation during the resting night hours.'
      },
      {
        time: '09:30 PM',
        title: 'Bedtime Restorative Elixir',
        meal: '1 small cup warm A2 cow milk or oat milk with pinch of nutmeg and Shatavari powder.',
        benefit: 'Nourishes Ojas and promotes restorative delta-wave sleep for nocturnal hormone synthesis.'
      }
    ],
    foodsToInclude: [
      { food: 'Sprouted millets & brown/red rice', reason: 'High in fiber; binds excess excreted estrogens in bowel.' },
      { food: 'Pumpkin, Flax, Sesame & Sunflower seeds', reason: 'Provides essential fatty acids and lignans for natural seed cycling.' },
      { food: 'Deep leafy greens (Drumstick leaves, Methi, Spinach)', reason: 'Rich in non-heme iron and magnesium to ease uterine cramps.' },
      { food: 'Pomegranate, Papaya (post-cycle), Figs, Raisins', reason: 'Nourishes blood tissue and stimulates natural cellular vitality.' },
      { food: 'Pure Cow Ghee (Ghrita)', reason: 'Lipid vehicle essential for steroid hormone synthesis.' }
    ],
    foodsToAvoid: [
      { food: 'Iced water & chilled carbonated beverages', reason: 'Constricts pelvic vasculature and aggravates Apana Vata spasms.' },
      { food: 'Refined white sugar, pastries & corn syrups', reason: 'Triggers insulin surges which stimulate ovarian androgen overproduction.' },
      { food: 'Deep-fried snacks & processed seed oils', reason: 'Promotes inflammatory PGE2 prostaglandins responsible for acute cramps.' },
      { food: 'Excessive caffeine (>1 coffee daily)', reason: 'Constricts blood vessels and depletes adrenal magnesium reserves.' }
    ],
    doctorNote: 'For best results, seed cycling (Days 1–14: Flax & Pumpkin; Days 15–28: Sesame & Sunflower) should be practiced consistently for at least three menstrual cycles alongside physician guidance.'
  },
  {
    id: 'digestive-reset-agni-kindling',
    title: 'Digestive Reset & Agni-Kindling Satvic Diet Chart',
    category: 'Digestive Wellness',
    icon: '🔥',
    targetConditions: 'Chronic acidity, IBS, Bloating, Sluggish metabolism, Constipation, GERD, Food sensitivities',
    description: 'A classical therapeutic regimen designed to rekindle gastric digestive fire (Jatharagni), eliminate cellular toxins (Ama), and heal the mucosal gut lining.',
    schedule: [
      {
        time: '06:30 AM',
        title: 'Deepana Morning Brew',
        meal: '1 mug warm water boiled with 1/2 tsp crushed cumin, 1/2 tsp coriander seeds, and a slice of fresh ginger.',
        benefit: 'Gently cleanses gastrointestinal lining without irritating sensitive stomach mucosa.'
      },
      {
        time: '08:30 AM',
        title: 'Warm Soothing Breakfast',
        meal: 'Warm rice kanji (congee) or broken wheat upma with stewed apples and a pinch of cinnamon. No raw or cold foods.',
        benefit: 'Easily digestible complex carbohydrates requiring minimal enzymatic strain.'
      },
      {
        time: '11:30 AM',
        title: 'Mid-Morning Digestive Tonic',
        meal: 'Freshly squeezed sweet lime (Mosambi) juice with rock salt (Saindhava Lavana) OR tender coconut water.',
        benefit: 'Pacifies stomach acid and replenishes cellular potassium.'
      },
      {
        time: '01:30 PM',
        title: 'Therapeutic Satvic Lunch',
        meal: 'Steamed Sona Masoori or Basmati rice, light yellow split moong dal cooked with cumin and hing (asafoetida), boiled ash gourd or ridge gourd sabzi, and freshly prepared spiced Takra (buttermilk).',
        benefit: 'Ideal ratio of carbohydrates, easily absorbed plant protein, and natural lactobacilli.'
      },
      {
        time: '05:00 PM',
        title: 'Digestive Herbal Infusion',
        meal: 'Warm herbal tea with crushed fennel and mint leaves + 4 soaked figs.',
        benefit: 'Relieves afternoon gas formation and supports regular peristalsis.'
      },
      {
        time: '07:30 PM',
        title: 'Light Healing Dinner',
        meal: 'Moong-rice therapeutic khichdi cooked in double water with pinch of ginger and 1 tsp cow ghee. Must finish before 8:00 PM.',
        benefit: 'Allows the digestive tract a complete 12-hour biological rest period.'
      },
      {
        time: '09:30 PM',
        title: 'Bedtime Gut Cleanser',
        meal: '1/2 tsp Shustha Triphala Churna steeped in 1 cup warm water.',
        benefit: 'Promotes morning complete evacuation and mucosal tonification.'
      }
    ],
    foodsToInclude: [
      { food: 'Split Yellow Moong Dal', reason: 'Lightest legume in Ayurveda, zero gas-producing oligosaccharides.' },
      { food: 'Ash Gourd (Kushmanda) & Bottle Gourd', reason: 'Alkaline, cooling, and heals inflamed gastric mucosal lining.' },
      { food: 'Spiced Buttermilk (Takra)', reason: 'Astringent, digestive and re-establishes healthy gut flora.' },
      { food: 'Fresh Ginger, Cumin, Hing, Fennel', reason: 'Natural carminatives that rekindle digestive enzyme secretion.' }
    ],
    foodsToAvoid: [
      { food: 'Raw salads at dinner', reason: 'Hard on digestion; creates fermentation and severe night bloating.' },
      { food: 'Leftovers & refrigerated foods', reason: 'High in Tamas and depleted of biological Prana (vital energy).' },
      { food: 'Spicy chili peppers & synthetic vinegar', reason: 'Erodes protective stomach lining and aggravates Pitta fire.' },
      { food: 'Heavy red meats & deep fried snacks', reason: 'Overwhelms enzymatic capacity and produces toxic Ama.' }
    ],
    doctorNote: 'Sip warm water throughout meals in small quantities, but avoid drinking large quantities of water immediately before or after food.'
  },
  {
    id: 'anti-inflammatory-joint-care',
    title: 'Anti-Inflammatory & Joint Flexibility Diet Chart',
    category: 'Musculoskeletal & Pain Care',
    icon: '🌿',
    targetConditions: 'Osteoarthritis, Rheumatoid stiffness, Cervical spondylosis, Sciatica, Gout, Chronic bodily inflammation',
    description: 'Combines bio-active curcuminoids, plant omega-3s, and sulfur-rich forest botanicals to soothe inflamed synovial membranes and nourish articular cartilage.',
    schedule: [
      {
        time: '06:30 AM',
        title: 'Anti-Inflammatory Golden Water',
        meal: '1 glass warm water with 1/2 tsp organic turmeric, 2 crushed black peppercorns (piperine for absorption), and 1/2 tsp cold-pressed virgin coconut oil.',
        benefit: 'Inhibits inflammatory cytokines (TNF-alpha, IL-6) at the start of the circadian day.'
      },
      {
        time: '08:30 AM',
        title: 'Antioxidant Rich Breakfast',
        meal: 'Warm rolled oats cooked with crushed walnuts, soaked chia seeds, pinch of cinnamon, and fresh blueberries or papaya.',
        benefit: 'Rich in anti-inflammatory polyphenols and Alpha-Linolenic Acid (ALA).'
      },
      {
        time: '11:30 AM',
        title: 'Bone Mineral Tonic',
        meal: 'Fresh moringa (drumstick) leaf broth OR fresh sweet pineapple juice (contains natural bromelain enzyme).',
        benefit: 'Bromelain reduces joint swelling; moringa provides bioavailable calcium and silica.'
      },
      {
        time: '01:30 PM',
        title: 'Nourishing Joint Vitality Lunch',
        meal: 'Steamed red rice, horsegram (kulthi) dal or black gram soup, cooked drumstick curry with coconut milk, sautéed bitter gourd, and fresh cucumber slices.',
        benefit: 'Horsegram clears Kapha stagnation in joints; drumstick provides cartilage minerals.'
      },
      {
        time: '05:00 PM',
        title: 'Circulation Herbal Tea',
        meal: 'Warm ginger and tulsi tea + small handful of dry roasted pumpkin seeds.',
        benefit: 'Improves micro-capillary circulation to extremities and joint capsules.'
      },
      {
        time: '07:30 PM',
        title: 'Warm Anti-Vata Dinner',
        meal: 'Vegetable barley soup or vegetable dahlia cooked with ghee and garlic. Keep meal light and served piping hot.',
        benefit: 'Barley reduces joint edema while garlic offers anti-arthritic allicin compounds.'
      },
      {
        time: '09:30 PM',
        title: 'Bedtime Joint Nectar',
        meal: 'Warm almond or cow milk infused with Ashwagandha, turmeric, and pinch of cardamom.',
        benefit: 'Relieves nocturnal stiffness and encourages restful restorative sleep.'
      }
    ],
    foodsToInclude: [
      { food: 'Fresh Turmeric with Black Pepper', reason: 'Piperine boosts curcumin bio-availability by up to 2000%.' },
      { food: 'Moringa (Sahijan/Drumstick)', reason: 'High organic calcium, phosphorus and natural anti-inflammatory bioflavonoids.' },
      { food: 'Walnuts, Flaxseed & Sesame oil', reason: 'Nourishes synovial fluid and calms dry Vata deterioration in joints.' },
      { food: 'Warm Stewed Apples & Papaya', reason: 'Assists natural bowel clearance, preventing uric acid buildup.' }
    ],
    foodsToAvoid: [
      { food: 'Nightshades in excess (Eggplant, excessive tomatoes)', reason: 'May trigger joint flare-ups in sensitive inflammatory arthritis individuals.' },
      { food: 'Processed sugars & packaged bakery items', reason: 'Directly triggers Advanced Glycation End-products (AGEs) in cartilage.' },
      { food: 'Sour curd/yogurt at night', reason: 'Blocks micro-channels (Srotas) and intensifies morning joint stiffness.' },
      { food: 'Excess sodium and preserved pickles', reason: 'Causes fluid retention in synovial joints.' }
    ],
    doctorNote: 'Pair this dietary chart with daily warm medicated oil massage (Abhyanga with Mahanarayana or Ksheerabala taila) followed by a warm bath.'
  },
  {
    id: 'metabolic-detox-weight-management',
    title: 'Metabolic Detox & Healthy Weight Management Diet Chart',
    category: 'Metabolic Health',
    icon: '⚖️',
    targetConditions: 'Sluggish metabolism, Weight management, Fatty liver grade 1/2, High cholesterol, Pre-diabetes, Lethargy',
    description: 'Harnesses high-fiber native millets, bitter greens, and metabolic kindling spices to stimulate lipolysis, improve insulin sensitivity, and shed excess fluid retention.',
    schedule: [
      {
        time: '06:30 AM',
        title: 'Metabolic Morning Igniter',
        meal: '1 glass lukewarm water with 1 tsp raw unprocessed honey and 1/2 freshly squeezed lemon (ensure water is lukewarm, never hot).',
        benefit: 'Scrapes Ama (Lekhana karma) and activates morning renal filtration.'
      },
      {
        time: '08:30 AM',
        title: 'High-Fiber Sustained Breakfast',
        meal: 'Foxtail millet vegetable upma with green peas and beans, served with fresh mint chutney OR warm barley porridge with chia seeds.',
        benefit: 'Low glycemic index prevents mid-morning insulin spikes and cravings.'
      },
      {
        time: '11:30 AM',
        title: 'Hydration & Fat Scraping Drink',
        meal: '1 glass fresh ash gourd (winter melon) juice with a pinch of rock salt and black pepper.',
        benefit: 'Superior alkaline fat-dissolving tonic that clears stagnant water retention.'
      },
      {
        time: '01:30 PM',
        title: 'Metabolic Power Lunch',
        meal: '2 multigrain/jowar (sorghum) rotis, 1 cup cooked horse gram (kulthi) dal, a generous portion of steamed vegetables (broccoli, cabbage, beans), and cucumber salad.',
        benefit: 'Sorghum and horse gram actively lower serum lipids and enhance satiety.'
      },
      {
        time: '05:00 PM',
        title: 'Evening Green Boost',
        meal: 'Green tea or Shustha Herbal Detox infusion with roasted chana (chickpeas). Avoid all bakery biscuits.',
        benefit: 'Polyphenols stimulate thermogenesis without spiking insulin.'
      },
      {
        time: '07:30 PM',
        title: 'Ultra-Light Early Dinner',
        meal: 'Clear mixed vegetable soup (cabbage, carrots, tomatoes, bottle gourd) with light moong dal dumplings. Must finish before 7:45 PM.',
        benefit: 'Enables deep fasting ketosis and cellular autophagy overnight.'
      },
      {
        time: '09:30 PM',
        title: 'Bedtime Liver Support',
        meal: '1 glass warm water with 1/2 tsp Triphala powder.',
        benefit: 'Supports nocturnal hepatic detoxification and smooth morning evacuation.'
      }
    ],
    foodsToInclude: [
      { food: 'Millets (Jowar, Bajra, Foxtail, Kodo)', reason: 'Low glycemic, complex fiber that reverses insulin resistance.' },
      { food: 'Horsegram (Kulthi)', reason: 'Classical Ayurvedic fat-scraping (Medohara) pulse that burns adipose tissue.' },
      { food: 'Bitter greens (Karela, Methi, Moringa)', reason: 'Stimulates bile secretion and enhances liver detoxification pathways.' },
      { food: 'Warm water throughout the day', reason: 'Accelerates metabolic rate by up to 30% over cold water.' }
    ],
    foodsToAvoid: [
      { food: 'Refined flour (Maida) & white bread', reason: 'Spikes glycemic load and promotes visceral abdominal fat storage.' },
      { food: 'Sweetened milkshakes & packaged fruit juices', reason: 'High fructose induces non-alcoholic fatty liver accumulation.' },
      { food: 'Late night snacking after 8:00 PM', reason: 'Interrupts nocturnal fat burning and causes insulin desensitization.' },
      { food: 'Heavy dairy like cheese, cream, and paneer at night', reason: 'Increases Kapha dosha and slows down metabolic rate.' }
    ],
    doctorNote: 'Maintain a 14-hour intermittent fasting window between dinner and breakfast (e.g. 7:30 PM to 9:30 AM) to maximize metabolic rejuvenation.'
  },
  {
    id: 'calming-sleep-nervous-system',
    title: 'Nervous System Calming & Deep Sleep Diet Chart',
    category: 'Sleep & Mind Vitality',
    icon: '🌙',
    targetConditions: 'Insomnia, Restless mind, Racing thoughts, Anxiety, Brain fog, Chronic tension headaches',
    description: 'Rich in tryptophan, magnesium, and adaptogenic Medhya Rasayanas to soothe the autonomic nervous system and trigger deep restorative slow-wave sleep.',
    schedule: [
      {
        time: '06:30 AM',
        title: 'Grounding Morning Water',
        meal: 'Warm water infused with crushed cardamom pods and 5 soaked, peeled almonds.',
        benefit: 'Supplies magnesium and brain-nourishing fats without nervous stimulation.'
      },
      {
        time: '08:30 AM',
        title: 'Serotonin Supporting Breakfast',
        meal: 'Warm oatmeal cooked in almond milk with sliced ripe banana, crushed pumpkin seeds, and a touch of raw honey.',
        benefit: 'Bananas and oats provide natural tryptophan, the biological precursor to serotonin and melatonin.'
      },
      {
        time: '11:30 AM',
        title: 'Mind-Calming Mid-Day Tonic',
        meal: 'Fresh sweet pomegranate juice OR chamomile infusion with 2 soaked walnuts.',
        benefit: 'Walnuts resemble and nourish brain tissue, providing neuro-protective plant omega-3s.'
      },
      {
        time: '01:30 PM',
        title: 'Nourishing Grounding Lunch',
        meal: 'Basmati rice, ghee-tempered yellow dal, steamed pumpkin or sweet potato curry, and a small glass of cumin buttermilk.',
        benefit: 'Grounding carbohydrates stabilize blood sugar fluctuations that trigger anxious adrenaline spikes.'
      },
      {
        time: '05:00 PM',
        title: 'Herbal Stress Relief Tea',
        meal: 'Shustha Serenity Herbal Tea (Chamomile, Brahmi, Shankhpushpi, Lemongrass) + handful of soaked sunflower seeds.',
        benefit: 'Naturally dampens evening cortisol production.'
      },
      {
        time: '07:30 PM',
        title: 'Light Digestive Dinner',
        meal: 'Warm vegetable soup with soft rice or a light moong dal khichdi cooked with mild spices and cow ghee. Eaten in a peaceful, screen-free environment.',
        benefit: 'Prevents heavy nighttime digestion that interferes with deep sleep transitions.'
      },
      {
        time: '09:30 PM',
        title: 'Classical Moon Milk Bedtime Elixir',
        meal: 'Warm A2 milk or oat milk with 1/4 tsp organic nutmeg (Jaiphal), 1/2 tsp Ashwagandha powder, and pinch of cardamom.',
        benefit: 'Nutmeg acts as a gentle natural sedative (Nidrajanaka) in Ayurveda, inducing deep delta-wave sleep.'
      }
    ],
    foodsToInclude: [
      { food: 'Ripe Bananas & Rolled Oats', reason: 'High in Vitamin B6, magnesium, and tryptophan for sleep neurotransmitter synthesis.' },
      { food: 'Organic A2 Cow Milk or Almond Milk', reason: 'Nourishes Ojas and provides bio-available calcium for calming nerves.' },
      { food: 'Pumpkin Seeds & Walnuts', reason: 'Rich in zinc and magnesium which regulate the central nervous system.' },
      { food: 'Nutmeg, Cardamom & Saffron', reason: 'Ancient Ayurvedic aromatics that relax somatic muscle tension.' }
    ],
    foodsToAvoid: [
      { food: 'Caffeine after 1:00 PM (Coffee, Cola, Black Tea)', reason: 'Caffeine has a 6-hour half-life that blocks adenosine sleep pressure receptors.' },
      { food: 'Dark chocolate at night', reason: 'Contains theobromine and trace stimulants that trigger wakefulness.' },
      { food: 'Spicy, pungent chilies at dinner', reason: 'Raises internal core body temperature, preventing deep sleep onset.' },
      { food: 'Alcohol before bedtime', reason: 'Prevents REM dream sleep and causes middle-of-the-night awakening.' }
    ],
    doctorNote: 'Pair your evening moon milk with Pada Abhyanga (massaging the soles of feet with warm Brahmi oil) 15 minutes before sleep for profound mental tranquility.'
  }
];
