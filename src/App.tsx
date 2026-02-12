import { useState, useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { DraftHeader } from './components/email/DraftHeader';
import { EditorCanvas } from './components/email/EditorCanvas';
import { FormattingToolbar } from './components/email/FormattingToolbar';
import { SendButton } from './components/email/SendButton';
import { TypewriterModeToggle } from './components/email/TypewriterModeToggle';
import { AmbientIndicator } from './components/ai/AmbientIndicator';
import { AISidebar } from './components/ai/AISidebar';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { SuccessOverlay } from './components/ui/SuccessOverlay';
import { PromptInput } from './components/email/PromptInput';
import { VariantSelector } from './components/email/VariantSelector';
import { aiService } from './lib/aiService';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [view, setView] = useState<'prompt' | 'selecting' | 'drafting'>('prompt');

  // Editor & UI State
  const [content, setContent] = useState('');
  const [isTypewriterMode, setIsTypewriterMode] = useState(false);
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false);
  const [showAmbient, setShowAmbient] = useState(false);
  const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [showSuccess, setShowSuccess] = useState(false);

  // Generator State
  const [variants, setVariants] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (prompt: string, options: { subject?: string; tone?: string; priority?: string }) => {
    setLoading(true);
    // Simulate AI delay and generation
    const generatedVariants = await aiService.generateDraft(prompt, options);
    setVariants(generatedVariants);
    setLoading(false);
    setView('selecting');
  };

  const handleSelectVariant = (selectedContent: string) => {
    setContent(selectedContent);
    setView('drafting');
  };

  const handleSend = () => {
    setSendState('sending');
    setShowSuccess(true);

    // Ritual Sequence
    setTimeout(() => {
      setSendState('sent');

      // Reset after animation
      setTimeout(() => {
        setSendState('idle');
        setShowSuccess(false);
        setContent('');
        setView('prompt');
      }, 3000);
    }, 2000);
  };

  // Simulate Idle Timer for Ambient Indicator
  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      setShowAmbient(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setShowAmbient(true), 3000); // 3s idle
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    resetTimer(); // Init

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  // Prevent accidental back navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      if (view !== 'prompt') {
        setView('prompt');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [view]);

  return (
    <AppLayout handleCompose={() => setView('prompt')}>
      <ThemeToggle />

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {view === 'prompt' && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center relative p-6 h-full"
          >
            {loading ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 animate-pulse">Crafting your drafts...</p>
              </div>
            ) : (
              <PromptInput onGenerate={handleGenerate} />
            )}
          </motion.div>
        )}

        {view === 'selecting' && (
          <motion.div
            key="selecting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 relative h-full flex flex-col"
          >
            <VariantSelector
              variants={variants}
              onSelect={handleSelectVariant}
              onBack={() => setView('prompt')}
            />
          </motion.div>
        )}

        {view === 'drafting' && (
          <motion.div
            key="editor"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              scale: sendState === 'sending' ? 0.95 : 1,
              y: sendState === 'sending' ? -20 : 0
            }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col h-screen overflow-hidden transition-opacity duration-500 rounded-xl
                    ${isTypewriterMode ? 'opacity-90' : 'opacity-100'}
                `}
          >
            {/* Header Section */}
            <div className="flex-none">
              <DraftHeader />
            </div>

            {/* Editor Section - Flexible Height */}
            <div className="flex-1 flex flex-col min-h-0 relative">
              <EditorCanvas content={content} onChange={setContent} />

              {/* Floating Toolbar & Actions */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
                <FormattingToolbar />
                <div className="h-8 w-px bg-white/10 mx-2" />
                <TypewriterModeToggle isActive={isTypewriterMode} onToggle={setIsTypewriterMode} />
              </div>
            </div>

            {/* Footer / Send Area */}
            <div className="flex-none p-8 flex justify-end">
              <SendButton onSend={handleSend} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && <SuccessOverlay />}
      </AnimatePresence>

      <AmbientIndicator
        isVisible={showAmbient && !isAiSidebarOpen && sendState === 'idle'}
        onClick={() => setIsAiSidebarOpen(true)}
      />

      <AISidebar
        isOpen={isAiSidebarOpen}
        onClose={() => setIsAiSidebarOpen(false)}
      />
    </AppLayout>
  );
}

export default App;
