import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AudioPlayer } from "./AudioPlayer";
import { Sparkles, Video, PlayCircle, ShieldCheck } from "lucide-react";

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
}

const modalTranslations: Record<string, {
  modalTitle: string;
  modalSub: string;
  modalNotice: string;
  clickToListen: string;
  feat1: string;
  feat2: string;
  feat3: string;
  feat4: string;
  launchPrice: string;
  secureText: string;
}> = {
  en: {
    modalTitle: "The masterclass that walks you through everything, A to Z.",
    modalSub: "2 hours live. A premium site built in front of you. Full method.",
    modalNotice: "Zero experience, zero code — you walk away with this exact site.",
    clickToListen: "Click to listen to the audio",
    feat1: "Premium site built live",
    feat2: "Custom skills, unique output",
    feat3: "Prompts + deliverable resources",
    feat4: "Lifetime member access + updates",
    launchPrice: "LAUNCH PRICE — GONE FOR GOOD AFTER.",
    secureText: "Secure Stripe payment • Instant dashboard access"
  },
  fr: {
    modalTitle: "La masterclass qui vous montre tout, de A à Z.",
    modalSub: "2 heures en direct. Un site premium créé devant vous. Méthode complète.",
    modalNotice: "Zéro expérience, zéro code — vous repartez avec ce site exact.",
    clickToListen: "Cliquez pour écouter l'audio",
    feat1: "Site premium créé en direct",
    feat2: "Compétences sur mesure, rendu unique",
    feat3: "Prompts + ressources téléchargeables",
    feat4: "Accès membre à vie + mises à jour",
    launchPrice: "PRIX DE LANCEMENT — PLUS JAMAIS DISPONIBLE ENCORE.",
    secureText: "Paiement Stripe sécurisé • Accès instantané au tableau de bord"
  },
  pt: {
    modalTitle: "A masterclass que guia você por tudo, de A a Z.",
    modalSub: "2 horas ao vivo. Um site premium construído na sua frente. Método completo.",
    modalNotice: "Zero experiência, zero código — você sai com este site exato.",
    clickToListen: "Clique para ouvir o áudio",
    feat1: "Site premium construído ao vivo",
    feat2: "Habilidades personalizadas, entrega única",
    feat3: "Prompts + recursos entregáveis",
    feat4: "Acesso vitalício de membro + atualizações",
    launchPrice: "PREÇO DE LANÇAMENTO — NUNCA MAIS DISPONÍVEL.",
    secureText: "Pagamento seguro via Stripe • Acesso instantâneo ao painel"
  },
  tr: {
    modalTitle: "A'dan Z'ye her şeyi gösteren masterclass.",
    modalSub: "2 saat canlı yayın. Gözünüzün önünde tasarlanan premium site. Tüm yöntem.",
    modalNotice: "Sıfır deneyim, sıfır kod — bu sitenin birebir aynısıyla ayrılacaksınız.",
    clickToListen: "Sesi dinlemek için tıklayın",
    feat1: "Canlı yayında tasarlanan premium site",
    feat2: "Özel beceriler, benzersiz çıktı",
    feat3: "Promptlar + teslim edilebilir kaynaklar",
    feat4: "Ömür boyu üyelik erişimi + güncellemeler",
    launchPrice: "LANSMAN FİYATI — DAHA SONRA BİR DAHA GELMEYECEK.",
    secureText: "Güvenli Ödeme • Anında kontrol paneli erişimi"
  }
};

export const UpsellModal: React.FC<UpsellModalProps> = ({ isOpen, onClose, lang }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const t = modalTranslations[lang] || modalTranslations.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none overflow-y-auto">
      {/* Modal Card Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-[480px] bg-[#0c0c16] border border-white/10 rounded-3xl p-5 md:p-6 shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col gap-4 max-h-[90vh] overflow-y-auto scrollbar-thin my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition duration-200 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/5 cursor-pointer active:scale-90"
        >
          ✕
        </button>

        {/* Header Title */}
        <div className="text-center mt-2">
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-white leading-tight">
            {t.modalTitle}
          </h2>
          <p className="text-[10px] sm:text-xs text-muted mt-2 font-medium">
            {t.modalSub}
          </p>
        </div>

        {/* Notice Info Banner */}
        <div className="flex items-center gap-2 bg-[#7c5cff]/10 border border-[#7c5cff]/20 rounded-xl px-3 py-2.5 text-left">
          <Sparkles className="size-4 text-[#7c5cff] flex-shrink-0 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-semibold text-violet-200/90 leading-snug">
            {t.modalNotice}
          </span>
        </div>

        {/* Click to Listen Info & Audio Player */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] text-center font-bold tracking-[0.2em] text-[#febc2e] uppercase animate-pulse">
            {t.clickToListen}
          </span>
          <AudioPlayer lang={lang} />
        </div>

        {/* Preview Screen Mockup */}
        <div className="w-full rounded-2xl bg-[#0f0f1a] border border-white/10 overflow-hidden shadow-lg select-none">
          {/* Header OS Bar */}
          <div className="flex items-center gap-1.5 bg-[#101020] border-b border-white/5 px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <span className="w-2 h-2 rounded-full bg-[#28c840]" />
            <span className="text-[9px] text-white/40 font-mono mx-auto">hyliox.com/votre-site</span>
          </div>
          {/* Mockup Canvas Video playing like a GIF */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
            <video
              ref={videoRef}
              src="/masterclass-preview.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>

        {/* Bullet features grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-left">
          {[
            { icon: <Video className="size-3.5 text-[#7c5cff]" />, text: t.feat1 },
            { icon: <Sparkles className="size-3.5 text-[#7c5cff]" />, text: t.feat2 },
            { icon: <PlayCircle className="size-3.5 text-[#7c5cff]" />, text: t.feat3 },
            { icon: <ShieldCheck className="size-3.5 text-[#7c5cff]" />, text: t.feat4 },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {item.icon}
              <span className="text-[10px] sm:text-xs text-white/70 font-medium truncate">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Purchase Panel & Shopier Button */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-1">
          <div className="text-left">
            <span className="text-[8px] text-[#ff5f57] font-bold uppercase tracking-wider block animate-pulse">
              {t.launchPrice}
            </span>
            <span className="text-xl font-bold tracking-tight text-white font-mono">
              34€ <span className="text-[10px] text-muted font-sans font-normal">{lang === 'tr' ? '/ 1190 TL' : ''}</span>
            </span>
          </div>

          <a
            href="https://www.shopier.com"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2 rounded-full bg-accent text-black font-semibold text-xs sm:text-sm hover:bg-violet-400 active:scale-95 transition-all shadow-md shadow-[#7c5cff]/30 text-center flex items-center justify-center font-bold"
          >
            {lang === 'tr' ? 'SATIN AL' : 'BUY'}
          </a>
        </div>
        <span className="text-[8px] text-center text-muted font-mono tracking-wide -mt-2">
          {t.secureText}
        </span>
      </motion.div>
    </div>
  );
};
