/* ============================================================
   PowerCalc — Calculator Logic
   ============================================================ */

/* ── Appliance Database ───────────────────────────────────── */
const APPLIANCES = [
  // HVAC & Climate
  { id: 'ac-central-3t',   name: 'Central A/C (3 ton)',       cat: 'hvac',    running: 3500, startup: 9800,  icon: '❄️' },
  { id: 'ac-central-2t',   name: 'Central A/C (2 ton)',       cat: 'hvac',    running: 2800, startup: 8000,  icon: '❄️' },
  { id: 'ac-central-15t',  name: 'Central A/C (1.5 ton)',     cat: 'hvac',    running: 2200, startup: 6500,  icon: '❄️' },
  { id: 'heat-pump-3t',    name: 'Heat Pump (3 ton)',          cat: 'hvac',    running: 4700, startup: 9400,  icon: '🌡️' },
  { id: 'ac-window-12k',   name: 'Window A/C (12,000 BTU)',   cat: 'hvac',    running: 1400, startup: 4200,  icon: '❄️' },
  { id: 'ac-window-8k',    name: 'Window A/C (8,000 BTU)',    cat: 'hvac',    running:  900, startup: 2700,  icon: '❄️' },
  { id: 'ac-window-5k',    name: 'Window A/C (5,000 BTU)',    cat: 'hvac',    running:  500, startup: 1500,  icon: '❄️' },
  { id: 'furnace-fan',     name: 'Furnace / Air Handler Fan', cat: 'hvac',    running:  800, startup: 2350,  icon: '🔥' },
  { id: 'space-heater',    name: 'Electric Space Heater',     cat: 'hvac',    running: 1500, startup: 1500,  icon: '🔥' },
  { id: 'ceiling-fan',     name: 'Ceiling Fan',               cat: 'hvac',    running:   75, startup:   75,  icon: '🌀' },
  { id: 'box-fan',         name: 'Box / Window Fan',          cat: 'hvac',    running:  200, startup:  200,  icon: '💨' },
  { id: 'dehumidifier',    name: 'Dehumidifier',              cat: 'hvac',    running:  785, startup:  800,  icon: '💧' },

  // Essential / Refrigeration
  { id: 'refrigerator',    name: 'Refrigerator (standard)',   cat: 'essential', running: 150, startup:  600, icon: '🧊' },
  { id: 'refrigerator-lg', name: 'Refrigerator (large/French door)', cat: 'essential', running: 200, startup: 800, icon: '🧊' },
  { id: 'freezer-chest',   name: 'Chest Freezer',            cat: 'essential', running:  90, startup:  500, icon: '🧊' },
  { id: 'freezer-upright', name: 'Upright Freezer',          cat: 'essential', running: 100, startup:  520, icon: '🧊' },
  { id: 'sump-pump-half',  name: 'Sump Pump (½ HP)',         cat: 'essential', running: 1050, startup: 2150, icon: '💦' },
  { id: 'sump-pump-third', name: 'Sump Pump (⅓ HP)',         cat: 'essential', running:  800, startup: 1300, icon: '💦' },
  { id: 'well-pump-half',  name: 'Well Pump (½ HP)',         cat: 'essential', running: 1000, startup: 2100, icon: '🚰' },
  { id: 'well-pump-3q',    name: 'Well Pump (¾ HP)',         cat: 'essential', running: 1500, startup: 3200, icon: '🚰' },
  { id: 'cpap',            name: 'CPAP Machine',             cat: 'essential', running:   30, startup:   30, icon: '😴' },
  { id: 'oxygen-conc',     name: 'Oxygen Concentrator',      cat: 'essential', running:  300, startup:  600, icon: '🏥' },

  // Kitchen
  { id: 'microwave',       name: 'Microwave',                cat: 'kitchen', running: 1000, startup: 1000, icon: '📡' },
  { id: 'coffee-maker',    name: 'Coffee Maker',             cat: 'kitchen', running: 1000, startup: 1000, icon: '☕' },
  { id: 'toaster',         name: 'Toaster',                  cat: 'kitchen', running:  850, startup:  850, icon: '🍞' },
  { id: 'electric-range',  name: 'Electric Range (1 burner)',cat: 'kitchen', running: 1500, startup: 1500, icon: '🍳' },
  { id: 'blender',         name: 'Blender',                  cat: 'kitchen', running:  300, startup:  800, icon: '🥤' },
  { id: 'dishwasher',      name: 'Dishwasher',               cat: 'kitchen', running: 1500, startup: 1500, icon: '🍽️' },

  // Lighting & Electronics
  { id: 'led-lights',      name: 'LED Lights (10-pack)',     cat: 'electronics', running:  100, startup:  100, icon: '💡' },
  { id: 'fluor-lights',    name: 'Fluorescent Lights (4)',   cat: 'electronics', running:  200, startup:  200, icon: '💡' },
  { id: 'tv-50',           name: 'TV — 50" LED',             cat: 'electronics', running:  100, startup:  100, icon: '📺' },
  { id: 'laptop',          name: 'Laptop Computer',          cat: 'electronics', running:   50, startup:   50, icon: '💻' },
  { id: 'desktop-pc',      name: 'Desktop Computer',         cat: 'electronics', running:  200, startup:  550, icon: '🖥️' },
  { id: 'phone-charger',   name: 'Phone / Tablet Charger',   cat: 'electronics', running:   10, startup:   10, icon: '📱' },
  { id: 'router',          name: 'Internet Router / Modem',  cat: 'electronics', running:   20, startup:   20, icon: '📶' },

  // Laundry & Water
  { id: 'washer',          name: 'Washing Machine',          cat: 'laundry', running:  500, startup: 2300, icon: '🫧' },
  { id: 'dryer-electric',  name: 'Electric Dryer',           cat: 'laundry', running: 5400, startup: 6750, icon: '♨️' },
  { id: 'dryer-gas',       name: 'Gas Dryer (motor only)',   cat: 'laundry', running:  700, startup: 1800, icon: '♨️' },
  { id: 'water-heater',    name: 'Electric Water Heater',    cat: 'laundry', running: 4500, startup: 4500, icon: '🚿' },

  // Power Tools & Garage
  { id: 'circ-saw',        name: 'Circular Saw (7¼")',       cat: 'tools', running: 1400, startup: 2300, icon: '🪚' },
  { id: 'power-drill',     name: 'Power Drill',              cat: 'tools', running:  600, startup:  900, icon: '🔧' },
  { id: 'air-compressor',  name: 'Air Compressor (1 HP)',    cat: 'tools', running: 1500, startup: 4500, icon: '⚙️' },
  { id: 'shop-vac',        name: 'Shop Vacuum',              cat: 'tools', running: 1000, startup: 2000, icon: '🌀' },
  { id: 'garage-door',     name: 'Garage Door Opener',       cat: 'tools', running:  350, startup: 1200, icon: '🏠' },
  { id: 'ev-charger-l1',   name: 'EV Charger (Level 1)',     cat: 'tools', running: 1440, startup: 1440, icon: '⚡' },
];

