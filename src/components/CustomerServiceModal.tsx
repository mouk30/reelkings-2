import { useState } from 'react';
import { 
  X, 
  Send, 
  Copy, 
  Check, 
  ShieldCheck, 
  Headphones, 
  MessageSquare,
  Clock,
  ExternalLink
} from 'lucide-react';

interface CustomerServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerServiceModal({ isOpen, onClose }: CustomerServiceModalProps) {
  const [copiedTelegram, setCopiedTelegram] = useState<boolean>(false);
  const [inquiryText, setInquiryText] = useState<string>('');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyTelegram = () => {
    navigator.clipboard.writeText('@goldenreel24');
    setCopiedTelegram(true);
    setTimeout(() => setCopiedTelegram(false), 2000);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquiryText('');
      setInquirySubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        id="cs-modal"
        className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                릴게임릴킹 24시간 실시간 고객센터
              </h2>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                전문 상담원 24시간 즉시대기 중 (평균응답 1분 이내)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick Telegram Channel Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Send className="w-4 h-4 text-blue-400" />
                공식 텔레그램 1:1 상담 채널
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                @goldenreel24
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              모바일 및 PC 텔레그램 앱에서 언제든지 1:1 실시간 안내, 9대 릴게임 이벤트, 입출금 문의가 가능합니다.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyTelegram}
                className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedTelegram ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedTelegram ? '아이디 복사완료!' : '텔레그램 ID 복사'}</span>
              </button>
              <a
                href="https://t.me/goldenreel24"
                target="_blank"
                rel="noreferrer"
                className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <span>바로가기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Direct 1:1 Message Form */}
          <form onSubmit={handleSubmitInquiry} className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">
              실시간 온라인 간편 문의 접수
            </label>
            <textarea
              rows={3}
              required
              value={inquiryText}
              onChange={(e) => setInquiryText(e.target.value)}
              placeholder="문의사항을 입력해주세요. (예: 황금성 잭팟 보너스 연타 규칙 문의, 사이트 제휴 문의 등)"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />

            {inquirySubmitted ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>문의가 안전하게 접수되었습니다. 1분 이내로 답변이 전송됩니다.</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>상담 접수하기</span>
              </button>
            )}
          </form>

          {/* Safety Notice */}
          <div className="flex items-start gap-2 text-[11px] text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              릴게임릴킹은 회원의 개인정보를 일절 저장하지 않으며 모든 상담 내용은 SSL 종단간 암호화되어 안전하게 폐기됩니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
