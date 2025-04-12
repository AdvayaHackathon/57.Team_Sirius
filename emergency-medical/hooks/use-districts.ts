import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';

export interface District {
  id: string;
  name: string;
  state_id: string;
}

export function useDistricts(stateId?: string) {
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDistricts() {
      try {
        setLoading(true);
        const supabase = getSupabaseClient();
        
        let query = supabase
          .from('districts')
          .select('*')
          .order('name');
        
        if (stateId) {
          query = query.eq('state_id', stateId);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setDistricts(data || []);
      } catch (err) {
        console.error('Error fetching districts:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch districts'));
      } finally {
        setLoading(false);
      }
    }

    fetchDistricts();
  }, [stateId]);

  return { districts, loading, error };
} 