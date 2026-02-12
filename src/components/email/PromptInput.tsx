import { useState } from 'react';
import { Sparkles, ArrowRight, Type, AlertCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromptInputProps {
    onGenerate: (prompt: string, options: { subject?: string; tone?: string; priority?: string }) => void;
}

const TONES = ['Professional', 'Friendly', 'Direct'];
const PRIORITIES = ['Low', 'Normal', 'High'];

export function PromptInput({ onGenerate }: PromptInputProps) {
    const [prompt, setPrompt] = useState('');
    const [subject, setSubject] = useState('');
    const [tone, setTone] = useState('Professional');
    const [priority, setPriority] = useState('Normal');
    const [showOptions, setShowOptions] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
            onGenerate(prompt, { subject, tone, priority });
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-3xl mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-8"
            >
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif text-text-main">
                        What would you like to say?
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Describe your intent, and let Flowstate draft it for you.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full relative group space-y-4">

                    {/* Main Input Card */}
                    <div className="relative bg-surface/50 backdrop-blur-sm border border-white/10 rounded-xl p-2 flex flex-col gap-2 shadow-2xl transition-all duration-300 group-focus-within:border-accent/50 group-focus-within:bg-surface">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onFocus={() => setShowOptions(true)}
                            placeholder="e.g. Ask for a meeting rescheduling to next Tuesday due to a conflict..."
                            className="w-full bg-transparent border-none outline-none text-lg text-text-main placeholder-gray-600 p-4 min-h-[120px] resize-none font-sans"
                            autoFocus
                        />

                        {/* Options Toolbar */}
                        <AnimatePresence>
                            {showOptions && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden border-t border-white/5"
                                >
                                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">

                                        {/* Subject Input */}
                                        <div className="md:col-span-2 flex items-center gap-3 bg-background/50 rounded-lg px-3 py-2 border border-white/5 focus-within:border-accent/30 transition-colors">
                                            <Type size={16} className="text-gray-500" />
                                            <input
                                                type="text"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                placeholder="Subject (optional)"
                                                className="bg-transparent border-none outline-none text-sm text-text-main placeholder-gray-600 w-full"
                                            />
                                        </div>

                                        {/* Tone Selector */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-gray-500 flex items-center gap-2">
                                                <MessageSquare size={12} /> Tone
                                            </label>
                                            <div className="flex bg-background/50 rounded-lg p-1 border border-white/5">
                                                {TONES.map(t => (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        onClick={() => setTone(t)}
                                                        className={`flex-1 text-xs py-1.5 rounded-md transition-all ${tone === t ? 'bg-surface text-accent shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Priority Selector */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-gray-500 flex items-center gap-2">
                                                <AlertCircle size={12} /> Priority
                                            </label>
                                            <div className="flex bg-background/50 rounded-lg p-1 border border-white/5">
                                                {PRIORITIES.map(p => (
                                                    <button
                                                        key={p}
                                                        type="button"
                                                        onClick={() => setPriority(p)}
                                                        className={`flex-1 text-xs py-1.5 rounded-md transition-all ${priority === p ? 'bg-surface text-accent shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                                    >
                                                        {p}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-between items-center px-4 pb-2 pt-2">
                            <div className="text-xs text-gray-600">
                                {prompt.length > 0 ? `${prompt.length} chars` : ''}
                            </div>
                            <button
                                type="submit"
                                disabled={!prompt.trim()}
                                className="flex items-center gap-2 bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg transition-all font-medium shadow-lg hover:shadow-accent/25"
                            >
                                <Sparkles size={18} />
                                <span>Draft Email</span>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
