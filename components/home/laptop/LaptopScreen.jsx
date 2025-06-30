import multiavatar from "@multiavatar/multiavatar/esm";
import { Html } from "@react-three/drei";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import Pagination from "./screen-interfaces/Pagination";
import SearchBar from "./screen-interfaces/SearchBar";
import Taskbar from "./screen-interfaces/Taskbar";
import { useLaptop } from "./stores/useLaptop";

import routes from "@/constants/routes";
import { getUsers } from "@/lib/actions/user.action";

const LaptopScreen = () => {
  const t = useTranslations("Home");

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searching, setSearching] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);

  const { screenRotation, search, setSearch } = useLaptop((state) => ({
    screenRotation: state.screenRotation,
    search: state.search,
    setSearch: state.setSearch,
  }));

  useEffect(() => {
    setSearch("");
  }, [setSearch]);

  const fetchData = async () => {
    if (search === "") {
      setUsers([]);
      setTotalPages(0);
      setShowNoResults(false);
      return;
    }

    setSearching(true);

    try {
      const result = await getUsers({ search, page: currentPage, pageSize: 4 });
      setUsers(result.users);
      setTotalPages(result.totalPages);

      setShowNoResults(result.users.length === 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
          <div className="flex h-auto w-full flex-col">
            <SearchBar text={t("search_users")} />
            <div className="mt-1 flex h-auto w-full flex-wrap justify-center gap-1 px-1 text-[0.15rem]">
              {searching ? (
                <div className="flex items-center justify-center text-center text-[0.5rem] text-gray-500">
                  {t("searching")}
                </div>
              ) : showNoResults && search !== "" ? (
                <div className="flex items-center justify-center text-center text-[0.5rem] text-gray-500">
                  {t("user_not_found")}
                </div>
              ) : (
                users.length > 0 &&
                users.map((user) => (
                  <Link
                    key={user._id}
                    href={`${routes.PROFILE}/${user._id}`}
                    className="flex h-auto w-[45%] max-w-full cursor-pointer items-center gap-[0.1rem] bg-gray-100 p-[0.1rem] transition-all duration-300 ease-in-out hover:bg-gray-300"
                  >
                    <div
                      className="size-2"
                      dangerouslySetInnerHTML={{
                        __html: multiavatar(user._id + user.profileAvatarIndex),
                      }}
                    />
                    <div className="flex h-full flex-col justify-center">
                      <h1 className="font-bold text-gray-900">{user.name}</h1>
                      <h1 className="text-gray-900">@{user.username}</h1>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {users.length > 0 && (
            <div className="mb-0.5 mt-auto w-full px-2">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <Taskbar />
          </div>
        </div>
      </Html>
    </group>
  );
};

export default LaptopScreen;
