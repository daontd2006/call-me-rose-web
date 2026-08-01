# Hướng Dẫn Chi Tiết Thao Tác Lấy API Tokens & Keys (GitHub, Supabase, Vercel)

Tài liệu này hướng dẫn từng bước (dễ hiểu cho người không chuyên IT) cách lấy các Token và API Keys để điền vào `mcp_config.json` và Bảng Quản Lý Shop của website **CALL ME ROSE**.

---

## 🔑 1. Cách Lấy GitHub Personal Access Token

Token này dùng để kết nối **GitHub MCP Server** giúp tự động đẩy code và tạo repository.

1. Đăng nhập vào tài khoản [GitHub.com](https://github.com).
2. Nhấp vào **Ảnh đại diện (góc trên cùng bên phải)** ➔ Chọn **Settings** (Cài đặt).
3. Cuộn xuống menu bên trái, nhấp chọn **Developer Settings** (Cài đặt nhà phát triển).
4. Chọn **Personal access tokens** ➔ Chọn **Tokens (classic)**.
5. Nhấp vào nút **Generate new token** (Tạo token mới) ➔ Chọn **Generate new token (classic)**.
6. Điền thông tin:
   - **Note**: Điền `Call Me Rose MCP Token`.
   - **Expiration**: Chọn `No expiration` (Không hết hạn) hoặc `90 days`.
   - **Select scopes** (Tích chọn các quyền): Tích chọn checkbox **`repo`** (Full control of private repositories) và **`workflow`**.
7. Cuộn xuống cuối trang và nhấn nút màu xanh **Generate token**.
8. **Đặc biệt lưu ý:** Sao chép chuỗi mã bắt đầu bằng `ghp_...` ngay lập tức và dán vào `mcp_config.json` (Chuỗi mã này chỉ hiển thị đúng 1 lần duy nhất).

---

## ⚡ 2. Cách Lấy Supabase URL & API Keys (Anon Key & Service Role Key)

Khóa này dùng để kết nối cơ sở dữ liệu **Supabase PostgreSQL** và bộ nhớ lưu ảnh hoa tươi **Supabase Storage**.

1. Đăng nhập vào [Supabase.com](https://supabase.com) ➔ Chọn hoặc tạo dự án mới (Ví dụ tên dự án: `Call Me Rose`).
2. Trong giao diện Dashboard dự án, nhìn xuống thanh menu bên trái, chọn biểu tượng **Bánh răng (Project Settings)**.
3. Nhấp chọn mục **API** (hoặc **API Keys**).
4. Bạn sẽ thấy các thông tin sau:
   - **Project URL**: Có dạng `https://xxxxxxxxxxxx.supabase.co` ➔ Copy URL này dán vào Bảng Quản Lý Shop trên Web & `mcp_config.json`.
   - **Project API Keys**:
     - **`anon` `public` key**: Chuỗi mã dài bắt đầu bằng `eyJhbGciOi...` ➔ Copy key này dán vào ô **Supabase Anon Key** trên giao diện Web.
     - **`service_role` `secret` key**: Nhấp vào nút *Reveal* để hiển thị chuỗi bí mật ➔ Copy key này dán vào `mcp_config.json` cho MCP Server.

---

## 🚀 3. Cách Lấy Vercel API Token

Token này dùng để kết nối **Vercel MCP Server** giúp tự động deploy website và gắn tên miền riêng.

1. Đăng nhập vào tài khoản [Vercel.com](https://vercel.com).
2. Nhấp vào **Ảnh đại diện (góc trên cùng bên phải)** ➔ Chọn **Account Settings** (Cài đặt tài khoản).
3. Ở menu bên trái, chọn mục **Tokens**.
4. Nhấp vào nút **Create Token** (Tạo Token mới).
5. Điền thông tin:
   - **Name**: Nhập `Call Me Rose MCP Token`.
   - **Scope**: Chọn `Full Account` (hoặc tên Workspace của bạn).
6. Nhấp nút **Create**.
7. Sao chép chuỗi token hiển thị trên màn hình (bắt đầu bằng `vercel_...`) và dán vào `mcp_config.json`.

---

## 📝 Bảng Tóm Tắt Nơi Điền Key

| Loại Key / Token | Lấy Ở Đâu? | Điền Vào Đâu? |
| :--- | :--- | :--- |
| **GitHub Token** (`ghp_...`) | GitHub > Settings > Developer Settings | `mcp_config.json` (`GITHUB_PERSONAL_ACCESS_TOKEN`) |
| **Supabase URL** (`https://...`) | Supabase > Project Settings > API | Bảng Quản Lý Shop trên Web & `mcp_config.json` |
| **Supabase Anon Key** (`eyJ...`) | Supabase > Project Settings > API | Bảng Quản Lý Shop trên Web (`adm-supaKey`) |
| **Supabase Service Key** | Supabase > Project Settings > API | `mcp_config.json` (`SUPABASE_SERVICE_ROLE_KEY`) |
| **Vercel Token** (`vercel_...`) | Vercel > Account Settings > Tokens | `mcp_config.json` (`VERCEL_API_TOKEN`) |
