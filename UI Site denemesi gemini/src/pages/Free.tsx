import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PromptBox } from "../components/PromptBox";
import { UpsellModal } from "../components/UpsellModal";
import { Languages } from "lucide-react";

interface Translation {
  pickLang: string;
  pickSub: string;
  seeThePack: string;
  title: string;
  sub: string;
}

const translations: Record<string, Translation> = {
  en: {
    pickLang: "Pick your language.",
    pickSub: "We'll switch the interface before handing you the prompt.",
    seeThePack: "See the pack →",
    title: "There it is. Copy it.",
    sub: "Paste it into Claude Code or v0. Let it run. This is just a preview — the full pack goes much deeper.",
  },
  fr: {
    pickLang: "Choisis ta langue.",
    pickSub: "Nous allons changer l'interface avant de vous donner le prompt.",
    seeThePack: "Découvrir le pack →",
    title: "Le voilà. Copie-le.",
    sub: "Colle-le dans Claude Code ou v0. Laisse tourner. Ceci n'est qu'un aperçu — le pack complet va beaucoup plus loin.",
  },
  pt: {
    pickLang: "Escolha o seu idioma.",
    pickSub: "Nós mudaremos a interface antes de entregar o prompt.",
    seeThePack: "Veja o pacote →",
    title: "Aí está. Copie.",
    sub: "Cole no Claude Code ou v0. Deixe rodar. Isto é apenas uma prévia — o pacote completo vai muito mais fundo.",
  },
  tr: {
    pickLang: "Dilinizi seçin.",
    pickSub: "Promptu size vermeden önce arayüzü değiştireceğiz.",
    seeThePack: "Paketi incele →",
    title: "İşte burada. Kopyala.",
    sub: "Claude Code veya v0'a yapıştırın. Çalıştırın. Bu sadece bir önizlemedir — tam paket çok daha derinlere gidiyor.",
  }
};

