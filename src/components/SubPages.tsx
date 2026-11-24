import { ReelGameItem, SEOArticle } from '../types';
import { SEO_ARTICLES, GLOSSARY_TERMS } from '../data/seoContent';
import { navigateTo } from '../utils/seo';
import {
  ChevronRight,
  Home,
  Play,
  Sparkles,
  ShieldCheck,
  Coins,
  TrendingUp,
  CheckCircle,
  BookOpen,
  HelpCircle,
  ArrowLeft,
  FileText,
  Scale,
  AlertTriangle
} from 'lucide-react';

function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mb-6">
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigateTo('/');
        }}
        className="inline-flex items-center gap-1 hover:text-amber-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>홈</span>
      </a>
      {items.map((item, idx) => (
        <span key={idx} className="inline-flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          {item.href ? (
            <a
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(item.href!);
              }}
              className="hover:text-amber-400 transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-amber-300 font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function GamesIndexPage({
  games,
  onOpenDetails
}: {
  games: ReelGameItem[];
  onOpenDetails: (game: ReelGameItem) => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <div>
        <Breadcrumb items={[{ label: '릴게임 라인업' }]} />
        <div className="space-y-3 border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>OFFICIAL 12 REEL GAME DIRECTORY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            인기 릴게임 12종 전체 라인업 및 스펙 비교
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            황금성릴게임, 바다이야기, 손오공 릴게임, 야마토 골드함대 등 릴게임릴킹이 정리한 공식 12종 기종의 환수율(RTP), 변동성, 예시 신호 및 초보자 가이드를 기종별로 확인하세요.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <article
            key={game.id}
            className="bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col"
          >
            <a
              href={`/games/${game.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(`/games/${game.slug}`);
              }}
              className="aspect-square w-full bg-slate-950 block overflow-hidden"
            >
              <img
                src={game.imageUrl}
                alt={`${game.title} - ${game.subtitle}`}
                className="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </a>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-semibold text-amber-400">{game.categoryLabel}</span>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-slate-800 px-2 py-0.5 rounded">
                    RTP {game.rtp}%
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white">
                  <a
                    href={`/games/${game.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(`/games/${game.slug}`);
                    }}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {game.title}
                  </a>
                </h2>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{game.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <a
                  href={`/games/${game.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`/games/${game.slug}`);
                  }}
                  className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs text-center transition-colors"
                >
                  상세 가이드 보기
                </a>
                <button
                  onClick={() => onOpenDetails(game)}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
                >
                  무료 데모 체험
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function GameDetailPage({
  game,
  allGames,
  onOpenDetails
}: {
  game: ReelGameItem;
  allGames: ReelGameItem[];
  onOpenDetails: (game: ReelGameItem) => void;
}) {
  const related = allGames.filter((g) => g.slug !== game.slug).slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <div>
        <Breadcrumb
          items={[
            { label: '릴게임 라인업', href: '/games' },
            { label: game.title }
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="md:col-span-5">
            <div className="aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
              <img
                src={game.imageUrl}
                alt={`${game.title} - ${game.subtitle}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                #{game.slotIndex} {game.categoryLabel}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                {game.badge}
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {game.title}
              </h1>
              <p className="text-sm sm:text-base text-amber-400 font-semibold mt-1">
                {game.subtitle}
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {game.description}
            </p>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">환수율 (RTP)</span>
                <strong className="text-amber-400 font-mono text-sm sm:text-base">{game.rtp}%</strong>
              </div>
              <div>
                <span className="text-slate-400 block">변동성 등급</span>
                <strong className="text-white text-sm sm:text-base flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                  {game.volatility}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block">누적 잭팟</span>
                <strong className="text-emerald-400 font-mono text-sm sm:text-base flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" />
                  ₩{(game.jackpotAmount / 10000).toLocaleString()}만
                </strong>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-bold text-white">핵심 예시 및 보너스 특징</h2>
              <ul className="space-y-1.5">
                {game.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={game.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[160px] py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>게임 바로가기</span>
              </a>
              <button
                onClick={() => onOpenDetails(game)}
                className="flex-1 min-w-[160px] py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-sm transition-colors"
              >
                무료 데모 체험하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Games */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">함께 많이 찾는 추천 릴게임</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {related.map((item) => (
            <a
              key={item.id}
              href={`/games/${item.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(`/games/${item.slug}`);
              }}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all space-y-2"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white truncate">{item.title}</h3>
                <span className="text-[11px] text-amber-400 font-mono">RTP {item.rtp}%</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export function GuidesIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <div>
        <Breadcrumb items={[{ label: '릴게임 백과 & 가이드' }]} />
        <div className="space-y-3 border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>REEL KINGS ENCYCLOPEDIA</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            릴게임 백과사전 및 실전 이용 가이드
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            온라인 릴게임의 기본 원리부터 기종별 환수율 비교, 시드머니 분할 관리, 안전 사이트 검증 수칙까지 핵심 정보글을 확인하세요.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {SEO_ARTICLES.map((art) => (
          <article
            key={art.id}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all space-y-3"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                {art.categoryName}
              </span>
              <span>발행일: {art.date}</span>
              <span>•</span>
              <span>{art.readTime}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              <a
                href={`/guides/${art.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(`/guides/${art.slug}`);
                }}
                className="hover:text-amber-400 transition-colors"
              >
                {art.title}
              </a>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{art.summary}</p>
            <div className="pt-1">
              <a
                href={`/guides/${art.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(`/guides/${art.slug}`);
                }}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <span>전체 가이드 읽기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function GuideDetailPage({ article }: { article: SEOArticle }) {
  const others = SEO_ARTICLES.filter((a) => a.slug !== article.slug);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <div>
        <Breadcrumb
          items={[
            { label: '백과 & 가이드', href: '/guides' },
            { label: article.categoryName }
          ]}
        />

        <article className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
          <header className="border-b border-slate-800 pb-5 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                {article.categoryName}
              </span>
              <span className="text-slate-400">발행일: {article.date}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{article.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              {article.title}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <strong>핵심 요약:</strong> {article.summary}
            </p>
          </header>

          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            {article.content.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-amber-400 flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-amber-400" />
                  {sec.heading}
                </h2>
                {sec.body.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed text-slate-300">
                    {p}
                  </p>
                ))}
                {sec.highlight && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 text-amber-200 text-xs sm:text-sm font-medium italic">
                    💡 {sec.highlight}
                  </div>
                )}
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
                {sec.table && (
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80 my-3">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-900 text-amber-300 border-b border-slate-800 font-bold">
                        <tr>
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-900/40">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className={`p-3 ${cIdx === 0 ? 'font-bold text-white' : ''}`}>
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
        </article>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">다른 공략 및 정보글</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {others.map((art) => (
            <a
              key={art.id}
              href={`/guides/${art.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(`/guides/${art.slug}`);
              }}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all"
            >
              <span className="text-[11px] text-amber-400 font-semibold">{art.categoryName}</span>
              <h3 className="text-sm font-bold text-white mt-1 line-clamp-2">{art.title}</h3>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export function FaqPage() {
  const faqs = [
    {
      q: '릴게임릴킹은 어떤 게임 정보 공간인가요?',
      a: '릴게임릴킹은 추억의 오락실 감성과 온라인 릴게임의 재미를 한곳에서 확인할 수 있는 게임 정보 공간입니다. 인기 릴게임, 무료 릴게임, 슬롯게임, 온라인게임, 오락실게임 등 다양한 콘텐츠와 이용 방법, 초보자 가이드를 제공합니다.'
    },
    {
      q: '온라인 릴게임이란 무엇이며 오프라인 오락실과 무엇이 다른가요?',
      a: '온라인 릴게임은 바다이야기, 황금성, 오션파라다이스 등 정통 아케이드의 회전 릴 메커니즘과 예시·연타 시스템을 웹 표준 환경으로 구현한 게임입니다. 스마트폰과 PC에서 별도 설치 없이 바로 실행할 수 있습니다.'
    },
    {
      q: '초보자에게 가장 추천하는 기종은 무엇인가요?',
      a: '안정적인 배당 흐름을 선호하는 입문자에게는 오션파라다이스, 체리마스터 97 레트로, 알라딘릴게임이 적합하며, 높은 변동성과 대형 연타를 선호한다면 황금성릴게임, 바다이야기, 야마토 골드함대가 잘 맞습니다.'
    },
    {
      q: '릴게임의 예시와 연타는 무엇인가요?',
      a: '예시는 보너스 구간 진입 전 캐릭터 출현이나 사운드 변화로 사전 신호를 알리는 연출이며, 연타는 보너스 진입 후 5회~50회까지 연속 당첨이 이어지는 릴게임 고유의 보상 구조입니다.'
    },
    {
      q: '안전한 릴게임 이용을 위한 확인 기준은 무엇인가요?',
      a: '정식 RNG(난수생성기) 탑재 여부, SSL 256비트 보안 적용, 환전 수수료 선입금을 요구하지 않는 투명한 운영 정책, 24시간 실시간 문의 채널 여부를 반드시 확인해야 합니다.'
    },
    {
      q: '모바일 환경에서도 동일하게 이용할 수 있나요?',
      a: '네, 모든 콘텐츠는 안드로이드 및 iOS 모바일 브라우저에 반응형으로 최적화되어 별도의 APK 설치 없이 원활하게 이용하실 수 있습니다.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <div>
        <Breadcrumb items={[{ label: '자주 묻는 질문 (FAQ)' }]} />
        <div className="space-y-3 border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ & GLOSSARY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            자주 묻는 질문(FAQ) 및 릴게임 용어 사전
          </h1>
          <p className="text-sm text-slate-300">
            초보자가 가장 궁금해하는 릴게임 이용 방법, 용어 해설, 안전 이용 수칙을 한곳에 모았습니다.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">핵심 질문과 답변</h2>
        <div className="space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-amber-300">
                Q{idx + 1}. {item.q}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">릴게임 필수 용어 사전</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GLOSSARY_TERMS.map((g, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <h3 className="text-sm font-bold text-amber-400">{g.term}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{g.meaning}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <Breadcrumb items={[{ label: '개인정보처리방침' }]} />
      <article className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <header className="border-b border-slate-800 pb-4 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>PRIVACY POLICY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">개인정보처리방침</h1>
          <p className="text-xs text-slate-400">시행일: 2026년 11월 24일</p>
        </header>

        <section className="space-y-2 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-amber-300">1. 비회원 정보 제공 포털 운영 원칙</h2>
          <p>
            릴게임릴킹은 별도의 회원가입, 로그인, 결제 기능을 운영하지 않는 순수 게임 정보 안내 포털입니다. 이용자의 성명, 주민등록번호, 연락처, 계좌정보 등 개인식별정보를 서버 데이터베이스에 수집하거나 저장하지 않습니다.
          </p>
        </section>

        <section className="space-y-2 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-amber-300">2. 자동 수집 항목 및 쿠키 안내</h2>
          <p>
            서비스 접속 안정성과 보안 유지(트래픽 보호 및 SSL 암호화 통신)를 위해 브라우저 기본 접속 로그가 보안 네트워크 레벨에서 일시적으로 처리될 수 있으며, 광고성 추적이나 제3자 판매 목적의 개인정보 수집은 일절 수행하지 않습니다.
          </p>
        </section>

        <section className="space-y-2 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-amber-300">3. 외부 링크 이동 시 유의사항</h2>
          <p>
            본 사이트 내에 포함된 외부 안내 링크를 통해 타 사이트로 이동하실 경우, 해당 외부 사이트의 개인정보처리방침이 적용되므로 이용 전 각 사이트의 정책을 확인하시기 바랍니다.
          </p>
        </section>
      </article>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <Breadcrumb items={[{ label: '이용약관' }]} />
      <article className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <header className="border-b border-slate-800 pb-4 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold">
            <Scale className="w-4 h-4" />
            <span>TERMS OF SERVICE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">이용약관 및 건전한 게임 이용 안내</h1>
          <p className="text-xs text-slate-400">시행일: 2026년 11월 24일</p>
        </header>

        <section className="space-y-2 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-amber-300">제1조 (목적 및 서비스 성격)</h2>
          <p>
            릴게임릴킹은 추억의 아케이드 오락실 감성과 온라인 릴게임·슬롯게임 기종 정보, 용어 해설, 이용 가이드 및 건전한 여가 문화를 안내하는 정보 제공 공간입니다.
          </p>
        </section>

        <section className="space-y-2 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-amber-300">제2조 (이용 연령 제한)</h2>
          <p>
            본 사이트가 제공하는 릴게임 및 아케이드 관련 정보는 만 19세 이상 성인을 대상으로 하며, 청소년의 이용을 제한합니다.
          </p>
        </section>

        <section className="space-y-2 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-amber-300">제3조 (건전한 이용 및 면책)</h2>
          <p>
            사이트 내 표기된 기종별 환수율(RTP), 예시 패턴 및 무료 데모 시뮬레이션은 이해를 돕기 위한 정보 제공 목적이며, 과도한 몰입을 지양하고 건전한 여가 활동 범위 내에서 이용하실 것을 권장합니다.
          </p>
        </section>
      </article>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">404 NOT FOUND</span>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          요청하신 주소가 변경되었거나 존재하지 않는 페이지입니다. 아래 버튼을 통해 메인 페이지 또는 주요 가이드로 이동해 주세요.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/');
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>메인으로 돌아가기</span>
        </a>
        <a
          href="/games"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/games');
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm transition-colors"
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>전체 릴게임 보기</span>
        </a>
      </div>
    </div>
  );
}
