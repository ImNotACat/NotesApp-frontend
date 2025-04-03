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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 48 48"
                style={{ marginRight: '8px' }}
            >
                <path
                fill="#EA4335"
                d="M24 9.5c3.4 0 6.4 1.2 8.8 3.3l6.5-6.5C35.4 2.4 30.1 0 24 0 14.7 0 6.9 5.7 3.3 13.9l7.6 5.9C13.3 14.1 18.3 9.5 24 9.5z"
                />
                <path
                fill="#34A853"
                d="M24 48c6.1 0 11.4-2.4 15.3-6.3l-7.1-5.8c-2.2 1.6-5 2.5-8.2 2.5-5.8 0-10.8-3.9-12.5-9.1l-7.6 5.9C6.9 42.3 14.7 48 24 48z"
                />
                <path
                fill="#4A90E2"
                d="M43.6 20H24v8h11.3c-0.5 2.7-2.2 5.1-4.6 6.5l7.1 5.8C41.6 36.5 44 31.6 44 26c0-1.3-0.1-2.6-0.4-4z"
                />
                <path
                fill="#FBBC05"
                d="M11.5 28.6c-0.5-1.3-0.8-2.6-0.8-4s0.3-2.7 0.8-4l-7.6-5.9C2.5 17 1 21.4 1 26s1.5 9 4 12.3l7.6-5.9z"
                />
            </svg>
            Login with Google
            </button>


        {message && <p className="login-message success">{message}</p>}
        {error && <p className="login-message error">{error}</p>}
      </div>
    </div>
  )
}
