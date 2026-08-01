/**
 * CALL ME ROSE - Initial Shop Data & LocalStorage Management
 * Dữ liệu mặc định & quản lý lưu trữ cho chủ shop (không cần IT)
 */

const DEFAULT_SHOP_DATA = {
  settings: {
    shopName: "Call Me Rose",
    slogan: "Handcrafted Clay Lily Bouquets & Fine Bridal Headpieces",
    phone: "0987 654 321",
    zalo: "0987 654 321",
    tiktok: "https://www.tiktok.com/@callmerose.florals",
    facebook: "https://www.facebook.com/callmerose.wedding",
    address: "Ngõ 57 Mễ Trì, Hà Nội",
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
      name: "Bó Hoa Cưới Linh Lan Đất Sét Nhật Bản (Clay Lily Bouquet)",
      category: "clay-lily",
      price: 1850000,
      originalPrice: 2200000,
      image: "assets/clay_lily_bouquet.png",
      rating: 5.0,
      reviewsCount: 36,
      isBestSeller: true,
      description: "Bó hoa cưới thủ công tỉ mỉ từng chuông hoa linh lan bằng đất sét Nhật Bản cao cấp. Giữ nguyên vẻ tinh khôi mềm mại, bảo tồn trọn đời làm kỷ vật ngày chung đôi.",
      specs: [
        "Chất liệu: Đất sét Nhật Bản cao cấp siêu nhẹ & dẻo dai",
        "Kích thước: Chiều dài bó 32cm, 100+ chuông hoa nắn tay tỉ mỉ",
        "Độ bền: Lưu giữ vĩnh cửu không phai màu, không hỏng",
        "Đi kèm: Dải lụa tơ tằm mềm mại + Hộp đựng bảo quản cao cấp"
      ],
      customOptions: ["Tùy chỉnh số lượng chuông hoa", "Kết hợp thêm lá & hoa hồng đất sét pastel"]
    },
    {
      id: "prod-2",
      name: "Bộ Phụ Kiện Cài Tóc Cô Dâu Hoa Linh Lan (Clay Lily Headpiece Set)",
      category: "bridal-headpieces",
      price: 950000,
      originalPrice: 1200000,
      image: "assets/clay_bridal_headpiece.png",
      rating: 5.0,
      reviewsCount: 29,
      isBestSeller: true,
      description: "Bộ trâm cài tóc & dây hoa cưới nhành linh lan đất sét tinh xảo kết hợp ngọc trai nước ngọt và kim loại mạ vàng 18k mang phong cách Vivi Embellish kiều diễm.",
      specs: [
        "Bộ sản phẩm: 1 Dây hoa đội đầu/cài tóc + 2 Trâm cài tóc phối hợp",
        "Chất liệu: Hoa đất sét làm tay + Ngọc trai nước ngọt + Dây uốn mạ vàng 18k",
        "Trọng lượng: Siêu nhẹ, dễ tạo kiểu búi tóc/tóc xõa cô dâu"
      ],
      customOptions: ["Phối màu lá mạ vàng hoặc mạ bạc", "Làm thêm hoa cài áo chú rể (Boutonniere) đồng bộ"]
    },
    {
      id: "prod-3",
      name: "Hoa Tai Cô Dâu Dáng Nhành Linh Lan Đất Sét (Clay Lily Earrings)",
      category: "bridal-jewelry",
      price: 480000,
      originalPrice: 580000,
      image: "assets/bridal_hair_accessory.png",
      rating: 4.9,
      reviewsCount: 18,
      isBestSeller: false,
      description: "Đôi hoa tai dáng thả chuông hoa linh lan bằng đất sét Nhật trắng muốt nhẹ nhàng, tôn vinh vẻ đẹp thanh lịch quý phái cho cô dâu trong ngày cưới.",
      specs: [
        "Chất liệu: Đất sét Nhật + Chuôi hoa tai bạc 925 chống dị ứng",
        "Dáng hoa tai: Thả dài 5cm thanh thoát"
      ],
      customOptions: ["Đính thêm hạt pha chế Thụy Sĩ", "Chuyển sang dạng kẹp cho cô dâu không bấm lỗ tai"]
    },
    {
      id: "prod-4",
      name: "Khối Kỷ Vật Resin Bảo Tồn Bó Hoa Cưới (Custom Resin & Clay Keepsake)",
      category: "preservation",
      price: 2450000,
      originalPrice: 2800000,
      image: "assets/resin_floral_light.png",
      rating: 5.0,
      reviewsCount: 42,
      isBestSeller: true,
      description: "Dịch vụ đúc khối resin trong suốt bảo tồn bó hoa cưới thật hoặc bó hoa đất sét kỷ niệm. Kết hợp khắc tên cô dâu chú rể & ngày cưới trường tồn.",
      specs: [
        "Kích thước khối: 20cm x 20cm x 8cm nguyên khối",
        "Quy trình xử lý: 14 - 21 ngày thủ công tỉ mỉ",
        "Đèn LED: Đế gỗ sồi tự nhiên phát sáng dịu nhẹ"
      ],
      customOptions: ["Khắc tên & câu nguyện ước lên đế gỗ", "Đúc kèm nhẫn cưới giả kỷ niệm"]
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
