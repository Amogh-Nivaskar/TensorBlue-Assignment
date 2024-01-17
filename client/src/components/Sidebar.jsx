import {
  Bookmark,
  Image,
  LayoutGrid,
  LogOut,
  MessageSquare,
  Music,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="bg-secondary fixed top-0 bottom-0 left-0 w-20 flex flex-col items-center gap-20 ">
      <div className="flex flex-col p-3 gap-1">
        <div className="w-10 h-10 rounded-full bg-slate-100"></div>
        <div className="text-slate-100 text-sm font-semibold">LOGO.</div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="text-white hover:text-green-500 cursor-pointer transition-all ease-in-out duration-200">
          <LayoutGrid size={20} />
        </div>
        <div className="text-green-500 hover:text-green-500 cursor-pointer transition-all ease-in-out duration-200">
          <MessageSquare size={20} />
        </div>
        <div className="text-white hover:text-green-500 cursor-pointer transition-all ease-in-out duration-200">
          <Bookmark size={20} />
        </div>
        <div className="text-white hover:text-green-500 cursor-pointer transition-all ease-in-out duration-200">
          <Music size={20} />
        </div>
        <div className="text-white hover:text-green-500 cursor-pointer transition-all ease-in-out duration-200">
          <Image size={20} />
        </div>
        <div className="text-white hover:text-rose-500 cursor-pointer transition-all ease-in-out duration-200">
          <LogOut size={20} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
