import { useState } from 'react';
import { ReelGameItem } from './types';
import { INITIAL_9_GAMES } from './data/defaultGames';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { GameGridSection } from './components/GameGridSection';
import { SEOContentSection } from './components/SEOContentSection';
import { GameDemoModal } from './components/GameDemoModal';
import { CustomerServiceModal } from './components/CustomerServiceModal';
import { Footer } from './components/Footer';

export default function App() {
  const [games] = useState<ReelGameItem[]>(INITIAL_9_GAMES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals state
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [activeDemoGame, setActiveDemoGame] = useState<ReelGameItem | null>(null);
  const [isCSModalOpen, setIsCSModalOpen] = useState<boolean>(false);

  // Action triggers
  const handlePlayGame = (game: ReelGameItem) => {
    window.open(game.targetUrl || 'http://rgb285.com', '_blank', 'noopener,noreferrer');
  };

  const handleOpenDetails = (game: ReelGameItem) => {
    setActiveDemoGame(game);
    setIsDemoModalOpen(true);
  };

  const scrollToGames = () => {
    const el = document.getElementById('games-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGuide = () => {
    const el = document.getElementById('seo-guide');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Fixed/Sticky Header */}
      <Header
        onOpenCS={() => setIsCSModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner with Search and Direct Play CTA */}
        <HeroBanner
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onScrollToGames={scrollToGames}
          onScrollToGuide={scrollToGuide}
          onOpenCS={() => setIsCSModalOpen(true)}
        />

        {/* 9 Game Lineup Cards */}
        <GameGridSection
          games={games}
          searchQuery={searchQuery}
          onPlayGame={handlePlayGame}
          onOpenDetails={handleOpenDetails}
        />

        {/* Comprehensive SEO Content & Knowledge Base Section (구글 상위노출 최적화) */}
        <SEOContentSection externalSearchQuery={searchQuery} />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Game Interactive Demo & Play Simulation Modal */}
      <GameDemoModal
        game={activeDemoGame}
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      {/* 24h Customer Service & Telegram Modal */}
      <CustomerServiceModal
        isOpen={isCSModalOpen}
        onClose={() => setIsCSModalOpen(false)}
      />
    </div>
  );
}
