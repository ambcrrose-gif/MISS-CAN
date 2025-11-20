import React, { useState, useRef } from 'react';
import { ShoppingBag, Menu, ArrowDown, Anchor, Compass, Fish } from 'lucide-react';
import { ProductModal } from './components/ProductModal';
import { Product, Recipe } from './types';

// --- Mock Data ---
const PRODUCTS: Product[] = [
  { id: '1', name: 'Sardines in Spicy Tomato', category: 'The Classic', description: 'Our signature catch. Plump sardines bathed in a rich tomato sauce with a piri-piri kick. Hand-packed for peak freshness.', imageSeed: 'open tin sardines tomato', price: '€8.50', intensity: 4 },
  { id: '2', name: 'Mackerel Fillets in Olive Oil', category: 'The Purest', description: 'Smooth, buttery mackerel fillets preserved in golden Portuguese olive oil. A masterclass in simplicity.', imageSeed: 'open tin mackerel oil', price: '€9.00', intensity: 2 },
  { id: '3', name: 'Codfish in Garlic Oil', category: 'The Tradition', description: 'The beloved Bacalhau, reimagined. Tender flakes of cod infused with roasted garlic notes.', imageSeed: 'open canned codfish', price: '€11.00', intensity: 3 },
  { id: '4', name: 'Tuna Ventresca', category: 'The Luxury', description: 'The belly of the tuna. Incredibly tender, rich, and decadent. The gold standard of tinned fish.', imageSeed: 'open tin tuna belly', price: '€14.00', intensity: 5 },
];

