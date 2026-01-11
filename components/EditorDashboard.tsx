
import React, { useState, useRef } from 'react';
import { User, ImageAdjustments, AIAnalysisResult } from '../types';
import { analyzeImage } from '../services/geminiService';

interface EditorDashboardProps {
  user: User;
  onLogout: () => void;
}

const EditorDashboard: React.FC<EditorDashboardProps> = ({ user, onLogout }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [adjustments, setAdjustments] = useState<ImageAdjustments>({
    exposure: 100,
    contrast: 100,
    saturation: 100,
    brightness: 100
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setAnalysis(null); // Reset analysis for new image
      };
      reader.readAsDataURL(file);
    }
  };

  const runAIAnalysis = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    try {
      const base64Data = selectedImage.split(',')[1];
      const result = await analyzeImage(base64Data);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAdjustmentChange = (key: keyof ImageAdjustments, value: number) => {
    setAdjustments(prev => ({ ...prev, [key]: value }));
  };

  const imageFilterStyle = {
    filter: `
      brightness(${adjustments.exposure}%) 
      contrast(${adjustments.contrast}%) 
      saturate(${adjustments.saturation}%) 
      brightness(${adjustments.brightness}%)
    `
  };

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-white overflow-hidden">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-border-dark bg-white dark:bg-background-dark z-20">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">photo_camera</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Lumina</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">Pro Account</p>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar - Tools */}
        <aside className="w-full md:w-80 bg-white dark:bg-card-dark border-r border-gray-200 dark:border-border-dark overflow-y-auto custom-scrollbar p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Adjustments</h2>
          
          <div className="space-y-6">
            {(Object.keys(adjustments) as Array<keyof ImageAdjustments>).map((key) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="capitalize">{key}</span>
                  <span className="text-primary">{adjustments[key]}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={adjustments[key]} 
                  onChange={(e) => handleAdjustmentChange(key, parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-200 dark:bg-border-dark rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-border-dark">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">AI Enhancements</h2>
            <button 
              disabled={!selectedImage || isAnalyzing}
              onClick={runAIAnalysis}
              className={`flex w-full items-center justify-center gap-2 rounded-xl h-12 font-bold text-sm transition-all
                ${!selectedImage || isAnalyzing 
                  ? 'bg-gray-200 dark:bg-border-dark text-gray-400 cursor-not-allowed' 
                  : 'bg-primary text-white shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98]'
                }`}
            >
              <span className="material-symbols-outlined text-xl">auto_fix_high</span>
              {isAnalyzing ? 'Analyzing...' : 'Magic Analysis'}
            </button>

            {analysis && (
              <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-border-dark animate-in fade-in slide-in-from-top-2">
                <p className="text-xs text-primary font-bold mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">info</span>
                  GEMINI INSIGHT
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {analysis.description}
                </p>
                <div className="space-y-2">
                  {analysis.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="material-symbols-outlined text-[14px] mt-0.5 text-primary">check_circle</span>
                      {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Canvas Area */}
        <section className="flex-1 bg-gray-100 dark:bg-background-dark p-8 flex items-center justify-center relative overflow-hidden">
          {selectedImage ? (
            <div className="relative group max-w-full max-h-full">
              <img 
                src={selectedImage} 
                alt="Editor Preview" 
                className="max-w-full max-h-[70vh] rounded-2xl shadow-2xl transition-all duration-300"
                style={imageFilterStyle}
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 size-10 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full max-w-2xl h-96 border-4 border-dashed border-gray-300 dark:border-border-dark rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/5 hover:border-primary/50 transition-all"
            >
              <div className="size-20 bg-gray-200 dark:bg-card-dark rounded-full flex items-center justify-center text-gray-400">
                <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Start creating</h3>
                <p className="text-gray-500">Upload a photo to begin editing</p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          )}

          {/* Bottom Toolbar */}
          {selectedImage && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl p-2 rounded-2xl border border-gray-200 dark:border-border-dark shadow-2xl">
              <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <span className="material-symbols-outlined">crop</span>
              </button>
              <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <span className="material-symbols-outlined">filter_frames</span>
              </button>
              <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <span className="material-symbols-outlined">palette</span>
              </button>
              <div className="w-[1px] h-8 bg-gray-200 dark:bg-border-dark mx-2"></div>
              <button className="flex items-center gap-2 px-6 h-11 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                Export
                <span className="material-symbols-outlined text-sm">download</span>
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default EditorDashboard;
