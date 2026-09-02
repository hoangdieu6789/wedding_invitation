import { Locale } from "./types";

export interface UiText {
  qrMissing: string;
  qrAlt: string;
  ceremonyAt: string;
  receptionAt: string;
  at: string;
  addToCalendar: string;
  otherCalendar: string;
  honoredToWelcome: string;
  icsFilename: string;
  father: string;
  mother: string;
  giftBoxTitle: string;
  giftBoxDesc: string;
  thankYouTitle: string;
  defaultEyebrow: string;
  defaultGreetingLine: string;
  shareTitlePrefix: string;
  defaultShareText: string;

  rsvpTitle: string;
  rsvpSubtitle: string;
  namePlaceholder: string;
  ariaAttendYes: string;
  attendYes: string;
  ariaAttendNo: string;
  attendNo: string;
  companionsLabel: string;
  ariaDecreaseCompanions: string;
  ariaIncreaseCompanions: string;
  wishLabel: string;
  ariaSubmit: string;
  submitLabel: string;
  thanksTitle: string;
  thanksDesc: string;
  ariaEdit: string;
  editLabel: string;
  defaultGuestName: string;

  wishesBookTitle: string;
  wishesEmpty: string;
  viewWish: (i: number) => string;

  loveStoryEyebrow: string;
  loveStoryTitle: string;

  albumEyebrow: string;
  albumTitle: string;
  photoAlt: string;
  prevPhoto: string;
  nextPhoto: string;
  viewPhoto: (i: number) => string;

  lightboxAria: string;
  closeLightbox: string;
  photoAltIndexed: (i: number, total: number) => string;

  envelopeInviteLine: string;
  tapToOpen: string;

  turnOffMusic: string;
  turnOnMusic: string;

  shareAria: string;
  copied: string;
  shareLabel: string;

  countdownLabel: string;
  days: string;
  hours: string;
  mins: string;
  secs: string;

  linkBrideInvite: string;
  linkGroomInvite: string;
}

