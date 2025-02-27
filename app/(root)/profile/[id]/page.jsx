import Profile from "@/components/profile/Profile";

export default async function Page({ params }) {
  const { id } = await params;

  return <Profile userId={id} />;
}
