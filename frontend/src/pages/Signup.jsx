import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/authService'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

export default function Signup() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: '',
    address: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await authService.register(form)
      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your account has been created successfully.',
        confirmButtonColor: '#06B6D4'
      })
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'mobileNumber', label: 'Mobile Number', type: 'tel' },
    { name: 'address', label: 'Address', type: 'text' }
  ]

  return (
    <div className="flex rounded-b-3xl items-center justify-center">
      <div className="relative bg-gray-400 backdrop-blur-md rounded-3xl shadow-xl p-10 w-full m-10">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-700 px-4 py-1 text-white rounded-full text-sm backdrop-blur-md shadow-md">
          ✨ Create Account
        </div>

        <h2 className=" text-3xl font-bold text-center mb-8">Join Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ name, label, type }) => (
              <div key={name} className={name === 'address' ? 'md:col-span-2' : ''}>
                <label className="block text-sm mb-1" htmlFor={name}>
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-red-500 transition"
                  required
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}
              text-white flex items-center justify-center shadow-md mt-6`}
          >
            {loading && (
              <span className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-sm text-black/70 mt-6">
          Already have an account? <span className="text-black font-medium">Log in to continue.</span>
        </p>
      </div>
    </div>
  )
}