export const Free: React.FC = () => {
  const [lang, setLang] = useState<string>(() => {
    return sessionStorage.getItem("user-language") || "";
  });

  const [isLangSelected, setIsLangSelected] = useState<boolean>(() => {
    return !!sessionStorage.getItem("user-language");
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeContent = translations[lang] || translations.en;

  // Track page language switches
  const handleSelectLanguage = (selectedLang: string) => {
    sessionStorage.setItem("user-language", selectedLang);
    setLang(selectedLang);
    setIsLangSelected(true);
  };

  // Open the upsell modal automatically 1 second after language is active
  useEffect(() => {
    if (isLangSelected) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLangSelected]);

  return (
    <div className="relative w-full min-h-screen bg-bg text-white flex flex-col justify-between overflow-x-hidden selection:bg-accent/30 selection:text-white select-none">
      {/* Background Star Twinkling Animation */}
      <div className="fixed inset-0 star-grid pointer-events-none z-0 opacity-30" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#05040c] via-transparent to-[#05040c] pointer-events-none z-0" />
      
      {/* Upper radial accent glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,92,255,0.08),transparent_35%)] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto px-4 sm:px-6 py-12 md:py-16 flex-1 flex flex-col items-center justify-center">
        
        {/* Top Logo Monogram */}
        <div className="flex flex-col items-center gap-2 mb-10 select-none group">
          <svg 
            className="size-12 object-contain transition duration-300 group-hover:scale-105" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100" height="100" rx="24" fill="#0b0a15" stroke="rgba(124,92,255,0.25)" strokeWidth="3" />
            <path d="M30 28 H65 M30 46 H54 M30 28 V72" stroke="white" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M50 28 C62 28 62 46 50 46" stroke="white" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display italic font-extrabold text-sm tracking-[0.2em] text-white">
            FREEPROMPT<span className="text-[#7c5cff]">.ME</span>
          </span>
        </div>

        {/* 1. Language selector pop-up overlay */}
        {!isLangSelected ? (
          <div className="w-full flex-1 flex flex-col items-center justify-center z-20">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#07101a]/30 backdrop-blur-xl p-6 sm:p-8 w-full max-w-[460px] shadow-[0_28px_100px_rgba(0,0,0,0.5)]"
            >
              {/* Inner ambient gradients */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.35rem] bg-[radial-gradient(circle_at_20%_20%,rgba(124,92,255,0.15),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(0,255,255,0.05),transparent_40%)]" />
              
              <div className="relative z-10 text-center">
                <h2 className="text-xl sm:text-2xl font-display font-light text-indigo-50 tracking-tight mb-2">
                  Pick your language.
                </h2>
                <p className="text-xs text-indigo-200/60 mb-6">
                  We'll switch the interface before handing you the prompt.
                </p>
                
                {/* Language Buttons */}
                <div className="grid gap-2.5">
                  {[
                    { key: "en", label: "English", flag: (
                      <svg viewBox="0 0 60 30" className="h-4 w-6 rounded-sm border border-white/10 object-cover shrink-0">
                        <rect width="60" height="30" fill="#b22234" />
                        <rect y="2.3" width="60" height="2.3" fill="#fff" />
                        <rect y="6.9" width="60" height="2.3" fill="#fff" />
                        <rect y="11.5" width="60" height="2.3" fill="#fff" />
                        <rect y="16.1" width="60" height="2.3" fill="#fff" />
                        <rect y="20.7" width="60" height="2.3" fill="#fff" />
                        <rect y="25.3" width="60" height="2.3" fill="#fff" />
                        <rect width="24" height="16.1" fill="#3c3b6e" />
                      </svg>
                    )},
                    { key: "fr", label: "Français", flag: (
                      <svg viewBox="0 0 60 30" className="h-4 w-6 rounded-sm border border-white/10 object-cover shrink-0">
                        <rect width="20" height="30" fill="#0055A4" />
                        <rect x="20" width="20" height="30" fill="#fff" />
                        <rect x="40" width="20" height="30" fill="#EF4135" />
                      </svg>
                    )},
                    { key: "pt", label: "Português", flag: (
                      <svg viewBox="0 0 60 42" className="h-4 w-6 rounded-sm border border-white/10 object-cover shrink-0">
                        <rect width="60" height="42" fill="#009C3B" />
                        <polygon points="30,4 56,21 30,38 4,21" fill="#FFDF00" />
                        <circle cx="30" cy="21" r="8" fill="#002776" />
                      </svg>
                    )},
                    { key: "tr", label: "Türkçe", flag: (
                      <svg viewBox="0 0 60 40" className="h-4 w-6 rounded-sm border border-white/10 object-cover shrink-0">
                        <rect width="60" height="40" fill="#E30A17" />
                        <circle cx="26" cy="20" r="9" fill="#fff" />
                        <circle cx="28.5" cy="20" r="7.2" fill="#E30A17" />
                        <polygon points="36,20 40.5,18.5 39,22.7 39,17.3 40.5,21.5" fill="#fff" />
                      </svg>
                    )}
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleSelectLanguage(item.key)}
                      className="group flex items-center justify-between w-full rounded-xl border border-white/8 bg-[#0b1520]/40 px-4 py-3.5 text-left transition hover:border-[#7c5cff]/40 hover:bg-[#0b1520]/80 focus:outline-none cursor-pointer active:scale-98"
                    >
                      <div className="flex items-center gap-3">
                        {item.flag}
                        <span className="text-sm font-medium text-indigo-50">{item.label}</span>
                      </div>
                      <span className="text-[#7c5cff]/60 transition group-hover:translate-x-0.5 group-hover:text-[#7c5cff]">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* 2. Main Page Card Layout (Direct copy of competitor mockup) */
          <motion.main 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex-1 flex flex-col items-center justify-center z-10"
          >
            {/* Centered Pill Card Container */}
            <div className="w-full bg-[#0c0c16] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col gap-6 text-center">
              
              {/* See the Pack Button at top */}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3 w-full sm:w-auto rounded-full bg-[#7c5cff] text-white font-semibold text-sm hover:bg-violet-400 active:scale-95 transition duration-200 cursor-pointer shadow-md shadow-[#7c5cff]/20"
                >
                  {activeContent.seeThePack}
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col gap-2.5">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                  {activeContent.title}
                </h1>
                <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xl mx-auto font-medium">
                  {activeContent.sub}
                </p>
              </div>

              {/* Main Copyable Prompt Box */}
              <PromptBox isLocked={false} />
            </div>
          </motion.main>
        )}

        {/* Footer bar */}
        <footer className="w-full border-t border-white/5 pt-8 mt-12 text-center select-none">
          {/* Language indicator toggle */}
          {isLangSelected && (
            <button
              onClick={() => setIsLangSelected(false)}
              className="inline-flex items-center gap-1.5 text-[10px] text-muted/65 hover:text-white mb-4 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-full px-3 py-1.5 transition cursor-pointer"
            >
              <Languages className="size-3" />
              <span>{lang === "fr" ? "Changer de langue" : lang === "tr" ? "Dili Değiştir" : lang === "pt" ? "Alterar idioma" : "Change Language"}</span>
            </button>
          )}
          
          <p className="text-[10px] sm:text-xs text-muted/40 font-mono">
            © {new Date().getFullYear()} freeprompt.me. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Pop-up Upsell Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <UpsellModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang={lang} />
        )}
      </AnimatePresence>
    </div>
  );
};
