import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

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