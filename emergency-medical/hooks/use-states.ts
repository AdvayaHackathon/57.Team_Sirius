import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';

export interface State {
  id: string;
  name: string;
  code: string;
}

export function useStates() {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStates() {
      try {
        setLoading(true);
        const supabase = getSupabaseClient();
        
        const { data, error } = await supabase
          .from('states')
          .select('*')
          .order('name');
        
        if (error) {
          throw error;
        }
        
        setStates(data || []);
      } catch (err) {
        console.error('Error fetching states:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch states'));
      } finally {
        setLoading(false);
      }
    }

    fetchStates();
  }, []);

  return { states, loading, error };
} 