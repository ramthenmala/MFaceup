import { DocumentType } from "@typegoose/typegoose"
import SessionModel from "../models/session.model"
import { User } from "../models/user.model"
import { signInJwt } from "../utils/jwt"

export const createSession = async ({ userId }: { userId: string }) => {
    return SessionModel.create({ user: userId })
}
// Refresh token with session 
export const signInRefreshToken = async ({ userId }: { userId: string }) => {
    const session = await createSession({
        userId
    })

    const refreshToken = signInJwt(
        { session: session._id },
        "refreshTokenPrivateKey"
    )

    return refreshToken
}

export const signAccessToken = (user: DocumentType<User>) => {
    const payload = user.toJSON()
    const accessToken = signInJwt(payload, "accessTokenPrivateKey")
    return accessToken
}