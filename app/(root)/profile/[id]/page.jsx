import { auth } from "@/auth";
import ProfileInterface from "@/components/home/profile/ProfileInterface";
import { api } from "@/lib/api";

export default async function Page({ params }) {
  const session = await auth();
  const { id } = await params;
  const profileUser = await api.users.getById(id);

  return <ProfileInterface profileUser={profileUser.data} session={session} />;
}
