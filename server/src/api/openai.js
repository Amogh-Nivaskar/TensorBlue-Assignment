const axios = require("axios");

const ENDPOINT_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.OPEN_AI_SECRET_KEY;

async function promptAI(prompt) {
  try {
    const body = {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "system", content: prompt },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 100,
    };

    const res = await axios.post(ENDPOINT_URL, body, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    return res.data.choices[0].message.content;
  } catch (error) {
    console.error("Error making OpenAI API call:", error.message);
    throw error;
  }
}

module.exports = { promptAI };
