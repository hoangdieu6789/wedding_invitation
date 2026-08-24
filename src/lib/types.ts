export type Side = "gai" | "trai" | "huynh";

export interface Wish {
  name: string;
  text: string;
}

export interface PersonBlock {
  title: string;
  father: string;
  mother: string;
  addressLines: string[];
}

export interface VenueBlock {
  title: string;
  addressLines: string[];
  time: string;
  dateLabel: string;
  lunarLabel: string;
  mapUrl: string;
  ctaLabel: string;
  startIso: string;
}

export interface SideContent {
  key: Side;
  storagePrefix: "tng" | "tnt" | "tnh";
  monogram: string;
  heroNames: [string, string];
  dateRibbon: string;
  leThanhHon: VenueBlock;
  tiecMung: VenueBlock;
  parents: { left: PersonBlock; right: PersonBlock };
  bankOwnerName: string;
  bankName: string;
  bankAccountNumber: string;
  weddingDateIso: string;
  albumImages: string[];
  funClosingLine: string;
  /** Overrides for guest-of-parents wording; falls back to the default (peer) wording when omitted. */
  greetingEyebrow?: string;
  greetingLine?: string;
  shareText?: string;
}
