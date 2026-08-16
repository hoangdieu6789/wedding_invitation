import Invitation from "@/components/Invitation";

export default async function NhaTraiPage({
  searchParams,
}: {
  searchParams: Promise<{ ten?: string }>;
}) {
  const { ten } = await searchParams;
  return <Invitation side="trai" guestName={ten} />;
}
