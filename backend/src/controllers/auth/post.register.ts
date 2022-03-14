import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { CreateUserInput } from "../../schema/user.schema"
import { createUser } from "../../service/user.service"
import { sendEmail } from "../../utils/mailer"

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
    const body = req.body

    try {
        const user = await createUser(body)
        console.log(user)
        await sendEmail({
            from: 'test@example.com',
            to: user.email,
            subject: `Please verify your account`,
            text: `Verification code ${user.verificationCode} id: ${user._id}`
        })
        return res.status(StatusCodes.CREATED).send(`User Created Successfully`)
    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(StatusCodes.CONFLICT).send(`Account Already Exists`)
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e)
    }
}