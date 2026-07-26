import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Play, Pause, ShieldCheck, Languages, ArrowRight, Library, Lock, Check, Volume2, VolumeX, Folder, BookOpen, Users, MousePointer2, Gem, Target, Cpu, Trophy, Infinity, Rocket } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TranslationContent {
  logo: string;
  navLinks: string[];
  login: string;
  ctaJoin: string;
  hero: {
    badge: string;
    title: string[];
    desc: string;
    badge1: string;
    badge2: string;
    badge3: string;
    badge4: string;
  };
  programme: {
    kicker: string;
    title: string[];
    desc: string;
    modules: { id: string; kicker: string; title: string; desc: string }[];
  };
  member: {
    kicker: string;
    title: string[];
    desc: string;
    cta: string;
    library: string;
    stats: { num: string; title: string; desc: string }[];
    bullets: string[];
  };
  langSection: {
    kicker: string;
    title: string[];
    desc: string;
    note: string;
    noteDesc: string;
    badge: string;
    features: string[];
  };
  pricing: {
    kicker: string;
    title: string[];
    desc: string;
    offer: string;
    heading: string;
    offerDesc: string;
    bullets: string[];
    btn: string;
  };
  statsBanner: {
    updateVal: string;
    updateDesc: string;
    accessVal: string;
    accessDesc: string;
    resourcesVal: string;
    resourcesDesc: string;
    membersVal: string;
    membersDesc: string;
  };
}

