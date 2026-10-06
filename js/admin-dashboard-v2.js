/* ==========================================================================
   LENS GROUP TRUJILLO — SISTEMA DE GESTIÓN & TOMA DE DECISIONES (BI)
   Módulo con Panel Lateral por Categorías
   ========================================================================== */

const ADMIN_STORAGE_KEY = 'lens_group_admin_session';
const API_ORDERS_URL = '/api/orders';
const API_LOGIN_URL = '/api/admin/login';

// Base de datos de inventario
const INVENTORY_DB = [
  { id: 'inv-1', brand: 'Ray-Ban', model: 'Aviator Classic Dorado (RB3025)', stock: 2, threshold: 5, category: 'Sol Polarizado', cost: 250, price: 520, status: 'critical' },
  { id: 'inv-2', brand: 'Ray-Ban', model: 'Wayfarer Midnight Black (RB2140)', stock: 8, threshold: 4, category: 'Sol Clásico', cost: 230, price: 480, status: 'good' },
  { id: 'inv-3', brand: 'Oakley', model: 'Holbrook Polarized OO9102', stock: 3, threshold: 5, category: 'Sol Deportivo', cost: 245, price: 590, status: 'medium' },
  { id: 'inv-4', brand: 'Vogue', model: 'Cat-Eye VO5211S Acetato', stock: 4, threshold: 4, category: 'Oftálmico Femenino', cost: 180, price: 420, status: 'medium' },
  { id: 'inv-5', brand: 'Carrera', model: 'Champion Classic Aviador', stock: 6, threshold: 3, category: 'Sol Unisex', cost: 190, price: 490, status: 'good' },
  { id: 'inv-6', brand: 'InkaLens', model: 'Titanium Flex TR-90 Ultraligero', stock: 9, threshold: 5, category: 'Oftálmico Flexible', cost: 130, price: 360, status: 'good' },
  { id: 'inv-7', brand: 'Sylvane', model: 'Elegance Rose Gold Metálico', stock: 2, threshold: 4, category: 'Oftálmico Premium', cost: 135, price: 380, status: 'critical' },
  { id: 'inv-8', brand: 'Mely', model: 'Fashion Acetato Habana', stock: 11, threshold: 5, category: 'Oftálmico Juvenil', cost: 115, price: 320, status: 'good' },
  { id: 'inv-9', brand: 'Lunas', model: 'Cristales Blue Protect UV400', stock: 3, threshold: 8, category: 'Tratamiento Digital', cost: 70, price: 180, status: 'critical' },
  { id: 'inv-10', brand: 'Lunas', model: 'Progresivo Digital FreeForm', stock: 7, threshold: 4, category: 'Presbicia Alta Gama', cost: 190, price: 580, status: 'good' },
  { id: 'inv-11', brand: 'Lunas', model: 'Fotocromático Transition Gen 8', stock: 5, threshold: 6, category: 'Fotosensible', cost: 140, price: 390, status: 'medium' }
];

