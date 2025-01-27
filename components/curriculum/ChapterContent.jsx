"use client";

import { useEffect } from "react";

import { useCurriculum } from "./stores/useCurriculum";

import Content from "@/components/curriculum/Content";
import Test from "@/components/curriculum/Test";

export default function ChapterContent({ chapter }) {
  const { phase, changePhase } = useCurriculum((state) => ({
    phase: state.phase,
    changePhase: state.changePhase,
  }));

  useEffect(() => {
    changePhase("Pretest");
  }, []);

  const chapterPhasesMap = {};
  chapter.phases.forEach((chapterPhase, index) => {
    if (chapterPhase.name === "Pretest" || chapterPhase.name === "Posttest") {
      chapterPhasesMap[chapterPhase.name] = <Test chapter={chapter} />;
    } else {
      chapterPhasesMap[chapterPhase.name] = (
        <Content chapter={chapter} chapterPhase={chapterPhase} />
      );
    }
  });

  return chapterPhasesMap[phase];
}