const CATEGORIES = {
  all:         { label: 'All Appliances', icon: '⚡' },
  essential:   { label: 'Essential',      icon: '🧊' },
  hvac:        { label: 'HVAC & Climate', icon: '❄️' },
  kitchen:     { label: 'Kitchen',        icon: '🍳' },
  electronics: { label: 'Electronics',   icon: '📺' },
  laundry:     { label: 'Laundry & Water', icon: '🫧' },
  tools:       { label: 'Tools & Garage', icon: '🔧' },
};

/* Standard generator sizes (watts) */
const GENERATOR_SIZES = [
  { watts: 2000,  label: '2,000W',  type: 'Portable Inverter' },
  { watts: 3000,  label: '3,000W',  type: 'Portable' },
  { watts: 3500,  label: '3,500W',  type: 'Portable' },
  { watts: 4000,  label: '4,000W',  type: 'Portable' },
  { watts: 5500,  label: '5,500W',  type: 'Portable' },
  { watts: 7000,  label: '7,000W',  type: 'Portable' },
  { watts: 8500,  label: '8,500W',  type: 'Portable' },
  { watts: 10000, label: '10,000W', type: 'Portable / Home Standby' },
  { watts: 12000, label: '12,000W', type: 'Home Standby' },
  { watts: 14000, label: '14,000W', type: 'Home Standby' },
  { watts: 17500, label: '17,500W', type: 'Home Standby' },
  { watts: 20000, label: '20,000W', type: 'Home Standby' },
];

