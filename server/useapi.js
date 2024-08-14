import OpenAI from "openai";
// 加载环境变量
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.OPENAI_API_KEY); // 输出环

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // 使用环境变量中的OPENAI_API_KEY作为API密钥
    baseURL: 'https://www.apigptopen.xyz/v1',
}); // 初始化OpenAI SDK

async function test() {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
    });

    console.log(chatCompletion.choices[0].message.content);
}

test();