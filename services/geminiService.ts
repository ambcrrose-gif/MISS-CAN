import { GoogleGenAI, Type } from "@google/genai";
import { AiPairingResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProductInsights = async (productName: string): Promise<AiPairingResponse | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate sophisticated tasting notes, a beverage pairing, and a brief historical tidbit about the region for a premium Portuguese tinned fish product: "${productName}". Keep it poetic and marketing-friendly.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tastingNotes: {
              type: Type.STRING,
              description: "Sensory description of flavors and textures, approx 30 words."
            },
            pairingSuggestion: {
              type: Type.STRING,
              description: "A wine or beverage pairing recommendation."
            },
            regionHistory: {
              type: Type.STRING,
              description: "A 1-sentence fact about Portuguese coastal fishing tradition related to this fish."
            }
          },
          required: ["tastingNotes", "pairingSuggestion", "regionHistory"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as AiPairingResponse;
  } catch (error) {
    console.error("Error generating AI content:", error);
    // Fallback content in case of API failure or missing key
    return {
      tastingNotes: "Rich, savory, and deeply evocative of the Atlantic breeze.",
      pairingSuggestion: "A crisp Vinho Verde or a light Lager.",
      regionHistory: "Harvested from the historic waters off the coast of Portugal, keeping traditions alive."
    };
  }
};

export const generateProductImage = async (productName: string): Promise<string | null> => {
  try {
    // Prompt engineered to match provided reference images: 
    // Open tins, top-down view, rustic wood background, focus on oil/sauce texture.
    const prompt = `A hyper-realistic food photography shot of an open metal tin of premium ${productName}, placed on a dark, weathered rustic wooden table. 
    Top-down perspective looking directly into the can. 
    The fish is beautifully arranged inside the tin, glistening with high-quality olive oil or rich tomato sauce. 
    The texture of the fish skin and the metallic rim of the can are sharp and detailed.
    Dramatic, warm lighting creating a premium, artisanal Portuguese aesthetic. 
    8k resolution, culinary magazine style.`;

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '3:4',
      },
    });

    const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    if (base64ImageBytes) {
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    return null;
  } catch (error) {
    console.error("Error generating AI image:", error);
    return null;
  }
};