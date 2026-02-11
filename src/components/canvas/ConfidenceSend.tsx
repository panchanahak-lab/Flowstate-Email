import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check } from 'lucide-react';

interface ConfidenceSendProps {
    onSend: () => void;
}

export function ConfidenceSend({ onSend }: ConfidenceSendProps) {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleClick = () => {
        setStatus('sending');
        // Simulate API call / animation delay
        setTimeout(() => {
            setStatus('sent');
            onSend();
        }, 1500);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence mode='wait'>
                {status === 'idle' && (
                    <motion.button
                        layoutId="send-button"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClick}
                        className="bg-dusk-900 text-dawn-50 px-6 py-3 rounded-full font-serif text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
                    >
                        <span>Send with Confidence</span>
                        <Send size={18} />
                    </motion.button>
                )}

                {status === 'sending' && (
                    <motion.div
                        layoutId="send-button"
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.2, 0], opacity: [1, 1, 0] }} // Imploding / folding effect
                        transition={{ duration: 0.8 }}
                        className="bg-dusk-900 text-dawn-50 w-12 h-12 rounded-full flex items-center justify-center"
                    >
                        {/* Envelope Icon folding (abstracted as scale down) */}
                        <Send size={24} />
                    </motion.div>
                )}

                {status === 'sent' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-sm text-dusk-800 px-6 py-4 rounded-xl shadow-sm border border-dusk-100 flex flex-col items-center gap-1"
                    >
                        <div className="text-green-600 mb-1">
                            <Check size={24} />
                        </div>
                        <p className="font-serif text-lg">Your message is on its way.</p>
                        <p className="text-sm text-dusk-400 font-sans">Well said.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
