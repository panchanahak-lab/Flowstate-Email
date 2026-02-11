import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, RefreshCw } from 'lucide-react';
import { aiService } from '../../lib/aiService';

interface AISidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AISidebar({ isOpen, onClose }: AISidebarProps) {
    const [tone, setTone] = useState(0); // -1 to 1
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleToneChange = async (newTone: number) => {
        setTone(newTone);
        setLoading(true);
        const result = await aiService.rewriteText("placeholder", newTone);
        setSuggestion(result);
        setLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    />

                    {/* Sidebar */}
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-80 bg-surface border-l border-white/10 z-50 p-6 flex flex-col shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2 text-accent">
                                <Sparkles size={18} />
                                <span className="font-medium tracking-wide">THOUGHT PARTNER</span>
                            </div>
                            <button aria-label="Close Sidebar" onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Tone Compass */}
                        <div className="space-y-4 mb-8">
                            <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Tone Compass</label>
                            <div className="relative h-12 flex items-center justify-center bg-white/5 rounded-full px-4">
                                <div className="absolute inset-x-4 h-0.5 bg-gray-700" />
                                <input
                                    type="range"
                                    min="-1"
                                    max="1"
                                    step="0.1"
                                    value={tone}
                                    onChange={(e) => handleToneChange(parseFloat(e.target.value))}
                                    className="w-full relative z-10 opacity-0 cursor-pointer"
                                />
                                {/* Thumb Indicator */}
                                <div
                                    className="absolute w-4 h-4 bg-accent rounded-full shadow-[0_0_10px_var(--color-accent)] pointer-events-none transition-all left-[var(--thumb-pos)]"
                                    style={{ '--thumb-pos': `${((tone + 1) / 2) * 80 + 10}%` } as React.CSSProperties}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 font-mono">
                                <span>FRIENDLY</span>
                                <span>ASSERTIVE</span>
                            </div>
                        </div>

                        {/* AI Output Area */}
                        <div className="flex-1 overflow-y-auto space-y-4">
                            <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Suggestion</label>
                            <div className="p-4 rounded-lg bg-white/5 border border-white/5 min-h-[100px] text-sm leading-relaxed relative">
                                {loading ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <RefreshCw size={20} className="animate-spin text-accent" />
                                    </div>
                                ) : suggestion ? (
                                    <p>{suggestion}</p>
                                ) : (
                                    <p className="text-gray-500 italic">Adjust the compass to generate alternative phrasings...</p>
                                )}
                            </div>
                        </div>

                        {/* Unstuck Actions */}
                        <div className="mt-auto space-y-2">
                            <button className="w-full py-3 rounded border border-white/10 hover:bg-white/5 text-sm transition-colors text-left px-4 flex items-center justify-between group">
                                <span>Suggest Subject Lines</span>
                                <Sparkles size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                            </button>
                            <button className="w-full py-3 rounded border border-white/10 hover:bg-white/5 text-sm transition-colors text-left px-4 flex items-center justify-between group">
                                <span>Improve Clarity</span>
                                <RefreshCw size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                            </button>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