const UI_TEXT: Record<Locale, UiText> = {
  vi: {
    qrMissing: "Chưa có ảnh QR",
    qrAlt: "QR chuyển khoản mừng cưới",
    ceremonyAt: "Lễ thành hôn được tổ chức tại",
    receptionAt: "Tiệc mừng được tổ chức tại",
    at: "Vào lúc",
    addToCalendar: "+ Thêm vào lịch",
    otherCalendar: "Lịch khác (Outlook, Apple...)",
    honoredToWelcome: "Rất hân hạnh được đón tiếp!",
    icsFilename: "loi-moi-cuoi.ics",
    father: "Bố",
    mother: "Mẹ",
    giftBoxTitle: "Hộp mừng cưới",
    giftBoxDesc: "Nếu không thể tới chung vui, Quý khách có thể gửi lời chúc qua đây",
    thankYouTitle: "Thank You!",
    defaultEyebrow: "Thân mời",
    defaultGreetingLine: "tới chung vui cùng lễ cưới của chúng tôi",
    shareTitlePrefix: "Thiệp cưới",
    defaultShareText: "Trân trọng kính mời bạn tới chung vui cùng chúng tôi!",

    rsvpTitle: "Xác nhận tham dự",
    rsvpSubtitle: "Sự hiện diện của Quý khách là niềm vinh hạnh cho gia đình chúng tôi",
    namePlaceholder: "Tên của Quý khách",
    ariaAttendYes: "Xác nhận sẽ tham dự",
    attendYes: "Có, tôi sẽ đến",
    ariaAttendNo: "Xin phép vắng mặt",
    attendNo: "Xin phép vắng mặt",
    companionsLabel: "Tệp đính kèm",
    ariaDecreaseCompanions: "Giảm số người đi cùng",
    ariaIncreaseCompanions: "Tăng số người đi cùng",
    wishLabel: "Lời chúc gửi tới cô dâu chú rể",
    ariaSubmit: "Gửi xác nhận tham dự",
    submitLabel: "Gửi xác nhận",
    thanksTitle: "Cảm ơn Quý khách!",
    thanksDesc: "Gia đình chúng tôi đã nhận được xác nhận của Quý khách.",
    ariaEdit: "Sửa lại xác nhận tham dự",
    editLabel: "Chỉnh sửa lại xác nhận",
    defaultGuestName: "Quý khách",

    wishesBookTitle: "Sổ lưu bút",
    wishesEmpty: "Lời chúc của Quý khách sẽ được lưu lại tại đây.",
    viewWish: (i: number) => `Xem lời chúc ${i}`,

    loveStoryEyebrow: "Câu chuyện của chúng tôi",
    loveStoryTitle: "Hành trình yêu thương",

    albumEyebrow: "Album cưới",
    albumTitle: "Khoảnh khắc của chúng tôi",
    photoAlt: "Ảnh cưới",
    prevPhoto: "Ảnh trước",
    nextPhoto: "Ảnh tiếp theo",
    viewPhoto: (i: number) => `Xem ảnh ${i}`,

    lightboxAria: "Xem ảnh cưới toàn màn hình",
    closeLightbox: "Đóng xem ảnh",
    photoAltIndexed: (i: number, total: number) => `Ảnh cưới ${i} / ${total}`,

    envelopeInviteLine: "Trân trọng kính mời",
    tapToOpen: "Chạm để mở thiệp",

    turnOffMusic: "Tắt nhạc",
    turnOnMusic: "Bật nhạc",

    shareAria: "Chia sẻ thiệp cưới",
    copied: "Đã sao chép!",
    shareLabel: "Chia sẻ thiệp cưới",

    countdownLabel: "Còn lại",
    days: "Ngày",
    hours: "Giờ",
    mins: "Phút",
    secs: "Giây",

    linkBrideInvite: "Thiệp nhà gái",
    linkGroomInvite: "Thiệp nhà trai",
  },
  en: {
    qrMissing: "QR code not available",
    qrAlt: "Wedding gift transfer QR code",
    ceremonyAt: "The wedding ceremony will be held at",
    receptionAt: "The reception will be held at",
    at: "At",
    addToCalendar: "+ Add to calendar",
    otherCalendar: "Other calendars (Outlook, Apple...)",
    honoredToWelcome: "We would be honored to welcome you!",
    icsFilename: "wedding-invite.ics",
    father: "Father",
    mother: "Mother",
    giftBoxTitle: "Wedding gift box",
    giftBoxDesc: "If you're unable to join us, you may send your wishes here",
    thankYouTitle: "Thank You!",
    defaultEyebrow: "Warmly invited",
    defaultGreetingLine: "to celebrate our wedding with us",
    shareTitlePrefix: "Wedding invitation of",
    defaultShareText: "We warmly invite you to celebrate with us!",

    rsvpTitle: "RSVP",
    rsvpSubtitle: "Your presence would be an honor for our family",
    namePlaceholder: "Your name",
    ariaAttendYes: "Confirm attendance",
    attendYes: "Yes, I'll be there",
    ariaAttendNo: "Decline attendance",
    attendNo: "Sorry, can't make it",
    companionsLabel: "Companions",
    ariaDecreaseCompanions: "Decrease number of companions",
    ariaIncreaseCompanions: "Increase number of companions",
    wishLabel: "Send a wish to the couple",
    ariaSubmit: "Submit RSVP",
    submitLabel: "Submit RSVP",
    thanksTitle: "Thank you!",
    thanksDesc: "Your RSVP has been received.",
    ariaEdit: "Edit RSVP",
    editLabel: "Edit RSVP",
    defaultGuestName: "Guest",

    wishesBookTitle: "Guest Wishes",
    wishesEmpty: "Your wishes will be displayed here.",
    viewWish: (i: number) => `View wish ${i}`,

    loveStoryEyebrow: "Our Story",
    loveStoryTitle: "A Journey of Love",

    albumEyebrow: "Wedding Album",
    albumTitle: "Our Moments",
    photoAlt: "Wedding photo",
    prevPhoto: "Previous photo",
    nextPhoto: "Next photo",
    viewPhoto: (i: number) => `View photo ${i}`,

    lightboxAria: "Wedding photo gallery",
    closeLightbox: "Close gallery",
    photoAltIndexed: (i: number, total: number) => `Wedding photo ${i} / ${total}`,

    envelopeInviteLine: "You are cordially invited",
    tapToOpen: "Tap to open invitation",

    turnOffMusic: "Turn off music",
    turnOnMusic: "Turn on music",

    shareAria: "Share this invitation",
    copied: "Link copied!",
    shareLabel: "Share invitation",

    countdownLabel: "Time remaining",
    days: "Days",
    hours: "Hours",
    mins: "Mins",
    secs: "Secs",

    linkBrideInvite: "Bride's Invitation",
    linkGroomInvite: "Groom's Invitation",
  },
};

export function getUiText(locale: Locale): UiText {
  return UI_TEXT[locale];
}
