import express from 'express';
import { PrismaClient } from "@prisma/client";
import OpenAI from 'openai'; // 引入OpenAI SDK

// 加载环境变量
import dotenv from "dotenv";
dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // 使用环境变量中的OPENAI_API_KEY作为API密钥
    baseURL: 'https://www.apigptopen.xyz/v1',
}); // 初始化OpenAI SDK

export const createNewResume = async (req, res) => {
    const { resumeId, title, userEmail, userName } = req.body;
    try {
        const userResume = await prisma.userResume.create({
            data: {
                resumeId,
                title,
                userEmail,
                userName,
            },
        });
        res.json(userResume); // 返回创建的简历数据
    } catch (error) {
        console.error('Error creating resume:', error);
        res.status(500).json({ error: "An error occurred while creating the resume" });
    }
};

export const getUserResume = async (req, res) => {
    const { userEmail } = req.query;
    if (!userEmail) {
        return res.status(400).json({ error: 'userEmail query parameter is required' });
    }
    
    try {
        const userResume = await prisma.userResume.findMany({ // 查询用户的简历数据
            where: {
                userEmail,
            },
        });
        res.json(userResume); // 返回
    } catch (error) {
        console.error('Error getting user resume:', error);
        res.status(500).json({ error: "An error occurred while getting the user resume" });
    }
};

export const updateResume = async (req, res) => {
    const { resumeId, experience, ...resumeData } = req.body;

    try {
        if (!resumeId) {
            return res.status(400).json({ error: "Missing resumeId" });
        }

        const updateData = {
            ...resumeData,
        };

        if (experience) {
            updateData.experience = {
                deleteMany: {}, // 先删除现有的 experience 记录
                create: experience.map(exp => ({
                    ...exp
                })),
            };
        }

        const userResume = await prisma.userResume.update({
            where: {
                resumeId,
            },
            data: updateData,
            include: {
                experience: true, // 包含关联的 experience
            },
        });

        res.json(userResume); // 返回更新后的简历数据
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({ error: "An error occurred while updating the resume" });
    }
};




export const generateSummary = async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a highly skilled software engineer with a passion for building innovative applications.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });
        res.json(response.choices[0].message.content); // 返回生成的摘要
    } catch (error) {
        console.error('Error generating summary:', error);
        res.status(500).json({ error: "An error occurred while generating the summary" });
    }
}

// 示例：设置路由
app.post('/api/resume', createNewResume);
app.get('/api/resume', getUserResume);
app.put('/api/resume', updateResume);
app.post('/api/generate-summary', generateSummary);
app.get('/', (req, res) => {
    res.send('Hello World');
});

// 启动服务器
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
