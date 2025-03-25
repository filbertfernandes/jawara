import multiavatar from "@multiavatar/multiavatar/esm";
import { Html } from "@react-three/drei";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import SearchBar from "./screen-interfaces/SearchBar";
import Taskbar from "./screen-interfaces/Taskbar";
import { useLaptop } from "./stores/useLaptop";

import routes from "@/constants/routes";
import { getUsers } from "@/lib/actions/user.action";

const LaptopScreen = () => {
  const t = useTranslations("Home");

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { screenRotation, search } = useLaptop((state) => ({
    screenRotation: state.screenRotation,
    search: state.search,
  }));

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search === "") {
        setUsers([]);
        setTotalPages(0);
        return;
      }

      const result = await getUsers({ search, page, pageSize: 4 });

      setUsers(result.users);
      setTotalPages(result.totalPages);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, page]);

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
            <div className="mt-1 flex h-auto w-full flex-wrap justify-center gap-1 px-1 text-[0.18rem]">
              {users.length > 0
                ? users.map((user) => (
                    <Link
                      key={user._id}
                      href={`${routes.PROFILE}/${user._id}`}
                      className="flex h-4 w-[45%] cursor-pointer items-center gap-[0.1rem] bg-gray-100 p-[0.1rem] transition-all duration-200 ease-in-out hover:bg-gray-200"
                    >
                      <div
                        className="size-2"
                        dangerouslySetInnerHTML={{
                          __html: multiavatar(user?._id),
                        }}
                      />
                      <div className="flex h-full flex-col justify-center">
                        <h1 className="font-bold text-gray-900">{user.name}</h1>
                        <h1 className="text-gray-900">@{user.username}</h1>
                      </div>
                    </Link>
                  ))
                : null}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex h-auto w-full justify-center text-center text-[0.2rem] font-bold text-white">
              {Array.from({ length: totalPages }, (_, index) => (
                <div
                  key={index}
                  className={`size-1 cursor-pointer transition-all duration-200 ease-in-out ${
                    index + 1 === page
                      ? "bg-gray-900"
                      : "bg-gray-900/50 hover:bg-gray-900"
                  }`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <Taskbar />
          </div>
        </div>
      </Html>
    </group>
  );
};

export default LaptopScreen;
