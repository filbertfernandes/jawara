import { useState, useEffect } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(totalPages);

  // Update halaman yang ditampilkan berdasarkan halaman aktif
  useEffect(() => {
    const maxRange = 1; // Menampilkan 1 halaman sebelumnya dan 1 halaman setelah halaman aktif
    const range = [];

    if (totalPages <= 5) {
      // Jika jumlah halaman total kurang dari atau sama dengan 5, tampilkan semua halaman
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      setRangeStart(1);
      setRangeEnd(totalPages);
    } else {
      if (currentPage === 1) {
        // Menampilkan halaman pertama dan seluruh halaman
        setRangeStart(1);
        setRangeEnd(3); // Tampilkan halaman pertama dan 2 setelahnya
      } else if (currentPage === totalPages) {
        setRangeStart(totalPages - 2);
        setRangeEnd(totalPages);
      } else {
        // Menampilkan halaman sekitar halaman aktif (1 halaman sebelumnya dan 1 halaman setelahnya)
        setRangeStart(currentPage - maxRange); // 1 halaman sebelumnya
        setRangeEnd(currentPage + maxRange); // 1 halaman setelahnya
      }
    }
  }, [currentPage, totalPages]); // Update ketika currentPage atau totalPages berubah

  // Fungsi untuk menuju halaman sebelumnya
  const goToPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Fungsi untuk menuju halaman berikutnya
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex max-w-full items-center justify-center gap-1">
      {/* Tombol Prev */}
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        className={`text-[0.3rem] text-center px-[0.1rem] font-semibold bg-gray-200 text-gray-600 hover:bg-gray-300
          ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
      >
        {"<"}
      </button>

      {/* Tombol Halaman Pertama */}
      {rangeStart > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="bg-gray-200 px-[0.1rem] text-center text-[0.3rem] font-semibold text-gray-600 hover:bg-gray-300"
          >
            1
          </button>
          <span className="px-[0.1rem] text-center text-[0.3rem] text-gray-600">
            ...
          </span>{" "}
          {/* Ellipsis setelah halaman pertama */}
        </>
      )}

      {/* Tombol Halaman */}
      {Array.from({ length: rangeEnd - rangeStart + 1 }, (_, index) => (
        <button
          key={rangeStart + index}
          onClick={() => onPageChange(rangeStart + index)}
          className={`text-[0.3rem] text-center px-[0.1rem] font-semibold
            ${
              currentPage === rangeStart + index
                ? "bg-gray-900 text-gray-100"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
        >
          {rangeStart + index}
        </button>
      ))}

      {/* Tombol Halaman Terakhir */}
      {rangeEnd < totalPages && (
        <>
          <span className="px-[0.1rem] text-center text-[0.3rem] text-gray-600">
            ...
          </span>{" "}
          {/* Ellipsis sebelum halaman terakhir */}
          <button
            onClick={() => onPageChange(totalPages)}
            className="bg-gray-200 px-[0.1rem] text-center text-[0.3rem] font-semibold text-gray-600 hover:bg-gray-300"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Tombol Next */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`text-[0.3rem] text-center px-[0.1rem] font-semibold bg-gray-200 text-gray-600 hover:bg-gray-300
          ${
            currentPage === totalPages
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
