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

// TODO: thay bằng câu chuyện thật của 2 bạn trước khi công bố thiệp.
export const LOVE_STORY = [
  { label: "Gặp nhau", text: "Một ngày rất bình thường, hai người xa lạ vô tình quen nhau." },
  { label: "Hẹn hò", text: "Những buổi hẹn hò đầu tiên, và cả hai nhận ra đây là người mình muốn đi cùng thật xa." },
  { label: "Cầu hôn", text: "Một lời cầu hôn giản dị nhưng đủ khiến cả hai rưng rưng." },
  { label: "Về chung nhà", text: "Và giờ đây, 20.09.2026 — ngày hai người chính thức nên duyên vợ chồng." },
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
      title: "Tại tư gia nhà gái",
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
      title: "Tại tư gia nhà trai",
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
};
