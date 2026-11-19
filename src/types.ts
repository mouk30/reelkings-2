export interface ReelGameItem {
  id: string;
  slotIndex: number; // 1 ~ 9
  title: string;
  subtitle: string;
  category: 'classic' | 'ocean' | 'fantasy' | 'retro';
  categoryLabel: string;
  imageUrl: string;
  badge: string;
  badgeColor: 'amber' | 'emerald' | 'blue' | 'rose' | 'purple';
  rtp: number; // e.g. 98.4
  volatility: '안정' | '보통' | '높음' | '초고변동';
  jackpotAmount: number;
  playerCount: number;
  description: string;
  targetUrl: string;
  features: string[];
  reels?: string[];
  isSquarePoster?: boolean;
}

export type SEOArticleCategory = 'all' | 'intro' | 'games' | 'strategy' | 'safety' | 'faq';

export interface SEOArticle {
  id: string;
  category: SEOArticleCategory;
  categoryName: string;
  title: string;
  slug: string;
  summary: string;
  readTime: string;
  keywords: string[];
  date: string;
  headings: string[];
  content: {
    heading: string;
    body: string[];
    highlight?: string;
    bulletPoints?: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
}

export interface PresetImage {
  name: string;
  url: string;
  tag: string;
}
