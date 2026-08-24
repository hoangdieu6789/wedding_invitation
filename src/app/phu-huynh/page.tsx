import { Metadata } from "next";
import Invitation from "@/components/Invitation";
import { SIDES } from "@/lib/content";

const title = `Thiệp mời phụ huynh | ${SIDES.huynh.heroNames.join(" & ")}`;
const description = "Thiệp mời cưới điện tử dành cho phụ huynh — thông tin lễ thành hôn, tiệc mừng, RSVP và lời chúc.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: `${SIDES.huynh.albumImages[0]}?v=2`, width: 1067, height: 1600 }],
  },
};

export default async function PhuHuynhPage({
  searchParams,
}: {
  searchParams: Promise<{ guestName?: string }>;
}) {
  const { guestName } = await searchParams;
  return <Invitation side="huynh" guestName={guestName} />;
}
