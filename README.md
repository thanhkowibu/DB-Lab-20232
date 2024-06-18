# Project Database Lab 20232

## Thành viên nhóm:

1. Trần Quang Huy 20225860
2. Phạm Lê Thành 20225765

## 1, Mục đích chức năng của ứng dụng:

Đây là nền tảng cho thuê nhà và chỗ ở trực tuyến, giúp người dùng dễ dàng tìm kiếm và đặt phòng trên khắp thế giới, đồng thời giúp quản lý hiệu quả các hoạt động đặt phòng, quản lý tài sản lưu trú, và tối ưu hóa trải nghiệm người dùng, từ đó nâng cao sự hài lòng và trung thực của khách hàng.

### Các chức năng chính:

### Quản lí người dùng:

1. Người dùng có thể tạo tài tài khoản (xử lí bằng procedure đảm bảo transaction an toàn) -> xác thực email với token
2. Người dùng có thể thực hiện các thao tác CRUD cơ bản với tài khoản
3. Người dùng có thể request với admin để trở thành host
4. Người dùng có thể báo cáo người dùng khác nếu thấy họ vi phạm
5. Admin có thể ban người dùng, set quyền cho người dùng khác, xem báo cáo tăng trưởng về người dùng mới theo tháng/năm

### Quản lý property:

1. Người dùng có thể xem danh sách property và xem chi tiết 1 property
2. Người dùng có thể yêu thích/hủy yêu thích và xem danh sách property đã yêu thích
3. Host có thể tạo property mới, thực hiện các thao tác CRUD cơ bản với property

### Quản lí booking:

#### Phía người dùng:

1. Có thể đặt phòng
2. Có thể xem các booking đã tạo, xem chi tiết trạng thái của booking với các log
3. Có thể cancel booking
4. Sau khi check out có thể tạo 1 review cho nhà được thuê tương ứng với booking

#### Phía chủ nhà

1. Có thể xem tất cả booking, chi tiết log của các nhà đang cho thuê
2. Có thể confirm, từ chối 1 booking
3. Có thể check out/ đánh dấu no_show cho 1 booking

#### Phía admin:

1. Có thể check tất cả booking
2. Xem báo cáo tổng doanh thu tăng trưởng của ứng dung nhờ báo cáo của booking

## 2, Demo: Link Slide thuyết trình về sản phẩm:

### https://drive.google.com/drive/folders/1iHrXvXOWj9KveqPmjTHchxHP1bKioafk?usp=drive_link
