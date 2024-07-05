import { ResearchService } from "@/services/ResearchService/v0";

export function createChatGptResearchService(): ResearchService {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) {
        throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing");
    }
    return {
        getChatCompletion(text: string) {
            return '';
        }
    }
}
