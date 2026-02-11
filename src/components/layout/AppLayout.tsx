import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen bg-background text-text-main font-sans selection:bg-accent/20">
            <Sidebar />
            <main className="flex-1 relative overflow-hidden flex flex-col">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 flex-1 flex flex-col">
                    {children}
                </div>
            </main>
        </div>
    );
}