const RECIPES: Recipe[] = [
  { id: 'r1', title: 'Lisbon Sunset Toast', shortDesc: 'Spicy Sardines on rustic sourdough.', imageSeed: 'sardine toast', linkedProductId: '1' },
  { id: 'r2', title: 'Algarve Summer Salad', shortDesc: 'Mackerel fillets tossed with chickpeas.', imageSeed: 'mackerel salad', linkedProductId: '2' },
  { id: 'r3', title: 'Porto Fisherman’s Stew', shortDesc: 'A quick, hearty broth using our Codfish.', imageSeed: 'fish stew', linkedProductId: '3' },
];

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const productSectionRef = useRef<HTMLDivElement>(null);
  const recipeSectionRef = useRef<HTMLDivElement>(null);

  const handleFirstCatch = () => {
    // Scrolls to the product section to let them "discover" their first catch
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openProduct = (id: string) => {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (p) setSelectedProduct(p);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* --- Header --- */}
      <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-stone-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-stone-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu />
            </button>
            <a href="#" className="text-2xl font-serif font-bold tracking-tighter text-stone-900 flex items-center gap-2">
              <Fish size={24} className="text-amber-600" />
              MISS CAN
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase text-stone-600">
            <a href="#" className="hover:text-amber-600 transition-colors">Shop</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Our Story</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Recipes</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Journal</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-stone-800 hover:text-amber-600">
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Updated Hero Image to be a spread of tinned fish if possible, or atmospheric Portuguese coast */}
          <img 
            src="https://loremflickr.com/1920/1080/canned fish,sardine tin,rustic food/all?lock=1" 
            alt="Portuguese Tinned Fish Spread" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-stone-900/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <p className="text-amber-300 text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-6 animate-fade-in">
            Sustainable & Ethical Tinned Fish
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 leading-[0.9] drop-shadow-2xl">
            From Portugal<br/> <span className="italic text-amber-50 font-light font-serif">with Love</span>
          </h1>
          
          {/* Primary Call to Action */}
          <div className="flex flex-col items-center mt-12 group">
            <button 
              onClick={handleFirstCatch}
              className="bg-amber-500 text-stone-900 hover:bg-amber-400 px-12 py-6 text-xl md:text-2xl font-serif font-bold shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] transition-all transform hover:-translate-y-1 rounded-sm flex items-center gap-3 border border-amber-400"
            >
              <Anchor size={28} className="text-stone-900" />
              Discover your First Catch
            </button>
            <span 
              onClick={handleFirstCatch}
              className="text-white/70 text-xs uppercase tracking-widest mt-3 cursor-pointer hover:text-white border-b border-transparent hover:border-white transition-all pb-0.5"
            >
              click here
            </span>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <ArrowDown size={24} />
        </div>
      </section>

      {/* --- The "Way of Life" (Story) Section --- */}
      <section className="py-24 bg-[#fcfbf9] px-6 border-b border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <Compass className="mx-auto text-amber-600 mb-6" size={40} />
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-10 leading-tight">
            Canning isn’t just a business to us,<br/> but rather it’s a <span className="italic text-amber-600 border-b-2 border-amber-200">way of life.</span>
          </h2>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
            We source our fish exclusively off the coast of Portugal, ensuring every tin is a testament to sustainability and ethics. Your first catch isn't just a transaction—it's the start of a relationship with the ocean.
          </p>
          <div className="flex justify-center">
            <div className="h-16 w-px bg-amber-300"></div>
          </div>
        </div>
      </section>

      {/* --- Flavor Exploration Section --- */}
      <section ref={recipeSectionRef} className="py-24 bg-stone-900 text-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
              <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                Curated Pairings
              </span>
              <h2 className="text-4xl md:text-6xl font-serif mb-6">
                Explore these Portuguese Flavors
              </h2>
              <p className="text-stone-400 max-w-2xl mx-auto text-lg">
                Not sure where to start? Click the images below to explore the distinct personality of each catch.
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {RECIPES.map((recipe, idx) => (
              <div 
                key={recipe.id} 
                className="group cursor-pointer relative"
                onClick={() => openProduct(recipe.linkedProductId)}
              >
                <div className="relative overflow-hidden rounded-sm aspect-[3/4] mb-6 border border-stone-800">
                  <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/10 transition-all duration-500 z-10" />
                  {/* Fallback images for recipes - plated or open tins */}
                  <img 
                    src={`https://loremflickr.com/600/800/tinned fish,sardine on toast,mackerel dish/all?lock=${idx + 10}`} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-stone-900 to-transparent">
                    <h3 className="text-2xl font-serif mb-1 text-white group-hover:text-amber-400 transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="text-stone-300 text-sm border-b border-stone-600 pb-2 mb-2 inline-block">
                      Compare Pairing
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button 
               onClick={() => productSectionRef.current?.scrollIntoView({behavior: 'smooth'})}
               className="bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-stone-900 px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300"
            >
               Explore these Portuguese Flavors
            </button>
          </div>
        </div>
      </section>

      {/* --- Product Showcase (The "Pantry") --- */}
      <section ref={productSectionRef} className="py-32 bg-white relative">
         {/* Decor */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100">
            <Fish className="text-stone-300" />
         </div>

         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
               <span className="text-stone-400 text-sm tracking-[0.3em] uppercase">The Pantry</span>
               <h2 className="text-5xl font-serif text-stone-900 mt-4">Your First Catch Awaits</h2>
               <p className="mt-4 text-stone-500 italic font-serif">Select a tin to reveal its story.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
               {PRODUCTS.map(product => (
                  <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
                     <div className="aspect-[4/5] bg-stone-50 mb-6 relative overflow-hidden rounded-sm shadow-sm group-hover:shadow-xl transition-all duration-500">
                        {/* STOCK IMAGES - Updated to favor 'open tin' looks */}
                        <img 
                           src={`https://loremflickr.com/500/625/open canned fish,sardine tin,tinned seafood/all?lock=${product.id}`} 
                           alt={product.name}
                           className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-stone-900/60 to-transparent">
                           <span className="text-white uppercase text-xs font-bold tracking-widest border-b border-white pb-1">Read Tasting Notes</span>
                        </div>
                     </div>
                     <div className="text-center">
                        <h4 className="font-serif text-xl text-stone-900 leading-tight group-hover:text-amber-600 transition-colors">
                           {product.name}
                        </h4>
                        <p className="text-stone-500 text-xs uppercase tracking-widest mt-2">{product.category}</p>
                        <p className="text-stone-900 font-bold mt-3 text-lg">{product.price}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-serif text-white mb-6 tracking-tight">MISS CAN</h3>
            <p className="max-w-md mb-8 text-stone-500 leading-relaxed">
              Sustainably sourced, traditionally prepared, and packed with love. Bringing the authentic flavors of the Portuguese coast to your table.
            </p>
            <div className="flex gap-4">
               <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-stone-900 transition-all cursor-pointer">
                  <span className="font-serif italic font-bold">f</span>
               </div>
               <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-stone-900 transition-all cursor-pointer">
                  <span className="font-serif italic font-bold">ig</span>
               </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-amber-500 transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Gift Sets</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Merchandise</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Wholesale</a></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Journal</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-stone-800 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Miss Can. From Portugal with Love.</p>
          <p className="mt-2 md:mt-0 text-stone-600">Designed for Fish Lovers.</p>
        </div>
      </footer>

      {/* --- Modal --- */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

    </div>
  );
};

export default App;