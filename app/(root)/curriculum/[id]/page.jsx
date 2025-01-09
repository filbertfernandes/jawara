import ChapterContent from "@/components/curriculum/ChapterContent";
import chapters from "@/components/curriculum/data/chapters";
import MobileNavigation from "@/components/curriculum/navigation/navbar/MobileNavigation";
import Sidebar from "@/components/curriculum/navigation/Sidebar";

export default async function Page({ params }) {
  const { id } = await params;
  const chapter = chapters[id - 1];

  return (
    <div className="flex size-full min-h-screen overflow-scroll bg-white font-questrial">
      <MobileNavigation chapter={chapter} />
      <Sidebar chapter={chapter} />

      <ChapterContent chapter={chapter} />
    </div>
  );
}
