// Clinical & Therapeutic Diet Charts - Sparsha Healthcare Group

export const ENGLISH_DIET_CHARTS = [
  {
    id: 'detox-diet',
    slug: 'detox-diet',
    title: 'Detox Diet',
    fullTitle: 'Cellular Cleansing & Ama Elimination Detox Diet',
    category: 'Cellular Detoxification',
    icon: '🍃',
    targetConditions: 'Sluggish liver, cellular Ama buildup, morning fatigue, bloating, coated tongue, dull skin, lymphatic stagnation',
    description: 'A clinical fasting-mimicking and deep metabolic detox protocol designed to flush accumulated endotoxins (Ama), stimulate hepatic Phase I & II clearance, and reset gut digestive fire (Agni).',
    schedule: [
      {
        time: '06:30 AM',
        title: 'Morning Alkaline Flush',
        meal: '1 warm mug of water with 1/2 tsp fresh ginger juice, 1 tsp cumin seeds water, and 1/2 freshly squeezed lemon.',
        benefit: 'Alkalinizes the digestive tract and awakens bile secretion for hepatic drainage.'
      },
      {
        time: '08:30 AM',
        title: 'Antioxidant Detox Breakfast',
        meal: 'Warm stewed green apple with cinnamon and cloves, OR fresh green smoothie (cucumber, celery, mint, coriander, ash gourd, and a splash of tender coconut water). No dairy or wheat.',
        benefit: 'Rich in polyphenols and chlorophyll that chelate heavy metals and promote cellular oxygenation.'
      },
      {
        time: '11:30 AM',
        title: 'Mid-Morning Lymphatic Tonic',
        meal: '1 cup warm moringa leaf broth OR fresh tender coconut water with 1 tbsp soaked chia seeds.',
        benefit: 'Supplies bio-available potassium and electrolyte hydration to mobilize sluggish lymphatic fluid.'
      },
      {
        time: '01:30 PM',
        title: 'Therapeutic Detox Lunch',
        meal: 'Steamed red rice or quinoa kanji (gruel) with split yellow moong dal, lightly sautéed ash gourd (kushmanda) and bottle gourd cooked with cumin, rock salt, and 1/2 tsp cow ghee.',
        benefit: 'Zero digestive strain; provides clean plant protein and anti-inflammatory cellular fuel.'
      },
      {
        time: '05:00 PM',
        title: 'Liver Rejuvenation Tea',
        meal: 'Warm infusion of dandelion root, coriander seeds, and fennel seeds + a handful of dry-roasted pumpkin seeds.',
        benefit: 'Supports gallbladder emptying, prevents fluid retention, and calms evening hunger.'
      },
      {
        time: '07:30 PM',
        title: 'Deep Cleansing Light Dinner',
        meal: 'Clear organic vegetable broth (zucchini, carrots, cabbage, baby spinach, turmeric) with a pinch of black pepper. Must be consumed warm before 8:00 PM.',
        benefit: 'Allows the gastrointestinal tract to transition into nocturnal cellular autophagy and self-cleansing.'
      },
      {
        time: '09:30 PM',
        title: 'Bedtime Colon Cleanser',
        meal: '1/2 to 1 tsp organic Triphala churna steeped in 1 cup warm water.',
        benefit: 'Tones the intestinal mucosal barrier and ensures gentle, complete morning elimination.'
      }
    ],
    foodsToInclude: [
      { food: 'Ash Gourd, Bottle Gourd & Ridge Gourd', reason: 'High natural water content, highly alkaline, flushes renal pathways.' },
      { food: 'Split Yellow Moong Dal', reason: 'Ayurvedic light pulse that nourishes without producing intestinal gas or toxins.' },
      { food: 'Fresh Coriander, Mint, Celery & Ginger', reason: 'Stimulates digestive enzymes and binds environmental toxins.' },
      { food: 'Warm Cumin-Coriander-Fennel (CCF) Tea', reason: 'The classical tri-doshic digestive kindler and detoxifying brew.' },
      { food: 'Tender Coconut Water & Green Apples', reason: 'Replenishes trace minerals and binds excess bile acids.' }
    ],
    foodsToAvoid: [
      { food: 'Refined sugar, sweets & artificial sweeteners', reason: 'Halts hepatic lipolysis and causes immediate inflammation.' },
      { food: 'Processed oils, deep-fried snacks & margarine', reason: 'Generates free radicals and congests hepatobiliary channels.' },
      { food: 'Dairy products (cheese, thick curd, paneer)', reason: 'Heavy and channel-blocking (Abhishyandi) during active cleansing.' },
      { food: 'Alcohol, carbonated sodas & iced drinks', reason: 'Quenches digestive fire (Mandaagni) and taxes liver detoxification enzymes.' },
      { food: 'Red meat, poultry & preserved cold cuts', reason: 'Requires excessive metabolic energy and creates metabolic toxicity.' }
    ],
    doctorNote: 'Drink 2.5 to 3 liters of lukewarm water spaced throughout the day. Avoid strenuous exercise during the detox period; prioritize restorative pranayama, gentle walks, and early sleep.'
  },
  {
    id: 'grain-free-diet',
    slug: 'grain-free-diet',
    title: 'Grain Free Diet',
    fullTitle: 'Metabolic Reset & Anti-Inflammatory Grain Free Diet',
    category: 'Metabolic & Gut Restoration',
    icon: '🥑',
    targetConditions: 'Gluten sensitivity, autoimmune flare-ups, gut dysbiosis, insulin resistance, brain fog, metabolic syndrome, non-celiac grain intolerance',
    description: 'A scientifically structured grain-free regimen eliminating wheat, rice, corn, oats, and barley. Focuses on nutrient-dense seeds, clean proteins, cold-pressed healthy fats, and prebiotic fiber to restore the gut barrier.',
    schedule: [
      {
        time: '06:30 AM',
        title: 'Gut-Sealing Morning Drink',
        meal: '1 cup warm water with 1 tbsp raw apple cider vinegar (with the mother) OR warm turmeric-ginger water with 1/2 tsp coconut oil.',
        benefit: 'Optimizes gastric hydrochloric acid and soothes the gastrointestinal mucosal lining.'
      },
      {
        time: '08:30 AM',
        title: 'Nutrient-Dense Grain-Free Breakfast',
        meal: '2 scrambled or poached organic pasture-raised eggs (or almond-flour chilla) with sautéed baby spinach, mushrooms, and 1/4 sliced avocado, sprinkled with hemp hearts.',
        benefit: 'High in bioavailable choline, lutein, and healthy fats for sustained morning mental clarity.'
      },
      {
        time: '11:30 AM',
        title: 'Brain Energy Mid-Morning Snack',
        meal: 'A handful of soaked walnuts and pumpkin seeds with 1 cup warm unsweetened almond milk spiced with cardamom.',
        benefit: 'Rich in ALA omega-3s and zinc, preventing cortisol spikes and mid-day hunger.'
      },
      {
        time: '01:30 PM',
        title: 'Grain-Free Power Lunch',
        meal: 'Grilled herb chicken breast or steamed wild salmon (or pan-seared tofu for pesco/vegetarians) served over a large bed of roasted cauliflower rice, steamed broccoli, and zucchini noodles with extra virgin olive oil drizzle.',
        benefit: 'Zero glycemic shock; delivers sustained amino acids and glucosinolates for DNA cellular defense.'
      },
      {
        time: '05:00 PM',
        title: 'Metabolic Herbal Tea',
        meal: '1 cup fresh cinnamon, clove, and tulsi tea + 4-5 activated Brazil nuts or raw macadamias.',
        benefit: 'Cinnamon naturally supports insulin receptor sensitivity without carbohydrate input.'
      },
      {
        time: '07:30 PM',
        title: 'Light Healing Grain-Free Dinner',
        meal: 'Rich collagen-rich bone broth or roasted butternut squash soup with steamed asparagus and sautéed greens cooked in grass-fed ghee.',
        benefit: 'Supplies glycine and proline to repair tight junctions in the intestinal epithelium overnight.'
      },
      {
        time: '09:30 PM',
        title: 'Soothing Sleep Elixir',
        meal: 'Warm coconut milk infusion with Ashwagandha root powder and nutmeg.',
        benefit: 'Lowers evening ACTH and cortisol levels for restful regenerative delta-wave sleep.'
      }
    ],
    foodsToInclude: [
      { food: 'Cauliflower rice, Zucchini noodles, Spaghetti squash', reason: 'Ideal nutrient-dense, fiber-rich whole-food grain substitutes.' },
      { food: 'Almond flour, Coconut flour, Flax meal', reason: 'Grain-free low-carb baking alternatives rich in prebiotic fiber.' },
      { food: 'Wild fish, organic eggs, bone broth, pasture-raised poultry', reason: 'Complete amino acid profiles free from inflammatory grain antigens.' },
      { food: 'Avocados, extra virgin olive oil, cold-pressed coconut oil, ghee', reason: 'Ketogenic medium-chain fats that nourish cellular membranes.' },
      { food: 'Cruciferous vegetables & leafy greens', reason: 'Provides sulfur compounds that support tissue repair and detox.' }
    ],
    foodsToAvoid: [
      { food: 'All grains: Wheat, Rice, Corn, Oats, Barley, Rye', reason: 'Eliminates prolamins and lectins that can trigger gut wall permeability.' },
      { food: 'Grain-derived packaged snacks, pastas & breads', reason: 'Highly refined carbohydrates that spike postprandial insulin.' },
      { food: 'Refined vegetable oils (Soybean, Canola, Corn, Sunflower)', reason: 'High Omega-6:3 ratio accelerates systemic inflammatory cascades.' },
      { food: 'Beer and grain-based alcoholic drinks', reason: 'Damages enterocyte microvilli and disrupts liver glycogen regulation.' },
      { food: 'Sugary condiments & high-fructose corn syrups', reason: 'Promotes fatty liver accumulation and intestinal dysbiosis.' }
    ],
    doctorNote: 'When switching to a grain-free protocol, ensure adequate sea salt and hydration during the initial 3-5 days to maintain electrolyte balance as your body adapts.'
  },
  {
    id: 'grain-free-diet-veg',
    slug: 'grain-free-diet-veg',
    title: 'Grain Free Diet - Veg',
    fullTitle: 'Vegetarian Grain-Free & Plant-Protein Healing Protocol',
    category: 'Vegetarian & Gut Restoration',
    icon: '🌱',
    targetConditions: 'Vegetarians with gluten intolerance, PCOS, stubborn weight, Hashimoto’s thyroiditis, joint stiffness, bloating from grains',
    description: 'A 100% pure vegetarian grain-free nutritional plan. Skillfully utilizes sprouted legumes, paneer/tofu, seed flours, coconut milk, and non-starchy vegetables to provide complete balanced protein without grain lectins.',
    schedule: [
      {
        time: '06:30 AM',
        title: 'Morning Agni Igniter',
        meal: '1 glass lukewarm water with 1/2 tsp crushed fennel, 1/2 tsp cumin seeds, and a squeeze of fresh lemon.',
        benefit: 'Promotes enzyme secretion and prepares the digestive tract for plant-based proteins.'
      },
      {
        time: '08:30 AM',
        title: 'High-Protein Grain-Free Veg Breakfast',
        meal: 'Sprouted moong dal and almond-flour cheela (savory pancake) stuffed with grated fresh paneer (or crumbled tofu), served with fresh coconut-coriander chutney.',
        benefit: 'Provides 18g+ of easily absorbed vegetarian protein with virtually zero grain carbohydrates.'
      },
      {
        time: '11:30 AM',
        title: 'Plant Mineral Mid-Day Boost',
        meal: '1 glass tender coconut water OR fresh cucumber-mint-spinach juice with soaked chia seeds.',
        benefit: 'Supplies bio-available magnesium, chlorophyll, and essential hydration.'
      },
      {
        time: '01:30 PM',
        title: 'Wholesome Vegetarian Grain-Free Lunch',
        meal: 'Cauliflower & pumpkin mash (or raw grated cauliflower stir-fry), 1 cup rich spiced yellow moong dal cooked with cumin, hing, and ghee, accompanied by sautéed spinach and cucumber-radish salad.',
        benefit: 'Delivers balanced amino acids, dietary fiber, and healthy fats without grain-induced post-meal lethargy.'
      },
      {
        time: '05:00 PM',
        title: 'Afternoon Rejuvenation Snack',
        meal: 'Warm herbal tulsi-ginger tea + roasted pumpkin seeds, sunflower seeds, and 4 soaked almonds.',
        benefit: 'Sustained energy release; prevents evening sugar cravings and adrenal fatigue.'
      },
      {
        time: '07:30 PM',
        title: 'Soothing Light Veg Dinner',
        meal: 'Rich bottle gourd and vegetable soup blended with roasted paneer cubes or sprouted lentil dumplings, seasoned with turmeric and black pepper. Finished by 7:45 PM.',
        benefit: 'Light on the digestive system, allowing complete nocturnal cellular repair.'
      },
      {
        time: '09:30 PM',
        title: 'Restorative Golden Moon Milk',
        meal: 'Warm almond milk or A2 cow milk with turmeric, crushed cardamom, and a pinch of nutmeg.',
        benefit: 'Nourishes Ojas (vitality) and supports deep, restorative delta-wave sleep.'
      }
    ],
    foodsToInclude: [
      { food: 'Fresh A2 Paneer, Sprouted Moong, Tofu', reason: 'High-quality vegetarian protein sources free from grain lectins.' },
      { food: 'Almond flour, Water Chestnut (Singhara) flour, Coconut flour', reason: 'Traditional grain-free flours rich in minerals and low in carbohydrates.' },
      { food: 'Pumpkin seeds, Chia seeds, Flaxseeds, Hemp seeds', reason: 'Delivers essential alpha-linolenic fatty acids and bio-available zinc.' },
      { food: 'Cauliflower, Broccoli, Bottle gourd, Spinach, Zucchini', reason: 'Nutrient-rich, fiber-dense non-starchy vegetables.' },
      { food: 'Pure A2 Cow Ghee, Cold-pressed Sesame & Coconut oils', reason: 'Essential lipids that lubricate the gut mucosa and enhance nutrient uptake.' }
    ],
    foodsToAvoid: [
      { food: 'All grains: Wheat, Rice, Oats, Corn, Millet, Semolina (Rava)', reason: 'Avoids grain-associated gliadins, avenins, and prolamins.' },
      { food: 'Packaged vegetarian mock meats & ultra-processed soya chunks', reason: 'Often processed with chemical isolates and wheat fillers.' },
      { food: 'Commercial bakery biscuits, breads & grain snacks', reason: 'Spikes blood sugar and contains inflammatory trans-fats.' },
      { food: 'Heavy raw salads at dinner', reason: 'Aggravates Vata dosha and causes nocturnal gas and bloating.' },
      { food: 'Refined sugar, corn syrups & artificial creamers', reason: 'Feeds pathogenic gut bacteria and promotes systemic inflammation.' }
    ],
    doctorNote: 'Ensure sprouted legumes are cooked thoroughly with digestive spices like hing (asafoetida), cumin, and ginger to facilitate optimal assimilation.'
  },
  {
    id: 'thyroid-diet',
    slug: 'thyroid-diet',
    title: 'Thyroid Diet',
    fullTitle: 'Thyroid Hormone Synthesis & Metabolic Equilibrium Diet',
    category: 'Endocrine & Thyroid Health',
    icon: '🦋',
    targetConditions: 'Hypothyroidism, Hashimoto’s thyroiditis, sluggish metabolism, cold intolerance, unexplained weight gain, brittle hair and nails, lethargy',
    description: 'Designed to nourish the thyroid gland with essential cofactors: Selenium, Zinc, Tyrosine, Iodine, and Vitamin D3. Eliminates raw goitrogens and inflammatory triggers to support optimal T4 to active T3 conversion.',
    schedule: [
      {
        time: '06:30 AM',
        title: 'Thyroid Awakening Tonic',
        meal: '1 glass lukewarm water with 1/2 tsp crushed coriander seeds water (boiled & cooled) + 2 soaked Brazil nuts (exact daily selenium dose). Take 45 mins after thyroid medication.',
        benefit: 'Natural selenium and coriander volatile oils support hepatic T4 to active T3 deiodinase enzyme activity.'
      },
      {
        time: '08:30 AM',
        title: 'Hormone-Nourishing Breakfast',
        meal: 'Gluten-free buckwheat or ragi cheela cooked with ghee, served with grated coconut chutney + 1 boiled egg (or soaked pumpkin seeds and walnuts for veg).',
        benefit: 'Rich in tyrosine, zinc, and sustained complex carbohydrates to support metabolic rate.'
      },
      {
        time: '11:30 AM',
        title: 'Endocrine Hydration Drink',
        meal: 'Fresh tender coconut water OR amla (Indian gooseberry) juice with a pinch of rock salt.',
        benefit: 'High in bio-available Vitamin C and potassium to lower thyroid peroxidase (TPO) antibodies.'
      },
      {
        time: '01:30 PM',
        title: 'Metabolic Thyroid Lunch',
        meal: 'Steamed red rice or quinoa, 1 cup cooked yellow moong or horsegram dal, thoroughly cooked/steamed carrots and green beans, cucumber salad with cold-pressed sesame oil.',
        benefit: 'Steaming deactivates goitrogenic compounds; sesame oil and legumes provide bioavailable zinc.'
      },
      {
        time: '05:00 PM',
        title: 'Thyroid Herbal Infusion',
        meal: 'Warm herbal tea with Ashwagandha root, licorice, and cinnamon + roasted makhana (foxnuts).',
        benefit: 'Ashwagandha modulates pituitary TSH output and protects adrenal reserves.'
      },
      {
        time: '07:30 PM',
        title: 'Warm Anti-Inflammatory Dinner',
        meal: 'Light bottle gourd or pumpkin soup with sautéed mushrooms (rich in selenium & zinc) and steamed sweet potato with cumin and ghee. Finish by 7:45 PM.',
        benefit: 'Easy to assimilate; prevents nocturnal hypothyroid fluid retention and puffy face.'
      },
      {
        time: '09:30 PM',
        title: 'Bedtime Thyroid Restorative',
        meal: '1 small cup warm almond milk or A2 milk with turmeric and pinch of nutmeg.',
        benefit: 'Promotes deep circadian melatonin synthesis, crucial for night thyroid regeneration.'
      }
    ],
    foodsToInclude: [
      { food: 'Brazil Nuts (2 nuts daily)', reason: 'Natural source of 100-200 mcg organic selenium for T4 to T3 conversion.' },
      { food: 'Steamed/Cooked non-cruciferous vegetables (Gourds, Pumpkin, Carrots)', reason: 'Provides clean dietary fiber without interfering with iodine uptake.' },
      { food: 'Pumpkin Seeds, Sesame Seeds & Walnuts', reason: 'High in zinc, magnesium, and essential thyroid building blocks.' },
      { food: 'Wild salmon, organic eggs, A2 ghee, coconut oil', reason: 'Provides healthy fats necessary for steroid and thyroid receptor sensitivity.' },
      { food: 'Coriander seed water & Amla', reason: 'Ayurvedic Rasayana herbs clinically revered for thyroid harmony.' }
    ],
    foodsToAvoid: [
      { food: 'RAW cruciferous vegetables (Cabbage, Cauliflower, Broccoli, Kale)', reason: 'Contains raw glucosinolates that compete with iodine binding. Always cook well!' },
      { food: 'Gluten (Wheat, Maida, Barley, Semolina)', reason: 'Molecular mimicry between gluten gliadin and thyroid tissue triggers Hashimoto antibodies.' },
      { food: 'Soy products (Tofu, Soy milk, Soy protein isolate)', reason: 'Contains isoflavones that inhibit thyroid peroxidase (TPO) enzyme.' },
      { food: 'Refined sugar & high-fructose corn syrup', reason: 'Exacerbates insulin resistance which directly suppresses thyroid hormone sensitivity.' },
      { food: 'Unfiltered fluoridated/chlorinated tap water in excess', reason: 'Halogens that displace iodine in thyroid hormone molecular structures.' }
    ],
    doctorNote: 'Always maintain at least 45 to 60 minutes gap between your prescribed thyroid hormone medication (e.g. Levothyroxine) and morning food or supplements.'
  },
  {
    id: 'weight-loss-diet',
    slug: 'weight-loss-diet',
    title: 'Weight Loss Diet',
    fullTitle: 'Circadian Lipolysis & Kapha-Scraping Weight Loss Protocol',
    category: 'Metabolic & Fat Reduction',
    icon: '⚡',
    targetConditions: 'Stubborn visceral fat, metabolic syndrome, fatty liver, insulin resistance, slow resting metabolic rate, food cravings, lethargy',
    description: 'An evidence-based 16:8 intermittent fasting and Medohara (fat-scraping) protocol designed to accelerate thermogenesis, stimulate white-to-brown adipose conversion, and permanently normalize insulin sensitivity.',
    schedule: [
      {
        time: '07:00 AM',
        title: 'Metabolic Fasting Brew',
        meal: '1 large mug warm water boiled with 1/2 tsp crushed cumin, 1/2 tsp crushed black pepper, 1 pinch cinnamon, and 1 tsp raw honey (ensure water is lukewarm, never boiling).',
        benefit: 'Scrapes metabolic sludge (Lekhana karma) and activates morning renal filtration.'
      },
      {
        time: '09:30 AM',
        title: 'Fasting-Window Break / High-Fiber Breakfast',
        meal: 'Warm foxtail millet or barnyard millet upma packed with french beans, carrots, and green peas, served with fresh mint-coriander chutney + 4 soaked almonds.',
        benefit: 'Ultra-low glycemic index prevents post-meal insulin spikes that switch off lipolysis.'
      },
      {
        time: '12:00 PM',
        title: 'Pre-Lunch Fat-Scraping Tonic',
        meal: '1 glass fresh ash gourd (winter melon) juice with a pinch of rock salt and roasted cumin powder.',
        benefit: 'Alkaline powerhouse that neutralizes systemic acidity and clears trapped lymphatic edema.'
      },
      {
        time: '01:30 PM',
        title: 'Metabolic Power Lunch (Largest Meal of the Day)',
        meal: '2 thin Jowar (sorghum) or Bajra rotis, 1 large bowl of horsegram (kulthi) dal or black chana curry, 1 plate steamed bitter gourd / ridge gourd sabzi, and a large raw cucumber-radish salad with lemon.',
        benefit: 'Harnesses peak solar digestive fire (Pitta). Horsegram is clinically proven to reduce serum lipids.'
      },
      {
        time: '05:00 PM',
        title: 'Thermogenic Afternoon Tea',
        meal: 'Warm green tea or fresh ginger-tulsi tea + a small bowl of roasted chana (chickpeas). Avoid all biscuits and fried snacks.',
        benefit: 'EGCG catechins and gingerol promote cellular thermogenesis without caloric excess.'
      },
      {
        time: '07:30 PM',
        title: 'Ultra-Light Dinner (Window Closes)',
        meal: 'Clear mixed vegetable and moong dal soup with ginger, garlic, and turmeric. Keep it hot and light. Must complete before 7:45 PM to initiate the 14-16h overnight fast.',
        benefit: 'Enables deep nocturnal ketosis, cellular autophagy, and human growth hormone (HGH) surge.'
      },
      {
        time: '09:30 PM',
        title: 'Bedtime Liver Drainage',
        meal: '1 cup warm water with 1/2 tsp Triphala powder.',
        benefit: 'Supports liver detoxification and prevents morning water retention.'
      }
    ],
    foodsToInclude: [
      { food: 'Horsegram (Kulthi Dal)', reason: 'The premier Ayurvedic pulse for burning stubborn adipose tissue (Medas).' },
      { food: 'Ancient Millets (Jowar, Bajra, Foxtail, Barnyard)', reason: 'High in insoluble fiber and micronutrients; low in simple starches.' },
      { food: 'Ash Gourd, Bottle Gourd, Bitter Gourd (Karela)', reason: 'Stimulates bile release, lowers fasting blood glucose, and reduces fat storage.' },
      { food: 'Fresh Ginger, Black Pepper, Cinnamon, Cumin', reason: 'Natural thermogenic spices that elevate baseline metabolic expenditure.' },
      { food: 'Warm water throughout the day (at least 2.5L)', reason: 'Consistently accelerates metabolic rate compared to chilled water.' }
    ],
    foodsToAvoid: [
      { food: 'Refined flour (Maida), white bread & bakery pastries', reason: 'Triggers rapid blood glucose spikes that promote visceral fat storage.' },
      { food: 'Sweetened milkshakes, sodas, packaged juices & energy drinks', reason: 'Liquid fructose directly bypasses satiety signals and induces fatty liver.' },
      { food: 'Late night eating after 8:00 PM', reason: 'Completely suppresses nocturnal lipolysis and causes morning insulin resistance.' },
      { food: 'Heavy dairy (creamy paneer, cheese, ice cream) at night', reason: 'Vitiates Kapha dosha and leads to metabolic stagnation.' },
      { food: 'Deep-fried snacks & reuse of cooking oils', reason: 'Loaded with trans-fats that impair insulin signaling in muscle cells.' }
    ],
    doctorNote: 'Consistency is paramount. Combine this 16:8 circadian nutrition schedule with 30-45 minutes of daily brisk walking before breakfast for optimal fat loss.'
  },
  {
    id: 'wellness-diet',
    slug: 'wellness-diet',
    title: 'Wellness Diet',
    fullTitle: 'Classical Satvic Rejuvenation & Tridoshic Wellness Diet',
    category: 'Daily Longevity & Vitality',
    icon: '✨',
    targetConditions: 'General health optimization, daily vitality, stress resilience, Ojas nourishment, balanced digestion, longevity, mental clarity',
    description: 'The golden standard of Ayurvedic nutrition. Formulated to harmonize all three biological doshas (Vata, Pitta, Kapha), support cellular longevity, and cultivate clear mental serenity (Sattva) and robust immunity (Ojas).',
    schedule: [
      {
        time: '06:30 AM',
        title: 'Prana Morning Hydration',
        meal: '1 copper-vessel water or warm water infused with 5 fresh tulsi leaves and 4 soaked, peeled almonds + 2 soaked figs.',
        benefit: 'Awakens vital Prana and nourishes brain tissue without metabolic tax.'
      },
      {
        time: '08:30 AM',
        title: 'Nourishing Satvic Breakfast',
        meal: 'Warm spiced oatmeal or sprouted ragi porridge with almond milk, pinch of cardamom, cinnamon, and 1 tsp raw honey OR steamed vegetable idlis with fresh coconut-coriander chutney.',
        benefit: 'Delivers sustained whole-food nourishment that supports steady focus and calm emotional energy.'
      },
      {
        time: '11:30 AM',
        title: 'Mid-Morning Rejuvenation Elixir',
        meal: 'Fresh sweet pomegranate juice OR tender coconut water with a squeeze of fresh lime.',
        benefit: 'Cools internal heat (Pitta), purifies blood tissue (Rakta), and supplies bioavailable minerals.'
      },
      {
        time: '01:30 PM',
        title: 'Balanced Tridoshic Lunch',
        meal: 'Steamed aged Basmati or red rice, yellow moong dal cooked with cumin and cow ghee, lightly sautéed seasonal vegetables (zucchini, carrots, green beans), and 1 small glass of spiced buttermilk (Takra).',
        benefit: 'Incorporates all 6 Ayurvedic tastes (Shad Rasa), preventing cravings and promoting complete satiety.'
      },
      {
        time: '05:00 PM',
        title: 'Mind-Calming Evening Tea',
        meal: 'Fresh herbal infusion of chamomile, mint, and fennel + a handful of dry-roasted lotus seeds (makhana).',
        benefit: 'Soothes the nervous system and prevents late-afternoon energy crashes.'
      },
      {
        time: '07:30 PM',
        title: 'Light Wholesome Dinner',
        meal: 'Warm therapeutic moong-rice khichdi cooked with fresh ginger, turmeric, and 1 tsp grass-fed A2 cow ghee, served with steamed bottle gourd. Finished before 8:00 PM.',
        benefit: 'Easily assimilated meal that promotes restorative night digestion and light morning awakening.'
      },
      {
        time: '09:30 PM',
        title: 'Classical Bedtime Ojas Drink',
        meal: '1 cup warm A2 cow milk or almond milk infused with saffron, crushed cardamom, and a pinch of nutmeg.',
        benefit: 'Deeply nourishes Ojas, calms the mind, and encourages restorative slow-wave sleep.'
      }
    ],
    foodsToInclude: [
      { food: 'Freshly prepared, warm, seasonal whole foods', reason: 'High in biological Prana (vital life force) and easily assimilated.' },
      { food: 'Pure A2 Cow Ghee (Ghrita)', reason: 'Nourishes the brain, kindles Agni, and acts as the finest vehicle for nutrients.' },
      { food: 'Split Moong Dal, Aged Basmati, Millets', reason: 'Light, non-inflammatory carbohydrates and easily digested plant proteins.' },
      { food: 'Sweet seasonal fruits (Pomegranates, Grapes, Papaya, Apples)', reason: 'Rich in natural antioxidants that preserve cellular youth.' },
      { food: 'Fresh churned buttermilk (Takra) with roasted cumin', reason: 'Restores healthy intestinal microflora and prevents sluggishness.' }
    ],
    foodsToAvoid: [
      { food: 'Refrigerated stale leftovers & microwaved meals', reason: 'High in Tamas (lethargy) and depleted of vital Prana.' },
      { food: 'Excessively pungent, sour & salty foods', reason: 'Aggravates Pitta fire, leading to irritability, acidity, and skin inflammation.' },
      { food: 'Artificial food colorings, preservatives & MSG', reason: 'Clogs fine metabolic micro-channels (Srotas).' },
      { food: 'Eating while stressed, distracted or hurried', reason: 'Immobilizes digestive blood flow and generates toxic Ama.' },
      { food: 'Ice-cold beverages and ice cream', reason: 'Immediately extinguishes digestive fire (Agni).' }
    ],
    doctorNote: 'Eat in a tranquil, mindful environment with gratitude. Chew each morsel thoroughly to initiate optimal enzymatic salivary breakdown.'
  }
];

