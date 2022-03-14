import mongoose from 'mongoose'
import config from 'config'
import log from './logger'

const connectDb = async () => {
    const dbUri = config.get<string>('mongodbUri')

    try {
        await mongoose.connect(dbUri)
        log.info('connected DB')
    } catch (error) {
        log.info('connect db error:', error)
        process.exit(1)
    }
}

export default connectDb;