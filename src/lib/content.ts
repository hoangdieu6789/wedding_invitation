import { PersonBlock, Side, SideContent } from "./types";

const WEDDING_DATE_ISO = "2026-09-20T09:00:00+07:00";
const HERO_DATE_RIBBON = "19 – 20 . 09 . 2026";
const LE_THANH_HON_DATE_LABEL = "CHỦ NHẬT · 20.09.2026";

const nhaGai: PersonBlock = {
  title: "Nhà gái",
  father: "Trần Khắc Xá",
  mother: "Nguyễn Thị Huệ",
  addressLines: ["Xóm 1, Thôn Thanh Khiết", "Xã Giao Bình, Tỉnh Ninh Bình"],
};

const nhaTrai: PersonBlock = {
  title: "Nhà trai",
  father: "Hoàng Văn Vỵ",
  mother: "Nguyễn Thị Nga",
  addressLines: ["Thôn Đức Cơ, Xã Đồng Châu", "Tỉnh Hưng Yên"],
};

// Wedding ceremony (lễ thành hôn) is always held at the groom's family home,
// regardless of which invitation (nhà gái / nhà trai) is being viewed.
const leThanhHon = {
  title: "TƯ GIA NHÀ TRAI",
  addressLines: ["Thôn Đức Cơ · Xã Đồng Châu", "Tỉnh Hưng Yên"],
  time: "09 giờ 00 phút",
  dateLabel: LE_THANH_HON_DATE_LABEL,
  lunarLabel: "(Tức ngày 10 tháng 08 năm Bính Ngọ)",
  mapUrl: "https://maps.app.goo.gl/MMZvvwt6yEm4i7VX7",
  ctaLabel: "Xem chỉ đường",
  startIso: WEDDING_DATE_ISO,
};

const albumImages = ["/img/couple-1.jpg"];

export const LOVE_STORY = [
  {
    label: "Khởi đầu từ một thoáng thu Hà Nội",
    text: "Giữa tiết trời dịu mát của mùa thu Thủ đô, khi những con ngõ phố cổ xao động tiếng cười của nhóm bạn dạo phố, hai ánh mắt đã vô tình va vào nhau. Không kịch bản sắp đặt, chẳng hẹn trước một lời, cuộc gặp gỡ tình cờ ấy lại chính là mở đầu cho một định mệnh đẹp đẽ.",
  },
  {
    label: "Từ thân quen đến trăm dặm hóa gần",
    text: "Những câu chuyện bông đùa vu vơ thuở ban đầu dần hóa thành sợi dây gắn kết kỳ lạ. Từng cử chỉ quan tâm, từng thói quen nhỏ nhặt tự nhiên đến mức ngỡ như cả hai đã quen nhau tự bao giờ. Dẫu có những khoảng cách địa lý xa xôi hay bao thử thách của cuộc sống, lòng tin và sự thấu hiểu vẫn luôn giữ trọn ngọn lửa ấm, biến mọi cách trở thành động lực để bước về phía nhau.",
  },
  {
    label: "Khoảnh khắc của sự chân thành",
    text: "Không ánh nến lung linh nơi nhà hàng xa hoa, chẳng cần những lời hoa mỹ sáo rỗng. Bằng tất cả sự ấm áp, mộc mạc và chân thành nhất từ trái tim Hoàng Diệu, Trần Mai đã mỉm cười trao đi lời hẹn ước: \"Em đồng ý\". Giây phút ấy, mọi ồn ào ngoài kia nhường chỗ cho niềm xúc động trọn vẹn của hai tâm hồn tìm thấy bến đỗ bình yên.",
  },
  {
    label: "Cái kết viên mãn và liên hôn thế kỷ",
    text: "Ngày 20.09.2026 không chỉ là ngày tình yêu đơm hoa kết trái, mà còn chính thức đánh dấu màn liên hôn gia tộc rạng rỡ giữa Hoàng gia và Trần gia:\nDiệu – Mai gắn kết một nhà,\nHoàng – Trần hưng thịnh, muôn phần vinh hoa.",
  },
];

