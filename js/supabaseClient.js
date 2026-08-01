/**
 * CALL ME ROSE - Supabase & MCP Integration Module
 * Kết nối Supabase Database & Storage với cơ chế Fallback LocalStorage khi Offline
 */

class SupabaseManager {
  constructor() {
    this.client = null;
    this.initClient();
  }

  initClient() {
    const config = this.getConfig();
    if (config.url && config.key && window.supabase) {
      try {
        this.client = window.supabase.createClient(config.url, config.key);
        console.log("Supabase Client initialized successfully.");
      } catch (e) {
        console.warn("Supabase init failed, fallback to LocalStorage:", e);
      }
    } else {
      console.log("Supabase config not set, using LocalStorage fallback mode.");
    }
  }

  getConfig() {
    try {
      const saved = localStorage.getItem('CALL_ME_ROSE_SUPABASE_CONFIG');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    
    // Default placeholder config
    return {
      url: window.ENV_SUPABASE_URL || "",
      key: window.ENV_SUPABASE_ANON_KEY || ""
    };
  }

  saveConfig(url, key) {
    localStorage.setItem('CALL_ME_ROSE_SUPABASE_CONFIG', JSON.stringify({ url, key }));
    this.initClient();
  }

  // Sync Products from Supabase DB
  async fetchProducts() {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client.from('products').select('*');
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Error fetching products from Supabase:", e);
    }
    return null;
  }

  // Push new Order to Supabase DB
  async createOrder(order) {
    if (!this.client) return order;
    try {
      const { data, error } = await this.client.from('orders').insert([order]).select();
      if (!error && data) return data[0];
    } catch (e) {
      console.warn("Error creating order on Supabase:", e);
    }
    return order;
  }

  // Push new Workshop Booking to Supabase DB
  async createBooking(booking) {
    if (!this.client) return booking;
    try {
      const { data, error } = await this.client.from('bookings').insert([booking]).select();
      if (!error && data) return data[0];
    } catch (e) {
      console.warn("Error creating booking on Supabase:", e);
    }
    return booking;
  }
}

window.supabaseManager = new SupabaseManager();
