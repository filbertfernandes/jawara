import { auth } from "@/auth";
import Customization from "@/components/avatar/Customization";

export default async function Page() {
  const session = await auth();
  return <Customization />;
}
