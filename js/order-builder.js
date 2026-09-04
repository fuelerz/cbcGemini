/* =====================================================================
   CBC GOA - INTERACTIVE WHATSAPP ORDER SPECS BUILDER
   ===================================================================== */

let selectedFile = null;

function handleFileSelect(e) {
  const files = e.target.files;
  if (files && files[0]) {
    selectedFile = files[0];
    const dropzoneContent = document.getElementById('dropzoneContent');
    if (dropzoneContent) {
      dropzoneContent.innerHTML = `
        <span class="upload-icon">✅</span>
        <strong style="color: #00AEEF;">File Ready: ${selectedFile.name}</strong>
        <small>(${Math.round(selectedFile.size / 1024)} KB) - Will be referenced in WhatsApp text!</small>
      `;
    }
  }
}

function handleOrderSubmit(e) {
  e.preventDefault();

  const activeBranch = getActiveBranch();
  const category = document.getElementById('orderCategory').value;
  const finish = document.getElementById('orderFinish').value;
  const colorMode = document.querySelector('input[name="colorMode"]:checked').value;
  const size = document.getElementById('orderSize').value || 'Standard';
  const qty = document.getElementById('orderQty').value || '1';
  const notes = document.getElementById('orderNotes').value || 'None';
  const fileName = selectedFile ? selectedFile.name : 'Attaching file directly in chat';

  // Construct structured text message
  const textMessage = 
`*CLASSIC BUSINESS CENTRE - PRINT JOB ORDER SPECS*
--------------------------------------------
📍 *Destination Branch:* ${activeBranch.name}
📂 *Service Category:* ${category}
✨ *Finish / Material:* ${finish}
🎨 *Color Mode:* ${colorMode}
📐 *Dimensions/Size:* ${size}
🔢 *Quantity:* ${qty}
📎 *Attached Document:* ${fileName}
📝 *Special Notes:* ${notes}
--------------------------------------------
*Note:* Custom paper weights & specialized media available at counter.
Please confirm availability and estimated turnaround.`;

  const waUrl = `https://wa.me/${activeBranch.phone}?text=${encodeURIComponent(textMessage)}`;
  
  // Launch WhatsApp directly targeting the active branch
  window.open(waUrl, '_blank', 'noopener');
}

function updateFinishOptions() {
  const cat = document.getElementById('orderCategory').value;
  const finishSelect = document.getElementById('orderFinish');
  
  if (!finishSelect) return;

  if (cat === 'Sticker / Decal') {
    finishSelect.value = 'Waterproof Sticker Vinyl';
  } else if (cat === 'Large Format Banner') {
    finishSelect.value = 'Heavy Duty Flex';
  } else if (cat === 'Architectural Blueprint') {
    finishSelect.value = 'Translucent Tracing Paper';
  } else if (cat === 'Hard Binding') {
    finishSelect.value = 'Hardcover Gold Embossed';
  }
}
