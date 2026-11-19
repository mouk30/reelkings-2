import { Sparkles, ArrowUp, ShieldAlert, HeartHandshake } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* Top SEO Keyword Ribbon */}
      <div className="border-b border-slate-850 py-4 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span className="font-semibold text-amber-400">인기 게임 태그:</span>
          <div className="flex flex-wrap gap-2 text-slate-400">
            {['#릴게임', '#릴게임릴킹', '#무료릴게임', '#슬롯게임', '#온라인릴게임', '#오락실게임', '#온라인게임', '#게임정보', '#게임추천', '#추억의게임', '#게임가이드', '#최신게임정보'].map((tag, idx) => (
              <span key={tag} className="flex items-center gap-2">
                <span className="hover:text-amber-400 cursor-pointer">{tag}</span>
                {idx < 11 && <span>•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg overflow-hidden border border-amber-400/40 shrink-0 bg-slate-950 p-0.5">
                <img src="/favicon.png" alt="대왕고래 엠블럼" className="w-full h-full object-cover rounded-md" referrerPolicy="no-referrer" />
              </div>
              <span className="text-base font-black text-white">릴게임릴킹</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              릴게임릴킹은 추억의 오락실 감성과 온라인 릴게임의 재미를 한곳에서 확인할 수 있는 게임 정보 공간입니다. 인기 릴게임, 무료 릴게임, 슬롯게임, 온라인게임, 오락실게임 등 다양한 콘텐츠와 게임 이용 방법, 초보자 가이드를 제공합니다.
            </p>
          </div>

          {/* Col 2: 9 Reel Games Quick Links */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              대표 인기 기종
            </span>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li><a href="#games-grid" className="hover:text-amber-400 transition-colors font-semibold text-amber-300">1. 뽀빠이 릴게임 (신규)</a></li>
              <li><a href="#games-grid" className="hover:text-amber-400 transition-colors font-semibold text-emerald-300">2. 정글북 자연빵 (300만)</a></li>
              <li><a href="#games-grid" className="hover:text-amber-400 transition-colors font-semibold text-rose-300">3. 릴천지 (14종 올인원)</a></li>
              <li><a href="#games-grid" className="hover:text-amber-400 transition-colors">4. 황금성릴게임</a></li>
              <li><a href="#games-grid" className="hover:text-amber-400 transition-colors">5. 바다이야기</a></li>
              <li><a href="#games-grid" className="hover:text-amber-400 transition-colors">6. 오션파라다이스</a></li>
              <li><a href="#games-grid" className="hover:text-amber-400 transition-colors">7. 죠스급 초대형 상어</a></li>
              <li><a href="#games-grid" className="hover:text-amber-400 transition-colors">8. 손오공 릴게임</a></li>
              <li><a href="#games-grid" className="hover:text-amber-400 transition-colors">9. 야마토 골드함대</a></li>
              <li><a href="#games-grid" className="hover:text-amber-400 transition-colors">10. 신천지 골든 드래곤</a></li>
              <li><a href="#games-grid" className="hover:text-amber-400 transition-colors">11. 알라딘릴게임</a></li>
              <li><a href="#games-grid" className="hover:text-amber-400 transition-colors">12. 체리마스터 97 레트로</a></li>
            </ul>
          </div>

          {/* Col 3: SEO Guide & Strategy */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              공략 및 이용 가이드
            </span>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li><a href="#seo-guide" className="hover:text-amber-400 transition-colors">릴게임의 역사와 원리</a></li>
              <li><a href="#strategy-section" className="hover:text-amber-400 transition-colors">환수율(RTP) 98% 배팅 공략</a></li>
              <li><a href="#safe-verification" className="hover:text-amber-400 transition-colors">안전 사이트 먹튀 판별법</a></li>
              <li><a href="#faq-section" className="hover:text-amber-400 transition-colors">자주 묻는 질문 FAQ</a></li>
              <li><a href="#games-grid" className="hover:text-amber-400 transition-colors">무료 데모 스핀 체험</a></li>
            </ul>
          </div>

          {/* Col 4: Responsible Gaming & Notice */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              건전한 오락 문화 준수
            </span>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] leading-relaxed text-slate-400 space-y-1.5">
              <div className="text-amber-300 font-bold flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>19세 이상 이용 가능 (청소년 이용불가)</span>
              </div>
              <p>
                본 사이트에서 제공하는 정보는 건전한 오락 및 게임 가이드 목적이며, 과도한 몰입은 일상생활에 지장을 줄 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© 2026 릴게임릴킹 (REEL KINGS). All rights reserved. 추억과 낭만의 릴게임 종합 정보 공간.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 text-xs font-semibold transition-all"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>맨 위로 이동</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
