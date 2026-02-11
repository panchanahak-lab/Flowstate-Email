import { ComponentIcon } from 'lucide-react'; // Placeholder icon if needed

interface TypewriterModeToggleProps {
    isActive: boolean;
    onToggle: (active: boolean) => void;
}

export function TypewriterModeToggle({ isActive, onToggle }: TypewriterModeToggleProps) {
    return (
        <button
            onClick={() => onToggle(!isActive)}
            className={`
        px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border
        ${isActive
                    ? 'bg-accent/10 border-accent/20 text-accent shadow-[0_0_10px_-2px_var(--color-accent)]'
                    : 'bg-white/5 border-white/5 text-gray-500 hover:text-gray-300'
                }
      `}
        >
            <span className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-accent animate-pulse' : 'bg-gray-600'}`} />
                TYPEWRITER_MODE
            </span>
        </button>
    );
}
