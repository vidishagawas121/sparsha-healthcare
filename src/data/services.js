export const services = [
  {
    id: 'naturopathy',
    title: 'Naturopathy',
    tagline: 'Nature’s innate intelligence guiding biological restoration',
    shortDescription: 'Natural approaches that support the body’s own healing processes through non-invasive therapies, hydrotherapy, mud therapy, and lifestyle synchronization.',
    iconName: 'Leaf',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80',
    fullDescription: 'Naturopathy at Sparsha honors the body’s vital curative capability (Vis Medicatrix Naturae). Through structured cleansing, hydro-thermal packs, customized therapeutic fasting, and gentle physiological alignment, we assist the body in eliminating metabolic stress and restoring homeostasis without pharmaceutical dependence.',
    principles: [
      'First, Do No Harm (Primum Non Nocere)',
      'The Healing Power of Nature (Vis Medicatrix Naturae)',
      'Identify and Treat the Underlying Cause (Tolle Causam)',
      'Treat the Whole Person (Holistic Integration)',
      'Doctor as Educator and Partner (Docere)'
    ],
    therapiesIncluded: [
      'Acupuncture & Reflexology',
      'Spinal Spray & Hip Bath hydrotherapies',
      'Purified therapeutic mud applications',
      'Sun therapy (Heliotherapy) and breathing exercises',
      'Cellular detoxification protocols'
    ]
  },
  {
    id: 'functional-medicine',
    title: 'Functional Medicine',
    tagline: 'Root-cause analysis through advanced biological insights',
    shortDescription: 'A deeper, science-backed approach focused on understanding underlying health factors, biochemical individuality, and metabolic balance.',
    iconName: 'Activity',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    fullDescription: 'Functional Medicine is an evolution in the practice of healthcare that addresses the comprehensive healthcare needs of the 21st century. By shifting the traditional symptom-suppressing approach to a patient-centered framework, we address the whole person, mapping interconnected genetic, environmental, and lifestyle factors.',
    principles: [
      'Comprehensive biochemical individuality',
      'Systemic web-like interconnection of bodily functions',
      'Health as a positive vitality, not mere absence of disease',
      'Evidence-informed functional biomarkers',
      'Personalized metabolic restoration'
    ],
    therapiesIncluded: [
      'Nutritional biomarker assessment',
      'Microbiome and gut barrier restoration',
      'Hormonal rhythm rebalancing',
      'Mitochondrial and cellular energy support',
      'Inflammatory cascade regulation'
    ]
  },
  {
    id: 'ayurveda',
    title: 'Ayurveda',
    tagline: 'Timeless Vedic wisdom tailored to individual doshic constitution',
    shortDescription: 'Traditional wellness wisdom adapted to individual needs, balancing the Panchamahabhutas (five elements) and tri-doshas for lasting vitality.',
    iconName: 'Heart',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1000&q=80',
    fullDescription: 'Our Ayurvedic practitioners provide authentic classical therapies integrated with modern safety benchmarks. Through personalized assessment of your Prakriti (natural constitution) and Vikriti (current imbalance), we formulate specialized herbal oils, Panchakarma rejuvenation steps, and dietary regimens.',
    principles: [
      'Tridosha Balance: Vata, Pitta, and Kapha',
      'Agni (digestive fire) optimization for metabolic purity',
      'Prakriti assessment (constitutional mapping)',
      'Circadian living according to Dinacharya and Ritucharya'
    ],
    therapiesIncluded: [
      'Abhyanga (Herbal warm oil full-body therapy)',
      'Shirodhara (Continuous medicated oil stream on forehead)',
      'Kizhi (Warm herbal bolus fomentation)',
      'Nasya & seasonal Panchakarma cleanses',
      'Herbal decoctions & classical rasayanas'
    ]
  },
  {
    id: 'physiotherapy',
    title: 'Physiotherapy',
    tagline: 'Kinematic precision, structural alignment, and pain-free movement',
    shortDescription: 'Movement, rehabilitation, postural correction, and physical wellbeing designed to rebuild strength, flexibility, and physical confidence.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    fullDescription: 'Sparsha Physiotherapy combines advanced kinetic assessment with manual therapy, postural realignment, and neuromuscular re-education. Whether recovering from chronic musculoskeletal discomfort or seeking athletic performance enhancement, our therapists guide you safely back to fluid movement.',
    principles: [
      'Biomechanic movement pattern evaluation',
      'Targeted joint mobility and soft tissue release',
      'Core stability and functional neuromuscular training',
      'Ergonomic and postural re-education'
    ],
    therapiesIncluded: [
      'Manual myofascial and joint mobilization',
      'Therapeutic therapeutic exercise prescriptions',
      'Post-rehabilitation stabilization',
      'Ergonomic spine wellness programs',
      'Kinetic balance and proprioception recovery'
    ]
  },
  {
    id: 'nutrition',
    title: 'Nutrition & Lifestyle',
    tagline: 'Food as bio-information for sustained vitality and longevity',
    shortDescription: 'Healthy nutrition and lifestyle guidance supporting long-term wellness, conscious eating, circadian alignment, and sustained daily resilience.',
    iconName: 'Apple',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80',
    fullDescription: 'What you consume becomes the biological fabric of your cells. At Sparsha, nutrition is never about restrictive diets or generic calorie counts; it is an individualized blueprint crafted around seasonal harvest, gut microbial health, metabolic efficiency, and culinary joy.',
    principles: [
      'Whole, unrefined, and seasonal nourishment',
      'Microbiome-supportive diverse plant fiber',
      'Blood sugar and insulin sensitivity balancing',
      'Mindful culinary rituals and circadian eating'
    ],
    therapiesIncluded: [
      'Customized therapeutic meal frameworks',
      'Anti-inflammatory nutritional blueprints',
      'Western Ghats medicinal herb tea integration',
      'Food intolerance and sensitivity guidance',
      'Daily circadian routine (Dinacharya) design'
    ]
  }
];

