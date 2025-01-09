import React from "react";

const Content = ({ name, pdfPath }) => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-6 px-4 text-black">
      <>
        <div className="text-center">
          <div className="h5-bold mb-1">
            Let&apos;s make learning fun and easy!
          </div>
          <div className="text-sm text-gray-500 lg:text-xl">
            Explore the core concepts of this chapter through easy-to-follow
            slides.
          </div>
        </div>
        <div
          className="btn-template w-36 cursor-pointer bg-orange-500 text-white hover:bg-orange-600 lg:w-48 lg:text-2xl"
          onClick={() => setIsStarted(true)}
        >
          Start Learning
        </div>
      </>
    </div>
  );
};

export default Content;
