import React from "react";

const TotalCorrectTranslation = ({ total }) => {
  return (
    <div className="flex w-full flex-col items-center gap-1 rounded-xl border-2 bg-white/10 px-2 py-4">
      <h1 className="h1-bold">{total}</h1>
      <div className="flex items-center justify-center">
        <h6 className="h6-bold">Total Correct Translations</h6>
      </div>
    </div>
  );
};

export default TotalCorrectTranslation;
