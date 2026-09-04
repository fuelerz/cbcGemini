/* =====================================================================
   CBC GOA - BRANCH DIRECTORY & LOCAL STORAGE MANAGEMENT
   ===================================================================== */

const BRANCHES = [
  {
    id: 'panjim-mg',
    name: 'Panjim – M.G. Road',
    subtext: 'Alfran Plaza Branch',
    phone: '919423530182',
    formattedPhone: '+91 94235 30182',
    address: 'Shop No. 1, 5/6, Excelsior Chambers, M.G. Road, Panjim, Goa 403001',
    mapUrl: 'https://maps.google.com/?q=Classic+Business+Centre+MG+Road+Panaji+Goa',
    hours: { open: 9, close: 20 } // Mon-Sat 9 AM to 8 PM
  },
  {
    id: 'panjim-patto',
    name: 'Panjim – Patto Plaza',
    subtext: 'Kamat Towers Branch',
    phone: '918322950687',
    formattedPhone: '+91 83229 50687',
    address: 'Shop No. S-101, 1st Floor, EDC Patto Plaza, Panjim, Goa 403001',
    mapUrl: 'https://maps.google.com/?q=Classic+Business+Centre+EDC+Patto+Panaji',
    hours: { open: 9, close: 20 }
  },
  {
    id: 'mapusa',
    name: 'Mapusa',
    subtext: 'Municipal Council Area Branch',
    phone: '919767117867',
    formattedPhone: '+91 97671 17867',
    address: 'Shop No. 15-18, El-Capitan Centre, Near Municipal Council, Mapusa, Goa 403507',
    mapUrl: 'https://maps.google.com/?q=Classic+Business+Centre+El+Capitan+Centre+Mapusa+Goa',
    hours: { open: 9, close: 20 }
  },
  {
    id: 'porvorim',
    name: 'Porvorim',
    subtext: 'Housing Board Colony Branch',
    phone: '918322411786',
    formattedPhone: '+91 83224 11786',
    address: 'Shop No. D-20, Housing Board Colony, behind Pundalik Temple, Alto Porvorim, Goa 403521',
    mapUrl: 'https://maps.google.com/?q=Classic+Offset+Printers+Housing+Board+Colony+Alto+Porvorim+Goa',
    hours: { open: 9, close: 20 }
  }
];

// Determine if branch is currently open in Goa (IST: UTC+5:30)
function getBranchOpenStatus(hours) {
  const now = new Date();
  // Get IST time
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istTime = new Date(utc + (3600000 * 5.5));
  
  const currentHour = istTime.getHours();
  const day = istTime.getDay(); // 0 = Sunday

  if (day === 0) {
    return { isOpen: false, text: 'Closed Today (Sunday)' };
  }

  if (currentHour >= hours.open && currentHour < hours.close) {
    return { isOpen: true, text: 'Open Now (Closes 8 PM)' };
  } else if (currentHour < hours.open) {
    return { isOpen: false, text: 'Opening at 9 AM' };
  } else {
    return { isOpen: false, text: 'Closed (Opens 9 AM)' };
  }
}

// Get active branch from localStorage or default to Panjim Patto
function getActiveBranch() {
  const savedId = localStorage.getItem('cbc_selected_branch');
  const found = BRANCHES.find(b => b.id === savedId);
  return found || BRANCHES[1]; // Default to Patto Plaza
}

// Set active branch & update site context
function selectBranch(branchId) {
  const found = BRANCHES.find(b => b.id === branchId);
  if (found) {
    localStorage.setItem('cbc_selected_branch', found.id);
    updateSiteBranchContext();
    closeBranchModal();
  }
}

