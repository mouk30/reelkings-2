import { useState } from 'react';
import { SEO_ARTICLES, GLOSSARY_TERMS } from '../data/seoContent';
import { SEOArticle, SEOArticleCategory } from '../types';
import { 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  Search, 
  FileText, 
  CheckCircle, 
  Sparkles,
  Award,
  AlertTriangle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

interface SEOContentSectionProps {
  externalSearchQuery?: string;
}

export function SEOContentSection({ externalSearchQuery = '' }: SEOContentSectionProps) {
  const [activeCategory, setActiveCategory] = useState<SEOArticleCategory>('all');
  const [selectedArticle, setSelectedArticle] = useState<SEOArticle | null>(SEO_ARTICLES[0]);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [articleSearchQuery, setArticleSearchQuery] = useState<string>('');

  const effectiveSearchQuery = (externalSearchQuery || articleSearchQuery).toLowerCase().trim();

  const categories: { id: SEOArticleCategory; label: string }[] = [
    { id: 'all', label: '전체 백과 & 정보글' },
    { id: 'intro', label: '릴게임 기초 & 역사' },
    { id: 'games', label: '9대 대표 기종 분석' },
    { id: 'strategy', label: '승률 & 환수율(RTP)' },
    { id: 'safety', label: '안전검증 & 먹튀예방' },
    { id: 'faq', label: '자주 묻는 질문 (FAQ)' }
  ];

  const filteredArticles = SEO_ARTICLES.filter(art => {
    const matchesCat = activeCategory === 'all' || art.category === activeCategory;
    const matchesQuery = !effectiveSearchQuery || 
      art.title.toLowerCase().includes(effectiveSearchQuery) ||
      art.summary.toLowerCase().includes(effectiveSearchQuery) ||
      art.keywords.some(k => k.toLowerCase().includes(effectiveSearchQuery));
    return matchesCat && matchesQuery;
  });

  const faqs = [
    {
      q: '릴게임릴킹은 어떤 게임 정보 공간인가요?',
      a: '릴게임릴킹은 추억의 오락실 감성과 온라인 릴게임의 재미를 한곳에서 확인할 수 있는 게임 정보 공간입니다. 인기 릴게임, 무료 릴게임, 슬롯게임, 온라인게임, 오락실게임 등 다양한 콘텐츠와 게임 이용 방법, 초보자 가이드, 최신 게임 소식을 알기 쉽게 제공하며 건전한 게임 이용 문화를 선도합니다.'
    },
    {
      q: '온라인 릴게임이란 무엇이며, 오프라인 오락실과 무엇이 다른가요?',
      a: '온라인 릴게임은 2000년대 오프라인 성인 아케이드 게임장을 풍미했던 바다이야기, 황금성, 오션파라다이스 등의 회전 릴 메커니즘과 고유의 예시(신호), 연타 시스템을 모바일 및 PC 온라인 환경으로 완벽하게 구현한 게임입니다. 오프라인과 달리 물리적 이동 없이 스마트폰과 PC에서 100% 무설치로 플레이 가능하며, 투명한 환수율(RTP 97~98.6%)과 신속한 실시간 정산이 강점입니다.'
    },
    {
      q: '인기 9대 릴게임 중 초보자에게 가장 추천하는 기종은 무엇인가요?',
      a: '초보자에게는 안정적인 배당 회수와 잦은 와일드 콤보를 자랑하는 "오션파라다이스"와 "체리마스터 97 레트로", "알라딘릴게임"을 추천합니다. 반면 고액 배당과 화려한 연타의 짜릿함을 선호하는 숙련자 및 하이롤러 유저에게는 "황금성릴게임", "바다이야기", "손오공릴게임", "야마토 골드함대"가 적합합니다.'
    },
    {
      q: '릴게임의 "예시"와 "연타"는 어떻게 확인하나요?',
      a: '예시(豫示)는 대박 당첨 직전 화면의 캐릭터 등장(예: 바다이야기 잠수함 사이렌 및 황금고래 유영, 황금성의 3단 황금열쇠 점등)이나 특수 배경음 변화를 통해 사전 암시됩니다. 예시 후 보너스 구간에 진입하면 1회 당첨으로 끝나지 않고 5회에서 최대 50회까지 연속 당첨이 터지는 연타(連打)가 진행됩니다.'
    },
    {
      q: '안전한 릴게임 사이트 판별 및 먹튀 예방 체크리스트는 무엇인가요?',
      a: '1) 정식 RNG(난수생성기) 시스템 탑재 여부, 2) SSL 256비트 금융 암호화 보안 적용, 3) 1회 고액 출금 시에도 5분 이내 무사고 처리되는 탄탄한 자본력, 4) 24시간 실시간 고객센터 및 텔레그램 소통 채널 운영, 5) 과도한 첫충전 미끼나 출금 시 환전 수수료 선입금을 요구하지 않는 정직한 운영 정책 등을 반드시 검증해야 합니다.'
    },
    {
      q: '모바일 환경(스마트폰/태블릿)에서도 동일하게 이용할 수 있나요?',
      a: '네, 릴게임릴킹에서 안내하는 모든 릴게임은 반응형 모바일 브라우저 최적화가 완료되어 별도의 APK 다운로드 없이 안드로이드(삼성 인터넷/크롬) 및 iOS(사파리)에서 가로/세로 모드 모두 60FPS 초고화질로 끊김 없이 이용하실 수 있습니다.'
    }
  ];

  return (
    <section id="seo-guide" className="py-16 bg-slate-950 border-t border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title & Description for Google SEO */}
        <div className="text-center max-w-3xl mx-auto space-y-3 px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>2026 OFFICIAL ENCYCLOPEDIA & STRATEGY</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white break-keep">
            릴게임 종합 정보 백과 & 실전 승률 공략
          </h2>
          <p className="text-slate-400 text-xs sm:text-base leading-relaxed break-keep">
            대한민국 릴게임의 역사부터 9대 기종별 예시 족보, 환수율(RTP) 극대화 노하우, 안전한 이용 수칙까지 구글 상위 1% 공인 전문 가이드를 제공합니다.
          </p>
        </div>

        {/* Featured Brand Statement & Healthy Gaming Culture Box (Direct Google Ranking Match) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900 to-amber-950/20 border border-amber-500/40 shadow-xl shadow-black/40 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  릴게임릴킹 | 추억과 낭만
                </h3>
                <span className="text-xs text-amber-400 font-medium">
                  추억의 오락실 감성과 온라인 릴게임의 재미를 한곳에서
                </span>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
              건전한 게임 이용 문화 준수
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-keep">
            릴게임릴킹은 추억의 오락실 감성과 온라인 릴게임의 재미를 한곳에서 확인할 수 있는 게임 정보 공간입니다. 인기 릴게임, 무료 릴게임, 슬롯게임, 온라인게임, 오락실게임 등 다양한 콘텐츠와 게임 이용 방법, 초보자 가이드, 최신 게임 소식을 알기 쉽게 제공합니다. 익숙한 추억과 새로운 즐거움을 동시에 경험하고 싶다면 릴게임릴킹에서 다양한 게임 정보와 콘텐츠를 만나보세요. 건전한 게임 이용 문화를 바탕으로 더욱 즐겁고 안전한 게임 생활을 위한 정보를 확인할 수 있습니다.
          </p>

          <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-amber-300">
            {['#릴게임', '#릴게임릴킹', '#무료릴게임', '#슬롯게임', '#온라인릴게임', '#오락실게임', '#온라인게임', '#게임정보', '#게임추천', '#추억의게임', '#게임가이드', '#최신게임정보'].map((hash) => (
              <span key={hash} className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-amber-500/20 text-slate-300 hover:text-amber-400 transition-colors">
                {hash}
              </span>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs & Article Search */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    // auto select first article in that cat
                    const first = SEO_ARTICLES.find(a => cat.id === 'all' || a.category === cat.id);
                    if (first) setSelectedArticle(first);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* In-article search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={articleSearchQuery}
                onChange={(e) => setArticleSearchQuery(e.target.value)}
                placeholder="정보글 키워드 검색..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Two-Pane Knowledge Base Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Pane: Article List (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-semibold text-slate-400 block mb-1">
                카테고리별 전문 정보글 ({filteredArticles.length}편)
              </span>

              <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      selectedArticle?.id === art.id
                        ? 'bg-slate-900 border-amber-500/60 shadow-lg shadow-amber-950/20'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold mb-1">
                      <span>{art.categoryName}</span>
                      <span className="text-slate-400 font-normal">{art.readTime}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {art.keywords.slice(0, 3).map((kw, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Pane: Selected In-Depth Article Reader (8 cols) */}
            <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
              {selectedArticle ? (
                <article className="space-y-6">
                  {/* Article Meta Header */}
                  <header className="border-b border-slate-800 pb-5 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                        {selectedArticle.categoryName}
                      </span>
                      <span className="text-slate-400">발행일: {selectedArticle.date}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">{selectedArticle.readTime}</span>
                    </div>

                    <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                      {selectedArticle.title}
                    </h1>

                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                      <strong>핵심 요약:</strong> {selectedArticle.summary}
                    </p>
                  </header>

                  {/* Article Content Sections */}
                  <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                    {selectedArticle.content.map((sec, idx) => (
                      <section key={idx} className="space-y-3">
                        <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                          <span className="w-1.5 h-4 rounded-full bg-amber-400" />
                          {sec.heading}
                        </h2>

                        {sec.body.map((p, pIdx) => (
                          <p key={pIdx} className="leading-relaxed text-slate-300">
                            {p}
                          </p>
                        ))}

                        {/* Highlight Quote Box if exists */}
                        {sec.highlight && (
                          <div className="p-3.5 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 text-amber-200 text-xs sm:text-sm font-medium italic">
                            💡 {sec.highlight}
                          </div>
                        )}

                        {/* Bullet Points if exists */}
                        {sec.bulletPoints && (
                          <ul className="space-y-1.5 pt-1">
                            {sec.bulletPoints.map((bp, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm">
                                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{bp}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Structured Table if exists */}
                        {sec.table && (
                          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80 my-3">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead className="bg-slate-900 text-amber-300 border-b border-slate-800 font-bold">
                                <tr>
                                  {sec.table.headers.map((h, hIdx) => (
                                    <th key={hIdx} className="p-2.5 sm:p-3">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                                {sec.table.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-slate-900/40">
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className={`p-2.5 sm:p-3 ${cIdx === 0 ? 'font-bold text-white' : ''}`}>
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </section>
                    ))}
                  </div>

                  {/* Related Keywords & Tags */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-400 font-semibold">구글 검색 추천 태그:</span>
                    {selectedArticle.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-800 text-amber-300 border border-slate-700"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </article>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  정보글을 선택해주세요.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 9-Game Comparison & Specification Table */}
        <div id="strategy-section" className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">
              9대 공식 릴게임 환수율(RTP) 및 스펙 비교표
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            기종별 통계적 환수율과 당첨 변동성, 고유 예시 시그널을 한눈에 비교하여 본인의 배팅 성향에 맞는 최적의 릴게임을 선택하세요.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-bold">
                <tr>
                  <th className="p-3.5">슬롯 / 기종명</th>
                  <th className="p-3.5">카테고리</th>
                  <th className="p-3.5">환수율 (RTP)</th>
                  <th className="p-3.5">변동성</th>
                  <th className="p-3.5">핵심 예시 & 족보</th>
                  <th className="p-3.5">추천 유저 유형</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-white">#1 황금성릴게임</td>
                  <td className="p-3.5">정통 릴게임</td>
                  <td className="p-3.5 text-amber-400 font-bold font-mono">98.6% (최고)</td>
                  <td className="p-3.5 text-rose-400 font-semibold">초고변동</td>
                  <td className="p-3.5">황금열쇠 3개 결합 시 최고 40연타</td>
                  <td className="p-3.5 text-slate-400">대박 잭팟 노리는 하이롤러</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-white">#2 바다이야기</td>
                  <td className="p-3.5">바다 시리즈</td>
                  <td className="p-3.5 text-amber-400 font-bold font-mono">98.2%</td>
                  <td className="p-3.5 text-amber-400 font-semibold">높음</td>
                  <td className="p-3.5">잠수함 사이렌 3회 후 황금고래 등장 50연타</td>
                  <td className="p-3.5 text-slate-400">전통 아케이드 매니아</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-white">#3 오션파라다이스</td>
                  <td className="p-3.5">바다 시리즈</td>
                  <td className="p-3.5 text-amber-400 font-bold font-mono">97.9%</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">보통</td>
                  <td className="p-3.5">샤크 와일드 콤보 & 산호초 프리 스핀</td>
                  <td className="p-3.5 text-slate-400">자본 안정성 중시 유저</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-white">#4 죠스급 초대형 상어 (백경)</td>
                  <td className="p-3.5">바다 시리즈</td>
                  <td className="p-3.5 text-amber-400 font-bold font-mono">98.4%</td>
                  <td className="p-3.5 text-rose-400 font-semibold">높음</td>
                  <td className="p-3.5">심해 죠스 상어 급습 & 모비딕 45연타</td>
                  <td className="p-3.5 text-slate-400">집중 배팅 승부사</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-white">#5 손오공릴게임</td>
                  <td className="p-3.5">신화·판타지</td>
                  <td className="p-3.5 text-amber-400 font-bold font-mono">98.2%</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">보통</td>
                  <td className="p-3.5">여의봉 난무 30연타 및 근두운 돌발 예시</td>
                  <td className="p-3.5 text-slate-400">저자본 분할 배팅 유저</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-white">#6 야마토 골드함대</td>
                  <td className="p-3.5">정통 릴게임</td>
                  <td className="p-3.5 text-amber-400 font-bold font-mono">98.5%</td>
                  <td className="p-3.5 text-rose-400 font-semibold">초고변동</td>
                  <td className="p-3.5">황금 함대 출격 & 파동포 연타 시퀀스 35연타</td>
                  <td className="p-3.5 text-slate-400">스릴 넘치는 SF 연출 매니아</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-white">#7 신천지 골든 드래곤</td>
                  <td className="p-3.5">신화·판타지</td>
                  <td className="p-3.5 text-amber-400 font-bold font-mono">97.8%</td>
                  <td className="p-3.5 text-rose-400 font-semibold">초고변동</td>
                  <td className="p-3.5">여의주 승천 및 쌍룡 출현 32연타</td>
                  <td className="p-3.5 text-slate-400">화려한 비주얼 연출 선호</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-white">#8 알라딘릴게임</td>
                  <td className="p-3.5">신화·판타지</td>
                  <td className="p-3.5 text-amber-400 font-bold font-mono">97.7%</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">안정</td>
                  <td className="p-3.5">매직 램프 지니 소원 25연타</td>
                  <td className="p-3.5 text-slate-400">릴게임 입문 초보자</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-white">#9 체리마스터 97 레트로</td>
                  <td className="p-3.5">클래식 레트로</td>
                  <td className="p-3.5 text-amber-400 font-bold font-mono">98.0%</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">안정</td>
                  <td className="p-3.5">8라인 격자 올체리/올세븐 20연타</td>
                  <td className="p-3.5 text-slate-400">레트로 777 오락실 선호</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Reel Game Glossary (용어 사전) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">
              릴게임 필수 용어 사전 (Glossary)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            초보 플레이어가 꼭 알아야 할 릴게임 전문 용어 해설입니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {GLOSSARY_TERMS.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-sm font-bold text-amber-300">
                  {item.term}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Anti-Scam Guide Section */}
        <div id="safe-verification" className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-amber-500/30 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">
              안전한 릴게임 이용 & 먹튀 방지 5대 원칙
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            건전하고 안전한 온라인 릴게임을 즐기기 위해 반드시 확인해야 할 공정성 체크리스트입니다. 릴게임릴킹은 오직 검증된 정식 라이선스 플랫폼만을 안내합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> 1. 정식 난수 생성기 (RNG) 검증
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                모든 릴 회전과 당첨 확률은 기계적 조작 없이 국제 공인 RNG 알고리즘을 거치는지 확인하세요.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> 2. 1회 고액 당첨금 무사고 출금
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                잭팟 당첨 시 불필요한 롤링 강요나 지연 없이 5분 이내 입출금이 완료되는 탄탄한 자본력을 확인하세요.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> 3. 환전 수수료 선입금 사기 주의
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                당첨금 출금을 위해 추가 선입금을 요구하거나 환전 보증금을 요구하는 사이트는 100% 사기입니다.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> 4. 24시간 실시간 고객센터
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                언제든지 문제 발생 시 1:1 상담 및 공식 텔레그램을 통해 1분 이내 빠른 답변을 제공하는지 점검하세요.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Accordion (For Google FAQ Schema Rich Snippets) */}
        <div id="faq-section" className="space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">
              자주 묻는 질문 (FAQ)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            구글 이용자들이 가장 많이 질문하는 릴게임 핵심 Q&A를 엄선하여 안내합니다.
          </p>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 text-sm font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-mono">
                        Q{idx + 1}
                      </span>
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
