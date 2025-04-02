import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { IoMdDownload } from "react-icons/io";
import { pdfjs, Document, Page } from "react-pdf";

import "./stores/curriculum.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function PdfComponent({ isFinished, chapterPhase, onFinish }) {
  const t = useTranslations("Curriculum");

  const [numPages, setNumPages] = useState();
  const [parentWidth, setParentWidth] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    // Update parent width on load and when the window resizes
    const updateParentWidth = () => {
      if (containerRef.current) {
        setParentWidth(containerRef.current.offsetWidth);
      }
    };

    updateParentWidth();
    window.addEventListener("resize", updateParentWidth);

    return () => {
      window.removeEventListener("resize", updateParentWidth);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      ref={containerRef}
      className="flex size-full flex-col items-center gap-4 overflow-y-auto py-16"
    >
      <div className="flex w-[95%] justify-end">
        <a
          href={`${process.env.NEXT_PUBLIC_JAWARA_BASE_URL}/pdf/${chapterPhase.pdfFile}`}
          download="chapter-1.pdf"
          className="btn-template bg-orange-500 px-4 text-sm text-gray-100 hover:bg-orange-600"
        >
          <IoMdDownload className="mr-1" />
          {t("download")}
        </a>
      </div>
      <Document
        file={`${process.env.NEXT_PUBLIC_JAWARA_BASE_URL}/pdf/${chapterPhase.pdfFile}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => (
            <Page
              key={`page_${page}`}
              pageNumber={page}
              width={parentWidth * 0.95} // Set width to 95% of parent container
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
      </Document>

      {!isFinished && (
        <div className="flex w-full justify-center">
          <div
            className="btn-template w-1/4 border-2 border-orange-500 bg-white text-orange-500 hover:bg-orange-500 hover:text-gray-100"
            onClick={onFinish}
          >
            {t("finish")}
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfComponent;
