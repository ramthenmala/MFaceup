import { object, string, TypeOf } from 'zod'

export const createUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required'
        }).email('Not a valid Email'),
        username: string({
            required_error: 'User Name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(6, "Password is too short min 6 Characters is required"),
        passwordConfirmation: string({
            required_error: 'Password Confirmation is required'
        }),
    }).refine(data => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"]