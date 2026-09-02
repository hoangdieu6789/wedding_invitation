import { Metadata } from "next";
import Invitation from "@/components/Invitation";
import { getSides } from "@/lib/content";
import { resolveLocale } from "@/lib/types";

type PageSearchParams = { guestName?: string; lang?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<PageSearchParams>;
}): Promise<Metadata> {
  const locale = resolveLocale((await searchParams).lang);
  const content = getSides(locale).trai;
  const title =
    locale === "en"
      ? `Groom's Wedding Invitation | ${content.heroNames.join(" & ")}`
      : `Thiệp cưới nhà trai | ${content.heroNames.join(" & ")}`;
  const description =
    locale === "en"
      ? "Digital wedding invitation — ceremony, reception, RSVP, and guest wishes."
      : "Thiệp mời cưới điện tử — thông tin lễ thành hôn, tiệc mừng, RSVP và lời chúc.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: `${content.albumImages[0]}?v=2`, width: 1067, height: 1600 }],
    },
  };
}

export default async function NhaTraiPage({
  searchParams,
}: {
  searchParams: Promise<PageSearchParams>;
}) {
  const { guestName, lang } = await searchParams;
  return <Invitation side="trai" guestName={guestName} lang={resolveLocale(lang)} />;
}
