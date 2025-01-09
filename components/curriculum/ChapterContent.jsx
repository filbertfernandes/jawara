"use client";

import { useCurriculum } from "./stores/useCurriculum";

import Content from "@/components/curriculum/Content";
import Test from "@/components/curriculum/Test";

export default function ChapterContent({ chapter }) {
  const { phase } = useCurriculum((state) => ({
    phase: state.phase,
  }));

  const chapterPhasesMap = {};
  chapter.phases.forEach((chapterPhase, index) => {
    if (chapterPhase.name === "Pretest" || chapterPhase.name === "Posttest") {
      chapterPhasesMap[chapterPhase.name] = (
        <Test questions={chapter.questions} />
      );
    } else {
      chapterPhasesMap[chapterPhase.name] = (
        <Content name={chapterPhase.name} pdfPath={chapterPhase.pdfPath} />
      );
    }
  });

  return chapterPhasesMap[phase];
}
