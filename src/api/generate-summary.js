import axios from 'axios';

export const apiGenerateSummary = async (prompt) => {
    try {
        const response = await axios.post('/api/generate-summary', 
            { prompt },
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