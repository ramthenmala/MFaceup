import { Request, Response } from 'express'
import { CreateSessionInput } from '../../schema/auth.schema'
import { signAccessToken, signInRefreshToken } from '../../service/auth.service'
import { findUserByEmail } from '../../service/user.service'

export const createSessionHandler = async (req: Request<{}, {}, CreateSessionInput>, res: Response) => {
    const message = 'Invalid email or password'
    const { email, password } = req.body
    const user = await findUserByEmail(email)

    if (!user) {
        return res.send(message)
    }

    if (!user.verified) {
        return res.send('Please verify your email')
    }

    const isValid = await user.validatePassword(password)
    if (!isValid) {
        return res.send(message)
    }
    // Sign a access Token
    const accessToken = signAccessToken(user)

    // Sign a refresh Token
    const refreshToken = await signInRefreshToken({ userId: user._id })

    // Send the Token

    return res.send({
        accessToken,
        refreshToken
    })
}