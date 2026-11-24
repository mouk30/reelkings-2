import { useState } from 'react';
import { navigateTo } from '../utils/seo';
import { 
  Sparkles, 
  ShieldCheck, 
  Send, 
  Users, 
  HelpCircle,
  Menu,
  X,
  Volume2,
  Play
} from 'lucide-react';

interface HeaderProps {
  onOpenCS: () => void;
}

export function Header({ onOpenCS }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (target === '/') {
      navigateTo('/');
      return;
    }
    if (target.startsWith('/#')) {
      const id = target.slice(2);
      if (window.location.pathname !== '/') {
        navigateTo('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    navigateTo(target);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Top Notification Ticker Bar */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border-b border-amber-500/20 px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden min-w-0">
            <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-bold text-amber-400 shrink-0 flex items-center gap-1 text-[11px] sm:text-xs">
              <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> [실시간 공지]
            </span>
            <div className="text-slate-300 truncate text-[11px] sm:text-xs">
              황금성 3번 슬롯 슈퍼연타 보너스 진행중 | 전 기종 정상 가동중
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-400 text-xs shrink-0">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Users className="w-3.5 h-3.5" /> 실시간 접속자: <strong className="text-slate-100">3,842명</strong>
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> SSL 256bit 공정성 검증 완료
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="flex items-center gap-2 sm:gap-3 group shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl overflow-hidden shadow-lg shadow-amber-500/20 border border-amber-400/50 group-hover:scale-105 transition-transform duration-200 shrink-0 bg-slate-950 flex items-center justify-center p-0.5">
            <img src="/favicon.png" alt="릴게임릴킹 대왕고래 파비콘" className="w-full h-full object-cover rounded-md sm:rounded-lg" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white font-sans whitespace-nowrap">
                릴게임릴킹
              </span>
              <span className="hidden xs:inline-block text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase tracking-wider whitespace-nowrap">
                REEL KINGS
              </span>
            </div>
            <span className="hidden sm:block text-[10px] text-slate-400 font-medium tracking-wide whitespace-nowrap">
              추억과 낭만의 릴게임 종합 정보 공간
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium">
          <a 
            href="/games" 
            onClick={(e) => handleNavClick(e, window.location.pathname === '/' ? '/#games-grid' : '/games')}
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
          >
            9대 릴게임
          </a>
          <a 
            href="/guides" 
            onClick={(e) => handleNavClick(e, window.location.pathname === '/' ? '/#seo-guide' : '/guides')}
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
          >
            릴게임 백과사전
          </a>
          <a 
            href="/#strategy-section" 
            onClick={(e) => handleNavClick(e, '/#strategy-section')}
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
          >
            기종 스펙 & 환수율
          </a>
          <a 
            href="/#safe-verification" 
            onClick={(e) => handleNavClick(e, '/#safe-verification')}
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
          >
            먹튀 검증안내
          </a>
          <a 
            href="/faq" 
            onClick={(e) => handleNavClick(e, window.location.pathname === '/' ? '/#faq-section' : '/faq')}
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Direct Game Start CTA */}
          <a
            id="btn-header-play"
            href="https://rg-53.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 whitespace-nowrap shrink-0 active:scale-95"
          >
            <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-slate-950 shrink-0" />
            <span>게임시작</span>
          </a>

          {/* Customer Service / Telegram CTA */}
          <button
            id="btn-header-cs"
            onClick={onOpenCS}
            className="inline-flex items-center gap-1.5 p-2 sm:px-3.5 sm:py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all whitespace-nowrap shrink-0 active:scale-95"
            title="24시간 고객센터"
            aria-label="24시간 고객센터"
          >
            <Send className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">24시간 고객센터</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 shrink-0"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-5 space-y-2">
          <a
            href="https://rg-53.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-sm font-bold flex items-center justify-center gap-2 shadow-md"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>게임시작</span>
          </a>
          <a
            href="/games"
            onClick={(e) => handleNavClick(e, window.location.pathname === '/' ? '/#games-grid' : '/games')}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 text-sm font-medium"
          >
            🎰 9대 대표 릴게임
          </a>
          <a
            href="/guides"
            onClick={(e) => handleNavClick(e, window.location.pathname === '/' ? '/#seo-guide' : '/guides')}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 text-sm font-medium"
          >
            📖 릴게임 백과사전 & 역사
          </a>
          <a
            href="/#strategy-section"
            onClick={(e) => handleNavClick(e, '/#strategy-section')}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 text-sm font-medium"
          >
            💡 기종 스펙 & 환수율(RTP)
          </a>
          <a
            href="/#safe-verification"
            onClick={(e) => handleNavClick(e, '/#safe-verification')}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 text-sm font-medium"
          >
            🛡️ 안전 사이트 판별 수칙
          </a>
          <a
            href="/faq"
            onClick={(e) => handleNavClick(e, window.location.pathname === '/' ? '/#faq-section' : '/faq')}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 text-sm font-medium"
          >
            ❓ 자주 묻는 질문 (FAQ)
          </a>
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCS();
              }}
              className="w-full py-2.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-md"
            >
              <HelpCircle className="w-4 h-4" /> 24시간 1:1 상담 문의
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
