import { auth } from "@/auth";
import Home from "@/components/home/Home.jsx";
import { api } from "@/lib/api";

export default async function App() {
  const session = await auth();
  const userSession = session
    ? (await api.users.getById(session.user.id)).data
    : null;

  return <Home userSession={userSession} />;
}
