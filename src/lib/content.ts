import { Locale, PersonBlock, Side, SideContent } from "./types";

const WEDDING_DATE_ISO = "2026-09-20T09:00:00+07:00";
const HERO_DATE_RIBBON = "19 – 20 . 09 . 2026";

function buildPersonBlocks(isEn: boolean): { nhaGai: PersonBlock; nhaTrai: PersonBlock } {
  const nhaGai: PersonBlock = {
    title: isEn ? "Bride's Family" : "Nhà gái",
    father: "Trần Khắc Xá",
    mother: "Nguyễn Thị Huệ",
    addressLines: ["Xóm 1, Thôn Thanh Khiết", "Xã Giao Bình, Tỉnh Ninh Bình"],
  };

  const nhaTrai: PersonBlock = {
    title: isEn ? "Groom's Family" : "Nhà trai",
    father: "Hoàng Văn Vỵ",
    mother: "Nguyễn Thị Nga",
    addressLines: ["Thôn Đức Cơ, Xã Đồng Châu", "Tỉnh Hưng Yên"],
  };

  return { nhaGai, nhaTrai };
}

function buildSides(locale: Locale): Record<Side, SideContent> {
  const isEn = locale === "en";
  const { nhaGai, nhaTrai } = buildPersonBlocks(isEn);
  const albumImages = ["/img/couple-1.jpg"];

  // Wedding ceremony (lễ thành hôn) is always held at the groom's family home,
  // regardless of which invitation (nhà gái / nhà trai) is being viewed.
  const leThanhHon = {
    title: isEn ? "GROOM'S FAMILY HOME" : "TƯ GIA NHÀ TRAI",
    addressLines: ["Thôn Đức Cơ · Xã Đồng Châu", "Tỉnh Hưng Yên"],
    time: isEn ? "9:00 AM" : "09 giờ 00 phút",
    dateLabel: isEn ? "SUNDAY · 20.09.2026" : "CHỦ NHẬT · 20.09.2026",
    lunarLabel: isEn
      ? "(Lunar calendar: 10th day of the 8th month, Year of Bính Ngọ)"
      : "(Tức ngày 10 tháng 08 năm Bính Ngọ)",
    mapUrl: "https://maps.app.goo.gl/MMZvvwt6yEm4i7VX7",
    ctaLabel: isEn ? "Get directions" : "Xem chỉ đường",
    startIso: WEDDING_DATE_ISO,
  };

  const gaiTiecMung = {
    title: isEn ? "Bride's Family Home" : "Tư gia nhà gái",
    addressLines: ["Xóm 1 · Thôn Thanh Khiết", "Xã Giao Bình · Tỉnh Ninh Bình"],
    time: isEn ? "5:00 PM" : "17 giờ 00 phút",
    dateLabel: isEn ? "SATURDAY · 19.09.2026" : "THỨ BẢY · 19.09.2026",
    lunarLabel: isEn
      ? "(Lunar calendar: 9th day of the 8th month, Year of Bính Ngọ)"
      : "(Tức ngày 09 tháng 08 năm Bính Ngọ)",
    startIso: "2026-09-19T17:00:00+07:00",
    mapUrl: "https://maps.app.goo.gl/imWd1r7h1Yo7PbHj8",
    ctaLabel: isEn ? "Directions to the reception" : "Chỉ đường tới tiệc",
  };

  const traiTiecMung = {
    ...gaiTiecMung,
    title: isEn ? "Groom's Family Home" : "Tư gia nhà trai",
    addressLines: ["Thôn Đức Cơ · Xã Đồng Châu", "Tỉnh Hưng Yên"],
    mapUrl: leThanhHon.mapUrl,
  };

  return {
    gai: {
      key: "gai",
      storagePrefix: "tng",
      monogram: "/img/mono-md2.png",
      heroNames: ["Trần Mai", "Hoàng Diệu"],
      dateRibbon: HERO_DATE_RIBBON,
      leThanhHon,
      tiecMung: gaiTiecMung,
      parents: { left: nhaGai, right: nhaTrai },
      bankOwnerName: "TRẦN THỊ MAI",
      bankName: "TPBank",
      bankAccountNumber: "9682 8011 999",
      weddingDateIso: WEDDING_DATE_ISO,
      albumImages,
      funClosingLine: isEn
        ? "Mai is getting married!!! It's been a while.\nHope to see you again at my wedding!"
        : "Mai lấy chồng rồi!!! Đã lâu không gặp.\nHẹn gặp lại trong đám cưới của tôi nhé!",
    },
    trai: {
      key: "trai",
      storagePrefix: "tnt",
      monogram: "/img/mono-dm2.png",
      heroNames: ["Hoàng Diệu", "Trần Mai"],
      dateRibbon: HERO_DATE_RIBBON,
      leThanhHon,
      tiecMung: traiTiecMung,
      parents: { left: nhaTrai, right: nhaGai },
      bankOwnerName: "HOÀNG THẾ DIỆU",
      bankName: "TPBank",
      bankAccountNumber: "2860 7011 998",
      weddingDateIso: WEDDING_DATE_ISO,
      albumImages,
      funClosingLine: isEn
        ? "Diệu is getting married!!! It's been a while.\nHope to see you again at my wedding!"
        : "Diệu lấy vợ rồi!!! Đã lâu không gặp.\nHẹn gặp lại trong đám cưới của tôi nhé!",
    },
    huynh: {
      key: "huynh",
      storagePrefix: "tng",
      monogram: "/img/mono-md2.png",
      heroNames: ["Trần Mai", "Hoàng Diệu"],
      dateRibbon: HERO_DATE_RIBBON,
      leThanhHon,
      tiecMung: gaiTiecMung,
      parents: { left: nhaGai, right: nhaTrai },
      bankOwnerName: "TRẦN THỊ MAI",
      bankName: "TPBank",
      bankAccountNumber: "9682 8011 999",
      weddingDateIso: WEDDING_DATE_ISO,
      albumImages,
      funClosingLine: isEn
        ? "Wishing our grandparents, aunts, uncles and siblings good health and happiness.\nWe hope to welcome you on our special day!"
        : "Kính chúc Ông Bà, Cô Chú, Anh Chị luôn mạnh khỏe và an vui.\nRất mong được đón tiếp trong ngày vui của hai con!",
      greetingEyebrow: isEn ? "With respect, we invite" : "Trân trọng kính mời",
      greetingLine: isEn ? "you to our wedding ceremony" : "tới dự lễ thành hôn của hai con chúng tôi",
      shareText: isEn
        ? "We warmly invite you to celebrate with our family!"
        : "Trân trọng kính mời Ông/Bà, Cô/Chú tới chung vui cùng gia đình chúng tôi!",
    },
  };
}

