import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LandingProps {
    onStart: (recipient: string) => void;
}

export function Landing({ onStart }: LandingProps) {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center p-8 bg-transparent transition-colors duration-1000">

            {/* Optical Center Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center w-full max-w-2xl"
            >
                <label
                    htmlFor="recipient-input"
                    className="block text-xl md:text-2xl text-dusk-800 font-serif mb-8 tracking-wide opacity-80"
                >
                    Who are you writing to today?
                </label>

                <div className="relative group">
                    <input
                        id="recipient-input"
                        type="text"
                        autoFocus
                        className="w-full bg-transparent text-3xl md:text-5xl text-dusk-900 border-b border-dusk-100 pb-4 focus:outline-none focus:border-dusk-300 transition-colors duration-500 text-center font-serif placeholder:text-dusk-100/50"
                        placeholder=""
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                onStart(e.currentTarget.value.trim());
                            }
                        }}
                    />
                    {/* Subtle indicator to press enter */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute top-full left-0 right-0 mt-4 text-sm text-dusk-400 font-sans tracking-widest uppercase text-center"
                    >
                        Press Enter to begin
                    </motion.div>
                </div>

            </motion.div>

            {/* Decorative ambient elements (optional, kept minimal as requested) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ delay: 1, duration: 2 }}
                className="fixed bottom-12 text-dusk-300 flex items-center gap-2 text-sm font-sans"
            >
                <Sparkles size={14} />
                <span>A Sanctuary for Thought</span>
            </motion.div>

        </div>
    );
}
