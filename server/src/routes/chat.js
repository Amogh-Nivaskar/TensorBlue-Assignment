const express = require("express");
const {
  getAllChatNames,
  getChatConversation,
  postChatDialog,
  createNewChat,
  deleteAllChats,
} = require("../controllers/chat");

const router = express.Router();

router.get("/", getAllChatNames);
router.get("/:chatId", getChatConversation);
router.post("/", createNewChat);
router.post("/:chatId", postChatDialog);
router.delete("/", deleteAllChats);

module.exports = router;
