import { motion } from 'framer-motion';

export function SuccessOverlay() {
    return (
        <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center space-y-4 bg-background/80 backdrop-blur-sm"
        >
            <p className="text-2xl font-serif text-accent">Your message is on its way.</p>
            <p className="text-gray-500 font-mono text-sm">Well said.</p>
        </motion.div>
    );
}
