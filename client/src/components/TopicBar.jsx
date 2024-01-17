import { Delete, MessageSquare, PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearConversation,
  deleteChats,
  getAllChatNames,
  selectChatsList,
  selectOpenChatId,
  setOpenChatId,
} from "../store/slices/chat";

function TopicBar() {
  const dispatch = useDispatch();
  const openChatId = useSelector(selectOpenChatId);
  const navigate = useNavigate();

  const chatNames = useSelector(selectChatsList);

  useEffect(() => {
    dispatch(getAllChatNames());
  }, [dispatch]);

  async function handleDeleteChats() {
    dispatch(deleteChats());
    dispatch(setOpenChatId(""));
  }

  return (
    <div className="fixed left-20 top-16 bottom-0 w-80 bg-primary flex flex-col justify-between py-6 px-6 border-r-2 border-borderColor">
      <div>
        <div className="text-white font-semibold text-xl mb-4">
          Text Generator
        </div>
        <div className="flex flex-col gap-2 ">
          {chatNames.map((chat) => (
            <Link
              onClick={() => dispatch(setOpenChatId(chat._id))}
              key={chat._id}
              to={`/${chat._id}`}
              className={`flex text-slate-500 items-center gap-1 text-sm text-nowrap overflow-ellipsis p-3 bg-secondary rounded-full border-2 ${
                openChatId === chat._id
                  ? "border-green-600"
                  : "border-secondary"
              }`}
            >
              <MessageSquare color="white" size={20} />
              {chat.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 ">
        <Link
          to={"/"}
          onClick={() => {
            dispatch(setOpenChatId(""));
            dispatch(clearConversation());
          }}
          className="flex border-2 border-green-500 rounded-full p-2 text-green-500 text-sm gap-2 items-center"
        >
          <PlusCircle size={20} />
          New Chat
        </Link>
        <Link
          to={"/"}
          onClick={handleDeleteChats}
          className="flex border-2 border-rose-500 rounded-full p-2 text-rose-500 text-sm gap-2 items-center"
        >
          <Delete size={20} />
          Clear Conversation
        </Link>
      </div>
    </div>
  );
}

export default TopicBar;
