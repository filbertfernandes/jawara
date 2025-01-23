import { auth } from "@/auth";
import Home from "@/components/home/Home.jsx";
import { api } from "@/lib/api";

export default async function App() {
  const session = await auth();
  const userSession = await api.users.getById(session.user.id);

  return <Home userSession={userSession.data} />;
}
