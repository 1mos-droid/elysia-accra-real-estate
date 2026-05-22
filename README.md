# ELYSIA Accra Residences & Private Registry

Welcome to the digital private registry of **ELYSIA Accra Residences**, an elite residential showcase and real-time portfolio management console tailored for ultra-high-net-worth real estate enclaves in Accra (Cantonments, Airport Residential Area, and East Legon).

ELYSIA represents a masterclass in modern editorial design, combining dark mode aesthetics, glassmorphism, responsive animations, and a secure real-time decryption signature vault to manage a premium property portfolio on the fly.

---

## 💎 Features & Capabilities

### 1. The Secure Decryption Signature Vault 🔒
* **Passcode Pad Modal**: Access the admin console securely by clicking the lock `🔒` icon in the navigation header or the hidden **Registry Console** button in the footer.
* **passcode**: Enter **`1234`** on the visual numpad, or utilize the **⚡ Quick Demo Sign-In** bypass.
* **Keyboard Accessibility (Usability Refined!)**: Desktop users can type numerical digits (`0`-`9`), press `Backspace` to delete, or hit `Escape` to close the vault door naturally using physical keyboards.

### 2. Premium control center (Real-time Admin Console) 🎛️
* **Analytics Panel**: Pulsing live session visitor counters, active properties metrics, and a total **Portfolio Value Counter** dynamically calculated from active listings' prices.
* **Live Events Simulator**: Simulators for analytical visitor surges, property watch notices, and real-time leads. Standard oscillator audio chimes (Web Audio API) trigger luxurious chords to confirm alerts.
* **Listings CRUD Manager**: Add, update, and de-register masterpiece listings with bed/bath specifications, price tags, featured labels, and luxurypreset Unsplash imagery.
* **Consultation Inbox**: Intercept public lead submissions, review special layout requirements, and mark clients as contacted or wipe old database logs.
* **Global Site Settings (Keystroke-Safe)**: Directly modify Hero typography, phone lines, email addresses, bespoke lounge addresses, and announcement banners. A custom `quiet` update pathway prevents chime-spamming while you type.

### 3. Responsive Luxury Public Preview 📱
* **Typography & Styling**: Harman HSL dark mode styling, curated layouts, and sleek scroll animations.
* **Interactive Grid & Filtering**: Seamless category filtering (Villas, Penthouses, Duplexes) and animated card layouts driven by Framer Motion.
* **Announcements Marquee**: Scrolling gold announcement bar toggled dynamically by the admin.
* **Public Consultation Capture**: Elegant lead submission form that syncs instantly to the administrator inbox.

---

## 🛠️ Technology Stack

* **Core Framework**: React (v19) + Vite (v6)
* **Design & Styling**: Tailwind CSS, Vanilla CSS typography
* **Animations**: Framer Motion
* **Iconography**: Lucide React
* **Audio System**: Native browser `AudioContext` & Oscillators (no heavy sound files)
* **Real-time Engine & Persistence**: React Context State API + automated `localStorage` syncing

---

## 🚀 Getting Started & Local Development

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your system.

### 2. Installation
Clone or navigate to the workspace directory and install dependencies:
```bash
npm install
```

### 3. Run Development Server
Launch the local Vite server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
Verify typescript compliance and build the production bundle:
```bash
npm run build
```

---

## 📁 Directory Structure

```text
elysia-accra-real-estate/
├── src/
│   ├── components/
│   │   ├── AdminPanel.jsx      # Luxury control center (Overview, CRUD, Inbox, Settings)
│   │   ├── ContactForm.jsx     # Editorial consultation form with custom success toast
│   │   ├── Footer.jsx          # Public footer with hidden admin registry link
│   │   ├── Hero.jsx            # Editable luxury typography header
│   │   ├── Navbar.jsx          # Announcement bar, passcode modal, navigation links
│   │   ├── PropertiesGrid.jsx  # Dynamic real-time properties collection grid
│   │   └── StatsBanner.jsx     # Trust counters and dynamic indicators
│   ├── context/
│   │   └── AppContext.jsx      # Global state provider, local storage sync, audio oscillators
│   ├── data/
│   │   └── properties.js       # Luxury preset properties mock data
│   ├── App.jsx                 # Global views toggle, real-time alert toast overlay
│   ├── main.jsx                # React DOM entry wrapped in AppProvider
│   └── index.css               # Premium gold glow effects, gradients, and custom scrollbars
├── index.html                  # Core HTML template with Google Fonts (Cinzel, Montserrat)
├── package.json                # Project dependencies and build scripts
└── vite.config.js              # Vite compiler configuration
```

---

## 🔒 Security Signature
* Default verification passcode: **`1234`**
