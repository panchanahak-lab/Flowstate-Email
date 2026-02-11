import { useState, useRef, useEffect } from 'react';

interface EditorCanvasProps {
    content: string;
    onChange: (value: string) => void;
}

export function EditorCanvas({ content, onChange }: EditorCanvasProps) {
    const [isFocused, setIsFocused] = useState(false);
    const editorRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.style.height = 'auto';
            editorRef.current.style.height = editorRef.current.scrollHeight + 'px';
        }
    }, [content]);

    return (
        <div className="w-full max-w-4xl mx-auto px-8 py-6 flex-1 flex flex-col min-h-0">
            <div className="relative flex-1 flex flex-col">
                {/* Corner Decorations */}
                <div className={`absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 transition-colors duration-300 ${isFocused ? 'border-accent' : 'border-gray-700'}`} />
                <div className={`absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 transition-colors duration-300 ${isFocused ? 'border-accent' : 'border-gray-700'}`} />
                <div className={`absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 transition-colors duration-300 ${isFocused ? 'border-accent' : 'border-gray-700'}`} />
                <div className={`absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300 ${isFocused ? 'border-accent' : 'border-gray-700'}`} />

                {/* Editor Container */}
                <div
                    className={`flex-1 bg-surface/50 border transition-all duration-500 rounded-lg backdrop-blur-sm p-8
                ${isFocused
                            ? 'border-accent/20 shadow-[0_0_30px_-5px_rgba(37,99,235,0.05)]'
                            : 'border-white/5'
                        }
            `}
                >
                    <textarea
                        ref={editorRef}
                        value={content}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full h-full bg-transparent border-none outline-none resize-none
                    text-lg leading-relaxed font-serif text-text-main/90 placeholder-gray-600"
                        placeholder="// Initialize message sequence...&#10;// Waiting for input..."
                    />

                    {/* Fingerprint / Watermark */}
                    <div className="absolute bottom-6 right-6 pointer-events-none opacity-5">
                        <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z" />
                            <path d="M50 20c-16.5 0-30 13.5-30 30s13.5 30 30 30 30-13.5 30-30-13.5-30-30-30zm0 50c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
