import { motion } from 'framer-motion';
import { Check, ArrowLeft, FileText } from 'lucide-react';

interface VariantSelectorProps {
    variants: string[];
    onSelect: (variant: string) => void;
    onBack: () => void;
}

export function VariantSelector({ variants, onSelect, onBack }: VariantSelectorProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-6xl mx-auto w-full h-full overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex-1 flex flex-col min-h-0"
            >
                {/* Header */}
                <div className="text-center space-y-4 mb-8 flex-shrink-0">
                    <button
                        onClick={onBack}
                        className="absolute left-8 top-8 flex items-center gap-2 text-gray-500 hover:text-text-main transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>

                    <h1 className="text-3xl md:text-4xl font-serif text-text-main">
                        Choose your draft
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Select the version that best matches your intent.
                    </p>
                </div>

                {/* Variants Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full flex-1 min-h-0 overflow-y-auto px-4 pb-4">
                    {variants.map((variant, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col h-full bg-surface/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300 group shadow-lg hover:shadow-xl hover:shadow-accent/5"
                        >
                            {/* Card Header/Badge */}
                            <div className="px-4 py-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Option {index + 1}
                                </span>
                                <FileText size={14} className="text-accent opacity-50" />
                            </div>

                            {/* Content Preview */}
                            <div className="flex-1 p-6 overflow-y-auto min-h-[200px] text-sm leading-relaxed text-gray-300 whitespace-pre-wrap font-mono">
                                {variant}
                            </div>

                            {/* Action Footer */}
                            <div className="p-4 border-t border-white/5 bg-white/5 mt-auto">
                                <button
                                    onClick={() => onSelect(variant)}
                                    className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-accent hover:text-white text-gray-300 py-2.5 rounded-lg transition-all duration-300 font-medium group-hover:bg-accent group-hover:text-white"
                                >
                                    <Check size={16} />
                                    <span>Select this version</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