// Render dynamic elements
function updateSiteBranchContext() {
  const activeBranch = getActiveBranch();
  const status = getBranchOpenStatus(activeBranch.hours);

  // 1. Header Badge
  const headerName = document.getElementById('activeBranchName');
  if (headerName) headerName.textContent = activeBranch.name;

  // 2. Header & CTAs WhatsApp Links
  const headerWaBtn = document.getElementById('headerWhatsappBtn');
  if (headerWaBtn) {
    headerWaBtn.href = `https://wa.me/${activeBranch.phone}?text=${encodeURIComponent('Hello Classic Business Centre (' + activeBranch.name + '), I would like to inquire about printing services.')}`;
  }

  // 3. Hero Visual Status Card
  const heroDot = document.getElementById('heroBranchDot');
  const heroTitle = document.getElementById('heroBranchTitle');
  const heroStatus = document.getElementById('heroBranchStatus');

  if (heroDot && heroTitle && heroStatus) {
    heroTitle.textContent = activeBranch.name;
    heroStatus.textContent = status.text;
    if (status.isOpen) {
      heroDot.className = 'live-indicator-dot open';
    } else {
      heroDot.className = 'live-indicator-dot closed';
    }
  }

  // 4. Order Builder Submit Label
  const submitBtnLabel = document.getElementById('submitBranchBtnLabel');
  if (submitBtnLabel) submitBtnLabel.textContent = activeBranch.name;

  // 5. Footer Box
  const footerBox = document.getElementById('footerActiveBranchBox');
  if (footerBox) {
    footerBox.innerHTML = `
      <strong style="color: #F8FAFC;">📍 ${activeBranch.name}</strong>
      <p style="margin: 4px 0 8px; color: #94A3B8;">${activeBranch.address}</p>
      <div style="display: flex; gap: 8px; align-items: center;">
        <span class="status-tag ${status.isOpen ? 'open' : 'closed'}">${status.text}</span>
        <a href="https://wa.me/${activeBranch.phone}" target="_blank" style="color: #00AEEF; font-weight: 700; text-decoration: none;">Chat on WhatsApp</a>
      </div>
    `;
  }
}

// Render Gateway Modal Options
function renderModalBranches() {
  const container = document.getElementById('modalBranchList');
  if (!container) return;

  const current = getActiveBranch();

  container.innerHTML = BRANCHES.map(branch => {
    const status = getBranchOpenStatus(branch.hours);
    const isSelected = branch.id === current.id;

    return `
      <button class="branch-select-btn ${isSelected ? 'active-border' : ''}" onclick="selectBranch('${branch.id}')">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <strong style="font-size: 1rem; color: #0F172A;">${branch.name}</strong>
          <span class="status-tag ${status.isOpen ? 'open' : 'closed'}">${status.text}</span>
        </div>
        <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 6px;">${branch.subtext}</p>
        <span style="font-size: 0.78rem; font-weight: 700; color: #EC008C;">WhatsApp: ${branch.formattedPhone}</span>
      </button>
    `;
  }).join('');
}

// Render Directory Cards
function renderDirectoryBranches() {
  const container = document.getElementById('directoryBranchGrid');
  if (!container) return;

  container.innerHTML = BRANCHES.map(branch => {
    const status = getBranchOpenStatus(branch.hours);

    return `
      <div class="branch-dir-card">
        <div>
          <div class="branch-dir-header">
            <div>
              <h3>${branch.name}</h3>
              <span style="font-size: 0.82rem; color: #64748B;">${branch.subtext}</span>
            </div>
            <span class="status-tag ${status.isOpen ? 'open' : 'closed'}">${status.text}</span>
          </div>
          <p style="font-size: 0.9rem; color: #475569; margin: 12px 0;">${branch.address}</p>
          <p style="font-size: 0.88rem; font-weight: 700; color: #0F172A;">📞 Phone / WhatsApp: ${branch.formattedPhone}</p>
        </div>
        <div class="branch-dir-actions">
          <a href="https://wa.me/${branch.phone}?text=${encodeURIComponent('Hello ' + branch.name + ', I want to send a print order.')}" target="_blank" class="btn btn-magenta btn-sm">
            <span>💬 Send WhatsApp Order</span>
          </a>
          <a href="${branch.mapUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
            <span>🗺️ Get Directions</span>
          </a>
        </div>
      </div>
    `;
  }).join('');
}
