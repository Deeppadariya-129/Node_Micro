import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const GetAllTodo = () => {
    const [todos, setTodos] = useState([])
    const BASE_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/todo/get-all-todo`, {
                    withCredentials: true,
                })

                if (res.data.success) {
                    setTodos(res.data.allTodo || []) 
                } else {
                    toast.error(res.data.message || 'Failed to fetch todos')
                }
            } catch (error) {
                console.error('Error fetching todos:', error)
                toast.error(error.response?.data?.message || 'Something went wrong. Try again.')
            }
        }

        fetchTodos()
    }, [todos])

    if (todos.length === 0) {
        return <p className='text-center mt-10'>No todos found.</p>
    }

    return (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10'>
            {todos.map((todo) => (
                <div
                    key={todo._id}
                    className='flex flex-col gap-2 rounded-2xl border px-6 py-4 bg-gray-800 text-white'
                >
                    {todo.title && <p className='font-bold text-lg border-b border-gray-500 pb-2'>{todo.title}</p>}
                    {todo.description && <p>{todo.description}</p>}
                </div>
            ))}
        </div>
    )   
}

export default GetAllTodo