/* ── Generator Size Calculator ────────────────────────────── */
class GeneratorCalculator {
  constructor(containerId) {
    this.container    = document.getElementById(containerId);
    if (!this.container) return;
    this.selectedItems = {}; // { id: quantity }
    this.activeCategory = 'all';
    this.init();
  }

  init() {
    this.renderCategoryTabs();
    this.renderApplianceList();
    this.renderSelectedList();
    this.renderResults();

    this.container.querySelector('.calc-btn-clear')
      ?.addEventListener('click', () => this.clearAll());
  }

  renderCategoryTabs() {
    const wrap = this.container.querySelector('.appliance-categories');
    if (!wrap) return;
    wrap.innerHTML = '';
    Object.entries(CATEGORIES).forEach(([key, cat]) => {
      const btn = document.createElement('button');
      btn.className = 'cat-btn' + (key === this.activeCategory ? ' active' : '');
      btn.dataset.cat = key;
      btn.textContent = cat.label;
      btn.addEventListener('click', () => {
        this.activeCategory = key;
        wrap.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderApplianceList();
      });
      wrap.appendChild(btn);
    });
  }

  renderApplianceList() {
    const list = this.container.querySelector('.appliance-list');
    if (!list) return;
    const filtered = this.activeCategory === 'all'
      ? APPLIANCES
      : APPLIANCES.filter(a => a.cat === this.activeCategory);

    list.innerHTML = '';
    filtered.forEach(app => {
      const qty = this.selectedItems[app.id] || 0;
      const el  = document.createElement('div');
      el.className = 'appliance-item' + (qty > 0 ? ' selected' : '');
      el.dataset.id = app.id;
      el.innerHTML = `
        <div class="appliance-item-icon">${app.icon}</div>
        <div class="appliance-item-info">
          <div class="appliance-item-name">${app.name}</div>
          <div class="appliance-item-watts">${fmtW(app.running)} run · ${fmtW(app.startup)} start</div>
        </div>
        <div class="qty-control">
          <button class="qty-btn qty-minus" aria-label="Decrease">−</button>
          <span class="qty-display">${qty}</span>
          <button class="qty-btn qty-plus" aria-label="Increase">+</button>
        </div>`;

      el.querySelector('.qty-plus').addEventListener('click', e => {
        e.stopPropagation();
        this.setQty(app.id, (this.selectedItems[app.id] || 0) + 1);
      });
      el.querySelector('.qty-minus').addEventListener('click', e => {
        e.stopPropagation();
        const cur = this.selectedItems[app.id] || 0;
        if (cur > 0) this.setQty(app.id, cur - 1);
      });
      el.addEventListener('click', () => {
        if (!this.selectedItems[app.id]) this.setQty(app.id, 1);
      });
      list.appendChild(el);
    });
  }

  setQty(id, qty) {
    if (qty <= 0) {
      delete this.selectedItems[id];
    } else {
      this.selectedItems[id] = qty;
    }
    this.renderApplianceList();
    this.renderSelectedList();
    this.renderResults();
  }

  renderSelectedList() {
    const wrap = this.container.querySelector('.selected-list');
    if (!wrap) return;
    const keys = Object.keys(this.selectedItems);

    if (keys.length === 0) {
      wrap.innerHTML = `<div class="empty-selection">⚡ Add appliances above to begin calculating</div>`;
      return;
    }

    wrap.innerHTML = '';
    keys.forEach(id => {
      const app = APPLIANCES.find(a => a.id === id);
      if (!app) return;
      const qty = this.selectedItems[id];
      const totalRunning = app.running * qty;
      const el = document.createElement('div');
      el.className = 'selected-item';
      el.innerHTML = `
        <div class="selected-item-left">
          <span>${app.icon}</span>
          <div>
            <div class="selected-item-name">${qty > 1 ? `${qty}× ` : ''}${app.name}</div>
            <div class="selected-item-watts">${fmtW(totalRunning)} running · ${fmtW(app.startup * qty)} peak start</div>
          </div>
        </div>
        <div class="selected-item-right">
          <div class="qty-control">
            <button class="qty-btn qty-minus" aria-label="Decrease">−</button>
            <span class="qty-display">${qty}</span>
            <button class="qty-btn qty-plus" aria-label="Increase">+</button>
          </div>
          <button class="remove-btn" aria-label="Remove">✕</button>
        </div>`;

      el.querySelector('.qty-plus').addEventListener('click', () => this.setQty(id, qty + 1));
      el.querySelector('.qty-minus').addEventListener('click', () => { if (qty > 1) this.setQty(id, qty - 1); });
      el.querySelector('.remove-btn').addEventListener('click', () => this.setQty(id, 0));
      wrap.appendChild(el);
    });
  }

