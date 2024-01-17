import { Outlet, useLocation, useParams } from "react-router-dom";
import Chat from "../pages/Chat";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import TopicBar from "./TopicBar";
import { useAuth } from "../contexts/userAuth";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOpenChatId, setOpenChatId } from "../store/slices/chat";

function Root() {
  const { user, login, checkAuth } = useAuth();
  const location = useLocation();
  const { chatId } = useParams();
  const openChatId = useSelector(selectOpenChatId);
  const dispatch = useDispatch();

  const isAtRootPath = location.pathname === "/";

  const [email, setEmail] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    await login(email);
  }

  useEffect(() => {
    async function checkAuthHelper() {
      await checkAuth();
    }
    checkAuthHelper();

    if (chatId && !openChatId) {
      dispatch(setOpenChatId(chatId));
    }
  }, [checkAuth]);

  return (
    <div>
      {user._id === "" && (
        <Modal>
          <form
            onSubmit={handleLogin}
            className="flex flex-col bg-primary p-4 text-white rounded-xl border-2 border-borderColor gap-4"
          >
            <span className="text-xl font-semibold">Login with Email</span>
            <div className="flex flex-col text-lg">
              <input
                placeholder="Enter Email ID"
                className="p-2 focus:outline-none rounded-md text-black w-72"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className=" bg-slate-700 rounded-full  p-1">
              Login
            </button>
          </form>
        </Modal>
      )}
      <Sidebar />
      <TopBar />
      <TopicBar />
      {isAtRootPath ? <Chat /> : <Outlet />}
    </div>
  );
}

export default Root;
