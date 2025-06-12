import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { toast } from 'react-toastify'

export default function OTPVerify() {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60) // 1 minute in seconds
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email
  const password = location.state?.password
  const currentOtp = location.state?.otp // Get OTP from location state

  useEffect(() => {
    if (!email || !password) {
      navigate('/')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [email, password, navigate])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !otp) {
      toast.error('Please enter the OTP')
      return
    }

    // Validate OTP format
    if (!/^\d{6}$/.test(otp)) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }

    setLoading(true)
    try {
      console.log('Submitting OTP:', { email, otp }); // Add logging
      const response = await authService.verifyOTP({ email, otp })
      console.log('OTP verification successful:', response); // Add logging
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (error) {
      console.error('OTP verification failed:', error); // Add error logging
      toast.error(error.response?.data?.message || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    try {
      await authService.login({ email, password })
      setTimeLeft(300)
      toast.success('New OTP sent successfully')
    } catch (error) {
      toast.error('Failed to resend OTP')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative bg-gray-500 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/20">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-700 px-4 py-1 rounded-full text-sm text-white backdrop-blur-md shadow-md">
          🔒 Verify OTP
        </div>

        {/* Display OTP at the top */}
        <div className="mb-6 p-4 bg-white/10 rounded-xl border border-white/20">
          <p className="text-black/70 text-center text-sm">Your OTP is:</p>
          <p className=" text-center text-2xl font-mono tracking-[0.5em] mt-2">
            {currentOtp}
          </p>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2">Enter OTP</h2>
        <p className="text-black/70 text-center mb-8">
          We sent a verification code to<br />
          <span className=" font-medium">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-center text-2xl tracking-[0.5em] placeholder:text-base placeholder:tracking-normal placeholder:text-black/60 focus:outline-none focus:ring-1 focus:ring-red-500 transition"
              required
              maxLength={6}
            />
            <div className="mt-2 text-center text-black/60 text-sm">
              Time remaining: {formatTime(timeLeft)}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || timeLeft === 0}
            className={`w-full py-3 rounded-xl font-semibold transition 
              ${loading || timeLeft === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}
              text-white flex items-center justify-center shadow-md`}
          >
            {loading ? (
              <>
                <span className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify OTP'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResendOTP}
            disabled={timeLeft > 0}
            className={`text-sm ${
              timeLeft > 0 ? 'text-black/40 cursor-not-allowed' : 'text-black hover:text-red-700'
            }`}
          >
            Didn't receive the code? Resend OTP
          </button>
        </div>
      </div>
    </div>
  )
}