  calcLoad() {
    let totalRunning = 0;
    let maxSurge     = 0; // Highest single-item surge delta

    Object.entries(this.selectedItems).forEach(([id, qty]) => {
      const app = APPLIANCES.find(a => a.id === id);
      if (!app) return;
      totalRunning += app.running * qty;
      // Surge = startup watts of this item (not delta), times qty
      // We take the worst-case surge item
      const itemSurge = app.startup * qty;
      if (itemSurge > maxSurge) maxSurge = itemSurge;
    });

    // Peak load = all running + surge from worst motor item - its running (since it's already counted)
    // Simplified industry method: running total + highest single surge delta
    const maxSurgeDelta = (() => {
      let delta = 0;
      Object.entries(this.selectedItems).forEach(([id, qty]) => {
        const app = APPLIANCES.find(a => a.id === id);
        if (!app) return;
        const d = (app.startup - app.running) * qty;
        if (d > delta) delta = d;
      });
      return delta;
    })();

    const peakLoad = totalRunning + maxSurgeDelta;
    const recommended = Math.ceil(peakLoad * 1.2 / 500) * 500; // round up to nearest 500W with 20% buffer

    // Find the best fitting standard size
    const standardSize = GENERATOR_SIZES.find(s => s.watts >= recommended) || GENERATOR_SIZES[GENERATOR_SIZES.length - 1];

    return { totalRunning, maxSurgeDelta, peakLoad, recommended, standardSize };
  }

  renderResults() {
    const panel = this.container.querySelector('.results-panel');
    if (!panel) return;

    const keys = Object.keys(this.selectedItems);
    if (keys.length === 0) {
      panel.classList.add('hidden');
      return;
    }

    panel.classList.remove('hidden');
    const { totalRunning, maxSurgeDelta, peakLoad, recommended, standardSize } = this.calcLoad();

    panel.querySelector('.stat-running').textContent  = fmtW(totalRunning);
    panel.querySelector('.stat-surge').textContent    = fmtW(maxSurgeDelta);
    panel.querySelector('.stat-peak').textContent     = fmtW(peakLoad);
    panel.querySelector('.stat-buffer').textContent   = fmtW(recommended);
    panel.querySelector('.rec-size').textContent      = standardSize.label;
    panel.querySelector('.rec-type').textContent      = standardSize.type;

    const surgeWarn = panel.querySelector('.surge-warning');
    if (maxSurgeDelta > 1000) {
      surgeWarn.style.display = 'flex';
      surgeWarn.querySelector('.surge-app').textContent = `${fmtW(maxSurgeDelta)} startup surge`;
    } else {
      surgeWarn.style.display = 'none';
    }
  }

  clearAll() {
    this.selectedItems = {};
    this.renderApplianceList();
    this.renderSelectedList();
    this.renderResults();
  }
}

