// src/hooks/useSession.ts
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Session } from '@supabase/supabase-js'

export function useSession() {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSession = async () => {
        const { data, error } = await supabase.auth.getSession()
        if (error){
            console.log(error)
        }
        setSession(data.session ?? null)
        setLoading(false)
        }

        getSession()

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })

        return () => listener?.subscription.unsubscribe()
    }, [])

    return { session, loading }
}
