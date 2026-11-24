import { useState, useEffect } from 'react';
import { ReelGameItem } from './types';
import { INITIAL_9_GAMES } from './data/defaultGames';
import { SEO_ARTICLES } from './data/seoContent';
import { applyRouteMetadata, normalizePathname } from './utils/seo';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { GameGridSection } from './components/GameGridSection';
import { SEOContentSection } from './components/SEOContentSection';
import { GameDemoModal } from './components/GameDemoModal';
import { CustomerServiceModal } from './components/CustomerServiceModal';
import { Footer } from './components/Footer';
import {
  GamesIndexPage,
  GameDetailPage,
  GuidesIndexPage,
  GuideDetailPage,
  FaqPage,
  PrivacyPage,
  TermsPage,
  NotFoundPage
} from './components/SubPages';

export default function App() {
  const [games] = useState<ReelGameItem[]>(INITIAL_9_GAMES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePathname(window.location.pathname) : '/'
  );

  // Modals state
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [activeDemoGame, setActiveDemoGame] = useState<ReelGameItem | null>(null);
  const [isCSModalOpen, setIsCSModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handlePopState = () => {
      const next = normalizePathname(window.location.pathname);
      setPathname(next);
      applyRouteMetadata(next);
    };

    applyRouteMetadata(pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [pathname]);

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

  const renderPage = () => {
    if (pathname === '/') {
      return (
        <>
          <HeroBanner
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onScrollToGames={scrollToGames}
            onScrollToGuide={scrollToGuide}
            onOpenCS={() => setIsCSModalOpen(true)}
          />
          <GameGridSection
            games={games}
            searchQuery={searchQuery}
            onPlayGame={handlePlayGame}
            onOpenDetails={handleOpenDetails}
          />
          <SEOContentSection externalSearchQuery={searchQuery} />
        </>
      );
    }

    if (pathname === '/games') {
      return <GamesIndexPage games={games} onOpenDetails={handleOpenDetails} />;
    }

    if (pathname.startsWith('/games/')) {
      const slug = pathname.slice('/games/'.length);
      const matchedGame = games.find((g) => g.slug === slug);
      if (matchedGame) {
        return <GameDetailPage game={matchedGame} allGames={games} onOpenDetails={handleOpenDetails} />;
      }
      return <NotFoundPage />;
    }

    if (pathname === '/guides') {
      return <GuidesIndexPage />;
    }

    if (pathname.startsWith('/guides/')) {
      const slug = pathname.slice('/guides/'.length);
      const matchedArticle = SEO_ARTICLES.find((a) => a.slug === slug);
      if (matchedArticle) {
        return <GuideDetailPage article={matchedArticle} />;
      }
      return <NotFoundPage />;
    }

    if (pathname === '/faq') {
      return <FaqPage />;
    }

    if (pathname === '/privacy') {
      return <PrivacyPage />;
    }

    if (pathname === '/terms') {
      return <TermsPage />;
    }

    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Fixed/Sticky Header */}
      <Header
        onOpenCS={() => setIsCSModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderPage()}
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
