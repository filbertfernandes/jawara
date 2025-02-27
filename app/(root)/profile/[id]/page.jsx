import Profile from "@/components/profile/Profile";
import { api } from "@/lib/api";

export default async function Page({ params }) {
  const { id } = await params;
  const profileUser = await api.users.getById(id);

  return <Profile profileUser={profileUser.data} />;
}
