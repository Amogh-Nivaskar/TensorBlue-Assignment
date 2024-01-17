import { BellDot, ChevronDown, Search } from "lucide-react";
import { useAuth } from "../contexts/userAuth";

function TopBar() {
  const { logout } = useAuth();
  return (
    <div className="fixed grid grid-cols-3 left-20 right-0 top-0 h-16 items-center bg-primary border-b-2 border-borderColor">
      <div className="col-span-1"></div>
      <div className="flex items-center col-span-1 bg-secondary px-2 py-1 text-white rounded-full border-2 border-borderColor">
        <input
          className="focus:outline-none px-2  bg-secondary text-slate-100 placeholder:text-borderColor w-full"
          placeholder="Search anything..."
        />
        <Search size={18} />
      </div>
      <div className="flex col-span-1 justify-end mr-4 items-center gap-8">
        <BellDot color="white" size={22} />
        <div className="flex justify-center items-center text-white">
          <img
            className="h-10 w-10 rounded-full object-cover  "
            src="/cat3.jpg"
            alt="profile pic"
          />
          <ChevronDown size={20} />
        </div>

        <button
          onClick={logout}
          className="p-2 bg-slate-500 rounded-xl text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default TopBar;
