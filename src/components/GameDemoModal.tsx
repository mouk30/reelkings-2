import { useState, useEffect } from 'react';
import { ReelGameItem } from '../types';
import { 
  X, 
  Play, 
  RotateCw, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Trophy, 
  Flame, 
  Coins, 
  ExternalLink,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';

interface GameDemoModalProps {
  game: ReelGameItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const SYMBOLS = ['🍒', '🔔', '🍇', '🐳', '🔑', '👑', '7️⃣'];

export function GameDemoModal({
  game,
  isOpen,
  onClose
}: GameDemoModalProps) {
  const [credits, setCredits] = useState<number>(100000);
  const [bet, setBet] = useState<number>(1000);
  const [reels, setReels] = useState<string[]>(['🐳', '👑', '7️⃣']);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winMessage, setWinMessage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [consecutiveWins, setConsecutiveWins] = useState<number>(0);

  useEffect(() => {
    if (game) {
      setWinMessage(null);
      setConsecutiveWins(0);
    }
  }, [game]);

  if (!isOpen || !game) return null;

  const handleSpin = () => {
    if (isSpinning || credits < bet) return;

    setCredits(prev => prev - bet);
    setIsSpinning(true);
    setWinMessage(null);

    // Simulate reel spinning cycle
    let ticks = 0;
    const interval = setInterval(() => {
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      ]);
      ticks++;

      if (ticks > 12) {
        clearInterval(interval);
        
        // Determine outcome with high win rate for demo excitement
        const isWin = Math.random() < 0.65;
        let finalReels: string[];

        if (isWin) {
          const winSym = Math.random() < 0.3 ? '7️⃣' : (Math.random() < 0.5 ? '🐳' : '🔑');
          finalReels = [winSym, winSym, winSym];
          const multiplier = winSym === '7️⃣' ? 50 : (winSym === '🐳' ? 30 : 15);
          const winAmount = bet * multiplier;

          setReels(finalReels);
          setCredits(prev => prev + winAmount);
          setConsecutiveWins(prev => prev + 1);
          setWinMessage(`🎉 축하합니다! [${winSym} ${winSym} ${winSym}] 잭팟 획득! +₩${winAmount.toLocaleString()}원!`);
        } else {
          finalReels = [
            SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
            SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
            SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
          ];
          setReels(finalReels);
          setWinMessage('아쉽습니다! 다음 스핀에 대박 예시가 임박했습니다.');
        }

        setIsSpinning(false);
      }
    }, 90);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        id="game-demo-modal"
        className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-6"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-amber-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center">
              #{game.slotIndex}
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                {game.title}
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                  RTP {game.rtp}%
                </span>
              </h2>
              <span className="text-xs text-amber-400/80">{game.subtitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title={isMuted ? '소리 켜기' : '소리 끄기'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Game Interactive Reel Simulator Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 shadow-inner space-y-4">
            {/* Header in game */}
            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>보유 가상 크레딧:</span>
                <strong className="text-amber-300 font-mono text-sm">₩{credits.toLocaleString()}</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">연타 콤보:</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                  {consecutiveWins}연타
                </span>
              </div>
            </div>

            {/* 3 Slot Reel Machine Window */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950 rounded-xl border-2 border-amber-500/50 shadow-2xl relative">
              {reels.map((symbol, idx) => (
                <div
                  key={idx}
                  className={`aspect-square rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-4xl sm:text-6xl select-none shadow-md transition-all ${
                    isSpinning ? 'blur-[1px] scale-95 animate-pulse' : 'scale-100'
                  }`}
                >
                  {symbol}
                </div>
              ))}

              {/* Payline overlay line */}
              <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-0.5 bg-amber-400/40 pointer-events-none" />
            </div>

            {/* Win Alert / Message Banner */}
            {winMessage && (
              <div className={`p-3 rounded-xl text-center text-xs sm:text-sm font-bold animate-fade-in ${
                winMessage.includes('축하') 
                  ? 'bg-amber-500/20 border border-amber-500 text-amber-300' 
                  : 'bg-slate-800 text-slate-300 border border-slate-700'
              }`}>
                {winMessage}
              </div>
            )}

            {/* Spin Controls & Bet selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">스핀 베팅금:</span>
                {[500, 1000, 5000].map((amount) => (
                  <button
                    key={amount}
                    disabled={isSpinning}
                    onClick={() => setBet(amount)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-colors ${
                      bet === amount
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    ₩{amount.toLocaleString()}
                  </button>
                ))}
              </div>

              <button
                disabled={isSpinning}
                onClick={handleSpin}
                className={`px-8 py-3 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg transition-all ${
                  isSpinning
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 hover:scale-105 shadow-amber-500/30'
                }`}
              >
                <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isSpinning ? '릴 회전중...' : '스핀 돌리기 (SPIN)'}</span>
              </button>
            </div>
          </div>

          {/* Game Detailed Information & Strategy Section */}
          <div className="space-y-4">
            {/* Poster Artwork Showcase */}
            <div className="w-full max-w-sm mx-auto aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
              <img
                src={game.imageUrl}
                alt={game.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              {game.title} 게임 가이드 및 공략 족보
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {game.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400">핵심 예시 및 특수 연타</span>
                <ul className="space-y-1">
                  {game.features.map((feat, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400">기종 스펙 정보</span>
                <div className="text-xs text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">환수율 (RTP):</span>
                    <strong className="text-amber-400 font-mono">{game.rtp}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">변동성 등급:</span>
                    <span className="font-semibold text-slate-200">{game.volatility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">현재 누적 잭팟:</span>
                    <strong className="text-amber-400 font-mono">₩{game.jackpotAmount.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>정식 라이선스 인증 아케이드 엔진</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              창 닫기
            </button>
            <a
              href={game.targetUrl || 'http://rgb285.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              <span>게임 시작</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
