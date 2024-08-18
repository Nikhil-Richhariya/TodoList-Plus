import {z} from 'zod'

export const taskSchema = z.object({
    identifier : z.string().min(2,{message : 'task can not be empty'}).max(300, {message:'task should be less than 300 characters'})
})