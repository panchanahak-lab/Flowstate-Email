import { Bold, Italic, List, Link, Image, Mic } from 'lucide-react';

export function FormattingToolbar() {
    return (
        <div className="flex items-center gap-2 p-1 bg-surface border border-white/5 rounded-lg shadow-lg">
            <div className="flex items-center gap-1 border-r border-white/5 pr-2 mr-2">
                <button aria-label="Bold" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                    <Bold size={16} />
                </button>
                <button aria-label="Italic" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                    <Italic size={16} />
                </button>
                <button aria-label="List" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                    <List size={16} />
                </button>
            </div>

            <div className="flex items-center gap-1">
                <button aria-label="Add Link" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                    <Link size={16} />
                </button>
                <button aria-label="Add Image" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                    <Image size={16} />
                </button>
            </div>

            <div className="ml-auto pl-2 border-l border-white/5">
                <button aria-label="Dictate" className="p-2 text-accent hover:bg-accent/10 rounded-full transition-colors relative group">
                    <Mic size={18} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">Dictate</span>
                </button>
            </div>
        </div>
    );
}
