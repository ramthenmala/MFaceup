import { Request, Response } from "express"

export const loginUserHandler = async (req: Request, res: Response) => {
    res.send(`LOGIN API WORKING`)
}