const translations: Record<string, TranslationContent> = {
  en: {
    logo: "FREEPROMPT",
    navLinks: ["Programme", "VSL", "Library", "Languages", "Pricing"],
    login: "LOGIN",
    ctaJoin: "Join Masterclass",
    hero: {
      badge: "Founder Offer",
      title: ["Masterclass", "AI Websites"],
      desc: "A premium masterclass to design, code, and animate landing pages from prompt to Wow page using AI, GSAP, and React.",
      badge1: "Premium Content",
      badge2: "100% Actionable",
      badge3: "AI Strategies",
      badge4: "Concrete Results",
    },
    programme: {
      kicker: "Curriculum",
      title: ["The system to", "go from prompt to", "wow page"],
      desc: "Learn the full workflow: art direction, asset generation, clean code, GSAP ScrollTrigger animations, and responsive delivery.",
      modules: [
        {
          id: "01",
          kicker: "Art direction",
          title: "AI Direction",
          desc: "Transform a blurry idea into a clear, premium, and actionable art direction.",
        },
        {
          id: "02",
          kicker: "Reference first",
          title: "Image-to-code",
          desc: "Generate solid visual references and translate them into clean React components.",
        },
        {
          id: "03",
          kicker: "Motion system",
          title: "GSAP ScrollTrigger",
          desc: "Build sections that pin, scrub, reveal, and deliver a true wow factor.",
        },
        {
          id: "04",
          kicker: "Final delivery",
          title: "Polish responsive",
          desc: "Deliver a fast, fluid, readable web page optimized for all actual screens.",
        },
      ],
    },
    member: {
      kicker: "After purchase",
      title: ["Your member space", "keeps growing", "live library"],
      desc: "You don't just walk away with a video. You get a hub where I add next-level demonstrations, resources, prompts, and skills to push your sites further.",
      cta: "Unlock Access",
      library: "Living Library",
      stats: [
        { num: "12+", title: "Videos", desc: "Masterclass & demos" },
        { num: "30+", title: "Resources", desc: "Templates, guides & documents" },
        { num: "Live", title: "Prompts", desc: "Art direction & briefs" },
        { num: "New", title: "Skills", desc: "Techniques & workflows" },
      ],
      bullets: [
        "Masterclass Replays",
        "New videos added monthly",
        "Art direction prompts",
        "Assets, layouts & resources",
      ],
    },
    langSection: {
      kicker: "International Training",
      title: ["Learn", "without borders.", "In your language."],
      desc: "AI Websites is available in multiple languages to offer you the best learning experience, wherever you are.",
      note: "Change language anytime",
      noteDesc: "Your preferences are saved automatically.",
      badge: "Global Experience",
      features: ["Subtitles available", "Localized resources", "Multilingual support", "Certificate"],
    },
    pricing: {
      kicker: "Masterclass Access",
      title: ["Enter with an idea.", "Leave with a site", "that stands out."],
      desc: "Complete masterclass, replay, and files included in a single unique payment.",
      offer: "Founder Offer",
      heading: "Masterclass AI Websites",
      offerDesc: "One single clear offer to go from a simple prompt to a landing page that converts.",
      bullets: [
        "Complete 2-hour masterclass",
        "Replay access included",
        "Deliverable prompts & code files",
        "Immediate dashboard access",
      ],
      btn: "Join the Masterclass",
    },
    statsBanner: {
      updateVal: "+12 / MONTH",
      updateDesc: "Continuously updated content",
      accessVal: "∞ ACCESS",
      accessDesc: "Lifetime access",
      resourcesVal: "30+ RESOURCES",
      resourcesDesc: "Exclusive & premium resources",
      membersVal: "67 MEMBERS",
      membersDesc: "An engaged community",
    },
  },
  tr: {
    logo: "FREEPROMPT",
    navLinks: ["Müfredat", "VSL", "Kütüphane", "Diller", "Fiyatlandırma"],
    login: "GİRİŞ YAP",
    ctaJoin: "Masterclass'a Katıl",
    hero: {
      badge: "Kurucu Teklifi",
      title: ["Masterclass", "AI Siteleri"],
      desc: "Yapay zeka, GSAP ve React kullanarak prompt'tan göz alıcı sayfalara giden yolu tasarlamayı ve kodlamayı öğreten premium eğitim.",
      badge1: "Premium İçerik",
      badge2: "100% Uygulanabilir",
      badge3: "Yapay Zeka Yöntemleri",
      badge4: "Somut Sonuçlar",
    },
    programme: {
      kicker: "Müfredat",
      title: ["Prompt'tan", "göz alıcı sayfalara", "geçiş sistemi"],
      desc: "Tüm iş akışını öğrenin: sanat yönetimi, varlık üretimi, temiz kodlama, GSAP ScrollTrigger animasyonları ve responsive teslimat.",
      modules: [
        {
          id: "01",
          kicker: "Sanat yönetimi",
          title: "AI Sanat Yönü",
          desc: "Belirsiz bir fikri net, premium ve kodlanabilir bir tasarım vizyonuna dönüştürün.",
        },
        {
          id: "02",
          kicker: "Referans odaklı",
          title: "Görselden Koda",
          desc: "Güçlü görsel referanslar üretin ve bunları temiz React bileşenlerine aktarın.",
        },
        {
          id: "03",
          kicker: "Hareket sistemi",
          title: "GSAP ScrollTrigger",
          desc: "Sayfayı sabitleyen (pin), kaydırmaya duyarlı (scrub) ve wow hissi veren animasyonlar kurgulayın.",
        },
        {
          id: "04",
          kicker: "Sayfa teslimatı",
          title: "Responsive Uyum",
          desc: "Hızlı, akıcı, okunabilir ve gerçek ekran boyutlarına göre optimize edilmiş sayfayı teslim edin.",
        },
      ],
    },
    member: {
      kicker: "Satın alım sonrası",
      title: ["Üye paneliniz", "büyümeye devam ediyor", "canlı kütüphane"],
      desc: "Sadece tek bir video satın almazsınız. Sitelerinizi daha ileriye taşıyacak yeni demolar, kaynaklar, promptlar ve yetenekler eklediğim yaşayan bir panele sahip olursunuz.",
      cta: "Erişimi Aç",
      library: "Yaşayan Kütüphane",
      stats: [
        { num: "12+", title: "Video", desc: "Masterclass & demolar" },
        { num: "30+", title: "Kaynak", desc: "Şablonlar, rehberler & belgeler" },
        { num: "Canlı", title: "Prompt", desc: "Tasarım & brief promptları" },
        { num: "Yeni", title: "Yetenekler", desc: "İş akışları & teknikler" },
      ],
      bullets: [
        "Masterclass Tekrarları",
        "Her ay eklenen yeni videolar",
        "Sanat yönetimi promptları",
        "Dosyalar, yerleşimler & kaynaklar",
      ],
    },
    langSection: {
      kicker: "Uluslararası Eğitim",
      title: ["Sınırsızca", "öğrenin.", "Kendi dilinizde."],
      desc: "AI Siteleri eğitimi, nerede olursanız olun en iyi öğrenme deneyimini sunmak için çoklu dil seçeneği ile hazırlandı.",
      note: "İstediğiniz zaman dili değiştirin",
      noteDesc: "Tercihleriniz otomatik olarak kaydedilir.",
      badge: "Küresel Deneyim",
      features: ["Altyazı desteği", "Yerelleştirilmiş dosyalar", "Çok dilli destek", "Uluslararası Sertifika"],
    },
    pricing: {
      kicker: "Eğitime Erişim",
      title: ["Fikirle başlayın.", "İz bırakan bir", "siteyle tamamlayın."],
      desc: "Masterclass eğitimi, tekrarlar ve kaynak dosyalar tek seferlik ödemeyle dahil.",
      offer: "Kurucu Teklif",
      heading: "Masterclass AI Web Siteleri",
      offerDesc: "Prompt'tan dönüşüm sağlayan profesyonel bir web sayfasına geçiş için tek ve net bir teklif.",
      bullets: [
        "2 saatlik eksiksiz Masterclass",
        "Eğitim tekrarı erişimi",
        "Teslim edilebilir promptlar & kodlar",
        "Panele anında erişim",
      ],
      btn: "Masterclass'a Katıl",
    },
    statsBanner: {
      updateVal: "+12 / AY",
      updateDesc: "Sürekli güncellenen içerik",
      accessVal: "∞ ERİŞİM",
      accessDesc: "Ömür boyu erişim",
      resourcesVal: "30+ KAYNAK",
      resourcesDesc: "Özel ve premium kaynaklar",
      membersVal: "67 ÜYE",
      membersDesc: "Aktif bir topluluk",
    },
  },
  fr: {
    logo: "FREEPROMPT",
    navLinks: ["Programme", "VSL", "Membre", "Langues", "Accès"],
    login: "CONNEXION",
    ctaJoin: "Rejoindre la Masterclass",
    hero: {
      badge: "Offre Fondatrice",
      title: ["Masterclass", "IA Sites"],
      desc: "Une masterclass de 2h pour concevoir, coder et animer des pages web premium avec l'IA, GSAP et React.",
      badge1: "Contenu Premium",
      badge2: "100% Actionnable",
      badge3: "Stratégies IA",
      badge4: "Résultats Concrets",
    },
    programme: {
      kicker: "Programme",
      title: ["Le système pour", "passer de prompt à", "page wow"],
      desc: "Tu apprends le workflow complet : direction artistique, génération d'assets, code propre, animations ScrollTrigger et livraison responsive.",
      modules: [
        {
          id: "01",
          kicker: "Direction artistique",
          title: "Direction IA",
          desc: "Transformer une idée floue en direction artistique claire, premium et exploitable.",
        },
        {
          id: "02",
          kicker: "Référence d'abord",
          title: "Image-to-code",
          desc: "Générer des références visuelles solides puis les traduire en composants React propres.",
        },
        {
          id: "03",
          kicker: "Système de mouvement",
          title: "GSAP ScrollTrigger",
          desc: "Construire des sections qui pin, scrub, révèlent et donnent une vraie sensation wow.",
        },
        {
          id: "04",
          kicker: "Livraison finale",
          title: "Polish responsive",
          desc: "Finir avec une page lisible, fluide, rapide et adaptée aux vrais écrans.",
        },
      ],
    },
    member: {
      kicker: "Après l'achat",
      title: ["Ton espace membre", "continue de grandir", "bibliothèque vivante"],
      desc: "Tu ne repars pas seulement avec une vidéo. Tu obtiens un endroit où je peux ajouter les prochaines démonstrations, ressources, prompts, assets et skills pour pousser tes sites plus loin.",
      cta: "Débloquer l'accès",
      library: "Bibliothèque Vivante",
      stats: [
        { num: "12+", title: "Vidéos", desc: "Masterclass & démo" },
        { num: "30+", title: "Ressources", desc: "Templates, guides & docs" },
        { num: "Live", title: "Prompts", desc: "Direction artistique & briefs" },
        { num: "New", title: "Skills", desc: "Techniques & workflows" },
      ],
      bullets: [
        "Replays de la masterclass",
        "Nouvelles vidéos ajoutées",
        "Prompts de direction artistique",
        "Assets, layouts et références",
      ],
    },
    langSection: {
      kicker: "Formation Internationale",
      title: ["Apprenez", "sans frontières.", "Dans votre langue."],
      desc: "IA Sites est disponible en trois langues pour vous offrir la meilleure expérience d'apprentissage, où que vous soyez.",
      note: "Changez de langue à tout moment",
      noteDesc: "Vos préférences sont sauvegardées automatiquement.",
      badge: "Expérience Globale",
      features: [
        "Sous-titres disponibles",
        "Ressources localisées",
        "Support multilingue",
        "Certificat",
      ],
    },
    pricing: {
      kicker: "Accès Masterclass",
      title: ["Entre avec une idée.", "Sors avec un site", "qui marque."],
      desc: "Masterclass complète, replay et ressources incluses dans un paiement unique.",
      offer: "Offre Fondatrice",
      heading: "Masterclass IA Sites",
      offerDesc: "Une seule offre claire pour passer de l'idée à une page qui marque.",
      bullets: [
        "Masterclass complète de 2h",
        "Replay inclus",
        "Ressources de la masterclass",
        "Accès immédiat",
      ],
      btn: "Rejoindre la masterclass",
    },
    statsBanner: {
      updateVal: "+12 / MOIS",
      updateDesc: "Contenu mis à jour en continu",
      accessVal: "∞ ACCÈS",
      accessDesc: "Accès à vie",
      resourcesVal: "30+ RESSOURCES",
      resourcesDesc: "Ressources exclusives et premium",
      membersVal: "67 MEMBRES",
      membersDesc: "Une communauté engagée",
    },
  },
  pt: {
    logo: "FREEPROMPT",
    navLinks: ["Programa", "VSL", "Membros", "Idiomas", "Acesso"],
    login: "ENTRAR",
    ctaJoin: "Participar da Masterclass",
    hero: {
      badge: "Oferta Fundador",
      title: ["Masterclass", "Sites de IA"],
      desc: "Uma masterclass premium para planejar, codificar e animar landing pages do prompt ao Wow usando IA, GSAP e React.",
      badge1: "Conteúdo Premium",
      badge2: "100% Aplicável",
      badge3: "Estratégias de IA",
      badge4: "Resultados Reais",
    },
    programme: {
      kicker: "Módulos",
      title: ["O sistema para", "ir do prompt à", "página wow"],
      desc: "Aprenda o fluxo completo: direção de arte, geração de assets, código limpo, animações GSAP ScrollTrigger e entrega responsiva.",
      modules: [
        {
          id: "01",
          kicker: "Direção de arte",
          title: "Direção de IA",
          desc: "Transformar uma ideia vaga em uma direção de arte clara, premium e aplicável.",
        },
        {
          id: "02",
          kicker: "Referência primeiro",
          title: "Imagem em código",
          desc: "Gerar referências visuais sólidas e traduzi-las em componentes React limpos.",
        },
        {
          id: "03",
          kicker: "Sistema de movimento",
          title: "GSAP ScrollTrigger",
          desc: "Construir seções que fixam, controlam o progresso, revelam e dão um verdadeiro efeito wow.",
        },
        {
          id: "04",
          kicker: "Entrega final",
          title: "Polimento responsivo",
          desc: "Entregar uma página rápida, fluida, legível e otimizada para todas as telas.",
        },
      ],
    },
    member: {
      kicker: "Após a compra",
      title: ["Seu espaço de membro", "continua crescendo", "biblioteca viva"],
      desc: "Você não leva apenas um vídeo. Você ganha um painel onde eu adiciono novas demonstrações, recursos, prompts e habilidades para elevar seus sites.",
      cta: "Desbloquear Acesso",
      library: "Biblioteca Viva",
      stats: [
        { num: "12+", title: "Vídeos", desc: "Masterclass & demos" },
        { num: "30+", title: "Recursos", desc: "Templates, guias & docs" },
        { num: "Live", title: "Prompts", desc: "Direção de arte & briefs" },
        { num: "New", title: "Skills", desc: "Técnicas & fluxos" },
      ],
      bullets: [
        "Replays da masterclass",
        "Novos vídeos mensalmente",
        "Prompts de direção de arte",
        "Assets, layouts e recursos",
      ],
    },
    langSection: {
      kicker: "Treinamento Internacional",
      title: ["Aprenda", "sem fronteiras.", "No seu idioma."],
      desc: "Sites de IA está disponível em vários idiomas para oferecer a melhor experiência de aprendizado, onde quer que você esteja.",
      note: "Mude de idioma a qualquer momento",
      noteDesc: "Suas preferências são salvas automaticamente.",
      badge: "Experiência Global",
      features: ["Legendas disponíveis", "Recursos localizados", "Suporte multilíngue", "Certificado"],
    },
    pricing: {
      kicker: "Acesso à Masterclass",
      title: ["Entre com uma ideia.", "Saia com um site", "que se destaca."],
      desc: "Masterclass completa, replay e arquivos inclusos em um único pagamento.",
      offer: "Oferta de Fundador",
      heading: "Masterclass Sites de IA",
      offerDesc: "Uma única oferta clara para ir do prompt a uma landing page que converte.",
      bullets: [
        "Masterclass completa de 2h",
        "Acesso ao replay incluso",
        "Prompts e arquivos de código",
        "Acesso imediato ao painel",
      ],
      btn: "Participar da Masterclass",
    },
    statsBanner: {
      updateVal: "+12 / MÊS",
      updateDesc: "Conteúdo atualizado continuamente",
      accessVal: "∞ ACESSO",
      accessDesc: "Acesso vitalício",
      resourcesVal: "30+ RECURSOS",
      resourcesDesc: "Recursos exclusivos e premium",
      membersVal: "67 MEMBROS",
      membersDesc: "Uma comunidade engajada",
    },
  },
};

