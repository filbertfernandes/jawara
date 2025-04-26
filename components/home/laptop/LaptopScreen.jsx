import multiavatar from "@multiavatar/multiavatar/esm"; // Import untuk menghasilkan avatar pengguna secara dinamis
import { Html } from "@react-three/drei"; // Untuk merender elemen HTML dalam konteks Three.js
import Link from "next/link"; // Untuk navigasi antar halaman dengan Next.js
import { useEffect, useState } from "react"; // Import hooks untuk manajemen state dan efek samping
import { useTranslations } from "next-intl"; // Untuk translate yah

import SearchBar from "./screen-interfaces/SearchBar"; // Komponen pencarian
import Taskbar from "./screen-interfaces/Taskbar"; // Komponen taskbar
import Pagination from "./screen-interfaces/Pagination"; // Komponen pagination untuk halaman

import { useLaptop } from "./stores/useLaptop"; // Hook untuk state terkait laptop

import routes from "@/constants/routes"; // Rute navigasi aplikasi
import { getUsers } from "@/lib/actions/user.action"; // Fungsi untuk mengambil data pengguna dari API

const LaptopScreen = () => {

  // Ambil nya dari Home
  const t = useTranslations("Home");

  // State untuk menampung data pengguna yang ditemukan
  const [users, setUsers] = useState([]);
  
  // State untuk menyimpan total halaman pagination
  const [totalPages, setTotalPages] = useState(0);
  
  // State untuk menyimpan halaman yang sedang aktif, yg active pertama kali akan hlmn pertama
  const [currentPage, setCurrentPage] = useState(1);
  
  // State untuk menandakan apakah pencarian sedang berlangsung
  const [searching, setSearching] = useState(false);
  
  // State untuk menampilkan pesan "Data not found" jika tidak ada hasil
  const [showNoResults, setShowNoResults] = useState(false);

  // Mengambil state dari store useLaptop, seperti rotasi layar dan pencarian
  const { screenRotation, search, setSearch } = useLaptop((state) => ({
    screenRotation: state.screenRotation,
    search: state.search,
    setSearch: state.setSearch
  }));

  // Mengatur ulang pencarian ketika komponen dimuat
  useEffect(() => {
    setSearch(""); // Menghapus teks pencarian saat memasuki layar laptop
  }, [setSearch]);

  // Fungsi untuk mengambil data pengguna berdasarkan pencarian
  const fetchData = async () => {
    // Jika tidak ada kata kunci pencarian, reset data pengguna dan total halaman
    if (search === "") {
      setUsers([]);
      setTotalPages(0);
      setShowNoResults(false); // Reset status "Data tidak ditemukan"
      return;
    }

    setSearching(true); // Tandakan bahwa pencarian sedang berlangsung

    try {
      // Panggil API untuk mengambil data pengguna berdasarkan pencarian
      const result = await getUsers({ search, page: currentPage, pageSize: 4 });
      setUsers(result.users); // Set hasil pengguna yang ditemukan
      setTotalPages(result.totalPages); // Set jumlah total halaman

      // Jika tidak ada pengguna yang ditemukan, set status "data tidak ditemukan"
      setShowNoResults(result.users.length === 0);
    } catch (error) {
      console.error("Error fetching users:", error); // Tangani error saat mengambil data
    } finally {
      setSearching(false); // Reset status pencarian setelah selesai mengambil data
    }
  };

  // Efek untuk menunda pencarian menggunakan debounce selama 300ms
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(); // Panggil fetchData setelah delay 300ms
    }, 300);

    return () => clearTimeout(delayDebounceFn); // Bersihkan timeout jika efek dibersihkan
  }, [search, currentPage]); // Jalankan efek setiap kali `search` atau `currentPage` berubah

  // Fungsi untuk menangani perubahan halaman saat pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Update halaman yang aktif
  };

  return (
    <group position={[-2.842, 0.4, 1.659]} rotation={[screenRotation, 0, 0]}>
      <Html
        transform
        distanceFactor={1.17}
        position={[0, 0, -0.133]}
        rotation-x={-Math.PI / 2}
      >
        <div className="flex h-[4.75rem] w-28 flex-col justify-between border-none bg-white font-questrial text-gray-900">
          
          {/* 1. Search Bar */}
          <div className="flex h-auto w-full flex-col">
            <SearchBar text={t("search_users")} /> {/* Menampilkan komponen pencarian */}
            
            {/* 2. Hasil Pencarian */}
            <div className="mt-1 flex h-auto w-full flex-wrap justify-center gap-1 px-1 text-[0.15rem]">
              {searching ? (
                // Tampilkan pesan "Searching..." selama proses pencarian
                <div className="flex items-center justify-center text-center text-[0.5rem] text-gray-500">{t("searching")}</div>
              ) : (
                showNoResults && search !== "" ? (
                  // Tampilkan pesan "Data not found" jika tidak ada hasil pencarian
                  <div className="flex items-center justify-center text-center text-[0.5rem] text-gray-500">{t("results")}</div>
                ) : (
                  // Jika ada hasil pencarian, tampilkan data pengguna
                  users.length > 0 &&
                  users.map((user) => (
                    <Link
                      key={user._id}
                      href={`${routes.PROFILE}/${user._id}`} // Link ke halaman profil pengguna
                      className="flex h-auto max-w-full w-[45%] cursor-pointer items-center gap-[0.1rem] bg-gray-100 p-[0.1rem] transition-all duration-300 ease-in-out hover:bg-gray-300"
                    >
                      <div
                        className="size-2"
                        dangerouslySetInnerHTML={{
                          __html: multiavatar(user._id + user.profileAvatarIndex), // Menampilkan avatar pengguna
                        }}
                      />
                      <div className="flex h-full flex-col justify-center">
                        <h1 className="font-bold text-gray-900">{user.name}</h1> {/* Menampilkan nama pengguna */}
                        <h1 className="text-gray-900">@{user.username}</h1> {/* Menampilkan username pengguna */}
                      </div>
                    </Link>
                  ))
                )
              )}
            </div>
          </div>

          {/* 3. Pagination */}
          {users.length > 0 && (
            // Menampilkan komponen pagination jika ada pengguna yang ditemukan
            <div className="mb-0.5 w-full px-2 mt-auto">
              <Pagination
                currentPage={currentPage} // Menampilkan halaman aktif
                totalPages={totalPages} // Menampilkan jumlah total halaman
                onPageChange={handlePageChange} // Fungsi untuk menangani perubahan halaman
              />
            </div>
          )}

          {/* 4. Taskbar */}
          <div className="flex flex-col gap-1">
            <Taskbar /> {/* Menampilkan komponen taskbar */}
          </div>
          
        </div>
      </Html>
    </group>
  );
};

export default LaptopScreen;