// Additional specialty clinical diet plans for general health conditions
export const ADDITIONAL_SPECIALTY_CHARTS = [
  {
    id: 'hormonal-menstrual-harmony',
    slug: 'hormonal-menstrual-harmony',
    title: 'Hormonal Balance & Menstrual Wellness Diet',
    fullTitle: 'Hormonal Balance & Menstrual Wellness Protocol',
    category: "Women's Health",
    icon: '🌸',
    targetConditions: 'Irregular cycles, PMS, Dysmenorrhea, PCOS, Endometriosis support, Perimenopausal shifts',
    description: 'Designed to modulate estrogen clearance, nourish ovarian tissue, alleviate pelvic inflammation, and stabilize insulin spikes.',
    schedule: [
      { time: '06:30 AM', title: 'Awakening Uterine Elixir', meal: 'Warm water with soaked methi seeds or 1 tsp organic Amla juice + turmeric.', benefit: 'Supports hepatic phase-1 estrogen breakdown.' },
      { time: '08:30 AM', title: 'Nutritious Low-Glycemic Breakfast', meal: 'Sprouted ragi porridge with almond milk OR steamed vegetable idlis + pumpkin & flax seeds.', benefit: 'Sustained complex carbohydrates and seed cycling lignans.' },
      { time: '11:30 AM', title: 'Mid-Morning Hydration', meal: '1 glass tender coconut water OR fresh pomegranate juice with 4 soaked almonds & 2 raisins.', benefit: 'Replenishes iron and nourishes blood tissue.' },
      { time: '01:30 PM', title: 'Balanced Healing Lunch', meal: 'Small bowl of red rice, warm vegetable sambar, cooked spinach in cow ghee, spiced buttermilk.', benefit: 'Bioactive folate and probiotic microflora.' },
      { time: '05:00 PM', title: 'Hormone Soothing Evening Tea', meal: 'Warm fennel & cinnamon infusion + dry-roasted makhana.', benefit: 'Cinnamon stabilizes insulin sensitivity; fennel prevents cramps.' },
      { time: '07:30 PM', title: 'Light Easy-Digesting Dinner', meal: 'Moong dal and bottle gourd soup tempered with cumin and ginger.', benefit: 'Prevents Ama accumulation during sleep.' },
      { time: '09:30 PM', title: 'Bedtime Restorative Elixir', meal: 'Warm A2 cow milk or oat milk with pinch of nutmeg and Shatavari powder.', benefit: 'Nourishes Ojas and promotes restorative nocturnal hormone synthesis.' }
    ],
    foodsToInclude: [
      { food: 'Sprouted millets & brown/red rice', reason: 'High in fiber; binds excess excreted estrogens in bowel.' },
      { food: 'Pumpkin, Flax, Sesame & Sunflower seeds', reason: 'Provides essential fatty acids and lignans for natural seed cycling.' },
      { food: 'Deep leafy greens (Drumstick leaves, Methi, Spinach)', reason: 'Rich in non-heme iron and magnesium to ease uterine cramps.' },
      { food: 'Pomegranate, Figs & Raisins', reason: 'Nourishes blood tissue and stimulates natural cellular vitality.' },
      { food: 'Pure Cow Ghee', reason: 'Lipid vehicle essential for steroid hormone synthesis.' }
    ],
    foodsToAvoid: [
      { food: 'Iced water & chilled beverages', reason: 'Constricts pelvic vasculature and aggravates Apana Vata spasms.' },
      { food: 'Refined white sugar & pastries', reason: 'Triggers insulin surges which stimulate ovarian androgen overproduction.' },
      { food: 'Deep-fried snacks & processed seed oils', reason: 'Promotes inflammatory PGE2 prostaglandins responsible for acute cramps.' },
      { food: 'Excessive caffeine', reason: 'Constricts blood vessels and depletes adrenal magnesium reserves.' }
    ],
    doctorNote: 'Seed cycling (Days 1–14: Flax & Pumpkin; Days 15–28: Sesame & Sunflower) should be practiced consistently for at least three menstrual cycles.'
  },
  {
    id: 'anti-inflammatory-joint-care',
    slug: 'anti-inflammatory-joint-care',
    title: 'Anti-Inflammatory & Joint Flexibility Diet',
    fullTitle: 'Anti-Inflammatory & Joint Cartilage Flexibility Protocol',
    category: 'Musculoskeletal & Pain Care',
    icon: '🦴',
    targetConditions: 'Osteoarthritis, Rheumatoid stiffness, Cervical spondylosis, Sciatica, Gout, Chronic bodily inflammation',
    description: 'Combines bio-active curcuminoids, plant omega-3s, and sulfur-rich botanicals to soothe inflamed synovial membranes.',
    schedule: [
      { time: '06:30 AM', title: 'Anti-Inflammatory Golden Water', meal: 'Warm water with turmeric, black pepper (piperine), and cold-pressed virgin coconut oil.', benefit: 'Inhibits inflammatory cytokines at circadian start.' },
      { time: '08:30 AM', title: 'Antioxidant Rich Breakfast', meal: 'Warm rolled oats cooked with crushed walnuts, soaked chia seeds, and fresh blueberries or papaya.', benefit: 'Rich in anti-inflammatory polyphenols and Alpha-Linolenic Acid.' },
      { time: '11:30 AM', title: 'Bone Mineral Tonic', meal: 'Fresh moringa (drumstick) leaf broth OR sweet pineapple juice (natural bromelain).', benefit: 'Bromelain reduces joint swelling; moringa provides bioavailable calcium.' },
      { time: '01:30 PM', title: 'Nourishing Joint Vitality Lunch', meal: 'Steamed red rice, horsegram dal, drumstick curry with coconut milk, sautéed bitter gourd.', benefit: 'Horsegram clears Kapha stagnation in joints.' },
      { time: '05:00 PM', title: 'Circulation Herbal Tea', meal: 'Warm ginger and tulsi tea + roasted pumpkin seeds.', benefit: 'Improves micro-capillary circulation to extremities.' },
      { time: '07:30 PM', title: 'Warm Anti-Vata Dinner', meal: 'Vegetable barley soup or dahlia cooked with ghee and garlic.', benefit: 'Barley reduces joint edema while garlic offers anti-arthritic allicin.' },
      { time: '09:30 PM', title: 'Bedtime Joint Nectar', meal: 'Warm almond milk infused with Ashwagandha, turmeric, and pinch of cardamom.', benefit: 'Relieves nocturnal stiffness and encourages restful sleep.' }
    ],
    foodsToInclude: [
      { food: 'Fresh Turmeric with Black Pepper', reason: 'Piperine boosts curcumin bio-availability by up to 2000%.' },
      { food: 'Moringa (Sahijan/Drumstick)', reason: 'High organic calcium, phosphorus and natural anti-inflammatory bioflavonoids.' },
      { food: 'Walnuts, Flaxseed & Sesame oil', reason: 'Nourishes synovial fluid and calms dry Vata deterioration in joints.' },
      { food: 'Stewed Apples & Papaya', reason: 'Assists natural bowel clearance, preventing uric acid buildup.' }
    ],
    foodsToAvoid: [
      { food: 'Nightshades in excess (Eggplant, excessive tomatoes)', reason: 'May trigger joint flare-ups in sensitive inflammatory arthritis individuals.' },
      { food: 'Processed sugars & packaged bakery items', reason: 'Directly triggers Advanced Glycation End-products (AGEs) in cartilage.' },
      { food: 'Sour curd/yogurt at night', reason: 'Blocks micro-channels (Srotas) and intensifies morning joint stiffness.' }
    ],
    doctorNote: 'Pair this dietary chart with daily warm medicated oil massage (Abhyanga) followed by a warm bath.'
  }
];

// Unified Master DIET_CHARTS array (6 core English diets first, followed by specialty plans)
export const DIET_CHARTS = [...ENGLISH_DIET_CHARTS, ...ADDITIONAL_SPECIALTY_CHARTS];

// Helper to look up chart by id or slug
export function getDietChartBySlug(slug) {
  if (!slug) return ENGLISH_DIET_CHARTS[0];
  const normalized = slug.toLowerCase().trim();
  return (
    DIET_CHARTS.find(
      (c) => c.slug === normalized || c.id === normalized || c.title.toLowerCase().replace(/\s+/g, '-') === normalized
    ) || ENGLISH_DIET_CHARTS[0]
  );
}
