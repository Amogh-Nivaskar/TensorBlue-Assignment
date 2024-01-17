import { Mic, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewChat,
  addUserDialog,
  getAllChatNames,
  getChatConversation,
  postNewChat,
  postUserMessage,
  selectOpenChatConversation,
  selectOpenChatId,
  selectStatus,
  setOpenChatId,
} from "../store/slices/chat";
import { useNavigate, useParams } from "react-router-dom";
import LoadingDots from "../components/LoadingDots";

function Chat() {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const chatConversation = useSelector(selectOpenChatConversation);
  const openChatId = useSelector(selectOpenChatId);
  const status = useSelector(selectStatus);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (openChatId) {
      dispatch(getChatConversation(openChatId));
      navigate(`/${openChatId}`);
    }
  }, [openChatId, navigate, dispatch]);

  async function handleSubmit(e) {
    e.preventDefault();
    const statement = message;
    setMessage("");
    if (!openChatId) {
      const newChat = await postNewChat(statement);
      dispatch(addNewChat({ title: newChat.title, _id: newChat._id }));
      const date = Date.now();
      dispatch(addUserDialog({ from: "ME", date, statement }));
      dispatch(postUserMessage({ chatId: newChat._id, statement, date }));
    } else {
      const date = Date.now();
      dispatch(addUserDialog({ from: "ME", date, statement }));
      dispatch(postUserMessage({ chatId: openChatId, statement, date }));
    }
  }

  function getDateString(timestamp) {
    const dateObj = new Date(timestamp);
    const month = dateObj.toString().split(" ")[1];
    const date = dateObj.getDate();
    const year = dateObj.getFullYear().toString().split("").slice(2).join("");
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    if (hours > 12) return `${hours - 12}:${minutes} PM, ${date} ${month}`;
    else if (hours === 12 && minutes > 0)
      return `${hours}:${minutes} PM, ${date} ${month}`;
    else return `${hours}:${minutes} AM, ${date} ${month}`;
  }

  return (
    <div className="ml-[400px] mt-16 bg-primary min-h-screen p-6 pb-32">
      <div className="flex flex-col gap-8">
        {chatConversation.map((dialog, idx) => (
          <div key={idx} className="flex flex-col items-start gap-3">
            <div
              className={`text-slate-500 text-sm ${
                dialog.from === "ME" && "self-end"
              }`}
            >
              {getDateString(dialog.date)}
            </div>
            <div
              className={`text-slate-200 p-2 bg-secondary rounded-xl max-w-2xl ${
                dialog.from === "ME" && "self-end"
              }`}
            >
              {dialog.statement}
            </div>
          </div>
        ))}
        {status === "loading" && <LoadingDots />}
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-6 right-6 left-[424px] flex text-slate-100 gap-4 border-2 bg-primary border-borderColor items-center justify-center px-4 py-2 rounded-lg"
      >
        <input
          className="w-full focus:outline-none bg-primary px-2 py-1"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Mic size={20} />
        <button type="submit" disabled={message === ""}>
          <Play size={20} className="text-green-500" />
        </button>
      </form>
    </div>
  );
}

export default Chat;
