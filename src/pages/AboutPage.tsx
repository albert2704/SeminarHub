import React from "react";
import { Link } from "react-router-dom";

const AboutPage: React.FC = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Về SeminarHub</h1>
      <p className="lead mb-4">
        SeminarHub là nền tảng hàng đầu để khám phá, chia sẻ và tham gia các hội
        thảo khoa học trên toàn thế giới. Sứ mệnh của chúng tôi là kết nối các
        nhà nghiên cứu, học giả và những người đam mê khoa học, thúc đẩy sự hợp
        tác và phổ biến kiến thức.
      </p>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-primary mb-3">Sứ mệnh</h5>
              <p className="card-text">
                Kết nối cộng đồng khoa học toàn cầu thông qua một nền tảng tập
                trung cho các hội thảo nghiên cứu. Chúng tôi mong muốn làm cho
                việc khám phá và tham gia các sự kiện khoa học trở nên dễ dàng
                hơn bao giờ hết.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-primary mb-3">Tầm nhìn</h5>
              <p className="card-text">
                Trở thành nguồn tài nguyên không thể thiếu cho các nhà nghiên
                cứu và học giả, thúc đẩy sự đổi mới và hợp tác xuyên biên giới
                thông qua việc chia sẻ kiến thức tại các hội thảo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <p>
          Bạn có câu hỏi hoặc muốn tìm hiểu thêm?{" "}
          <Link to="/contact">Liên hệ với chúng tôi</Link>.
        </p>
        <Link to="/seminars" className="btn btn-primary mt-3">
          Khám phá các Hội thảo
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
