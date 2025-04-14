import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Chính sách bảo mật</h1>
      <p className="text-muted mb-4">Cập nhật lần cuối: 14/4/2025</p>

      <section className="mb-4">
        <p>
          Chào mừng bạn đến với SeminarHub! Chúng tôi cam kết bảo vệ quyền riêng
          tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập,
          sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn truy cập trang
          web của chúng tôi ([URL Trang Web]) và sử dụng các dịch vụ của chúng
          tôi.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h4 mb-3">1. Thông tin chúng tôi thu thập</h2>
        <p>
          Chúng tôi có thể thu thập thông tin về bạn theo nhiều cách khác nhau.
          Thông tin chúng tôi có thể thu thập trên Trang web bao gồm:
        </p>
        <ul className="list-unstyled mb-0">
          <li className="mb-2">
            <strong className="d-block mb-1">Dữ liệu cá nhân:</strong> Thông tin
            nhận dạng cá nhân (tên, email, số điện thoại, v.v.) bạn cung cấp khi
            đăng ký, tham gia hội thảo, hoặc liên hệ.
          </li>
          <li>
            <strong className="d-block mb-1">Dữ liệu phái sinh:</strong> Thông
            tin được thu thập tự động (địa chỉ IP, loại trình duyệt, trang đã
            xem, v.v.) khi bạn truy cập Trang web.
          </li>
          {/* Add more types of data collected as needed */}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="h4 mb-3">2. Sử dụng thông tin của bạn</h2>
        <p>
          Thông tin thu thập được giúp chúng tôi cung cấp trải nghiệm tốt hơn.
          Cụ thể, chúng tôi có thể sử dụng thông tin để:
        </p>
        <ul>
          <li>Tạo và quản lý tài khoản của bạn.</li>
          <li>Gửi email liên quan đến tài khoản hoặc hội thảo.</li>
          <li>Cho phép giao tiếp giữa người dùng (nếu có).</li>
          <li>Xử lý đăng ký và các giao dịch khác.</li>
          <li>Cải thiện và phân tích hoạt động của Trang web.</li>
          {/* Add more uses as needed */}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="h4 mb-3">3. Tiết lộ thông tin của bạn</h2>
        <p>
          Chúng tôi có thể chia sẻ thông tin của bạn trong các trường hợp sau:
        </p>
        <ul>
          <li>
            <strong>Theo yêu cầu pháp lý:</strong> Để tuân thủ luật pháp hoặc
            bảo vệ quyền lợi.
          </li>
          <li>
            <strong>Nhà cung cấp dịch vụ bên thứ ba:</strong> Các đối tác giúp
            chúng tôi vận hành dịch vụ (xử lý thanh toán, phân tích dữ liệu,
            v.v.).
          </li>
          {/* Add more disclosure scenarios as needed */}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="h4 mb-3">4. Bảo mật thông tin của bạn</h2>
        <p>
          Chúng tôi sử dụng các biện pháp bảo mật hợp lý để bảo vệ thông tin cá
          nhân của bạn. Tuy nhiên, không có biện pháp nào là tuyệt đối an toàn.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h4 mb-3">5. Liên hệ với chúng tôi</h2>
        <p>
          Nếu bạn có câu hỏi về Chính sách bảo mật này, vui lòng liên hệ với
          chúng tôi qua:
        </p>
        <p>
          Email: albert04.dev@gmail.com
          <br />
          {/* Optional: Add Address/Phone */}
          {/* Địa chỉ: [Địa chỉ] <br /> */}
          {/* Điện thoại: [Số điện thoại] */}
        </p>
      </section>

      <hr className="my-4" />

      <div className="text-center">
        {/* Ensure button uses standard Bootstrap classes */}
        <Link to="/" className="btn btn-primary mt-3">
          Quay về Trang chủ
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
