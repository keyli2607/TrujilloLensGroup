/* ==========================================================================
   LENS GROUP TRUJILLO — VISOR INTERACTIVO 3D Y 360° DE PRODUCTOS
   Permite a los clientes girar los lentes en todos los ángulos (horizontal, vertical,
   perspectiva 3D, reflejo de lunas y auto-rotación orbital).
   ========================================================================== */

let activeProduct = null;

// Estado del visor 3D
let viewerState = {
  rotX: 0,        // Inclinación vertical (-35 a 35 deg)
  rotY: 0,        // Rotación horizontal 360° libre
  zoom: 1,        // Escala (1x a 2.5x)
  isDragging: false,
  startX: 0,
  startY: 0,
  isAutoSpinning: false,
  spinInterval: null,
  activeAngle: 'frontal'
};

// Ángulos predefinidos rápidos
const PRESET_ANGLES = {
  frontal: { rotX: 0, rotY: 0 },
  semilateral: { rotX: -6, rotY: 38 },
  perfil: { rotX: 2, rotY: 82 },
  arriba: { rotX: -28, rotY: 15 }
};

function openProductModal(productId) {
  activeProduct = PRODUCTS.find(p => p.id === productId);
  if (!activeProduct) return;

  const modal = document.getElementById('productModal');
  const imgEl = document.getElementById('modalZoomImage');
  const brandEl = document.getElementById('modalBrand');
  const titleEl = document.getElementById('modalTitle');
  const descEl = document.getElementById('modalDesc');
  const priceEl = document.getElementById('modalPrice');
  const oldPriceEl = document.getElementById('modalOldPrice');
  const tagEl = document.getElementById('modalTag');
  const specsListEl = document.getElementById('modalSpecsList');
  const waBtn = document.getElementById('modalWhatsAppBtn');

  // Cargar contenido textual
  imgEl.src = activeProduct.image;
  imgEl.alt = activeProduct.name;
  brandEl.textContent = `${activeProduct.brand} • ${activeProduct.categoryLabel}`;
  titleEl.textContent = activeProduct.name;
  descEl.textContent = activeProduct.description;
  priceEl.textContent = `S/ ${activeProduct.price}`;
  
  if (activeProduct.oldPrice) {
    oldPriceEl.textContent = `S/ ${activeProduct.oldPrice}`;
    oldPriceEl.style.display = 'inline';
  } else {
    oldPriceEl.style.display = 'none';
  }

  tagEl.textContent = activeProduct.tag;

  // Renderizar especificaciones técnicas
  const details = activeProduct.details;
  specsListEl.innerHTML = `
    <div class="modal-spec-row">
      <span class="modal-spec-label">Material de Montura</span>
      <span class="modal-spec-value">${details.material}</span>
    </div>
    <div class="modal-spec-row">
      <span class="modal-spec-label">Tratamiento de Cristales</span>
      <span class="modal-spec-value">${details.lenses}</span>
    </div>
    <div class="modal-spec-row">
      <span class="modal-spec-label">Nivel de Protección</span>
      <span class="modal-spec-value">${details.protection}</span>
    </div>
    <div class="modal-spec-row">
      <span class="modal-spec-label">Dimensiones Oficiales</span>
      <span class="modal-spec-value">${details.measurements}</span>
    </div>
    <div class="modal-spec-row">
      <span class="modal-spec-label">Accesorios Incluidos</span>
      <span class="modal-spec-value">${details.included}</span>
    </div>
  `;

  // Botón WhatsApp con enlace de cotización directa
  waBtn.href = buildWhatsAppProductLink(activeProduct);

  // Mostrar modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Inicializar o resetear motor 3D
  resetViewer3D();
  init3DControls();
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  stopAutoSpin();
}

/* --------------------------------------------------------------------------
   MOTOR Y CONTROLES DEL VISOR 3D
   -------------------------------------------------------------------------- */
