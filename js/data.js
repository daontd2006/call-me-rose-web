/**
 * CALL ME ROSE - Initial Shop Data & LocalStorage Management
 * Dữ liệu mặc định & quản lý lưu trữ cho chủ shop (không cần IT)
 */

const DEFAULT_SHOP_DATA = {
  settings: {
    shopName: "Call Me Rose",
    slogan: "Handcrafted Florals & Resin Keepsakes for Weddings",
    phone: "0987 654 321",
    zalo: "0987 654 321",
    tiktok: "https://www.tiktok.com/@callmerose.florals",
    facebook: "https://www.facebook.com/callmerose.wedding",
    address: "28 Ngõ Tràng Tien, Quận Hoàn Kiếm, Hà Nội",
    bank: {
      bankName: "MBBank (Ngoại Thương / Quân Đội)",
      accountNumber: "8888 6666 9999",
      accountName: "CALL ME ROSE FLORAL STUDIO",
      qrTemplate: "compact2"
    }
  },
  products: [
    {
      id: "prod-1",
      name: "Đèn Resin Hoa Cưới Bảo Tồn - Mẫu Rose White Gold",
      category: "resin-light",
      price: 1250000,
      originalPrice: 1500000,
      image: "assets/resin_floral_light.png",
      rating: 5.0,
      reviewsCount: 28,
      isBestSeller: true,
      description: "Đèn ngủ khối resin cao cấp đúc hoa hồng trắng tươi bảo tồn kết hợp lá khuynh diệp và vảy vàng 24k. Đế gỗ sồi tự nhiên có công tắc cảm ứng dịu nhẹ cho phòng ngủ tiệc cưới.",
      specs: [
        "Kích thước: 15cm x 15cm x 5cm",
        "Chất liệu: Resin đúc nguyên khối chống ố vàng 10 năm",
        "Đế gỗ: Gỗ sồi nhập khẩu tích hợp đèn LED vàng ấm",
        "Đi kèm: Hộp quà cao cấp + Thiệp cưới thiết kế riêng"
      ],
      customOptions: ["Khắc tên chú rể & cô dâu lên đế gỗ", "Gửi hoa cưới thật của bạn để đúc"]
    },
    {
      id: "prod-2",
      name: "Bộ Cài Tóc Hoa Tươi Phủ Resin Cô Dâu - Olive Grace",
      category: "bridal-accessories",
      price: 680000,
      originalPrice: 850000,
      image: "assets/bridal_hair_accessory.png",
      rating: 4.9,
      reviewsCount: 19,
      isBestSeller: true,
      description: "Trâm cài tóc thủ công kết hợp hoa baby khô, hoa bơ thủy tiên phủ lớp resin trong suốt siêu nhẹ. Giúp cô dâu rạng rỡ thanh lịch trong lễ gia tiên và tiệc tối.",
      specs: [
        "Bộ gồm: 5 trâm cài tóc thủ công",
        "Chất liệu: Khung kim loại mạ vàng 18k + Resin hoa thật",
        "Trọng lượng: Siêu nhẹ, không lo nặng tóc khi đội lụa/vương miện"
      ],
      customOptions: ["Phối màu hoa theo màu váy cưới", "Thiết kế thêm hoa cài áo chú rể đồng bộ"]
    },
    {
      id: "prod-3",
      name: "Khối Kỷ Vật Bảo Tồn Bó Hoa Cưới Cô Dâu (Custom Bouquet Resin)",
      category: "keepsakes",
      price: 2450000,
      originalPrice: 2800000,
      image: "assets/resin_floral_light.png",
      rating: 5.0,
      reviewsCount: 42,
      isBestSeller: true,
      description: "Dịch vụ giữ trọn khoảnh khắc ngày chung đôi. Bạn gửi bó hoa cưới ngay sau lễ cưới, Call Me Rose sẽ xử lý sấy thăng hoa giữ nguyên màu và đúc thành khối resin nghệ thuật.",
      specs: [
        "Kích thước khối: 20cm x 20cm x 8cm",
        "Quy trình xử lý: 14 - 21 ngày tỉ mỉ thủ công",
        "Độ bền: Lưu giữ kỷ niệm trăm năm không phai sắc"
      ],
      customOptions: ["In ngày cưới & câu vow lồng trong resin", "Tặng kèm 2 móc khóa hoa cưới nhỏ"]
    },
    {
      id: "prod-4",
      name: "Bộ Kit DIY Tự Đúc Đèn Resin Hoa Khô Tại Nhà",
      category: "diy-kit",
      price: 490000,
      originalPrice: 590000,
      image: "assets/workshop_banner.png",
      rating: 4.8,
      reviewsCount: 15,
      isBestSeller: false,
      description: "Bộ dụng cụ đầy đủ gồm Resin AB không độc hại, khuôn silicone, các loại hoa sấy khô pastel, đế đèn gỗ sồi và video hướng dẫn từng bước chi tiết.",
      specs: [
        "Đầy đủ dụng cụ pha resin, cốc đo, găng tay, nhíp gắp hoa",
        "Có video HD Youtube chi tiết dễ làm cho người mới bắt đầu"
      ],
      customOptions: ["Chọn tone hoa: Olive Green / Rose Pastel / Lavender"]
    }
  ],
  workshops: [
    {
      id: "ws-1",
      title: "Workshop: Tự Tay Đúc Đèn Resin Hoa Cưới Nghệ Thuật",
      duration: "2.5 Giờ",
      pricePerGuest: 550000,
      depositAmount: 200000,
      image: "assets/workshop_banner.png",
      description: "Trải nghiệm tạo nên chiếc đèn ngủ resin chứa hoa khô do chính tay bạn lựa chọn và phối màu. Phù hợp cho các cặp đôi cùng làm hoặc quà tặng bạn thân.",
      scheduleSlots: [
        { time: "09:30 - 12:00", label: "Ca Sáng (Thứ 7 & CN)" },
        { time: "14:30 - 17:00", label: "Ca Chiều (Hàng Ngày)" },
        { time: "18:30 - 21:00", label: "Ca Tối Giữa Tuần" }
      ],
      included: [
        "Toàn bộ nguyên liệu Resin cao cấp & hoa sấy khô không giới hạn",
        "Đế gỗ sồi tích hợp đèn LED cảm ứng trị giá 250.000đ",
        "1 Ly Nước uống Welcome Drink tự chọn",
        "Mang thành phẩm hoàn thiện về nhà"
      ]
    },
    {
      id: "ws-2",
      title: "Workshop: Thiết Kế Phụ Kiện Trang Sức & Cài Tóc Cô Dâu DIY",
      duration: "2 Giờ",
      pricePerGuest: 420000,
      depositAmount: 150000,
      image: "assets/bridal_hair_accessory.png",
      description: "Tự tay làm bộ cài tóc, bông tai hoa resin tinh tế cho chính ngày cưới của bạn hoặc làm quà mừng cưới ý nghĩa.",
      scheduleSlots: [
        { time: "10:00 - 12:00", label: "Ca Sáng" },
        { time: "15:00 - 17:00", label: "Ca Chiều" }
      ],
      included: [
        "Khung trâm mạ vàng, hạt ngọc nhân tạo & hoa thật ép khô",
        "Hướng dẫn tỉ mỉ kỹ thuật đổ resin nhỏ không bọt khí",
        "Hộp đựng trang sức thiết kế Call Me Rose"
      ]
    }
  ],
  blogs: [
    {
      id: "blog-1",
      title: "Cách Giữ Màu Bó Hoa Cưới Tươi Lâu Khi Bảo Tồn Khối Resin",
      date: "01 Tháng 8, 2026",
      author: "Call Me Rose Floral Designer",
      category: "Bí Quyết Hoa Cưới",
      excerpt: "Giữ lại bó hoa cưới trao tay trong ngày trọng đại là mong muốn của mọi cô dâu. Hãy cùng tìm hiểu quy trình sấy khô thăng hoa công nghệ Nhật Bản...",
      content: `Bó hoa cưới không chỉ là món phụ kiện cầm tay rạng rỡ của cô dâu trong ngày chung đôi, mà còn đại diện cho lời hứa tình yêu và khoảnh khắc hạnh phúc nhất.

1. Xử lý hoa ngay sau lễ cưới:
Sau khi buổi tiệc kết thúc, hãy cắm hoa vào nước mát và giữ ở phòng điều hòa. Tránh để hoa dưới ánh nắng trực tiếp hoặc ngấm nước mưa.

2. Quy trình sấy thăng hoa hạt Silica Gel:
Tại Call Me Rose, từng cánh hoa được tách riêng và vùi trong cát Silica Gel siêu mịn trong 7-10 ngày để rút sạch độ ẩm mà vẫn giữ nguyên màu sắc tự nhiên.

3. Kỹ thuật đúc Resin từng lớp (Layer Casting):
Để hoa không bị dập hay tạo bọt khí, người thợ sẽ đổ từng lớp resin trong suốt và chiếu tia UV căn chỉnh tỉ mỉ.`
    },
    {
      id: "blog-2",
      title: "Xu Hướng Phụ Kiện Hoa Cưới Resin Tối Giản (Minimalist Olive) 2026",
      date: "25 Tháng 7, 2026",
      author: "Rose Studio",
      category: "Xu Hướng Cưới",
      excerpt: "Tone màu xanh ô-liu nhẹ nhàng (Light Olive) kết hợp hoa trắng nhã nhặn đang trở thành lựa chọn hàng đầu của các cô dâu hiện đại...",
      content: `Sự kết hợp giữa gam màu xanh ô-liu (Light Olive) cùng sắc trắng tinh khôi của hoa baby, hoa hồng nhỏ và vảy vàng lấp lánh mang lại cảm giác vừa gần gũi với thiên nhiên vừa vô cùng sang trọng.`
    }
  ]
};

