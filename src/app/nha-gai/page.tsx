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
  const content = getSides(locale).gai;
  const title =
    locale === "en"
      ? `Bride's Wedding Invitation | ${content.heroNames.join(" & ")}`
      : `Thiệp cưới nhà gái | ${content.heroNames.join(" & ")}`;
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

export default async function NhaGaiPage({
  searchParams,
}: {
  searchParams: Promise<PageSearchParams>;
}) {
  const { guestName, lang } = await searchParams;
  return <Invitation side="gai" guestName={guestName} lang={resolveLocale(lang)} />;
}
