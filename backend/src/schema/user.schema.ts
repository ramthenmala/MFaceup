import { object, string, TypeOf } from 'zod'

export const createUserSchema = object({
    body: object({
        username: string({
            required_error: 'User Name is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Not a valid Email'),
        password: string({
            required_error: "Password is required",
        }).min(6, "Password is too short - should be min 6 chars"),
        passwordConfirmation: string({
            required_error: "Password confirmation is required",
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
})

export const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string(),
    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"]
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"]