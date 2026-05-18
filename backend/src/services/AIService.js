const OpenAI = require("openai");
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o";

exports.generateNewLesson = async (category, subCategory, prompt) => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY");
    }

    const response = await client.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [
            {
                role: "system",
                content: `You are an educational tutor for: "${category}" - "${subCategory}"`
            },
            {
                role: "user",
                content: prompt
            }
        ]
    });

    const text = response?.choices?.[0]?.message?.content;
    if (!text) {
        throw new Error("Invalid response from OpenAI");
    }

    return text;
};

exports.streamLesson = async ({ category, subCategory, prompt }) => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY");
    }

    const stream = await client.chat.completions.create({
        model: OPENAI_MODEL,
        stream: true,
        messages: [
            {
                role: "system",
                content: `You are an educational tutor for: "${category}" - "${subCategory}"`
            },
            {
                role: "user",
                content: prompt
            }
        ]
    });

    if (!stream) {
        throw new Error("No stream returned from OpenAI");
    }

    return stream;
};