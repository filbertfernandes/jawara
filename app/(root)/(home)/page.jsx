import { auth } from "@/auth";
import Home from "@/components/home/Home.jsx";

export default async function App() {
  const session = await auth();

  console.log("Session: ", session);

  return <Home />;
}
