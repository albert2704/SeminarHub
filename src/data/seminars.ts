import { Seminar } from '@/types'; // Use path alias

export const seminars: Seminar[] = [
  {
    id: "1",
    title: "Điện toán lượng tử: Những biên giới mới",
    description: "Hội thảo này khám phá những tiến bộ mới nhất trong điện toán lượng tử và các ứng dụng tiềm năng của nó trong việc giải quyết các vấn đề tính toán phức tạp.",
    presenter: "Tiến sĩ Trần Thị Bích",
    organization: "Đại học Bách Khoa Hà Nội",
    date: "15/05/2025",
    time: "14:00 - 16:00 GMT+7",
    location: "Hội trường Tạ Quang Bửu, ĐHBK Hà Nội, Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
    latitude: 21.0065, // Approximate latitude for HUST
    longitude: 105.8431, // Approximate longitude for HUST
    topics: ["Vật lý", "Khoa học máy tính"],
    images: [ 
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Code on screen
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Laptop with code
      "https://cdn.arstechnica.net/wp-content/uploads/2020/08/ai-artificial-intelligence.jpg"
    ],
    agenda: [
      { time: "13:30", description: "Đăng ký và giải lao" },
      { time: "14:00", description: "Giới thiệu về nguyên lý điện toán lượng tử" },
      { time: "14:45", description: "Những đột phá gần đây trong thuật toán lượng tử" },
      { time: "15:30", description: "Phiên hỏi đáp" },
      { time: "16:00", description: "Bế mạc" },
    ],
    enrollmentNumber: 125, // Added enrollment number
  },
  {
    id: "2",
    title: "CRISPR-Cas9: Ý nghĩa đạo đức",
    description: "Một cuộc thảo luận về các cân nhắc đạo đức xung quanh công nghệ chỉnh sửa gen, tập trung vào CRISPR-Cas9 và ý nghĩa của nó đối với sức khỏe con người và xã hội.",
    presenter: "Giáo sư Nguyễn Văn Hùng",
    organization: "Đại học Y Hà Nội",
    date: "20/05/2025",
    time: "13:00 - 15:00 GMT+7",
    location: "Giảng đường lớn, Đại học Y Hà Nội, Số 1 Tôn Thất Tùng, Đống Đa, Hà Nội",
    latitude: 21.0074, // Approximate latitude for HMU
    longitude: 105.8275, // Approximate longitude for HMU
    topics: ["Sinh học", "Y học", "Đạo đức"],
    images: [ 
      "https://th.bing.com/th/id/OIP.Wxv6ixJhNvXhzrRH-OjnUAHaE8?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.DWGhutNj5mJWGkKlN5jnaAHaET?rs=1&pid=ImgDetMain"
    ],
    agenda: [
      { time: "12:30", description: "Đăng ký" },
      { time: "13:00", description: "Phát biểu khai mạc và tổng quan về công nghệ CRISPR" },
      { time: "13:30", description: "Các ứng dụng hiện tại trong nghiên cứu và y học" },
      { time: "14:00", description: "Khung đạo đức và các cân nhắc" },
      { time: "14:30", description: "Thảo luận nhóm với các chuyên gia đạo đức sinh học" },
      { time: "15:00", description: "Hỏi đáp và kết luận" },
    ],
    enrollmentNumber: 88, // Added enrollment number
  },
  {
    id: "3",
    title: "Học máy trong Vật lý thiên văn",
    description: "Hội thảo này sẽ trình bày cách các kỹ thuật học máy đang cách mạng hóa việc phân tích dữ liệu trong vật lý thiên văn, từ phát hiện ngoại hành tinh đến phân loại thiên hà.",
    presenter: "Tiến sĩ Lê Thị Mai Anh",
    organization: "Viện Vật lý - Viện Hàn lâm KH&CN Việt Nam",
    date: "05/06/2025",
    time: "11:00 - 13:00 GMT+7",
    location: "Hội trường Viện Vật lý, 18 Hoàng Quốc Việt, Cầu Giấy, Hà Nội",
    latitude: 21.0379, // Approximate latitude for VAST area
    longitude: 105.7889, // Approximate longitude for VAST area
    topics: ["Khoa học máy tính", "Thiên văn học"],
    images: [ 
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Nebula
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Starry sky
    ],
    agenda: [
      { time: "10:30", description: "Check-in" },
      { time: "11:00", description: "Giới thiệu và cơ bản về ML trong thiên văn học" },
      { time: "11:45", description: "Nghiên cứu tình huống: Thuật toán phát hiện ngoại hành tinh" },
      { time: "12:15", description: "Hướng đi tương lai và thách thức" },
      { time: "12:45", description: "Hỏi đáp và giao lưu" },
    ],
    enrollmentNumber: 75, // Added enrollment number
  },
  {
    id: "4",
    title: "Biến đổi khí hậu: Mô hình và dự báo mới nhất",
    description: "Tổng quan về các mô hình khí hậu gần đây nhất và dự báo của chúng về các kiểu khí hậu toàn cầu trong thế kỷ tới, tập trung vào các chiến lược giảm thiểu tại Việt Nam.",
    presenter: "Tiến sĩ Phạm Minh Tuấn",
    organization: "Đại học Khoa học Tự nhiên, ĐHQG TP.HCM",
    date: "12/06/2025",
    time: "15:00 - 17:00 GMT+7",
    location: "Hội trường I, ĐH KHTN, 227 Nguyễn Văn Cừ, Quận 5, TP.HCM",
    topics: ["Khoa học môi trường", "Khí hậu học"],
    images: [ 
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Hands holding seedling
      "https://images.unsplash.com/photo-1567007478886-04a7bca15624?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1661376182985-8b4045782b90?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    agenda: [
      { time: "14:30", description: "Chào mừng và giới thiệu" },
      { time: "15:00", description: "Xem xét các phát hiện của IPCC AR6 và tác động tại Việt Nam" },
      { time: "15:45", description: "Các phương pháp mô hình hóa khí hậu mới" },
      { time: "16:15", description: "Dự báo khí hậu khu vực Đông Nam Á" },
      { time: "16:45", description: "Thảo luận và kết luận" },
    ],
    enrollmentNumber: 92, // Added enrollment number
  },
  {
    id: "5",
    title: "Khoa học thần kinh về ý thức",
    description: "Bài nói chuyện này sẽ khám phá các mối tương quan thần kinh của ý thức và những đột phá gần đây trong việc hiểu cách bộ não tạo ra trải nghiệm có ý thức.",
    presenter: "Giáo sư Hoàng Thị Lan",
    organization: "Đại học Quốc gia Hà Nội",
    date: "08/07/2025",
    time: "10:00 - 12:00 GMT+7",
    location: "Hội trường Nguyễn Văn Đạo, ĐHQGHN, 144 Xuân Thủy, Cầu Giấy, Hà Nội",
    topics: ["Khoa học thần kinh", "Tâm lý học"],
    images: [
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Abstract brain/AI connection
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Brain scan image
      "https://th.bing.com/th/id/OIP.6D2LXaXpaGU4AmFc-KKv_QHaE8?rs=1&pid=ImgDetMain", // Person looking thoughtful
    ],
    agenda: [
      { time: "09:30", description: "Đăng ký" },
      { time: "10:00", description: "Giới thiệu về các lý thuyết ý thức" },
      { time: "10:45", description: "Các mối tương quan thần kinh và nghiên cứu hình ảnh" },
      { time: "11:30", description: "Hỏi đáp và thảo luận" },
    ],
    enrollmentNumber: 110, // Added enrollment number
  },
  {
    id: "6",
    title: "Những tiến bộ trong nhiệt hạch hạt nhân",
    description: "Một cuộc thảo luận về những đột phá gần đây trong nghiên cứu nhiệt hạch hạt nhân và con đường hướng tới sản xuất năng lượng nhiệt hạch bền vững.",
    presenter: "Tiến sĩ Vũ Ngọc Hải",
    organization: "Viện Năng lượng Nguyên tử Việt Nam",
    date: "15/07/2025",
    time: "14:30 - 16:30 GMT+7",
    location: "Viện NLNTVN, 59 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội",
    topics: ["Vật lý", "Năng lượng"],
    images: [
      "https://images.unsplash.com/photo-1523947134250-980760eaefdd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb3RvbnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Server room / complex tech
      "https://th.bing.com/th/id/OIP.33AfEwi4LCrX2jw1bMSMqAHaEK?rs=1&pid=ImgDetMain",
    ],
    agenda: [
      { time: "14:00", description: "Đăng nhập và giải khát" },
      { time: "14:30", description: "Tình hình hiện tại của nghiên cứu nhiệt hạch" },
      { time: "15:15", description: "Cập nhật dự án ITER và các dự án quốc tế" },
      { time: "15:45", description: "Các phương pháp tiếp cận nhiệt hạch thay thế" },
      { time: "16:15", description: "Kết luận và triển vọng tương lai" },
    ],
    enrollmentNumber: 65, // Added enrollment number
  },
  {
    id: "7",
    title: "Công nghệ Nano trong Y học",
    description: "Khám phá các ứng dụng tiên tiến của công nghệ nano trong chẩn đoán và điều trị bệnh, bao gồm hệ thống phân phối thuốc và hình ảnh y tế.",
    presenter: "Tiến sĩ Nguyễn Thị Kim Dung",
    organization: "Đại học Khoa học và Công nghệ Hà Nội (USTH)",
    date: "22/07/2025",
    time: "09:00 - 11:00 GMT+7",
    location: "Hội trường USTH, 18 Hoàng Quốc Việt, Cầu Giấy, Hà Nội",
    topics: ["Y học", "Hóa học", "Vật lý"],
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Doctor with tablet
      "https://images.unsplash.com/photo-1626955105848-742d9cfd0b50?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    agenda: [
      { time: "08:30", description: "Đăng ký" },
      { time: "09:00", description: "Giới thiệu về vật liệu nano y sinh" },
      { time: "09:45", description: "Ứng dụng trong phân phối thuốc mục tiêu" },
      { time: "10:30", description: "Công nghệ nano trong chẩn đoán hình ảnh" },
      { time: "11:00", description: "Hỏi đáp và kết thúc" },
    ],
    enrollmentNumber: 130, // Added enrollment number
  },
  {
    id: "8",
    title: "Trí tuệ nhân tạo trong Tài chính",
    description: "Tìm hiểu cách AI đang thay đổi ngành tài chính, từ giao dịch thuật toán đến phát hiện gian lận và quản lý rủi ro.",
    presenter: "Ông Lê Minh Quang",
    organization: "Công ty Fintech ABC",
    date: "01/08/2025",
    time: "13:30 - 15:30 GMT+7",
    location: "Khách sạn Grand Plaza, 117 Trần Duy Hưng, Cầu Giấy, Hà Nội",
    topics: ["Khoa học máy tính", "Tài chính"],
    images: [
      "https://images.unsplash.com/photo-1554260570-e9689a3418b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Stock market graph
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Multiple screens with graphs
    ],
    agenda: [
      { time: "13:00", description: "Đón khách" },
      { time: "13:30", description: "Tổng quan về AI trong Fintech" },
      { time: "14:00", description: "Học máy cho giao dịch thuật toán" },
      { time: "14:45", description: "AI trong phát hiện gian lận" },
      { time: "15:15", description: "Thảo luận và hỏi đáp" },
    ],
    enrollmentNumber: 205, // Added enrollment number
  },
  {
    id: "9",
    title: "Toán học của Lý thuyết Dây",
    description: "Một cái nhìn sâu sắc về các cấu trúc toán học phức tạp làm nền tảng cho lý thuyết dây và vai trò của nó trong việc thống nhất vật lý.",
    presenter: "Giáo sư Trần Quốc Tuấn",
    organization: "Viện Toán học - Viện Hàn lâm KH&CN Việt Nam",
    date: "10/08/2025",
    time: "10:00 - 12:00 GMT+7",
    location: "Hội trường Viện Toán học, 18 Hoàng Quốc Việt, Cầu Giấy, Hà Nội",
    topics: ["Toán học", "Vật lý"],
    images: [
      "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Complex formula on blackboard
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Abstract geometric shapes
    ],
    agenda: [
      { time: "09:30", description: "Đăng ký" },
      { time: "10:00", description: "Giới thiệu về Lý thuyết Dây" },
      { time: "10:45", description: "Hình học và Topo trong Lý thuyết Dây" },
      { time: "11:30", description: "Các câu hỏi mở và hướng nghiên cứu" },
    ],
    enrollmentNumber: 45, // Added enrollment number
  },
  {
    id: "10",
    title: "Hệ Sinh Thái Biển Việt Nam: Thách Thức và Bảo Tồn",
    description: "Đánh giá tình trạng hiện tại của các hệ sinh thái biển Việt Nam, các mối đe dọa chính và các nỗ lực bảo tồn đang diễn ra.",
    presenter: "Tiến sĩ Võ Sĩ Tuấn",
    organization: "Viện Hải dương học Nha Trang",
    date: "18/08/2025",
    time: "14:00 - 16:00 GMT+7",
    location: "Viện Hải dương học, 01 Cầu Đá, Nha Trang, Khánh Hòa",
    topics: ["Khoa học môi trường", "Sinh học"],
    images: [
      "https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Coral reef
      "https://images.unsplash.com/photo-1545641203-7d072a14e3b2?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    agenda: [
      { time: "13:30", description: "Đón tiếp" },
      { time: "14:00", description: "Đa dạng sinh học biển Việt Nam" },
      { time: "14:45", description: "Tác động của biến đổi khí hậu và ô nhiễm" },
      { time: "15:15", description: "Các chiến lược và sáng kiến bảo tồn" },
      { time: "15:45", description: "Thảo luận" },
    ],
    enrollmentNumber: 58, // Added enrollment number
  },
  {
    id: "11",
    title: "Tâm Lý Học Nhận Thức và Ra Quyết Định",
    description: "Khám phá các quá trình nhận thức liên quan đến việc ra quyết định của con người, bao gồm các thành kiến, suy nghiệm và ảnh hưởng của cảm xúc.",
    presenter: "Tiến sĩ Đặng Hoàng Minh",
    organization: "Đại học Khoa học Xã hội và Nhân văn, ĐHQGHN",
    date: "25/08/2025",
    time: "09:30 - 11:30 GMT+7",
    location: "Phòng hội thảo, ĐH KHXH&NV, 336 Nguyễn Trãi, Thanh Xuân, Hà Nội",
    topics: ["Tâm lý học", "Khoa học thần kinh"],
    images: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // People collaborating around table
      "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Maze puzzle
    ],
    agenda: [
      { time: "09:00", description: "Đăng ký" },
      { time: "09:30", description: "Mô hình ra quyết định cổ điển" },
      { time: "10:00", description: "Thành kiến nhận thức và suy nghiệm" },
      { time: "10:45", description: "Vai trò của cảm xúc trong lựa chọn" },
      { time: "11:15", description: "Hỏi đáp" },
    ],
    enrollmentNumber: 99, // Added enrollment number
  },
  {
    id: "12",
    title: "Vật Liệu Mới cho Pin Thế Hệ Tiếp Theo",
    description: "Tổng quan về nghiên cứu tiên tiến về vật liệu mới cho pin lithium-ion và pin thể rắn, nhằm mục đích tăng mật độ năng lượng và cải thiện độ an toàn.",
    presenter: "Tiến sĩ Bùi Thị An",
    organization: "Đại học Công nghệ, ĐHQGHN",
    date: "05/09/2025",
    time: "14:00 - 16:00 GMT+7",
    location: "Phòng thí nghiệm Vật liệu tiên tiến, ĐH Công nghệ, 144 Xuân Thủy, Cầu Giấy, Hà Nội",
    latitude: 21.0379, // Approximate latitude for VNU UET
    longitude: 105.7829, // Approximate longitude for VNU UET
    topics: ["Hóa học", "Vật lý", "Năng lượng"],
    images: [
      "https://images.unsplash.com/photo-1454779132693-e5cd0a216ed3?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1679917152396-4b18accacb9d?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1467533003447-e295ff1b0435?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    agenda: [
      { time: "13:30", description: "Đón tiếp" },
      { time: "14:00", description: "Những thách thức của công nghệ pin hiện tại" },
      { time: "14:30", description: "Vật liệu cathode và anode tiên tiến" },
      { time: "15:15", description: "Nghiên cứu về pin thể rắn" },
      { time: "15:45", description: "Kết luận và thảo luận" },
    ],
    enrollmentNumber: 150, // Added enrollment number
  }
];
