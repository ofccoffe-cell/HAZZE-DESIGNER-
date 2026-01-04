
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useCallback } from 'react';
import { 
  AppState, 
  SERVICES, 
  Service, 
  LoginMethod 
} from './types';
import { 
  FacebookIcon, 
  MailIcon, 
  VKIcon, 
  WhatsAppIcon,
  UserIcon,
  LayoutIcon,
  LayersIcon,
  ImageIcon,
  TvIcon,
  ExternalLinkIcon
} from './components/icons';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOGIN);
  const [user, setUser] = useState<{method: LoginMethod} | null>(null);

  const CONTACT_WHATSAPP = '5584999400362';
  const CONTACT_EMAIL = 'ofccoffe@gmail.com';

  // --- Sistema de Som Profissional ---
  const playSound = useCallback((type: 'click' | 'success') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'click') {
        // Som de clique tecnológico curto
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.1);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
      } else {
        // Som de sucesso mais encorpado
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(300, now);
        oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.2);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        oscillator.start(now);
        oscillator.stop(now + 0.2);
      }
    } catch (e) {
      console.warn("Audio Context não suportado ou bloqueado.");
    }
  }, []);

  const handleLogin = (method: LoginMethod) => {
    playSound('click');
    setUser({ method });
    setAppState(AppState.DASHBOARD);
  };

  const handleBookService = (service: Service) => {
    playSound('success');
    const message = encodeURIComponent(`Olá HAZZE DESIGNER! Gostaria de agendar o serviço: ${service.name} (R$ ${service.price},00).`);
    // Pequeno delay para o som ser ouvido antes de sair da página
    setTimeout(() => {
      window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=${message}`, '_blank');
    }, 150);
  };

  const renderIcon = (iconName: string) => {
    const className = "w-8 h-8 text-red-500 group-hover:text-red-400 transition-colors";
    switch(iconName) {
      case 'User': return <UserIcon className={className} />;
      case 'Layout': return <LayoutIcon className={className} />;
      case 'Layers': return <LayersIcon className={className} />;
      case 'Image': return <ImageIcon className={className} />;
      case 'Tv': return <TvIcon className={className} />;
      default: return <ImageIcon className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-red-500/30">
      {/* Cinematic Red Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-red-900/10 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full"></div>
      </div>

      <header className="relative z-10 py-6 px-6 border-b border-white/5 backdrop-blur-md bg-black/40 sticky top-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black tracking-tighter flex items-center gap-2">
              <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">HAZZE DESIGNER</span>
            </h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-0.5">Premium Digital Art Studio</p>
          </div>
          
          <div className="flex items-center gap-6 text-xs font-medium text-gray-400">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-red-500 transition-colors flex items-center gap-2">
              <MailIcon className="w-4 h-4" /> {CONTACT_EMAIL}
            </a>
            <a 
              href={`https://wa.me/${CONTACT_WHATSAPP}`} 
              target="_blank" 
              onClick={() => playSound('click')}
              className="bg-red-600/10 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-full hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp Oficial
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-grow max-w-6xl mx-auto w-full p-6 py-12">
        {appState === AppState.LOGIN ? (
          <div className="max-w-md mx-auto mt-12">
            <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
              
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-600/30">
                  <UserIcon className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Login de Acesso</h2>
                <p className="text-gray-500 text-sm">Identifique-se para solicitar seu orçamento</p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => handleLogin('Facebook')}
                  onMouseEnter={() => playSound('click')}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-[#1877F2] hover:bg-[#1877F2]/90 rounded-2xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20"
                >
                  <FacebookIcon className="w-5 h-5 fill-current" />
                  Entrar com Facebook
                </button>
                
                <button 
                  onClick={() => handleLogin('Email')}
                  onMouseEnter={() => playSound('click')}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all active:scale-[0.98]"
                >
                  <MailIcon className="w-5 h-5" />
                  Entrar com E-mail
                </button>

                <button 
                  onClick={() => handleLogin('VK')}
                  onMouseEnter={() => playSound('click')}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-[#0077FF] hover:bg-[#0077FF]/90 rounded-2xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-blue-500/10"
                >
                  <VKIcon className="w-5 h-5" />
                  Entrar com VK
                </button>
              </div>

              <p className="mt-8 text-center text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                HAZZE DESIGNER &copy; 2024
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-red-600"></div>
                  <span className="text-red-500 text-xs font-black uppercase tracking-[0.3em]">Serviços Profissionais</span>
                </div>
                <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase">Agende Aqui</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Transforme seu canal ou perfil com artes exclusivas. Selecione o serviço desejado e finalize os detalhes diretamente comigo via WhatsApp.
                </p>
              </div>
              <div className="bg-red-600/10 border border-red-600/20 rounded-2xl px-5 py-3 text-sm text-red-400 font-bold backdrop-blur-sm">
                Logado via {user?.method}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => (
                <div 
                  key={service.id}
                  onMouseEnter={() => playSound('click')}
                  className="group relative bg-[#0f0f0f] border border-white/5 hover:border-red-600/40 rounded-[2rem] p-8 transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(220,38,38,0.2)] overflow-hidden"
                >
                  {/* Card Background Decoration */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-600/5 blur-3xl rounded-full group-hover:bg-red-600/10 transition-colors"></div>
                  
                  <div className="mb-8 bg-red-600/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-red-600/20 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    {renderIcon(service.icon)}
                  </div>
                  
                  <h3 className="text-2xl font-black mb-3 tracking-tight group-hover:text-red-500 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-10 leading-relaxed font-medium">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Preço Fixo</span>
                      <span className="text-3xl font-black text-white">R$ {service.price},00</span>
                    </div>
                    
                    <button 
                      onClick={() => handleBookService(service)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-2xl font-black transition-all shadow-lg shadow-red-900/20 group-hover:scale-105 active:scale-95"
                    >
                      PEDIR <ExternalLinkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <footer className="mt-32 pb-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-20 bg-white/5"></div>
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <div className="h-px w-20 bg-white/5"></div>
              </div>
              <p className="text-gray-600 text-sm font-bold uppercase tracking-widest">&copy; 2024 HAZZE DESIGNER</p>
              <p className="mt-2 text-xs text-gray-700">Qualidade e Rapidez em cada Pixel.</p>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
