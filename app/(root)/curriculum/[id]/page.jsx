import chapters from "@/components/curriculum/data/chapters";
import MobileNavigation from "@/components/curriculum/navigation/navbar/MobileNavigation";

export default async function Page({ params }) {
  const { id } = await params;
  const chapter = chapters[id - 1];

  return <MobileNavigation chapter={chapter} />;
}
