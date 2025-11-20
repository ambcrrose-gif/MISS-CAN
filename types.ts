export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  imageSeed: string;
  price: string;
  intensity: number; // 1-5 scale
}

export interface Recipe {
  id: string;
  title: string;
  shortDesc: string;
  imageSeed: string;
  linkedProductId: string;
}

export interface AiPairingResponse {
  tastingNotes: string;
  pairingSuggestion: string;
  regionHistory: string;
}
