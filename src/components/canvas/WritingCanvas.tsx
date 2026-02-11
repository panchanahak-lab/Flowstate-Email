import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AmbientIndicators } from '../ambient/AmbientIndicators';
import { ConfidenceSend } from './ConfidenceSend';

interface WritingCanvasProps {
    recipient: string;
}

export function WritingCanvas({ recipient }: WritingCanvasProps) {

    const [paragraphs, setParagraphs] = useState<string[]>(['']);
    const [activeParagraphIndex, setActiveParagraphIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLTextAreaElement>(null);

    // Auto-focus active paragraph
    useEffect(() => {
        if (activeRef.current) {
            activeRef.current.focus();
        }
    }, [activeParagraphIndex]);

    // Handle Typewriter Scroll
    useEffect(() => {
        if (activeRef.current && containerRef.current) {
            // Smooth scroll the container so the active element is centered
            activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [activeParagraphIndex, paragraphs]); // Scroll when index changes or content grows

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newParagraphs = [...paragraphs];
            // Enter always creates new paragraph after current
            newParagraphs.splice(index + 1, 0, '');
            setParagraphs(newParagraphs);
            setActiveParagraphIndex(index + 1);
        } else if (e.key === 'Backspace' && paragraphs[index] === '' && paragraphs.length > 1) {
            e.preventDefault();
            const newParagraphs = paragraphs.filter((_, i) => i !== index);
            setParagraphs(newParagraphs);
            setActiveParagraphIndex(Math.max(0, index - 1));
        } else if (e.key === 'ArrowUp' && index > 0) {
            setActiveParagraphIndex(index - 1);
        } else if (e.key === 'ArrowDown' && index < paragraphs.length - 1) {
            setActiveParagraphIndex(index + 1);
        }
    };

    const handleChange = (val: string, index: number) => {
        const newParagraphs = [...paragraphs];
        newParagraphs[index] = val;
        setParagraphs(newParagraphs);
    };

    // Derived state for ambient indicators
    const hasContent = paragraphs.some(p => p.length > 0);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-screen overflow-hidden bg-transparent"
        >
            {/* Scrollable Container */}
            <div
                ref={containerRef}
                className="w-full h-full overflow-y-auto no-scrollbar py-[40vh] px-8 max-w-3xl mx-auto"
            >
                <div className="absolute top-8 left-8 text-dusk-300 text-sm font-serif italic">
                    To: {recipient}
                </div>

                <div className="flex flex-col gap-6">
                    {paragraphs.map((text, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                opacity: i === activeParagraphIndex ? 1 : 0.6,
                                scale: i === activeParagraphIndex ? 1 : 0.99
                            }}
                            transition={{ duration: 0.4 }}
                            className="w-full relative"
                        >
                            <textarea
                                ref={i === activeParagraphIndex ? activeRef : null}
                                value={text}
                                onChange={(e) => handleChange(e.target.value, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                onClick={() => setActiveParagraphIndex(i)}
                                placeholder={i === 0 ? "Start writing..." : ""}
                                className="w-full bg-transparent resize-none outline-none border-none text-xl md:text-2xl leading-relaxed font-serif text-dusk-900 placeholder:text-dusk-200 overflow-hidden"
                                style={{
                                    height: 'auto',
                                    minHeight: '1.8em'
                                }}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = 'auto';
                                    target.style.height = target.scrollHeight + 'px';
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Ambient Layer */}
            <AmbientIndicators hasContent={hasContent} />

            {/* Interaction Layer */}
            {hasContent && (
                <ConfidenceSend onSend={() => console.log('Sent!')} />
            )}
        </motion.div>
    );
}
