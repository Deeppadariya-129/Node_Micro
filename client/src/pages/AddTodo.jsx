import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'sonner'

const AddTodo = () => {


    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const BASE_URL = import.meta.env.VITE_API_URL;

    const handleAddTodo = async() => {

        if (!title || !description) {
            toast.error('Please fill in both fields!')
            return
        }

        try {
            const res = await axios.post(`${BASE_URL}/api/todo/create-todo`, {
                title,
                description,
            }, { withCredentials: true } )

            if (res.data.success) {
                toast.success(res.data.message || 'Todo created successfully!')
                settitle('')
                setdescription('')
            } else {
                toast.error(res.data.message || 'Failed to create todo')
            }
        } catch (error) {
            console.error('Error creating todo:', error)
            toast.error(
                error.response?.data?.message || 'Something went wrong. Try again.'
            )
        }
        
    }

    return (
        <div className='container mx-auto max-w-xl mt-10 flex flex-col gap-8 '>
            <Input value={title} onChange={(e) => settitle(e.target.value)} type="email" placeholder="Title" />
            <Textarea value={description} onChange={(e) => setdescription(e.target.value)} placeholder="Description" />
            <div className='flex justify-center items-center'>
                <Button onClick={handleAddTodo} className='bg-amber-50 text-slate-950 hover:text-slate-950 cursor-pointer hover:bg-amber-50'>Add Task ✅</Button>
            </div>
        </div>
    )
}

export default AddTodo

