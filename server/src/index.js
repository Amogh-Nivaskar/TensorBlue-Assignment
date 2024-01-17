const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectToMongoDB = require("./connections/mongodbAtlas");
const ChatRoutes = require("./routes/chat");
const UserRoutes = require("./routes/user");
const { verifyUser } = require("./middlewares/user");

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ message: "Here is your data" });
});

app.use("/user", UserRoutes);
app.use("/chat", verifyUser, ChatRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: "Route Not Found" });
});

async function init() {
  await connectToMongoDB();
  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
}

init();
