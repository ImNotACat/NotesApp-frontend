import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async () => {
        setLoading(true)
        setError('')
        setMessage('')
        const { error } = await supabase.auth.signInWithOtp({ email })
        setLoading(false)
        if (error) setError(error.message)
        else setMessage('Check your email for a login link!')
    }

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin, 
        },
        })
        if (error) {
        setError(error.message)
        } else { 
            console.log("User logged in successfully!")
        }
    }


  return (
    <div className="login-main-wrapper  h-screen w-screen">
      <div className="login-card">
        <h1 className="login-title">Welcome to PurrNote </h1>

        <input
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />

        <button
          className="login-button login-email-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Sending magic link...' : 'Login with Email'}
        </button>

        <div className="login-divider">
          <div className="login-divider-line" />
          <span className="login-divider-text">or</span>
          <div className="login-divider-line" />
        </div>

        <button
          className="login-button login-google-button"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>

        {message && <p className="login-message success">{message}</p>}
        {error && <p className="login-message error">{error}</p>}
      </div>
    </div>
  )
}
