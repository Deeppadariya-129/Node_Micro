import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'sonner'

const LoginScreen = ({ onClose }) => {
    const [mode, setMode] = useState('login') // default mode: login
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const BASE_URL = import.meta.env.VITE_API_URL

    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login')
        setFullName('')
        setEmail('')
        setPassword('')
    }

    // --------------------------------------------------------------- Login Handle Function ---------------------------------------
    const handleLoginFunction = async () => {
        if (!email || !password) {
            toast.error('Please fill in both fields!')
            return
        }

        try {
            const res = await axios.post(`${BASE_URL}/api/auth/login`, { email:email, password:password }, { withCredentials: true })

            if (res.data.success) {
                toast.success(res.data.message || 'User login successfully!')
                setEmail('')
                setPassword('')
            } else {
                toast.error(res.data.message || 'Failed to login')
            }
        } catch (error) {
            console.error('Error to login:', error)
            toast.error(error.response?.data?.message || 'Something went wrong. Try again.')
        }
    }

    // --------------------------------------------------------------- Register Handle Function ---------------------------------------
    const handleRegisterFunction = async () => {
        if (!email || !password || !fullName) {
            toast.error('Please fill in all fields!')
            return
        }
console.log(fullName , email , password);

        try {
            const res = await axios.post(`${BASE_URL}/api/auth/register`, { fullname:fullName ,  email:email, password:password}, { withCredentials: true })

            if (res.data.success) {
                toast.success(res.data.message || 'User registered successfully!')
                setEmail('')
                setFullName('')
                setPassword('')
            } else {
                toast.error(res.data.message || 'Failed to register')
            }
        } catch (error) {
            console.error('Error to register:', error)
            toast.error(error.response?.data?.message || 'Something went wrong. Try again.')
        }
    }

    // --------------------------------------------------------------- Form Submit Handler ---------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (mode === 'login') {
            await handleLoginFunction()
        } else {
            await handleRegisterFunction()
        }
    }

    return (
        <div className='min-h-screen flex justify-center items-center w-full flex-col bg-slate-900 text-white'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-5 border rounded-2xl border-gray-700 p-10 bg-gray-800'
            >
                <h1 className='text-center font-bold text-3xl mb-5'>
                    Task Manager {mode === 'login' ? 'Login' : 'Register'}
                </h1>

                {/* Full Name only for register */}
                {mode === 'register' && (
                    <Input
                        placeholder='Full Name'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                )}

                <Input
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Toggle links */}
                <div className='flex justify-between items-center'>
                    <span
                        onClick={onClose}
                        className='text-blue-300 underline cursor-pointer'
                    >
                        Back to Home
                    </span>
                    <span
                        onClick={toggleMode}
                        className='text-blue-300 underline cursor-pointer'
                    >
                        {mode === 'login' ? 'Register' : 'Login'}
                    </span>
                </div>

                {/* Buttons */}
                <div className='w-full flex items-center justify-center gap-5 mt-2'>
                    <Button
                        type='submit'
                        className='bg-transparent px-10'
                        variant='outline'
                    >
                        {mode === 'login' ? 'Login' : 'Register'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default LoginScreen
