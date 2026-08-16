import Invitation from "@/components/Invitation";

export default async function NhaGaiPage({
  searchParams,
}: {
  searchParams: Promise<{ guestName?: string }>;
}) {
  const { guestName } = await searchParams;
  return <Invitation side="gai" guestName={guestName} />;
}
