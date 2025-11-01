
import React, { useState } from 'react';
import { Tab } from './types';
import ProductMockup from './components/ProductMockup';
import ImageGenerator from './components/ImageGenerator';
import ImageEditor from './components/ImageEditor';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Mockup);

  const renderTabContent = () => {
    switch (activeTab) {
      case Tab.Mockup:
        return <ProductMockup />;
      case Tab.Generator:
        return <ImageGenerator />;
      case Tab.Editor:
        return <ImageEditor />;
      default:
        return <ProductMockup />;
    }
  };

  const TabButton: React.FC<{tab: Tab}> = ({ tab }) => {
    const isActive = activeTab === tab;
    return (
      <button
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 text-sm md:text-base font-medium rounded-md transition-colors duration-200 ${
          isActive
            ? 'bg-indigo-600 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        {tab}
      </button>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            AI Image Studio
          </h1>
          <p className="text-gray-400 mt-2">
            Create product mockups, generate images from text, and edit photos with AI.
          </p>
        </header>

        <nav className="flex justify-center mb-8 bg-gray-800 p-2 rounded-lg shadow-lg">
          <div className="flex space-x-2">
            <TabButton tab={Tab.Mockup} />
            <TabButton tab={Tab.Generator} />
            <TabButton tab={Tab.Editor} />
          </div>
        </nav>

        <main>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
