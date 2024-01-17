import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, STORAGE_KEY } from "../../contexts/userAuth";

const initialState = {
  status: "idle",
  chatsList: [],
  openChatId: "",
  openChatConversation: [],
};

const userId = localStorage.getItem(STORAGE_KEY);

export const getAllChatNames = createAsyncThunk(
  "chat/getAllChatNames",
  async () => {
    const res = await axios.get(`${BASE_URL}/chat`, {
      headers: {
        Authorization: userId,
      },
    });

    return res.data.chatNames;
  }
);

export const getChatConversation = createAsyncThunk(
  "chat/getChatConversation",
  async (chatId) => {
    const res = await axios.get(`${BASE_URL}/chat/${chatId}`, {
      headers: {
        Authorization: userId,
      },
    });
    return res.data.chat;
  }
);

// export const postNewChat = createAsyncThunk(
//   "chat/postNewChat",
//   async (statement) => {
//     const res = await axios.post(
//       `${BASE_URL}/chat/`,
//       { statement },
//       {
//         headers: {
//           Authorization: userId,
//         },
//       }
//     );

//     return res.data.chat;
//   }
// );

export async function postNewChat(statement) {
  try {
    const res = await axios
      .post(
        `${BASE_URL}/chat/`,
        { statement },
        {
          headers: {
            Authorization: userId,
          },
        }
      )
      .catch((error) => error.response);

    return res.data.chat;
  } catch (error) {
    console.log(error);
  }
}

export const postUserMessage = createAsyncThunk(
  "chat/postUserMessage",
  async ({ chatId, statement, date }) => {
    const res = await axios.post(
      `${BASE_URL}/chat/${chatId}`,
      { statement, date },
      {
        headers: {
          Authorization: userId,
        },
      }
    );

    const { AIResponse, responseDate } = res.data;

    return { AIResponse, responseDate, chatId };
  }
);

export const deleteChats = createAsyncThunk("chat/deleteChats", async () => {
  await axios.delete(`${BASE_URL}/chat`, {
    headers: {
      Authorization: userId,
    },
  });
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserDialog(state, action) {
      const { from, date, statement } = action.payload;
      state.openChatConversation.push({
        from,
        date,
        statement,
      });
    },
    setOpenChatId(state, action) {
      state.openChatId = action.payload;
    },
    clearConversation(state, action) {
      state.openChatConversation = [];
    },
    addNewChat(state, action) {
      const { title, _id } = action.payload;
      state.chatsList.push({ title, _id });
      // state.openChatId = _id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChatNames.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllChatNames.fulfilled, (state, action) => {
        state.chatsList = action.payload;
        state.status = "idle";
      })
      .addCase(getChatConversation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getChatConversation.fulfilled, (state, action) => {
        state.openChatConversation = action.payload.conversation;
        state.status = "idle";
      })
      // .addCase(postNewChat.pending, (state, action) => {
      //   state.status = "loading";
      // })
      // .addCase(postNewChat.fulfilled, (state, action) => {
      //   const { title, _id } = action.payload;
      //   state.chatsList.push({ title, _id });
      //   state.openChatId = _id;
      //   state.status = "idle";
      // })
      .addCase(postUserMessage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postUserMessage.fulfilled, (state, action) => {
        const { AIResponse, responseDate, chatId } = action.payload;
        state.openChatConversation.push({
          from: "AI",
          date: responseDate,
          statement: AIResponse,
        });
        state.openChatId = chatId;
        state.status = "idle";
      })
      .addCase(deleteChats.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteChats.fulfilled, (state, action) => {
        return initialState;
      });
  },
});

export const { addUserDialog, setOpenChatId, clearConversation, addNewChat } =
  chatSlice.actions;

export const selectStatus = (state) => state.status;

export const selectOpenChatId = (state) => state.openChatId;

export const selectChatsList = (state) => state.chatsList;

export const selectOpenChatConversation = (state) => state.openChatConversation;

export default chatSlice.reducer;
