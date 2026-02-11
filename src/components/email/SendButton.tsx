import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SendButtonProps {
    onSend: () => void;
}

export function SendButton({ onSend }: SendButtonProps) {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleClick = () => {
        if (status !== 'idle') return;

        setStatus('sending');

        // Simulate API call and ritual duration
        setTimeout(() => {
            setStatus('sent');
            onSend(); // Trigger parent ritual

            setTimeout(() => {
                setStatus('idle');
            }, 3000);
        }, 1500);
    };

    return (
        <button
            onClick={handleClick}
            disabled={status !== 'idle'}
            className="relative group overflow-hidden bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-white px-8 py-3 rounded-md transition-all duration-300 shadow-[0_0_20px_-5px_var(--color-accent)] hover:shadow-[0_0_25px_-5px_var(--color-accent)]"
        >
            <div className="relative z-10 flex items-center gap-2 font-medium tracking-wide">
                <AnimatePresence mode='wait'>
                    {status === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                        >
                            <span>TRANSMIT</span>
                            <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                    )}
                    {status === 'sending' && (
                        <motion.div
                            key="sending"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            SENDING...
                        </motion.div>
                    )}
                    {status === 'sent' && (
                        <motion.div
                            key="sent"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                        >
                            <Check size={16} />
                            <span>SENT</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background Shine Effect */}
            <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-white/10 transition-transform duration-300" />
        </button>
    );
}
