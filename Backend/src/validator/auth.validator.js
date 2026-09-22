import {z} from "zod";

const registerSchema=z.object({
    username:z
    .string()
    .trim()
    .min(3,"Username must be  at least 3 characters")
    .max(30,"Username must be less then 30 characters"),
    email: z
    .string()
    .trim()
    .email("invalid email address"),

    password: z
    .string()
    .min(8,"password must be at least 8 characters")
    .max(100,"password is too long")
});


const loginSchema=z.object({
    email: z
    .string()
    .trim()
    .email(),
    password:z.string().min(1)
});


export {registerSchema,loginSchema};