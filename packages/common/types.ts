import zod from 'zod'

export const CreateUserSchema=zod.object({
        email:zod.string().max(25).min(6),
        password:zod.string().max(25).min(6).regex(/[A-Z]/,"Password must have an uppercase letter")
        .regex(/[a-z]/,"It must have a small letter")
        .regex(/[^A-Za-z0-9]/,"Must have a special character"),
        name:zod.string()
})

export const SigninSchema=zod.object({
        email:zod.string().max(25).min(6),
        password:zod.string().max(25).min(6).regex(/[A-Z]/,"Password must have an uppercase letter")
        .regex(/[a-z]/,"It must have a small letter")
        .regex(/[^A-Za-z0-9]/,"Must have a special character")
    }
)

export const CreateRoomSchema=zod.object({
    name:zod.string().max(25).min(6)
})