import { createClient } from '@supabase/supabase-js';

// STUB: Replace with actual environment variables when available
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function saveDraft(content: string, recipient: string) {
    console.log('STUB: Saving draft...', { content, recipient });
    // TODO: Implement actual Supabase save
    return { success: true };
}
