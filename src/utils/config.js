import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const SECRET_JWT = process.env.SECRET_JWT

export { PORT, MONGODB_URI, SECRET_JWT } 