const MOCK_CATALOG = [
  { id: 'frm-1', sku: 'KID-SILI-001', brand: 'Miraflex', model: 'Flexible Azul', material: 'Silicona Flexible', color: 'Azul Marino', age: '0-3 años', category: 'Niños', price: 120, stock: 15, image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&q=80' },
  { id: 'frm-2', sku: 'KID-TR90-002', brand: 'Nano Vista', model: 'Deportivo TR90', material: 'TR-90', color: 'Rojo/Negro', age: '4-8 años', category: 'Unisex', price: 150, stock: 8, image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=400&q=80' },
  { id: 'frm-3', sku: 'KID-SILI-003', brand: 'InkaLens Kids', model: 'Princesa Rosa', material: 'Silicona Flexible', color: 'Rosa Pastel', age: '4-8 años', category: 'Niñas', price: 110, stock: 0, image: 'https://plus.unsplash.com/premium_photo-1675807963495-2ba19356cc5b?w=400&q=80' },
  { id: 'frm-4', sku: 'KID-TR90-004', brand: 'Ray-Ban Junior', model: 'Wayfarer Kids', material: 'Acetato/TR-90', color: 'Carey', age: '9-12 años', category: 'Unisex', price: 210, stock: 5, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80' },
  { id: 'frm-5', sku: 'KID-SILI-005', brand: 'Miraflex', model: 'Flexible Lila', material: 'Silicona Flexible', color: 'Lila', age: '0-3 años', category: 'Niñas', price: 120, stock: 12, image: 'https://images.unsplash.com/photo-1625591342279-798822d645fc?w=400&q=80' }
];

const MOCK_CATALOG_ADULT = [
  { id: 'frm-a1', sku: 'ADU-ACE-001', brand: 'Ray-Ban', model: 'Wayfarer Classic', material: 'Acetato', color: 'Negro', category: 'Unisex', price: 420, stock: 5, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80' },
  { id: 'frm-a2', sku: 'ADU-MET-002', brand: 'Oakley', model: 'Holbrook', material: 'Metal', color: 'Plata', category: 'Caballeros', price: 480, stock: 3, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80' },
  { id: 'frm-a3', sku: 'ADU-ACE-003', brand: 'Vogue', model: 'Cat-Eye Elegance', material: 'Acetato', color: 'Carey', category: 'Damas', price: 350, stock: 7, image: 'https://images.unsplash.com/photo-1589785890913-912c96c4b2ff?w=400&q=80' },
  { id: 'frm-a4', sku: 'ADU-TIT-004', brand: 'Carrera', model: 'Titanium Aviator', material: 'Titanio', color: 'Dorado', category: 'Caballeros', price: 550, stock: 2, image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&q=80' },
  { id: 'frm-a5', sku: 'ADU-MET-005', brand: 'Sylvane', model: 'Round Metal', material: 'Metal', color: 'Rose Gold', category: 'Damas', price: 380, stock: 0, image: 'https://images.unsplash.com/photo-1625591342279-798822d645fc?w=400&q=80' }
];

// Fallback Orders en caso de ejecución estática
const DEFAULT_ORDERS = {
  'LGT-2025-0342': {
    code: 'LGT-2025-0342',
    customer: 'Carlos Mendoza Quispe',
    dni: '45892147',
    phone: '944123890',
    receivedDate: '08 de Marzo, 2026',
    estimatedDate: '10 de Marzo, 2026',
    brand: 'Ray-Ban',
    service: 'Montura Ray-Ban Round Metal + Cristales Antirreflejo Blue Protect UV400',
    treatment: 'Blue Protect UV400',
    price: 540,
    cost: 210,
    estado: 'listo',
    urgente: false,
    currentStep: 3
  },
  'LGT-2025-0210': {
    code: 'LGT-2025-0210',
    customer: 'Roberto Castillo Díaz',
    dni: '71245890',
    phone: '958741236',
    receivedDate: '09 de Marzo, 2026',
    estimatedDate: '11 de Marzo, 2026',
    brand: 'InkaLens',
    service: 'Cristales Fotocromáticos Transition Gen 8 + Montura Titanio Flexible',
    treatment: 'Fotocromático Gen 8',
    price: 460,
    cost: 175,
    estado: 'proceso',
    urgente: true,
    currentStep: 2
  },
  'LGT-2025-0105': {
    code: 'LGT-2025-0105',
    customer: 'Mariana Paredes Silva',
    dni: '42369854',
    phone: '962145873',
    receivedDate: '09 de Marzo, 2026',
    estimatedDate: '12 de Marzo, 2026',
    brand: 'Vogue',
    service: 'Lunas Progresivas Digitales FreeForm + Montura Vogue Eyewear',
    treatment: 'Antirreflejo HD Premium',
    price: 680,
    cost: 230,
    estado: 'proceso',
    urgente: false,
    currentStep: 2
  },
  'LGT-2025-0450': {
    code: 'LGT-2025-0450',
    customer: 'Andrea Fernández Ruiz',
    dni: '70963215',
    phone: '974581236',
    receivedDate: '10 de Marzo, 2026',
    estimatedDate: '13 de Marzo, 2026',
    brand: 'Oakley',
    service: 'Gafas de Sol Oakley Polarizadas con Graduación Espejada',
    treatment: 'Polarizado + Espejado Azul',
    price: 590,
    cost: 245,
    estado: 'cola',
    urgente: false,
    currentStep: 1
  },
  'LGT-2025-0500': {
    code: 'LGT-2025-0500',
    customer: 'Jorge Luis Vásquez',
    dni: '18456321',
    phone: '949852147',
    receivedDate: '04 de Marzo, 2026',
    estimatedDate: '07 de Marzo, 2026',
    brand: 'Carrera',
    service: 'Montura Ultraligera de Titanio + Cristales Monofocales Crizal',
    treatment: 'Crizal Easy UV',
    price: 490,
    cost: 190,
    estado: 'listo',
    urgente: false,
    currentStep: 3
  },
  'LGT-2026-0612': {
    code: 'LGT-2026-0612',
    customer: 'Luciana Alva Benites',
    dni: '72658412',
    phone: '941582369',
    receivedDate: '10 de Marzo, 2026',
    estimatedDate: '11 de Marzo, 2026',
    brand: 'Sylvane',
    service: 'Montura Oftálmica Sylvane + Cristales Blue Defense para Trabajo Digital',
    treatment: 'Blue Defense UV420',
    price: 380,
    cost: 135,
    estado: 'proceso',
    urgente: true,
    currentStep: 2
  },
  'LGT-2026-0615': {
    code: 'LGT-2026-0615',
    customer: 'Víctor Hugo Ramos',
    dni: '18965412',
    phone: '955214876',
    receivedDate: '10 de Marzo, 2026',
    estimatedDate: '12 de Marzo, 2026',
    brand: 'Ray-Ban',
    service: 'Gafas de Sol Ray-Ban Aviator Polarized G-15',
    treatment: 'Polarizado G-15',
    price: 520,
    cost: 250,
    estado: 'cola',
    urgente: false,
    currentStep: 1
  },
  'LGT-2026-0620': {
    code: 'LGT-2026-0620',
    customer: 'Camila Sotelo Barreto',
    dni: '75321458',
    phone: '966325874',
    receivedDate: '07 de Marzo, 2026',
    estimatedDate: '09 de Marzo, 2026',
    brand: 'Mely',
    service: 'Montura Mely Habana + Cristales Antirreflejo SuperClean',
    treatment: 'Antirreflejo Hidrofóbico',
    price: 320,
    cost: 115,
    estado: 'listo',
    urgente: false,
    currentStep: 3
  }
};

let state = {
  session: null,
  currentCategory: 'overview',
  orders: {},
  inventory: INVENTORY_DB,
  currentFilter: 'all',
  searchQuery: '',
  charts: {},
  users: [
    { id: 'usr-1', name: 'Dr. Carlos Miranda', username: 'admin', role: 'Gerente General', branch: 'Galería San Antonio, Jr. Gamarra N° 778', status: 'activo' },
    { id: 'usr-2', name: 'Optómetra en Turno', username: 'optometrista', role: 'Laboratorio & Clínica', branch: 'Galería San Antonio, Jr. Gamarra N° 778', status: 'activo' },
    { id: 'usr-3', name: 'Ana Sofía Ruiz', username: 'aruiz', role: 'Ventas', branch: 'Sede 2 (Centro)', status: 'inactivo' }
  ]
};

const CATEGORY_NAMES = {
  'overview': 'Visión General & KPIs',
  'decisions': 'Matriz de Toma de Decisiones',
  'analytics': 'Analítica & Gráficos BI',
  'simulator': 'Simulador de Rentabilidad',
  'orders': 'Órdenes de Laboratorio',
  'inventory': 'Inventario & Stock Crítico',
  'catalog': 'Catálogo de Niños',
  'catalog-adult ': 'Catálogo de Adultos',
  'sales': 'Historial de Ventas'
};

// ==========================================================================
// 1. INICIALIZACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  setupEventListeners();
  setupSidebarNavigation();
});

function initAuth() {
  const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (saved) {
    try {
      state.session = JSON.parse(saved);
      showDashboardView();
      loadOrders();
      return;
    } catch (e) {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  }
  showLoginView();
}

function showLoginView() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('dashboardScreen').style.display = 'none';
}

function showDashboardView() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboardScreen').style.display = 'flex';
  
  if (state.session) {
    const displayName = state.session.name || 'Gerente General';
    const displayRole = state.session.role || 'Director Ejecutivo';
    const isSuperAdmin = state.session.isSuperAdmin === true;
    
    document.getElementById('sidebarUserName').textContent = displayName;
    document.getElementById('sidebarUserRole').textContent = displayRole;
    document.getElementById('sidebarUserAvatar').textContent = displayName.charAt(0).toUpperCase();

    // Filtro de roles en el Sidebar
    document.querySelectorAll('[data-roles="superadmin"]').forEach(el => {
      if (isSuperAdmin) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    // Cambiar vista inicial dependiendo del rol
    if (!isSuperAdmin && ['users', 'catalog', 'sales', 'decisions', 'analytics', 'simulator', 'audit'].includes(state.currentCategory)) {
      switchCategory('overview');
    }
    
    // Renderizar usuarios
    if (isSuperAdmin) {
      renderUsersTable();
    }
  }
}

// ==========================================================================
// 2. NAVEGACIÓN POR PANEL LATERAL (CATEGORÍA POR CATEGORÍA)
// ==========================================================================
function setupSidebarNavigation() {
  const navBtns = document.querySelectorAll('.sidebar-nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.view;
      if (category) {
        switchCategory(category);
        // En móvil cerrar el sidebar al seleccionar
        closeMobileSidebar();
      }
    });
  });

  // Toggle móvil del sidebar
  const btnToggle = document.getElementById('btnSidebarToggle');
  const sidebar = document.getElementById('adminSidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (btnToggle && sidebar && overlay) {
    btnToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', closeMobileSidebar);
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

window.switchCategory = function(categoryId) {
  state.currentCategory = categoryId;

  // Actualizar botones del sidebar
  document.querySelectorAll('.sidebar-nav-btn').forEach(btn => {
    if (btn.dataset.view === categoryId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Actualizar vistas principales
  document.querySelectorAll('.dash-view').forEach(view => {
    if (view.id === `view-${categoryId}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  if (categoryId === 'catalog') {
    renderCatalog();
  } else if (categoryId === 'catalog-adult') {
    renderAdultCatalog();
  }

  // Actualizar Breadcrumb
  const breadcrumb = document.getElementById('activeCategoryBreadcrumb');
  if (breadcrumb) {
    breadcrumb.textContent = CATEGORY_NAMES[categoryId] || 'Visión General';
  }

  // Si entra a la vista de analítica, visión general, o ventas, forzar re-renderizado / resize de Chart.js
  if (categoryId === 'analytics' || categoryId === 'overview' || categoryId === 'sales') {
    setTimeout(() => {
      renderCharts();
    }, 50);
  }

  // Scroll suave al tope del área de contenido
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ==========================================================================
// 3. LISTENERS GENERALES
// ==========================================================================
function setupEventListeners() {
  // Formulario login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }



  // Logout
  const logoutBtn = document.getElementById('sidebarLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // Búsqueda de órdenes
  const searchInput = document.getElementById('orderSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderOrdersTable();
    });
  }

  // Pestañas de estado en tabla de órdenes
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      state.currentFilter = e.target.dataset.filter || 'all';
      renderOrdersTable();
    });
  });

  // Modal nueva orden
  const btnNewOrder = document.getElementById('btnNewOrder');
  const modalNewOrder = document.getElementById('modalNewOrder');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const formNewOrder = document.getElementById('formNewOrder');

  if (btnNewOrder && modalNewOrder) {
    btnNewOrder.addEventListener('click', () => {
      modalNewOrder.classList.add('active');
      const nextNum = Math.floor(1000 + Math.random() * 9000);
      document.getElementById('newOrderCode').value = `LGT-2026-${nextNum}`;
    });
  }

  if (btnCloseModal && modalNewOrder) {
    btnCloseModal.addEventListener('click', () => modalNewOrder.classList.remove('active'));
  }

  if (formNewOrder) {
    formNewOrder.addEventListener('submit', handleCreateOrder);
  }

  // Simulador de decisiones
  ['simDiscount', 'simPatients', 'simPremium'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateSimulator);
  });

  // Exportar CSV
  const btnExportCsv = document.getElementById('btnExportCsv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', exportOrdersToCsv);
  }

  // Recuperar Contraseña
  const btnForgotPassword = document.getElementById('btnForgotPassword');
  const modalRecovery = document.getElementById('modalRecovery');
  const btnCloseRecoveryModal = document.getElementById('btnCloseRecoveryModal');
  const formRecovery = document.getElementById('formRecovery');
  const btnRefreshCaptcha = document.getElementById('btnRefreshCaptcha');

  if (btnForgotPassword && modalRecovery) {
    btnForgotPassword.addEventListener('click', (e) => {
      e.preventDefault();
      modalRecovery.classList.add('active');
      refreshCaptcha();
    });
  }

  if (btnCloseRecoveryModal && modalRecovery) {
    btnCloseRecoveryModal.addEventListener('click', () => {
      modalRecovery.classList.remove('active');
    });
  }

  if (btnRefreshCaptcha) {
    btnRefreshCaptcha.addEventListener('click', refreshCaptcha);
  }

  if (formRecovery) {
    formRecovery.addEventListener('submit', handleRecoverySubmit);
  }

  // Usuarios
  const formNewUser = document.getElementById('formNewUser');
  if (formNewUser) {
    formNewUser.addEventListener('submit', handleCreateUser);
  }

  // Filtros de Catálogo
  ['filterCatalogCategory', 'filterCatalogMaterial', 'filterCatalogAge'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', renderCatalog);
  });

  // Filtros de Catálogo Adultos
  ['filterCatalogAdultCategory', 'filterCatalogAdultMaterial'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', renderAdultCatalog);
  });

  // Inventario
  const formInventory = document.getElementById('formInventory');
  if (formInventory) {
    formInventory.addEventListener('submit', handleSaveInventory);
  }

  // Chatbot
  const chatbotForm = document.getElementById('chatbotForm');
  if (chatbotForm) {
    chatbotForm.addEventListener('submit', handleChatbotSubmit);
  }
}

// Lógica del CAPTCHA
let currentCaptcha = '';
function refreshCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  currentCaptcha = result;
  const captchaText = document.getElementById('captchaText');
  if (captchaText) {
    captchaText.textContent = result;
    // Añadir estilos aleatorios para ofuscar un poco (simulación)
    captchaText.style.letterSpacing = Math.floor(Math.random() * 4 + 2) + 'px';
    captchaText.style.transform = `rotate(${Math.floor(Math.random() * 6 - 3)}deg)`;
  }
  document.getElementById('captchaInput').value = '';
  document.getElementById('captchaError').style.display = 'none';
}

function handleRecoverySubmit(e) {
  e.preventDefault();
  const input = document.getElementById('captchaInput').value.toUpperCase();
  const errorEl = document.getElementById('captchaError');
  
  if (input !== currentCaptcha) {
    errorEl.style.display = 'block';
    refreshCaptcha();
    return;
  }
  
  errorEl.style.display = 'none';
  showToast('Enlace de recuperación enviado al correo registrado.');
  document.getElementById('modalRecovery').classList.remove('active');
  document.getElementById('formRecovery').reset();
}

// ==========================================================================
// 3.5 GESTIÓN DE USUARIOS
// ==========================================================================
window.openUserModal = function(userId = null) {
  const modal = document.getElementById('modalNewUser');
  const form = document.getElementById('formNewUser');
  const title = modal.querySelector('.modal-header h3');
  
  if (userId) {
    const user = state.users.find(u => u.id === userId);
    if (user) {
      title.textContent = 'Editar Usuario';
      document.getElementById('newUserName').value = user.name;
      document.getElementById('newUserUsername').value = user.username;
      document.getElementById('newUserRole').value = user.role;
      document.getElementById('newUserBranch').value = user.branch;
      document.getElementById('newUserPassword').removeAttribute('required'); // No requerido al editar
      form.dataset.editId = userId;
    }
  } else {
    title.textContent = 'Crear Nuevo Usuario';
    form.reset();
    document.getElementById('newUserPassword').setAttribute('required', 'true');
    delete form.dataset.editId;
  }
  
  if (modal) modal.classList.add('active');
};

window.closeUserModal = function() {
  const modal = document.getElementById('modalNewUser');
  if (modal) modal.classList.remove('active');
};

function handleCreateUser(e) {
  e.preventDefault();
  const name = document.getElementById('newUserName').value.trim();
  const username = document.getElementById('newUserUsername').value.trim();
  const role = document.getElementById('newUserRole').value;
  const branch = document.getElementById('newUserBranch').value;
  
  if (!name || !username) return;

  if (e.target.dataset.editId) {
    // Editar
    const user = state.users.find(u => u.id === e.target.dataset.editId);
    if (user) {
      user.name = name;
      user.username = username;
      user.role = role;
      user.branch = branch;
      showToast(`Usuario ${name} actualizado.`);
    }
  } else {
    // Crear
    const newUser = {
      id: 'usr-' + Date.now(),
      name,
      username,
      role,
      branch,
      status: 'activo'
    };
    state.users.push(newUser);
    showToast(`Usuario ${name} creado con éxito.`);
  }

  renderUsersTable();
  closeUserModal();
  document.getElementById('formNewUser').reset();
}

window.toggleUserStatus = function(userId) {
  const user = state.users.find(u => u.id === userId);
  if (user) {
    user.status = user.status === 'activo' ? 'inactivo' : 'activo';
    renderUsersTable();
    showToast(`Usuario ${user.name} ahora está ${user.status}`);
  }
};

window.deleteUser = function(userId) {
  if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    state.users = state.users.filter(u => u.id !== userId);
    renderUsersTable();
    showToast('Usuario eliminado del sistema.');
  }
};

function renderUsersTable() {
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;

  if (state.users.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2.5rem; color: var(--admin-text-muted);">
          No hay usuarios registrados.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = state.users.map(user => {
    const isActivo = user.status === 'activo';
    const badgeClass = isActivo ? 'badge-listo' : 'badge-cola';
    const badgeText = isActivo ? 'Activo' : 'Inactivo';
    const toggleAction = isActivo ? 'Desactivar' : 'Activar';

    return `
      <tr>
        <td>
          <strong style="color: var(--admin-text-main);">${user.name}</strong>
        </td>
        <td>
          <span style="color: var(--admin-text-dim);">${user.username}</span>
        </td>
        <td>
          <span style="font-size: 0.8rem; color: var(--admin-primary); font-weight: 600;">${user.role}</span>
        </td>
        <td>
          <span style="font-size: 0.85rem; color: var(--admin-text-muted);">${user.branch}</span>
        </td>
        <td>
          <span class="badge-status ${badgeClass}">${badgeText}</span>
        </td>
        <td>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <button class="btn-decision-action" style="padding: 0.2rem 0.5rem; font-size: 0.75rem; color: #38bdf8; border-color: rgba(56, 189, 248, 0.2);" onclick="openUserModal('${user.id}')">
              Editar
            </button>
            <button class="btn-decision-action" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;" onclick="toggleUserStatus('${user.id}')">
              ${toggleAction}
            </button>
            <button class="btn-decision-action" style="padding: 0.2rem 0.5rem; font-size: 0.75rem; color: #ef4444; border-color: rgba(239, 68, 68, 0.2);" onclick="deleteUser('${user.id}')">
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ==========================================================================
// 3.6 CATÁLOGO DE NIÑOS
// ==========================================================================
function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;

  const catFilter = document.getElementById('filterCatalogCategory')?.value || 'all';
  const matFilter = document.getElementById('filterCatalogMaterial')?.value || 'all';
  const ageFilter = document.getElementById('filterCatalogAge')?.value || 'all';

  let filtered = MOCK_CATALOG;
  
  if (catFilter !== 'all') filtered = filtered.filter(item => item.category === catFilter);
  if (matFilter !== 'all') filtered = filtered.filter(item => item.material.includes(matFilter) || matFilter.includes(item.material));
  if (ageFilter !== 'all') filtered = filtered.filter(item => item.age === ageFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--admin-text-muted);">No se encontraron monturas con esos filtros.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isOutOfStock = item.stock <= 0;
    const stockBadge = isOutOfStock 
      ? `<span class="badge-status badge-urgente" style="position: absolute; top: 1rem; right: 1rem;">Agotado</span>`
      : `<span class="badge-status badge-listo" style="position: absolute; top: 1rem; right: 1rem;">${item.stock} en stock</span>`;
      
    const btnSell = isOutOfStock
      ? `<button class="btn-decision-action" style="flex: 1; opacity: 0.5; cursor: not-allowed;" disabled>Sin Stock</button>`
      : `<button class="btn-primary-action" style="flex: 1; padding: 0.5rem;" onclick="startSale('${item.id}')">Vender</button>`;

    return `
      <div class="catalog-card" style="background: var(--admin-card-bg); border: 1px solid var(--admin-card-border); border-radius: 12px; overflow: hidden; position: relative; box-shadow: var(--admin-shadow);">
        ${stockBadge}
        <div style="height: 180px; overflow: hidden; background: #fff; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--admin-card-border);">
          <img src="${item.image}" alt="${item.model}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="padding: 1.5rem;">
          <div style="font-size: 0.75rem; color: var(--admin-primary); font-weight: 800; margin-bottom: 0.25rem; text-transform: uppercase;">${item.brand} | ${item.sku}</div>
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.15rem; color: var(--admin-text-main); font-weight: 700;">${item.model}</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
            <span style="font-size: 0.75rem; background: var(--admin-bg-alt); color: var(--admin-text-main); padding: 0.2rem 0.6rem; border-radius: 4px; border: 1px solid var(--admin-card-border); font-weight: 500;">${item.category}</span>
            <span style="font-size: 0.75rem; background: var(--admin-bg-alt); color: var(--admin-text-main); padding: 0.2rem 0.6rem; border-radius: 4px; border: 1px solid var(--admin-card-border); font-weight: 500;">${item.age}</span>
            <span style="font-size: 0.75rem; background: var(--admin-bg-alt); color: var(--admin-text-main); padding: 0.2rem 0.6rem; border-radius: 4px; border: 1px solid var(--admin-card-border); font-weight: 500;">${item.material}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span style="color: var(--admin-text-dim); font-size: 0.85rem; font-weight: 500;">Color: ${item.color}</span>
            <strong style="font-size: 1.35rem; color: var(--admin-accent);">S/ ${item.price.toFixed(2)}</strong>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            ${btnSell}
            <button class="btn-header-action" style="padding: 0.5rem 1rem;" onclick="showToast('Abriendo editor de producto...')">Editar</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderAdultCatalog() {
  const grid = document.getElementById('catalogAdultGrid');
  if (!grid) return;

  const catFilter = document.getElementById('filterCatalogAdultCategory')?.value || 'all';
  const matFilter = document.getElementById('filterCatalogAdultMaterial')?.value || 'all';

  let filtered = MOCK_CATALOG_ADULT;
  
  if (catFilter !== 'all') filtered = filtered.filter(item => item.category === catFilter);
  if (matFilter !== 'all') filtered = filtered.filter(item => item.material.includes(matFilter) || matFilter.includes(item.material));

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--admin-text-muted);">No se encontraron monturas con esos filtros.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isOutOfStock = item.stock <= 0;
    const stockBadge = isOutOfStock 
      ? `<span class="badge-status badge-urgente" style="position: absolute; top: 1rem; right: 1rem;">Agotado</span>`
      : `<span class="badge-status badge-listo" style="position: absolute; top: 1rem; right: 1rem;">${item.stock} en stock</span>`;
      
    const btnSell = isOutOfStock
      ? `<button class="btn-decision-action" style="flex: 1; opacity: 0.5; cursor: not-allowed;" disabled>Sin Stock</button>`
      : `<button class="btn-primary-action" style="flex: 1; padding: 0.5rem;" onclick="startSale('${item.id}')">Vender</button>`;

    return `
      <div class="catalog-card" style="background: var(--admin-card-bg); border: 1px solid var(--admin-card-border); border-radius: 12px; overflow: hidden; position: relative; box-shadow: var(--admin-shadow);">
        ${stockBadge}
        <div style="height: 180px; overflow: hidden; background: #fff; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--admin-card-border);">
          <img src="${item.image}" alt="${item.model}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="padding: 1.5rem;">
          <div style="font-size: 0.75rem; color: var(--admin-primary); font-weight: 800; margin-bottom: 0.25rem; text-transform: uppercase;">${item.brand} | ${item.sku}</div>
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.15rem; color: var(--admin-text-main); font-weight: 700;">${item.model}</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
            <span style="font-size: 0.75rem; background: var(--admin-bg-alt); color: var(--admin-text-main); padding: 0.2rem 0.6rem; border-radius: 4px; border: 1px solid var(--admin-card-border); font-weight: 500;">${item.category}</span>
            <span style="font-size: 0.75rem; background: var(--admin-bg-alt); color: var(--admin-text-main); padding: 0.2rem 0.6rem; border-radius: 4px; border: 1px solid var(--admin-card-border); font-weight: 500;">${item.material}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span style="color: var(--admin-text-dim); font-size: 0.85rem; font-weight: 500;">Color: ${item.color}</span>
            <strong style="font-size: 1.35rem; color: var(--admin-accent);">S/ ${item.price.toFixed(2)}</strong>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            ${btnSell}
            <button class="btn-header-action" style="padding: 0.5rem 1rem;" onclick="showToast('Abriendo editor de producto...')">Editar</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.startSale = function(frameId) {
  let frame = MOCK_CATALOG.find(f => f.id === frameId) || MOCK_CATALOG_ADULT.find(f => f.id === frameId);
  if (!frame) return;
  
  const modal = document.getElementById('modalSale');
  if (modal) {
    document.getElementById('saleFrameId').value = frame.id;
    document.getElementById('saleFrameSummary').innerHTML = `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <img src="${frame.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
        <div>
          <strong style="display: block; color: var(--admin-text-main);">${frame.brand} - ${frame.model}</strong>
          <span style="color: var(--admin-primary);">S/ ${frame.price.toFixed(2)}</span>
          <span style="color: var(--admin-text-muted); font-size: 0.8rem; margin-left: 0.5rem;">(Stock: ${frame.stock})</span>
        </div>
      </div>
    `;
    
    document.getElementById('formSale').reset();
    updateSaleTotal();
    modal.classList.add('active');
  }
};

window.closeSaleModal = function() {
  document.getElementById('modalSale')?.classList.remove('active');
};

window.updateSaleTotal = function() {
  const frameId = document.getElementById('saleFrameId').value;
  const frame = MOCK_CATALOG.find(f => f.id === frameId);
  if (!frame) return;

  const framePrice = frame.price;
  const lensPrice = parseFloat(document.getElementById('saleLensType').value) || 0;
  const discount = parseFloat(document.getElementById('saleDiscount').value) || 0;

  const total = framePrice + lensPrice - discount;
  document.getElementById('saleTotal').textContent = `S/ ${Math.max(0, total).toFixed(2)}`;
};

document.getElementById('formSale')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const frameId = document.getElementById('saleFrameId').value;
  const frame = MOCK_CATALOG.find(f => f.id === frameId);
  if (!frame) return;

  if (frame.stock <= 0) {
    showToast('Error: No hay stock suficiente para esta montura.');
    return;
  }

  // Descontar stock (simulación de transacción)
  frame.stock -= 1;
  
  showToast(`Venta registrada con éxito. Stock de ${frame.model} actualizado.`);
  closeSaleModal();
  renderCatalog(); // Refrescar vista
});

// ==========================================================================
// 4. AUTENTICACIÓN
// ==========================================================================
async function handleLogin(e) {
  e.preventDefault();
  const errorEl = document.getElementById('loginErrorMsg');
  errorEl.style.display = 'none';

  const u = document.getElementById('adminUsername').value.trim();
  const p = document.getElementById('adminPassword').value.trim();

  try {
    const res = await fetch(API_LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: u, password: p })
    });
    
    if (res.ok) {
      const data = await res.json();
      state.session = data.user;
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(state.session));
      showDashboardView();
      loadOrders();
      showToast(`¡Bienvenido ${state.session.name}!`);
      return;
    }
  } catch (err) {}

  // Fallback client-side auth
  if (u.toLowerCase() === 'keyli' && p === '2607') {
    state.session = {
      name: 'Super Admin',
      role: 'Acceso Total',
      branch: 'Todas las Sedes',
      isSuperAdmin: true
    };
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(state.session));
    showDashboardView();
    loadOrders();
    showToast(`Acceso concedido: ${state.session.name}`);
  } else {
    errorEl.textContent = 'Usuario o contraseña incorrecta.';
    errorEl.style.display = 'block';
  }
}

// ==========================================================================
// 5. CHATBOT ASSISTANT
// ==========================================================================
window.toggleChatbot = function() {
  const win = document.getElementById('chatbotWindow');
  win.style.display = win.style.display === 'none' ? 'flex' : 'none';
};

window.handleChatbotSubmit = function(e) {
  e.preventDefault();
  const input = document.getElementById('chatbotInput');
  const msg = input.value.trim();
  if (!msg) return;

  // Add user message
  const msgsDiv = document.getElementById('chatbotMessages');
  msgsDiv.innerHTML += `
    <div style="align-self: flex-end; background: var(--admin-primary); padding: 0.75rem; border-radius: 8px 8px 0 8px; color: #fff; max-width: 85%;">
      ${msg}
    </div>
  `;
  input.value = '';
  msgsDiv.scrollTop = msgsDiv.scrollHeight;

  // Indicador de "escribiendo..."
  const typingId = 'typing-' + Date.now();
  msgsDiv.innerHTML += `
    <div id="${typingId}" style="align-self: flex-start; background: var(--admin-bg-alt); padding: 0.6rem 0.9rem; border-radius: 8px 8px 8px 0; border: 1px solid var(--admin-card-border); color: var(--admin-text-muted, #888); font-style: italic; font-size: 0.85rem;">
      LensBot está escribiendo...
    </div>
  `;
  msgsDiv.scrollTop = msgsDiv.scrollHeight;

  setTimeout(() => {
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();

    let reply;
    try {
      reply = generateBotReply(msg);
    } catch (err) {
      reply = 'Tuve un problema procesando los datos. Intenta de nuevo, por favor.';
    }

    msgsDiv.innerHTML += `
      <div style="align-self: flex-start; background: var(--admin-bg-alt); padding: 0.75rem; border-radius: 8px 8px 8px 0; border: 1px solid var(--admin-card-border); color: var(--admin-text-main); max-width: 85%; line-height: 1.45;">
        ${reply}
      </div>
    `;
    msgsDiv.scrollTop = msgsDiv.scrollHeight;
  }, 600 + Math.random() * 500);
};

// --------------------------------------------------------------------------
// Motor de respuestas de LensBot (usa los datos reales del dashboard)
// --------------------------------------------------------------------------
const BOT_MONEY = n => 'S/ ' + Number(n || 0).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const BOT_HL = t => `<span style='color: var(--admin-accent); font-weight: bold;'>${t}</span>`;
const BOT_NORM = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function botHas(text, words) {
  return words.some(w => text.includes(w));
}

function botData() {
  const orders = Object.values(state.orders && Object.keys(state.orders).length ? state.orders : DEFAULT_ORDERS);
  const inventory = state.inventory || INVENTORY_DB;
  const kids = MOCK_CATALOG;
  const adults = MOCK_CATALOG_ADULT;
  const revenue = orders.reduce((s, o) => s + (Number(o.price) || 0), 0);
  const cost = orders.reduce((s, o) => s + (Number(o.cost) || 0), 0);
  return { orders, inventory, kids, adults, revenue, cost, profit: revenue - cost };
}

function botTopBrands(orders) {
  const map = {};
  orders.forEach(o => {
    const b = o.brand || 'Otros';
    map[b] = map[b] || { brand: b, count: 0, total: 0 };
    map[b].count++;
    map[b].total += Number(o.price) || 0;
  });
  return Object.values(map).sort((a, b) => b.count - a.count || b.total - a.total);
}

function generateBotReply(rawMsg) {
  const t = BOT_NORM(rawMsg);
  const d = botData();
  const statusLabel = { cola: 'En cola', proceso: 'En proceso', listo: 'Listo para entrega' };

  // 1. Saludos / cortesía
  if (/^(hola|buenas|buenos|hey|hi|que tal|saludos)/.test(t)) {
    const h = new Date().getHours();
    const saludo = h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
    return `${saludo} 👋 Soy <strong>LensBot</strong>. Puedo responderte sobre ventas, ganancias, lentes más vendidos, stock, órdenes, clientes, catálogo y más. ¿Qué necesitas?`;
  }
  if (botHas(t, ['gracias', 'thank'])) return '¡Con gusto! 😊 Si necesitas algo más, aquí estoy.';
  if (botHas(t, ['adios', 'chau', 'hasta luego', 'bye'])) return '¡Hasta luego! Que tengas excelentes ventas 👓';
  if (botHas(t, ['quien eres', 'que eres', 'como te llamas', 'tu nombre'])) {
    return 'Soy <strong>LensBot</strong>, el asistente inteligente de Lens Group Trujillo. Analizo en tiempo real las órdenes, el inventario y los catálogos del sistema.';
  }
  if (botHas(t, ['ayuda', 'que puedes', 'que sabes', 'opciones', 'comandos', 'help'])) {
    return `Puedo ayudarte con:<br>
      📈 <em>"ventas totales"</em>, <em>"ganancias"</em><br>
      🏆 <em>"lentes más vendidos"</em>, <em>"mejor marca"</em><br>
      📦 <em>"stock crítico"</em>, <em>"inventario"</em><br>
      🧾 <em>"órdenes pendientes"</em>, <em>"urgentes"</em>, <em>"listos"</em><br>
      👤 <em>"clientes"</em> o busca por nombre/DNI/código<br>
      🧒 <em>"catálogo niños"</em>, 🧑 <em>"catálogo adultos"</em><br>
      💡 <em>"recomendaciones"</em>, <em>"hora"</em>, <em>"fecha"</em>`;
  }

  // 2. Hora / fecha
  if (/\b(que hora|hora es|la hora)\b/.test(t)) return `Son las ${BOT_HL(new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }))}.`;
  if (botHas(t, ['fecha', 'que dia es', 'dia es hoy'])) return `Hoy es ${BOT_HL(new Date().toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))}.`;

  // 3. Búsqueda por código de orden o DNI
  const codeMatch = t.match(/lgt-\d{4}-\d{3,4}/);
  const dniMatch = t.match(/\b\d{8}\b/);
  if (codeMatch || dniMatch) {
    const o = d.orders.find(x => (codeMatch && BOT_NORM(x.code) === codeMatch[0]) || (dniMatch && x.dni === dniMatch[0]));
    if (o) {
      return `<strong>Orden ${o.code}</strong><br>👤 ${o.customer} (DNI ${o.dni})<br>👓 ${o.service}<br>📅 Entrega: ${o.estimatedDate}<br>📌 Estado: ${BOT_HL(statusLabel[o.estado] || o.estado)}${o.urgente ? ' 🔥 Urgente' : ''}<br>💰 ${BOT_MONEY(o.price)}`;
    }
    return 'No encontré ninguna orden con ese código o DNI. Verifica el dato e inténtalo de nuevo.';
  }

  // 4. Búsqueda por nombre de cliente
  const byName = d.orders.find(o => BOT_NORM(o.customer).split(' ').some(p => p.length > 3 && t.split(/\s+/).includes(p)));
  if (byName && !botHas(t, ['marca'])) {
    return `Encontré a <strong>${byName.customer}</strong>:<br>🧾 Orden ${byName.code}<br>👓 ${byName.service}<br>📌 Estado: ${BOT_HL(statusLabel[byName.estado] || byName.estado)}<br>📞 ${byName.phone}`;
  }

  // 5. Más vendidos / ranking
  if (botHas(t, ['mas vendid', 'mas se vende', 'top', 'ranking', 'popular', 'mejor marca', 'mejores', 'favorit'])) {
    const top = botTopBrands(d.orders).slice(0, 5);
    const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
    return `<strong>🏆 Lentes / marcas más vendidos:</strong><br>` +
      top.map((b, i) => `${medals[i]} ${b.brand} — ${b.count} venta(s) · ${BOT_MONEY(b.total)}`).join('<br>') +
      `<br><br>Líder: ${BOT_HL(top[0].brand)}. Puedes ver el gráfico de barras en <em>Analítica & Gráficos BI</em>.`;
  }

  // 6. Menos vendidos
  if (botHas(t, ['menos vendid', 'no se vende', 'peor'])) {
    const all = botTopBrands(d.orders);
    const low = all.slice(-3).reverse();
    return `<strong>📉 Menor rotación:</strong><br>` + low.map(b => `• ${b.brand} — ${b.count} venta(s)`).join('<br>') +
      `<br>💡 Considera promociones o combos para estas marcas.`;
  }

  // 7. Ganancias / utilidad / margen
  if (botHas(t, ['ganancia', 'utilidad', 'margen', 'rentab', 'beneficio', 'profit'])) {
    const margin = d.revenue ? (d.profit / d.revenue * 100).toFixed(1) : 0;
    return `<strong>💰 Rentabilidad:</strong><br>Ingresos: ${BOT_MONEY(d.revenue)}<br>Costos: ${BOT_MONEY(d.cost)}<br>Utilidad neta: ${BOT_HL(BOT_MONEY(d.profit))}<br>Margen: <strong>${margin}%</strong>`;
  }

  // 8. Ventas / ingresos
  if (botHas(t, ['venta', 'vendi', 'ingreso', 'factur', 'dinero', 'plata', 'cuanto', 'total', 'caja', 'hoy', 'semana', 'resumen', 'mes'])) {
    const avg = d.orders.length ? d.revenue / d.orders.length : 0;
    const best = [...d.orders].sort((a, b) => b.price - a.price)[0];
    return `<strong>📈 Resumen de ventas:</strong><br>🧾 Órdenes registradas: <strong>${d.orders.length}</strong><br>💵 Ingresos totales: ${BOT_HL(BOT_MONEY(d.revenue))}<br>🎯 Ticket promedio: ${BOT_MONEY(avg)}<br>⭐ Venta más alta: ${best ? `${best.customer} (${BOT_MONEY(best.price)})` : '-'}`;
  }

  // 9. Órdenes por estado
  if (botHas(t, ['urgente'])) {
    const u = d.orders.filter(o => o.urgente);
    return u.length ? `<strong>🔥 Órdenes urgentes (${u.length}):</strong><br>` + u.map(o => `• ${o.code} — ${o.customer} (${statusLabel[o.estado]})`).join('<br>') : 'No hay órdenes urgentes en este momento ✅';
  }
  if (botHas(t, ['listo', 'entrega', 'recoger', 'terminad'])) {
    const l = d.orders.filter(o => o.estado === 'listo');
    return `<strong>✅ Listos para entrega (${l.length}):</strong><br>` + (l.map(o => `• ${o.code} — ${o.customer} 📞 ${o.phone}`).join('<br>') || 'Ninguno por ahora.');
  }
  if (botHas(t, ['orden', 'pedido', 'pendiente', 'proceso', 'taller', 'laboratorio', 'cola', 'trabajo'])) {
    const c = s => d.orders.filter(o => o.estado === s).length;
    return `<strong>🧾 Estado del laboratorio:</strong><br>⏳ En cola: <strong>${c('cola')}</strong><br>⚙️ En proceso: <strong>${c('proceso')}</strong><br>✅ Listos: <strong>${c('listo')}</strong><br>🔥 Urgentes: <strong>${d.orders.filter(o => o.urgente).length}</strong>`;
  }

  // 10. Clientes / pacientes
  if (botHas(t, ['cliente', 'paciente', 'persona', 'comprador'])) {
    const names = d.orders.slice(0, 6).map(o => `• ${o.customer}`).join('<br>');
    return `Tenemos <strong>${d.orders.length}</strong> clientes con órdenes registradas:<br>${names}<br>Escríbeme un nombre, DNI o código (ej. LGT-2025-0342) para ver el detalle.`;
  }

  // 11. Catálogos
  if (botHas(t, ['nino', 'nina', 'infantil', 'kids', 'junior'])) {
    const stock = d.kids.reduce((s, f) => s + f.stock, 0);
    const out = d.kids.filter(f => f.stock === 0);
    return `<strong>🧒 Catálogo de Niños:</strong><br>${d.kids.length} modelos · ${BOT_HL(stock + ' unidades')} en stock<br>` +
      d.kids.map(f => `• ${f.brand} ${f.model} — ${f.stock} u. · ${BOT_MONEY(f.price)}`).join('<br>') +
      (out.length ? `<br>⚠️ Agotados: ${out.map(f => f.model).join(', ')}` : '');
  }
  if (botHas(t, ['adulto', 'dama', 'caballero', 'hombre', 'mujer'])) {
    const stock = d.adults.reduce((s, f) => s + f.stock, 0);
    const out = d.adults.filter(f => f.stock === 0);
    return `<strong>🧑 Catálogo de Adultos:</strong><br>${d.adults.length} modelos · ${BOT_HL(stock + ' unidades')} en stock<br>` +
      d.adults.map(f => `• ${f.brand} ${f.model} — ${f.stock} u. · ${BOT_MONEY(f.price)}`).join('<br>') +
      (out.length ? `<br>⚠️ Agotados: ${out.map(f => f.model).join(', ')}` : '');
  }

  // 12. Stock / inventario
  if (botHas(t, ['agotad', 'critico', 'falta', 'reponer', 'comprar', 'bajo'])) {
    const crit = d.inventory.filter(i => i.stock <= i.threshold);
    return `<strong>⚠️ Productos a reponer (${crit.length}):</strong><br>` +
      crit.map(i => `• ${i.brand} ${i.model} — ${i.stock}/${i.threshold} u.`).join('<br>');
  }
  if (botHas(t, ['stock', 'inventario', 'montura', 'catalogo', 'producto', 'unidades', 'existencia', 'lente', 'luna', 'cristal', 'gafa'])) {
    const total = d.inventory.reduce((s, i) => s + i.stock, 0);
    const value = d.inventory.reduce((s, i) => s + i.stock * i.cost, 0);
    const crit = d.inventory.filter(i => i.stock <= i.threshold).length;
    const kidsStock = d.kids.reduce((s, f) => s + f.stock, 0);
    const adultStock = d.adults.reduce((s, f) => s + f.stock, 0);
    return `<strong>📦 Inventario general:</strong><br>Productos: ${d.inventory.length} · Unidades: <strong>${total}</strong><br>Valor en stock: ${BOT_HL(BOT_MONEY(value))}<br>⚠️ En nivel crítico: <strong>${crit}</strong><br>🧒 Monturas niños: ${kidsStock} u. · 🧑 Adultos: ${adultStock} u.`;
  }

  // 13. Precios
  if (botHas(t, ['precio', 'caro', 'barato', 'cuesta', 'vale'])) {
    const all = [...d.inventory, ...d.kids, ...d.adults];
    const sorted = [...all].sort((a, b) => b.price - a.price);
    return `💲 Más caro: <strong>${sorted[0].brand} ${sorted[0].model}</strong> (${BOT_MONEY(sorted[0].price)})<br>💲 Más económico: <strong>${sorted.at(-1).brand} ${sorted.at(-1).model}</strong> (${BOT_MONEY(sorted.at(-1).price)})`;
  }

  // 14. Búsqueda por marca o modelo
  const allProducts = [...d.inventory, ...d.kids, ...d.adults];
  const prodHits = allProducts.filter(p => {
    const name = BOT_NORM(`${p.brand} ${p.model}`);
    return t.split(/\s+/).some(w => w.length > 3 && name.includes(w));
  });
  if (prodHits.length) {
    return `<strong>🔎 Encontré ${prodHits.length} producto(s):</strong><br>` +
      prodHits.slice(0, 6).map(p => `• ${p.brand} ${p.model} — ${p.stock} u. · ${BOT_MONEY(p.price)}`).join('<br>');
  }

  // 15. Recomendaciones / decisiones
  if (botHas(t, ['recomienda', 'consejo', 'sugerencia', 'que hago', 'decision', 'mejorar', 'estrategia', 'idea'])) {
    const crit = d.inventory.filter(i => i.stock <= i.threshold);
    const top = botTopBrands(d.orders)[0];
    return `<strong>💡 Recomendaciones:</strong><br>1. Reponer ${crit.length} producto(s) críticos (ej. ${crit[0] ? crit[0].brand + ' ' + crit[0].model : '-'}).<br>2. Potenciar ${top.brand}, tu marca líder, con exhibición destacada.<br>3. Ofrecer combos montura + tratamiento Blue Protect para subir el ticket.<br>4. Contactar a los clientes con órdenes listas para acelerar la entrega.`;
  }

  // 16. Usuarios / personal
  if (botHas(t, ['usuario', 'personal', 'empleado', 'trabajador', 'equipo'])) {
    return `<strong>👥 Personal:</strong><br>` + state.users.map(u => `• ${u.name} — ${u.role} (${u.status})`).join('<br>');
  }

  // 17. Preguntas generales sobre ópticas
  if (botHas(t, ['miopia', 'astigmat', 'hipermetrop', 'presbicia', 'vista', 'ojo', 'vision'])) {
    return '👁️ Para problemas visuales recomendamos un examen optométrico completo. Ofrecemos lunas monofocales, bifocales, progresivas FreeForm, fotocromáticas y con filtro Blue Protect para pantallas.';
  }
  if (botHas(t, ['horario', 'abren', 'cierran', 'direccion', 'ubicacion', 'donde'])) {
    return '📍 Galería San Antonio, Jr. Gamarra N° 778 – Trujillo.<br>🕘 Lunes a sábado de 9:00 a.m. a 8:00 p.m.';
  }

  // 18. Respuesta general (siempre útil, nunca "no entendí")
  const d2 = d.orders.filter(o => o.estado !== 'listo').length;
  return `Buena pregunta 🤔 Te comparto un panorama rápido del negocio:<br>💵 Ingresos: ${BOT_HL(BOT_MONEY(d.revenue))} · Utilidad: ${BOT_MONEY(d.profit)}<br>🧾 Órdenes activas: <strong>${d2}</strong><br>🏆 Marca líder: <strong>${botTopBrands(d.orders)[0].brand}</strong><br><br>Puedes preguntarme por ventas, ganancias, stock, clientes, órdenes, catálogo o pedirme recomendaciones.`;
}


function handleLogout() {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
  state.session = null;
  showLoginView();
  showToast('Sesión cerrada con éxito');
}

// ==========================================================================
// 5. CARGA Y SINCRONIZACIÓN DE ÓRDENES
// ==========================================================================
async function loadOrders() {
  try {
    const res = await fetch(API_ORDERS_URL);
    if (res.ok) {
      const data = await res.json();
      if (data && Object.keys(data).length > 0) {
        state.orders = data;
      } else {
        state.orders = DEFAULT_ORDERS;
      }
    } else {
      state.orders = DEFAULT_ORDERS;
    }
  } catch (err) {
    state.orders = DEFAULT_ORDERS;
  }

  updateMetricsAndDecisions();
  renderOrdersTable();
  renderInventory();
  renderCharts();
  updateSimulator();
}

function renderOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;

  const ordersList = Object.values(state.orders);

  const filtered = ordersList.filter(order => {
    if (state.currentFilter === 'cola' && order.estado !== 'cola') return false;
    if (state.currentFilter === 'proceso' && order.estado !== 'proceso') return false;
    if (state.currentFilter === 'listo' && order.estado !== 'listo') return false;
    if (state.currentFilter === 'urgente' && !order.urgente) return false;

    if (state.searchQuery) {
      const q = state.searchQuery;
      const match = (order.code && order.code.toLowerCase().includes(q)) ||
                    (order.customer && order.customer.toLowerCase().includes(q)) ||
                    (order.service && order.service.toLowerCase().includes(q)) ||
                    (order.dni && order.dni.includes(q)) ||
                    (order.brand && order.brand.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Contadores para pestañas
  const countAll = ordersList.length;
  const countCola = ordersList.filter(o => o.estado === 'cola').length;
  const countProceso = ordersList.filter(o => o.estado === 'proceso').length;
  const countListo = ordersList.filter(o => o.estado === 'listo').length;
  const countUrgente = ordersList.filter(o => o.urgente).length;

  document.getElementById('tabCountAll').textContent = countAll;
  document.getElementById('tabCountCola').textContent = countCola;
  document.getElementById('tabCountProceso').textContent = countProceso;
  document.getElementById('tabCountListo').textContent = countListo;
  document.getElementById('tabCountUrgente').textContent = countUrgente;

  // Actualizar badge en el sidebar
  const sidebarOrderBadge = document.getElementById('sidebarOrdersBadge');
  if (sidebarOrderBadge) {
    sidebarOrderBadge.textContent = countAll;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--admin-text-muted);">
          No se encontraron órdenes con los filtros actuales.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(order => {
    const isUrgent = order.urgente;
    let badgeClass = 'badge-cola';
    let badgeText = 'En Cola';
    if (order.estado === 'proceso') {
      badgeClass = 'badge-proceso';
      badgeText = 'En Proceso';
    } else if (order.estado === 'listo') {
      badgeClass = 'badge-listo';
      badgeText = 'Listo para Recojo';
    }

    return `
      <tr>
        <td>
          <strong style="color: var(--admin-text-main); font-family: 'Outfit', sans-serif;">${order.code}</strong>
          ${isUrgent ? `<span class="badge-urgente" style="margin-left: 0.35rem;">URGENTE</span>` : ''}
        </td>
        <td>
          <div style="font-weight: 600; color: var(--admin-text-main);">${order.customer}</div>
          <div style="font-size: 0.75rem; color: var(--admin-text-dim);">DNI: ${order.dni || 'Sin DNI'} · Cel: ${order.phone || '958...'}</div>
        </td>
        <td style="max-width: 260px;">
          <div style="font-weight: 500; font-size: 0.8rem; color: #cbd5e1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${order.service}
          </div>
          <div style="font-size: 0.72rem; color: var(--admin-primary);">${order.treatment || 'Óptica digital'}</div>
        </td>
        <td>
          <span style="font-size: 0.8rem; color: var(--admin-text-muted);">${order.estimatedDate || 'En fecha'}</span>
        </td>
        <td>
          <strong style="color: #34d399;">S/ ${order.price || 450}</strong>
        </td>
        <td>
          <span class="badge-status ${badgeClass}">${badgeText}</span>
        </td>
        <td>
          <select class="select-state" onchange="updateOrderStatus('${order.code}', this.value)">
            <option value="cola" ${order.estado === 'cola' ? 'selected' : ''}>Cola</option>
            <option value="proceso" ${order.estado === 'proceso' ? 'selected' : ''}>Proceso</option>
            <option value="listo" ${order.estado === 'listo' ? 'selected' : ''}>Listo</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');
}

window.updateOrderStatus = async function(code, newEstado) {
  if (!state.orders[code]) return;

  const currentStep = newEstado === 'cola' ? 1 : (newEstado === 'proceso' ? 2 : 3);
  let statusTitle = 'En Cola de Espera';
  let statusBadgeText = 'Cola';
  let statusDesc = 'Receta registrada y montura asignada. En espera de laboratorio.';
  let showPickupBanner = false;

  if (newEstado === 'proceso') {
    statusTitle = 'En Proceso de Laboratorio';
    statusBadgeText = 'Proceso';
    statusDesc = 'Tallado digital, biselado y control de calidad en laboratorio.';
  } else if (newEstado === 'listo') {
    statusTitle = '¡Listo para Recoger en Tienda!';
    statusBadgeText = 'Listo';
    statusDesc = 'Tu pedido ya está en tienda listo para ser entregado.';
    showPickupBanner = true;
  }

  const updatedFields = {
    estado: newEstado,
    currentStep,
    statusTitle,
    statusBadgeText,
    statusDesc,
    showPickupBanner
  };

  state.orders[code] = { ...state.orders[code], ...updatedFields };

  try {
    await fetch(API_ORDERS_URL, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, ...updatedFields })
    });
  } catch (err) {}

  updateMetricsAndDecisions();
  renderOrdersTable();
  renderCharts();
  showToast(`Orden ${code} actualizada a: ${newEstado.toUpperCase()}`);
};

async function handleCreateOrder(e) {
  e.preventDefault();
  const code = document.getElementById('newOrderCode').value.trim();
  const customer = document.getElementById('newOrderCustomer').value.trim();
  const dni = document.getElementById('newOrderDni').value.trim();
  const phone = document.getElementById('newOrderPhone').value.trim();
  const brand = document.getElementById('newOrderBrand').value;
  const treatment = document.getElementById('newOrderTreatment').value;
  const price = parseFloat(document.getElementById('newOrderPrice').value) || 450;
  const urgente = document.getElementById('newOrderUrgent').checked;

  const today = new Date();
  const optDays = urgente ? 1 : 2;
  const estDate = new Date(today);
  estDate.setDate(estDate.getDate() + optDays);
  
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];
  const dateStr = `${today.getDate()} de ${meses[today.getMonth()]}, 2026`;
  const estDateStr = `${estDate.getDate()} de ${meses[estDate.getMonth()]}, 2026`;

  const newOrder = {
    code,
    customer,
    dni,
    phone,
    receivedDate: dateStr,
    estimatedDate: estDateStr,
    brand,
    service: `Montura ${brand} + Cristales ${treatment}`,
    treatment,
    price,
    cost: Math.round(price * 0.42),
    branch: 'Galería San Antonio, Jr. Gamarra N° 778, Trujillo 13001',
    estado: 'cola',
    urgente,
    currentStep: 1,
    statusTitle: 'En Cola de Espera',
    statusBadgeText: 'Cola',
    statusBadgeClass: 'state-badge-progress',
    statusBoxClass: 'status-box-progress',
    statusDesc: 'Receta registrada y montura asignada. En espera de laboratorio.',
    showPickupBanner: false,
    history: [
      { step: 1, name: 'Cola', date: `${dateStr} - Registro inicial`, desc: 'Ingreso al sistema Lens Group Trujillo.' }
    ]
  };

  state.orders[code] = newOrder;

  try {
    await fetch(API_ORDERS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    });
  } catch (err) {}

  document.getElementById('modalNewOrder').classList.remove('active');
  document.getElementById('formNewOrder').reset();

  updateMetricsAndDecisions();
  renderOrdersTable();
  renderCharts();
  showToast(`Nueva orden ${code} registrada con éxito`);
}

// ==========================================================================
// 6. GESTIÓN DE INVENTARIO & STOCK
// ==========================================================================
function renderInventory() {
  const container = document.getElementById('inventoryGrid');
  if (!container) return;

  container.innerHTML = state.inventory.map(item => {
    let pillClass = 'stock-good';
    let pillText = 'En Stock';
    if (item.status === 'critical') {
      pillClass = 'stock-critical';
      pillText = '⚠️ Crítico';
    } else if (item.status === 'medium') {
      pillClass = 'stock-medium';
      pillText = 'Reposición';
    }

    return `
      <div class="inventory-card">
        <div class="inventory-card-header">
          <span style="font-size: 0.75rem; color: var(--admin-primary); font-weight: 700; text-transform: uppercase;">
            ${item.category}
          </span>
          <span class="stock-pill ${pillClass}">${pillText}</span>
        </div>
        <div style="font-size: 1rem; font-weight: 700; color: var(--admin-text-main);">${item.brand}</div>
        <div style="font-size: 0.82rem; color: var(--admin-text-muted);">${item.model}</div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 0.5rem;">
          <div>
            <div style="font-size: 0.7rem; color: var(--admin-text-dim);">DISPONIBLE</div>
            <div class="stock-count-number">${item.stock} <span style="font-size: 0.85rem; font-weight: 500; color: var(--admin-text-dim);">uds</span></div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.7rem; color: var(--admin-text-dim);">PRECIO VENTA</div>
            <div style="font-size: 1rem; font-weight: 700; color: #34d399;">S/ ${item.price}</div>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
          <button type="button" class="btn-decision-action" style="flex: 1;" onclick="replenishStock('${item.id}')">
            +5 uds
          </button>
          <button type="button" class="btn-header-action" style="flex: 1;" onclick="openInventoryModal('${item.id}')">
            Editar
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.openInventoryModal = function(itemId = null) {
  const modal = document.getElementById('modalInventory');
  const form = document.getElementById('formInventory');
  if (!modal || !form) return;
  
  form.reset();
  
  if (itemId) {
    const item = state.inventory.find(i => i.id === itemId);
    if (item) {
      document.getElementById('modalInventoryTitle').textContent = 'Editar Producto';
      document.getElementById('btnSaveInventoryText').textContent = 'Guardar Cambios';
      document.getElementById('invItemId').value = item.id;
      document.getElementById('invCategory').value = item.category;
      document.getElementById('invBrand').value = item.brand;
      document.getElementById('invModel').value = item.model;
      document.getElementById('invStock').value = item.stock;
      document.getElementById('invCost').value = item.cost;
      document.getElementById('invPrice').value = item.price;
    }
  } else {
    document.getElementById('modalInventoryTitle').textContent = 'Nuevo Producto';
    document.getElementById('btnSaveInventoryText').textContent = 'Crear Producto';
    document.getElementById('invItemId').value = '';
  }
  
  modal.classList.add('active');
};

function handleSaveInventory(e) {
  e.preventDefault();
  
  const id = document.getElementById('invItemId').value;
  const category = document.getElementById('invCategory').value;
  const brand = document.getElementById('invBrand').value;
  const model = document.getElementById('invModel').value;
  const stock = parseInt(document.getElementById('invStock').value, 10);
  const cost = parseFloat(document.getElementById('invCost').value);
  const price = parseFloat(document.getElementById('invPrice').value);
  
  let status = 'good';
  if (stock <= 3) status = 'critical';
  else if (stock <= 6) status = 'medium';

  if (id) {
    const idx = state.inventory.findIndex(i => i.id === id);
    if (idx !== -1) {
      state.inventory[idx] = { ...state.inventory[idx], category, brand, model, stock, cost, price, status };
      showToast('Producto actualizado correctamente');
    }
  } else {
    const newId = 'inv-' + Date.now();
    state.inventory.unshift({ id: newId, category, brand, model, stock, cost, price, status, threshold: 5 });
    showToast('Nuevo producto agregado');
  }
  
  document.getElementById('modalInventory').classList.remove('active');
  renderInventory();
}
window.replenishStock = function(itemId) {
  const item = state.inventory.find(i => i.id === itemId);
  if (item) {
    item.stock += 5;
    item.status = item.stock > item.threshold ? 'good' : 'medium';
    renderInventory();
    showToast(`Reabastecido: +5 unidades de ${item.brand} ${item.model}`);
  }
};

// ==========================================================================
// 7. KPIS Y DECISIONES
// ==========================================================================
function updateMetricsAndDecisions() {
  const ordersList = Object.values(state.orders);
  
  const totalRevenue = ordersList.reduce((acc, cur) => acc + (cur.price || 450), 0);
  const avgTicket = ordersList.length ? Math.round(totalRevenue / ordersList.length) : 0;
  const activeOrders = ordersList.filter(o => o.estado !== 'listo').length;
  const readyOrders = ordersList.filter(o => o.estado === 'listo').length;
  const urgentOrders = ordersList.filter(o => o.urgente && o.estado !== 'listo').length;

  const onTimeRate = ordersList.length ? (94.2 + (readyOrders * 0.5)).toFixed(1) : 95.0;

  // Actualizar en todas las instancias de KPIs (tanto en overview como en analytics)
  document.querySelectorAll('[data-kpi="revenue"]').forEach(el => {
    el.textContent = `S/ ${(totalRevenue * 12).toLocaleString('es-PE')}`;
  });
  document.querySelectorAll('[data-kpi="ticket"]').forEach(el => {
    el.textContent = `S/ ${avgTicket}`;
  });
  document.querySelectorAll('[data-kpi="ontime"]').forEach(el => {
    el.textContent = `${Math.min(99.4, onTimeRate)}%`;
  });
  document.querySelectorAll('[data-kpi="active"]').forEach(el => {
    el.textContent = activeOrders;
  });

  const decisionBadge = document.getElementById('sidebarDecisionsBadge');
  if (decisionBadge) {
    decisionBadge.textContent = urgentOrders > 0 ? `${urgentOrders} urgentes` : '4 activas';
  }
}

// ==========================================================================
// 8. GRÁFICOS (CHART.JS)
// ==========================================================================
function renderCharts() {
  if (typeof Chart === 'undefined') return;

  const ordersList = Object.values(state.orders);

  // 1. Tendencia de Ingresos Semanales
  const ctxRevenue = document.getElementById('chartRevenueTrend');
  if (ctxRevenue) {
    if (state.charts.revenue) state.charts.revenue.destroy();

    state.charts.revenue = new Chart(ctxRevenue, {
      type: 'line',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4 (Actual)'],
        datasets: [
          {
            label: 'Ingresos Reales (S/)',
            data: [11200, 14500, 13800, 15320],
            borderColor: '#0d9488',
            backgroundColor: 'rgba(13, 148, 136, 0.15)',
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: '#5eead4',
            pointRadius: 5
          },
          {
            label: 'Meta Presupuestada (S/)',
            data: [12000, 13000, 14000, 15000],
            borderColor: 'rgba(255, 255, 255, 0.25)',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#94a3b8', font: { family: 'Inter' } } }
        },
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } }
        }
      }
    });
  }

  // 2. Cuota por Marca
  const ctxBrands = document.getElementById('chartBrandShare');
  if (ctxBrands) {
    if (state.charts.brands) state.charts.brands.destroy();

    const brandCounts = {};
    ordersList.forEach(o => {
      const b = o.brand || 'Otras';
      brandCounts[b] = (brandCounts[b] || 0) + 1;
    });

    state.charts.brands = new Chart(ctxBrands, {
      type: 'doughnut',
      data: {
        labels: Object.keys(brandCounts).length ? Object.keys(brandCounts) : ['Ray-Ban', 'Oakley', 'Vogue', 'InkaLens', 'Sylvane'],
        datasets: [{
          data: Object.values(brandCounts).length ? Object.values(brandCounts) : [35, 25, 18, 14, 8],
          backgroundColor: [
            '#0d9488',
            '#38bdf8',
            '#818cf8',
            '#f59e0b',
            '#f43f5e',
            '#10b981'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 12, padding: 15 } }
        },
        cutout: '65%'
      }
    });
  }

  // 3. Tratamientos de Lunas
  const ctxTreatments = document.getElementById('chartTreatments');
  if (ctxTreatments) {
    if (state.charts.treatments) state.charts.treatments.destroy();

    state.charts.treatments = new Chart(ctxTreatments, {
      type: 'bar',
      data: {
        labels: ['Blue Protect', 'Fotocromático', 'Antirreflejo HD', 'Polarizado', 'Crizal UV'],
        datasets: [{
          label: 'Órdenes Solicitadas',
          data: [42, 28, 24, 18, 15],
          backgroundColor: '#38bdf8',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } }
        }
      }
    });
  }

  // --- NUEVO: Gráfico de Ventas de Productos ---
  const ctxSalesProducts = document.getElementById('salesProductsChart');
  if (ctxSalesProducts) {
    if (state.charts.salesProducts) state.charts.salesProducts.destroy();

    state.charts.salesProducts = new Chart(ctxSalesProducts, {
      type: 'bar',
      data: {
        labels: ['Miraflex Azul', 'Nano TR90', 'Ray-Ban Kids', 'InkaLens', 'Miraflex Lila'],
        datasets: [{
          label: 'Unidades Vendidas',
          data: [14, 8, 5, 3, 2],
          backgroundColor: '#0ea5e9',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { 
            beginAtZero: true, 
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { color: '#64748b' }
          },
          x: { 
            grid: { display: false },
            ticks: { color: '#475569', font: { weight: '600' }, maxRotation: 45, minRotation: 45 }
          }
        }
      }
    });
  }
}

// ==========================================================================
// 9. SIMULADOR DE ESCENARIOS (WHAT-IF)
// ==========================================================================
function simCompute(discount, patientsInc, premiumRate) {
  const baseMonthlyPatients = 140;
  const baseAvgTicket = 450;
  const baseMargin = 0.58;

  const simulatedPatients = baseMonthlyPatients * (1 + patientsInc / 100);
  const effectiveTicket = (baseAvgTicket * (1 - discount / 100)) + ((premiumRate - 40) * 2.5);
  const revenue = Math.round(simulatedPatients * effectiveTicket);
  const margin = Math.max(35, Math.min(72, (baseMargin - (discount * 0.008) + (premiumRate * 0.002)) * 100));
  const profit = Math.round(revenue * (margin / 100));
  return { revenue, margin, profit };
}

function simSetDelta(el, current, base) {
  if (!el) return;
  const diff = current - base;
  const pct = base ? (diff / base) * 100 : 0;
  el.classList.remove('up', 'down');
  if (Math.abs(pct) < 0.05) {
    el.textContent = '— sin cambios vs. base';
  } else {
    el.classList.add(diff > 0 ? 'up' : 'down');
    el.textContent = `${diff > 0 ? '▲ +' : '▼ '}S/ ${Math.abs(diff).toLocaleString('es-PE')} (${pct > 0 ? '+' : ''}${pct.toFixed(1)}%)`;
  }
}

function updateSimulator() {
  const discountEl = document.getElementById('simDiscount');
  const patientsEl = document.getElementById('simPatients');
  const premiumEl = document.getElementById('simPremium');
  if (!discountEl || !patientsEl || !premiumEl) return;

  const discount = parseInt(discountEl.value) || 0;
  const patientsInc = parseInt(patientsEl.value) || 0;
  const premiumRate = parseInt(premiumEl.value) || 40;

  document.getElementById('lblSimDiscount').textContent = `${discount}%`;
  document.getElementById('lblSimPatients').textContent = `+${patientsInc}%`;
  document.getElementById('lblSimPremium').textContent = `${premiumRate}%`;

  // Relleno visual de los sliders
  [discountEl, patientsEl, premiumEl].forEach(s => {
    const pct = ((s.value - s.min) / (s.max - s.min)) * 100;
    s.style.setProperty('--fill', `${pct}%`);
  });

  const base = simCompute(0, 0, 40);
  const sim = simCompute(discount, patientsInc, premiumRate);

  document.getElementById('simResultRevenue').textContent = `S/ ${sim.revenue.toLocaleString('es-PE')}`;
  document.getElementById('simResultProfit').textContent = `S/ ${sim.profit.toLocaleString('es-PE')}`;
  document.getElementById('simResultMargin').textContent = `${sim.margin.toFixed(1)}%`;

  const bar = document.getElementById('simMarginBar');
  if (bar) bar.style.width = `${Math.min(100, sim.margin)}%`;

  simSetDelta(document.getElementById('simDeltaRevenue'), sim.revenue, base.revenue);
  simSetDelta(document.getElementById('simDeltaProfit'), sim.profit, base.profit);

  // Determinar estado de decisión (antes estaba fijo en "Óptimo")
  const profitChange = base.profit ? (sim.profit - base.profit) / base.profit : 0;
  let status;
  if (discount > 18 && premiumRate < 45) {
    status = {
      tone: 'danger', label: 'Riesgoso', hint: 'Margen en erosión',
      icon: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
      text: '<strong>Alerta de Erosión de Margen:</strong> Descuento excesivo sin suficiente venta cruzada de lunas de alto valor. Se sugiere topar el descuento al 12%.'
    };
  } else if (profitChange < -0.03) {
    status = {
      tone: 'warning', label: 'Precaución', hint: 'Utilidad por debajo de la base',
      icon: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>',
      text: '<strong>Escenario con Pérdida de Utilidad:</strong> El incentivo no se compensa con el volumen esperado. Aumenta la campaña de captación o la adopción de lunas premium.'
    };
  } else if (profitChange >= 0.15 && sim.margin >= 50) {
    status = {
      tone: 'success', label: 'Óptimo', hint: 'Altamente rentable',
      icon: '<polyline points="20 6 9 17 4 12"></polyline>',
      text: '<strong>Estrategia Altamente Rentable:</strong> El volumen y las lunas premium compensan con creces el incentivo. Se proyecta récord de utilidad.'
    };
  } else {
    status = {
      tone: 'info', label: 'Equilibrado', hint: profitChange > 0 ? 'Mejora moderada' : 'Escenario base',
      icon: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
      text: '<strong>Escenario Equilibrado:</strong> Crecimiento controlado y margen saludable dentro del promedio del sector en Trujillo.'
    };
  }

  const statusBox = document.getElementById('simStatusBox');
  if (statusBox) {
    statusBox.className = `sim-metric-box sim-tone-${status.tone}`;
    document.getElementById('simResultStatus').textContent = status.label;
    document.getElementById('simStatusHint').textContent = status.hint;
  }

  const verdictBox = document.getElementById('simVerdictBox');
  if (verdictBox) {
    verdictBox.removeAttribute('style');
    verdictBox.className = `sim-verdict-box sim-verdict-${status.tone}`;
    verdictBox.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${status.icon}</svg>
      <span>${status.text}</span>
    `;
  }
}

window.resetSimulator = function () {
  const d = document.getElementById('simDiscount');
  const p = document.getElementById('simPatients');
  const r = document.getElementById('simPremium');
  if (d) d.value = 0;
  if (p) p.value = 0;
  if (r) r.value = 40;
  updateSimulator();
};

document.addEventListener('click', e => {
  if (e.target.closest && e.target.closest('#btnSimReset')) window.resetSimulator();
});

// ==========================================================================
// 10. EXPORTAR REPORTE CSV
// ==========================================================================
function exportOrdersToCsv() {
  const orders = Object.values(state.orders);
  if (!orders.length) return showToast('No hay órdenes para exportar');

  const headers = ['Código', 'Paciente', 'DNI', 'Teléfono', 'Servicio', 'Marca', 'Tratamiento', 'Precio (S/)', 'Estado', 'Fecha Recibido', 'Fecha Estimada'];
  const rows = orders.map(o => [
    `"${o.code}"`,
    `"${o.customer}"`,
    `"${o.dni || ''}"`,
    `"${o.phone || ''}"`,
    `"${o.service}"`,
    `"${o.brand || ''}"`,
    `"${o.treatment || ''}"`,
    o.price || 0,
    `"${o.estado}"`,
    `"${o.receivedDate}"`,
    `"${o.estimatedDate}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Reporte_LensGroup_Trujillo_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Reporte ejecutivo CSV descargado con éxito');
}

// Toast
function showToast(msg) {
  let toast = document.getElementById('adminToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'adminToast';
    toast.className = 'admin-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5eead4" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${msg}</span>
  `;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}
