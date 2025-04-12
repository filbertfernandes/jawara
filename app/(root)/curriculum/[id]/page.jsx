import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ChapterContent from "@/components/curriculum/ChapterContent";
import chapters from "@/components/curriculum/data/chapters";
import MobileNavigation from "@/components/curriculum/navigation/navbar/MobileNavigation";
import Sidebar from "@/components/curriculum/navigation/Sidebar";
import {
  createUserProgress,
  getUserProgress,
} from "@/lib/actions/userProgress.action";

export default async function Page({ params }) {
  const session = await auth();
  const { id } = await params;
  const chapter = chapters[id - 1];

  if (parseInt(id) < 1) return redirect("/curriculum");

  if (parseInt(id) > 1) {
    const previousProgress = await getUserProgress(id - 1, session.user.id);

    if (!previousProgress.success) {
      return redirect("/curriculum");
    }

    if (
      previousProgress.data.completedPhases < chapters[id - 2].phases.length
    ) {
      return redirect("/curriculum");
    }
  }

  // Create user progress if the user is logged in
  const userProgress = JSON.parse(
    JSON.stringify(await createUserProgress(id, session.user.id))
  );

  return (
    <div className="flex size-full min-h-screen overflow-scroll bg-white font-questrial">
      <MobileNavigation chapter={chapter} userProgress={userProgress.data} />
      <Sidebar chapter={chapter} userProgress={userProgress.data} />
      <ChapterContent chapter={chapter} userProgress={userProgress.data} />
    </div>
  );
}