// Canvas Rotating Globe component
const GlobeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotation = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = Math.min(cx, cy) * 0.82;

      ctx.strokeStyle = "rgba(124, 92, 255, 0.25)";
      ctx.lineWidth = 1.2;

      // Draw planetary sphere outline
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Draw latitude lines (ellipses)
      for (let i = 1; i < 6; i++) {
        const yOffset = (i - 3) * (r / 3);
        const rad = Math.sqrt(r * r - yOffset * yOffset);
        ctx.beginPath();
        ctx.ellipse(cx, cy + yOffset, rad, rad * 0.22, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw rotating longitude lines
      for (let i = 0; i < 6; i++) {
        const angle = rotation + (i * Math.PI) / 3;
        const width = r * Math.sin(angle);
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(width), r, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      rotation += 0.003;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export const Home: React.FC = () => {
  // Read saved language preference or default to empty to force modal overlay
  const [lang, setLang] = useState<string>(() => {
    return sessionStorage.getItem("user-language") || "";
  });
  
  const [isLangSelected, setIsLangSelected] = useState<boolean>(() => {
    return !!sessionStorage.getItem("user-language");
  });

  const content = translations[lang] || translations.en;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoTimeText, setVideoTimeText] = useState("0:00 / 3:13");
  const videoElRef = useRef<HTMLVideoElement>(null);

  // Curriculum card deck active card
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // GSAP Refs
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const titleStackRef = useRef<HTMLDivElement>(null);
  const vslPlayerRef = useRef<HTMLDivElement>(null);
  const leftBadgesRef = useRef<HTMLDivElement>(null);
  const rightBadgesRef = useRef<HTMLDivElement>(null);
  const bgVideoContainerRef = useRef<HTMLDivElement>(null);

  // Curriculum Section Refs
  const curriculumSectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const card0 = useRef<HTMLDivElement>(null);
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const card3 = useRef<HTMLDivElement>(null);

  // Member Space Section Refs
  const memberSectionRef = useRef<HTMLElement>(null);
  const langSectionRef = useRef<HTMLElement>(null);
  const pricingSectionRef = useRef<HTMLElement>(null);

  // Handle language selection overlay
  const handleSelectLanguage = (selectedLang: string) => {
    sessionStorage.setItem("user-language", selectedLang);
    setLang(selectedLang);
    setIsLangSelected(true);
  };

  // Scroll locking when language modal is active
  useEffect(() => {
    if (!isLangSelected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLangSelected]);

  // Video playback listeners
  useEffect(() => {
    const video = videoElRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.duration) {
        setVideoProgress((video.currentTime / video.duration) * 100);
        const formatTime = (time: number) => {
          const minutes = Math.floor(time / 60);
          const seconds = Math.floor(time % 60);
          return `${minutes}:${seconds.toString().padStart(2, "0")}`;
        };
        setVideoTimeText(`${formatTime(video.currentTime)} / ${formatTime(video.duration)}`);
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  const handlePlayToggle = () => {
    const video = videoElRef.current;
    if (!video) return;
    if (isPlaying()) {
      video.pause();
      setIsVideoPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsVideoPlaying(true);
    }
  };

  const isPlaying = () => {
    const video = videoElRef.current;
    return video ? !video.paused : false;
  };

  const handleMuteToggle = () => {
    const video = videoElRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsVideoMuted(video.muted);
  };

  // GSAP ScrollTrigger Timeline for VSL Zooming and elements fadeout
  useEffect(() => {
    if (!isLangSelected) return;

    const hero = heroSectionRef.current;
    const sticky = stickyWrapperRef.current;
    const title = titleStackRef.current;
    const vsl = vslPlayerRef.current;
    const leftBadges = leftBadgesRef.current;
    const rightBadges = rightBadgesRef.current;
    const bgVideoContainer = bgVideoContainerRef.current;

    if (!hero || !sticky || !vsl) return;

    // Reset styles initially
    gsap.set(vsl, { width: "560px", height: "315px", borderRadius: "16px", transform: "translateY(5vh)" });
    if (bgVideoContainer) {
      gsap.set(bgVideoContainer, { opacity: 0.85 });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom bottom",
          pin: sticky,
          pinSpacing: false,
          scrub: 1,
        },
      });

      // 1. Zoom VSL Mockup Card to full screen, and remove borders/margins
      tl.to(
        vsl,
        {
          width: "100vw",
          height: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
          borderRadius: "0px",
          borderWidth: "0px",
          transform: "translateY(0vh)",
          ease: "none",
        },
        0
      );

      // Fade-in the space planet background video on scroll
      if (bgVideoContainer) {
        tl.to(bgVideoContainer, { opacity: 0.95, ease: "none" }, 0);
      }

      // 2. Translate and fade out the title lines sideways
      if (title) {
        const line1 = title.querySelector(".hero-title-line--primary");
        const line2 = title.querySelector(".hero-title-line--accent");
        if (line1 && line2) {
          tl.to(line1, { x: "-22vw", opacity: 0, scale: 0.9, ease: "none" }, 0);
          tl.to(line2, { x: "22vw", opacity: 0, scale: 0.9, ease: "none" }, 0);
        } else {
          tl.to(title, { opacity: 0, y: -120, scale: 0.85, ease: "none" }, 0);
        }
      }

      // 3. Translate and fade out floating labels (badge lists)
      if (leftBadges) {
        tl.to(leftBadges, { opacity: 0, x: -180, scale: 0.9, ease: "none" }, 0);
      }
      if (rightBadges) {
        tl.to(rightBadges, { opacity: 0, x: 180, scale: 0.9, ease: "none" }, 0);
      }

      // 4. Add an empty step to keep it pinned at full screen before unpinning
      tl.to({}, { duration: 0.5 });
    });

    return () => {
      ctx.revert();
    };
  }, [isLangSelected]);

  // GSAP ScrollTrigger for 3D Stacked Curriculum Cards
  useEffect(() => {
    if (!isLangSelected) return;

    const curriculum = curriculumSectionRef.current;
    const cards = [card0.current, card1.current, card2.current, card3.current].filter(Boolean) as HTMLDivElement[];

    if (!curriculum || cards.length === 0) return;

    // Reset styles
    cards.forEach((card, idx) => {
      if (idx === 0) {
        gsap.set(card, { transformOrigin: "bottom center", scale: 1, y: 0, z: 0, opacity: 1 });
      } else {
        gsap.set(card, {
          transformOrigin: "bottom center",
          scale: 1 - idx * 0.06,
          y: idx * 28,
          z: -idx * 60,
          opacity: 1 - idx * 0.22,
        });
      }
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: curriculum,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Split progress into 4 ranges to map to active indicators
            const index = Math.min(Math.floor(self.progress * 4), 3);
            setActiveCardIndex(index);
          }
        },
      });

      // Card 0 slides out, lower cards scale up
      tl.to(cards[0], { y: -580, rotation: -12, opacity: 0, ease: "power2.inOut" }, 0);
      tl.to(cards[1], { scale: 1, y: 0, z: 0, opacity: 1, ease: "power2.inOut" }, 0);
      tl.to(cards[2], { scale: 0.94, y: 28, z: -60, opacity: 0.78, ease: "power2.inOut" }, 0);
      tl.to(cards[3], { scale: 0.88, y: 56, z: -120, opacity: 0.56, ease: "power2.inOut" }, 0);

      // Card 1 slides out, lower cards scale up
      tl.to(cards[1], { y: -580, rotation: 12, opacity: 0, ease: "power2.inOut" }, 1);
      tl.to(cards[2], { scale: 1, y: 0, z: 0, opacity: 1, ease: "power2.inOut" }, 1);
      tl.to(cards[3], { scale: 0.94, y: 28, z: -60, opacity: 0.78, ease: "power2.inOut" }, 1);

      // Card 2 slides out, card 3 scales up
      tl.to(cards[2], { y: -580, rotation: -12, opacity: 0, ease: "power2.inOut" }, 2);
      tl.to(cards[3], { scale: 1, y: 0, z: 0, opacity: 1, ease: "power2.inOut" }, 2);
      
      // Keep card 3 active at the end of scroll range
      tl.to(cards[3], { scale: 1, y: 0, z: 0, opacity: 1 }, 3);
    });

    return () => {
      ctx.revert();
    };
  }, [isLangSelected]);

  // Section entry scroll reveals
  useEffect(() => {
    if (!isLangSelected) return;

    const sections = [memberSectionRef.current, langSectionRef.current, pricingSectionRef.current].filter(Boolean);
    
    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        if (!section) return;
        const revealElements = section.querySelectorAll(".reveal-element");
        if (revealElements.length === 0) return;

        gsap.fromTo(
          revealElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 76%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => {
      ctx.revert();
    };
  }, [isLangSelected]);

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBulletClick = (index: number) => {
    // Determine the scroll position of curriculum trigger corresponding to the bullet
    const curriculum = curriculumSectionRef.current;
    if (!curriculum) return;
    const trigger = ScrollTrigger.getById("curriculum-trigger") || ScrollTrigger.create({ trigger: curriculum, start: "top top", end: "+=320%" });
    const start = trigger.start;
    const end = trigger.end;
    const offset = start + (end - start) * (index / 3.2);
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-screen bg-[#05040c] text-white flex flex-col justify-between overflow-x-hidden select-none selection:bg-violet-500/20 selection:text-white">
      {/* 1. Language selector pop-up overlay */}
      {!isLangSelected && (
        <div className="fixed inset-0 z-[999] bg-[#020205]/85 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="bg-[#0b0c10]/95 border border-white/[0.08] rounded-[28px] p-6 sm:p-8 w-full max-w-[400px] shadow-[0_32px_100px_rgba(0,0,0,0.85)] text-center flex flex-col gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight font-sans">
                Choisis ta langue
              </h2>
              <p className="text-[11px] sm:text-xs text-white/40 mt-2 font-medium tracking-wide">
                Choose your language · Escolha o seu idioma
              </p>
            </div>

            {/* Language selectors */}
            <div className="flex flex-col gap-2.5">
              {[
                { key: "en", flag: "🇺🇸", label: "English" },
                { key: "fr", flag: "🇫🇷", label: "Français" },
                { key: "pt", flag: "🇧🇷", label: "Português" },
                { key: "tr", flag: "🇹🇷", label: "Türkçe" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleSelectLanguage(item.key)}
                  className="flex items-center justify-between rounded-2xl px-5 py-3.5 bg-[#111622]/80 border border-white/[0.05] hover:border-violet-500/40 hover:bg-white/[0.03] transition-all duration-300 text-left cursor-pointer group active:scale-[0.98]"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="text-2xl leading-none select-none">{item.flag}</span>
                    <span className="font-semibold text-xs sm:text-sm text-white/80 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </span>
                  <span className="text-white/20 group-hover:text-white/60 transition-all group-hover:translate-x-1 font-mono text-sm leading-none">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Background Star Twinkling particles */}
      <div className="fixed inset-0 star-grid pointer-events-none z-0 opacity-40" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,78,255,0.18),transparent_35%)] pointer-events-none z-0" />

      {/* Cam Navigation Header */}
      <header className="fixed left-0 right-0 top-4 z-50 px-4">
        <nav className="mx-auto flex h-12 max-w-[960px] items-center justify-between rounded-full border border-white/10 bg-black/40 px-3 shadow-lg shadow-black/35 backdrop-blur-md md:h-14">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <svg 
              className="size-7 object-contain transition group-hover:scale-105" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#81e6ff" />
                  <stop offset="100%" stopColor="#7c5cff" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" rx="24" fill="#0b0a15" stroke="url(#logo-grad)" strokeWidth="3.5" />
              <path d="M30 28 H65 M30 46 H54 M30 28 V72" stroke="white" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M50 28 C62 28 62 46 50 46" stroke="white" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-display italic font-extrabold text-xs tracking-[0.14em] text-white/95 md:text-sm">
              {content.logo}
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-1">
            {content.navLinks.map((link, idx) => {
              const ids = ["programme", "vsl", "membre", "langues", "acces"];
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(ids[idx])}
                  className="rounded-full px-3 py-1.5 text-xs font-medium text-white/62 hover:bg-white/[0.06] hover:text-white transition cursor-pointer"
                >
                  {link}
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick("acces")}
              className="text-[11px] font-bold text-white/60 hover:text-white transition uppercase cursor-pointer hidden sm:inline-block"
            >
              {content.login}
            </button>
            <button
              onClick={() => handleNavClick("acces")}
              className="group inline-flex items-center gap-1.5 rounded-full bg-[#7c5cff] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-md shadow-[#7c5cff]/30 hover:bg-violet-400 active:scale-95 transition cursor-pointer"
            >
              {content.ctaJoin}
              <ArrowRight className="size-3 transition group-hover:translate-x-0.5" />
            </button>
          </div>
        </nav>
      </header>

      {/* HERO SECTION WITH PIN AND SCROLL ZOOM VIDEO */}
      <div ref={heroSectionRef} className="relative w-full h-[180vh] bg-[#05040c] z-10">
        {/* Wrapper for pinning the elements during scroll zoom */}
        <div
          ref={stickyWrapperRef}
          className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10"
        >
          {/* Planet video background */}
          <div ref={bgVideoContainerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-85 transition-opacity">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              src="https://www.hyliox.io/masterclass2/hero-bg.mp4"
            />
            {/* Dark Overlay over planet */}
            <div className="absolute inset-0 bg-black/15" />
          </div>

          {/* Title Stack centered in background */}
          <div
            ref={titleStackRef}
            className="absolute left-1/2 top-[8%] sm:top-[10%] -translate-x-1/2 flex flex-col items-center justify-center text-center w-full z-0 select-none mix-blend-normal font-sans"
          >
            <h2 className="hero-title-line hero-title-line--primary text-4xl sm:text-6xl lg:text-[5.2rem] font-extrabold tracking-tight text-white uppercase leading-none select-none transition-none">
              {content.hero.title[0]}
            </h2>
            <h2 className="hero-title-line hero-title-line--accent text-4xl sm:text-6xl lg:text-[5.2rem] font-extrabold tracking-tight uppercase text-center mt-2.5 select-none transition-none bg-gradient-to-r from-[#81e6ff] to-[#7c5cff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(129,230,255,0.25)]">
              {content.hero.title[1]}
            </h2>
          </div>

          {/* Glowing Aura behind mockup */}
          <div className="absolute w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.22),transparent_70%)] blur-3xl pointer-events-none z-0" />

          {/* MacOS Browser mockup Player */}
          <div
            ref={vslPlayerRef}
            id="vsl"
            className="relative z-20 w-[560px] h-[315px] max-w-[95vw] max-h-[85vh] rounded-2xl overflow-hidden bg-[#0c0c16]/50 backdrop-blur-2xl border border-white/10 shadow-[0_32px_100px_rgba(0,0,0,0.85)] flex flex-col transition-all duration-0 ease-none"
          >
            {/* Header tab */}
            <div className="flex shrink-0 items-center justify-between bg-[#101020]/80 border-b border-white/10 px-4 h-[28px] select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex items-center gap-1 px-3 py-0.5 rounded bg-white/[0.05] text-[9px] text-white/40 font-mono">
                <Lock className="size-2 text-white/30" />
                freeprompt.me
              </div>
              <div className="w-[32px]" />
            </div>

            {/* Video preview / dashboard UI */}
            <div className="relative flex-1 bg-black/15 flex overflow-hidden select-none">
              
              {/* Custom interactive dashboard UI when scaled */}
              <div className="flex-1 flex overflow-hidden">
                {/* Dashboard Sidebar */}
                <aside className="w-[130px] bg-[#0b0a11] border-r border-white/5 p-2.5 flex flex-col justify-between shrink-0 hidden sm:flex">
                  <div className="flex flex-col gap-5">
                    <div>
                      <span className="text-[8px] text-white/30 font-bold uppercase tracking-wider">Space</span>
                      <ul className="flex flex-col gap-1 mt-1.5">
                        <li className="flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1.5 rounded-lg bg-[#7c5cff]/10 border border-[#7c5cff]/20 text-[#7c5cff] cursor-pointer whitespace-nowrap">
                          <Sparkles className="size-3" />
                          Masterclass
                        </li>
                        <li className="flex items-center gap-1.5 text-[10px] font-medium px-2 py-1.5 rounded-lg text-white/40 hover:bg-white/[0.03] hover:text-white cursor-not-allowed whitespace-nowrap">
                          <Folder className="size-3" />
                          Files
                        </li>
                        <li className="flex items-center gap-1.5 text-[10px] font-medium px-2 py-1.5 rounded-lg text-white/40 hover:bg-white/[0.03] hover:text-white cursor-not-allowed whitespace-nowrap">
                          <BookOpen className="size-3" />
                          Resources
                        </li>
                        <li className="flex items-center gap-1.5 text-[10px] font-medium px-2 py-1.5 rounded-lg text-white/40 hover:bg-white/[0.03] hover:text-white cursor-not-allowed whitespace-nowrap">
                          <Users className="size-3" />
                          Community
                        </li>
                      </ul>
                    </div>

                    <div>
                      <span className="text-[8px] text-white/30 font-bold uppercase tracking-wider">Admin</span>
                      <ul className="flex flex-col gap-1 mt-1.5">
                        <li className="text-[9px] font-medium px-2 py-0.5 text-white/35 cursor-not-allowed whitespace-nowrap">Admin overview</li>
                        <li className="text-[9px] font-medium px-2 py-0.5 text-white/35 cursor-not-allowed whitespace-nowrap">Masterclass</li>
                        <li className="text-[9px] font-medium px-2 py-0.5 text-white/35 cursor-not-allowed whitespace-nowrap">Files</li>
                        <li className="text-[9px] font-medium px-2 py-0.5 text-white/35 cursor-not-allowed whitespace-nowrap">Resources</li>
                      </ul>
                    </div>
                  </div>

                  {/* Telegram lock badge */}
                  <div className="flex flex-col gap-1.5 p-2 rounded-lg bg-white/[0.01] border border-white/5 text-center">
                    <span className="text-[7px] text-white/30 uppercase font-bold tracking-wider">Telegram Group</span>
                    <button className="w-full py-1 text-[8px] font-bold rounded bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/10 flex items-center justify-center gap-1 cursor-pointer">
                      <Lock className="size-2" />
                      Join Chat
                    </button>
                  </div>
                </aside>

                {/* Dashboard Main Area */}
                <main className="flex-1 p-4 sm:p-5 overflow-y-auto scrollbar-none flex flex-col bg-[#08080f]/30">
                  <header className="mb-4 select-none text-left shrink-0">
                    <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">Masterclass</h1>
                    <p className="text-[9px] sm:text-[10px] text-white/30 mt-0.5">All the training videos. Click a thumbnail to watch.</p>
                  </header>

                  {/* Grid of 6 videos */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 flex-1 min-h-0 overflow-y-auto">
                    {[
                      { text: "2H MASTERCLASS LIVE", title: "2h Masterclass Live", time: "2:01:51" },
                      { text: "CURSOR FOR BEGINNER", title: "Cursor pour débutant", time: "42:15" },
                      { text: "FRONTEND GENERATION", title: "Génération Frontend", time: "31:40" },
                      { text: "IMAGE TO CODE", title: "Image To code", time: "55:10" },
                      { text: "ASSET EXTRACTION", title: "Asset Extraction", time: "18:25" },
                      { text: "ANIMATION KING 3.0", title: "Animation with KLING 3.0", time: "1:08:44" },
                    ].map((card, idx) => (
                      <div key={idx} className="bg-[#12111d]/50 border border-white/[0.03] rounded-xl p-1.5 sm:p-2 flex flex-col gap-1.5 relative overflow-hidden group hover:border-violet-500/25 transition-all duration-300">
                        {/* Thumbnail */}
                        <div className="aspect-[16/10] bg-gradient-to-tr from-violet-950/20 via-[#0a0614] to-cyan-950/10 rounded-lg border border-white/[0.04] relative overflow-hidden flex items-center justify-center text-center p-2">
                          <span className="text-[8px] sm:text-[9px] font-sans font-black tracking-wider text-white/50 group-hover:text-white transition duration-300 leading-tight">
                            {card.text}
                          </span>
                          <span className="absolute bottom-1 right-1 text-[7px] font-bold font-mono px-1 rounded bg-black/75 text-white/70">
                            {card.time}
                          </span>
                          {/* Play circle overlay */}
                          <div className="absolute inset-0 bg-violet-600/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                            <div className="w-7 h-7 rounded-full bg-[#7c5cff] flex items-center justify-center shadow-lg shadow-[#7c5cff]/25 text-black">
                              <Play className="size-3 fill-black ml-0.5" />
                            </div>
                          </div>
                        </div>
                        {/* Title */}
                        <h4 className="text-[8px] sm:text-[9.5px] font-bold text-white/60 group-hover:text-white transition duration-300 truncate text-left px-0.5">
                          {card.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                </main>
              </div>

              {/* VSL player video and control overlays */}
              <div 
                className={`absolute inset-0 bg-black z-30 transition-all duration-500 flex flex-col ${
                  isVideoPlaying ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                {/* The actual HTML5 Video Element playing a beautiful cosmos video as VSL */}
                <video
                  ref={videoElRef}
                  onClick={handlePlayToggle}
                  className="w-full h-full object-cover cursor-pointer"
                  src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c05d00db0d473138b0c8c081&profile_id=139&oauth2_token_id=57447761"
                  playsInline
                />

                {/* Custom Overlay Controls bar */}
                <div className="absolute bottom-4 inset-x-4 bg-black/60 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-4 backdrop-blur-md z-40 transition-transform select-none">
                  {/* Pause Button */}
                  <button
                    onClick={handlePlayToggle}
                    className="w-8 h-8 rounded-full bg-[#7c5cff] hover:bg-violet-400 text-black flex items-center justify-center transition active:scale-90 cursor-pointer"
                  >
                    <Pause className="size-3.5 fill-black" />
                  </button>

                  {/* Seek Bar slider track */}
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-[#7c5cff]" style={{ width: `${videoProgress}%` }} />
                    </div>
                    <div className="flex justify-between text-[8px] text-white/40 font-mono font-medium">
                      <span>{videoTimeText.split(" / ")[0]}</span>
                      <span>{videoTimeText.split(" / ")[1]}</span>
                    </div>
                  </div>

                  {/* Volume Control / Mute Toggle */}
                  <button
                    onClick={handleMuteToggle}
                    className="text-white/60 hover:text-white transition cursor-pointer"
                  >
                    {isVideoMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Glowing play overlay on top initially */}
              {!isVideoPlaying && (
                <div 
                  onClick={() => {
                    setIsVideoPlaying(true);
                    setTimeout(() => {
                      videoElRef.current?.play().catch(() => {});
                    }, 50);
                  }}
                  className="absolute inset-0 bg-[#05040c]/15 backdrop-blur-[1.5px] flex flex-col items-center justify-center p-6 z-40 cursor-pointer"
                >
                  <button
                    className="w-20 h-20 rounded-full bg-[#7c5cff] text-white flex items-center justify-center shadow-[0_0_50px_rgba(124,92,255,0.7)] group transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 relative z-50"
                  >
                    <Play className="size-8 fill-white text-white ml-1.5 transition group-hover:scale-110" />
                  </button>
                  <span className="text-[9px] text-violet-200 font-bold uppercase tracking-[0.2em] mt-4 font-sans drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                    {lang === "fr" ? "LANCER LA VIDÉO" : lang === "tr" ? "VİDEOYU BAŞLAT" : lang === "pt" ? "INICIAR VÍDEO" : "PLAY SHOWCASE"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Left Badges */}
          <div
            ref={leftBadgesRef}
            className="absolute left-8 lg:left-20 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-10 hidden md:flex transition-transform duration-0 ease-none select-none"
          >
            <div className="flex items-center gap-3 bg-[#12111d]/50 border border-white/[0.08] pl-2.5 pr-5 py-2 rounded-full shadow-[0_8px_32px_rgba(124,92,255,0.08)] backdrop-blur-xl hover:border-[#7c5cff]/40 hover:bg-[#12111d]/75 transition duration-300">
              <div className="size-7 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/20 flex items-center justify-center">
                <Gem className="size-3.5 text-[#81e6ff] flex-shrink-0" />
              </div>
              <span className="text-xs font-medium text-white/90 tracking-wide">{content.hero.badge1}</span>
            </div>
            <div className="flex items-center gap-3 bg-[#12111d]/50 border border-white/[0.08] pl-2.5 pr-5 py-2 rounded-full shadow-[0_8px_32px_rgba(124,92,255,0.08)] backdrop-blur-xl hover:border-[#7c5cff]/40 hover:bg-[#12111d]/75 transition duration-300">
              <div className="size-7 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/20 flex items-center justify-center">
                <Target className="size-3.5 text-[#81e6ff] flex-shrink-0" />
              </div>
              <span className="text-xs font-medium text-white/90 tracking-wide">{content.hero.badge2}</span>
            </div>
          </div>

          {/* Right Badges */}
          <div
            ref={rightBadgesRef}
            className="absolute right-8 lg:right-20 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-10 hidden md:flex transition-transform duration-0 ease-none select-none"
          >
            <div className="flex items-center gap-3 bg-[#12111d]/50 border border-white/[0.08] pl-2.5 pr-5 py-2 rounded-full shadow-[0_8px_32px_rgba(124,92,255,0.08)] backdrop-blur-xl hover:border-[#7c5cff]/40 hover:bg-[#12111d]/75 transition duration-300">
              <div className="size-7 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/20 flex items-center justify-center">
                <Cpu className="size-3.5 text-[#7c5cff] flex-shrink-0" />
              </div>
              <span className="text-xs font-medium text-white/90 tracking-wide">{content.hero.badge3}</span>
            </div>
            <div className="flex items-center gap-3 bg-[#12111d]/50 border border-white/[0.08] pl-2.5 pr-5 py-2 rounded-full shadow-[0_8px_32px_rgba(124,92,255,0.08)] backdrop-blur-xl hover:border-[#7c5cff]/40 hover:bg-[#12111d]/75 transition duration-300">
              <div className="size-7 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/20 flex items-center justify-center">
                <Trophy className="size-3.5 text-[#7c5cff] flex-shrink-0" />
              </div>
              <span className="text-xs font-medium text-white/90 tracking-wide">{content.hero.badge4}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL-REVEALED SECTIONS BELOW HERO */}
      <div className="relative z-20 bg-[#05040c] border-t border-white/5 shadow-[0_-50px_100px_rgba(5,4,12,0.98)]">
        
        {/* PROGRAMME (MÜFREDAT) Section with 3D Stacked Cards */}
        <section 
          ref={curriculumSectionRef} 
          id="programme" 
          className="relative min-h-screen w-full flex items-center justify-center overflow-visible py-20 px-6 max-w-[1180px] mx-auto"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,92,255,0.08),transparent_50%)] pointer-events-none" />
          
          <div className="w-full grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center min-h-[580px]">
            
            {/* Title side */}
            <div className="text-left select-none relative z-20">
              <span className="text-xs text-[#7c5cff] uppercase tracking-[0.2em] font-bold">
                {content.programme.kicker}
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-light leading-[1.05] tracking-tight text-white mt-4 mb-6">
                {content.programme.title[0]}{" "}
                <span className="font-display italic text-[#7c5cff] block sm:inline">
                  {content.programme.title[1]}
                </span>{" "}
                {content.programme.title[2]}
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-md">
                {content.programme.desc}
              </p>

              {/* Desktop card indicators / bullet track */}
              <div className="flex flex-col gap-3 mt-10 hidden lg:flex">
                {content.programme.modules.map((mod, idx) => {
                  const isActive = activeCardIndex === idx;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => handleBulletClick(idx)}
                      className="flex items-center gap-4 text-left group cursor-pointer"
                    >
                      {/* Line track indicator */}
                      <div className="relative w-8 h-[2px] bg-white/10 overflow-hidden">
                        <div 
                          className={`absolute top-0 left-0 h-full bg-[#7c5cff] transition-all duration-300 ${
                            isActive ? "w-full" : "w-0 group-hover:w-1/2"
                          }`}
                        />
                      </div>
                      <span 
                        className={`text-xs font-mono font-bold transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/40 group-hover:text-white/60"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span 
                        className={`text-xs font-bold transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/40 group-hover:text-white/60"
                        }`}
                      >
                        {mod.kicker}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3D Stack Cards container */}
            <div 
              ref={cardsContainerRef}
              className="relative h-[380px] sm:h-[460px] md:h-[480px] w-full flex items-center justify-center select-none"
              style={{ perspective: "1200px" }}
            >
              {[
                {
                  ref: card0,
                  id: "01",
                  title: content.programme.modules[0].title,
                  kicker: content.programme.modules[0].kicker,
                  desc: content.programme.modules[0].desc,
                  grad: "from-violet-500/[0.35] via-violet-500/[0.12] to-cyan-300/10",
                  visual: (
                    <svg className="w-full h-full text-violet-500/25" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="50" cy="50" r="30" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="18" />
                      <line x1="20" y1="50" x2="80" y2="50" />
                      <line x1="50" y1="20" x2="50" y2="80" />
                    </svg>
                  )
                },
                {
                  ref: card1,
                  id: "02",
                  title: content.programme.modules[1].title,
                  kicker: content.programme.modules[1].kicker,
                  desc: content.programme.modules[1].desc,
                  grad: "from-cyan-300/[0.24] via-violet-500/[0.12] to-fuchsia-300/10",
                  visual: (
                    <svg className="w-full h-full text-cyan-500/25" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="25" y="25" width="50" height="50" rx="6" />
                      <rect x="35" y="35" width="30" height="30" rx="3" strokeDasharray="2 2" />
                      <path d="M25 50h50" />
                    </svg>
                  )
                },
                {
                  ref: card2,
                  id: "03",
                  title: content.programme.modules[2].title,
                  kicker: content.programme.modules[2].kicker,
                  desc: content.programme.modules[2].desc,
                  grad: "from-violet-500/[0.28] via-indigo-500/[0.12] to-cyan-200/10",
                  visual: (
                    <svg className="w-full h-full text-violet-400/25" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M20 70 L50 20 L80 70 Z" />
                      <line x1="20" y1="70" x2="80" y2="70" strokeWidth="2" />
                      <circle cx="50" cy="45" r="5" fill="currentColor" />
                    </svg>
                  )
                },
                {
                  ref: card3,
                  id: "04",
                  title: content.programme.modules[3].title,
                  kicker: content.programme.modules[3].kicker,
                  desc: content.programme.modules[3].desc,
                  grad: "from-white/[0.18] via-violet-500/[0.12] to-blue-500/10",
                  visual: (
                    <svg className="w-full h-full text-white/15" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="20" y="20" width="60" height="40" rx="4" />
                      <line x1="50" y1="60" x2="50" y2="75" />
                      <line x1="35" y1="75" x2="65" y2="75" />
                      <circle cx="50" cy="30" r="3" />
                    </svg>
                  )
                }
              ].map((mod, idx) => (
                <div
                  key={mod.id}
                  ref={mod.ref}
                  className="absolute cursor-grab active:cursor-grabbing w-[300px] h-[360px] sm:w-[320px] sm:h-[400px] md:h-[420px] rounded-[30px] border border-white/[0.12] bg-[#090813] p-6 text-left flex flex-col justify-between shadow-[0_32px_90px_rgba(0,0,0,0.65)] hover:border-violet-500/30 transition-all duration-300"
                  style={{
                    boxShadow: "0 32px 90px rgba(0,0,0,0.62), 0 0 60px rgba(124,92,255,0.18), inset 0 1px 0 rgba(255,255,255,0.14)",
                    backfaceVisibility: "hidden",
                    zIndex: 40 - idx * 10
                  }}
                >
                  {/* Card glow layers */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${mod.grad} rounded-[28px] pointer-events-none`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(255,255,255,0.15),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_28%,rgba(0,0,0,0.3))] rounded-[28px] pointer-events-none" />
                  <div className="absolute -right-20 -top-16 h-48 w-48 rounded-full border-[28px] border-white/[0.04] pointer-events-none" />
                  <div className="absolute -bottom-16 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-violet-400/[0.1] blur-2xl pointer-events-none" />

                  {/* Card Content */}
                  <div className="relative flex h-full flex-col z-10 justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 text-left">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-100/60 leading-none">
                          {mod.kicker}
                        </p>
                        {/* Illustration Container */}
                        <div className="mt-5 w-[160px] h-[90px] rounded-xl border border-white/5 bg-black/30 overflow-hidden flex items-center justify-center p-2">
                          {mod.visual}
                        </div>
                      </div>
                      <div className="grid size-10 place-items-center rounded-full border border-white/[0.1] bg-white/[0.06] text-violet-100 shadow-[0_0_20px_rgba(167,139,250,0.15)] select-none">
                        <span className="font-mono text-xs font-bold leading-none">{mod.id}</span>
                      </div>
                    </div>

                    <div className="mt-auto text-left">
                      <h3 className="font-sans text-2xl sm:text-[2.1rem] font-black uppercase leading-[0.95] tracking-[-0.01em] text-white">
                        {mod.title}
                      </h3>
                      <p className="mt-4 text-[11px] sm:text-xs leading-relaxed text-white/55 font-medium">
                        {mod.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Scroll drag indicator at bottom */}
              <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/40 backdrop-blur-md select-none">
                <MousePointer2 className="size-3" />
                Scroll or drag
              </div>
            </div>
          </div>
        </section>

        {/* MEMBER AREA & LIVE LIBRARY */}
        <section 
          ref={memberSectionRef} 
          id="membre" 
          className="relative py-20 md:py-28 px-6 max-w-[1100px] mx-auto w-full overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <div className="reveal-element text-left">
              <span className="text-xs text-[#7c5cff] uppercase tracking-[0.2em] font-bold">
                {content.member.kicker}
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-light leading-none tracking-tight text-white mt-4 mb-6">
                {content.member.title[0]}{" "}
                <span className="font-display italic text-[#7c5cff] block sm:inline">
                  {content.member.title[1]}
                </span>{" "}
                {content.member.title[2]}
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-8">
                {content.member.desc}
              </p>
              <button
                onClick={() => handleNavClick("acces")}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#7c5cff] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#7c5cff]/30 hover:bg-violet-400 transition cursor-pointer select-none active:scale-95"
              >
                {content.member.cta}
                <ArrowRight className="size-4 animate-pulse" />
              </button>
            </div>

            {/* Living Library Card */}
            <div className="reveal-element bg-[#0c0c16] border border-white/10 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c5cff]/10 blur-3xl rounded-full" />
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">
                  Espace membre
                </span>
                <Library className="size-4 text-[#7c5cff]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-6 text-left">
                {content.member.library}
              </h3>

              {/* Grid list stats */}
              <div className="grid grid-cols-2 gap-4">
                {content.member.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-left group hover:border-[#7c5cff]/30 transition duration-300">
                    <div className="flex items-center justify-between text-[#7c5cff] mb-2 font-mono font-bold text-lg leading-none">
                      <span>{stat.num}</span>
                      <span className="text-[9px] text-muted/40 font-normal">0{idx + 1}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white">{stat.title}</h4>
                    <p className="text-[9px] text-muted mt-1 leading-snug">{stat.desc}</p>
                  </div>
                ))}
              </div>

              {/* Scrolling resource marquee track */}
              <div className="relative w-full overflow-hidden mt-6 border-t border-white/5 pt-5 select-none pointer-events-none">
                <div className="flex gap-4 animate-star-shift whitespace-nowrap">
                  {content.member.bullets.map((b, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-white/40 uppercase tracking-wider bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7c5cff]/40" />
                      {b}
                    </span>
                  ))}
                  {/* Repeat list to loop seamless */}
                  {content.member.bullets.map((b, idx) => (
                    <span key={`dup-${idx}`} className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-white/40 uppercase tracking-wider bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7c5cff]/40" />
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BANNER */}
        <section className="px-6 max-w-[1100px] mx-auto w-full mb-20 relative z-20">
          <div className="reveal-element backdrop-blur-xl bg-[#0c0c16]/50 border border-white/10 rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-4 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            
            {/* Stat 1 */}
            <div className="flex-1 flex items-center gap-4 px-4">
              <div className="size-11 sm:size-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/70 flex-shrink-0">
                <Infinity className="size-5" />
              </div>
              <div className="text-left">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">{content.statsBanner.updateVal.split(' ')[0]}</span>
                  <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">{content.statsBanner.updateVal.split(' ').slice(1).join(' ')}</span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 leading-snug font-medium">{content.statsBanner.updateDesc}</p>
              </div>
            </div>

            {/* Separator 1 */}
            <div className="hidden md:block w-[1px] self-stretch bg-gradient-to-b from-transparent via-violet-500/25 to-transparent relative">
              <div className="absolute inset-y-1/4 left-0 w-[1px] bg-[#7c5cff] shadow-[0_0_8px_#7c5cff]" />
            </div>
            
            {/* Stat 2 */}
            <div className="flex-1 flex items-center gap-4 px-4">
              <div className="size-11 sm:size-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/70 flex-shrink-0">
                <Rocket className="size-5" />
              </div>
              <div className="text-left">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">{content.statsBanner.accessVal.split(' ')[0]}</span>
                  <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">{content.statsBanner.accessVal.split(' ').slice(1).join(' ')}</span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 leading-snug font-medium">{content.statsBanner.accessDesc}</p>
              </div>
            </div>

            {/* Separator 2 */}
            <div className="hidden md:block w-[1px] self-stretch bg-gradient-to-b from-transparent via-violet-500/25 to-transparent relative">
              <div className="absolute inset-y-1/4 left-0 w-[1px] bg-[#7c5cff] shadow-[0_0_8px_#7c5cff]" />
            </div>

            {/* Stat 3 */}
            <div className="flex-1 flex items-center gap-4 px-4">
              <div className="size-11 sm:size-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/70 flex-shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div className="text-left">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">{content.statsBanner.resourcesVal.split(' ')[0]}</span>
                  <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">{content.statsBanner.resourcesVal.split(' ').slice(1).join(' ')}</span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 leading-snug font-medium">{content.statsBanner.resourcesDesc}</p>
              </div>
            </div>

            {/* Separator 3 */}
            <div className="hidden md:block w-[1px] self-stretch bg-gradient-to-b from-transparent via-violet-500/25 to-transparent relative">
              <div className="absolute inset-y-1/4 left-0 w-[1px] bg-[#7c5cff] shadow-[0_0_8px_#7c5cff]" />
            </div>

            {/* Stat 4 */}
            <div className="flex-1 flex items-center gap-4 px-4">
              <div className="size-11 sm:size-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/70 flex-shrink-0">
                <Users className="size-5" />
              </div>
              <div className="text-left">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">{content.statsBanner.membersVal.split(' ')[0]}</span>
                  <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">{content.statsBanner.membersVal.split(' ').slice(1).join(' ')}</span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 leading-snug font-medium">{content.statsBanner.membersDesc}</p>
              </div>
            </div>

          </div>
        </section>

        {/* LANGUAGES & GLOBE */}
        <section 
          ref={langSectionRef} 
          id="langues" 
          className="relative py-20 px-6 max-w-[1100px] mx-auto w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-element text-left">
              <span className="text-xs text-[#7c5cff] uppercase tracking-[0.2em] font-bold">
                {content.langSection.kicker}
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-light leading-none tracking-tight text-white mt-4 mb-6">
                {content.langSection.title[0]}{" "}
                <span className="font-display italic text-[#7c5cff] block sm:inline">
                  {content.langSection.title[1]}
                </span>{" "}
                {content.langSection.title[2]}
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-8">
                {content.langSection.desc}
              </p>

              {/* Language Switcher Buttons */}
              <div className="flex flex-col gap-2.5 max-w-sm">
                {[
                  { key: "en", flag: "🇺🇸", label: "English" },
                  { key: "fr", flag: "🇫🇷", label: "Français" },
                  { key: "pt", flag: "🇧🇷", label: "Português" },
                  { key: "tr", flag: "🇹🇷", label: "Türkçe" },
                ].map((item) => {
                  const isActive = lang === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        setLang(item.key);
                        sessionStorage.setItem("user-language", item.key);
                      }}
                      className={`flex items-center justify-between rounded-2xl px-5 py-3.5 border transition cursor-pointer active:scale-[0.98] ${
                        isActive
                          ? "bg-[#7c5cff]/10 border-[#7c5cff] text-white"
                          : "bg-[#0f0f1a]/50 border-white/5 text-white/50 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                      {isActive && (
                        <span className="flex items-center gap-1 text-[9px] text-[#7c5cff] font-mono border border-[#7c5cff]/20 bg-[#7c5cff]/5 px-1.5 py-0.5 rounded uppercase">
                          <Check className="size-2.5" />
                          active
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* WebGL-Style Canvas Globe */}
            <div className="reveal-element relative aspect-square max-w-[380px] mx-auto w-full flex items-center justify-center bg-[#0f0f1a]/20 border border-white/5 rounded-full p-8 shadow-inner select-none overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-40">
                <GlobeCanvas />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <Languages className="size-8 text-[#7c5cff] mb-2 animate-bounce" />
                <span className="text-[10px] text-[#7c5cff] uppercase tracking-widest font-bold">
                  {content.langSection.badge}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING & shopier BUY CTA */}
        <section 
          ref={pricingSectionRef} 
          id="acces" 
          className="relative py-24 px-6 max-w-[1000px] mx-auto w-full text-center z-10"
        >
          {/* Big ambient background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-r from-[#7c5cff]/12 to-[#81e6ff]/15 blur-[140px] rounded-full pointer-events-none -z-10" />

          {/* Integrated Outer Card with grey-white glassmorphic border */}
          <div className="reveal-element border border-[#7c5cff]/20 bg-gradient-to-b from-[#111122]/60 to-[#07070f]/90 backdrop-blur-2xl rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_0_50px_rgba(124,92,255,0.12),0_32px_100px_rgba(0,0,0,0.85)]">
            
            {/* Header Layout inside the card */}
            <div className="flex flex-col md:flex-row md:items-center justify-between text-left mb-10 gap-6 border-b border-white/[0.06] pb-8">
              <div className="max-w-xl">
                <span className="text-xs text-[#7c5cff] uppercase tracking-[0.2em] font-bold">
                  {content.pricing.offer}
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-light leading-none tracking-tight text-white mt-3">
                  {content.pricing.heading}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-white/50 max-w-sm leading-relaxed md:text-right font-medium">
                {content.pricing.offerDesc}
              </p>
            </div>

            {/* Pricing Box with Gold Border and Two-Column Grid */}
            <div className="border border-[#e0b86a]/40 bg-[#07060d]/80 rounded-[24px] p-6 sm:p-8 md:p-10 text-left shadow-[0_0_35px_rgba(224,184,106,0.08),inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Left Column: Big Gold Price with warm backlighting glow */}
                <div className="relative flex flex-col items-center md:items-start text-center md:text-left md:border-r md:border-white/5 md:pr-10 py-4 overflow-visible">
                  {/* Gold radial backlighting glow */}
                  <div className="absolute top-1/2 left-1/2 md:left-1/3 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] bg-[#e0b86a]/22 blur-[55px] rounded-full pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col items-center md:items-start">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-7xl sm:text-8xl lg:text-[6.5rem] font-black tracking-tighter text-[#e0b86a] font-sans leading-none drop-shadow-[0_4px_35px_rgba(224,184,106,0.3)]">
                        {lang === "fr" ? "34€" : "34$"}
                      </span>
                      {lang === "tr" && (
                        <span className="text-2xl sm:text-3xl font-extrabold text-white/30 tracking-tight font-sans ml-2">
                          / 1190 TL
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-white/50 font-bold uppercase tracking-[0.16em] mt-3.5 block">
                      {lang === "fr" ? "PAIEMENT UNIQUE" : lang === "tr" ? "TEK SEFERLİK ÖDEME" : lang === "pt" ? "PAGAMENTO ÚNICO" : "ONE-TIME PAYMENT"}
                    </span>
                  </div>
                </div>

                {/* Right Column: Bullets & Action Button */}
                <div className="flex flex-col gap-6 text-left">
                  <div className="flex flex-col gap-3.5">
                    {content.pricing.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-3.5 group">
                        <div className="size-5 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/80 flex-shrink-0">
                          <Check className="size-3 text-white/85" />
                        </div>
                        <span className="text-xs sm:text-[13px] text-white/80 font-medium">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* BUY shopier Redirect */}
                  <a
                    href="https://www.shopier.com" // Replace with Shopier checkout
                    target="_blank"
                    rel="noreferrer"
                    className="group w-full inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-full bg-gradient-to-r from-[#161624] to-[#0c0c14] hover:from-[#212136] hover:to-[#12121f] border border-white/10 hover:border-white/20 text-white transition-all duration-300 active:scale-[0.98] shadow-lg cursor-pointer text-sm font-sans"
                  >
                    <span>{content.pricing.btn}</span>
                    <ArrowRight className="size-3.5 text-white/70 transition group-hover:translate-x-0.5" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Footer bar */}
        <footer className="w-full border-t border-white/5 py-8 max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 select-none text-[10px] sm:text-xs text-muted/40">
          <p>© {new Date().getFullYear()} freeprompt.me. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono">
            <span className="cursor-pointer hover:text-white transition">Terms</span>
            <span className="cursor-pointer hover:text-white transition">Privacy</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