export const SIDES: Record<Side, SideContent> = {
  gai: {
    key: "gai",
    storagePrefix: "tng",
    monogram: "/img/mono-md2.png",
    heroNames: ["Trần Mai", "Hoàng Diệu"],
    dateRibbon: HERO_DATE_RIBBON,
    leThanhHon,
    tiecMung: {
      title: "Tư gia nhà gái",
      addressLines: ["Xóm 1 · Thôn Thanh Khiết", "Xã Giao Bình · Tỉnh Ninh Bình"],
      time: "17 giờ 00 phút",
      dateLabel: "THỨ BẢY · 19.09.2026",
      lunarLabel: "(Tức ngày 09 tháng 08 năm Bính Ngọ)",
      startIso: "2026-09-19T17:00:00+07:00",
      mapUrl: "https://maps.app.goo.gl/imWd1r7h1Yo7PbHj8",
      ctaLabel: "Chỉ đường tới tiệc",
    },
    parents: { left: nhaGai, right: nhaTrai },
    bankOwnerName: "TRẦN THỊ MAI",
    bankName: "TPBank",
    bankAccountNumber: "9682 8011 999",
    weddingDateIso: WEDDING_DATE_ISO,
    albumImages,
    funClosingLine: "Mai lấy chồng rồi!!! Đã lâu không gặp.\nHẹn gặp lại trong đám cưới của tôi nhé!",
  },
  trai: {
    key: "trai",
    storagePrefix: "tnt",
    monogram: "/img/mono-dm2.png",
    heroNames: ["Hoàng Diệu", "Trần Mai"],
    dateRibbon: HERO_DATE_RIBBON,
    leThanhHon,
    tiecMung: {
      title: "Tư gia nhà trai",
      addressLines: ["Thôn Đức Cơ · Xã Đồng Châu", "Tỉnh Hưng Yên"],
      time: "17 giờ 00 phút",
      dateLabel: "THỨ BẢY · 19.09.2026",
      lunarLabel: "(Tức ngày 09 tháng 08 năm Bính Ngọ)",
      startIso: "2026-09-19T17:00:00+07:00",
      mapUrl: leThanhHon.mapUrl,
      ctaLabel: "Chỉ đường tới tiệc",
    },
    parents: { left: nhaTrai, right: nhaGai },
    bankOwnerName: "HOÀNG THẾ DIỆU",
    bankName: "TPBank",
    bankAccountNumber: "2860 7011 998",
    weddingDateIso: WEDDING_DATE_ISO,
    albumImages,
    funClosingLine: "Diệu lấy vợ rồi!!! Đã lâu không gặp.\nHẹn gặp lại trong đám cưới của tôi nhé!",
  },
  huynh: {
    key: "huynh",
    storagePrefix: "tng",
    monogram: "/img/mono-md2.png",
    heroNames: ["Trần Mai", "Hoàng Diệu"],
    dateRibbon: HERO_DATE_RIBBON,
    leThanhHon,
    tiecMung: {
      title: "Tư gia nhà gái",
      addressLines: ["Xóm 1 · Thôn Thanh Khiết", "Xã Giao Bình · Tỉnh Ninh Bình"],
      time: "17 giờ 00 phút",
      dateLabel: "THỨ BẢY · 19.09.2026",
      lunarLabel: "(Tức ngày 09 tháng 08 năm Bính Ngọ)",
      startIso: "2026-09-19T17:00:00+07:00",
      mapUrl: "https://maps.app.goo.gl/imWd1r7h1Yo7PbHj8",
      ctaLabel: "Chỉ đường tới tiệc",
    },
    parents: { left: nhaGai, right: nhaTrai },
    bankOwnerName: "TRẦN THỊ MAI",
    bankName: "TPBank",
    bankAccountNumber: "9682 8011 999",
    weddingDateIso: WEDDING_DATE_ISO,
    albumImages,
    funClosingLine: "Kính chúc Ông Bà, Cô Chú, Anh Chị luôn mạnh khỏe và an vui.\nRất mong được đón tiếp trong ngày vui của hai con!",
    greetingEyebrow: "Trân trọng kính mời",
    greetingLine: "tới dự lễ thành hôn của hai con chúng tôi",
    shareText: "Trân trọng kính mời Ông/Bà, Cô/Chú tới chung vui cùng gia đình chúng tôi!",
  },
};
