
import React, { useState } from 'react';
import { generateImageFromText } from '../services/geminiService';
import Loader from './Loader';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A photorealistic image of a majestic lion in the savanna at sunset.');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const generatedImage = await generateImageFromText(prompt);
      setResultImage(`data:image/jpeg;base64,${generatedImage}`);
    } catch (e) {
      setError('Failed to generate image. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="prompt-gen" className="block text-sm font-medium text-gray-300 mb-2">Enter your prompt</label>
            <textarea
              id="prompt-gen"
              rows={6}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="e.g., An astronaut riding a horse on Mars..."
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !prompt}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading && <Loader />}
            <span className={isLoading ? 'ml-2' : ''}>Generate Image</span>
          </button>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>

        {/* Right Column: Output */}
        <div className="flex items-center justify-center bg-gray-900/50 rounded-lg p-4 min-h-[300px] border border-gray-700">
          {isLoading ? (
            <div className="text-center">
              <Loader />
              <p className="mt-2 text-gray-400">Generating your image...</p>
            </div>
          ) : resultImage ? (
            <img src={resultImage} alt="Generated Art" className="max-w-full max-h-full object-contain rounded-md" />
          ) : (
            <div className="text-center text-gray-500">
              <p>Your generated image will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