/* ── Runtime Estimator ────────────────────────────────────── */
class RuntimeCalculator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.init();
  }

  init() {
    // Fuel consumption lookup table (gal/hr at 50% load) by rated wattage
    // Source: manufacturer avg data
    this.fuelRates = [
      { watts: 2000,  rate: 0.13 },
      { watts: 3000,  rate: 0.17 },
      { watts: 3500,  rate: 0.20 },
      { watts: 4000,  rate: 0.23 },
      { watts: 5500,  rate: 0.28 },
      { watts: 6500,  rate: 0.33 },
      { watts: 7000,  rate: 0.38 },
      { watts: 8500,  rate: 0.44 },
      { watts: 10000, rate: 0.50 },
      { watts: 12000, rate: 0.63 },
    ];

    const inputs = ['#rt-watts','#rt-tank','#rt-load','#rt-fuel-price'];
    inputs.forEach(sel => {
      const el = this.container.querySelector(sel);
      if (el) el.addEventListener('input', () => this.calculate());
    });

    // Update slider display (supports both id variants)
    const slider = this.container.querySelector('#rt-load');
    const sliderVal = this.container.querySelector('#rt-load-display, #rt-load-val');
    if (slider) {
      slider.addEventListener('input', () => {
        if (sliderVal) sliderVal.textContent = slider.value + '%';
        this.calculate();
      });
    }

    // Wire calculate button if present
    const btn = this.container.querySelector('#rt-calc-btn');
    if (btn) btn.addEventListener('click', () => this.calculate());
  }

  calculate() {
    const watts      = parseFloat(this.container.querySelector('#rt-watts')?.value) || 0;
    const tank       = parseFloat(this.container.querySelector('#rt-tank')?.value) || 0;
    const loadPct    = parseFloat(this.container.querySelector('#rt-load')?.value) || 50;
    const fuelPrice  = parseFloat(this.container.querySelector('#rt-fuel-price')?.value) || 3.50;

    if (!watts || !tank) return;

    // Find nearest fuel rate and interpolate
    const entry = this.fuelRates.reduce((prev, curr) =>
      Math.abs(curr.watts - watts) < Math.abs(prev.watts - watts) ? curr : prev
    );

    // Adjust base rate for load percentage (roughly linear)
    const loadFactor  = loadPct / 50;
    const gph         = entry.rate * loadFactor;
    const runtime_hrs = tank / gph;
    const days        = runtime_hrs / 24;
    const dailyCost   = gph * 24 * fuelPrice;
    const totalGals   = gph * runtime_hrs;

    this.setOutput('#rt-result-gph',     gph.toFixed(2) + ' gal/hr');
    this.setOutput('#rt-result-runtime', runtime_hrs.toFixed(1) + ' hrs');
    this.setOutput('#rt-result-days',    days.toFixed(1) + ' days');
    this.setOutput('#rt-result-cost',    '$' + dailyCost.toFixed(2) + '/day');

    // Show results panel
    const panel = this.container.querySelector('#rt-results, .results-panel');
    if (panel) panel.classList.remove('hidden');
  }

  setOutput(sel, val) {
    const el = this.container.querySelector(sel);
    if (el) el.textContent = val;
  }
}

/* ── Fuel Cost Calculator ─────────────────────────────────── */
class FuelCostCalculator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.init();
  }

  init() {
    ['#fc-watts','#fc-hours','#fc-days','#fc-fuel-price'].forEach(sel => {
      const el = this.container.querySelector(sel);
      if (el) el.addEventListener('input', () => this.calculate());
    });
    // Wire calculate button if present
    const btn = this.container.querySelector('#fc-calc-btn');
    if (btn) btn.addEventListener('click', () => this.calculate());
  }

  getGph(watts) {
    // Approx gas consumption at full load: ~10,000 BTU/hp, generator ~0.06 gal/kWh at 50% efficiency
    // Simplified: 0.5 gal/hr per 1000W at rated load (conservative)
    return (watts / 12000) + 0.12;
  }

  calculate() {
    const watts     = parseFloat(this.container.querySelector('#fc-watts')?.value) || 0;
    const hoursDay  = parseFloat(this.container.querySelector('#fc-hours')?.value) || 8;
    const days      = parseFloat(this.container.querySelector('#fc-days')?.value) || 1;
    const fuelPrice = parseFloat(this.container.querySelector('#fc-fuel-price')?.value) || 3.50;

    if (!watts) return;

    const gph           = this.getGph(watts);
    const dailyGals     = gph * hoursDay;
    const dailyCost     = dailyGals * fuelPrice;
    const totalGals     = dailyGals * days;
    const totalCost     = totalGals * fuelPrice;
    const weeklyCost    = dailyCost * 7;

    this.setOutput('#fc-gph',          gph.toFixed(2) + ' gal/hr');
    this.setOutput('#fc-daily-gals',   dailyGals.toFixed(2) + ' gal');
    this.setOutput('#fc-daily-cost',   '$' + dailyCost.toFixed(2));
    this.setOutput('#fc-weekly-cost',  '$' + weeklyCost.toFixed(2));
    this.setOutput('#fc-total-cost',   '$' + totalCost.toFixed(2));

    // Summary line in recommendation box
    const totalGalsEl = this.container.querySelector('#fc-total-gals');
    if (totalGalsEl) totalGalsEl.textContent = totalGals.toFixed(1) + ' gallons total';
    const daysSpan = this.container.querySelector('#fc-days-span');
    if (daysSpan) daysSpan.textContent = days;
    const hrsSpan = this.container.querySelector('#fc-hours-span');
    if (hrsSpan) hrsSpan.textContent = hoursDay;

    // Show results panel
    const panel = this.container.querySelector('#fc-results, .results-panel');
    if (panel) panel.classList.remove('hidden');
  }

  setOutput(sel, val) {
    const el = this.container.querySelector(sel);
    if (el) el.textContent = val;
  }
}

