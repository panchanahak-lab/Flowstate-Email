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
import { AnimatePresence, motion } from 'framer-motion';

import { PromptInput } from './components/email/PromptInput'; // Import
import { aiService } from './lib/aiService'; // Import aiService

function App() {
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false);
  const [isTypewriterMode, setIsTypewriterMode] = useState(false);
  const [showAmbient, setShowAmbient] = useState(false);

  // Editor State
  const [isDrafting, setIsDrafting] = useState(false); // New State
  const [content, setContent] = useState('');
  const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleGenerate = async (prompt: string) => {
    // In a real app, show loading state here
    const draft = await aiService.generateDraft(prompt);
    setContent(draft);
    setIsDrafting(true);
  };

  const handleSend = () => {
    setSendState('sending');

    // Ritual Sequence
    setTimeout(() => {
      setSendState('sent');
      setContent(''); // Reset

      // Reset to idle after success message
      setTimeout(() => {
        setSendState('idle');
        setIsDrafting(false); // Go back to Prompt
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

  return (
    <AppLayout>
      <ThemeToggle />

      {/* Main Content Area */}
      <AnimatePresence mode='wait'>
        {sendState === 'sent' ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
          >
            <p className="text-2xl font-serif text-accent">Your message is on its way.</p>
            <p className="text-gray-500 font-mono text-sm">Well said.</p>
          </motion.div>
        ) : !isDrafting ? (
          <PromptInput key="prompt-input" onGenerate={handleGenerate} />
        ) : (
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
              {/* Back to Prompt (Optional, maybe implied by 'Cancel' or sidebar) */}
              <SendButton onSend={handleSend} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Components */}
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
