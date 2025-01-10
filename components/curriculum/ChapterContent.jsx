"use client";

import { useEffect } from "react";

import { useCurriculum } from "./stores/useCurriculum";

import Content from "@/components/curriculum/Content";
import Test from "@/components/curriculum/Test";

export default function ChapterContent({ chapter, userProgress }) {
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
      chapterPhasesMap[chapterPhase.name] = (
        <Test chapter={chapter} userProgress={userProgress} />
      );
    } else {
      chapterPhasesMap[chapterPhase.name] = (
        <Content name={chapterPhase.name} pdfPath={chapterPhase.pdfPath} />
      );
    }
  });

  return chapterPhasesMap[phase];
}
