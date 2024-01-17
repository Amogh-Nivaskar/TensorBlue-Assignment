const UserModel = require("../models/user");
const ChatModel = require("../models/chat");
const { promptAI } = require("../api/openai");

async function getAllChatNames(req, res) {
  try {
    const { email } = req.user;

    const user = await UserModel.findOne({ email }).populate("chats");

    if (!user) throw new Error("User Not Found");

    const chatNames = user.chats.map((chat) => {
      return { title: chat.title, _id: chat._id };
    });

    return res
      .status(200)
      .json({ message: "Fetched chat names successfully", chatNames });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function getChatConversation(req, res) {
  try {
    const { email } = req.user;

    const { chatId } = req.params;

    const chat = await ChatModel.findById(chatId);

    if (!chat) throw new Error("Chat not found");

    return res.status(200).json({ message: "Fetched chat successfully", chat });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function createNewChat(req, res) {
  try {
    const { _id } = req.user;
    const { statement } = req.body;

    // get chat name from statement by making API call to openAI api
    const getTitlePrompt = `Give a really short title describing this prompt - ${statement}`;
    const title = await promptAI(getTitlePrompt);

    const user = await UserModel.findById(_id);
    const chat = new ChatModel({ title });

    user.chats.push(chat._id);
    await user.save();
    await chat.save();

    return res.status(201).json({ message: "Created chat successfully", chat });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function postChatDialog(req, res) {
  try {
    const { email } = req.user;
    const { chatId } = req.params;
    const { statement, date } = req.body;

    const chat = await ChatModel.findById(chatId);

    if (!chat) throw new Error("Chat not found");

    chat.conversation.push({
      from: "ME",
      date,
      statement,
    });

    // Get response from openAI api
    const AIResponse = await promptAI(statement);

    const responseDate = Date.now();

    chat.conversation.push({
      from: "AI",
      date: responseDate,
      statement: AIResponse,
    });

    console.log("chat" + chat);

    await chat.save();

    return res.status(200).json({
      message: "Posted chat dialog successfully",
      AIResponse,
      responseDate,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function deleteAllChats(req, res) {
  try {
    const { _id } = req.user;

    const user = await UserModel.findById(_id);

    const deletePromises = user.chats.map((chatId) =>
      ChatModel.findByIdAndDelete(chatId)
    );
    await Promise.all(deletePromises);

    user.chats = [];
    await user.save();

    return res.status(200).json({ message: "Deleted chats successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getAllChatNames,
  getChatConversation,
  createNewChat,
  postChatDialog,
  deleteAllChats,
};