/* ── Extension Cord Calculator ────────────────────────────── */
class ExtCordCalculator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.init();
  }

  // AWG recommendation matrix [wattage threshold][length category]
  // Returns { gauge, label, safe, ampacity }
  getGauge(watts, lengthFt) {
    const amps = watts / 120;

    if (lengthFt <= 25) {
      if (amps <= 10) return { gauge: 16, label: '16 AWG', safe: true,  desc: 'Light duty — adequate for this load.' };
      if (amps <= 13) return { gauge: 14, label: '14 AWG', safe: true,  desc: 'Medium duty — recommended for this load.' };
      if (amps <= 15) return { gauge: 12, label: '12 AWG', safe: true,  desc: 'Heavy duty — required for this load.' };
      return           { gauge: 10, label: '10 AWG', safe: amps <= 20, desc: 'Extra-heavy duty — required. Consider a hardwired circuit.' };
    } else if (lengthFt <= 50) {
      if (amps <= 7)  return { gauge: 16, label: '16 AWG', safe: true,  desc: 'Adequate for this load at this length.' };
      if (amps <= 10) return { gauge: 14, label: '14 AWG', safe: true,  desc: 'Medium duty — recommended at this length.' };
      if (amps <= 13) return { gauge: 12, label: '12 AWG', safe: true,  desc: 'Heavy duty — required at this length.' };
      return           { gauge: 10, label: '10 AWG', safe: amps <= 20, desc: 'Extra-heavy required. Keep length as short as possible.' };
    } else if (lengthFt <= 100) {
      if (amps <= 5)  return { gauge: 16, label: '16 AWG', safe: true,  desc: 'Adequate — but heavier gauge is better at this distance.' };
      if (amps <= 7)  return { gauge: 14, label: '14 AWG', safe: true,  desc: 'Minimum recommended at 100 ft.' };
      if (amps <= 10) return { gauge: 12, label: '12 AWG', safe: true,  desc: 'Heavy duty — recommended at 100 ft.' };
      return           { gauge: 10, label: '10 AWG', safe: amps <= 15, desc: 'Extra-heavy required at 100 ft. Shorten cord run if possible.' };
    } else {
      // Over 100 ft always step up
      if (amps <= 7)  return { gauge: 12, label: '12 AWG', safe: true,  desc: 'Minimum for runs over 100 ft.' };
      if (amps <= 10) return { gauge: 10, label: '10 AWG', safe: true,  desc: 'Heavy duty — required over 100 ft for this load.' };
      return           { gauge: 8,  label: '8 AWG',  safe: amps <= 20, desc: 'Very heavy load over long distance. Use a hardwired drop cord.' };
    }
  }

  init() {
    ['#ec-watts','#ec-length','#ec-voltage'].forEach(sel => {
      const el = this.container.querySelector(sel);
      if (el) el.addEventListener('input', () => this.calculate());
    });
    // Wire calculate button if present
    const btn = this.container.querySelector('#ec-calc-btn');
    if (btn) btn.addEventListener('click', () => this.calculate());
  }

  calculate() {
    const watts   = parseFloat(this.container.querySelector('#ec-watts')?.value) || 0;
    const length  = parseFloat(this.container.querySelector('#ec-length')?.value) || 25;
    const voltage = parseFloat(this.container.querySelector('#ec-voltage')?.value) || 120;

    if (!watts) return;

    const amps   = watts / voltage;
    const result = this.getGauge(watts, length);

    // Show results container
    const resultsDiv = this.container.querySelector('#ec-results');
    if (resultsDiv) resultsDiv.classList.remove('hidden');

    // Populate gauge box
    const box = this.container.querySelector('.gauge-result, #ec-gauge-box');
    if (!box) return;

    box.className = 'gauge-result ' + (result.safe ? 'good' : 'danger');

    const numEl  = box.querySelector('.gauge-num, #ec-gauge-num');
    const lblEl  = box.querySelector('.gauge-label, #ec-gauge-label');
    const descEl = box.querySelector('.gauge-desc, #ec-gauge-desc');
    const ampsEl = box.querySelector('.gauge-amps, #ec-gauge-amps');

    if (numEl)  numEl.textContent  = result.gauge + ' AWG';
    if (lblEl)  lblEl.textContent  = result.label;
    if (ampsEl) ampsEl.textContent = amps.toFixed(1) + ' A';
    if (descEl) descEl.textContent = result.safe
      ? result.desc
      : '⚠️ Unsafe — this load exceeds recommended limits at this length. Use direct wiring or a shorter, heavier cord.';

    // Voltage drop warning for long runs at high loads
    const vdropNotice = this.container.querySelector('#ec-vdrop-notice');
    const vdropText   = this.container.querySelector('#ec-vdrop-text');
    if (vdropNotice) {
      if (length >= 100 && amps > 10) {
        vdropNotice.style.display = 'flex';
        if (vdropText) vdropText.textContent =
          `At ${length} ft with ${amps.toFixed(1)}A load, expect 3–5% voltage drop on a ${result.gauge} AWG cord. Consider shortening the cord run or stepping up to ` +
          (result.gauge - 2) + ` AWG to reduce voltage drop below 2%.`;
      } else {
        vdropNotice.style.display = 'none';
      }
    }
  }
}

