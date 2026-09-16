// Sparsha Healthcare Official WhatsApp and Contact Information
export const CONTACT_INFO = {
  brandName: 'Sparsha Healthcare Group',
  hospitalName: 'Sparsha Health Care',
  hospitalAddress: 'Indira Gandhi Rd, next to Hotel Vishnu Delicacy, Joythinagar, Chikkamagaluru, Karnataka 577101',
  hospitalPhone: '082623 55225',
  hospitalPhoneFormatted: '+91 82623 55225',
  hospitalWebsite: 'https://sparsha-hospital.grexa.site/',
  googleRating: '5.0',
  googleReviewsCount: 40,
  googleMapsDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=Sparsha+Health+Care+Indira+Gandhi+Rd+Joythinagar+Chikkamagaluru+Karnataka+577101',
  whatsappNumber: '+91 99868 46635',
  whatsappRawNumber: '919986846635', // International format without + or spaces
  phoneDisplay: '+91 99868 46635',
  email: 'care@sparshahealth.demo',
  supportHours: 'Mon – Sat: 8:00 AM – 8:00 PM | Sun: 9:00 AM – 1:00 PM',
  socialLinks: {
    facebook: 'https://www.facebook.com/Sparshaintegrated/',
    instagram: 'https://www.instagram.com/sparsha_hospital/',
    youtube: 'https://www.youtube.com/@DrSarjasHealthtips'
  }
};

export const SOCIAL_LINKS = CONTACT_INFO.socialLinks;

/**
 * Builds a direct WhatsApp chat URL with encoded text
 */
