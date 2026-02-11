import { useState } from 'react';
import { User, Hash, Lock } from 'lucide-react';

export function DraftHeader() {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');

    return (
        <div className="w-full max-w-4xl mx-auto px-8 pt-8 pb-4 space-y-4">
            {/* To Field */}
            <div className="group relative">
                <label className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-xs tracking-widest pointer-events-none transition-colors group-focus-within:text-accent">
                    TARGET_ID [TO]
                </label>
                <div className="flex items-center bg-surface border border-white/5 rounded-lg overflow-hidden transition-all duration-300 group-focus-within:border-accent/30 group-focus-within:shadow-[0_0_15px_-3px_rgba(37,99,235,0.1)]">
                    <div className="pl-36 pr-4 py-3 w-full flex items-center gap-2">
                        {/* Example Recipient Tag (Mock) */}
                        {recipient && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent/10 border border-accent/20 text-accent text-sm">
                                <User size={12} />
                                {recipient}
                                <button onClick={() => setRecipient('')} className="ml-1 hover:text-white">×</button>
                            </span>
                        )}
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder={recipient ? '' : "Add recipient..."}
                            className="flex-1 bg-transparent border-none outline-none text-text-main placeholder-gray-600 font-mono text-sm"
                        />
                    </div>
                    <button aria-label="Toggle Encryption" className="px-4 text-gray-500 hover:text-accent transition-colors">
                        <Lock size={16} />
                    </button>
                </div>
            </div>

            {/* Subject Field */}
            <div className="group relative">
                <label className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-xs tracking-widest pointer-events-none transition-colors group-focus-within:text-accent">
                    CONTEXT_KEY [SUBJECT]
                </label>
                <div className="flex items-center bg-surface border border-white/5 rounded-lg overflow-hidden transition-all duration-300 group-focus-within:border-accent/30 group-focus-within:shadow-[0_0_15px_-3px_rgba(37,99,235,0.1)]">
                    <div className="pl-44 pr-4 py-3 w-full flex items-center gap-2">
                        <Hash size={14} className="text-gray-600 group-focus-within:text-accent transition-colors" />
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Brief description of intent..."
                            className="flex-1 bg-transparent border-none outline-none text-text-main placeholder-gray-600 font-medium tracking-wide"
                        />
                    </div>
                </div>
            </div>

            {/* Meta Bar */}
            <div className="flex items-center gap-3 pt-1">
                <div className="px-3 py-1 rounded border border-accent/20 bg-accent/5 text-accent text-xs font-mono flex items-center gap-2">
                    <Lock size={10} />
                    ENCRYPTED: AES-256
                </div>
                <div className="px-3 py-1 rounded border border-white/5 bg-white/5 text-gray-400 text-xs font-mono flex items-center gap-2">
                    ! PRIORITY: NORMAL
                </div>
            </div>
        </div>
    );
}
