import { motion } from 'framer-motion';

interface AmbientIndicatorsProps {
    hasContent: boolean;
}

export function AmbientIndicators({ hasContent }: AmbientIndicatorsProps) {
    if (!hasContent) return null;

    // Mock logic: Show indicators randomly or based on length
    // For demo, we just show a static "tone" indicator that might appear

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4"
        >
            {/* Tone Indicator (Blue) */}
            <motion.div
                className="w-2 h-2 rounded-full bg-blue-200 cursor-pointer"
                whileHover={{ scale: 1.5, backgroundColor: "#bfdbfe" }} // blue-200
                title="Tone: Friendly"
            />

            {/* Clarity Indicator (Orange) - Mocked conditional */}
            <motion.div
                className="w-2 h-2 rounded-full bg-orange-200 cursor-pointer"
                whileHover={{ scale: 1.5, backgroundColor: "#fed7aa" }} // orange-200
                title="Clarity suggestion available"
            />

        </motion.div>
    );
}
