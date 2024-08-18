import {z} from 'zod'

export const usernameValidation = z
.string()
.min(2,"username must be atleast 2 characters")
.min(20,"username must be atmost 20 characters")
.regex(/^[a-zA-Z0-9_]+&/, "username must not contain special character")


export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email({message : "Invalid Email address"}),
    password : z.string().min(6,{message : "password must be atleast 6 characters"})

})