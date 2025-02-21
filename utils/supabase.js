import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

/**
 * Initializes Supabase client and provides auth state management.
 * @returns {{ supabase: SupabaseClient, user: User | null }} Supabase client and user object
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Checks if a user has an active subscription.
 * @param {string} userId - The user's ID
 * @returns {Promise<boolean>} Whether the subscription is active
 */
export async function hasActiveSubscription(userId) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('active')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data?.active || false;
}

/**
 * Fetches user resumes from Supabase.
 * @param {string} userId - The user's ID
 * @returns {Promise<Array>} Array of resume objects
 */
export async function fetchUserResumes(userId) {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

/**
 * Custom hook for Supabase auth state management.
 * @returns {{ supabase: SupabaseClient, user: User | null }} Supabase client and user state
 */
export function useSupabase() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { supabase, user };
}