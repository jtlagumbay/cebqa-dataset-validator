import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase project URL and public API key
const SUPABASE_URL = 'https://qwhtyzuyqfsfyvizoudd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3aHR5enV5cWZzZnl2aXpvdWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTE3NzIsImV4cCI6MjA0NzQ2Nzc3Mn0.AX8Xges_1AW5rJvyNsiBfuvLACPPq-Tgcgy4dRrOVsI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);