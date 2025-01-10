import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ChapterContent from "@/components/curriculum/ChapterContent";
import chapters from "@/components/curriculum/data/chapters";
import MobileNavigation from "@/components/curriculum/navigation/navbar/MobileNavigation";
import Sidebar from "@/components/curriculum/navigation/Sidebar";
import { createUserProgress } from "@/server/actions/createUserProgressAction";

export default async function Page({ params }) {
  const sessionUser = await auth();
  const { id } = params;
  const chapter = chapters[id - 1];

  // Redirect to sign-in if user is not logged in
  if (!sessionUser?.user?.id) {
    redirect("/sign-in");
  }

  // Create user progress if the user is logged in
  await createUserProgress(id, sessionUser.user.id);

  return (
    <div className="flex size-full min-h-screen overflow-scroll bg-white font-questrial">
      <MobileNavigation chapter={chapter} userId={sessionUser.user.id} />
      <Sidebar chapter={chapter} userId={sessionUser.user.id} />
      <ChapterContent chapter={chapter} />
    </div>
  );
}
