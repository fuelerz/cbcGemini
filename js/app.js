/* =====================================================================
   CBC GOA - MAIN APP LOGIC & INTERACTION CONTROLLERS
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Check if first-load modal lock is needed
  if (!localStorage.getItem('cbc_selected_branch')) {
    openBranchModal();
  } else {
    updateSiteBranchContext();
  }

  renderModalBranches();
  renderDirectoryBranches();
});

// Modal Controllers
function openBranchModal() {
  const modal = document.getElementById('branchModal');
  if (modal) {
    modal.classList.remove('hidden');
    renderModalBranches();
  }
}

function closeBranchModal() {
  const modal = document.getElementById('branchModal');
  if (modal) modal.classList.add('hidden');
}

// 404 Error Simulation Modal
function open404Modal() {
  const modal = document.getElementById('error404Modal');
  if (modal) modal.classList.remove('hidden');
}

function close404Modal() {
  const modal = document.getElementById('error404Modal');
  if (modal) modal.classList.add('hidden');
}

// Accordion Toggle
function toggleAccordion(buttonEl) {
  const parent = buttonEl.parentElement;
  const isActive = parent.classList.contains('active');

  // Close all adjacent accordion items in same wrapper
  const wrapper = parent.parentElement;
  const items = wrapper.querySelectorAll('.accordion-item');
  items.forEach(item => item.classList.remove('active'));

  if (!isActive) {
    parent.classList.add('active');
  }
}
