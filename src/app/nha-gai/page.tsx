import { Metadata } from "next";
import Invitation from "@/components/Invitation";
import { SIDES } from "@/lib/content";

const title = `Thiệp cưới nhà gái | ${SIDES.gai.heroNames.join(" & ")}`;
const description = "Thiệp mời cưới điện tử — thông tin lễ thành hôn, tiệc mừng, RSVP và lời chúc.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: SIDES.gai.albumImages[0], width: 1200, height: 900 }],
  },
};

export default async function NhaGaiPage({
  searchParams,
}: {
  searchParams: Promise<{ guestName?: string }>;
}) {
  const { guestName } = await searchParams;
  return <Invitation side="gai" guestName={guestName} />;
}
