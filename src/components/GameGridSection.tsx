import { useState, useMemo } from 'react';
import { ReelGameItem } from '../types';
import { navigateTo } from '../utils/seo';
import { 
  Play, 
  Info, 
  TrendingUp, 
  Coins, 
  Users, 
  Sparkles,
  ExternalLink,
  Flame,
  Filter
} from 'lucide-react';

interface GameGridSectionProps {
  games: ReelGameItem[];
  searchQuery: string;
  onPlayGame: (game: ReelGameItem) => void;
  onOpenDetails: (game: ReelGameItem) => void;
}

export function GameGridSection({
  games,
  searchQuery,
  onPlayGame,
  onOpenDetails
}: GameGridSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter games by category and search
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        game.title.toLowerCase().includes(query) ||
        game.subtitle.toLowerCase().includes(query) ||
        game.categoryLabel.toLowerCase().includes(query) ||
        game.features.some(f => f.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [games, selectedCategory, searchQuery]);

  const categories = [
    { id: 'all', label: '전체 라인업' },
    { id: 'classic', label: '정통 릴게임' },
    { id: 'ocean', label: '바다·어드벤처' },
    { id: 'fantasy', label: '신화·판타지' },
    { id: 'retro', label: '아케이드·레트로' }
  ];

  return (
    <section id="games-grid" className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 border-b border-slate-800/80 pb-5 sm:pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs sm:text-sm font-bold tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>OFFICIAL REEL LINEUP</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight flex flex-wrap items-center gap-2">
            <span>공식 대표 릴게임 라인업</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal border border-slate-700 whitespace-nowrap">
              인기 공식 라인업
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 break-keep">
            전설의 9대 명작부터 뽀빠이, 정글북, 릴천지까지 엄선된 공식 릴게임 라인업을 제공합니다.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>전 기종 실시간 정상 가동중</span>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <div className="flex items-center gap-1 text-xs text-slate-400 mr-2 shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>카테고리:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
        {searchQuery && (
          <span className="text-xs text-amber-400 ml-auto shrink-0 bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-500/20">
            "{searchQuery}" 검색 결과 ({filteredGames.length}건)
          </span>
        )}
      </div>

      {/* 9 Images / Games 3x3 Grid */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <Info className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-slate-300 font-medium">검색 조건에 맞는 릴게임이 없습니다.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
            }}
            className="mt-3 px-4 py-1.5 rounded-lg bg-slate-800 text-amber-400 text-xs font-semibold"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => {
            const isSquarePoster = game.isSquarePoster !== false;
            const badgeBg = 
              game.badgeColor === 'amber' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
              game.badgeColor === 'blue' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
              game.badgeColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
              game.badgeColor === 'rose' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
              'bg-purple-500/20 text-purple-300 border-purple-500/40';

            return (
              <div
                key={game.id}
                id={`game-card-slot-${game.slotIndex}`}
                className="group relative bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-amber-950/20 flex flex-col"
              >
                {/* Clean top info bar so badges never cover the poster artwork */}
                {isSquarePoster && (
                  <div className="px-4 py-2.5 bg-slate-950/95 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                        #{game.slotIndex}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-300">
                        {game.categoryLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{game.playerCount.toLocaleString()}명 이용중</span>
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badgeBg}`}>
                        {game.badge}
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Thumbnail Image Container */}
                <a
                  href={game.targetUrl || 'http://rgb285.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative ${isSquarePoster ? 'aspect-square' : 'aspect-[16/10]'} w-full overflow-hidden bg-slate-950 block cursor-pointer group/thumb`}
                  title={`${game.title} - 게임 시작`}
                >
                  <img
                    src={game.imageUrl}
                    alt={`${game.title} - ${game.subtitle}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain bg-slate-950 group-hover/thumb:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Overlay only for standard landscape cards */}
                  {!isSquarePoster && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  )}

                  {/* Play Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-amber-500/95 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/40 transform scale-75 group-hover/thumb:scale-100 transition-transform">
                      <Play className="w-7 h-7 fill-slate-950 ml-0.5" />
                    </div>
                  </div>

                  {/* Badges inside thumbnail only for standard landscape cards */}
                  {!isSquarePoster && (
                    <>
                      {/* Slot Number Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="w-7 h-7 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-amber-400 font-mono font-black text-xs flex items-center justify-center shadow-md">
                          #{game.slotIndex}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 backdrop-blur-md border border-slate-700">
                          {game.categoryLabel}
                        </span>
                      </div>

                      {/* Status / Highlight Badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${badgeBg} flex items-center gap-1 shadow-sm`}>
                          <Flame className="w-3 h-3" />
                          {game.badge}
                        </span>
                      </div>

                      {/* Live Player Count Badge */}
                      <div className="absolute bottom-3 left-3 text-[11px] text-slate-300 flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <Users className="w-3 h-3 text-slate-400" />
                        <span>{game.playerCount.toLocaleString()}명 이용중</span>
                      </div>
                    </>
                  )}
                </a>

                {/* Card Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                        <a
                          href={`/games/${game.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateTo(`/games/${game.slug}`);
                          }}
                          className="hover:underline underline-offset-4"
                        >
                          {game.title}
                        </a>
                      </h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700 shrink-0 font-mono">
                        RTP {game.rtp}%
                      </span>
                    </div>
                    <p className="text-xs text-amber-300/80 font-medium mt-0.5 line-clamp-1">
                      {game.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  {/* Stats & Key Features */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    {/* Jackpot & Volatility info */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        <span>누적 잭팟:</span>
                      </div>
                      <span className="font-mono font-bold text-amber-400">
                        ₩{game.jackpotAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-slate-400">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                        <span>변동성 지수:</span>
                      </div>
                      <span className="font-semibold text-slate-300">
                        {game.volatility}
                      </span>
                    </div>

                    {/* Features Tag Pills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {game.features.slice(0, 2).map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      id={`btn-play-${game.id}`}
                      href={game.targetUrl || 'http://rgb285.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>게임 시작</span>
                    </a>
                    <button
                      id={`btn-detail-${game.id}`}
                      onClick={() => onOpenDetails(game)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      <span>상세 / 공략</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