// Manager class for shop state
class ShopStore {
  constructor() {
    this.storageKey = 'CALL_ME_ROSE_DATA_V1';
    this.ordersKey = 'CALL_ME_ROSE_ORDERS';
    this.bookingsKey = 'CALL_ME_ROSE_BOOKINGS';
    this.data = this.loadData();
    this.cart = [];
  }

  loadData() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to read localStorage:", e);
    }
    return DEFAULT_SHOP_DATA;
  }

  saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  }

  getOrders() {
    try {
      return JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
    } catch (e) { return []; }
  }

  addOrder(order) {
    const orders = this.getOrders();
    order.id = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    order.createdAt = new Date().toLocaleString('vi-VN');
    orders.unshift(order);
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    return order;
  }

  getBookings() {
    try {
      return JSON.parse(localStorage.getItem(this.bookingsKey) || '[]');
    } catch (e) { return []; }
  }

  addBooking(booking) {
    const bookings = this.getBookings();
    booking.id = 'WS-BOOK-' + Math.floor(100000 + Math.random() * 900000);
    booking.createdAt = new Date().toLocaleString('vi-VN');
    bookings.unshift(booking);
    localStorage.setItem(this.bookingsKey, JSON.stringify(bookings));
    return booking;
  }
}

window.shopStore = new ShopStore();
