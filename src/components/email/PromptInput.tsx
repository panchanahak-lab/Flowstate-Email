import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PromptInputProps {
    onGenerate: (prompt: string) => void;
}

export function PromptInput({ onGenerate }: PromptInputProps) {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
            onGenerate(prompt);
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

                <form onSubmit={handleSubmit} className="w-full relative group">
                    <div className="absolute inset-0 bg-accent/20 blur-xl rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

                    <div className="relative bg-surface/50 backdrop-blur-sm border border-white/10 rounded-xl p-2 flex flex-col gap-2 shadow-2xl transition-all duration-300 group-focus-within:border-accent/50 group-focus-within:bg-surface">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g. Ask for a meeting rescheduling to next Tuesday due to a conflict..."
                            className="w-full bg-transparent border-none outline-none text-lg text-text-main placeholder-gray-600 p-4 min-h-[120px] resize-none font-sans"
                            autoFocus
                        />

                        <div className="flex justify-between items-center px-2 pb-2">
                            <div className="flex gap-2">
                                {/* Future: Tone selectors could go here */}
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
