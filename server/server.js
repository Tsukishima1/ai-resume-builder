import express from 'express';
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

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

// 示例：设置路由
app.post('/api/resume', createNewResume);

// 启动服务器
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
