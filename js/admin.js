/**
 * CALL ME ROSE - Standalone Admin Page Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const store = window.shopStore;
  let isAuthenticated = sessionStorage.getItem('CALL_ME_ROSE_ADMIN_AUTH') === 'true';

  const loginView = document.getElementById('admin-login-view');
  const dashboardView = document.getElementById('admin-dashboard-view');
  const loginForm = document.getElementById('page-login-form');
  const logoutBtn = document.getElementById('admin-logout-btn');

  // --- AUTHENTICATION CHECK ---
  function updateAuthUI() {
    if (isAuthenticated) {
      loginView.classList.add('hidden');
      dashboardView.classList.remove('hidden');
      renderDashboardStats();
      loadSettingsForm();
      loadVietQRForm();
      renderProductsTable();
      renderWorkshopsList();
      renderOrdersTable();
      renderBookingsTable();
    } else {
      loginView.classList.remove('hidden');
      dashboardView.classList.add('hidden');
    }
  }

  loginForm.onsubmit = (e) => {
    e.preventDefault();
    const u = document.getElementById('page-user').value;
    const p = document.getElementById('page-pass').value;

    if (u === 'admin' && p === '123456') {
      isAuthenticated = true;
      sessionStorage.setItem('CALL_ME_ROSE_ADMIN_AUTH', 'true');
      updateAuthUI();
    } else {
      alert("Tài khoản hoặc mật khẩu không chính xác!");
    }
  };

  logoutBtn.onclick = () => {
    isAuthenticated = false;
    sessionStorage.removeItem('CALL_ME_ROSE_ADMIN_AUTH');
    updateAuthUI();
  };

  // --- STATS OVERVIEW ---
  function renderDashboardStats() {
    const orders = store.getOrders();
    const bookings = store.getBookings();
    const prods = store.data.products;

    document.getElementById('stat-total-orders').textContent = orders.length;
    document.getElementById('stat-total-bookings').textContent = bookings.length;
    document.getElementById('stat-total-products').textContent = prods.length;
  }

  // --- TAB SWITCHER IN ADMIN DASHBOARD ---
  const navBtns = document.querySelectorAll('.adm-nav-btn');
  const panels = document.querySelectorAll('.adm-panel');

  navBtns.forEach(btn => {
    btn.onclick = () => {
      const tabTarget = btn.dataset.admTab;
      
      navBtns.forEach(b => {
        b.className = 'w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-olive-700 hover:bg-olive-50 adm-nav-btn flex items-center gap-2';
      });
      btn.className = 'w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-olive-900 bg-olive-100 adm-nav-btn flex items-center gap-2';

      panels.forEach(p => p.classList.add('hidden'));
      const targetPanel = document.getElementById(`adm-panel-${tabTarget}`);
      if (targetPanel) targetPanel.classList.remove('hidden');

      lucide.createIcons();
    };
  });

  // --- 1. GENERAL SETTINGS ---
  function loadSettingsForm() {
    const s = store.data.settings;
    document.getElementById('adm-brand-header').textContent = `${s.shopName} Admin`;
    document.getElementById('adm-input-shopName').value = s.shopName;
    document.getElementById('adm-input-slogan').value = s.slogan;
    document.getElementById('adm-input-phone').value = s.phone;
    document.getElementById('adm-input-zalo').value = s.zalo;
    document.getElementById('adm-input-tiktok').value = s.tiktok;
    document.getElementById('adm-input-facebook').value = s.facebook;
    document.getElementById('adm-input-address').value = s.address;
  }

  document.getElementById('adm-form-general').onsubmit = (e) => {
    e.preventDefault();
    store.data.settings.shopName = document.getElementById('adm-input-shopName').value;
    store.data.settings.slogan = document.getElementById('adm-input-slogan').value;
    store.data.settings.phone = document.getElementById('adm-input-phone').value;
    store.data.settings.zalo = document.getElementById('adm-input-zalo').value;
    store.data.settings.tiktok = document.getElementById('adm-input-tiktok').value;
    store.data.settings.facebook = document.getElementById('adm-input-facebook').value;
    store.data.settings.address = document.getElementById('adm-input-address').value;

    store.saveData();
    document.getElementById('adm-brand-header').textContent = `${store.data.settings.shopName} Admin`;
    alert("Đã cập nhật thông tin shop thành công!");
  };

  // --- 2. VIETQR SETTINGS ---
  function loadVietQRForm() {
    const b = store.data.settings.bank;
    document.getElementById('adm-input-bankName').value = b.bankName;
    document.getElementById('adm-input-accountNumber').value = b.accountNumber;
    document.getElementById('adm-input-accountName').value = b.accountName;
    updateQRPreview();
  }

  function updateQRPreview() {
    const bName = document.getElementById('adm-input-bankName').value;
    const accNo = document.getElementById('adm-input-accountNumber').value.replace(/\s+/g, '');
    const accName = document.getElementById('adm-input-accountName').value;

    const cleanBank = bName.includes('MB') ? 'MB' : 'VCB';
    const qrUrl = `https://img.vietqr.io/image/${cleanBank}-${accNo}-compact2.png?amount=100000&addInfo=PREVIEW&accountName=${encodeURIComponent(accName)}`;
    document.getElementById('adm-qr-preview').src = qrUrl;
  }

  ['adm-input-bankName', 'adm-input-accountNumber', 'adm-input-accountName'].forEach(id => {
    document.getElementById(id).oninput = updateQRPreview;
  });

  document.getElementById('adm-form-vietqr').onsubmit = (e) => {
    e.preventDefault();
    store.data.settings.bank.bankName = document.getElementById('adm-input-bankName').value;
    store.data.settings.bank.accountNumber = document.getElementById('adm-input-accountNumber').value;
    store.data.settings.bank.accountName = document.getElementById('adm-input-accountName').value;

    store.saveData();
    alert("Đã cập nhật cấu hình tài khoản VietQR thành công!");
  };

  // --- 3. PRODUCTS MANAGEMENT ---
  function renderProductsTable() {
    const tbody = document.getElementById('adm-products-tbody');
    tbody.innerHTML = '';

    store.data.products.forEach(p => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-olive-100 hover:bg-olive-50/50';
      const priceFormatted = new Intl.NumberFormat('vi-VN').format(p.price) + 'đ';

      tr.innerHTML = `
        <td class="p-2.5"><img src="${p.image}" class="w-10 h-10 object-cover rounded-lg"></td>
        <td class="p-2.5 font-bold text-olive-900">${p.name}</td>
        <td class="p-2.5"><span class="bg-olive-100 text-olive-800 text-[10px] font-bold px-2 py-0.5 rounded">${p.category}</span></td>
        <td class="p-2.5 font-bold text-olive-700">${priceFormatted}</td>
        <td class="p-2.5 text-right">
          <button onclick="admDeleteProduct('${p.id}')" class="text-red-500 hover:underline font-bold">Xóa</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  document.getElementById('adm-form-new-product').onsubmit = (e) => {
    e.preventDefault();
    const newP = {
      id: 'prod-' + Date.now(),
      name: document.getElementById('new-p-name').value,
      price: parseInt(document.getElementById('new-p-price').value),
      category: document.getElementById('new-p-cat').value,
      description: document.getElementById('new-p-desc').value || 'Sản phẩm hoa resin thủ công nghệ thuật.',
      image: 'assets/resin_floral_light.png',
      rating: 5.0,
      reviewsCount: 1,
      isBestSeller: false
    };

    store.data.products.push(newP);
    store.saveData();
    renderProductsTable();
    renderDashboardStats();
    document.getElementById('adm-form-new-product').reset();
    alert("Đã thêm sản phẩm mới thành công!");
  };

  window.admDeleteProduct = function(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi shop?")) {
      store.data.products = store.data.products.filter(p => p.id !== id);
      store.saveData();
      renderProductsTable();
      renderDashboardStats();
    }
  };

  // --- 4. WORKSHOPS MANAGEMENT ---
  function renderWorkshopsList() {
    const container = document.getElementById('adm-workshops-list');
    container.innerHTML = '';

    store.data.workshops.forEach(ws => {
      const card = document.createElement('div');
      card.className = 'bg-olive-50 p-4 rounded-xl border border-olive-200 flex justify-between items-center';
      const priceFormatted = new Intl.NumberFormat('vi-VN').format(ws.pricePerGuest) + 'đ/khách';

      card.innerHTML = `
        <div>
          <h4 class="font-bold text-olive-900">${ws.title}</h4>
          <p class="text-olive-500">Thời lượng: ${ws.duration} • Giá: ${priceFormatted}</p>
        </div>
        <span class="bg-olive-200 text-olive-800 text-[10px] font-bold px-2.5 py-1 rounded">Đang mở đăng ký</span>
      `;
      container.appendChild(card);
    });
  }

  // --- 5. ORDERS TABLE ---
  function renderOrdersTable() {
    const tbody = document.getElementById('adm-orders-tbody');
    const orders = store.getOrders();

    if (orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="p-6 text-center text-olive-400">Chưa có đơn hàng nào.</td></tr>`;
      return;
    }

    tbody.innerHTML = '';
    orders.forEach(o => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-olive-100';
      const amountFormatted = new Intl.NumberFormat('vi-VN').format(o.totalAmount || 0) + 'đ';

      tr.innerHTML = `
        <td class="p-2.5 font-mono font-bold">${o.id}</td>
        <td class="p-2.5">${o.createdAt || 'N/A'}</td>
        <td class="p-2.5 font-bold">${o.customerName || 'Khách Mua Web'} (${o.customerPhone || 'N/A'})</td>
        <td class="p-2.5 font-bold text-olive-800">${amountFormatted}</td>
        <td class="p-2.5"><span class="bg-olive-100 text-olive-800 px-2 py-0.5 rounded text-[10px] font-bold">${o.status}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // --- 6. BOOKINGS TABLE ---
  function renderBookingsTable() {
    const tbody = document.getElementById('adm-bookings-tbody');
    const bookings = store.getBookings();

    if (bookings.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="p-6 text-center text-olive-400">Chưa có lịch đặt Workshop nào.</td></tr>`;
      return;
    }

    tbody.innerHTML = '';
    bookings.forEach(b => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-olive-100';
      const depFormatted = new Intl.NumberFormat('vi-VN').format(b.totalDeposit || 0) + 'đ';

      tr.innerHTML = `
        <td class="p-2.5 font-mono font-bold">${b.id}</td>
        <td class="p-2.5 font-bold">${b.guestName} (${b.guestPhone})</td>
        <td class="p-2.5">${b.workshopTitle}</td>
        <td class="p-2.5">${b.date} (${b.slot})</td>
        <td class="p-2.5 font-bold text-olive-700">${depFormatted}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Initial load check
  updateAuthUI();
});
