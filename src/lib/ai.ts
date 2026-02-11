import { supabase } from './supabase';

interface AIResponse {
    suggestion: string;
    type: 'tone' | 'conciseness' | 'clarity';
}

export async function getAmbientSuggestions(text: string): Promise<AIResponse | null> {
    console.log('STUB: Analyzing text for ambient suggestions...', text.length);
    // TODO: Call Supabase Edge Function -> GPT-4o mini

    // Mock random suggestion
    if (text.length > 50 && Math.random() > 0.7) {
        return {
            type: 'tone',
            suggestion: 'Consider a warmer opening.'
        };
    }

    return null;
}

export async function improveText(text: string, goal: string) {
    console.log(`STUB: Improving text with goal: ${goal}`);
    return `Better version of: ${text}`;
}
