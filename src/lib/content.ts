import { PersonBlock, Side, SideContent } from "./types";

const WEDDING_DATE_ISO = "2026-09-20T09:00:00+07:00";
const DATE_RIBBON = "CHỦ NHẬT · 20.09.2026";

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
  dateLabel: DATE_RIBBON,
  lunarLabel: "(Tức ngày 10 tháng 08 năm Bính Ngọ)",
  mapUrl: "https://maps.app.goo.gl/MMZvvwt6yEm4i7VX7",
  ctaLabel: "Xem chỉ đường",
};

const albumImages = ["/img/couple-1.jpg"];

export const SIDES: Record<Side, SideContent> = {
  gai: {
    key: "gai",
    storagePrefix: "tng",
    monogram: "/img/mono-md2.png",
    heroNames: ["Trần Mai", "Hoàng Diệu"],
    dateRibbon: DATE_RIBBON,
    leThanhHon,
    tiecMung: {
      title: "Tại tư gia nhà gái",
      addressLines: ["Xóm 1 · Thôn Thanh Khiết", "Xã Giao Bình · Tỉnh Ninh Bình"],
      time: "17 giờ 00 phút",
      dateLabel: "THỨ BẢY · 19.09.2026",
      lunarLabel: "(Tức ngày 09 tháng 08 năm Bính Ngọ)",
      mapUrl: "https://maps.app.goo.gl/imWd1r7h1Yo7PbHj8",
      ctaLabel: "Chỉ đường tới tiệc",
    },
    parents: { left: nhaGai, right: nhaTrai },
    bankOwnerName: "TRẦN MAI",
    weddingDateIso: WEDDING_DATE_ISO,
    albumImages,
  },
  trai: {
    key: "trai",
    storagePrefix: "tnt",
    monogram: "/img/mono-dm2.png",
    heroNames: ["Hoàng Diệu", "Trần Mai"],
    dateRibbon: DATE_RIBBON,
    leThanhHon,
    tiecMung: {
      title: "Tại tư gia nhà trai",
      addressLines: ["Thôn Đức Cơ · Xã Đồng Châu", "Tỉnh Hưng Yên"],
      time: "17 giờ 00 phút",
      dateLabel: "THỨ BẢY · 19.09.2026",
      lunarLabel: "(Tức ngày 09 tháng 08 năm Bính Ngọ)",
      mapUrl: leThanhHon.mapUrl,
      ctaLabel: "Chỉ đường tới tiệc",
    },
    parents: { left: nhaTrai, right: nhaGai },
    bankOwnerName: "HOÀNG DIỆU",
    weddingDateIso: WEDDING_DATE_ISO,
    albumImages,
  },
};
