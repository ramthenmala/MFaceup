import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { CreateUserInput, VerifyUserInput } from "../../schema/user.schema"
import { createUser, findUserById } from "../../service/user.service"
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

export const verifyUserHandler = async (req: Request<VerifyUserInput>, res: Response) => {
    const id = req.params.id
    const verificationCode = req.params.verificationCode

    // Find the user by _id
    const user = await findUserById(id)
    console.log(user)
    if (!user) {
        return res.send(`Could Not Verify User`)
    }

    // Check to see if the verificationCode matches
    if (user.verified) {
        return res.send(`User is already Verified`)
    }

    // Check the user is verified
    if (user.verificationCode === verificationCode) {
        user.verified = true
        await user.save()
        return res.send(`User Successfully Verified`)
    }

    return res.send(`Could Not Verify User`)
}