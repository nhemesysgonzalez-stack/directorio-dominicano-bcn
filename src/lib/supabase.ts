import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

const supabaseUrl = rawUrl || 'https://placeholder.supabase.co';
const supabaseAnonKey = rawKey || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


