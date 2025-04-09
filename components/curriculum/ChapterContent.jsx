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
    return () => {
      changePhase("Pretest");
    };
  }, []);

  const chapterPhasesMap = {};
  chapter.phases.forEach((chapterPhase) => {
    if (
      chapterPhase.name_english === "Pretest" ||
      chapterPhase.name_english === "Posttest"
    ) {
      chapterPhasesMap[chapterPhase.name_english] = (
        <Test
          chapter={chapter}
          isPostTest={chapterPhase.name_english === "Posttest"}
        />
      );
    } else {
      chapterPhasesMap[chapterPhase.name_english] = (
        <Content chapter={chapter} chapterPhase={chapterPhase} />
      );
    }
  });

  return chapterPhasesMap[phase];
}
