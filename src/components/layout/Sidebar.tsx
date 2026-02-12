import { useState } from 'react';
import { PenSquare, Inbox, FileText, Send, Archive, Settings, User } from 'lucide-react';

{ id: 'drafts', icon: FileText, label: 'Drafts' },

interface SidebarProps {
    onCompose: () => void;
}

export function Sidebar({ onCompose }: SidebarProps) {
    const [activeId, setActiveId] = useState('drafts');

    return (
        <aside className="w-64 h-screen bg-background border-r border-white/5 flex flex-col pt-6 pb-4">
            <div className="px-6 mb-8">
                <button
                    onClick={onCompose}
                    className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white py-3 rounded-lg transition-all duration-300 shadow-[0_0_15px_-3px_var(--color-accent)] hover:shadow-[0_0_20px_-3px_var(--color-accent)]"
                >
                    <PenSquare size={18} />
                    <span className="font-medium tracking-wide">Compose</span>
                </button>
            </div>

            <nav className="flex-1 px-3 space-y-1">
                {VIEW_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeId === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveId(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 group ${isActive
                                ? 'bg-surface text-accent shadow-sm'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                                }`}
                        >
                            <Icon
                                size={18}
                                className={`transition-colors duration-200 ${isActive ? 'text-accent' : 'text-gray-500 group-hover:text-gray-300'}`}
                            />
                            <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="px-3 mt-auto space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all duration-200">
                    <Settings size={18} className="text-gray-500 group-hover:text-gray-300" />
                    <span className="text-sm font-medium">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all duration-200">
                    <User size={18} className="text-gray-500 group-hover:text-gray-300" />
                    <span className="text-sm font-medium">Account</span>
                </button>
            </div>
        </aside>
    );
}
