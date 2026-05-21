import {z} from 'zod'

export const CreateUserSchema=z.object({
    name:z.string().min(2,"Name must be atleast 2 Character"),
    email:z.string().email("Invalid email format"),
    password:z.string().min(6,"Password should have atleast 6 letters"),
    role:z.string().min(1,"Role is required")
})