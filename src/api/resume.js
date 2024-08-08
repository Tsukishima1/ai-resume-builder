import axios from 'axios';

export const apiCreateNewResume = async (resumeData) => {
    try {
        const response = await axios.post('/api/resume', resumeData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating resume:', error);
        throw error;
    }
};

