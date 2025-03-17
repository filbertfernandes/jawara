import Image from "next/image";

const layout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-orange-100 font-questrial">
      <div className="flex h-auto w-[90%] flex-col justify-center gap-4 rounded-3xl bg-white px-4 py-8 shadow-lg md:w-3/5 md:gap-8 md:px-10 lg:w-2/5 xl:w-1/3">
        <div className="flex justify-center">
          <Image
            src="/images/jawara/jawara-icon.png"
            alt="Jawara Logo"
            width={300}
            height={300}
            className="size-10 md:size-12"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
