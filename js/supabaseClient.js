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
    let savedConfig = null;
    try {
      const saved = localStorage.getItem('CALL_ME_ROSE_SUPABASE_CONFIG');
      if (saved) savedConfig = JSON.parse(saved);
    } catch (e) {}
    
    // Default project config from user Supabase account
    return {
      url: savedConfig?.url || window.ENV_SUPABASE_URL || "https://vtmstzzfixrhbwvufflr.supabase.co",
      key: savedConfig?.key || window.ENV_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0bXN0enpmaXhyaGJ3dnVmZmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1NTA1MjcsImV4cCI6MjEwMTEyNjUyN30.cSvNPLEHqlwO8bABuhrrSnEYcRpQbo-vOgwJrIFWi8Q"
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
