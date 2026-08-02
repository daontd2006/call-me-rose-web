/**
 * CALL ME ROSE - Main Application Logic & Interactivity
 * Pure Minimal Light Olive Theme
 */

function initApp() {
  const store = window.shopStore || new ShopStore();
  let activeCategory = 'all';

  // --- SINGLE PAGE VIEW ROUTING (HOME / WORKSHOP / PRESERVATION / PRODUCT DETAIL) ---
  window.openPageView = function(viewName, productId = null) {
    const mainContent = document.getElementById('main-content');
    const viewWorkshop = document.getElementById('view-workshop');
    const viewPreservation = document.getElementById('view-preservation');
    const viewProductDetail = document.getElementById('view-product-detail');

    if (viewWorkshop) viewWorkshop.classList.add('hidden');
    if (viewPreservation) viewPreservation.classList.add('hidden');
    if (viewProductDetail) viewProductDetail.classList.add('hidden');
    if (mainContent) mainContent.classList.remove('hidden');

    if (viewName === 'workshop') {
      if (mainContent) mainContent.classList.add('hidden');
      if (viewWorkshop) viewWorkshop.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'preservation') {
      if (mainContent) mainContent.classList.add('hidden');
      if (viewPreservation) viewPreservation.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'product-detail' && productId) {
      if (mainContent) mainContent.classList.add('hidden');
      if (viewProductDetail) viewProductDetail.classList.remove('hidden');
      renderProductDetailPage(productId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const mobileDrawer = document.getElementById('mobile-menu-drawer');
    if (mobileDrawer) mobileDrawer.classList.add('hidden');
  };

  // --- INITIALIZE UI DATA ---
  function updateShopInfoUI() {
    const s = store.data.settings;
    
    document.getElementById('nav-brand-name').textContent = s.shopName;
    document.getElementById('footer-slogan').textContent = s.slogan;
    document.getElementById('footer-address').textContent = s.address;
    document.getElementById('footer-phone').textContent = s.phone;
    document.getElementById('footer-tiktok').href = s.tiktok;
    document.getElementById('footer-facebook').href = s.facebook;
    const zaloBtn = document.getElementById('floating-zalo-btn');
    if (zaloBtn) zaloBtn.onclick = () => window.open(`https://zalo.me/${(s.zalo || '0328921206').replace(/\s+/g, '')}`, '_blank');
    
    // Ensure ambient video background auto plays seamlessly
    const heroVid = document.getElementById('hero-ambient-video');
    if (heroVid) {
      heroVid.muted = true;
      heroVid.play().catch(() => {});
    }
  }

  // --- RENDER PRODUCTS GRID ---
  function renderProducts(query = '') {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    // Ensure fallback products if localStorage is empty
    if (!store.data || !store.data.products || store.data.products.length === 0) {
      if (typeof DEFAULT_SHOP_DATA !== 'undefined' && DEFAULT_SHOP_DATA.products) {
        store.data = store.data || {};
        store.data.products = [...DEFAULT_SHOP_DATA.products];
        if (store.saveData) store.saveData();
      }
    }

    let items = store.data.products || [];
    if (activeCategory !== 'all') {
      items = items.filter(p => p.category === activeCategory);
    }
    if (query.trim() !== '') {
      const q = query.toLowerCase();
      items = items.filter(p => (p.name && p.name.toLowerCase().includes(q)) || (p.description && p.description.toLowerCase().includes(q)));
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-12 text-olive-400">
          <i data-lucide="package-search" class="w-10 h-10 mx-auto mb-2 text-olive-300"></i>
          <p class="text-xs font-medium">Không tìm thấy sản phẩm phù hợp.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    items.forEach(p => {
      const card = document.createElement('div');
      card.className = 'clean-card overflow-hidden flex flex-col justify-between group cursor-pointer p-4';
      card.onclick = () => openPageView('product-detail', p.id);

      const catNames = {
        'muguet-de-mai': 'Muguet de mai',
        'clay-lily': 'Muguet de mai',
        'bridal-headpieces': 'Bridal - Headpieces',
        'accessories': 'Accessories',
        'bridal-jewelry': 'Accessories',
        'preservation': 'Preservation'
      };
      const catDisplay = catNames[p.category] || p.category;

      card.innerHTML = `
        <div>
          <div class="relative overflow-hidden h-80 sm:h-96 lg:h-[420px] rounded-2xl bg-olive-50 mb-3">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="space-y-1">
            <div class="text-[10px] text-olive-500 font-semibold uppercase tracking-[0.2em]">${catDisplay}</div>
            <h3 class="font-serif text-base sm:text-lg font-normal text-olive-900 group-hover:text-olive-600 transition-colors line-clamp-1">${p.name}</h3>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
  }

  // --- RENDER DEDICATED PRODUCT DETAIL PAGE ---
  function renderProductDetailPage(productId) {
    const p = store.data.products.find(item => item.id === productId);
    if (!p) return;

    const catNames = {
      'muguet-de-mai': 'Muguet de mai',
      'clay-lily': 'Muguet de mai',
      'bridal-headpieces': 'Bridal - Headpieces',
      'accessories': 'Accessories',
      'bridal-jewelry': 'Accessories',
      'preservation': 'Preservation'
    };
    const catDisplay = catNames[p.category] || p.category;
    const priceFormatted = new Intl.NumberFormat('vi-VN').format(p.price) + 'đ';

    document.getElementById('pdetail-category-breadcrumb').textContent = catDisplay.toUpperCase();

    const container = document.getElementById('product-detail-container');
    container.innerHTML = `
      <!-- Left Column: High-Res Image Gallery Showcase -->
      <div class="lg:col-span-6 space-y-4">
        <div class="relative rounded-3xl overflow-hidden bg-white shadow-xl aspect-[4/5] border border-olive-100/80 group">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
          <span class="absolute top-4 left-4 bg-olive-900/90 backdrop-blur-md text-white text-[10px] uppercase font-semibold tracking-widest px-3.5 py-1.5 rounded-full shadow-sm">
            Handcrafted Clay
          </span>
        </div>
      </div>

      <!-- Right Column: Luxury Product Information & Direct Order Options -->
      <div class="lg:col-span-6 space-y-8">
        <div class="space-y-3">
          <span class="text-xs font-semibold uppercase tracking-[0.25em] text-olive-500">${catDisplay}</span>
          <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#3E452E] tracking-tight leading-tight">
            ${p.name}
          </h1>
          <div class="font-serif text-2xl font-semibold text-olive-800 pt-1">
            ${priceFormatted}
          </div>
        </div>

        <p class="text-sm text-olive-700 leading-relaxed font-light">
          ${p.description}
        </p>

        <!-- Custom Note / Engraving Input -->
        <div class="space-y-2 bg-white p-5 rounded-2xl border border-olive-200/80 shadow-sm">
          <label class="block text-xs font-semibold text-olive-800 uppercase tracking-wider" for="pdetail-custom-note">
            ✦ SPECIAL REQUESTS &amp; ENGRAVING:
          </label>
          <input type="text" id="pdetail-custom-note" placeholder="Enter names &amp; date (e.g. Nam &amp; Mai 2026)..." class="w-full bg-olive-50/70 border border-olive-200 rounded-xl p-3 text-xs text-olive-900 focus:outline-none focus:border-olive-500">
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3 pt-2">
          <button id="pdetail-add-cart-btn" class="w-full py-4 rounded-full bg-olive-900 text-white font-serif text-xs font-semibold tracking-[0.2em] uppercase hover:bg-olive-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            <i data-lucide="shopping-bag" class="w-4 h-4"></i> ADD TO BAG
          </button>
          <button onclick="window.open('https://zalo.me/0328921206', '_blank')" class="w-full py-3.5 rounded-full bg-white text-olive-800 border border-olive-300 font-serif text-xs font-semibold tracking-[0.15em] uppercase hover:bg-olive-50 transition-all flex items-center justify-center gap-2">
            <i data-lucide="message-circle" class="w-4 h-4 text-olive-600"></i> ZALO CONSULTATION
          </button>
        </div>

        <!-- Material & Delivery Guarantees -->
        <div class="border-t border-olive-200/80 pt-6 space-y-4 text-xs text-olive-700">
          <div class="flex items-start gap-3">
            <i data-lucide="sparkles" class="w-4 h-4 text-olive-500 shrink-0 mt-0.5"></i>
            <div>
              <strong class="text-olive-900 block font-semibold mb-0.5">Artisanal Craftsmanship:</strong>
              Tạo hình hoàn toàn bằng tay từ đất sét Nhật Bản siêu nhẹ xốp, giữ nguyên vẻ đẹp mềm mại nghệ thuật cùng thời gian.
            </div>
          </div>
          <div class="flex items-start gap-3">
            <i data-lucide="truck" class="w-4 h-4 text-olive-500 shrink-0 mt-0.5"></i>
            <div>
              <strong class="text-olive-900 block font-semibold mb-0.5">Packaging &amp; Delivery:</strong>
              Đóng gói kèm hộp quà tặng bọc lụa sang trọng, bọc đệm chống va đập, vận chuyển cẩn thận tới tận tay cô dâu trên toàn quốc.
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('pdetail-add-cart-btn').onclick = () => {
      const note = document.getElementById('pdetail-custom-note').value;
      addToCart(p.id, note);
    };

    // Render Related Products
    const relatedGrid = document.getElementById('related-products-grid');
    relatedGrid.innerHTML = '';

    const relatedItems = store.data.products.filter(item => item.id !== p.id).slice(0, 3);
    relatedItems.forEach(rel => {
      const relPriceFormatted = new Intl.NumberFormat('vi-VN').format(rel.price) + 'đ';
      const relCatDisplay = catNames[rel.category] || rel.category;

      const card = document.createElement('div');
      card.className = 'clean-card overflow-hidden flex flex-col justify-between group cursor-pointer p-4';
      card.onclick = () => openPageView('product-detail', rel.id);

      card.innerHTML = `
        <div>
          <div class="relative overflow-hidden h-72 sm:h-80 rounded-2xl bg-olive-50 mb-3">
            <img src="${rel.image}" alt="${rel.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="space-y-1">
            <div class="text-[10px] text-olive-500 font-semibold uppercase tracking-[0.2em]">${relCatDisplay}</div>
            <h4 class="font-serif text-base font-normal text-olive-900 group-hover:text-olive-600 transition-colors line-clamp-1">${rel.name}</h4>
          </div>
        </div>
      `;
      relatedGrid.appendChild(card);
    });

    lucide.createIcons();
  }

  // --- RENDER WORKSHOP SECTION ---
  function renderWorkshops() {
    const list = document.getElementById('workshop-list');
    list.innerHTML = '';

    store.data.workshops.forEach(ws => {
      const priceFormatted = new Intl.NumberFormat('vi-VN').format(ws.pricePerGuest) + 'đ/khách';
      const depositFormatted = new Intl.NumberFormat('vi-VN').format(ws.depositAmount) + 'đ';

      const card = document.createElement('div');
      card.className = 'clean-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6';

      let slotsHtml = ws.scheduleSlots.map(s => `
        <span class="inline-block bg-olive-50 text-olive-800 text-[11px] px-2.5 py-1 rounded-full border border-olive-100">
          🕒 ${s.time}
        </span>
      `).join('');

      card.innerHTML = `
        <div class="space-y-2 max-w-xl">
          <span class="text-[10px] font-bold uppercase tracking-wider bg-olive-100 text-olive-700 px-2 py-0.5 rounded">Thời lượng: ${ws.duration}</span>
          <h3 class="font-sans text-lg font-bold text-olive-900">${ws.title}</h3>
          <p class="text-xs text-olive-600">${ws.description}</p>
          <div class="flex flex-wrap gap-2 pt-1">${slotsHtml}</div>
        </div>

        <div class="flex flex-col items-start md:items-end gap-3 shrink-0">
          <div>
            <div class="text-base font-bold text-olive-900">${priceFormatted}</div>
            <div class="text-[11px] text-olive-500">Cọc trước: ${depositFormatted}</div>
          </div>
          <button onclick="openWorkshopBookingModal('${ws.id}')" class="btn-pill-olive text-xs py-2.5 px-5">
            Đặt Chỗ Ngay
          </button>
        </div>
      `;
      list.appendChild(card);
    });
    lucide.createIcons();
  }

  // --- RENDER BLOG SECTION ---
  function renderBlogs() {
    const grid = document.getElementById('blog-grid');
    grid.innerHTML = '';

    store.data.blogs.forEach(b => {
      const card = document.createElement('div');
      card.className = 'clean-card p-6 cursor-pointer hover:border-olive-300 transition-all';
      card.onclick = () => openBlogModal(b);

      card.innerHTML = `
        <div class="text-[11px] text-olive-400 font-semibold mb-2">${b.category} • ${b.date}</div>
        <h3 class="font-sans text-base font-bold text-olive-900 hover:text-olive-500 transition-colors">${b.title}</h3>
        <p class="text-xs text-olive-600 mt-2 line-clamp-2">${b.excerpt}</p>
      `;
      grid.appendChild(card);
    });
    lucide.createIcons();
  }

  // --- CATEGORY FILTER HANDLER ---
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.className = 'px-6 py-2 rounded-full text-xs font-semibold transition-all bg-white text-olive-800 hover:bg-olive-100 border border-olive-200 filter-btn';
      });
      btn.className = 'px-6 py-2 rounded-full text-xs font-semibold transition-all bg-olive-900 text-white shadow-sm filter-btn';
      activeCategory = btn.dataset.cat;
      renderProducts();
    };
  });

  // --- DROPDOWN CATEGORY NAVIGATION HANDLER ---
  document.querySelectorAll('[data-cat-select]').forEach(link => {
    link.addEventListener('click', () => {
      openPageView('home');
      const targetCat = link.dataset.catSelect;
      
      const filterBtns = document.querySelectorAll('#category-filters .filter-btn');
      filterBtns.forEach(btn => {
        if (btn.dataset.cat === targetCat) {
          btn.className = 'px-6 py-2 rounded-full text-xs font-semibold transition-all bg-olive-900 text-white shadow-sm filter-btn';
        } else {
          btn.className = 'px-6 py-2 rounded-full text-xs font-semibold transition-all bg-white text-olive-800 hover:bg-olive-100 border border-olive-200 filter-btn';
        }
      });

      activeCategory = targetCat;
      renderProducts();

      // Close mobile drawer if open
      const mobileDrawer = document.getElementById('mobile-menu-drawer');
      if (mobileDrawer) mobileDrawer.classList.add('hidden');
    });
  });

  // --- MINIMALIST LOGIN MODAL ---
  const loginModal = document.getElementById('login-modal');
  document.getElementById('open-login-btn').onclick = () => loginModal.classList.remove('hidden');
  document.getElementById('close-login-btn').onclick = () => loginModal.classList.add('hidden');
  document.getElementById('close-login-backdrop').onclick = () => loginModal.classList.add('hidden');

  document.getElementById('login-form').onsubmit = (e) => {
    e.preventDefault();
    loginModal.classList.add('hidden');
    renderAdminPanel();
    document.getElementById('admin-modal').classList.remove('hidden');
  };

  // --- CART MANAGEMENT ---
  window.addToCart = function(productId, customNote = '') {
    const prod = store.data.products.find(p => p.id === productId);
    if (!prod) return;

    const existing = store.cart.find(item => item.id === productId && item.customNote === customNote);
    if (existing) {
      existing.quantity += 1;
    } else {
      store.cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        quantity: 1,
        customNote: customNote
      });
    }

    updateCartUI();
    openCartDrawer();
  };

  function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-badge');
    const totalEl = document.getElementById('cart-total-price');

    const totalQty = store.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = store.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    badge.textContent = totalQty;
    totalEl.textContent = new Intl.NumberFormat('vi-VN').format(totalPrice) + 'đ';

    if (store.cart.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 text-olive-400 space-y-2">
          <i data-lucide="shopping-bag" class="w-10 h-10 mx-auto text-olive-200"></i>
          <p class="text-xs font-medium">Giỏ hàng đang trống</p>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    container.innerHTML = '';
    store.cart.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'flex items-center justify-between gap-3 p-3 bg-olive-50 rounded-xl border border-olive-100';
      const itemTotal = new Intl.NumberFormat('vi-VN').format(item.price * item.quantity) + 'đ';

      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-lg">
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-bold text-olive-900 truncate">${item.name}</h4>
          ${item.customNote ? `<p class="text-[10px] text-olive-500 italic">${item.customNote}</p>` : ''}
          <div class="text-xs font-semibold text-olive-600">${itemTotal}</div>
        </div>
        <div class="flex items-center gap-2 bg-white border border-olive-200 rounded-full px-2 py-0.5 text-xs font-bold">
          <button onclick="changeCartQty(${index}, -1)" class="text-olive-600 hover:text-olive-900">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeCartQty(${index}, 1)" class="text-olive-600 hover:text-olive-900">+</button>
        </div>
      `;
      container.appendChild(itemEl);
    });
    lucide.createIcons();
  }

  window.changeCartQty = function(index, delta) {
    store.cart[index].quantity += delta;
    if (store.cart[index].quantity <= 0) store.cart.splice(index, 1);
    updateCartUI();
  };

  const cartDrawer = document.getElementById('cart-drawer');
  function openCartDrawer() { cartDrawer.classList.remove('hidden'); }
  function closeCartDrawer() { cartDrawer.classList.add('hidden'); }
  document.getElementById('cart-btn').onclick = openCartDrawer;
  document.getElementById('close-cart-btn').onclick = closeCartDrawer;
  document.getElementById('close-cart-backdrop').onclick = closeCartDrawer;

  // --- PRODUCT DETAIL MODAL ---
  window.openProductModal = function(productId) {
    const p = store.data.products.find(item => item.id === productId);
    if (!p) return;

    const modal = document.getElementById('product-modal');
    const content = document.getElementById('product-modal-content');

    const priceFormatted = new Intl.NumberFormat('vi-VN').format(p.price) + 'đ';

    content.innerHTML = `
      <div class="space-y-4">
        <div class="h-64 rounded-2xl overflow-hidden bg-olive-50">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
        </div>
        <div class="space-y-2">
          <div class="text-[11px] font-bold text-olive-400 uppercase tracking-wider">${p.category}</div>
          <h2 class="font-sans text-xl font-bold text-olive-900">${p.name}</h2>
          <div class="text-base font-bold text-olive-600">${priceFormatted}</div>
          <p class="text-xs text-olive-600 leading-relaxed">${p.description}</p>

          <div class="pt-2">
            <label class="block text-xs font-semibold text-olive-700 mb-1">Khắc tên / Yêu cầu riêng:</label>
            <input type="text" id="modal-custom-note" placeholder="Nhập tên chú rể & cô dâu (Ví dụ: Nam & Mai 2026)..." class="w-full bg-olive-50 border border-olive-200 rounded-full py-2.5 px-4 text-xs text-olive-900 focus:outline-none">
          </div>

          <div class="pt-3">
            <button id="modal-add-cart-btn" class="w-full btn-pill-olive">
              Thêm Vào Giỏ Hàng
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('modal-add-cart-btn').onclick = () => {
      const note = document.getElementById('modal-custom-note').value;
      addToCart(p.id, note);
      closeProductModal();
    };

    modal.classList.remove('hidden');
  };

  function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
  }
  document.getElementById('close-product-btn').onclick = closeProductModal;
  document.getElementById('close-product-backdrop').onclick = closeProductModal;

  // --- WORKSHOP BOOKING MODAL ---
  window.openWorkshopBookingModal = function(wsId) {
    const ws = store.data.workshops.find(w => w.id === wsId);
    if (!ws) return;

    const modal = document.getElementById('workshop-modal');
    const content = document.getElementById('workshop-modal-content');

    let slotsOptions = ws.scheduleSlots.map(s => `<option value="${s.time} (${s.label})">${s.time} (${s.label})</option>`).join('');

    content.innerHTML = `
      <div class="space-y-4">
        <h3 class="font-sans text-xl font-bold text-olive-900">${ws.title}</h3>
        <p class="text-xs text-olive-600">Vui lòng điền thông tin để đăng ký ca học.</p>

        <form id="ws-booking-form" class="space-y-3 pt-2">
          <div>
            <label class="block text-xs font-semibold text-olive-700 mb-1">Họ và tên</label>
            <input type="text" id="ws-guest-name" required placeholder="Họ tên người đăng ký" class="w-full bg-olive-50 border border-olive-200 rounded-full py-2.5 px-4 text-xs text-olive-900">
          </div>
          <div>
            <label class="block text-xs font-semibold text-olive-700 mb-1">Số Zalo liên hệ</label>
            <input type="tel" id="ws-guest-phone" required placeholder="0912 345 678" class="w-full bg-olive-50 border border-olive-200 rounded-full py-2.5 px-4 text-xs text-olive-900">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-olive-700 mb-1">Ngày Học</label>
              <input type="date" id="ws-date" required class="w-full bg-olive-50 border border-olive-200 rounded-full py-2.5 px-4 text-xs text-olive-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-olive-700 mb-1">Số lượng khách</label>
              <select id="ws-count" class="w-full bg-olive-50 border border-olive-200 rounded-full py-2.5 px-4 text-xs text-olive-900">
                <option value="1">1 Khách</option>
                <option value="2">2 Khách (Cặp đôi)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-olive-700 mb-1">Ca Học</label>
            <select id="ws-slot" class="w-full bg-olive-50 border border-olive-200 rounded-full py-2.5 px-4 text-xs text-olive-900">
              ${slotsOptions}
            </select>
          </div>

          <div class="pt-3">
            <button type="submit" class="w-full btn-pill-olive">
              Xác Nhận &amp; Chuyển Khoản Cọc Mã QR
            </button>
          </div>
        </form>
      </div>
    `;

    document.getElementById('ws-booking-form').onsubmit = (e) => {
      e.preventDefault();
      const guestName = document.getElementById('ws-guest-name').value;
      const guestPhone = document.getElementById('ws-guest-phone').value;
      const date = document.getElementById('ws-date').value;
      const count = parseInt(document.getElementById('ws-count').value);
      const slot = document.getElementById('ws-slot').value;

      const totalDeposit = ws.depositAmount * count;

      const booking = store.addBooking({
        workshopTitle: ws.title,
        guestName,
        guestPhone,
        date,
        guestCount: count,
        slot,
        totalDeposit,
        status: 'Chờ chuyển khoản cọc'
      });

      closeWorkshopBookingModal();
      openVietQRModal({
        title: "Xác Nhận Đặt Lịch Workshop",
        amount: totalDeposit,
        orderCode: booking.id,
        note: `DAT LICH ${booking.id}`,
        details: `${ws.title} - ${count} Khách`
      });
    };

    modal.classList.remove('hidden');
  };

  function closeWorkshopBookingModal() {
    document.getElementById('workshop-modal').classList.add('hidden');
  }
  document.getElementById('close-ws-btn').onclick = closeWorkshopBookingModal;
  document.getElementById('close-ws-backdrop').onclick = closeWorkshopBookingModal;

  // --- CHECKOUT & VIETQR PAYMENT MODAL ---
  document.getElementById('checkout-btn').onclick = () => {
    if (store.cart.length === 0) return;

    const totalPrice = store.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const order = store.addOrder({
      items: [...store.cart],
      totalAmount: totalPrice,
      status: 'Chờ thanh toán QR'
    });

    store.cart = [];
    updateCartUI();
    closeCartDrawer();

    openVietQRModal({
      title: "Thanh Toán Đơn Hàng Qua Mã VietQR",
      amount: totalPrice,
      orderCode: order.id,
      note: `THANH TOAN ${order.id}`,
      details: `Đơn hàng #${order.id}`
    });
  };

  function openVietQRModal({ title, amount, orderCode, note, details }) {
    const bank = store.data.settings.bank;
    const amountFormatted = new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
    const cleanBank = bank.bankName.includes('MBBank') ? 'MB' : 'VCB';
    const qrUrl = `https://img.vietqr.io/image/${cleanBank}-${bank.accountNumber.replace(/\s+/g, '')}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(note)}&accountName=${encodeURIComponent(bank.accountName)}`;

    const modal = document.getElementById('qr-modal');
    const content = document.getElementById('qr-modal-content');

    content.innerHTML = `
      <div class="space-y-4">
        <h3 class="font-sans text-xl font-bold text-olive-900">${title}</h3>
        <p class="text-xs text-olive-500">${details}</p>

        <div class="bg-olive-50 p-4 rounded-2xl border border-olive-100 space-y-3">
          <div class="w-52 h-52 mx-auto bg-white rounded-xl p-2 border border-olive-200 shadow-sm flex items-center justify-center">
            <img src="${qrUrl}" alt="Mã QR Chuyển Khoản" class="w-full h-full object-contain">
          </div>
          
          <div class="text-left text-xs space-y-1 bg-white p-3 rounded-xl border border-olive-100">
            <div><span class="text-olive-400">Ngân hàng:</span> <strong class="text-olive-900">${bank.bankName}</strong></div>
            <div><span class="text-olive-400">Số tài khoản:</span> <strong class="text-olive-900 font-mono">${bank.accountNumber}</strong></div>
            <div><span class="text-olive-400">Chủ tài khoản:</span> <strong class="text-olive-900">${bank.accountName}</strong></div>
            <div><span class="text-olive-400">Số tiền:</span> <strong class="text-olive-600 font-bold">${amountFormatted}</strong></div>
            <div><span class="text-olive-400">Nội dung CK:</span> <strong class="text-olive-900 font-mono">${note}</strong></div>
          </div>
        </div>

        <button onclick="closeVietQRModal()" class="w-full btn-pill-olive">
          Đã Hoàn Tất Chuyển Khoản
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
  }

  window.closeVietQRModal = function() {
    document.getElementById('qr-modal').classList.add('hidden');
  };
  document.getElementById('close-qr-btn').onclick = closeVietQRModal;
  document.getElementById('close-qr-backdrop').onclick = closeVietQRModal;

  // --- MOBILE MENU DRAWER CONTROLLER ---
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu-btn');
  const closeMobileMenuBackdrop = document.getElementById('close-mobile-menu-backdrop');

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.onclick = () => {
      mobileMenuDrawer.classList.remove('hidden');
    };

    const closeMobileMenu = () => {
      mobileMenuDrawer.classList.add('hidden');
    };

    if (closeMobileMenuBtn) closeMobileMenuBtn.onclick = closeMobileMenu;
    if (closeMobileMenuBackdrop) closeMobileMenuBackdrop.onclick = closeMobileMenu;

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // --- BLOG MODAL ---
  function openBlogModal(blog) {
    const modal = document.getElementById('product-modal');
    const content = document.getElementById('product-modal-content');

    content.innerHTML = `
      <div class="space-y-4">
        <div class="text-xs text-olive-400 font-semibold">${blog.category} • ${blog.date}</div>
        <h2 class="font-sans text-2xl font-bold text-olive-900">${blog.title}</h2>
        <div class="text-xs text-olive-700 leading-relaxed space-y-3 pt-2 border-t border-olive-100 whitespace-pre-line">
          ${blog.content}
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  }

  // --- CUSTOM ORDER FORM SUBMIT ---
  document.getElementById('custom-order-form').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;

    store.addOrder({
      customerName: name,
      customerPhone: phone,
      status: 'Yêu cầu đúc hoa cưới theo yêu cầu',
      totalAmount: 0
    });

    alert(`Cảm ơn ${name}! Call Me Rose đã nhận được yêu cầu. Chúng tôi sẽ liên hệ Zalo số ${phone} ngay.`);
    document.getElementById('custom-order-form').reset();
  };

  // --- NO-CODE ADMIN CMS PANEL ---
  const adminModal = document.getElementById('admin-modal');
  let currentAdminTab = 'settings';

  document.getElementById('close-admin-btn').onclick = () => adminModal.classList.add('hidden');
  document.getElementById('close-admin-backdrop').onclick = () => adminModal.classList.add('hidden');

  document.getElementById('admin-tab-settings').onclick = () => { currentAdminTab = 'settings'; renderAdminPanel(); };
  document.getElementById('admin-tab-products').onclick = () => { currentAdminTab = 'products'; renderAdminPanel(); };
  document.getElementById('admin-tab-orders').onclick = () => { currentAdminTab = 'orders'; renderAdminPanel(); };
  document.getElementById('admin-tab-bookings').onclick = () => { currentAdminTab = 'bookings'; renderAdminPanel(); };

  function renderAdminPanel() {
    const container = document.getElementById('admin-tab-content');
    
    ['settings', 'products', 'orders', 'bookings'].forEach(t => {
      const btn = document.getElementById(`admin-tab-${t}`);
      if (t === currentAdminTab) {
        btn.className = 'py-2 px-4 border-b-2 border-olive-600 text-olive-900 font-bold admin-tab-btn';
      } else {
        btn.className = 'py-2 px-4 border-b-2 border-transparent text-olive-500 hover:text-olive-900 admin-tab-btn';
      }
    });

    if (currentAdminTab === 'settings') {
      const s = store.data.settings;
      container.innerHTML = `
        <form id="admin-settings-form" class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label class="block font-bold text-olive-800 mb-1">Tên Shop</label>
            <input type="text" id="adm-shopName" value="${s.shopName}" class="w-full bg-olive-50 border border-olive-200 rounded-lg p-2 text-olive-900">
          </div>
          <div>
            <label class="block font-bold text-olive-800 mb-1">Slogan</label>
            <input type="text" id="adm-slogan" value="${s.slogan}" class="w-full bg-olive-50 border border-olive-200 rounded-lg p-2 text-olive-900">
          </div>
          <div>
            <label class="block font-bold text-olive-800 mb-1">Hotline</label>
            <input type="text" id="adm-phone" value="${s.phone}" class="w-full bg-olive-50 border border-olive-200 rounded-lg p-2 text-olive-900">
          </div>
          <div>
            <label class="block font-bold text-olive-800 mb-1">Số Zalo</label>
            <input type="text" id="adm-zalo" value="${s.zalo}" class="w-full bg-olive-50 border border-olive-200 rounded-lg p-2 text-olive-900">
          </div>
          <div>
            <label class="block font-bold text-olive-800 mb-1">Ngân Hàng VietQR</label>
            <input type="text" id="adm-bankName" value="${s.bank.bankName}" class="w-full bg-olive-50 border border-olive-200 rounded-lg p-2 text-olive-900">
          </div>
          <div>
            <label class="block font-bold text-olive-800 mb-1">Số Tài Khoản</label>
            <input type="text" id="adm-accountNumber" value="${s.bank.accountNumber}" class="w-full bg-olive-50 border border-olive-200 rounded-lg p-2 text-olive-900">
          </div>
          <div class="md:col-span-2 pt-3 border-t border-olive-100">
            <h4 class="font-bold text-olive-900 mb-2">Cấu Hình Kết Nối Supabase Database (MCP Cloud)</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-olive-800 mb-1">Supabase Project URL</label>
                <input type="text" id="adm-supaUrl" value="${window.supabaseManager ? window.supabaseManager.getConfig().url : ''}" placeholder="https://xyz.supabase.co" class="w-full bg-olive-50 border border-olive-200 rounded-lg p-2 text-olive-900">
              </div>
              <div>
                <label class="block font-semibold text-olive-800 mb-1">Supabase Anon Key</label>
                <input type="password" id="adm-supaKey" value="${window.supabaseManager ? window.supabaseManager.getConfig().key : ''}" placeholder="eyJhbGciOi..." class="w-full bg-olive-50 border border-olive-200 rounded-lg p-2 text-olive-900">
              </div>
            </div>
          </div>
          <div class="md:col-span-2 text-right pt-2">
            <button type="submit" class="btn-pill-olive text-xs py-2 px-6">
              Lưu Thông Tin &amp; Kết Nối Cloud
            </button>
          </div>
        </form>
      `;

      document.getElementById('admin-settings-form').onsubmit = (e) => {
        e.preventDefault();
        store.data.settings.shopName = document.getElementById('adm-shopName').value;
        store.data.settings.slogan = document.getElementById('adm-slogan').value;
        store.data.settings.phone = document.getElementById('adm-phone').value;
        store.data.settings.zalo = document.getElementById('adm-zalo').value;
        store.data.settings.bank.bankName = document.getElementById('adm-bankName').value;
        store.data.settings.bank.accountNumber = document.getElementById('adm-accountNumber').value;
        
        const supaUrl = document.getElementById('adm-supaUrl').value;
        const supaKey = document.getElementById('adm-supaKey').value;
        if (window.supabaseManager) {
          window.supabaseManager.saveConfig(supaUrl, supaKey);
        }

        store.saveData();
        updateShopInfoUI();
        alert("Đã lưu thông tin shop và cấu hình Supabase Cloud thành công!");
      };
    } else if (currentAdminTab === 'products') {
      let rows = store.data.products.map(p => `
        <tr class="border-b border-olive-100 text-xs">
          <td class="p-2 font-bold">${p.name}</td>
          <td class="p-2">${new Intl.NumberFormat('vi-VN').format(p.price)}đ</td>
          <td class="p-2 text-right"><button onclick="deleteProduct('${p.id}')" class="text-red-500">Xóa</button></td>
        </tr>
      `).join('');

      container.innerHTML = `
        <div class="space-y-4 text-xs">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-olive-50 text-olive-800 border-b border-olive-100 font-bold">
                <th class="p-2">Tên</th>
                <th class="p-2">Giá</th>
                <th class="p-2 text-right">Xóa</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;
    } else if (currentAdminTab === 'orders') {
      const orders = store.getOrders();
      let rows = orders.map(o => `
        <tr class="border-b border-olive-100 text-xs">
          <td class="p-2 font-mono">${o.id}</td>
          <td class="p-2">${o.customerName || 'Khách Web'}</td>
          <td class="p-2 font-bold">${new Intl.NumberFormat('vi-VN').format(o.totalAmount || 0)}đ</td>
        </tr>
      `).join('');
      container.innerHTML = `<table class="w-full text-left"><tbody>${rows || '<tr><td class="p-4 text-center">Chưa có đơn hàng</td></tr>'}</tbody></table>`;
    } else if (currentAdminTab === 'bookings') {
      const bookings = store.getBookings();
      let rows = bookings.map(b => `
        <tr class="border-b border-olive-100 text-xs">
          <td class="p-2 font-mono">${b.id}</td>
          <td class="p-2 font-bold">${b.guestName}</td>
          <td class="p-2">${b.date} (${b.slot})</td>
        </tr>
      `).join('');
      container.innerHTML = `<table class="w-full text-left"><tbody>${rows || '<tr><td class="p-4 text-center">Chưa có lịch workshop</td></tr>'}</tbody></table>`;
    }
  }

  window.deleteProduct = function(id) {
    if (confirm("Xóa sản phẩm này?")) {
      store.data.products = store.data.products.filter(p => p.id !== id);
      store.saveData();
      renderProducts();
      renderAdminPanel();
    }
  };

  window.renderProducts = renderProducts;

  // --- INITIALIZE ---
  updateShopInfoUI();
  renderProducts();
  if (typeof renderWorkshops === 'function') renderWorkshops();
  if (typeof renderBlogs === 'function') renderBlogs();
}

// Global execution trigger regardless of DOM load timing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

window.addEventListener('load', () => {
  if (typeof window.renderProducts === 'function') {
    window.renderProducts();
  }
});
