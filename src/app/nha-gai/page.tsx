import Invitation from "@/components/Invitation";

export default async function NhaGaiPage({
  searchParams,
}: {
  searchParams: Promise<{ ten?: string }>;
}) {
  const { ten } = await searchParams;
  return <Invitation side="gai" guestName={ten} />;
}
