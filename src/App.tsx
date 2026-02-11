import { useState } from 'react';
import { Landing } from './components/Landing';
import { WritingCanvas } from './components/canvas/WritingCanvas';
// import { AnimatePresence } from 'framer-motion';

function App() {
  const [mode, setMode] = useState<'landing' | 'writing'>('landing');
  const [recipient, setRecipient] = useState<string>('');

  const handleStart = (to: string) => {
    setRecipient(to);
    setMode('writing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dawn-50 via-dawn-100 to-dawn-50 transition-colors duration-1000 overflow-hidden font-serif">
      {mode === 'landing' ? (
        <Landing onStart={handleStart} />
      ) : (
        <WritingCanvas recipient={recipient} />
      )}
    </div>
  );
}

export default App;