function apply3DTransform() {
  const obj = document.getElementById('glasses3dObject');
  const shadow = document.getElementById('glasses3dShadow');
  const refl = document.getElementById('specularReflection');
  if (!obj) return;

  const { rotX, rotY, zoom } = viewerState;

  // Transformación 3D del objeto de los lentes
  obj.style.transform = `scale(${zoom}) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

  // Simulación dinámica de sombra y reflejo de luz ambiental según rotación
  if (shadow) {
    const shadowX = Math.sin((rotY * Math.PI) / 180) * 25;
    const shadowScale = 1 - Math.abs(rotX) / 100;
    shadow.style.transform = `translateX(${shadowX}px) rotateX(85deg) scale(${shadowScale * zoom})`;
    shadow.style.opacity = Math.max(0.2, 0.45 - Math.abs(rotX) / 150);
  }

  if (refl) {
    const reflOffset = (rotY % 180) * 1.5;
    refl.style.transform = `translateX(${reflOffset}px) rotate(${rotX * 0.4}deg)`;
    refl.style.opacity = 0.35 + Math.cos((rotY * Math.PI) / 90) * 0.25;
  }
}

function setAnglePreset(angleKey) {
  const preset = PRESET_ANGLES[angleKey];
  if (!preset) return;

  viewerState.activeAngle = angleKey;
  viewerState.rotX = preset.rotX;
  viewerState.rotY = preset.rotY;

  // Actualizar botones activos
  document.querySelectorAll('.view-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-angle') === angleKey);
  });

  apply3DTransform();
}

function resetViewer3D() {
  stopAutoSpin();
  viewerState.rotX = 0;
  viewerState.rotY = 0;
  viewerState.zoom = 1;
  viewerState.activeAngle = 'frontal';

  const zoomSlider = document.getElementById('viewerZoomRange');
  if (zoomSlider) zoomSlider.value = 1;

  document.querySelectorAll('.view-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-angle') === 'frontal');
  });

  apply3DTransform();
}

function toggleAutoSpin() {
  const btn = document.getElementById('btnAutoSpin');
  if (viewerState.isAutoSpinning) {
    stopAutoSpin();
  } else {
    viewerState.isAutoSpinning = true;
    if (btn) btn.classList.add('active');
    
    // Ocultar hint de arrastre
    const hint = document.getElementById('dragHintPill');
    if (hint) hint.style.opacity = '0';

    viewerState.spinInterval = setInterval(() => {
      viewerState.rotY = (viewerState.rotY + 1.2) % 360;
      apply3DTransform();
    }, 25);
  }
}

function stopAutoSpin() {
  viewerState.isAutoSpinning = false;
  if (viewerState.spinInterval) {
    clearInterval(viewerState.spinInterval);
    viewerState.spinInterval = null;
  }
  const btn = document.getElementById('btnAutoSpin');
  if (btn) btn.classList.remove('active');
}

let isControlsInitialized = false;

function init3DControls() {
  if (isControlsInitialized) return;
  isControlsInitialized = true;

  const container = document.getElementById('modalZoomContainer');
  const hintPill = document.getElementById('dragHintPill');
  const zoomSlider = document.getElementById('viewerZoomRange');
  const btnAutoSpin = document.getElementById('btnAutoSpin');
  const btnResetView = document.getElementById('btnResetView');

  // Selector de ángulos
  document.querySelectorAll('.view-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      stopAutoSpin();
      const angle = btn.getAttribute('data-angle');
      setAnglePreset(angle);
    });
  });

  // Botón Auto Giro
  if (btnAutoSpin) {
    btnAutoSpin.addEventListener('click', toggleAutoSpin);
  }

  // Botón Reset / Centrar
  if (btnResetView) {
    btnResetView.addEventListener('click', resetViewer3D);
  }

  // Slider de Zoom
  if (zoomSlider) {
    zoomSlider.addEventListener('input', (e) => {
      viewerState.zoom = parseFloat(e.target.value) || 1;
      apply3DTransform();
    });
  }

  // Eventos de ratón / drag orbital 360°
  if (container) {
    const onStart = (clientX, clientY) => {
      stopAutoSpin();
      viewerState.isDragging = true;
      viewerState.startX = clientX;
      viewerState.startY = clientY;
      if (hintPill) hintPill.style.opacity = '0';
    };

    const onMove = (clientX, clientY) => {
      if (!viewerState.isDragging) return;
      const dx = clientX - viewerState.startX;
      const dy = clientY - viewerState.startY;

      // Sensibilidad orbital
      viewerState.rotY += dx * 0.65;
      viewerState.rotX = Math.max(-40, Math.min(40, viewerState.rotX - dy * 0.45));

      viewerState.startX = clientX;
      viewerState.startY = clientY;

      apply3DTransform();
    };

    const onEnd = () => {
      viewerState.isDragging = false;
    };

    // Mouse listeners
    container.addEventListener('mousedown', (e) => {
      onStart(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      if (viewerState.isDragging) {
        onMove(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseup', onEnd);

    // Touch listeners (Celulares y Tablets)
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && viewerState.isDragging) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    container.addEventListener('touchend', onEnd);
  }
}

// Inicialización de cierres globales
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('productModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProductModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProductModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
    }
  });
});
