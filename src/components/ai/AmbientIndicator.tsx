import { motion } from 'framer-motion';

interface AmbientIndicatorProps {
    isVisible: boolean;
    onClick: () => void;
}

export function AmbientIndicator({ isVisible, onClick }: AmbientIndicatorProps) {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
            }}
            onClick={onClick}
            className={`
        fixed left-6 top-1/2 -translate-y-1/2 z-50
        w-3 h-3 rounded-full bg-accent cursor-pointer
        shadow-[0_0_15px_2px_var(--color-accent)]
        hover:scale-125 transition-transform duration-300
      `}
        >
            <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
        </motion.button>
    );
}