export function buildWhatsAppUrl(message, phoneNumber = CONTACT_INFO.whatsappRawNumber) {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Generates WhatsApp URL for a complete Product Order from Checkout
 */
export function generateWhatsAppOrderUrl(formData, cartItems, subtotal, orderId, courierData = {}) {
  const addressLine = [formData.address, formData.city, formData.pincode].filter(Boolean).join(', ');
  const courierCharge = courierData.courierCharge ?? 100;
  const courierName = courierData.courierName || 'Standard Courier (1 Box)';
  const totalAmount = (subtotal || 0) + courierCharge;
  const totalBoxes = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const itemsList = cartItems
    .map((item, index) => `${index + 1}. ${item.name} x ${item.quantity} = Rs. ${item.price * item.quantity}`)
    .join('\n');

  const message = 
`SPARSHA HEALTHCARE - NEW ORDER
------------------------------------
Order ID: ${orderId}
Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}

Customer Details:
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email}

Delivery Address:
${addressLine}

Items Ordered (${totalBoxes} ${totalBoxes === 1 ? 'box' : 'boxes'}):
${itemsList}

------------------------------------
Items Subtotal: Rs. ${subtotal}
Mandatory Courier Charge: Rs. ${courierCharge} (${courierName})
Total Payable: Rs. ${totalAmount}

Payment Method: Direct WhatsApp Confirmation (UPI / NetBanking / COD)
${formData.notes ? `\nSpecial Notes:\n${formData.notes}\n` : ''}
Note: Courier charge is calculated as per parcel box weight (Rs. 100 for 1 box, Rs. 150 for 2-3 boxes, Rs. 200 for 4+ boxes). Final parcel dispatch receipt and tracking ID will be confirmed in this chat.

Please confirm my order and share payment and dispatch instructions. Thank you.`;

  return buildWhatsAppUrl(message);
}

/**
 * Generates WhatsApp URL for a quick single product purchase/enquiry
 */
export function generateWhatsAppProductUrl(product, quantity = 1) {
  const message = 
`SPARSHA HEALTHCARE - PRODUCT ENQUIRY
------------------------------------
Product: ${product.name}
Quantity: ${quantity}
Price: Rs. ${product.price * quantity} (Rs. ${product.price} each)
Category: ${product.category || 'Herbal Remedies'}

Hello, I would like to order / inquire about this product. Please share availability and dispatch details. Thank you.`;

  return buildWhatsAppUrl(message);
}

/**
 * Generates WhatsApp URL for a Doctor Consultation or Wellness Service Enquiry
 */
export function generateWhatsAppServiceUrl(formData) {
  const message = 
`SPARSHA HEALTHCARE - CONSULTATION ENQUIRY
------------------------------------
Patient Name: ${formData.name}
Phone: ${formData.mobile}
Email: ${formData.email}

Preferred Center: ${formData.center}
Service Requested: ${formData.service}
Preferred Date: ${formData.preferredDate || 'Earliest Available'}
Preferred Time Slot: ${formData.preferredTime || 'Any Time'}
${formData.message ? `\nHealth Concerns / Inquiries:\n${formData.message}\n` : ''}------------------------------------
Please check doctor availability and confirm the next consultation steps. Thank you.`;

  return buildWhatsAppUrl(message);
}

/**
 * Generates WhatsApp URL for Event Registration / Enquiry
 */
export function generateWhatsAppEventUrl(event) {
  const message = 
`SPARSHA HEALTHCARE - EVENT REGISTRATION
------------------------------------
Event: ${event.title}
Date: ${event.dateDisplay || event.date}
Time: ${event.time}
Location: ${event.location}
Category: ${event.category}

Hello, I am interested in registering for this upcoming event. Please share registration details and seat availability. Thank you.`;

  return buildWhatsAppUrl(message);
}

/**
 * Generates WhatsApp URL for Notice Board announcements, new launches, OPD schedules, etc.
 */
export function generateWhatsAppNoticeUrl(notice) {
  const isProduct = notice.type === 'product' || notice.category?.toLowerCase().includes('product') || notice.category?.toLowerCase().includes('launch');
  const isOpd = notice.type === 'opd' || notice.category?.toLowerCase().includes('opd') || notice.category?.toLowerCase().includes('doctor');
  
  let header = 'SPARSHA HEALTHCARE - BULLETIN ENQUIRY';
  if (isProduct) header = 'SPARSHA HEALTHCARE - PRODUCT LAUNCH ENQUIRY';
  else if (isOpd) header = 'SPARSHA HEALTHCARE - DOCTOR OPD ENQUIRY';

  const message = 
`${header}
------------------------------------
Announcement: ${notice.title}
Category: ${notice.category || 'Announcement'}
${notice.dateDisplay || notice.date ? `Schedule / Date: ${notice.dateDisplay || notice.date}\n` : ''}${notice.time ? `Timing: ${notice.time}\n` : ''}${notice.location ? `Location: ${notice.location}\n` : ''}${notice.price ? `Price / Fee: ${notice.price}\n` : ''}------------------------------------
Hello, I saw this announcement on the Sparsha Notice Board and would like to ${isProduct ? 'order this product / get more details' : isOpd ? 'book an appointment slot' : 'register / enquire about details'}. Thank you.`;

  return buildWhatsAppUrl(message);
}

/**
 * Generates WhatsApp URL for Diet Charts form submission & consultation enquiry
 */
export function generateWhatsAppDietEnquiryUrl(formData) {
  const fullName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || formData.name || 'Patient';
  const location = [formData.city, formData.country].filter(Boolean).join(', ') || 'Not specified';
  const healthFocus = formData.healthGoal || formData.service || 'Personalized Diet Chart & Nutrition Protocol';
  const dietPref = formData.dietPreference ? `\nDietary Preference: ${formData.dietPreference}` : '';
  const notesText = formData.notes || formData.message ? `\nSymptoms / Notes: ${formData.notes || formData.message}` : '';
  const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const message = 
`SPARSHA HEALTHCARE - PERSONALIZED DIET CHART ENQUIRY
------------------------------------
Patient Name: ${fullName}
Phone: ${formData.phone || formData.mobile || 'Not specified'}
Email: ${formData.email || 'Not specified'}
Location: ${location}
Health Focus / Goal: ${healthFocus}${dietPref}${notesText}
Date: ${dateStr}

Enquiry Message:
Hello Doctor / Clinical Nutrition Team, I have submitted my details on your website for a customized Ayurvedic & Clinical Diet Plan tailored to my health condition and body constitution.

Please review my profile and share the personalized diet consultation guidance. Thank you!
------------------------------------
Source: Sparsha Healthcare Portal (Diet Plan Request)`;

  return buildWhatsAppUrl(message);
}


