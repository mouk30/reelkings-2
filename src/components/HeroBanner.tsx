import { 
  Flame, 
  Smartphone, 
  CheckCircle2, 
  Search, 
  Zap, 
  Sparkles,
  Play
} from 'lucide-react';

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onScrollToGames: () => void;
  onScrollToGuide: () => void;
  onOpenCS: () => void;
}

export function HeroBanner({ 
  searchQuery, 
  onSearchChange, 
  onScrollToGames,
  onScrollToGuide, 
  onOpenCS 
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:pt-12 sm:pb-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {/* Main Top Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] sm:text-xs font-semibold tracking-wide max-w-full break-keep">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce shrink-0" />
            <span>릴게임릴킹 | 추억의 오락실 감성과 온라인 릴게임의 만남</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-snug sm:leading-tight break-keep px-2">
            <span className="block text-slate-200 text-lg sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
              릴게임릴킹 | 추억과 낭만
            </span>
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              인기 릴게임 · 무료 릴게임 · 슬롯게임 정보 포털
            </span>
          </h1>

          <p className="text-slate-300/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto break-keep px-2">
            릴게임릴킹은 추억의 오락실 감성과 온라인 릴게임의 재미를 한곳에서 확인할 수 있는 게임 정보 공간입니다.
            인기 릴게임, 무료 릴게임, 슬롯게임, 오락실게임 등 다양한 콘텐츠와 게임 이용 방법, 초보자 가이드를 제공합니다.
          </p>

          {/* Target SEO Hashtag Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-2xl mx-auto pt-1">
            {['#릴게임', '#릴게임릴킹', '#무료릴게임', '#슬롯게임', '#온라인릴게임', '#오락실게임', '#게임정보', '#게임가이드'].map((tag) => (
              <span key={tag} className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-slate-900/90 text-amber-300/90 border border-slate-800">
                {tag}
              </span>
            ))}
          </div>

          {/* Quick Search and Filter Bar */}
          <div className="pt-1 max-w-xl mx-auto px-1 sm:px-0">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
              <input
                id="search-game-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="게임명 또는 공략 키워드 검색..."
                className="w-full pl-10 sm:pl-12 pr-20 sm:pr-24 py-3 sm:py-3.5 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 shadow-inner"
              />
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 px-2 py-1 text-xs text-slate-400 hover:text-slate-100 bg-slate-800 rounded-md"
                >
                  지우기
                </button>
              ) : (
                <button
                  onClick={onScrollToGames}
                  className="absolute right-1.5 sm:right-2 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1 shrink-0"
                >
                  <Zap className="w-3.5 h-3.5" /> 탐색
                </button>
              )}
            </div>
          </div>

          {/* Key Trust Signals */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-300 px-1">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>9대 정통 오리지널 기판</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 shrink-0">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>모바일 100% 무설치 구동</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>3분 초고속 안심 출금</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xl mx-auto px-1 sm:px-0">
            {/* Primary prominent Play Button */}
            <a
              href="https://rg-53.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-slate-950 shrink-0" />
              <span>게임시작</span>
            </a>

            {/* Secondary Action Grid on Mobile */}
            <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:flex sm:gap-2">
              <button
                onClick={onScrollToGames}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all hover:border-slate-500 text-center whitespace-nowrap active:scale-95"
              >
                🎰 9대 게임
              </button>
              <button
                onClick={onScrollToGuide}
                className="px-3 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700/60 font-semibold text-xs sm:text-sm transition-all hover:border-slate-500 text-center whitespace-nowrap active:scale-95"
              >
                📖 정보 백과
              </button>
              <button
                onClick={onOpenCS}
                className="px-3 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700/60 font-semibold text-xs sm:text-sm transition-all hover:border-slate-500 text-center whitespace-nowrap active:scale-95"
              >
                💬 고객센터
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
