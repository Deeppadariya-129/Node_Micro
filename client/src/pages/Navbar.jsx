import { Button } from '@/components/ui/button'
import axios from 'axios';
import React from 'react'
import { toast } from 'sonner';

const Navbar = ({ onLoginClick }) => {

    const BASE_URL = import.meta.env.VITE_API_URL;

    const handleLogout = async () => {
        try {
            const logout = await axios.get(`${BASE_URL}/api/auth/logout` , {withCredentials:true})

            toast.success(logout.data.message || "Logout successfully !")
            
        } catch (error) {
            console.error('Error to logout:', error)
            toast.error(    
                error.response?.data?.message || 'Something went wrong. Try again.'
            )
        }
    }

    return (
        <div className='w-full p-8 flex justify-between items-center  border-b border-slate-950 bg-gray-400'>
            <h1 className='text-2xl font-semibold'>Task Manager</h1>
            <div className='flex gap-4'>
                <Button onClick={onLoginClick} variant='outline' className='bg-transparent px-10'>Login</Button>
                <Button onClick = {handleLogout}>Logout</Button>
            </div>
        </div>
    )
}   

export default Navbar