/* ── Helpers ──────────────────────────────────────────────── */
function formatWatts(w) {
  if (w >= 1000) {
    const kw = w / 1000;
    return kw % 1 === 0 ? kw + ' kW' : kw.toFixed(1) + ' kW';
  }
  return w + 'W';
}

function fmtW(w) { return formatWatts(w); }

/* ── FAQ Accordion ────────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item  = btn.closest('.faq-item');
      const open  = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      // Toggle clicked
      if (!open) item.classList.add('open');
    });
  });
}

/* ── Smooth scroll / active nav ───────────────────────────── */
function initNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
}

/* ── Mobile Nav Toggle ────────────────────────────────────── */
function initMobileNav() {
  const btn = document.getElementById('nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = nav.classList.toggle('nav-open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when a nav link is clicked
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside the header
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-header')) {
      nav.classList.remove('nav-open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Auto-init ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  initNav();
  initMobileNav();
  initCookieBanner();

  if (document.getElementById('gen-calc'))
    new GeneratorCalculator('gen-calc');

  if (document.getElementById('runtime-calc'))
    new RuntimeCalculator('runtime-calc');

  if (document.getElementById('fuel-cost-calc'))
    new FuelCostCalculator('fuel-cost-calc');

  if (document.getElementById('ext-cord-calc'))
    new ExtCordCalculator('ext-cord-calc');
});

/* ── Cookie Consent Banner ────────────────────────────────── */
function initCookieBanner() {
  const STORAGE_KEY = 'hgc_cookie_consent';
  const consent = localStorage.getItem(STORAGE_KEY);
  if (consent) return; // already decided

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = `
    <p>
      We use cookies to serve relevant ads via Google AdSense and to remember
      your preferences. No personal data is collected by PowerCalc directly.
      <a href="/privacy.html">Learn more</a>
    </p>
    <div class="cookie-actions">
      <button class="cookie-btn-reject" id="cookie-reject">Reject Non-Essential</button>
      <button class="cookie-btn-accept" id="cookie-accept">Accept All Cookies</button>
    </div>
  `;
  document.body.appendChild(banner);

  document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    banner.remove();
  });

  document.getElementById('cookie-reject').addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    banner.remove();
    // When AdSense is live, set data-npa="1" on the ad tag to request
    // non-personalized ads for users who reject consent.
  });
}
