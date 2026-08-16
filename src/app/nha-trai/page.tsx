import Invitation from "@/components/Invitation";

export default async function NhaTraiPage({
  searchParams,
}: {
  searchParams: Promise<{ guestName?: string }>;
}) {
  const { guestName } = await searchParams;
  return <Invitation side="trai" guestName={guestName} />;
}
