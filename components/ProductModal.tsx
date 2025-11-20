import React, { useEffect, useState } from 'react';
import { X, Loader2, Fish, Wine, MapPin, Sparkles } from 'lucide-react';
import { Product, AiPairingResponse } from '../types';
import { generateProductInsights, generateProductImage } from '../services/geminiService';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [aiContent, setAiContent] = useState<AiPairingResponse | null>(null);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [textLoading, setTextLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (product) {
      // Reset states
      setTextLoading(true);
      setImageLoading(true);
      setAiContent(null);
      setAiImage(null);

      // Fetch Text
      generateProductInsights(product.name)
        .then(data => setAiContent(data))
        .finally(() => setTextLoading(false));

      // Generate Image
      generateProductImage(product.name)
        .then(img => setAiImage(img))
        .finally(() => setImageLoading(false));
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-[#fffbf5] w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[800px] animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors text-stone-800"
        >
          <X size={24} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-stone-200 overflow-hidden group">
          {/* Base Image (Stock) - shows while AI loads or if AI fails */}
          {/* Updated to prioritize Open Tin / Canned Fish imagery */}
          <img 
            src={aiImage || `https://loremflickr.com/800/1200/open sardine tin,canned fish,seafood can/all?lock=${product.id}`} 
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${imageLoading ? 'scale-105 blur-sm grayscale' : 'scale-100 blur-0 grayscale-0'}`}
          />
          
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-900/20 backdrop-blur-sm">
               <div className="bg-white/90 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                 <Loader2 className="animate-spin text-amber-500" size={16} />
                 <span className="text-xs font-bold tracking-widest text-stone-800 uppercase">Generating Vision...</span>
               </div>
            </div>
          )}

          {aiImage && !imageLoading && (
             <div className="absolute bottom-4 left-4 bg-stone-900/80 text-white px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-sm">
                <Sparkles size={12} className="text-amber-400" />
                <span className="text-[10px] font-bold tracking-widest uppercase">AI Imagined</span>
             </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900/80 to-transparent p-6 md:hidden">
            <h2 className="text-2xl font-serif text-white">{product.name}</h2>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto">
          <span className="inline-block px-3 py-1 border border-amber-500 text-amber-600 text-xs tracking-widest uppercase mb-4 rounded-full">
            From Portugal With Love
          </span>
          
          <h2 className="text-4xl font-serif text-stone-800 mb-2 hidden md:block">{product.name}</h2>
          <p className="text-xl text-stone-500 font-light mb-6">{product.category}</p>
          
          <div className="prose prose-stone mb-8">
            <p className="text-stone-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="bg-white border border-stone-200 p-6 rounded-sm shadow-sm mb-8">
            <h3 className="font-serif text-lg text-stone-800 mb-4 border-b border-stone-100 pb-2 flex justify-between items-center">
              <span>The Sommelier's Take</span>
              <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-1 rounded uppercase tracking-wider">AI Analysis</span>
            </h3>
            
            {textLoading ? (
              <div className="flex items-center justify-center py-8 text-stone-400">
                <Loader2 className="animate-spin mr-2" />
                <span>Consulting the fishmonger...</span>
              </div>
            ) : aiContent ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-start gap-3">
                  <Fish className="text-amber-500 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <span className="font-bold text-stone-800 text-sm uppercase tracking-wide block mb-1">Tasting Notes</span>
                    <p className="text-sm text-stone-600 italic">"{aiContent.tastingNotes}"</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Wine className="text-amber-500 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <span className="font-bold text-stone-800 text-sm uppercase tracking-wide block mb-1">Pairing</span>
                    <p className="text-sm text-stone-600">{aiContent.pairingSuggestion}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="text-amber-500 mt-1 flex-shrink-0" size={18} />
                  <div>
                     <span className="font-bold text-stone-800 text-sm uppercase tracking-wide block mb-1">Origin Story</span>
                     <p className="text-sm text-stone-600">{aiContent.regionHistory}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-stone-400 italic text-sm">Information unavailable.</p>
            )}
          </div>

          <button className="w-full bg-stone-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-stone-900 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};