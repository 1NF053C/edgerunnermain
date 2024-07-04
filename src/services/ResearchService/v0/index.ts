import { createChatGptResearchService } from "./drivers/ChatGptResearchService";

export interface ResearchService {
    getChatCompletion: (text: string) => string,
}

export function createRunningService(): ResearchService {
    const RESEARCH_SERVICE = process.env.RESEARCH_SERVICE;
    
    if (RESEARCH_SERVICE === 'chatgpt') {
        return createChatGptResearchService();
    }
    else {
        throw TypeError("process.env.RESEARCH_SERVICE is invalid")
    }
}
