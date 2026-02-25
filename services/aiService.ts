import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSalesInsight = async (context: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert Sales Manager AI. Analyze the following sales context and provide a brief, actionable insight or strategy (max 2 sentences). Context: ${context}`,
    });
    return response.text || "Unable to generate insight at this moment.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "AI service temporarily unavailable.";
  }
};

export const draftFollowUpEmail = async (customerName: string, dealStage: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Draft a professional, short follow-up email for a customer named ${customerName} whose deal is currently in the ${dealStage} stage. Keep it friendly and persuasive.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("AI Draft Error:", error);
    return "Error generating draft.";
  }
};
