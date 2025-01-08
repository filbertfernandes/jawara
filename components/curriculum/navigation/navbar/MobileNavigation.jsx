import Link from "next/link";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";

import ProgressBar from "../ProgressBar";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const MobileNavigation = ({ chapter }) => {
  console.log(chapter);
  return (
    <div className="left-0 top-0 size-full bg-white p-4 font-questrial sm:p-14">
      <Sheet>
        <SheetTrigger>
          <RxHamburgerMenu className="text-3xl text-black" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <Link href="/curriculum" className="absolute left-3 top-3">
              <RiArrowLeftSLine className="text-4xl text-black" />
            </Link>
            <SheetTitle className="mb-6 flex flex-col flex-wrap items-center justify-center">
              <div className="text-sm font-bold text-orange-500">
                Chapter {chapter.order}
              </div>
              <div className="h3-bold">{chapter.title}</div>
            </SheetTitle>
            <div>
              <ProgressBar title="Pre-Test" first completed />
              <ProgressBar title="Material" active />
              <ProgressBar title="Post-Test" />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
