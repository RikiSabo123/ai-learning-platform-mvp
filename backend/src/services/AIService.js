const  OpenAI= require('openai');
const { assertToolCallsAreChatCompletionFunctionToolCalls } = require('openai/lib/parser.js');
// Connect to AI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
// Generate new lesson
exports.generateNewLesson= async (categoryID, subcategoryID,prompt) => {
    try {
        // Fetch category and sub-category names
        const category = await Category.findByPk(categoryID);
        const subCategory = await SubCategory.findByPk(subcategoryID);

        if (!category || !subCategory) {
            throw new Error('Category or SubCategory not found');
        }
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert teacher. Create a structured lesson about ${category.name} - ${subCategory.name}.`
                },
                {
                    role: 'user',
                    content: prompt
                }
                
            ],
            temperature: 0.7,
            max_tokens: 400
        });
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating new lesson:', error);
        throw error;
    }
};


