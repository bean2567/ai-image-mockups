
import { GoogleGenAI, Modality } from "@google/genai";

const fileToBase64 = (file: File): Promise<{ mimeType: string; data: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const [, data] = result.split(',');
      const mimeType = result.substring(result.indexOf(':') + 1, result.indexOf(';'));
      resolve({ mimeType, data });
    };
    reader.onerror = (error) => reject(error);
  });
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateImageWithPrompt = async (
  imageFile: File,
  prompt: string
): Promise<string> => {
  const { mimeType, data } = await fileToBase64(imageFile);
  const imagePart = {
    inlineData: {
      data,
      mimeType,
    },
  };
  const textPart = { text: prompt };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [imagePart, textPart],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return part.inlineData.data;
    }
  }
  throw new Error("No image generated in the response.");
};

export const generateImageFromText = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '1:1',
    },
  });
  return response.generatedImages[0].image.imageBytes;
};
