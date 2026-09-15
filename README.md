# SPARSHA HEALTHCARE GROUP
### *Holistic Wellness Through Nature, Science & Expert Care*

A client presentation demo website showcasing the integrated offerings of **Sparsha Healthcare Group**:
1. **Sparsha Health Care Center** (Chikmagalur) — Naturopathy, Functional Medicine, Ayurveda, and Physiotherapy
2. **Sparsha Wellness Retreat** (Chikkolale, Chikmagalur) — Residential holistic rejuvenation programs
3. **Shustha Herbal Remedies** (Bangalore) — Clean Western Ghats botanicals and e-commerce shopping
4. **Sparsha Multicare Center** (Outer Ring Road, Bangalore) — Urban integrated healthcare

---

## Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
This runs both the **React Client** (port `3000`) and the **Express Server** (port `5000`) concurrently.

Open your browser at:
**[http://localhost:3000](http://localhost:3000)**

*(Alternatively, to run only the frontend independently: `npm run client`)*

---

## Core User Journeys Demonstrated

### 🌿 Journey 1: Healthcare & Consultation
`Home` ➔ `Care` ➔ Select a clinical discipline (Naturopathy, Functional Medicine, Ayurveda, etc.) ➔ `Learn More` modal ➔ `Book Consultation` ➔ Fill `Appointment` form ➔ Instant demo confirmation.

### ⛰️ Journey 2: Western Ghats Retreat
`Home` ➔ `Retreat` (Escape to Chikkolale) ➔ Explore programs (Restore, Renew, Reconnect) ➔ Click `Enquire About a Retreat` ➔ Form opens pre-filled with retreat selection ➔ Submit inquiry ➔ Recorded confirmation.

### 🛍️ Journey 3: Herbal Remedies & WhatsApp Direct Order
`Home` ➔ `Shop` ➔ Filter by category (Wellness, Digestive, Herbal, Lifestyle) ➔ View `Product Details` with botanical ingredients & usage ➔ `Add to Cart` / `Buy Now` / `Order via WhatsApp` ➔ `Cart` ➔ `Checkout` ➔ Submit delivery details ➔ **Automated WhatsApp Order Dispatch** (Opens pre-formatted message sent directly to Sparsha Healthcare) ➔ Order placed confirmation with Order ID `SP-2026-XXXX`.

### 📅 Journey 4: Admin Portal & Upcoming Events Management
`Footer` ➔ `Staff & Admin Portal` (or navigate to `/admin`) ➔ Log in with demo credentials (`admin@sparshahealth.com` / `sparsha2026`) ➔ Add, edit, or delete upcoming wellness events and retreats ➔ Live sync with the **Upcoming Events** section on the Home page.

---

## Project Structure

```
sparsha-healthcare-group/
├── server/
│   └── server.js               # Lightweight Express backend (mock endpoints)
├── src/
│   ├── components/             # Reusable UI components (Navbar, Footer, Hero, Cards, Modals, Toast)
│   ├── context/                # CartContext (local storage persistent cart)
│   ├── data/                   # Separated mock datasets (products, services, centers, retreat)
│   ├── pages/                  # 10 Application pages (Home, About, Care, Retreat, Shop, etc.)
│   ├── styles/                 # Pure CSS design system (Forest Green, Sage, Sand, Earth Gold)
│   ├── App.jsx                 # Routes & layout wrappers
│   └── main.jsx
├── index.html                  # Google Fonts & SEO meta tags
├── vite.config.js              # Vite configuration with proxy to server
└── package.json
```

---

## Brand Aesthetics & Color Palette

- **Deep Forest Green** (`#143324`, `#1B3F2E`) — Grounded natural healing
- **Sage Green** (`#5A7A66`, `#8EA696`) — Botanical calm
- **Warm Sand & Cream** (`#FAF8F4`, `#F3EFE6`) — Organic spaciousness
- **Earth Gold Accents** (`#C29B48`, `#D4AF37`) — Subtle luxury
- **Typography** — *Playfair Display* (Editorial Serif) paired with *Plus Jakarta Sans* (Clean Modern Sans)

---

## Demo Notice
This application is created for client concept and user experience demonstration. Inquiries and payments are handled via local interactive simulations without processing real bank transactions or storing sensitive patient records.