const SIDES_VI = buildSides("vi");
const SIDES_EN = buildSides("en");

export function getSides(locale: Locale): Record<Side, SideContent> {
  return locale === "en" ? SIDES_EN : SIDES_VI;
}

// Kept for call sites that only need Vietnamese defaults (e.g. static metadata).
export const SIDES = SIDES_VI;

function buildLoveStory(locale: Locale) {
  const isEn = locale === "en";
  return [
    {
      label: isEn ? "A beginning amid a Hanoi autumn" : "Khởi đầu từ một thoáng thu Hà Nội",
      text: isEn
        ? "Amid the cool, gentle air of a Hanoi autumn, as laughter echoed through the old quarter's lanes among a group of friends out for a stroll, two pairs of eyes met by chance. No script, no plan, not a single word arranged in advance — that accidental encounter turned out to be the beginning of a beautiful fate."
        : "Giữa tiết trời dịu mát của mùa thu Thủ đô, khi những con ngõ phố cổ xao động tiếng cười của nhóm bạn dạo phố, hai ánh mắt đã vô tình va vào nhau. Không kịch bản sắp đặt, chẳng hẹn trước một lời, cuộc gặp gỡ tình cờ ấy lại chính là mở đầu cho một định mệnh đẹp đẽ.",
    },
    {
      label: isEn ? "From familiar faces to a hundred miles made near" : "Từ thân quen đến trăm dặm hóa gần",
      text: isEn
        ? "The lighthearted, aimless conversations of the early days slowly wove into an unusual bond. Every small gesture of care, every tiny habit, felt so natural it seemed as though they had known each other forever. Even through long distances and life's many challenges, trust and understanding kept the warmth alive, turning every obstacle into a reason to move closer together."
        : "Những câu chuyện bông đùa vu vơ thuở ban đầu dần hóa thành sợi dây gắn kết kỳ lạ. Từng cử chỉ quan tâm, từng thói quen nhỏ nhặt tự nhiên đến mức ngỡ như cả hai đã quen nhau tự bao giờ. Dẫu có những khoảng cách địa lý xa xôi hay bao thử thách của cuộc sống, lòng tin và sự thấu hiểu vẫn luôn giữ trọn ngọn lửa ấm, biến mọi cách trở thành động lực để bước về phía nhau.",
    },
    {
      label: isEn ? "A moment of sincerity" : "Khoảnh khắc của sự chân thành",
      text: isEn
        ? "No flickering candlelight in a lavish restaurant, no need for hollow, flowery words. With all the warmth, simplicity, and sincerity from Hoàng Diệu's heart, Trần Mai smiled and gave her answer: \"Yes, I do.\" In that moment, all the noise of the outside world gave way to the full, quiet joy of two souls finding their peaceful harbor."
        : "Không ánh nến lung linh nơi nhà hàng xa hoa, chẳng cần những lời hoa mỹ sáo rỗng. Bằng tất cả sự ấm áp, mộc mạc và chân thành nhất từ trái tim Hoàng Diệu, Trần Mai đã mỉm cười trao đi lời hẹn ước: \"Em đồng ý\". Giây phút ấy, mọi ồn ào ngoài kia nhường chỗ cho niềm xúc động trọn vẹn của hai tâm hồn tìm thấy bến đỗ bình yên.",
    },
    {
      label: isEn ? "A joyful ending and a union of two families" : "Cái kết viên mãn và liên hôn thế kỷ",
      text: isEn
        ? "September 20, 2026 is not only the day our love blossoms into marriage, but also the day that formally unites the Hoàng and Trần families in celebration:\nDiệu and Mai, joined as one family,\nHoàng and Trần, flourishing together in joy and prosperity."
        : "Ngày 20.09.2026 không chỉ là ngày tình yêu đơm hoa kết trái, mà còn chính thức đánh dấu màn liên hôn gia tộc rạng rỡ giữa Hoàng gia và Trần gia:\nDiệu – Mai gắn kết một nhà,\nHoàng – Trần hưng thịnh, muôn phần vinh hoa.",
    },
  ];
}

const LOVE_STORY_VI = buildLoveStory("vi");
const LOVE_STORY_EN = buildLoveStory("en");

export function getLoveStory(locale: Locale) {
  return locale === "en" ? LOVE_STORY_EN : LOVE_STORY_VI;
}
