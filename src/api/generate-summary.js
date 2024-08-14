import axios from 'axios';

export const apiGenerateSummary = async (jobtitle) => {
    try {
        const response = await axios.post('/api/generate-summary', 
            {
                prompt: '生成一份三到四句话的简历摘要，职业是' + jobtitle,
            }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error generating summary:', error);
        throw error;
    }
}