export const healthConditions = [
  {
    id: 'stress-sleep',
    title: 'Stress & Sleep',
    subtitle: 'Nervous system restoration',
    description: 'Address insomnia, chronic nervous fatigue, and daytime burnout through calming therapies, circadian realignment, and herbal adaptogens.',
    recommendedCare: ['Naturopathy', 'Ayurveda (Shirodhara)', 'Serenity Herbal Ritual']
  },
  {
    id: 'digestive-wellness',
    title: 'Digestive Wellness',
    subtitle: 'Microbiome & gut harmony',
    description: 'Nurture gastrointestinal resilience, soothe bloating, and optimize metabolic absorption through root-cause nutrition and botanical remedies.',
    recommendedCare: ['Functional Medicine', 'Naturopathy', 'Shustha Digestive Balance']
  },
  {
    id: 'weight-management',
    title: 'Weight Management',
    subtitle: 'Metabolic & hormonal balance',
    description: 'Sustainable, non-punitive body composition management focusing on metabolic rate, hormonal pathways, and wholesome nutritional education.',
    recommendedCare: ['Nutrition & Lifestyle', 'Functional Medicine', 'Physiotherapy']
  },
  {
    id: 'joint-mobility',
    title: 'Joint & Mobility',
    subtitle: 'Active physical freedom',
    description: 'Relieve physical stiffness, restore spinal ease, and rebuild comfortable joint movement through manual therapy and soothing botanicals.',
    recommendedCare: ['Physiotherapy', 'Ayurveda (Kizhi)', 'Shustha Joint Care']
  },
  {
    id: 'lifestyle-wellness',
    title: 'Lifestyle Wellness',
    subtitle: 'Balance amidst modern pace',
    description: 'Holistic reset for urban professionals seeking to eliminate brain fog, boost cellular vitality, and sustain balanced everyday energy.',
    recommendedCare: ['Wellness Retreat', 'Daily Vitality Blend', 'Nutrition & Lifestyle']
  },
  {
    id: 'preventive-health',
    title: 'Preventive Health',
    subtitle: 'Proactive longevity & defense',
    description: 'Comprehensive functional baseline evaluations to understand and protect your health long before clinical symptoms arise.',
    recommendedCare: ['Functional Medicine', 'Naturopathic Cleanses', 'Herbal Support']
  }
];
